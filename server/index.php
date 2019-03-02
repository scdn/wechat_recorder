<?php
require "mysql.config.php";
$dir="upload/";
if(isset($_FILES["file"])){
$file=$dir.basename($_FILES["file"]["name"]);
if(move_uploaded_file($_FILES["file"]["tmp_name"],$file)){
  echo "file upload successed";
  $sql1="CREATE TABLE wechat(openid varchar(20),phone varchar(20),url varchar(200))";
  $conn->query($sql1);
  $url="https://".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"].$file;
  $sql2="INSERT INTO wechat(openid,phone,url)VALUES('$_POST[openid]','$_POST[phone]','$url')";
  if($conn->query($sql2)){echo "success!";}else{echo "error";};
  $conn->close();
}
else{
  echo "ERROR";
}
}else{
  echo "this is a interface,pls upload first";
}
?>
