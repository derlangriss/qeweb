<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php';

if (isset($_POST) && count($_POST)) {

    $specimens_trash   = "2";
    $specimens_trash_n = "1";
    $strMode           = $_POST["taction"];
    $resultArray       = array();
    if ($strMode == "MOVETOBOX") {
        $tcontainer_id   = $_POST["tcontainer_id"];
        $tcontainer_type = $_POST["tcontainer_type"];
        $treport_month   = $_POST["treport_month"];
        $treport_year    = $_POST["treport_year"];
 
        $torderid   = $_POST["torderid"];
        $tfamilyid  = $_POST["tfamilyid"];
        $tgenusid   = $_POST["tgenusid"];
        $tspeciesid = $_POST["tspeciesid"];

        $unknown    = "Unknown";

        $SQLcheckstatus = pg_query("SELECT lockbox_boxstatus FROM userlockbox WHERE lockbox_boxid ='" . $tcontainer_id . "' AND EXTRACT(MONTH FROM lockbox_mreport) = '" . $treport_month . "' AND EXTRACT(YEAR FROM lockbox_mreport) ='" . $treport_year . "'");

        $SQLcheckstatus = "SELECT lockbox_boxstatus FROM userlockbox ";
        $SQLcheckstatus .= "WHERE lockbox_boxid ='" . $tcontainer_id . "' ";
        $SQLcheckstatus .= "AND EXTRACT(MONTH FROM lockbox_mreport) = '" . $treport_month . "' ";
        $SQLcheckstatus .= "AND EXTRACT(YEAR FROM lockbox_mreport) ='" . $treport_year . "' ";

        $objQuerycheckstatus = pg_query($SQLcheckstatus);
        $rowcheckstatus      = pg_fetch_array($objQuerycheckstatus);
        extract($rowcheckstatus);
        if ($lockbox_boxstatus == 2) {

            $specimensid = 0;
            $allcount    = 0;
            $arr         = array('success' => '0', 'specimens_id' => $specimensid, 'allcount' => $allcount);
            array_push($resultarray, $arr);
        } else {

            $specimensid = $_POST["tspecimensid"];
          


            if ($tspeciesid === '0' && $torderid === '0') {
               

                $strSQLCountSpecimensInbox = "WITH updatecontainer as ( ";
                $strSQLCountSpecimensInbox .= "UPDATE specimens SET container_id = '" . $tcontainer_id . "'";
                $strSQLCountSpecimensInbox .= ",container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= ",species_species_id = '" . $tspeciesid . "' ";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "'";
                $strSQLCountSpecimensInbox .= " ), countspecinbox as ( ";
                $strSQLCountSpecimensInbox .= "SELECT COUNT(specimens_id)+1 AS allcount from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE container_type = '" . $tcontainer_id . "' ";
                $strSQLCountSpecimensInbox .= "AND container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= "AND specimens_trash = " . $specimens_trash_n."  ";
                $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = " . $treport_month . " AND EXTRACT(YEAR FROM sreport_date) = " . $treport_year . " ";
                $strSQLCountSpecimensInbox .= " ), selectspecimensfullid as ( ";
                $strSQLCountSpecimensInbox .= "SELECT specimens_full_number from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "' ";
                $strSQLCountSpecimensInbox .= ") ";
                $strSQLCountSpecimensInbox .= "SELECT (SELECT allcount from countspecinbox),(SELECT specimens_full_number from selectspecimensfullid)";
                $species_id = $tspeciesid;

            }
            if ($torderid !== '0' && $tfamilyid === '0'  ) {

                $strSQLCountSpecimensInbox = "WITH selectspeciesid as ( ";
                $strSQLCountSpecimensInbox .= "SELECT * FROM species ";
                $strSQLCountSpecimensInbox .= "left join genus on genus.genus_id = species.genus_genus_id ";
                $strSQLCountSpecimensInbox .= "left join family on family.family_id = genus.family_family_id ";
                $strSQLCountSpecimensInbox .= "left join torder on torder.torder_id = family.torder_torder_id ";                
                $strSQLCountSpecimensInbox .= "WHERE torder_id ='" . $torderid . "' ";
                $strSQLCountSpecimensInbox .= "AND family_name ='" . $unknown . "' ";
                $strSQLCountSpecimensInbox .= " ), updatecontainer as ( ";
                $strSQLCountSpecimensInbox .= "UPDATE specimens SET container_id = '" . $tcontainer_id . "'";
                $strSQLCountSpecimensInbox .= ",container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= ",species_species_id = (SELECT species_id FROM selectspeciesid)";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "'";
                $strSQLCountSpecimensInbox .= " ), countspecinbox as ( ";
                $strSQLCountSpecimensInbox .= "SELECT COUNT(specimens_id)+1 AS allcount from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE container_type = '" . $tcontainer_id . "' ";
                $strSQLCountSpecimensInbox .= "AND container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= "AND specimens_trash = " . $specimens_trash_n."  ";
                $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = " . $treport_month . " AND EXTRACT(YEAR FROM sreport_date) = " . $treport_year . " ";
                $strSQLCountSpecimensInbox .= " ), selectspecimensfullid as ( ";
                $strSQLCountSpecimensInbox .= "SELECT specimens_full_number from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "' ";
                $strSQLCountSpecimensInbox .= ") ";
                $strSQLCountSpecimensInbox .= "SELECT (SELECT allcount from countspecinbox),(SELECT specimens_full_number from selectspecimensfullid)";
                 $strSQLCountSpecimensInbox .= ",(SELECT species_id from selectspeciesid)";


            }
            if ($torderid !== '0' && $tfamilyid !== '0'  ) {

                $strSQLCountSpecimensInbox = "WITH selectspeciesid as ( ";
                $strSQLCountSpecimensInbox .= "SELECT * FROM species ";
                $strSQLCountSpecimensInbox .= "left join genus on genus.genus_id = species.genus_genus_id ";
                $strSQLCountSpecimensInbox .= "left join family on family.family_id = genus.family_family_id ";
                $strSQLCountSpecimensInbox .= "left join torder on torder.torder_id = family.torder_torder_id ";                
                $strSQLCountSpecimensInbox .= "WHERE torder_id ='" . $torderid . "' ";
                $strSQLCountSpecimensInbox .= "AND family_id ='" . $tfamilyid . "' ";
                $strSQLCountSpecimensInbox .= "AND genus_name ='" . $unknown . "' ";
                $strSQLCountSpecimensInbox .= " ), updatecontainer as ( ";
                $strSQLCountSpecimensInbox .= "UPDATE specimens SET container_id = '" . $tcontainer_id . "'";
                $strSQLCountSpecimensInbox .= ",container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= ",species_species_id = (SELECT species_id FROM selectspeciesid)";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "'";
                $strSQLCountSpecimensInbox .= " ), countspecinbox as ( ";
                $strSQLCountSpecimensInbox .= "SELECT COUNT(specimens_id)+1 AS allcount from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE container_type = '" . $tcontainer_id . "' ";
                $strSQLCountSpecimensInbox .= "AND container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= "AND specimens_trash = " . $specimens_trash_n."  ";
                $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = " . $treport_month . " AND EXTRACT(YEAR FROM sreport_date) = " . $treport_year . " ";
                $strSQLCountSpecimensInbox .= " ), selectspecimensfullid as ( ";
                $strSQLCountSpecimensInbox .= "SELECT specimens_full_number from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "' ";
                $strSQLCountSpecimensInbox .= ") ";
                $strSQLCountSpecimensInbox .= "SELECT (SELECT allcount from countspecinbox),(SELECT specimens_full_number from selectspecimensfullid)";
                 $strSQLCountSpecimensInbox .= ",(SELECT species_id from selectspeciesid)";

            }
            if ($torderid !== '0' && $tfamilyid !== '0' &&  $tgenusid !== '0' ) {

                $strSQLCountSpecimensInbox = "WITH selectspeciesid as ( ";
                $strSQLCountSpecimensInbox .= "SELECT * FROM species ";
                $strSQLCountSpecimensInbox .= "left join genus on genus.genus_id = species.genus_genus_id ";
                $strSQLCountSpecimensInbox .= "left join family on family.family_id = genus.family_family_id ";
                $strSQLCountSpecimensInbox .= "left join torder on torder.torder_id = family.torder_torder_id ";                
                $strSQLCountSpecimensInbox .= "WHERE torder_id ='" . $torderid . "' ";
                $strSQLCountSpecimensInbox .= "AND family_id ='" . $tfamilyid . "' ";
                $strSQLCountSpecimensInbox .= "AND genus_id ='" . $tgenusid . "' ";
                $strSQLCountSpecimensInbox .= "AND species_name ='" . $unknown . "' ";
                $strSQLCountSpecimensInbox .= " ), updatecontainer as ( ";
                $strSQLCountSpecimensInbox .= "UPDATE specimens SET container_id = '" . $tcontainer_id . "'";
                $strSQLCountSpecimensInbox .= ",container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= ",species_species_id = (SELECT species_id FROM selectspeciesid)";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "'";
                $strSQLCountSpecimensInbox .= " ), countspecinbox as ( ";
                $strSQLCountSpecimensInbox .= "SELECT COUNT(specimens_id)+1 AS allcount from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE container_type = '" . $tcontainer_id . "' ";
                $strSQLCountSpecimensInbox .= "AND container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= "AND specimens_trash = " . $specimens_trash_n."  ";
                $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = " . $treport_month . " AND EXTRACT(YEAR FROM sreport_date) = " . $treport_year . " ";
                $strSQLCountSpecimensInbox .= " ), selectspecimensfullid as ( ";
                $strSQLCountSpecimensInbox .= "SELECT specimens_full_number from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "' ";
                $strSQLCountSpecimensInbox .= ") ";
                $strSQLCountSpecimensInbox .= "SELECT (SELECT allcount from countspecinbox),(SELECT specimens_full_number from selectspecimensfullid)";
                $strSQLCountSpecimensInbox .= ",(SELECT species_id from selectspeciesid)";

            }
            if ($torderid !== '0' && $tfamilyid !== '0' &&  $tgenusid !== '0' &&  $tspeciesid !== '0') {
                  echo $tspeciesid;
                  echo "<br>";
                  echo $tfamilyid;
                  echo "<br>";
                  echo $tgenusid;
                  echo "<br>";
                  echo $torderid;
                  echo "<br>";
/*
                $strSQLCountSpecimensInbox = "WITH selectspeciesid as ( ";
                $strSQLCountSpecimensInbox .= "SELECT * FROM species ";
                $strSQLCountSpecimensInbox .= "left join genus on genus.genus_id = species.genus_genus_id ";
                $strSQLCountSpecimensInbox .= "left join family on family.family_id = genus.family_family_id ";
                $strSQLCountSpecimensInbox .= "left join torder on torder.torder_id = family.torder_torder_id ";                
                $strSQLCountSpecimensInbox .= "WHERE torder_id ='" . $torderid . "' ";
                $strSQLCountSpecimensInbox .= "AND family_id ='" . $tfamilyid . "' ";
                $strSQLCountSpecimensInbox .= "AND genus_id ='" . $tgenusid . "' ";
                $strSQLCountSpecimensInbox .= "AND species_id ='" . $tspeciesid . "' ";
                $strSQLCountSpecimensInbox .= " ), updatecontainer as ( ";
                $strSQLCountSpecimensInbox .= "UPDATE specimens SET container_id = '" . $tcontainer_id . "'";
                $strSQLCountSpecimensInbox .= ",container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= ",species_species_id = (SELECT species_id FROM selectspeciesid)";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "'";
                $strSQLCountSpecimensInbox .= " ), countspecinbox as ( ";
                $strSQLCountSpecimensInbox .= "SELECT COUNT(specimens_id)+1 AS allcount from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE container_type = '" . $tcontainer_id . "' ";
                $strSQLCountSpecimensInbox .= "AND container_type = '" . $tcontainer_type . "' ";
                $strSQLCountSpecimensInbox .= "AND specimens_trash = " . $specimens_trash_n;
                $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = " . $treport_month . " AND EXTRACT(YEAR FROM sreport_date) = " . $treport_year . " ";
                $strSQLCountSpecimensInbox .= " ), selectspecimensfullid as ( ";
                $strSQLCountSpecimensInbox .= "SELECT specimens_full_number from specimens ";
                $strSQLCountSpecimensInbox .= "WHERE specimens_id ='" . $specimensid . "' ";
                $strSQLCountSpecimensInbox .= ") ";
                $strSQLCountSpecimensInbox .= "SELECT (SELECT allcount from countspecinbox),(SELECT specimens_full_number from selectspecimensfullid)";
                $strSQLCountSpecimensInbox .= ",(SELECT species_id from selectspeciesid)";*/

            }



            $objQuery = pg_query($strSQLCountSpecimensInbox);
            $row      = pg_fetch_array($objQuery);
            extract($row);

            $arr = array('success' => '1', 'specimens_id' => $specimensid, 'specimens_full_number' => $specimens_full_number, 'allcount' => $allcount,'species_id'=>$species_id);

            if ($allcount !== 0) {
                $res02 = pg_query("UPDATE userlockbox SET lockbox_boxstatus = 3 FROM specimens WHERE EXTRACT(MONTH FROM specimens.sreport_date) = EXTRACT(MONTH FROM userlockbox.lockbox_mreport) AND EXTRACT(YEAR FROM specimens.sreport_date) = EXTRACT(YEAR FROM userlockbox.lockbox_mreport) AND EXTRACT(MONTH FROM sreport_date) = '" . $treport_month . "' AND EXTRACT(YEAR FROM sreport_date) ='" . $treport_year . "'");
            }

            array_push($resultArray, $arr);

        }

    }

    echo json_encode($resultArray);
} else {

    echo json_encode(array("success" => "0"));
}
