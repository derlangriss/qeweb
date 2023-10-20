<?php

$hostname = "localhost";
$dbUser = "mkmorgangling";
$dbPass = "nepenthes";
$dbName = "durable02"; 

// connect to the database
$objConnect = mysqli_connect($hostname,$dbUser,$dbPass,$dbName) or die("Cannot connect to the database");

?>
