<?php
	require("postgresql2jsonPDO.class.php");
	ini_set('display_errors', 1);
	error_reporting(~0);

    $serverName = "localhost";
    $userName = "mkmorgangling"; 
    $userPassword = "nepenthes"; 
    $dbName = "qsbgcoll";
    $conn = new PDO('pgsql:host=localhost;port=5432;dbname=qsbgcoll', 'mkmorgangling', 'nepenthes');



  if (!empty($_GET['sOrderid']))
    {

        if($_GET['sOrderid']!=""){
         $query="SELECT * FROM torder
                LEFT JOIN family ON torder.idtorder = family.torder_idtorder
                WHERE TRUE 
                AND torder.idtorder  = '".$_GET["sOrderid"]."'";
        
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $num=$stmt->rowCount();}
       
    }
  
     if (!empty($_GET['sFamilyid']))
    {
         $query="SELECT * FROM torder
                LEFT JOIN family ON torder.idtorder = family.torder_idtorder
                LEFT JOIN genus  ON family.idfamily = genus.family_idfamily
                WHERE TRUE 
                AND family.idfamily  = '".$_GET["sFamilyid"]."'";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $num=$stmt->rowCount();
    }

     if (!empty($_GET['sGenusid']))
    {
         $query="SELECT * FROM torder
                LEFT JOIN family ON torder.idtorder = family.torder_idtorder
                LEFT JOIN genus  ON family.idfamily = genus.family_idfamily
                LEFT JOIN species ON genus.idgenus = species.genus_idgenus
                WHERE TRUE 
                AND genus.idgenus  = '".$_GET["sGenusid"]."'";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $num=$stmt->rowCount();
    }

     if (!empty($_GET['sSpeciesid']))
    {
         $query="SELECT * FROM torder
                LEFT JOIN family ON torder.idtorder = family.torder_idtorder
                LEFT JOIN genus  ON family.idfamily = genus.family_idfamily
                LEFT JOIN species ON genus.idgenus = species.genus_idgenus
                WHERE TRUE 
                AND species.idspecies  = '".$_GET["sSpeciesid"]."'";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $num=$stmt->rowCount();
    }

    
        $json=new postgresql2jsonPDO;
        $data=$json->getJSON($stmt,$num);
        echo $data;




/*

    if (isset($_GET['sTorder']) && isset($_GET['taxaspec'])=='order')
    {
        $query="SELECT * FROM torder
                LEFT JOIN family ON torder.idtorder = family.torder_idtorder
                WHERE TRUE 
                AND torder.idtorder  = '".$_GET["sTorder"]."'";
	    $stmt = $conn->prepare($query);
        $stmt->execute();
        $num=$stmt->rowCount();*/

	/*}/*
    if (isset($_GET['sTorder']) && isset($_GET['taxaspec'])=='family')
    {
        $query="SELECT * FROM torder
                LEFT JOIN family ON torder.idtorder = family.torder_idtorder
                LEFT JOIN genus  ON family.idfamily = genus.family_idfamily
                WHERE TRUE 
                AND family.idfamily  = '".$_GET["sTorder"]."'";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $num=$stmt->rowCount();
    }*/
    

   

        /*
   if (isset($_GET['sOrderid']))
    {
        echo "order";
    }
  
     if (isset($_GET['sFamilyid']))
    {
        echo "family";
    }
    */
       
?>

