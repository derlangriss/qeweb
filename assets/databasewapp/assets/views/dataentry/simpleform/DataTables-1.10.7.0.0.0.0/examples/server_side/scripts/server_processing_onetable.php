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
$table = "harvest";

// Table's primary key
$primaryKey = 'harvestid';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes

$columns = array(
	array( 'as'=>'as1','tb'=>'harvest','db' => 'harvestid', 'dt' => 0 ),
	array( 'as'=>'as2','tb'=>'harvest','db' => 'sample',  'dt' => 1 ),
	array( 'as'=>'as3','tb'=>'harvest','db' => 'parkid',   'dt' => 2 ),
	array( 'as'=>'as4','tb'=>'harvest','db' => 'locale',     'dt' => 3 ),
	array( 'as'=>'as5','tb'=>'harvest','db' => 'stateid',     'dt' => 4 ),
	array( 'as'=>'as6','tb'=>'harvest','db' => 'coords',     'dt' => 5 ),
	array( 'as'=>'as7','tb'=>'harvest','db' => 'date1',     'dt' => 6 ),
	array( 'as'=>'as8','tb'=>'harvest','db' => 'date2',     'dt' => 7 ),
	array( 'as'=>'as9','tb'=>'harvest','db' => 'altitude',     'dt' => 8 ),
	array( 'as'=>'as10','tb'=>'harvest','db' => 'collector',     'dt' => 9 ),
	array( 'as'=>'as11','tb'=>'harvest','db' => 'traptype',     'dt' => 10 ),
	array( 'as'=>'as12','tb'=>'harvest','db' => 'errata',     'dt' => 11 ),
);

// SQL server connection information
$sql_details = array(
	'user' => 'mkmorgangling',
	'pass' => 'nepenthes',
	'db'   => 'harvest',
	'host' => 'localhost'
);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.onetable.php' );

echo json_encode(
	SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);


