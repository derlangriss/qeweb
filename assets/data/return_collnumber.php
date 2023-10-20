<?php
require 'connectdb.php';
require 'collnoeditlib.php';
$txtcoll_code   = $_POST["gencoll_code"];
$txtcoll_year   = $_POST["gencoll_year"];
$txtcoll_number = $_POST["gencoll_number"];
$resultArray    = array();
$current_year   = date('Y');

if ($txtcoll_code !== '' && $txtcoll_year !== '' && $txtcoll_number !== '') {

    $sql = "SELECT coll_id,coll_code, coll_year, coll_number FROM collection
LEFT JOIN collection_code ON collection.collection_code_collection_code_id = collection_code.collection_code_id
WHERE collection_code_id = '" . $txtcoll_code . "' AND coll_year ='" . $txtcoll_year . "' AND coll_number ='" . $txtcoll_number . "'";
    $res     = pg_query($sql);
    $intRows = pg_num_rows($res);
    if ($intRows > 0) {
        $row2 = pg_fetch_array($res);
        extract($row2);
        $strSQL = "SELECT * FROM collection as coll
left join method on coll.method_method_id=method.method_id
left join tambon on coll.tambon_tambon_id=tambon.tambon_id
left join amphur on coll.amphur_amphur_id=amphur.amphur_id
left join donation on coll.donation_donation_id=donation.donation_id
left join province on amphur.province_province_id=province.province_id
left join tambon_direct on coll.tambon_direct_tambon_direct_id=tambon_direct.tambon_direct_id
left join amphur_direct on coll.amphur_direct_amphur_direct_id=amphur_direct.amphur_direct_id
left join province_direct on amphur_direct.province_direct_province_direct_id=province_direct.province_direct_id
left join collection_has_collector on coll.coll_id = collection_has_collector.collection_coll_id
left join collector on collector.collector_id =  collection_has_collector.collector_collector_id
left join collection_code on coll.collection_code_collection_code_id = collection_code.collection_code_id
WHERE TRUE AND coll_id  = '" . $coll_id . "'
ORDER BY collection_has_collector.collectorseq";
        $objQuery    = pg_query($strSQL);
        $intRowsColl = pg_num_rows($objQuery);
        if ($intRowsColl > 0) {
            $intNumField = pg_num_fields($objQuery);
            while ($obResult = pg_fetch_array($objQuery)) {
                $arrCol = array('gen_mode' => 3);
                for ($i = 0; $i < $intNumField; $i++) {
                    if (pg_field_name($objQuery, $i) == 'coll_number') {
                        if ($obResult[$i] == null) {
                            $obResult[$i] = 1;
                        }
                        $obResult[$i] = sprintf('%04d', $obResult[$i]);
                    }
                    $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
                }
                array_push($resultArray, $arrCol);

            }
        } else {
            $resultArray = nocollfn();
        }
        echo json_encode($resultArray);

    } else {


        $sqlNONUMBER = "SELECT collection_code FROM collection_code WHERE collection_code_id = '" . $txtcoll_code . "'";
        $resNONUMBER = pg_query($sqlNONUMBER);
        $rowNONUMBER = pg_fetch_array($resNONUMBER);
        extract($rowNONUMBER);

        $txtcoll_code    = $collection_code;
        $txtcoll_year    = $_POST["gencoll_year"];
        $txtcoll_number  = $_POST["gencoll_number"];
        $txtcount_number = sprintf('%04d', $txtcoll_number);

        $arr = array('coll_code' => $txtcoll_code, 'coll_year' => $txtcoll_year, 'coll_number' => $txtcount_number, 'gen_mode' => 4);

        array_push($resultArray, $arr);
        echo json_encode($resultArray);

    }

} else if ($txtcoll_code !== '' && $txtcoll_year !== '') {

    $sql = "SELECT coll_code, coll_year, coll_number FROM collection
    LEFT JOIN collection_code ON collection.collection_code_collection_code_id = collection_code.collection_code_id
    WHERE collection_code_id = '" . $txtcoll_code . "'";
    $res     = pg_query($sql);
    $intRows = pg_num_rows($res);

    if ($intRows > 0) {

        $sql = "SELECT coll_code, coll_year, coll_number FROM collection
LEFT JOIN collection_code ON collection.collection_code_collection_code_id = collection_code.collection_code_id
WHERE collection_code_id = '" . $txtcoll_code . "' AND coll_year ='" . $txtcoll_year . "'";
        $res     = pg_query($sql);
        $intRows = pg_num_rows($res);

        if ($intRows > 0) {

            $sql2 = "SELECT DISTINCT MAX(coll_number)+1 AS newnumber,coll_code,coll_year
                     FROM collection
                     LEFT JOIN collection_code
                     ON collection.collection_code_collection_code_id = collection_code.collection_code_id
                     WHERE coll_year = '" . $txtcoll_year . "'
                     AND collection_code_id = '" . $txtcoll_code . "'
                     GROUP BY coll_code,coll_year";
            $res2 = pg_query($sql2);
            $row2 = pg_fetch_array($res2);
            extract($row2);
            $txtcount_number = sprintf('%04d', $newnumber);

            $arr = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $txtcount_number, 'gen_mode' => 2);

        } else {

            if ($txtcoll_year <= $current_year) {
                $sql = "SELECT coll_code, coll_year, coll_number FROM collection
LEFT JOIN collection_code ON collection.collection_code_collection_code_id = collection_code.collection_code_id
WHERE collection_code_id = '" . $txtcoll_code . "'";
                $res = pg_query($sql);
                $row = pg_fetch_array($res);
                extract($row);

                $coll_code       = $coll_code;
                $coll_year       = $txtcoll_year;
                $newcount        = 1;
                $txtcount_number = sprintf('%04d', $newcount);

            } else {

                $sql2 = "SELECT DISTINCT collection_code FROM collection_code WHERE  collection_code_id= '" . $txtcoll_code . "'";
                $res2 = pg_query($sql2);
                $row2 = pg_fetch_array($res2);
                extract($row2);
                $newnumber = 1;
                $coll_year = $current_year;
                $coll_code = $collection_code;

                $txtcount_number = sprintf('%04d', $newnumber);

            }

            $arr = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $txtcount_number, 'gen_mode' => 2);

        }
        array_push($resultArray, $arr);
        echo json_encode($resultArray);

    } else {

        if ($txtcoll_year <= $current_year) {
            $SQLcollectioncode = "SELECT collection_code FROM collection_code WHERE collection_code_id = '" . $txtcoll_code . "'";
            $REScollectioncode = pg_query($SQLcollectioncode);
            $ROWcollectioncode = pg_fetch_array($REScollectioncode);
            extract($ROWcollectioncode);

            $newcount        = 1;
            $txtcount_number = sprintf('%04d', $newcount);
            $arr             = array('coll_code' => $collection_code, 'coll_year' => $txtcoll_year, 'coll_number' => $txtcount_number, 'gen_mode' => 2);

        } else {

            $SQLcollectioncode = "SELECT collection_code FROM collection_code WHERE collection_code_id = '" . $txtcoll_code . "'";
            $REScollectioncode = pg_query($SQLcollectioncode);
            $ROWcollectioncode = pg_fetch_array($REScollectioncode);
            extract($ROWcollectioncode);

            $newcount        = 1;
            $txtcount_number = sprintf('%04d', $newcount);
            $arr             = array('coll_code' => $collection_code, 'coll_year' => $current_year, 'coll_number' => $txtcount_number, 'gen_mode' => 2);

        }

        array_push($resultArray, $arr);
        echo json_encode($resultArray);

    }

