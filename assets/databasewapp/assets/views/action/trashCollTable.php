<?php
require 'connectdb.php';

if (isset($_POST["id"])) {
    $id = $_POST["id"];
    for ($i = 0; $i < count($id); $i++) {
        if ($id[$i] != "") {
            $strSQL = "UPDATE collection SET ";
            $strSQL .= "trash = 2 ";
            $strSQL .= "WHERE coll_id = '" . $id[$i] . "' ";
            $objQuery = pg_query($strSQL);
        }
    }
}

if (isset($_POST["idtable"])) {

    $idtable = $_POST["idtable"];

    $strSQL = "UPDATE collection SET ";
    $strSQL .= "trash = 2 ";
    $strSQL .= "WHERE coll_id = '" . $idtable . "' ";
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
