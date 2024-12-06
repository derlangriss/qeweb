<?php

function collnofn()
{
    require_once 'connectdb.php';
    $strSQL   = "SELECT coll_code,coll_year, (coll_number)+1 as coll_number from collection  order by coll_year desc,coll_number desc limit 1";
    $objQuery = pg_query($conn ,$strSQL);
    $row      = pg_fetch_array($res);
    extract($row);
    $arr = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $coll_number);

} //end collnofn

function collnofnfake()
{
    require_once 'connectdb.php';

    $resultArray = array();
    if ($intRowsColl > 0) {

        if ($intRowsCount > 0) {

            $row = pg_fetch_array($res);
            extract($row);

            $curyear = date('Y');

            $sql01 = "UPDATE collection_counter SET year = " . $_POST["tcoll_year"] . ", count = " . $_POST["tcoll_number"];
            $res   = pg_query($conn,$sql01);
            $sql02 = "select * from collection_counter LIMIT 1";
            $res   = pg_query($conn,$sql02);
            $row   = pg_fetch_array($res);
            extract($row);
            $newcount     = $count + 1;
            $count_number = sprintf('%04d', $newcount);
            $arr          = array('coll_code' => 'QSBG', 'coll_year' => $year, 'coll_number' => $count_number);
            array_push($resultArray, $arr);

        } else {

            $checkCollection = "SELECT * FROM collection";
            $res             = pg_query($conn,$checkCollection);
            $intRows         = pg_num_rows($res);

            if ($intRows > 0) {

                $collyear = date('Y');
                $sql2     = "INSERT INTO collection_counter(count,year)
                  SELECT DISTINCT MAX(coll_number)+1," . $collyear . " FROM collection WHERE coll_year = '" . $collyear . "' ";

                $res = pg_query($conn,$sql2);

                $sql3 = "select * from collection_counter LIMIT 1";
                $res  = pg_query($conn,$sql3);

                $row = pg_fetch_array($res);
                extract($row);

                $count = sprintf('%04d', $count);

                $collno = ("QSBG-" . $year . "-" . $count);

                $arr = array('coll_code' => 'QSBG', 'coll_year' => $year, 'coll_number' => $count);

            } else {

                $curyear      = date('Y');
                $year         = $curyear;
                $count_number = 1;
                $count        = sprintf('%04d', $count_number);
                $arr          = array('coll_code' => 'QSBG', 'coll_year' => $year, 'coll_number' => $count);
            }
        }
        array_push($resultArray, $arr);
        /*return $collno;*/
        return $resultArray;

    } else {

        if ($intRowsCount > 0) {

            $sql01 = "UPDATE collection_counter SET year = " . $_POST["tcoll_year"] . " , count = 100";
            $res   = pg_query($conn,$sql01);
            $sql02 = "select * from collection_counter LIMIT 1";
            $res   = pg_query($conn,$sql02);
            $row   = pg_fetch_array($res);
            extract($row);

            $count = sprintf('%04d', $count);

            $collno = ("QSBG-" . $year . "-" . $count);

            $arr = array('coll_code' => 'QSBG', 'coll_year' => $year, 'coll_number' => $count);

        } else {

            $sql = "INSERT INTO collection_counter(count,year) VALUES (" . $_POST["tcoll_year"] . "," . $_POST["tcoll_number"] . ")";
            $res = pg_query($conn,$sql);
            $sql = "select * from collection_counter LIMIT 1";
            $res = pg_query($conn,$sql);

            $row = pg_fetch_array($res);
            extract($row);

            $count = sprintf('%04d', $count);

            $collno = ("QSBG-" . $year . "-" . $count);

            $arr = array('coll_code' => 'QSBG', 'coll_year' => $year, 'coll_number' => $count);

        }

    }
    array_push($resultArray, $arr);

}

function nocollfn()
{
    require_once 'connectdb.php';
    $checkCollection = "SELECT * FROM collection";
    $resColl         = pg_query($conn,$checkCollection);
    $intRowsColl     = pg_num_rows($resColl);
    $curyear         = date('Y');
    $arrpush         = array();

    if ($intRowsColl > 0) {
        $sql = "SELECT DISTINCT MAX(coll_number)+1 as coll_number,coll_year,coll_code FROM collection WHERE coll_year = '" . $curyear . "' GROUP BY coll_year, coll_code  ";
        $res = pg_query($conn,$sql);
        $row = pg_fetch_array($res);
        extract($row);
        $count = sprintf('%04d', $coll_number);
        $arr   = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $count);
    } else {
        $coll_code  = 'QSBG';
        $collnumber = 1;
        $count      = sprintf('%04d', $collnumber);
        $arr        = array('coll_code' => $coll_code, 'coll_year' => $curyear, 'coll_number' => $count);
    }
    array_push($arrpush, $arr);
    return $arrpush;
}

function noRealcollfn()
{
    $arrpush    = array();
    $coll_code  = 'QSBG';
    $curyear    = date('Y');
    $collnumber = 1;
    $count      = sprintf('%04d', $collnumber);
    $arr        = array('coll_code' => $coll_code, 'coll_year' => $curyear, 'coll_number' => $count);
    array_push($arrpush, $arr);
    return $arrpush;
}

function excollfn()
{

    if ($intRows > 0) {
        while ($obResult = pg_fetch_array($objQuery)) {
            $arrCol = array();
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
    }

}
