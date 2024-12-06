<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php'; 

if (isset($_GET['specid'])) {
    $strSQL = "SELECT * FROM specimens
               LEFT JOIN collection on collection.coll_id = specimens.collection_coll_id
               LEFT JOIN species ON species.species_id = specimens.species_species_id
               LEFT JOIN genus ON genus.genus_id = species.genus_genus_id
               LEFT JOIN family ON family.family_id = genus.family_family_id
               LEFT JOIN torder ON torder.torder_id = family.torder_torder_id
               LEFT JOIN taxatype ON taxatype.taxatype_id = specimens.taxatype_taxatype_id
               LEFT JOIN method ON collection.method_method_id = method.method_id
               LEFT JOIN amphur ON collection.amphur_amphur_id = amphur.amphur_id 
               LEFT JOIN province ON amphur.province_province_id = province.province_id 
               WHERE specimens.specimens_id   = '" . $_GET["specid"] . "'";

    $objQuery    = pg_query($conn,$strSQL);
    $intNumField = pg_num_fields($objQuery);
    $resultArray = array();
    while ($obResult = pg_fetch_array($objQuery)) {
        $arrCol = array();
        for ($i = 0; $i < $intNumField; $i++) {
            if (pg_field_name($objQuery, $i) == 'specimens_number') {
                if ($obResult[$i] == null) {
                    $obResult[$i] = 1;
                } else {
                    $obResult[$i] = $obResult[$i] + 1;
                }

                $obResult[$i] = sprintf('%04d', $obResult[$i]);
            }

            $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
        }
        array_push($resultArray, $arrCol);
    }

    pg_close($conn);

    echo json_encode($resultArray);
} else {

    $strSQL         = "SELECT coll_id, coll_full_id FROM collection";
    $objQuery       = pg_query($conn,$strSQL);
    $intRowsColl    = pg_num_rows($objQuery);
    $newspec_number = 1;
    $resultArray    = array();

    if ($intRowsColl > 0) {

        $strSQLcheck_max_collno   = "SELECT coll_code,coll_year,coll_number FROM collection ORDER BY coll_year DESC,coll_number DESC LIMIT 1";
        $objQuerycheck_max_collno = pg_query($conn,$strSQLcheck_max_collno);
        $obResultcheck_max_collno = pg_fetch_array($objQuerycheck_max_collno);
        extract($obResultcheck_max_collno);

        $strSQL_check_specimens = "SELECT coll_id,coll_code,coll_year,coll_number,specimens_id,specimens_number+1 AS countspecimens_number
                     FROM specimens
                     LEFT JOIN collection ON specimens.collection_coll_id = collection.coll_id
                     LEFT JOIN collection_code ON collection.collection_code_collection_code_id = collection_code.collection_code_id
                     WHERE collection_code_id = 1 AND coll_number = '" . $coll_number . "'
                     ORDER BY coll_year DESC,coll_number DESC,specimens_number DESC
                     LIMIT 1";

        $objQuery_check_specimens    = pg_query($conn,$strSQL_check_specimens);
        $intRowsColl_check_specimens = pg_num_rows($objQuery_check_specimens);
        if ($intRowsColl_check_specimens > 0) {

      
            $strSQL_check_specimens = "SELECT coll_id,coll_code,coll_year,coll_number,specimens_id,specimens_number+1 AS countspecimens_number
                    FROM specimens
                    LEFT JOIN collection ON specimens.collection_coll_id = collection.coll_id
                    LEFT JOIN collection_code ON collection.collection_code_collection_code_id = collection_code.collection_code_id
                    WHERE collection_code_id = 1
                    ORDER BY coll_year DESC,coll_number DESC,specimens_number DESC
                    LIMIT 1";
            $objQuery_check_specimens    = pg_query($conn,$strSQL_check_specimens);
            $intRowsColl_check_specimens = pg_num_rows($objQuery_check_specimens);
            $obResult_max_collno         = pg_fetch_array($objQuery_check_specimens);
            extract($obResult_max_collno);
            $txtnewcoll_number = sprintf('%04d', $coll_number);
            $txtnewspec_number = sprintf('%04d', $countspecimens_number);

            $arr = array('coll_id' => $coll_id, 'coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $txtnewcoll_number, 'spec_number' => $txtnewspec_number, 'view_mode' => 2);

        } else {
            $countspecimens_number = 1;

            $strSQLcheck_max_collno   = "SELECT coll_id,coll_code,coll_year,coll_number FROM collection ORDER BY coll_year DESC,coll_number DESC LIMIT 1";
            $objQuerycheck_max_collno = pg_query($conn,$strSQLcheck_max_collno);
            $obResultcheck_max_collno = pg_fetch_array($objQuerycheck_max_collno);
            extract($obResultcheck_max_collno);
            $txtnewcoll_number = sprintf('%04d', $coll_number);
            $txtnewspec_number = sprintf('%04d', $countspecimens_number);

            $arr = array('coll_id' => $coll_id, 'coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $txtnewcoll_number, 'spec_number' => $txtnewspec_number, 'view_mode' => 2);
        } 
    }

    array_push($resultArray, $arr);
    pg_close($conn);

    echo json_encode($resultArray);

}

exit; 
