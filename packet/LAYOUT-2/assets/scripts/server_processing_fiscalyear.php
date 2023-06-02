<?php

/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simply to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */
/*$report_month = $_POST['treport_year'];*/

if (isset($_POST['treport_year'])) {
    if($_POST['treport_year']==='0'){
        $fiscalyear = date('Y', mktime(0, 0, 0, 3 + date('m')));

    }else{
        $fiscalyear  = $_POST['treport_year'];
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
// DB table to use
 


$table = "crosstab('SELECT family_id,family_name,torder_name, EXTRACT(MONTH FROM sreport_date), count(family_id) from specimens 
left join species on specimens.species_species_id  = species.species_id 
left join genus on species.genus_genus_id = genus.genus_id 
left join family on genus.family_family_id = family.family_id
left join torder on family.torder_torder_id = torder.torder_id 
WHERE sreport_date BETWEEN ''".$beginbudget."'' AND ''".$endbudget."'' and specimens_trash = 1
GROUP BY family_id,EXTRACT(MONTH FROM sreport_date),torder_name
ORDER BY torder_name asc,family_name asc','SELECT m from generate_series(1,12) m ') 
AS fiscalfamily (
family_id int,
family_name text,
torder_name text,".' "jan" int, '.
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

// Table's primary key
$primaryKey = 'family_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array('as' => 'as1', 'tb' => 'fiscalfamily', 'db' => 'family_id', 'dt' => 0),
    array('as' => 'as2', 'tb' => 'fiscalfamily', 'db' => 'torder_name', 'dt' => 1),
    array('as' => 'as3', 'tb' => 'fiscalfamily', 'db' => 'family_name', 'dt' => 2),
    array('as' => 'as4', 'tb' => 'fiscalfamily', 'db' => 'jan', 'dt' => 3),
    array('as' => 'as5', 'tb' => 'fiscalfamily', 'db' => 'feb', 'dt' => 4),
    array('as' => 'as6', 'tb' => 'fiscalfamily', 'db' => 'mar', 'dt' => 5),
    array('as' => 'as7', 'tb' => 'fiscalfamily', 'db' => 'apr', 'dt' => 6),
    array('as' => 'as8', 'tb' => 'fiscalfamily', 'db' => 'may', 'dt' => 7),
    array('as' => 'as9', 'tb' => 'fiscalfamily', 'db' => 'jun', 'dt' => 8),
    array('as' => 'as10', 'tb' => 'fiscalfamily', 'db' => 'jul', 'dt' => 9),
    array('as' => 'as11', 'tb' => 'fiscalfamily', 'db' => 'aug', 'dt' => 10),
    array('as' => 'as12', 'tb' => 'fiscalfamily', 'db' => 'sep', 'dt' => 11),
    array('as' => 'as13', 'tb' => 'fiscalfamily', 'db' => 'oct', 'dt' => 12),
    array('as' => 'as14', 'tb' => 'fiscalfamily', 'db' => 'nov', 'dt' => 13),
    array('as' => 'as15', 'tb' => 'fiscalfamily', 'db' => 'dec', 'dt' => 14)
);

// SQL server connection information
$sql_details = array(
    'user' => 'mkmorgangling',
    'pass' => 'nepenthes',
    'db'   => 'QEinsectsDB',
    'host' => 'localhost'
);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.oneTblnumber.php' );

echo json_encode(
    SSP::simple( $_POST, $sql_details, $table, $primaryKey, $columns )
);


