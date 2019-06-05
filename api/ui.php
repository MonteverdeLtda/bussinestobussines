<?php

class PHP_CRUD_UI
{
    protected $config;

    public function call($method, $url, $data = false)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_URL, $url);
        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            $headers = array();
            $headers[] = 'Content-Type: application/json';
            $headers[] = 'Content-Length: ' . strlen($data);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }

    public function url($base, $subject, $action, $id = '', $field = '')
    {
        return $base . trim("$subject/$action/$id/$field", '/');
    }

    public function menu($subject, $base, $definition)
    {
        $html = '<ul class="nav nav-pills nav-stacked">';
        if (isset($definition['tags'])) {
            foreach ($definition['tags'] as $tag) {
                $active = $tag['name'] == $subject ? ' class="active"' : '';
                $html .= '<li' . $active . '><a href="' . $this->url($base, $tag['name'], 'list') . '">' . $tag['name'] . '</a></li>';
            }
        }
        $html .= '</ul>';
        return $html;
    }

    public function executeHome($url, $base, $definition, $method, $request)
    {
        $html = 'Nothing';
        return $html;
    }

    public function head()
    {
        $html = '<!DOCTYPE html><html lang="en">';
        $html .= '<head><title>PHP-CRUD-UI</title>';
        $html .= '<meta name="viewport" content="width=device-width, initial-scale=1">';
        $html .= '<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">';
        $html .= '<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap-theme.min.css" rel="stylesheet">';
        $html .= '</head><body><div class="container">';
        $html .= '<div class="row">';
        $html .= '<div class="col-md-3"><h3>PHP-CRUD-UI</h3></div>';
        $html .= '</div>';
        return $html;
    }

    public function foot()
    {
        $html = '</div></body></html>';
        return $html;
    }

    public function getDisplayColumn($columns)
    {
        // TODO: make configurable
        $names = array('name', 'title', 'description', 'username');
        foreach ($names as $name) {
            if (in_array($name, $columns)) {
                return $name;
            }

        }
        return $columns[0];
    }

    public function referenceText($subject, $record, $definition)
    {
        $properties = $this->getProperties($subject, 'read', $definition);
        $displayColumn = $this->getDisplayColumn(array_keys($properties));
        return $record[$displayColumn];
    }

    public function referenceId($subject, $record, $definition)
    {
        $properties = $this->getProperties($subject, 'read', $definition);
        $primaryKey = $this->getPrimaryKey($subject, $properties);
        return $record[$primaryKey];
    }

    public function executeList($url, $base, $definition, $method, $request)
    {
        $subject = $this->getParameter($request, 0);
        $action = $this->getParameter($request, 1);
        $field = $this->getParameter($request, 2);
        $id = $this->getParameter($request, 3);

        $properties = $this->getProperties($subject, $action, $definition);
        $references = $this->getReferences($subject, $properties);
        $referenced = $this->getReferenced($subject, $properties);
        $primaryKey = $this->getPrimaryKey($subject, $properties);

        $related = !empty(array_filter($referenced));

        $args = array();
        if ($field) {
            $args['filter'] = $field . ',eq,' . $id;
        }
        $args['join'] = array_values(array_filter($references));
        $urlArgs = rtrim('?' . preg_replace('|%5B[0-9]+%5D|', '', http_build_query($args)), '?');
        $data = $this->call('GET', $url . '/records/' . urlencode($subject) . $urlArgs);

        $html = '<h2>' . $subject . ': list</h2>';

        $href = $this->url($base, $subject, 'create');
        $html .= '<p><a href="' . $href . '" class="btn btn-primary">Add</a></p>';

        if ($field) {
            $href = $this->url($base, $subject, 'list');
            $html .= '<div class="well well-sm"><div style="float:right;">';
            $html .= '<a class="btn btn-default btn-xs" href="' . $href . '">Clear filter</a>';
            $html .= '</div>Filtered by: ' . $field . ' = ' . $id . '</div>';
        }

        $html .= '<table class="table">';
        $html .= '<thead><tr>';
        foreach (array_keys($properties) as $column) {
            $html .= '<th>' . $column . '</th>';
        }
        if ($related) {
            $html .= '<th>related</th>';
        }
        if ($primaryKey) {
            $html .= '<th>actions</th>';
        }
        $html .= '</tr></thead><tbody>';
        foreach ($data['records'] as $record) {
            $html .= '<tr>';
            foreach ($record as $key => $value) {
                $html .= '<td>';
                if ($references[$key]) {
                    $id = $this->referenceId($references[$key], $record[$key], $definition);
                    $href = $this->url($base, $references[$key], 'read', $id);
                    $html .= '<a href="' . $href . '">';
                    $html .= htmlentities($this->referenceText($references[$key], $record[$key], $definition));
                    $html .= '</a>';
                } else {
                    $html .= htmlentities($value);
                }
                $html .= '</td>';
            }
            if ($related) {
                $html .= '<td>';
                foreach ($referenced as $i => $relation) {
                    if ($i) {
                        $html .= ', ';
                    }
                    $href = $this->url($base, $relation[0], 'list', $relation[1], $record[$primaryKey]);
                    $html .= '<a href="' . $href . '">' . $relation[0] . '</a>';
                }
                $html .= '</td>';
            }
            if ($primaryKey) {
                $html .= '<td style="white-space: nowrap;">';
                $href = $this->url($base, $subject, 'read', $record[$primaryKey]);
                $html .= '<a class="btn btn-default btn-xs" href="' . $href . '">view</a> ';
                $href = $this->url($base, $subject, 'update', $record[$primaryKey]);
                $html .= '<a class="btn btn-default btn-xs" href="' . $href . '">edit</a> ';
                $href = $this->url($base, $subject, 'delete', $record[$primaryKey]);
                $html .= '<a class="btn btn-danger btn-xs" href="' . $href . '">delete</a> ';
                $html .= '</td>';
            }
            $html .= '</tr>';
        }
        $html .= '</tbody></table>';
        return $html;
    }

    public function selectSubject($url, $subject, $name, $value, $definition)
    {
        $properties = $this->getProperties($subject, 'list', $definition);
        $references = $this->getReferences($subject, $properties);
        $primaryKey = $this->getPrimaryKey($subject, $properties);

        $data = $this->call('GET', $url . '/records/' . urlencode($subject));

        $displayColumn = $this->getDisplayColumn(array_keys($properties));

        $html = '<select id="' . $name . '" name="' . $name . '" class="form-control">';
        $html .= '<option value=""></option>';
        foreach ($data['records'] as $record) {
            $selected = $record[$primaryKey] == $value ? ' selected' : '';
            $html .= '<option value="' . $record[$primaryKey] . '"' . $selected . '>';
            if ($displayColumn === false) {
                $text = '';
                $first = true;
                foreach ($record as $column => $value) {
                    if (!$references[$column] && $column != $primaryKey) {
                        if (!$first) {
                            $text .= ' - ';
                        }

                        $text .= $value;
                        $first = false;
                    }
                }
                $html .= $text;
            } else {
                $html .= $record[$displayColumn];
            }
            $html .= '</option>';
        }
        $html .= '</select>';
        return $html;
    }

    public function executeAdd($url, $base, $definition, $method, $request, $post)
    {
        $subject = $this->getParameter($request, 0);
        $action = $this->getParameter($request, 1);

        if ($method == 'POST') {
            $this->call('POST', $url . '/records/' . urlencode($subject), json_encode($post));
            return '<p>Added</p>';
        }

        $properties = $this->getProperties($subject, $action, $definition);
        $references = $this->getReferences($subject, $properties);
        $referenced = $this->getReferenced($subject, $properties);
        $primaryKey = $this->getPrimaryKey($subject, $properties);

        $html = '<h2>' . $subject . ': create</h2>';
        $html .= '<form method="post">';
        $data = array_keys($properties);

        foreach ($data as $column) {
            $html .= '<div class="form-group">';
            $html .= '<label for="' . $column . '">' . $column . '</label>';
            if ($references[$column]) {
                $html .= $this->selectSubject($url, $references[$column], $column, false, $definition);
            } else {
                $disabled = $column == $primaryKey ? ' disabled' : '';
                $html .= '<input class="form-control" id="' . $column . '" name="' . $column . '" value=""' . $disabled . '/>';
            }
            $html .= '</div>';
        }
        $html .= '<button type="submit" class="btn btn-primary">Save</button>';
        $html .= '</form>';
        return $html;
    }

    public function executeView($url, $base, $definition, $method, $request)
    {
        $subject = $this->getParameter($request, 0);
        $action = $this->getParameter($request, 1);
        $id = $this->getParameter($request, 2);

        $properties = $this->getProperties($subject, $action, $definition);
        $references = $this->getReferences($subject, $properties);
        $referenced = $this->getReferenced($subject, $properties);
        $primaryKey = $this->getPrimaryKey($subject, $properties);

        $record = $this->call('GET', $url . '/records/' . urlencode($subject) . '/' . $id);
        $html = '<h2>' . $subject . ': view</h2>';
        $html .= '<dl>';
        foreach ($record as $key => $value) {
            $html .= '<dt>' . $key . '</dt>';
            $html .= '<dd>';
            if ($references[$key]) {
                $id = $this->referenceId($references[$key], $record[$key], $definition);
                $href = $this->url($base, $references[$key], 'read', $id);
                $html .= '<a href="' . $href . '">';
                $html .= htmlentities($this->referenceText($references[$key], $record[$key], $definition));
                $html .= '</a>';
            } else {
                $html .= htmlentities($value);
            }
            $html .= '</dd>';
        }
        $html .= '</dl>';
        return $html;
    }

    public function executeEdit($url, $base, $definition, $method, $request, $post)
    {
        $subject = $this->getParameter($request, 0);
        $action = $this->getParameter($request, 1);
        $id = $this->getParameter($request, 2);

        if ($method == 'POST') {
            $this->call('PUT', $url . '/records/' . urlencode($subject) . '/' . $id, json_encode($post));
            return '<p>Updated</p>';
        }

        $properties = $this->getProperties($subject, $action, $definition);
        $references = $this->getReferences($subject, $properties);
        $referenced = $this->getReferenced($subject, $properties);
        $primaryKey = $this->getPrimaryKey($subject, $properties);

        $data = $this->call('GET', $url . '/records/' . urlencode($subject) . '/' . $id);
        $html = '<h2>' . $subject . ': edit</h2>';
        $html .= '<form method="post">';
        foreach ($data as $column => $value) {
            $html .= '<div class="form-group">';
            $html .= '<label for="' . $column . '">' . $column . '</label>';
            if ($references[$column]) {
                $html .= $this->selectSubject($url, $references[$column], $column, $value, $definition);
            } else {
                $readonly = $column == $primaryKey ? ' readonly' : '';
                $html .= '<input class="form-control" id="' . $column . '" name="' . $column . '" value="' . htmlentities($value) . '"' . $readonly . '/>';
            }
            $html .= '</div>';
        }
        $html .= '<button type="submit" class="btn btn-primary">Save</button>';
        $html .= '</form>';
        return $html;
    }

    public function executeDelete($url, $base, $definition, $method, $request)
    {
        $subject = $this->getParameter($request, 0);
        $action = $this->getParameter($request, 1);
        $id = $this->getParameter($request, 2);

        if ($method == 'POST') {
            $this->call('DELETE', $url . '/records/' . urlencode($subject) . '/' . $id);
            return '<p>Deleted</p>';
        }

        $properties = $this->getProperties($subject, 'read', $definition);
        $primaryKey = $this->getPrimaryKey($subject, $properties);

        $html = '<h2>' . $subject . ': delete #' . $id . '</h2>';
        $html .= '<p>The action cannot be undone.</p>';
        $html .= '<form method="post">';
        $html .= '<input type="hidden" name="' . $primaryKey . '" value="' . $id . '"/>';
        $html .= '<button type="submit" class="btn btn-danger">Delete</button>';
        $href = $this->url($base, $subject, 'list');
        $html .= ' <a href="' . $href . '" class="btn btn-default">Cancel</a>';
        $html .= '</form>';
        return $html;
    }

    public function resolve($definition, $path)
    {
        while (null !== ($element = array_shift($path))) {
            //echo '"'.$element.'",';
            if (!isset($definition[$element])) {
                return false;
            }

            $definition = $definition[$element];
        }
        return $definition;
    }

    public function getProperties($subject, $action, $definition)
    {
        if (!$subject || !$definition) {
            return false;
        }
        if ($action == 'list') {
            $path = array('components', 'schemas', $action . '-' . $subject, 'properties', 'records', 'items', 'properties');
        } else {
            $path = array('components', 'schemas', $action . '-' . $subject, 'properties');
        }
        return $this->resolve($definition, $path);
    }

    public function getReferences($subject, $properties)
    {
        if (!$subject || !$properties) {
            return false;
        }

        $references = array();
        foreach ($properties as $field => $property) {
            $references[$field] = isset($property['x-references']) ? $property['x-references'] : false;
        }
        return $references;
    }

    public function getReferenced($subject, $properties)
    {
        if (!$subject || !$properties) {
            return false;
        }

        $referenced = array();
        foreach ($properties as $field => $property) {
            if (isset($property['x-referenced'])) {
                $referenced = array_merge($referenced, $property['x-referenced']);
            }
        }
        for ($i = 0; $i < count($referenced); $i++) {
            $referenced[$i] = explode('.', $referenced[$i]);
        }
        return $referenced;
    }

    public function getPrimaryKey($subject, $properties)
    {
        if (!$subject || !$properties) {
            return false;
        }

        foreach ($properties as $field => $property) {
            if (isset($property['x-primary-key'])) {
                return $field;
            }
        }
        return false;
    }

    public function __construct($config)
    {
        $this->config = $config;
    }

    protected function getUrl($config)
    {
        if (isset($config['url'])) {
            return $config['url'];
        }
        return null;
    }

    protected function getBase($config, $request)
    {
        if (isset($config['base'])) {
            return $config['base'];
        }
        $count = $request ? (-1 * strlen($request)) : strlen(urldecode($_SERVER['REQUEST_URI']));
        return rtrim(substr(urldecode($_SERVER['REQUEST_URI']), 0, $count), '/') . '/';
    }

    protected function getDefinition($config, $url)
    {
        if (isset($config['definition'])) {
            return $config['definition'];
        }
        $definition = $this->call('GET', $url . '/openapi');
        $_SESSION['definition'] = $definition;
        return $definition;
    }

    protected function getMethod($config)
    {
        if (isset($config['method'])) {
            return $config['method'];
        }
        return $_SERVER['REQUEST_METHOD'];
    }

    protected function getRequest($config)
    {
        if (isset($config['request'])) {
            return trim($config['request'], '/');
        }
        $request = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
        if (!$request) {
            $request = isset($_SERVER['ORIG_PATH_INFO']) ? $_SERVER['ORIG_PATH_INFO'] : '';
        }
        return trim($request, '/');
    }

    protected function getPost($config)
    {
        if (isset($config['post'])) {
            return $config['post'];
        }
        return $_POST;
    }

    protected function getParameter($request, $position)
    {
        if (!$request) {
            return false;
        }
        $parameters = explode('/', $request);
        return isset($parameters[$position]) ? $parameters[$position] : '';
    }

    public function executeCommand()
    {
        $config = $this->config;

        $url = $this->getUrl($config);
        $request = $this->getRequest($config);
        $base = $this->getBase($config, $request);
        $definition = $this->getDefinition($config, $url);
        $method = $this->getMethod($config);
        $post = $this->getPost($config);

        $subject = $this->getParameter($request, 0);
        $action = $this->getParameter($request, 1);

        $html = $this->head();
        $html .= '<div class="row">';
        $html .= '<div class="col-md-3">';
        $html .= $this->menu($subject, $base, $definition);
        $html .= '</div>';

        $html .= '<div class="col-md-9">';
        switch ($action) {
            case '':
                $html .= $this->executeHome($url, $base, $definition, $method, $request);
                break;
            case 'read':
                $html .= $this->executeView($url, $base, $definition, $method, $request);
                break;
            case 'create':
                $html .= $this->executeAdd($url, $base, $definition, $method, $request, $post);
                break;
            case 'update':
                $html .= $this->executeEdit($url, $base, $definition, $method, $request, $post);
                break;
            case 'delete':
                $html .= $this->executeDelete($url, $base, $definition, $method, $request);
                break;
            case 'list':
                $html .= $this->executeList($url, $base, $definition, $method, $request);
                break;
        }
        $html .= '</div>';

        $html .= '</div>';
        $html .= $this->foot();
        return $html;
    }
}

session_start();
$ui = new PHP_CRUD_UI(array(
    'url' => 'http://monteverde.dataservix.com/api/v2.0.0/api.php',
));
echo $ui->executeCommand();
