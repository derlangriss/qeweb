<?php
require 'connectdb.php';

$imageid = $_GET["query"];

if (isset($imageid)) {

    $strSQL = "UPDATE allimages SET ";
    $strSQL .= "images_trash = 2 ";
    $strSQL .= "WHERE images_id = '" . $imageid . "' ";
    $objQuery = pg_query($strSQL);

}

if (isset($idtable)) {

    $strSQL = "DELETE FROM collector";
    $strSQL .= " WHERE collector_id = '" . $idtable . "' ";
    $objQuery = pg_query($strSQL);

}

/*for($i=0;$i<count($id);$i++)
{
if($id[$i] != "")
{
$strSQL = "DELETE FROM collection ";
$strSQL .="WHERE idcollection = '".$id[$i]."' ";
$objQuery = pg_query($strSQL);
}
}*/

pg_close($conn);
