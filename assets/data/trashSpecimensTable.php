<?php
require 'connectdb.php';

if (isset($_POST["specIds"])) {
    $specId_array = $_POST["specIds"];
    for ($i = 0; $i < count($specId_array); $i++) {
        if ($specId_array[$i] != "") {
            $strSQL = "UPDATE specimens SET ";
            $strSQL .= "specimens_trash = 2 ";
            $strSQL .= "WHERE specimens_id = '" . $specId_array[$i] . "' ";
            $objQuery = pg_query($strSQL);
        }
    }
}

if (isset($_POST["specId"])) {
    $specId = $_POST["specId"];

    $strSQL = "UPDATE specimens SET ";

    $strSQL .= "specimens_trash = 2 ";
    $strSQL .= "WHERE specimens_id = '" . $specId . "' ";
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
