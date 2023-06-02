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

$fiscalyear      = date('Y', mktime(0, 0, 0, 3 + date('m')));
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

$strSQLex021 = "SELECT * FROM crosstab(' ";
$strSQLex021 .= "SELECT family_id,family_name, sreport_month, count(family_id) from specimens ";
$strSQLex021 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQLex021 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQLex021 .= "left join family on genus.family_family_id = family.family_id ";
$strSQLex021 .= "left join torder on family.torder_torder_id = torder.torder_id ";

  /*  $strSQLex021 .= "WHERE sreport_date > '" . $beginbudget . "' ";*/
    $strSQLex021 .= "WHERE sreport_date > ''" . $beginbudget . "'' ";
        $strSQLex021 .= "AND family_name <> ''Unknown'' ";

$strSQLex021 .= "GROUP BY family_id,sreport_month ";
$strSQLex021 .= "ORDER BY family_name ";
$strSQLex021 .= "',' ";
$strSQLex021 .= "SELECT m from generate_series(1,12) m ";
$strSQLex021 .= "') AS (";
$strSQLex021 .= "family_id int, ";
$strSQLex021 .= "family_name text, ";
$strSQLex021 .= ' "Jan" int, ';
$strSQLex021 .= ' "Feb" int, ';
$strSQLex021 .= ' "Mar" int, ';
$strSQLex021 .= ' "Apr" int, ';
$strSQLex021 .= ' "May" int, ';
$strSQLex021 .= ' "Jun" int, ';
$strSQLex021 .= ' "Jul" int, ';
$strSQLex021 .= ' "Aug" int, ';
$strSQLex021 .= ' "Sep" int, ';
$strSQLex021 .= ' "Oct" int, ';
$strSQLex021 .= ' "Nov" int, ';
$strSQLex021 .= ' "Dec" int ';
$strSQLex021 .= ") ";

$objQueryex021 = pg_query($strSQLex021);

$intNumField021 = pg_num_fields($objQueryex021);
$i              = 1;
while ($obResult011 = pg_fetch_array($objQueryex021)) {
    extract($obResult011);

    for ($i = 0; $i < $intNumField021; $i++) {
        $arrCol[pg_field_name($objQueryex021, $i)] = $obResult011[$i];
    }
    array_push($resultArray, $arrCol);
  

    $i++;
}

echo json_encode($resultArray);
