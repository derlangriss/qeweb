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

// DB table to use
$table = "collection
left join collectionmethods on idcollectionmethods=collectionmethods_idcollectionmethods
left join amphurs on idamphurs=amphurs_idamphurs
left join collectors on idcollectors=collectors_idcollectors";

// Table's primary key
$primaryKey = 'idcollection';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier - in this case object
// parameter names
$columns = array(
	array(  'as'=>'as1',
	        'tb'=>'collection',
		'db' => 'idcollection',
		'dt' => 'DT_RowId',
		'formatter' => function( $d, $row ) {
			// Technically a DOM id cannot start with an integer, so we prefix
			// a string. This can also be useful if you have multiple tables
			// to ensure that the id is unique with a different prefix
			return 'row_'.$d;
		}
	),
	array( 'as'=>'as2','tb'=>'collection','db' => 'collectionid',  'dt' => 'collectionid' ),
	array( 'as'=>'as3','tb'=>'collectionmethods','db' => 'collectionmethodsdetails',      'dt' => 'collectionmethodsdetails' ),
	array( 'as'=>'as4','tb'=>'amphurs','db' => 'amphuren',     'dt' => 'amphuren' ),
	array( 'as'=>'as5','tb'=>'collection','db' => 'collectionstartdate',     'dt' => 'collectionstartdate' ),
	array( 'as'=>'as6','tb'=>'collection','db' => 'collectionenddate',     'dt' => 'collectionenddate' ),
        array( 'as'=>'as7','tb'=>'collection','db' => 'collectionlocality', 'dt' => 'collectionlocality' ),
	array( 'as'=>'as8','tb'=>'collection','db' => 'collectionspecificlocality',  'dt' => 'collectionspecificlocality' ),
	array( 'as'=>'as9','tb'=>'collection','db' => 'collectionhabitat',   'dt' => 'collectionhabitat'),
	array( 'as'=>'as10','tb'=>'collection','db' => 'collectionlatdec',     'dt' => 'collectionlatdec'),
	array( 'as'=>'as11','tb'=>'collection','db' => 'collectionlongdec',     'dt' => 'collectionlongdec' ),
	array( 'as'=>'as12','tb'=>'collection','db' => 'collectioneasting',     'dt' => 'collectioneasting' ),
        array( 'as'=>'as13','tb'=>'collection','db' => 'collectionnorthing', 'dt' => 'collectionnorthing'),
	array( 'as'=>'as14','tb'=>'collection','db' => 'collectionutm',  'dt' => 'collectionutm' ),
	array( 'as'=>'as15','tb'=>'collection','db' => 'collectionmasl',   'dt' =>  'collectionmasl' ),
	array( 'as'=>'as16','tb'=>'collectors','db' => 'collectorsen',     'dt' => 'collectorsen' ),
	array( 'as'=>'as17','tb'=>'collection','db' => 'newcollection',     'dt' => 'newcollection' ),
	array( 'as'=>'as18','tb'=>'collection','db' => 'testcollection',     'dt' => 'testcollection' )
	
);

$sql_details = array(
	'user' => 'mkmorgangling',
	'pass' => 'nepenthes',
	'db'   => 'qsbgcoll',
	'host' => 'localhost'
);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.another.php' );

echo json_encode(
	SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);

