<?php
require 'connectdb.php';
require 'collnoeditlib.php';
$txtcoll_code   = $_POST["gencoll_code"];
$txtcoll_year   = $_POST["gencoll_year"];
$txtcoll_number = $_POST["gencoll_number"];
$resultArray    = array();
$current_year   = date('Y');

if ($txtcoll_code !== '' && $txtcoll_year !== '') {

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
                
                $coll_code       = "";
                $coll_year       = "";
                $newcount        = "";
                $txtcount_number = "";

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
}
