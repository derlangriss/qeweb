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
$table = "durablelist
         left join owner on owner.owner_id = durablelist.m_owner_id
         left join sub_place on sub_place.sub_place_id = durablelist.sub_place_sub_place_id
         left join explace on explace.explace_id = sub_place.explace_explace_id
         left join status on status.status_id = durablelist.m_status_id
         left join responsible on responsible.response_id = owner.responsible_response_id
         left join orgsection on orgsection.section_id = durablelist.orgsection_section_id";

// Table's primary key
$primaryKey = 'durablelist_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array(
        'as'        => 'as1',
        'tb'        => 'durablelist',
        'db'        => 'durablelist_id',
        'dt'        => 'DT_RowId',
        'formatter' => function ($d, $row) {
            // Technically a DOM id cannot start with an integer, so we prefix
            // a string. This can also be useful if you have multiple tables
            // to ensure that the id is unique with a different prefix
            return 'row_' . $d;
        },

    ),
    array('as' => 'as2', 'tb' => 'durablelist', 'db' => 'durable_no_main', 'dt' => 0),
    array('as' => 'as3', 'tb' => 'durablelist', 'db' => 'durable_name_main', 'dt' => 1),
    array('as' => 'as4', 'tb' => 'owner', 'db' => 'owner', 'dt' => 2),
    array('as' => 'as5', 'tb' => 'responsible', 'db' => 'response_name', 'dt' => 3),
    array('as' => 'as6', 'tb' => 'sub_place', 'db' => 'room', 'dt' => 4),
    array('as' => 'as7', 'tb' => 'explace', 'db' => 'explace', 'dt' => 5),
    array('as' => 'as8', 'tb' => 'durablelist', 'db' => 'picture', 'dt' => 6),
    array('as' => 'as9', 'tb' => 'status', 'db' => 'status', 'dt' => 7),
    array('as' => 'as10', 'tb' => 'durablelist', 'db' => 'note', 'dt' => 8),
    array('as' => 'as11', 'tb' => 'durablelist', 'db' => 'durablelist_id', 'dt' => 9),
    array('as' => 'as12', 'tb' => 'orgsection', 'db' => 'section', 'dt' => 10),
    array('as' => 'as13', 'tb' => 'explace', 'db' => 'explace_id', 'dt' => 11),
    array('as' => 'as14', 'tb' => 'owner', 'db' => 'owner_id', 'dt' => 12)

    
    

);
// SQL server connection information
$sql_details = array(
    'user' => 'mkmorgangling',
    'pass' => 'nepenthes',
    'db'   => 'durable',
    'host' => 'localhost',
);

$section_id = $_POST['sectionid'];

$whereadd = "du_trash = 1 AND orgsection_section_id = ". $section_id." AND status_id = 1";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require 'ssp.class.oneTblnumber.php';

echo json_encode(
    SSP::simple($_POST, $sql_details, $table, $primaryKey, $columns,$whereadd)
);
