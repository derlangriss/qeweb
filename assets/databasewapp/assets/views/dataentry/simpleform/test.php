<?php
ini_set('max_execution_time',3000); // 60 seconds for max execution time
require_once('libs/lgalookuplib.php');
require_once('libs/thgazettelookuplib.php');

connectdb("localhost","mkmorgangling","nepenthes","qsbgcoll");
$test = "SELECT tigerid,latdec, longdec FROM tigercollection";
$testres = pg_query($test);
//$rowtest=pg_fetch_array($testres);

while ($row = pg_fetch_array($testres))
  {
    extract($row);
    $rjrestest = lookuplga(lookupthaigeo($longdec,$latdec),NULL,NULL);
    extract(pg_fetch_array($rjrestest));
    
    $strSQL = "UPDATE tigercollection SET ";
    $strSQL .="idprovince = '".$idprovince."' ";
    $strSQL .=",province2 = '".$provinceen."' ";
    $strSQL .=",idamphurs = '".$idamphurs."' ";
    $strSQL .=",amphurs = '".$amphuren."' ";
    $strSQL .=",idtumbon = '".$idtambon."' ";
    $strSQL .=",tambonen = '".$tambonen."' ";
    $strSQL .="WHERE tigerid = '".$tigerid."' ";
    $objQuery = pg_query($strSQL);

 }





?>


    
    
 