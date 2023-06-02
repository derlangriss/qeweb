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
$table = "collector
left join allimages on allimages.another_id = collector.collector_id"; 

// Table's primary key
$primaryKey = 'collector_id';
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array(
        'as' => 'as1',
        'tb' => 'collector', 
        'db' => 'collector_id', 
        'dt' => 'DT_RowId',
        'formatter' => function( $d, $row ) {
            // Technically a DOM id cannot start with an integer, so we prefix
            // a string. This can also be useful if you have multiple tables
            // to ensure that the id is unique with a different prefix
            return $d;
        }

    ),   
    array('as' => 'as3', 'tb' => 'collector', 'db' => 'collector_firstname_en', 'dt' => 0),
    array('as' => 'as4', 'tb' => 'collector', 'db' => 'collector_lastname_en', 'dt' => 1),
    array('as' => 'as5', 'tb' => 'collector', 'db' => 'collector_firstname_th', 'dt' => 2),
    array('as' => 'as6', 'tb' => 'collector', 'db' => 'collector_lastname_th', 'dt' => 3),
    array('as' => 'as7', 'tb' => 'allimages', 'db' => 'images_path', 'dt' => 4),
);
// SQL server connection information
$sql_details = array(
    'user' => 'mkmorgangling',
    'pass' => 'nepenthes',
    'db'   => 'QEinsectsDB',
    'host' => 'localhost',
);
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
$whereadd = "images_type = 3 AND images_trash = 1 ";


require 'ssp.class.oneTbl.php';
echo json_encode(
    SSP::simple($_POST, $sql_details, $table, $primaryKey, $columns, $whereadd)
);
