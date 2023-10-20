<?php
require 'connectdb.php';

$id = $_POST["id"];

if (isset($id)) {
    for ($i = 0; $i < count($id); $i++) {
        if ($id[$i] != "") {
            $strSQL = "UPDATE collection SET ";
            $strSQL .= "trash = 2 ";
            $strSQL .= "WHERE idcollection = '" . $id[$i] . "' ";
            $objQuery = pg_query($strSQL);
        }
    }
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
