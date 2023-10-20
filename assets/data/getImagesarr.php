<?php
require "postgresql2jsonPDOcollector.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';
$collectorfield = array('coll_id', 'images_id', 'another_id', 'images_path', 'flagship_image', 'images_type', 'images_trash');

if (isset($_GET['collid'])) {
    $query = "SELECT coll_id,images_id,another_id,images_path,flagship_image,images_type,images_trash FROM allimages as imagesdata
                         left join collection on imagesdata.another_id = collection.coll_id
                         WHERE coll_id ='" . $_GET["collid"] . "' AND images_trash = 1 ORDER BY  images_id ASC";

    $stmt = $PDOconn->prepare($query);
    $stmt->execute();

    $num = $stmt->rowCount();

    $json = new postgresql2jsonPDO;
    $data = $json->getJSON($stmt, $num, $collectorfield);
    echo $data;
}
