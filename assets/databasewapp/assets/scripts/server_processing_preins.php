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
$table = "preins_spec 
left join collection on collection.coll_id = preins_spec.preins_collid
left join users_auth on users_auth.uid = preins_spec.preins_staff_id

"; 

// Table's primary key
$primaryKey = 'preinsid';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array(
        'as' => 'as1',
        'tb' => 'preins_spec', 
        'db' => 'preinsid', 
        'dt' => 'DT_RowId'
        /**
        'formatter' => function( $d, $row ) {
            // Technically a DOM id cannot start with an integer, so we prefix
            // a string. This can also be useful if you have multiple tables
            // to ensure that the id is unique with a different prefix
            return 'row_'.$d;
        }**/

    ),
    array('as' => 'as2', 'tb' => 'collection', 'db' => 'coll_full_id', 'dt' => 0),
    array('as' => 'as3', 'tb' => 'preins_spec', 'db' => 'preins_spec_qty', 'dt' => 1),
    array('as' => 'as4', 'tb' => 'users_auth', 'db' => 'firstname', 'dt' => 2),
    array('as' => 'as5', 'tb' => 'preins_spec', 'db' => 'preins_date', 'dt' => 3)

);

// SQL server connection information
$sql_details = array(
    'user' => 'mkmorgangling',
    'pass' => 'nepenthes',
    'db'   => 'QEinsectsDB',
    'host' => 'localhost'
); 

$whereadd = "preins_state = 1";
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require 'ssp.class.oneTbl.php';

echo json_encode(
    SSP::simple($_POST, $sql_details, $table, $primaryKey, $columns,$whereadd)
);
