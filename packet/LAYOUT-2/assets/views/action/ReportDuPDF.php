<?php
require_once 'LatexTemplate.php';
// connect to the database
require 'connectdbDu.php';
if (isset($_GET['reporttype'])) {

    if ($_GET['reporttype'] == "NormalDuReport") {

        $strSQL = "SELECT *
                   FROM durablelist
                   LEFT JOIN sub_place ON sub_place.sub_place_id = durablelist.sub_place_sub_place_id
                   LEFT JOIN explace ON explace.explace_id = sub_place.explace_explace_id
                   LEFT JOIN owner ON durablelist.m_owner_id = owner.owner_id
                   LEFT JOIN responsible ON owner.responsible_response_id = responsible.response_id
                   LEFT JOIN orgsection ON durablelist.orgsection_orgsection_id = orgsection.orgsection_id
                   WHERE orgsection_id = 1 and m_status_id = 1 and du_trash = 1 and owner_id = 72
                   ORDER BY explace_id asc,durablelist_id asc,m_owner_id";

        $objQuery = pg_query($strSQL);

        $intNumField = pg_num_fields($objQuery);

        $resultArray = array();
        $n = 1;
        while ($obResult = pg_fetch_array($objQuery)) {
            extract($obResult);

            for ($i = 0; $i < $intNumField; $i++) {
                $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
            }
            $arrCol['durable_seq'] = $n;
            $n++;
            array_push($resultArray, $arrCol);
        }
        $reporttype =  "NormalDuReportForcheck.tex";
    }
    if ($_GET['reporttype'] == "AbnormalDuReport") {

        $strSQL = "SELECT *
                   FROM durablelist
                   LEFT JOIN sub_place ON sub_place.sub_place_id = durablelist.sub_place_sub_place_id
                   LEFT JOIN explace ON explace.explace_id = sub_place.explace_explace_id
                   LEFT JOIN owner ON durablelist.m_owner_id = owner.owner_id
                   LEFT JOIN responsible ON owner.responsible_response_id = responsible.response_id
                   LEFT JOIN orgsection ON durablelist.orgsection_orgsection_id = orgsection.orgsection_id
                   WHERE orgsection_id = 1 and m_status_id = 2 and du_trash = 1
                   ORDER BY explace_id asc,durablelist_id asc,m_owner_id ";

        $objQuery = pg_query($strSQL);

        $intNumField = pg_num_fields($objQuery);

        $resultArray = array();
        $n = 1;
        while ($obResult = pg_fetch_array($objQuery)) {
            extract($obResult);

            for ($i = 0; $i < $intNumField; $i++) {
                $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
            }
            $arrCol['durable_seq'] = $n;
            $n++;
            array_push($resultArray, $arrCol);
        }

        $reporttype =  "NormalDuReportForcheck.tex";
    }
    if ($_GET['reporttype'] == "DUTABLE_TAGS") { 
        

        $strSQL = "SELECT *
                   FROM durablelist
                   LEFT JOIN sub_place ON sub_place.sub_place_id = durablelist.sub_place_sub_place_id
                   LEFT JOIN explace ON explace.explace_id = sub_place.explace_explace_id
                   LEFT JOIN owner ON durablelist.m_owner_id = owner.owner_id
                   LEFT JOIN responsible ON owner.responsible_response_id = responsible.response_id
                   LEFT JOIN orgsection ON durablelist.orgsection_orgsection_id = orgsection.orgsection_id
                   WHERE orgsection_id = 1 and m_status_id = 1 and du_trash = 1 
                   ORDER BY explace_id asc,durablelist_id asc,m_owner_id"; 
 

        $objQuery = pg_query($strSQL);

        $intNumField = pg_num_fields($objQuery);
        
        $resultArray = array(); 
 
        $n = 1;
        while ($obResult = pg_fetch_array($objQuery)) {
            extract($obResult);

            for ($i = 0; $i < $intNumField; $i++) {
                $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
            }
            $arrCol['durable_seq'] = $n;
            $n++;
            array_push($resultArray, $arrCol);
        }
        $reporttype =  "durableTags.tex";
    }
  
}


// $reporttype = $_GET['reporttype'].".tex"; 


try {
    LatexTemplate::download($resultArray, $reporttype, 'label.pdf');
} catch (Exception $e) {
    echo $e->getMessage();
}
