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
$table = "images
right join species on species.idspecies = images.idspecies
left  join genus   on species.idgenus = genus.idgenus
left  join family  on genus.idfamily = family.idfamily";

// Table's primary key
$primaryKey = 'species.idspecies';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    
        array(
                'as' => 'as0',
                'tb' => 'images',
		'db' => 'gallery',
		'dt' => '0',
		'formatter' => function( $d, $row ) {
			// Technically a DOM id cannot start with an integer, so we prefix
			// a string. This can also be useful if you have multiple tables
			// to ensure that the id is unique with a different prefix
                        if (is_null($d)){
                        
                        return $d;
			
                        }
                        return sprintf("%'03d\n", $d);
		}
	),
        array( 'as'=>'as1','tb'=>'genus','db' => 'genusname',   'dt' => '1' ),
	array( 'as'=>'as2','tb'=>'species','db' => 'spname', 'dt' => '2' ),
	array( 'as'=>'as3','tb'=>'species','db' => 'thainame',  'dt' => '3' ),	
	array( 'as'=>'as4','tb'=>'family','db' => 'familyname',     "dt" => '4' )
	
	
);




// SQL server connection information
$sql_details = array(
	'user' => 'mkmorgangling',
	'pass' => 'nepenthes',
	'db'   => 'QSBGBF',
	'host' => 'localhost'
);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.pg.php' );

echo json_encode(
	SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
	
);