/*
$sql = "SELECT coll_code, coll_year, coll_number FROM collection
LEFT JOIN collection_code ON collection.collection_code_collection_code_id = collection_code.collection_code_id
WHERE collection_code_id = '" . $txtcoll_code . "' AND coll_year ='" . $txtcoll_year . "'";
$res     = pg_query($sql);
$intRows = pg_num_rows($res);

if ($intRows > 0) {

$res = pg_query($sql);
$row = pg_fetch_array($res);
extract($row);

$sql2 = "SELECT DISTINCT MAX(coll_number)+1 AS newnumber,coll_code,coll_year FROM collection WHERE coll_year = '" . $txtcoll_year . "' GROUP BY coll_code,coll_year ";
$res2 = pg_query($sql2);
$row2 = pg_fetch_array($res2);
extract($row2);
$txtcount_number = sprintf('%04d', $newnumber);

$arr = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $txtcount_number);

} else {

echo $txtcoll_code;

if ($txtcoll_year <= $current_year) {
$sql = "SELECT coll_code, coll_year, coll_number FROM collection
LEFT JOIN collection_code ON collection.collection_code_collection_code_id = collection_code.collection_code_id
WHERE collection_code_id = '" . $txtcoll_code . "'";
$res = pg_query($sql);
$row = pg_fetch_array($res);
extract($row);

$coll_code       = $coll_code;
$coll_year       = $txtcoll_year;
$newcount        = 1;
$txtcount_number = sprintf('%04d', $newcount);

} else {

$sql2 = "SELECT DISTINCT collection_code FROM collection_code WHERE  collection_code_id= '" . $txtcoll_code . "'";
$res2 = pg_query($sql2);
$row2 = pg_fetch_array($res2);
extract($row2);
$newnumber = 1;
$coll_year = $current_year;
$coll_code = $collection_code;

$txtcount_number = sprintf('%04d', $newnumber);

}

$arr = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $txtcount_number);

}

array_push($resultArray, $arr);
echo json_encode($resultArray);*/

} else if ($txtcoll_code !== '') {

    /*

    $sql = "SELECT coll_code, coll_year, coll_number FROM collection
    LEFT JOIN collection_code ON collection.collection_code_collection_code_id = collection_code.collection_code_id
    WHERE collection_code_id = '" . $txtcoll_code . "'";
    $res     = pg_query($sql);
    $intRows = pg_num_rows($res);

    if ($intRows > 0) {

        $sql2 = "SELECT DISTINCT MAX(coll_number)+1 AS newnumber,coll_code,coll_year FROM collection
        LEFT JOIN collection_code on collection_code_collection_code_id = collection_code.collection_code_id
          WHERE coll_year = '" . $current_year . "'AND collection_code_id= '" . $txtcoll_code . "'  GROUP BY coll_code,coll_year ";
        $res2 = pg_query($sql2);
        $row2 = pg_fetch_array($res2);
        extract($row2);
        $txtcount_number = sprintf('%04d', $newnumber);
        $arr             = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $txtcount_number, 'gen_mode' => 1);

    } else {

        $SQLcollectioncode = "SELECT collection_code FROM collection_code WHERE collection_code_id = '" . $txtcoll_code . "'";
        $REScollectioncode = pg_query($SQLcollectioncode);
        $ROWcollectioncode = pg_fetch_array($REScollectioncode);
        extract($ROWcollectioncode);

        $newcount        = 1;
        $txtcount_number = sprintf('%04d', $newcount);
        $arr             = array('coll_code' => $collection_code, 'coll_year' => $current_year, 'coll_number' => $txtcount_number, 'gen_mode' => 1);

    }

    array_push($resultArray, $arr);
    echo json_encode($resultArray);*/
}

