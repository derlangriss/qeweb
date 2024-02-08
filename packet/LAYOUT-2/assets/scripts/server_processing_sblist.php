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
left join collection on collection.coll_id = specimens.collection_coll_id
left join species on species.species_id = specimens.species_species_id
left join genus on genus.genus_id = species.genus_genus_id
left join family on family.family_id = genus.family_family_id
left join torder on torder.torder_id = family.torder_torder_id
left join collectionresbox on collectionresbox.collbox_id = specimens.container_id 
";

// Table's primary key
$primaryKey = 'specimens_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array(
        'as'        => 'as1',
        'tb'        => 'specimens',
        'db'        => 'specimens_id',
        'dt'        => 'DT_RowId',
        'formatter' => function ($d, $row) {
            // Technically a DOM id cannot start with an integer, so we prefix
            // a string. This can also be useful if you have multiple tables 
            // to ensure that the id is unique with a different prefix
            return 'row_' . $d;
        },

    ),
    array('as' => 'as2', 'tb' => 'specimens', 'db' => 'specimens_full_number', 'dt' => 0),
    array('as' => 'as3', 'tb' => 'torder', 'db' => 'torder_name', 'dt' => 1),
    array('as' => 'as4', 'tb' => 'family', 'db' => 'family_name', 'dt' => 2),
    array('as' => 'as5', 'tb' => 'genus', 'db' => 'genus_name', 'dt' => 3),
    array('as' => 'as6', 'tb' => 'species', 'db' => 'species_name', 'dt' => 4),
    array('as' => 'as7', 'tb' => 'collection', 'db' => 'coll_code', 'dt' => 5),
    array('as' => 'as8', 'tb' => 'collection', 'db' => 'coll_year', 'dt' => 6),
    array('as' => 'as9', 'tb' => 'collection', 'db' => 'coll_number', 'dt' => 7),
    array('as' => 'as10', 'tb' => 'specimens', 'db' => 'specimens_number', 'dt' => 8),
    array('as' => 'as11', 'tb' => 'specimens', 'db' => 'identify_check', 'dt' => 9),
    array('as' => 'as12', 'tb' => 'specimens', 'db' => 'sreport_date', 'dt' => 10),
    array('as' => 'as13', 'tb' => 'collectionresbox', 'db' => 'collboxno', 'dt' => 11),

);

// SQL server connection information
$sql_details = array(
    'user' => 'mkmorgangling',
    'pass' => 'nepenthes',
    'db'   => 'QEinsectsDB',
    'host' => 'localhost',
);

$whereadd = "specimens_trash = 1 AND container_type = 1  ";

if (isset($_POST) && count($_POST)) {
    $report_month = $_POST['treport_month'];
    $report_year  = $_POST['treport_year'];
    $specbox_id   = $_POST['tspecbox_id'];

    if ($specbox_id === '0' ) {
        $whereadd .= "AND EXTRACT(MONTH FROM sreport_date) = " . $report_month . " AND EXTRACT(YEAR FROM sreport_date) = " . $report_year." ";
    } else {
        $month = $report_month;
        $year  = $report_year;

        $whereadd .= "AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year. " AND container_id = " . $specbox_id." ";
    }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require 'ssp.class.oneTblnumber.php';

echo json_encode(
    SSP::simple($_POST, $sql_details, $table, $primaryKey, $columns, $whereadd)
);
