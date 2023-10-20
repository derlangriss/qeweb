<?php

////// Receiver.php //////

if(!isset($_POST['authkey']))die('Error: No Auth Key');
if(!isset($_POST['user']))die('Error: No Username!');
if(!isset($_POST['pw']))die('Error: No password!');

$auth_key = $_POST['auth'];
$correct_authkey = 'YourSecretKey';

if($auth_key!=$correct_authkey)die('WRONG AUTH KEY!!!!');

$user = $_POST['user'];
$pw = $_POST['pw'];

//// Here you can process your username and password

?>