exit;
/*

if ($txtcoll_code !== '' and $txtcoll_year !== '') {
$sql = "select coll_code, coll_year, coll_number from collection WHERE coll_code = '" . $txtcoll_code . "' AND coll_year = '" . $txtcoll_year . "'";
}

if ($txtcoll_code !== '') {

$sql     = "select coll_code, coll_year, coll_number from collection WHERE coll_code ILIKE '" . $txtcoll_code . "'";
$res     = pg_query($sql);
$intRows = pg_num_rows($res);

if ($intRows > 0) {
$row = pg_fetch_array($res);
extract($row);
$curyear      = date('Y');
$newcount     = 1;
$count_number = sprintf('%04d', $newcount);
$arr          = array('coll_code' => $coll_code, 'coll_year' => $curyear, 'coll_number' => $count_number);

}
} else {

$sql     = "select coll_code, coll_year, coll_number from collection";
$res     = pg_query($sql);
$intRows = pg_num_rows($res);

if ($intRows > 0) {
$coll_codesss = 'QSBG';
$current_year = date('Y');
$newcount     = 1;
$count_number = sprintf('%04d', $newcount);
$row          = pg_fetch_array($res);
extract($row);

if ($coll_year == $curyear) {

$coll_year = $current_year;
$newcount  = $coll_number + 1;

} else {
$coll_year = $current_year;
$count     = 1;

}

$arr = array('coll_code' => $coll_code, 'coll_year' => $curyear, 'coll_number' => $count_number);
} else {

}

}
 */
/*
$res     = pg_query($sql);
$intRows = pg_num_rows($res);

if ($intRows > 0) {

$row = pg_fetch_array($res);
extract($row);
$curyear = date('Y');
if ($year == $curyear) {
$collyear = $curyear;
$newcount = $count + 1;
$count    = $newcount;

} else {
$collyear = $curyear;
$count    = 1;

}
$count_number = sprintf('%04d', $count);
$collno       = ("QSBG-" . $collyear . "-" . $count_number);

} else {

$collyear = date('Y');
$sql2     = "SELECT DISTINCT MAX(coll_number)+1 AS newnumber FROM collection WHERE coll_year = '" . $collyear . "' ";
$res      = pg_query($sql2);
$row      = pg_fetch_array($res);
extract($row);
$newcount     = $newnumber;
$count_number = sprintf('%04d', $newcount);

}

$arr = array('coll_code' => 'QSBG', 'coll_year' => $collyear, 'coll_number' => $count_number);
 */
