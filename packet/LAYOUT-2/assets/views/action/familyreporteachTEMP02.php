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

$resultArray   = array();
$arrCol        = array();



$strSQLex021 = "SELECT distinct(family_id),family_id,family_name FROM specimens ";
$strSQLex021 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQLex021 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQLex021 .= "left join family on genus.family_family_id = family.family_id ";
$strSQLex021 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQLex021 .= "WHERE sreport_date > '" . $beginbudget . "' ";
$strSQLex021 .= "AND family_name <> 'Unknown' ";
$strSQLex021 .= "AND specimens_trash = '" . $specimens_trash . "' ";
$strSQLex021 .= "ORDER BY family_name ASC";
$objQueryex021 = pg_query($strSQLex021);

$intNumField021 = pg_num_fields($objQueryex021);

while ($obResult011 = pg_fetch_array($objQueryex021)) {
    extract($obResult011);
    $arrCol = array();
    for ($i = 0; $i < $intNumField021; $i++) {
        $arrCol[pg_field_name($objQueryex021, $i)] = $obResult011[$i];
    }
    $resultArray01 = array();
    $strSQLex01 = "SELECT COUNT(*) as count,EXTRACT(MONTH FROM sreport_date) as month,EXTRACT(YEAR FROM sreport_date) as year  FROM specimens ";
    $strSQLex01 .= "left join species on specimens.species_species_id  = species.species_id ";
    $strSQLex01 .= "left join genus on species.genus_genus_id = genus.genus_id ";
    $strSQLex01 .= "left join family on genus.family_family_id = family.family_id ";
    $strSQLex01 .= "left join torder on family.torder_torder_id = torder.torder_id ";
    $strSQLex01 .= "WHERE sreport_date > '" . $beginbudget . "' ";
    $strSQLex01 .= "AND family_id =" . $family_id;
    $strSQLex01 .= "GROUP BY month,year ";
    $strSQLex01 .= "ORDER BY year ASC,month ";
    $objQueryex02     = pg_query($strSQLex01);
    $intNumFieldex021 = pg_num_fields($objQueryex02);
    while ($obResultex011 = pg_fetch_array($objQueryex02)) {
        extract($obResultex011);
     
        for ($i = 0; $i < $intNumFieldex021; $i++) {
            $arrCol01[pg_field_name($objQueryex02, $i)] = $obResultex011[$i];
        }
    array_push($resultArray01, $arrCol01);
    
    }
   
    $arrCol['monthlist'] = $resultArray01;
/*
$strSQLex03 = "SELECT count(*) as count  FROM specimens ";

$strSQLex03 .= "WHERE EXTRACT(MONTH FROM sreport_date) =" . $month . " ";
$strSQLex03 .= "AND EXTRACT(YEAR FROM sreport_date) =" . $year . " ";
$objQueryex03 = pg_query($strSQLex03);
$obResultex03 = pg_fetch_array($objQueryex03);
extract($obResultex03);
$arrCol01['count'] = $count;
array_push($resultArray01, $arrCol01);
$arrCol['monthlist'] = $resultArray01;*/

    /*  }*/

    /*
    $strSQLex01 = "SELECT sreport_date  FROM specimens ";
    $strSQLex01 .= "left join species on specimens.species_species_id  = species.species_id ";
    $strSQLex01 .= "left join genus on species.genus_genus_id = genus.genus_id ";
    $strSQLex01 .= "left join family on genus.family_family_id = family.family_id ";
    $strSQLex01 .= "left join torder on family.torder_torder_id = torder.torder_id ";
    $strSQLex01 .= "WHERE family_id =" . $family_id . " ";
    $strSQLex01 .= "AND EXTRACT(MONTH FROM sreport_date) =" . $num . " ";
    $strSQLex01 .= "AND EXTRACT(YEAR FROM sreport_date) =" . $name['year'] . " ";
    $strSQLex01 .= "LIMIT 1 ";

    $objQueryex01 = pg_query($strSQLex01);*/

/*
$strSQLex01 = "SELECT count(*) as count  FROM specimens ";
$strSQLex01 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQLex01 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQLex01 .= "left join family on genus.family_family_id = family.family_id ";
$strSQLex01 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQLex01 .= "WHERE family_id =" . $family_id . " ";
$strSQLex01 .= "AND sreport_date > '" . $beginbudget . "' ";
$strSQLex01 .= "AND EXTRACT(MONTH FROM sreport_date) =" . $num . " ";
$strSQLex01 .= "AND EXTRACT(YEAR FROM sreport_date) =" . $name['year'] . " ";
$strSQLex01 .= "GROUP BY month,year ";
$objQueryex01 = pg_query($strSQLex01);

while ($obResultex011 = pg_fetch_array($objQueryex01)) {
extract($obResultex011);

echo $count;*/
    /*   $arrCol01['reportdate'] = $mixed;
    array_push($resultArray01, $arrCol01);
    $arrCol['monthlist'] = $resultArray01;*/
/**
}*/

    /**extract($obResultex01);
    $arrCol01['specimens_id'] = $sreport_date;

    array_push($resultArray01, $arrCol01);
    $arrCol['monthlist'] = $resultArray01;
     **/

/*
foreach ($months as $num => $name) {
$strSQLex01 = "SELECT COUNT(specimens_id) as countspec FROM specimens ";
$strSQLex01 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQLex01 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQLex01 .= "left join family on genus.family_family_id = family.family_id ";
$strSQLex01 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQLex01 .= "WHERE EXTRACT(MONTH FROM sreport_date) =" . $num . " ";
$strSQLex01 .= "AND EXTRACT(YEAR FROM sreport_date) =" . $name['year'] . " ";
$strSQLex01 .= "AND family_id =" . $family_id . " ";
$objQueryex01 = pg_query($strSQLex01);
$obResultex01 = pg_fetch_array($objQueryex01);
extract($obResultex01);

if ($countspec > 0) {

$arrCol['reportmonth'] = $name['month'];
$arrCol['reportyear']  = $name['year'];

}

}
 */
    array_push($resultArray, $arrCol);

}
pg_close($conn);

