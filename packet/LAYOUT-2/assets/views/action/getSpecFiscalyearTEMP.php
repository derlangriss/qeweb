<?php
require 'connectdb.php';
$today       = date("Y-m-d");
$beginbudget = date("Y-m-d", mktime(0, 0, 0, 9, 30, date("Y") - 1));

function dateswap($datadate)
{
    $datearray = explode("-", $datadate);
    if (strlen($datadate) > 3) {
        $meyear   = $datearray[0] + 543;
        $datadate = $meyear;
    }
    return $datadate;
}

$fiscalyear = date('Y', mktime(0, 0, 0, 3 + date('m')));

$THfiscalyear    = dateswap($fiscalyear);
$museumstorage   = 2;
$specimens_trash = 1;
$months          = array
    (1 => array("month" => 'january',
    "year"              => $fiscalyear),
    2  => array("month" => 'february',
        "year"              => $fiscalyear),
    3  => array("month" => 'march',
        "year"              => $fiscalyear),
    4  => array("month" => 'april',
        "year"              => $fiscalyear),
    5  => array("month" => 'may',
        "year"              => $fiscalyear),
    6  => array("month" => 'june',
        "year"              => $fiscalyear),
    7  => array("month" => 'july',
        "year"              => $fiscalyear),
    8  => array("month" => 'august',
        "year"              => $fiscalyear),
    9  => array("month" => 'september',
        "year"              => $fiscalyear),
    10 => array("month" => 'October',
        "year"              => $fiscalyear - 1),
    11 => array("month" => 'November',
        "year"              => $fiscalyear - 1),
    12 => array("month" => 'December',
        "year"              => $fiscalyear - 1));

$resultArray = array();
$arrCol      = array();
foreach ($months as $num => $name) {

    $strSQLex01 = "SELECT count(specimens_id) AS countuploaded FROM specimens ";
    $strSQLex01 .= "WHERE EXTRACT(MONTH FROM sreport_date) =" . $num . " ";
    $strSQLex01 .= "AND EXTRACT(YEAR FROM sreport_date) =" . $name['year'] . " ";
    $strSQLex01 .= "AND container_type = '" . $museumstorage . "' ";
    $strSQLex01 .= "AND sreport_date > '" . $beginbudget . "' ";
    $strSQLex01 .= "AND specimens_trash = '" . $specimens_trash . "'";
    $objQueryex01 = pg_query($strSQLex01);
    $obResultex01 = pg_fetch_array($objQueryex01);
    extract($obResultex01);

    $strSQLex = "SELECT count(specimens_id) AS countspecea FROM specimens ";
    $strSQLex .= "WHERE EXTRACT(MONTH FROM sreport_date) =" . $num . " ";
    $strSQLex .= "AND EXTRACT(YEAR FROM sreport_date) =" . $name['year'] . " ";
    $strSQLex .= "AND sreport_date > '" . $beginbudget . "'";
    $strSQLex .= "AND specimens_trash = '" . $specimens_trash . "'";
    $objQueryex = pg_query($strSQLex);
    $obResultex = pg_fetch_array($objQueryex);
    extract($obResultex);

    $arrCol['reportmonth']      = $num;
    $arrCol['reportyear']      = $name['year'];
    $arrCol['uploadedpercent'] = $countuploaded;

    $arrCol['fullmonth'] = $name['month'];
    $arrCol['month']     = $num;

    $arrCol['countspecea']   = $countspecea;
    $arrCol['fiscalyear']    = $THfiscalyear;
    $arrCol['countuploaded'] = $countuploaded;

    if ($countspecea == 0) {
        $uploadedpercent                = sprintf('%0.2f', 0);
        $arrCol['uploadprogressaction'] = 'label-inverse';
        $arrCol['uploadprogress']       = 'empty';
    } else {

        $uploadedpercent = sprintf('%0.2f', ($countuploaded / $countspecea) * 100);
        if ($uploadedpercent >= 1 && $uploadedpercent < 100) {
            $arrCol['uploadprogressaction'] = 'label-warning';
            $arrCol['uploadprogress']       = 'Inprogress';
        } else if ($uploadedpercent == 0) {
            $arrCol['uploadprogressaction'] = 'label-danger';
            $arrCol['uploadprogress']       = 'Need more action';
        } else {
            $arrCol['uploadprogressaction'] = 'label-success';
            $arrCol['uploadprogress']       = 'complete';
        }

    }

    $arrCol['uploadedpercent'] = $uploadedpercent;

    array_push($resultArray, $arrCol);
}
pg_close($conn);

echo json_encode($resultArray);
