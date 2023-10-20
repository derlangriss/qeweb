<?php
require_once 'LatexTemplate.php';
// connect to the database
require 'connectdbDu.php';
if (isset($_GET['reporttype'])) {

    if ($_GET['reporttype'] == "DuReport") {

        $strSQL = "SELECT *
                   FROM durablelist
                   LEFT JOIN place ON durablelist.m_place_id = place.place_id
                   LEFT JOIN owner ON durablelist.m_owner_id = owner.owner_id
                   LEFT JOIN responsible ON owner.responsible_response_id = responsible.response_id
                   LEFT JOIN room ON durablelist.m_room_id = room.room_id
                   LEFT JOIN orgsection ON durablelist.orgsection_section_id = orgsection.section_id
                   WHERE section_id = 1 and m_status_id = 1 and du_trash = 1 
                   ORDER BY place_id desc,durablelist_id asc,m_owner_id asc";

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

    }
}
//echo json_encode($resultArray);

$reporttype = $_GET['reporttype'] . ".tex";

try {
LatexTemplate::download($resultArray, $reporttype, 'label.pdf');
} catch (Exception $e) {
echo $e->getMessage();
}

