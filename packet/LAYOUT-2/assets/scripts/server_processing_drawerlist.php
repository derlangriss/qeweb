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
$table = "specimensbox
left join subcabinet on subcabinet.subcabinet_id = specimensbox.subcabinet_subcabinet_id
left join cabinet on cabinet.cabinet_id = subcabinet.cabinet_cabinet_id
left join rcabinet on rcabinet.rcabinet_id = cabinet.rcabinet_rcabinet_id
left join family on family.family_id = specimensbox.family_family_id
";

// Table's primary key
$primaryKey = 'spec_box_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array(
        'as'        => 'as1',
        'tb'        => 'specimensbox',
        'db'        => 'spec_box_id',
        'dt'        => 'DT_RowId',
        'formatter' => function ($d, $row) {
            // Technically a DOM id cannot start with an integer, so we prefix
            // a string. This can also be useful if you have multiple tables 
            // to ensure that the id is unique with a different prefix
            return 'row_' . $d;
        },

    ),
    array('as' => 'as2', 'tb' => 'rcabinet', 'db' => 'rcabinet', 'dt' => 0),
    array('as' => 'as3', 'tb' => 'cabinet', 'db' => 'cabinet', 'dt' => 1),
    array('as' => 'as4', 'tb' => 'subcabinet', 'db' => 'sub_cabinet', 'dt' => 2),
    array('as' => 'as5', 'tb' => 'specimensbox', 'db' => 'spec_box', 'dt' => 3),
    array('as' => 'as6', 'tb' => 'family', 'db' => 'family_name', 'dt' => 4),
    array('as' => 'as7', 'tb' => 'specimensbox', 'db' => 'spec_box_id', 'dt' => 5),
    array('as' => 'as8', 'tb' => 'family', 'db' => 'family_id', 'dt' => 6)
);

// SQL server connection information
$sql_details = array(
    'user' => 'mkmorgangling',
    'pass' => 'nepenthes',
    'db'   => 'QEinsectsDB',
    'host' => 'localhost',
);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require 'ssp.class.oneTblnumber.php';

echo json_encode(
    SSP::simple($_POST, $sql_details, $table, $primaryKey, $columns)
);
