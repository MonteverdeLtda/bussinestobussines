<?php 
global $absolute_path;
if (DIRECTORY_SEPARATOR=='/') 
  $absolute_path = dirname(__FILE__).'/'; 
else 
  $absolute_path = str_replace('\\', '/', dirname(__FILE__)).'/'; 

include_once($absolute_path . 'data/autoload.php');