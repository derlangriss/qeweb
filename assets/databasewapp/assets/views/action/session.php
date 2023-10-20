<?php

session_start();
if (ISSET($_SESSION['username'])==null){
	$_SESSION['username']="";
}
if (ISSET($_SESSION["token"])==null){
	$_SESSION['token']="";
}

$access_username=$_SESSION['username'];
$access_token=$_SESSION["token"];


$admin[] = array(
                'status' => 'true',
                'message' => 'this log in user',
		'username' => $access_username,
		'access_token' => $access_token
		);
header("Access-Control-Allow-Origin: *");
header("content-type:text/javascript;charset=utf-8");
header("Content-Type: application/json; charset=utf-8", true, 200); 
print json_encode(array("data"=>$admin));

?>