<?php 
function curPageURL() {
	$pageURL = 'http';
	if ($_SERVER["HTTPS"] == "on") { $pageURL .= "s"; }
	$pageURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	} else {
		$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
	return $pageURL;
}

Class MV 
{
	private $path_principal;
	public $request_protocol;
	public $request_method;
	public $status;
	public $uri;
	public $scheme;
	public $host;
	public $port;
	public $path;
	public $query;
	private $path_array;
	public $file_name;
	public $folder;
	public $file_exist;
	public $file_show;
	
	
	public function __construct($params = null){
		$this->request_protocol = $_SERVER['SERVER_PROTOCOL'];
		$this->request_method = $_SERVER['REQUEST_METHOD'];
		
		global $absolute_path;
		$this->path_principal = $absolute_path;
		$this->status = $_SERVER['REDIRECT_STATUS'];
		
		
		$this->uri = curPageURL();
		$parse_uri = parse_url($this->uri);
		$this->scheme = $parse_uri['scheme'];
		$this->host = $parse_uri['host'];
		$this->port = $parse_uri['port'];
		$this->path = $parse_uri['path'];
		parse_str($parse_uri['query'], $this->query);
		
		
		if($this->path == '/'){
			$this->path = default_path;
		}
		$this->path_array = array_values(array_values(@array_filter(@explode('/', $this->path))));
		$nro_item = (count($this->path_array) - 1);
		if($this->path_array[$nro_item] == null){
			exit("OK");
		}
		
		$this->file_name = $this->path_array[$nro_item];
		
		if($this->file_name == null){
			
		}
		
		$fold_temp = [];
		foreach($this->path_array as $f){
			if(isset($f) && $f != $this->file_name){
				$fold_temp[] = $f;
			}
		}
		$this->folder = implode('/', $fold_temp);		
		$this->boot_isset_file();
	}
	
	private function boot_isset_file(){
		$folder_temp = "{$this->path_principal}data/content/modules/{$this->folder}";
		$without_extension = substr($this->file_name, 0, strrpos($this->file_name, "."));
		
		if(file_exists("{$folder_temp}/{$this->file_name}")){
			$this->file_exist = true;
			$this->status = "200";
		}
		else if(file_exists("{$folder_temp}/{$without_extension}.php")){
			$this->file_exist = true;
			$this->status = "200";
			$this->file_name = "{$without_extension}.php";
		}
		else if(file_exists("{$folder_temp}/{$without_extension}.html")){
			$this->file_exist = true;
			$this->status = "200";
			$this->file_name = "{$without_extension}.html";
		}
		else if(file_exists("{$folder_temp}/{$this->file_name}.php")){
			$this->file_exist = true;
			$this->status = "200";
			$this->file_name = "{$this->file_name}.php";
		}
		else if(file_exists("{$folder_temp}/{$this->file_name}.html")){
			$this->file_exist = true;
			$this->status = "200";
			$this->file_name = "{$this->file_name}.html";
		}
		else{
			
			$this->file_exist = false;
			$this->status = "404";
			$this->file_show = "404";
			
		}
		$this->file_show = "{$folder_temp}/{$this->file_name}";
	}
	
	public function include_file($path_and_file){
		if(file_exists("{$path_and_file}")){
			include_once("{$path_and_file}");
		}else{
			exit("Archivo no encotrado: {$path_and_file}");
		}
	}
	
	public function include_file_global($path_and_file){
		$this->include_file("{$this->path_principal}data/theme/global{$path_and_file}");
	}
	
	public function include_template($path_and_file){
		//exit("{$this->path_principal}data/content/modules{$path_and_file}");
		$this->include_file("{$this->path_principal}data/content/modules{$path_and_file}");
	}
	
	public function RunPage(){
		if($this->file_exist == true){
			$nameFile = "{$this->path_principal}data/content/modules/{$this->folder}/includes.php";
			
			$this->include_file("{$this->file_show}");
			$this->include_file($nameFile);
		}
		else 
		{
			echo ("Ocurrio un error.");
			echo ("<br>");
			echo ("El archivo no existe.");
			echo ("<br>");
			echo ("path: {$this->path}");
			exit();
		}
	}
}
