<?php 
global $absolute_path;
if (DIRECTORY_SEPARATOR=='/') 
  $absolute_path = dirname(__FILE__).'/'; 
else 
  $absolute_path = str_replace('\\', '/', dirname(__FILE__)).'/'; 

$config = $absolute_path.'../../data/settings/config.php';
include_once($config);

class BaseClass 
	{
	   function set_data($data)
		   {
				foreach($data as $k=>$v)
					{
						$this->{$k} = $v;
					}
		   }
	}

class Picture extends BaseClass
	{
	  var $id, $name,$size, $data, $url_short, $url_large, $type, $create;
	   
	   function __construct($params=null)
	   {
			if(isset($params->id) && $params->id > 0){
				$this->load_by_id($params->id);
			}
	   }
	   
	   function __toString()
	   {
		   return "{$this->url_large}";
	   }

	   function load_by_id($id)
	   {
			$pdo = new PDO("mysql:host=".HOST_DB.";dbname=".NAME_DB, USER_DB, PASS_DB);
			$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $pdo->prepare('SELECT `pictures`.*
			FROM `pictures` 
			WHERE `pictures`.`id` = ?');
			#$pdo->exec("SET CHARACTER SET utf8; SET COLLATION SET utf8_unicode_ci");
			$stmt->execute([$id]);
			$result = ($stmt->fetchAll(PDO::FETCH_OBJ));
			if(isset($result[0])){
				$resultOne = $result[0];
				$this->set_data($resultOne);
			}
	   }
	   
	   function getPicture(){
		   return ($this);
	   }
	}


if(isset($_GET['picture']) && $_GET['picture'] > 0)
	{	
		$pic = new stdClass();
		$pic->id = (int) $_GET['picture'];
		$picture = new Picture($pic);
		$picture->data = $picture->data;
		$pictureData = @explode('data:', $picture->data);
		$Base64Img = '';
		if(isset($pictureData[1]))
			{
				$Base64Img = new stdClass();
				$Base64Img->type = "image\/none";
				$Base64Img->data = "";
				$Base64ImgTemp = @explode(';base64,', $pictureData[1]);
				
				if(isset($Base64ImgTemp[0]) && isset($Base64ImgTemp[1]))
					{
						$Base64Img->type = ($Base64ImgTemp[0]);
						$Base64Img->data = ($Base64ImgTemp[1]);
						
						# echo json_encode($Base64Img);
						#echo "<img src=\"{$picture->data}\" style=\"width: calc(100vw);\" />";
						
						$data = $Base64Img->data;
						$data = base64_decode($data);
						$im = ImageCreateFromString($data);
						if ($im !== false) 
							{
								header('Content-Type: image/png');
								
								if(isset($_GET['w']) && $_GET['w'] == 'original')
									{
										imagepng($im);
										imagedestroy($im);
									} 
								else if(!isset($_GET['thumb']) || $_GET['thumb'] == false)
									{
										$height = true;
										$width = 150;
										if(isset($_GET['w']) && $_GET['w'] > 0){ $width = (int) $_GET['w']; }
										$height = $height === true ? (ImageSY($im) * $width / ImageSX($im)) : $height;
										$output = ImageCreateTrueColor($width, $height);
										ImageCopyResampled($output, $im, 0, 0, 0, 0, $width, $height, ImageSX($im), ImageSY($im));
										# ImageJPEG($output, "temp/images/{$picture->name}", 95);
										imagepng($output);
										imagedestroy($output);
									} 
								else
									{
										imagepng($im);
										imagedestroy($im);
									}
							}
						else
							{
								echo 'Ocurrió un error.';
							}
					}
				else
					{
						exit('_docs/images/sorry-image-not-available.jpg');
					}
			}
		/**/
		exit();
}