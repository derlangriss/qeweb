<?php
require "postgresql2jsonPDOcollector.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';
$collectorfield = array('collectorid', 'collectorfirsten', 'collectorlasten', 'collectoralias');

if (isset($_GET['collid'])) {
    $query = "SELECT collector_id,collector_firstname_en,collector_lastname_en,collector_label_alias FROM collection_has_collector as collected
                         left join collector on collected.collector_collector_id = collector.collector_id
                         left join collection on collected.collection_coll_id= collection.coll_id
                         WHERE coll_id ='" . $_GET["collid"] . "' ORDER BY  collector_id ASC";

    $stmt = $PDOconn->prepare($query);
    $stmt->execute();

    $num = $stmt->rowCount();

    $json = new postgresql2jsonPDO;
    $data = $json->getJSON($stmt, $num, $collectorfield);
    echo $data;
}
