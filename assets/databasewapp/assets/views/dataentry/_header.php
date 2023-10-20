<?php

$os=(string)(PHP_OS);


if ($os=="Linux")
  {
$host=php_uname('n');


if ($host=="buprestis")
    {
    require('/usr/share/php/smarty3/Smarty.class.php');
    //require 'Smarty.class.php';

    $smarty = new Smarty;

    $smarty->template_dir = '/var/www/qsbginsects/wwwsite/databases/qsbgcoll/smarty/templates';
    $smarty->compile_dir = '/var/www/qsbginsects/wwwsite/databases/qsbgcoll/smarty/templates_c';
    $smarty->cache_dir = '/var/www/qsbginsects/wwwsite/databases/qsbgcoll/smarty/cache';
    $smarty->config_dir = '/var/www/qsbginsects/wwwsite/databases/qsbgcoll/smarty/configs';
}
else
    {
    require('/usr/share/php/smarty/libs/Smarty.class.php');
    //require 'Smarty.class.php';

    $smarty = new Smarty;

    $smarty->template_dir = '/var/www/qsbginsects/wwwsite/databases/qsbgcoll/smarty/templates';
    $smarty->compile_dir = '/var/www/qsbginsects/wwwsite/databases/qsbgcoll/smarty/templates_c';
    $smarty->cache_dir = '/var/www/qsbginsects/wwwsite/databases/qsbgcoll/smarty/cache';
    $smarty->config_dir = '/var/www/qsbginsects/wwwsite/databases/qsbgcoll/smarty/configs';
}

  }
else
  {
    require('c:/AppServ/smarty/libs/Smarty.class.php');
    //require 'Smarty.class.php';

    $smarty = new Smarty;

    $smarty->template_dir = 'c:/AppServ/www/qsbgcolldb/application/qavd2/smarty/templates';
    $smarty->compile_dir = 'c:/AppServ/smarty/templates_c';
    $smarty->cache_dir = 'c:/AppServ/smarty/cache';
    $smarty->config_dir = 'c:/AppServ/www/qsbgcolldb/application/qavd2/smarty/configs';
  }





/* $hostname = "localhost"; */
/* $dbUser = "mkmorgangling"; */
/* $dbPass = "nepenthes"; */
/* $dbName = "qsbgcoll"; */
/* // connect to the database */
/* $conn = mysql_connect($hostname, $dbUser, $dbPass) or die("Cannot connect to the database"); */
/* mysql_set_charset('utf8',$conn); */
/* mysql_select_db($dbName); */


$hostname = "localhost";
$dbUser = "mkmorgangling";
$dbPass = "nepenthes";
$dbName = "qsbgcoll";
// connect to the database
$conn = pg_connect("host=$hostname dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");

/* pg_set_charset('utf8',$conn); */
/* pg_select_db($dbName); */



?>
