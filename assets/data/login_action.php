<?php
$postdata  = file_get_contents("php://input");
$request   = json_decode($postdata);
@$username = $request->username;
@$password = $request->password;

$charmap = "1234ABCDEFGHIJKLMNOPQRSTUYWXYZabcdefghijklmnopqrstuvwxyz";

$codRandom = str_shuffle($charmap);

include 'connectdb.php';
$strSQL = "SELECT * FROM member
    WHERE member_name = '" . $username . "'
	and member_password = '" . $password . "'";
$objQuery = pg_query($strSQL);
$objResult = pg_fetch_array($objQuery);
if (!$objResult) {
    echo 'false';
} else {
    session_start();
    $_SESSION["token"]    = $codRandom;
    $_SESSION["username"] = $username;
    echo 'true, ' . $_SESSION["token"];
}
pg_close($conn);