echo json_encode($resultArray);
/**
foreach ($months as $num => $name) {

$strSQLex02 = "SELECT family_id,family_name FROM specimens ";
$strSQLex02 .= "left join species on species.species_id = specimens.species_species_id ";
$strSQLex02 .= "left join genus on genus.genus_id = species.genus_genus_id ";
$strSQLex02 .= "left join family on family.family_id = genus.family_family_id ";
$strSQLex02 .= "WHERE EXTRACT(MONTH FROM sreport_date) =" . $num . " ";
$strSQLex02 .= "AND EXTRACT(YEAR FROM sreport_date) =" . $name['year'] . " ";
$strSQLex02 .= "AND sreport_date > '" . $beginbudget . "' ";
$strSQLex02 .= "AND specimens_trash = '" . $specimens_trash . "'";
$objQueryex02  = pg_query($strSQLex02);
$resultArray01 = array();
$intNumField02 = pg_num_fields($objQueryex02);

while ($obResult01 = pg_fetch_array($objQueryex02)) {
$arrCol01 = array();
for ($i = 0; $i < $intNumField02; $i++) {
$arrCol01[pg_field_name($objQueryex02, $i)] = $obResult01[$i];
}

array_push($resultArray01, $arrCol01);
$arrCol['familylist'] = $resultArray01;
}

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

$arrCol['reportmonth']     = $num;
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
 */
/**

select EXTRACT(YEAR FROM sreport_date) as year,EXTRACT(MONTH FROM sreport_date) as month,family_id,family_name from specimens
left join species on species.species_id = specimens.species_species_id
left join genus on genus.genus_id = species.genus_genus_id
left join family on family.family_id = genus.family_family_id
where sreport_date > '2018-09-30'
AND family_name <> 'Unknown'
group by year,month,family_id
order by year ASC,month ASC

 **/