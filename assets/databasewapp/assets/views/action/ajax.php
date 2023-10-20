<?php
error_reporting(0);
include("config.php");
if(isset($_POST) && count($_POST)){
	$fname = mysql_real_escape_string($_POST['fname']);
	$lname = mysql_real_escape_string($_POST['lname']);
	$email = mysql_real_escape_string($_POST['email']);
	$phone = mysql_real_escape_string($_POST['phone']);
	$item_id = $_POST['item_id'];
	$action = $_POST['action'];

	if($action == "save"){
		mysql_query("insert into info values(NULL,'".$fname."','".$lname."','".$email."','".$phone."')");
		$lid = mysql_insert_id();
		if($lid){
			echo json_encode(
				array(
				"success" => "1",
				"row_id" => $lid,
				"fname" => htmlentities($fname),
				"lname" => htmlentities($lname),
				"email" => htmlentities($email),
				"phone" => htmlentities($phone),
				)
			);
		}
		/* PDO query
		$values = array(
					':id'=>'',
					':fname'=>$fname,
					':lname'=>$lname,
					':email'=>$email,
					':phone'=>$phone
			      );

		$sql = "INSERT INTO info VALUES (:id,:fname,:lname,:email,:phone)";
		$q = $conn->prepare($sql);
		$res = $q->execute($values);
		if($conn->lastInsertId()){
			echo json_encode(
				array(
				"success" => "1",
				"row_id" => $conn->lastInsertId(),
				"fname" => htmlentities($fname),
				"lname" => htmlentities($lname),
				"email" => htmlentities($email),
				"phone" => htmlentities($phone),
				)
			);
			*/
		else{
			echo json_encode(array("success" => "0"));
		}
	}
	else if($action == "delete"){
		//echo "delete from info where id = '".$item_id."'";
		$res = mysql_query("delete from info where id = '".$item_id."'");
		if($res){
			echo json_encode(array( "success" => "1","item_id" => $item_id));
		}else{
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
}else{
	echo json_encode(array("success" => "0"));
}