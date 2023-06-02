<?php
date_default_timezone_set('America/New_York');
date("H:i:s");
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


















// DB table to use
$table = "crosstab('SELECT family_id,family_name, sreport_month, count(family_id) from specimens 
left join species on specimens.species_species_id  = species.species_id 
left join genus on species.genus_genus_id = genus.genus_id 
left join family on genus.family_family_id = family.family_id
left join torder on family.torder_torder_id = torder.torder_id 
WHERE sreport_date > ''2019-09-30''
AND family_name <> ''Unknown''
GROUP BY family_id,sreport_month
ORDER BY family_name','SELECT m from generate_series(1,12) m ') 
AS (
family_id int,
family_name text,
"Jan" int, 
"Feb" int, 
"Mar" int, 
"Apr" int,
"May" int,
"Jun" int,
"Jul" int,
"Aug" int, 
"Sep" int, 
"Oct" int, 
"Nov" int, 
"Dec" int 
) 

";

// Table's primary key
$primaryKey = 'specimens_id'; 

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array(
        'as'        => 'as1',
        'tb'        => 'specimens',
        'db'        => 'specimens_id',
        'dt'        => 'DT_RowId',
        'formatter' => function ($d, $row) {
            // Technically a DOM id cannot start with an integer, so we prefix
            // a string. This can also be useful if you have multiple tables
            // to ensure that the id is unique with a different prefix
            return 'row_' . $d;
        },

    ),
    array('as' => 'as2', 'tb' => 'specimens', 'db' => 'specimens_full_number', 'dt' => 0),
    array('as' => 'as3', 'tb' => 'torder', 'db' => 'torder_name', 'dt' => 1),
    array('as' => 'as4', 'tb' => 'family', 'db' => 'family_name', 'dt' => 2),
    array('as' => 'as5', 'tb' => 'drawer', 'db' => 'drawer_code', 'dt' => 3),
    array('as' => 'as6', 'tb' => 'specimens', 'db' => 'specimens_full_number', 'dt' => 4),
    array('as' => 'as7', 'tb' => 'torder', 'db' => 'torder_name', 'dt' => 5),
    array('as' => 'as8', 'tb' => 'family', 'db' => 'family_name', 'dt' => 6),
    array('as' => 'as9', 'tb' => 'collection', 'db' => 'coll_code', 'dt' => 7),
    array('as' => 'as10', 'tb' => 'collection', 'db' => 'coll_year', 'dt' => 8),
    array('as' => 'as11', 'tb' => 'collection', 'db' => 'coll_number', 'dt' => 9),
    array('as' => 'as12', 'tb' => 'specimensbox', 'db' => 'spec_box_code', 'dt' => 10)

);

// SQL server connection information
$sql_details = array(
    'user' => 'mkmorgangling',
    'pass' => 'nepenthes',
    'db'   => 'QEinsectsDB',
    'host' => 'localhost',
);

$whereadd = "specimens_trash = 1 AND container_type = ".$_POST['tcontainer_type'];

if (isset($_POST) && count($_POST)) {
    $report_month = $_POST['treport_month'];
    $report_year  = $_POST['treport_year'];


    if ($report_month === '0' && $report_year === '0') {
     
    } else {

        
        $month = $report_month;
        $year  = $report_year;

        $whereadd .= "AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year;
    }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require 'ssp.class.oneTblnumber.php';

echo json_encode(
    SSP::simple($_POST, $sql_details, $table, $primaryKey, $columns, $whereadd)
);
