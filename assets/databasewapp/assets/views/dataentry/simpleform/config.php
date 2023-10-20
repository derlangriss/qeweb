<?
$hostname = "localhost";
$dbUser = "mkmorgangling";
$dbPass = "nepenthes";
$dbName = "qsbgcoll";
// connect to the database
$conn = pg_connect("host=$hostname dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");
?>