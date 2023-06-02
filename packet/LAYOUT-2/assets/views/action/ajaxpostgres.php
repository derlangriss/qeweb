<?php
error_reporting(0);
include "_header.php";
if (isset($_POST) && count($_POST)) {
    $item_id     = $_POST['item_id'];
    $action      = $_POST['action'];
    $label_id    = $_POST["tlabel_id"];
    $nuberofitem = $_POST["tnumber_of_items"];
    $labeltype   = $_POST["tlabel_type"];

    if ($action == "save") { 

        $strSQL   = "SELECT * FROM labelprintqueue WHERE TRUE AND labeltype ='" . $labeltype . "' AND labelidtoprint =" . $label_id;
        $objQuery = pg_query($strSQL);
        $intRows  = pg_num_rows($objQuery);

        $concenid = pg_fetch_row($objQuery);

        if ($intRows > 0) {
            $res = pg_query("UPDATE labelprintqueue SET numberofitemstoprint = '" . $nuberofitem . "' WHERE labelidtoprint ='" . $label_id . "'
	        	AND labeltype ='" . $labeltype . "'");
            $lid = $concenid[0];

        } else {
            $res          = pg_query("insert into labelprintqueue values(DEFAULT,'" . $labeltype . "','" . $label_id . "','" . $nuberofitem . "',NULL,NULL)");
            $insert_query = pg_query("SELECT lastval();");
            $insert_row   = pg_fetch_row($insert_query);
            $lid          = $insert_row[0];
        }

        if ($lid) {
            echo json_encode(
                array(
                    "success"     => "1",
                    "row_id"      => $lid,
                    "label_id"    => htmlentities($label_id),
                    "nuberofitem" => htmlentities($nuberofitem),
                )
            );
        } else {
            echo json_encode(array("success" => "0"));
        }
    } else if ($action == "delete") {
        //echo "delete from info where id = '".$item_id."'";
        $res = pg_query("delete from labelprintqueue where idlabelprintqueue = '" . $item_id . "'");
        if ($res) {
            echo json_encode(array("success" => "1", "item_id" => $item_id));
        } else {
            echo json_encode(array("success" => "0"));
        }
        /*
    // PDO code
    $sql = "delete from info where id = :item_id";
    $q = $conn->prepare($sql);
    $res = $q->execute(array("item_id" => $item_id));

    //$res = mysql_query("delete from info where id = $item_id");
    if($res){
    echo json_encode(
    array(
    "success" => "1",
    "item_id" => $item_id
    )
    );
    }else{
    echo json_encode(array("success" => "0"));
    }
     */
    }
} else {
    echo json_encode(array("success" => "0"));
}
