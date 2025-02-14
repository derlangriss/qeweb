<?php
require_once 'LatexTemplate.php';
// connect to the database
require 'connectdb.php';

if (isset($_GET['reportspectype'])) {

    if ($_GET['reportspectype'] == 'SpecInBox') {
        if (isset($_GET['reportcontype']) && isset($_GET['reportboxid']) && isset($_GET['reportmonth']) && isset($_GET['reportyear'])) {
            $reportspectype = $_GET['reportspectype'];
            $containertype  = $_GET['reportcontype'];
            $boxid          = $_GET['reportboxid'];
            $month          = $_GET['reportmonth'];
            $year           = $_GET['reportyear'];

            $strSQL = "SELECT sreport_date,collboxno,torder_name,family_name,coll_full_id,min(specimens_number) AS minspec ,max(specimens_number) AS maxspec,count(specimens_number) as countspec from specimens ";
            $strSQL .= "left join collection on collection.coll_id = specimens.collection_coll_id ";
            $strSQL .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
            $strSQL .= "left join species on specimens.species_species_id  = species.species_id ";
            $strSQL .= "left join genus on species.genus_genus_id = genus.genus_id ";
            $strSQL .= "left join family on genus.family_family_id = family.family_id ";
            $strSQL .= "left join torder on family.torder_torder_id = torder.torder_id ";
            $strSQL .= "WHERE collbox_id ='" . $boxid . "' ";
            $strSQL .= "AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
            $strSQL .= "AND specimens_trash = 1 ";
            $strSQL .= "GROUP BY torder_name,coll_full_id,family_name,sreport_date,collboxno ";
            $strSQL .= "ORDER BY coll_full_id  ASC,minspec ASC";

            $strSQL02 = "SELECT count(*) AS allcount from specimens ";
            $strSQL02 .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
            $strSQL02 .= "WHERE collbox_id ='" . $boxid . "' ";
            $strSQL02 .= "AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
            $strSQL02 .= "AND specimens_trash = 1 ";
            $objQuery02 = pg_query($strSQL02);
            $obResult02 = pg_fetch_array($objQuery02);
            extract($obResult02);

            $objQuery    = pg_query($strSQL);
            $intNumField = pg_num_fields($objQuery);
            $resultArray = array();
            while ($obResult = pg_fetch_array($objQuery)) {

                $arrCol = array();
                for ($i = 0; $i < $intNumField; $i++) {
                    $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
                }
                if ($arrCol['countspec'] > 1) {
                    $arrCol['concatspecno'] = $arrCol['minspec'] . "-" . $arrCol['maxspec'];
                } else {
                    $arrCol['concatspecno'] = $arrCol['minspec'];
                }

                $d                        = new DateTime($arrCol['sreport_date']);
                $arrCol['fulldatereport'] = $d->format('F Y');
                $arrCol['allcount']       = $allcount;

                array_push($resultArray, $arrCol);
            }
            $reporttype = $_GET['reportspectype'] . ".tex";
            //echo json_encode($resultArray);

        }
    }
    if ($_GET['reportspectype'] == 'SpecList') {
        if (isset($_GET['reportmonth']) && isset($_GET['reportyear'])) {
            $reportspectype = $_GET['reportspectype'];
            $month          = $_GET['reportmonth'];
            $year           = $_GET['reportyear'];

            $strSQL = "SELECT DISTINCT sreport_date,torder_id,torder_name,family_id,family_name FROM specimens ";
            $strSQL .= "left join collection on collection.coll_id = specimens.collection_coll_id ";
            $strSQL .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
            $strSQL .= "left join species on specimens.species_species_id  = species.species_id ";
            $strSQL .= "left join genus on species.genus_genus_id = genus.genus_id ";
            $strSQL .= "left join family on genus.family_family_id = family.family_id ";
            $strSQL .= "left join torder on family.torder_torder_id = torder.torder_id ";
            $strSQL .= "WHERE EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
            $strSQL .= "AND specimens_trash = 1 ";
            $strSQL .= "ORDER BY torder_name ASC";

            $strSQLex = "SELECT count(*) AS allcount from specimens ";
            $strSQLex .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
            $strSQLex .= "WHERE EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
            $strSQLex .= "AND specimens_trash = 1 ";
            $objQueryex = pg_query($strSQLex);
            $obResultex = pg_fetch_array($objQueryex);
            extract($obResultex);

            $objQuery    = pg_query($strSQL);
            $intNumField = pg_num_fields($objQuery);
            $resultArray = array();

            while ($obResult = pg_fetch_array($objQuery)) {
                extract($obResult);
                $arrCol = array();
                for ($i = 0; $i < $intNumField; $i++) {
                    $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
                }

                $strSQL02 = "SELECT coll_full_id,specimens_number,collboxno from specimens ";
                $strSQL02 .= "left join collection on collection.coll_id = specimens.collection_coll_id ";
                $strSQL02 .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
                $strSQL02 .= "left join species on specimens.species_species_id  = species.species_id ";
                $strSQL02 .= "left join genus on species.genus_genus_id = genus.genus_id ";
                $strSQL02 .= "left join family on genus.family_family_id = family.family_id ";
                $strSQL02 .= "left join torder on family.torder_torder_id = torder.torder_id ";
                $strSQL02 .= "WHERE family_id ='" . $family_id . "' ";
                $strSQL02 .= "AND specimens_trash = 1 ";
                $strSQL02 .= "AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
                $strSQL02 .= "ORDER BY coll_full_id ,specimens_number ASC";

                $objQuery02    = pg_query($strSQL02);
                $resultArray01 = array();
                $intNumField01 = pg_num_fields($objQuery02);
                $countuser     = pg_num_rows($objQuery02);
                while ($obResult01 = pg_fetch_array($objQuery02)) {
                    $arrCol01 = array();
                    for ($i = 0; $i < $intNumField01; $i++) {
                        $arrCol01[pg_field_name($objQuery02, $i)] = $obResult01[$i];
                    }

                    array_push($resultArray01, $arrCol01);
                    $arrCol['speclist']  = $resultArray01;
                    $arrCol['countuser'] = $countuser;
                }
                $d                        = new DateTime($arrCol['sreport_date']);
                $arrCol['fulldatereport'] = $d->format('F Y');
                $arrCol['allcount']       = $allcount;

                array_push($resultArray, $arrCol);

            }
            $reporttype = $_GET['reportspectype'] . ".tex";
        }
    }

}

try {
    LatexTemplate::download($resultArray, $reporttype, 'label.pdf');
} catch (Exception $e) {
    echo $e->getMessage();
}
