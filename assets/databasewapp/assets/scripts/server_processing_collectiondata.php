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
$table = "collection
left join method on method_id=method_method_id
left join amphur on amphur_id=amphur_amphur_id
left join province on province_id = province_province_id";


// Table's primary key
$primaryKey = 'coll_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
	array( 'as'=>'as1','tb'=>'collection','db' => 'coll_id', 'dt' => 0 ),
	array( 'as'=>'as2','tb'=>'collection','db' => 'coll_full_id',  'dt' => 1 ),
	array( 'as'=>'as3','tb'=>'method','db' => 'method',      'dt' => 2 ),
	array( 'as'=>'as4','tb'=>'amphur','db' => 'amphur_en',     'dt' => 3 ),
	array( 'as'=>'as5','tb'=>'province','db' => 'province_en',     'dt' => 4 ),
	array( 'as'=>'as6','tb'=>'collection','db' => 'coll_start_date',     'dt' => 5 ),
	array( 'as'=>'as7','tb'=>'collection','db' => 'coll_end_date',     'dt' => 6 ),
    array( 'as'=>'as8','tb'=>'collection','db' => 'coll_locality', 'dt' => 7 ),
	array( 'as'=>'as9','tb'=>'collection','db' => 'coll_specific_locality',  'dt' => 8 ),
	array( 'as'=>'as10','tb'=>'collection','db' => 'coll_habitat',   'dt' => 9),
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

require( 'ssp.class.another.php' );

echo json_encode(
	SSP::simple( $_POST, $sql_details, $table, $primaryKey, $columns )
);


