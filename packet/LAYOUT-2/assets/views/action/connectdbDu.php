<?php
$hostname = "localhost";
$dbUser   = "mkmorgangling";
$dbPass   = "nepenthes";
$dbName   = "durable";
// connect to the database
$conn    = pg_connect("host=$hostname dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");

/* encode pg
$conn    = pg_connect("host=$hostname options='--client_encoding=WIN874' dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");
*/
$PDOconn = new PDO("pgsql:host=$hostname;port=5432;dbname=$dbName", $dbUser, $dbPass);
/* pg_set_charset('utf8',$conn); */
/* pg_select_db($dbName); */
