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
$table = "tambon_direct
left join amphur_direct on amphur_direct_id=amphur_direct_amphur_direct_id
left join province_direct on amphur_direct_id = province_direct_province_direct_id
";
// Table's primary key
$primaryKey = 'tambon_direct_id';
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
	array( 'as'=>'as1','tb'=>'tambon_direct','db' => 'tambon_direct_id', 'dt' => 0 ),
	array( 'as'=>'as2','tb'=>'tambon_direct','db' => 'tambon_direct_en', 'dt' => 1 ),
	array( 'as'=>'as3','tb'=>'amphur_direct','db' => 'amphur_direct_en', 'dt' => 2 ),
	array( 'as'=>'as4','tb'=>'province_direct','db' => 'province_direct_en',  'dt' => 3 )	
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
require( 'ssp.class.oneTbl.php' );
echo json_encode(
	SSP::simple( $_POST, $sql_details, $table, $primaryKey, $columns )
);