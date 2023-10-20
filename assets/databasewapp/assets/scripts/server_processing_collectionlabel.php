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
left join collectionmethods on idcollectionmethods=collectionmethods_idcollectionmethods
left join amphurs on idamphurs=amphurs_idamphurs
left join province on idprovince = province_idprovince
left join collectors on idcollectors = collectors_idcollectors";


// Table's primary key
$primaryKey = 'idcollection';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
	array( 'as'=>'as1','tb'=>'collection','db' => 'idcollection', 'dt' => 0 ),
	array( 'as'=>'as2','tb'=>'collection','db' => 'collectionid',  'dt' => 1 ),
	array( 'as'=>'as3','tb'=>'collectionmethods','db' => 'collectionmethodsdetails',      'dt' => 2 ),
	array( 'as'=>'as4','tb'=>'amphurs','db' => 'amphuren',     'dt' => 3 ),
	array( 'as'=>'as5','tb'=>'province','db' => 'provinceen',     'dt' => 4 ),    
	array( 'as'=>'as6','tb'=>'collection','db' => 'collectionstartdate',     'dt' => 5),
	array( 'as'=>'as7','tb'=>'collection','db' => 'collectionenddate',     'dt' => 6 ),
    array( 'as'=>'as8','tb'=>'collection','db' => 'collectionlocality', 'dt' => 7 ),
	array( 'as'=>'as9','tb'=>'collection','db' => 'collectionspecificlocality',  'dt' => 8 ),
	array( 'as'=>'as10','tb'=>'collection','db' => 'collectionhabitat',   'dt' => 9),
	array( 'as'=>'as11','tb'=>'collection','db' => 'collectionlatdec',     'dt' => 10 ),
	array( 'as'=>'as12','tb'=>'collection','db' => 'collectionlongdec',     'dt' => 11 ),
	array( 'as'=>'as13','tb'=>'collection','db' => 'collectionmasl',   'dt' => 12 ),
	array( 'as'=>'as14','tb'=>'collectors','db' => 'collectorsen',     'dt' => 13 ),	
	array( 'as'=>'as15','tb'=>'collection','db' => 'coll_code',     'dt' => 14 ),
	array( 'as'=>'as16','tb'=>'collection','db' => 'coll_year',     'dt' => 15 ),
	array( 'as'=>'as17','tb'=>'collection','db' => 'coll_number',     'dt' => 16 ),
	array( 'as'=>'as18','tb'=>'collection','db' => 'collectionlatd', 'dt' => 17 ),
	array( 'as'=>'as19','tb'=>'collection','db' => 'collectionlatm',  'dt' => 18 ),
	array( 'as'=>'as20','tb'=>'collection','db' => 'collectionlats',   'dt' => 19 ),
	array( 'as'=>'as21','tb'=>'collection','db' => 'collectionlongd',     'dt' => 20 ),
	array( 'as'=>'as22','tb'=>'collection','db' => 'collectionlongm',     'dt' => 21),
	array( 'as'=>'as23','tb'=>'collection','db' => 'collectionlongs',     'dt' => 22 ),

        
	
	
	
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


