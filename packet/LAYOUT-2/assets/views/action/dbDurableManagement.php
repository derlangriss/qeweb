<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdbDu.php';

if (isset($_POST) && count($_POST)) {

    $strMode        = $_POST["taction"];
    $strDurableno   = $_POST["tdurableno"];
    $strDurablename = $_POST["tdurablename"];
    $strDurablenote = $_POST["tdurablenote"];
    $strDurableunitid = $_POST["tdurableunitid"];
    $strDurableuser = $_POST["tdurableuser"];
    $strDurablesubplace = $_POST["tdurablesubplace"];
    $strDurableimgpath = $_POST["tdurableimgpath"];
    $strDurablepurename = $_POST["tdurablepurename"];
    
     
    $resultArray = array();
    if ($strMode == "SAVE") {

        $SQLinsert = "INSERT INTO durablelist ";
        $SQLinsert .= "(durable_no_main,    durable_name_main,   orgsection_orgsection_id,   m_owner_id,   sub_place_sub_place_id,  picture,  pic_name)";
        $SQLinsert .= "VALUES";
        $SQLinsert .= "('" . $strDurableno . "','" . $strDurablename."','" . $strDurableunitid."'";
        $SQLinsert .=  ",'".$strDurableuser."','" . $strDurablesubplace .  "','" . $strDurableimgpath."','" . $strDurablepurename . "')";
        $objQueryinsert = pg_query($SQLinsert);
        $arr = array('success' => '1');
        array_push($resultArray, $arr);

    }
    if ($strMode == "EDIT") {
       $strDurableid = $_POST["tdurableid"];



        $SQLinsert = "UPDATE durablelist SET ";
        $SQLinsert .= "durable_no_main = '".$strDurableno."',durable_name_main= '".$strDurablename."',   orgsection_orgsection_id= '".$strDurableunitid."',   m_owner_id= '".$strDurableuser."',   sub_place_sub_place_id= '".$strDurablesubplace."',  picture= '".$strDurableimgpath."',  pic_name= '".$strDurablepurename."',note='".$strDurablenote."'";
        $SQLinsert .="WHERE durablelist_id = ".$strDurableid;
        $objQueryinsert = pg_query($SQLinsert);
        $arr = array('success' => '1');
        array_push($resultArray, $arr);


       
    }


    echo json_encode($resultArray);
} 
