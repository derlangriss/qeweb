<?php
require 'connectdb.php';


if (isset($_GET['stryear'])) {
    if($_GET['stryear']==='0'){
        $fiscalyear = date('Y', mktime(0, 0, 0, 3 + date('m')));

    }else{
        $fiscalyear  = $_GET['stryear'];
    }
    
} else {
    $fiscalyear = date('Y', mktime(0, 0, 0, 3 + date('m')));/* $_POST['treport_year'];*/
}

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

$resultArray02 = array();
foreach ($months as $num => $name) {

    $arrCol['reportmonth']     = $name['year'] . "-" . $num;
    $arrCol['thmonth']         = $name['month'] . "-" . $name['year'];
    $arrCol['onlymonth']       = $name['month'];
    $arrCol['onlymonthnumber'] = $num;
    $arrCol['onlyyear']        = $name['year'];

    array_push($resultArray02, $arrCol);
}


$beginbudget = date("Y-m-d", mktime(0, 0, 0, $resultArray02[9]['onlymonthnumber'], 1, $resultArray02[9]['onlyyear']));
$endbudget   = date("Y-m-d", mktime(0, 0, 0, $resultArray02[8]['onlymonthnumber'], 30, $resultArray02[8]['onlyyear']));
 


$table = "select * from crosstab('SELECT family_id,torder_name,family_name, EXTRACT(MONTH FROM sreport_date), count(family_id) from specimens 
left join species on specimens.species_species_id  = species.species_id 
left join genus on species.genus_genus_id = genus.genus_id 
left join family on genus.family_family_id = family.family_id
left join torder on family.torder_torder_id = torder.torder_id 
WHERE sreport_date BETWEEN ''".$beginbudget."'' AND ''".$endbudget."'' and specimens_trash = 1
GROUP BY family_id,EXTRACT(MONTH FROM sreport_date),torder_name
ORDER BY torder_name asc,family_name asc','SELECT m from generate_series(1,12) m ') 
AS fiscalfamily (
family_id int,
torder_name text,
family_name text,".' "jan" int, '.
' "feb" int, '.
' "mar" int, '.
' "apr" int, '.
' "may" int, '.
' "jun" int, '.
' "jul" int, '.
' "aug" int, '.
' "sep" int, '.
' "oct" int, '.
' "nov" int, '.
' "dec" int '." ) ";

$resultArray = array();
$arrCol      = array();

$objQueryex021 = pg_query($table);

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


if(isset($_GET['exporttype']))
{
   
    switch($_GET['exporttype'])
    {
        case "excel" :
        
      $filename = "phpflow_data_export_".date('Ymd') . ".xls";     
            header("Content-Type: application/vnd.ms-excel");
      header("Content-Disposition: attachment; filename=\"$filename\"");
      ExportFile($resultArray);
     
            exit();
        default :
            die("Unknown action : no-data");
            break;
    }
}
function ExportFile($records) {

  $heading = false;

    if(!empty($records))
      foreach($records as $row) {
      if(!$heading) {
        // display field/column names as a first row
        echo implode("\t", array_keys($row)) . "\n";
        $heading = true;
      }
      echo implode("\t", array_values($row)) . "\n";
      }
    exit;
}

 

// if (isset($_GET['year_id'])) {
//     if($_GET['year_id']==='0'){
//         $fiscalyear = date('Y', mktime(0, 0, 0, 3 + date('m')));

//     }else{
//         $fiscalyear  = $_GET['year_id'];
//     }
    
// } else {
//     $fiscalyear = date('Y', mktime(0, 0, 0, 3 + date('m')));/* $_POST['treport_year'];*/
// }

// function dateswap($datadate)
// {
//     $datearray = explode("-", $datadate);
//     if (strlen($datadate) > 3) {
//         $meyear   = $datearray[0] + 543;
//         $datadate = $meyear;
//     }
//     return $datadate;
// }

// $THfiscalyear    = dateswap($fiscalyear);
// $museumstorage   = 2;
// $specimens_trash = 1;
// $unknown         = "Unknown";
// $months          = array
//     (1 => array("month" => 'january',
//     "thmonth" => 'มกราคม',    
//     "year"              => $fiscalyear,
//     "thyear" => $THfiscalyear   ),
//     2  => array("month" => 'february',
//         "thmonth" => 'กุมภาพันธ์', 
//         "year"              => $fiscalyear,
//     "thyear" => $THfiscalyear),
//     3  => array("month" => 'march',
//         "thmonth" => 'มีนาคม', 
//         "year"              => $fiscalyear,
//     "thyear" => $THfiscalyear),
//     4  => array("month" => 'april',
//         "thmonth" => 'เมษายน', 
//         "year"              => $fiscalyear,
//     "thyear" => $THfiscalyear),
//     5  => array("month" => 'may',
//         "thmonth" => 'พฤษภาคม', 
//         "year"              => $fiscalyear,
//     "thyear" => $THfiscalyear),
//     6  => array("month" => 'june',
//         "thmonth" => 'มิถุนายน', 
//         "year"              => $fiscalyear,
//     "thyear" => $THfiscalyear),
//     7  => array("month" => 'july',
//         "thmonth" => 'กรกฎาคม', 
//         "year"              => $fiscalyear,
//     "thyear" => $THfiscalyear),
//     8  => array("month" => 'august',
//         "thmonth" => 'สิงหาคม', 
//         "year"              => $fiscalyear,
//     "thyear" => $THfiscalyear),
//     9  => array("month" => 'september',
//         "thmonth" => 'กันยายน', 
//         "year"              => $fiscalyear,
//     "thyear" => $THfiscalyear),
//     10 => array("month" => 'October',
//         "thmonth" => 'ตุลาคม', 
//         "year"              => $fiscalyear - 1,
//     "thyear" => $THfiscalyear-1),
//     11 => array("month" => 'November',
//         "thmonth" => 'พฤศจิกายน', 
//         "year"              => $fiscalyear - 1,
//     "thyear" => $THfiscalyear-1),
//     12 => array("month" => 'December',
//         "thmonth" => 'ธันวาคม', 
//         "year"              => $fiscalyear - 1,
//     "thyear" => $THfiscalyear-1));

// $resultArray02 = array();
// foreach ($months as $num => $name) {

//     $arrCol['reportmonth']     = $name['year'] . "-" . $num;
  
//     $arrCol['onlymonth']       = $name['month'];
//     $arrCol['onlymonthnumber'] = $num;
//     $arrCol['onlyyear']        = $name['year'];
//     $arrCol['thyear']        = $name['thyear'];
//     $arrCol['thmonth']        = $name['thmonth'];

//     array_push($resultArray02, $arrCol);
// }

// $beginbudget = date("Y-m-d", mktime(0, 0, 0, $resultArray02[9]['onlymonthnumber'], 1, $resultArray02[9]['onlyyear']));
// $endbudget   = date("Y-m-d", mktime(0, 0, 0, $resultArray02[8]['onlymonthnumber'], 30, $resultArray02[8]['onlyyear']));
// $showbeginbudget = date("F Y", mktime(0, 0, 0, $resultArray02[9]['onlymonthnumber'], 1, $resultArray02[9]['onlyyear']));
// $showendbudget   = date("F Y", mktime(0, 0, 0, $resultArray02[8]['onlymonthnumber'], 30, $resultArray02[8]['onlyyear']));

// $THshowbeginbudget = $resultArray02[9]['thmonth']." ".$resultArray02[9]['thyear'];
// $THshowendbudget   = $resultArray02[8]['thmonth']." ".$resultArray02[8]['thyear'];

// $resultArray = array();
// $arrCol      = array();

// $strSQLex01 = "SELECT count(specimens_id) AS countallyear FROM specimens ";
// $strSQLex01 .= "WHERE specimens_trash = '" . $specimens_trash . "' ";
// $strSQLex01 .= "AND sreport_date BETWEEN '" . $beginbudget . "' AND '" . $endbudget . "' ";
// $objQueryex01 = pg_query($strSQLex01);
// $obResultex01 = pg_fetch_array($objQueryex01);
// extract($obResultex01);

// $strSQLex02 = "SELECT count(distinct(family_id)) AS countfamily FROM specimens ";
// $strSQLex02 .= "left join species on specimens.species_species_id  = species.species_id ";
// $strSQLex02 .= "left join genus on species.genus_genus_id = genus.genus_id ";
// $strSQLex02 .= "left join family on genus.family_family_id = family.family_id ";
// $strSQLex02 .= "left join torder on family.torder_torder_id = torder.torder_id ";
// $strSQLex02 .= "WHERE sreport_date BETWEEN '" . $beginbudget . "' AND '" . $endbudget . "' ";
// $strSQLex02 .= "AND family_name <> 'Unknown' ";
// $strSQLex02 .= "AND specimens_trash = '" . 1 . "'";

// $objQueryex02 = pg_query($strSQLex02);
// $obResultex02 = pg_fetch_array($objQueryex02);
// extract($obResultex02);

// $arrCol['countfamily']      = $countfamily;
// $arrCol['countallyear']       = $countallyear;
// $arrCol['THfiscalyear']       = $THfiscalyear;
// $arrCol['ENfiscalyear']       = $fiscalyear;
// $arrCol['beginbudget']       = $showbeginbudget;
// $arrCol['endbudget']       = $showendbudget;
// $arrCol['thbeginbudget']       = $THshowbeginbudget;
// $arrCol['thendbudget']       = $THshowendbudget;

// array_push($resultArray, $arrCol);
 


// pg_close($conn);

// echo json_encode($resultArray);