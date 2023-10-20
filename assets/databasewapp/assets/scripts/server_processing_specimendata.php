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
$table = "specimens
left join collection on idcollection=collection_idcollection
left join species on species.idspecies = specimens.species_idspecies
left join genus on genus.idgenus = specimens.genus_idgenus
left join family on family.idfamily = specimens.family_idfamily
left join torder on torder.idtorder = specimens.torder_idtorder
";

// Table's primary key
$primaryKey = 'idcollection';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
	array( 'as'=>'as1','tb'=>'specimens','db' => 'idspecimens', 'dt' => 0 ),
	array( 'as'=>'as2','tb'=>'specimens','db' => 'specimenfullnumber', 'dt' => 1 ),
	array( 'as'=>'as3','tb'=>'collection','db' => 'collectionid',  'dt' => 2 ),
	array( 'as'=>'as4','tb'=>'collection','db' => 'idcollection',      'dt' => 3 ),
	array( 'as'=>'as5','tb'=>'collection','db' => 'trash',     'dt' => 4 ),
    array( 'as'=>'as6','tb'=>'collection','db' => 'coll_code',  'dt' => 5 ),
	array( 'as'=>'as7','tb'=>'collection','db' => 'coll_year',      'dt' => 6 ),
	array( 'as'=>'as8','tb'=>'collection','db' => 'coll_number',     'dt' => 7 ),
    array( 'as'=>'as9','tb'=>'torder','db' => 'tordername',     'dt' => 8 ),
    array( 'as'=>'as10','tb'=>'family','db' => 'familyname',  'dt' => 9 ),
	array( 'as'=>'as11','tb'=>'genus','db' => 'genusname',      'dt' => 10 ),
	array( 'as'=>'as12','tb'=>'species','db' => 'speciesname',     'dt' => 11 ),
    array( 'as'=>'as13','tb'=>'specimens','db' => 'specimen_number',      'dt' => 12 ),
	
	
	
	
	
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


