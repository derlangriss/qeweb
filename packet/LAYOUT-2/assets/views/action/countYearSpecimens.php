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
$unknown         = "Unknown";
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

$strSQLex01 = "SELECT count(specimens_id) AS countallyear FROM specimens ";
$strSQLex01 .= "WHERE specimens_trash = '" . $specimens_trash . "' ";
$strSQLex01 .= "AND sreport_date > '" . $beginbudget . "' ";
$objQueryex01 = pg_query($strSQLex01);
$obResultex01 = pg_fetch_array($objQueryex01);
extract($obResultex01);

$strSQLex01ex = "SELECT count(spec_box_id) AS countspecboxmuseum FROM specimensbox ";
$strSQLex01ex .= "WHERE spec_box_id <> 0";
$objQueryex01ex = pg_query($strSQLex01ex);
$obResultex01ex = pg_fetch_array($objQueryex01ex);
extract($obResultex01ex);

$strSQLex02extra = "SELECT  exmonth,exyear, cnt,rnk ";
$strSQLex02extra .= "FROM (";
$strSQLex02extra .= "SELECT EXTRACT(MONTH FROM sreport_date) as exmonth,EXTRACT(YEAR FROM sreport_date) as exyear";
$strSQLex02extra .= ",COUNT(*) AS cnt,RANK() OVER (PARTITION BY specimens_trash  ORDER BY COUNT(*) DESC ) AS rnk ";
$strSQLex02extra .= "FROM specimens ";
$strSQLex02extra .= "WHERE sreport_date > '" . $beginbudget . "' ";
$strSQLex02extra .= "AND specimens_trash = 1 ";
$strSQLex02extra .= "GROUP BY exmonth,exyear,specimens_trash ";
$strSQLex02extra .= ") AS tg  ";
$strSQLex02extra .= "WHERE rnk = 1 ";
$objQueryex01extra = pg_query($strSQLex02extra);
$obResultex01extra = pg_fetch_array($objQueryex01extra);
extract($obResultex01extra);

$strSQLex03extra = "SELECT  family_name, countmaxfamily,rnk ";
$strSQLex03extra .= "FROM (";
$strSQLex03extra .= "SELECT family_name,COUNT(*) AS countmaxfamily";
$strSQLex03extra .= ",RANK() OVER (PARTITION BY specimens_trash  ORDER BY COUNT(*) DESC ) AS rnk ";
$strSQLex03extra .= "FROM specimens ";
$strSQLex03extra .= "LEFT JOIN species on species.species_id = specimens.species_species_id ";
$strSQLex03extra .= "LEFT JOIN genus on genus.genus_id = species.genus_genus_id ";
$strSQLex03extra .= "LEFT JOIN family on family.family_id= genus.family_family_id ";
$strSQLex03extra .= "LEFT JOIN torder on torder.torder_id= family.torder_torder_id ";
$strSQLex03extra .= "WHERE sreport_date > '" . $beginbudget . "' ";
$strSQLex03extra .= "AND family_name <> 'Unknown' ";
$strSQLex03extra .= "AND specimens_trash = 1 ";
$strSQLex03extra .= "GROUP BY family_name,specimens_trash ";
$strSQLex03extra .= ") AS tg  ";
$strSQLex03extra .= "WHERE rnk = 1 ";
$objQueryex03extra = pg_query($strSQLex03extra);
$obResultex03extra = pg_fetch_array($objQueryex03extra);
extract($obResultex03extra);

$strSQLex02ex = "SELECT count(DISTINCT(specbox_spec_box_id)) AS countusedspecbox from specimens ";
$strSQLex02ex .= "WHERE specbox_spec_box_id <> 0";
$objQueryex02ex = pg_query($strSQLex02ex);
$obResultex02ex = pg_fetch_array($objQueryex02ex);
extract($obResultex02ex);

$strSQLex02 = "SELECT count(distinct(family_id)) AS countfamily FROM specimens ";
$strSQLex02 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQLex02 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQLex02 .= "left join family on genus.family_family_id = family.family_id ";
$strSQLex02 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQLex02 .= "WHERE sreport_date > '" . $beginbudget . "' ";
$strSQLex02 .= "AND family_name <> 'Unknown' ";
$strSQLex02 .= "AND specimens_trash = '" . 1 . "'";

$objQueryex02 = pg_query($strSQLex02);

$intNumField = pg_num_fields($objQueryex02);
$countrowbox = pg_num_rows($objQueryex02);
$resultArray = array();

while ($obResult = pg_fetch_array($objQueryex02)) {
    extract($obResult);
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[pg_field_name($objQueryex02, $i)] = $obResult[$i];
    }
    $arrCol['exfamily']           = $family_name;
    $arrCol['excountfamily']      = $countmaxfamily;
    $arrCol['exmonth']            = $exmonth;
    $arrCol['exyear']             = $exyear;
    $arrCol['countex']            = $cnt;
    $arrCol['countusedspecbox']   = $countusedspecbox;
    $arrCol['countspecboxmuseum'] = $countspecboxmuseum;
    $arrCol['countallyear']       = $countallyear;
    array_push($resultArray, $arrCol);
}

pg_close($conn);

echo json_encode($resultArray);
