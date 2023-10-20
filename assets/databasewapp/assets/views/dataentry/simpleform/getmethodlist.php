<?php
	require("postgresql2jsonPDO.class.php");
	ini_set('display_errors', 1);
	error_reporting(~0);
        $serverName = "localhost";
        $userName = "mkmorgangling";
        $userPassword = "nepenthes";
        $dbName = "qsbgcoll";
  
        $conn = new PDO('pgsql:host=localhost;port=5432;dbname=qsbgcoll', 'mkmorgangling', 'nepenthes');

        $query="SELECT * FROM collectionmethods ORDER BY idcollectionmethods ASC ";
                
	$stmt = $conn->prepare($query);
        $stmt->execute();
        
        $num=$stmt->rowCount();
	
	$json=new postgresql2jsonPDO;
	$data=$json->getJSON($stmt,$num);
	echo $data;
?>
