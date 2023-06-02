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

$resultArray01 = array();
$arrCol01      = array();

$resultArray = array();
$arrCol      = array();

$resultArray02 = array();
$arrCol02      = array();

foreach ($months as $num => $name) {

    $test = (int) $name['year'];
    array_push($resultArray01, $num);
    array_push($resultArray01, $test);

}

$strSQLex021 = "SELECT COUNT(family_id) as countfamily,family_id,family_name,sreport_month,sreport_year FROM specimens ";
$strSQLex021 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQLex021 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQLex021 .= "left join family on genus.family_family_id = family.family_id ";
$strSQLex021 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQLex021 .= "WHERE sreport_date > '" . $beginbudget . "' ";
$strSQLex021 .= "AND family_name <> 'Unknown' ";
$strSQLex021 .= "AND specimens_trash = '" . $specimens_trash . "' ";
$strSQLex021 .= "GROUP BY family_id,sreport_month,sreport_year ";
$strSQLex021 .= "ORDER BY sreport_year ,sreport_month,family_name ASC ";
$strSQLex021 .= "LIMIT 1 ";

$objQueryex021 = pg_query($strSQLex021);

$intNumField021 = pg_num_fields($objQueryex021);

while ($obResult011 = pg_fetch_array($objQueryex021)) {
    extract($obResult011);

    foreach ($months as $num => $name) {
        if ($sreport_month == $num) {
   
            $arrCol02['fullyear']    = $name['year'];
            $arrCol02['fullmonth']   = $name['month'];
            $arrCol02['count']       = $countfamily;
            $arrCol02['family_name'] = $family_name;
        } else {

            $arrCol02['fullyear']    = $name['year'];
            $arrCol02['fullmonth']   = $name['month'];
            $arrCol02['count']       = 0;
            $arrCol02['family_name'] = $family_name;
        }

        array_push($resultArray02, $arrCol02);
/*
if ($sreport_month==$num) {
echo $name['month'];
echo "<br>";
echo $family_name;
echo "<br>";
}*/
    }
     $arrCol['conclude'] = $resultArray02;
     array_push($resultArray, $arrCol);

    /*  array_push($resultArray, $arrCol);*/
/*
$strSQLinsAndUpdate01 = "SELECT COUNT(*) as count  FROM specimens ";
$strSQLinsAndUpdate01 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQLinsAndUpdate01 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQLinsAndUpdate01 .= "left join family on genus.family_family_id = family.family_id ";
$strSQLinsAndUpdate01 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQLinsAndUpdate01 .= "WHERE sreport_date > '" . $beginbudget . "' ";
$strSQLinsAndUpdate01 .= "AND family_id = ".$family_id;
$strSQLinsAndUpdate01 .= "AND  EXTRACT(MONTH FROM sreport_date) = ".$resultArray01[0];
$strSQLinsAndUpdate01 .= "AND  EXTRACT(YEAR FROM sreport_date) =  ".$resultArray01[1];
$objQuery = pg_query($strSQLinsAndUpdate01);

$obResultex01 = pg_fetch_array($objQuery);
extract($obResultex01);

$arrCol['fiscalfull'] = $count;

$arrCol['count'] = $count;
array_push($resultArray, $arrCol);*/

}

echo json_encode($resultArray);
