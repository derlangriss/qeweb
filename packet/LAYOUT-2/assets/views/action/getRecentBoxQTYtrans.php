<?php

require 'connectdb.php';

$strSQLfind = "SELECT count(specimens_id) as countall,EXTRACT(MONTH FROM sreport_date) as month,EXTRACT(YEAR FROM sreport_date) as year FROM specimens ";
$strSQLfind .= "where specimens_trash = 1 ";
$strSQLfind .= "group by year,month ";
$strSQLfind .= "order by year desc,month desc ";
$strSQLfind .= "limit 1 ";
$objQueryfind = pg_query($strSQLfind);
$countrow     = pg_num_rows($objQueryfind);

if ($countrow !== 0) {
    $obResultfind = pg_fetch_array($objQueryfind);
    extract($obResultfind);

    $strSQL = "SELECT collbox_id,collboxno,firstname,boxstatus,lockbox_mreport,state_color,boxlocate FROM userlockbox ";
    $strSQL .= "left join box_location on box_location.boxlocate_id = userlockbox.lockbox_boxplaceid ";
    $strSQL .= "left join users_auth on userlockbox.lockbox_userid = users_auth.uid ";
    $strSQL .= "left join collectionresbox on userlockbox.lockbox_boxid = collectionresbox.collbox_id ";
    $strSQL .= "left join boxstatus on userlockbox.lockbox_boxstatus = boxstatus.boxstatus_id ";
    $strSQL .= "WHERE EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
    $strSQL .= "AND boxstatus_id > 1";
    $strSQL .= "ORDER BY collbox_id ASC ";

    $objQuery    = pg_query($strSQL);
    $intNumField = pg_num_fields($objQuery);
    $countrowbox = pg_num_rows($objQuery);
    $resultArray = array();

    if ($countrowbox !== 0) {

        while ($obResult = pg_fetch_array($objQuery)) {
            extract($obResult);
            $arrCol = array();
            for ($i = 0; $i < $intNumField; $i++) {
                $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
            }

            $strSQLCountSpecimensInbox = "WITH countspecinbox as ( ";
            $strSQLCountSpecimensInbox .= "SELECT COUNT(*) AS countspec from specimens ";
            $strSQLCountSpecimensInbox .= "left join userlockbox on userlockbox.lockbox_boxid = specimens.container_id  ";
            $strSQLCountSpecimensInbox .= "left join container_type on container_type.container_type_id = specimens.container_type ";
            $strSQLCountSpecimensInbox .= "WHERE container_type = 1 ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = EXTRACT(MONTH FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(YEAR FROM sreport_date) = EXTRACT(YEAR FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND lockbox_boxid ='" . $collbox_id . "'";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
            $strSQLCountSpecimensInbox .= " ), countallfullqty as ( ";
            $strSQLCountSpecimensInbox .= "SELECT COUNT(*) AS counteachbox from specimens ";
            $strSQLCountSpecimensInbox .= "left join userlockbox on userlockbox.lockbox_boxid = specimens.container_id  ";
            $strSQLCountSpecimensInbox .= "left join container_type on container_type.container_type_id = specimens.container_type ";
            $strSQLCountSpecimensInbox .= "left join species on specimens.species_species_id  = species.species_id  ";
            $strSQLCountSpecimensInbox .= "left join genus on species.genus_genus_id = genus.genus_id  ";
            $strSQLCountSpecimensInbox .= "left join family on genus.family_family_id = family.family_id  ";
            $strSQLCountSpecimensInbox .= "left join torder on family.torder_torder_id = torder.torder_id  ";
            $strSQLCountSpecimensInbox .= "WHERE ";
            $strSQLCountSpecimensInbox .= "EXTRACT(MONTH FROM sreport_date) = EXTRACT(MONTH FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(YEAR FROM sreport_date) = EXTRACT(YEAR FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND lockbox_boxid ='" . $collbox_id . "' ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " ";
            $strSQLCountSpecimensInbox .= " ), countundefinedspecinbox as ( ";
            $strSQLCountSpecimensInbox .= "SELECT COUNT(*) AS countundefinedspec from specimens ";
            $strSQLCountSpecimensInbox .= "left join userlockbox on userlockbox.lockbox_boxid = specimens.container_id  ";
            $strSQLCountSpecimensInbox .= "left join container_type on container_type.container_type_id = specimens.container_type ";
            $strSQLCountSpecimensInbox .= "left join species on specimens.species_species_id  = species.species_id  ";
            $strSQLCountSpecimensInbox .= "left join genus on species.genus_genus_id = genus.genus_id  ";
            $strSQLCountSpecimensInbox .= "left join family on genus.family_family_id = family.family_id  ";
            $strSQLCountSpecimensInbox .= "left join torder on family.torder_torder_id = torder.torder_id  ";
            $strSQLCountSpecimensInbox .= "WHERE container_type = 1 ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = EXTRACT(MONTH FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(YEAR FROM sreport_date) = EXTRACT(YEAR FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND lockbox_boxid ='" . $collbox_id . "' ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " ";
            $strSQLCountSpecimensInbox .= "AND torder_id = 0";
            $strSQLCountSpecimensInbox .= " ), countuploaded as ( ";
            $strSQLCountSpecimensInbox .= "SELECT COUNT(*) AS countuploaded from specimens ";
            $strSQLCountSpecimensInbox .= "left join userlockbox on userlockbox.lockbox_boxid = specimens.container_id  ";
            $strSQLCountSpecimensInbox .= "WHERE container_type = 2 ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = EXTRACT(MONTH FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(YEAR FROM sreport_date) = EXTRACT(YEAR FROM lockbox_mreport) ";
            $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " ";
            $strSQLCountSpecimensInbox .= "AND specimens_trash = 1";
            $strSQLCountSpecimensInbox .= ") ";
            $strSQLCountSpecimensInbox .= "SELECT (SELECT counteachbox from countallfullqty),(SELECT countuploaded from countuploaded)  ,(SELECT countspec from countspecinbox) , (SELECT countundefinedspec from countundefinedspecinbox)";

            $objQueryCountSpecimensInbox = pg_query($strSQLCountSpecimensInbox);
            $rowCountSpecimensInbox      = pg_fetch_array($objQueryCountSpecimensInbox);
            extract($rowCountSpecimensInbox);

            $arrCol['month']                = $month;
            $arrCol['year']                 = $year;
            $arrCol['countall']             = $countall;
            $arrCol['countallspec']         = $countspec;
            $arrCol['countspeceforeach']    = $counteachbox;
            $arrCol['countuploadedpercent'] = ($countuploaded / $countall) * 100;
            $arrCol['countrespercent']      = ($countspec / $counteachbox) * 100;
            $arrCol['countundefinedspec']   = $countundefinedspec;

            array_push($resultArray, $arrCol);

        }
    } else {
        $arrCol['month']              = $month;
        $arrCol['year']               = $year;
        $arrCol['countall']           = $countall;
        $arrCol['countallspec']       = 0;
        $arrCol['countspeceforeach']  = 0;
        $arrCol['countrespercent']    = 0;
        $arrCol['countundefinedspec'] = 0;
        $arrCol['collboxno']          = "No Box";

        array_push($resultArray, $arrCol);

    }

}

pg_close($conn);

echo json_encode($resultArray);
