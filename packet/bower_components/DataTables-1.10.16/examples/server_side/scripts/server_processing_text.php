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
$table = "crosstab('SELECT family_id,family_name, sreport_month, count(family_id) from specimens 
left join species on specimens.species_species_id  = species.species_id 
left join genus on species.genus_genus_id = genus.genus_id 
left join family on genus.family_family_id = family.family_id
left join torder on family.torder_torder_id = torder.torder_id 
WHERE sreport_date > ''2018-09-30''
AND family_name <> ''Unknown''
GROUP BY family_id,sreport_month
ORDER BY family_name','SELECT m from generate_series(1,12) m ') 
AS (
family_id int,
family_name text,".
' "jan" int, '.
' "feb" int, '.
' "mar" int, '.
' "apr" int, '.
' "may" int, '.
' "jun" int, '.
' "jul" int, '.
' "aug" int, '.
' "sep" int, '.
' "oct" int, '.
' "nov" int, '.
' "dec" int '.
")";

// Table's primary key
$primaryKey = 'family_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
	array( 'db' => 'family_id', 'dt' => 0 ),
	array( 'db' => 'family_name',  'dt' => 1 ),
	array( 'db' => 'jan',   'dt' => 2 ),
	array( 'db' => 'feb',   'dt' => 3 ),
	array( 'db' => 'mar',   'dt' => 4 ),
	array( 'db' => 'apr',   'dt' => 5 ),
	array( 'db' => 'may',   'dt' => 6 ),
	array( 'db' => 'jun',   'dt' => 7 ),
	array( 'db' => 'jul',   'dt' => 8 ),
	array( 'db' => 'aug',   'dt' => 9 ),
	array( 'db' => 'sep',   'dt' => 10 ),
	array( 'db' => 'oct',   'dt' => 11 ),
	array( 'db' => 'nov',   'dt' => 12 ),
	array( 'db' => 'dec',   'dt' => 13 )
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

require( 'ssp.class.pg.php' );

echo json_encode(
	SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);


