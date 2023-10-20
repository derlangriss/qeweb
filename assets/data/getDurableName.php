<?php
    require("postgresql2jsonPDO.class.php");
    ini_set('display_errors', 1);
    error_reporting(~0); 
        $serverName = "localhost";
        $userName = "mkmorgangling";
        $userPassword = "nepenthes";
        $dbName = "durable02";
   
        $conn = new PDO('mysql:dbname=durable02;host=localhost;', 'mkmorgangling', 'nepenthes');

       if ( isset($_GET['sDurableName'])){

        $query="SELECT * FROM durablename ORDER BY DURABLE_NAME ASC ";
                
        $stmt = $conn->prepare($query);
        $stmt->execute();
        
    
    } 
        if ( isset($_GET['sPlaceAlways'])){

        $query="SELECT * FROM placealways ORDER BY PLACE_ALWAYS ASC ";
        $stmt = $conn->prepare($query);
        $stmt->execute();
       
    }
        if ( isset($_GET['sRoom'])){

        $query="SELECT * FROM room ORDER BY ROOM ASC ";
                
        $stmt = $conn->prepare($query);
        $stmt->execute();
       
    }
        if ( isset($_GET['sPlace'])){

        $query="SELECT * FROM place ORDER BY PLACE ASC ";
                
        $stmt = $conn->prepare($query);
        $stmt->execute();
       
    }

        if ( isset($_GET['sOwner'])){

        $query="SELECT * FROM owner ORDER BY OWNER ASC ";
                
        $stmt = $conn->prepare($query);
        $stmt->execute();
       
    }

        if ( isset($_GET['sDurableId'])){

        $query="SELECT * FROM durableno ORDER BY DURABLE_NO_ID ASC ";
                
        $stmt = $conn->prepare($query);
        $stmt->execute();
       
    }
 

    
    
    $array = $stmt->fetchAll( PDO::FETCH_ASSOC );
    $data = json_encode( $array );

     
    echo $data;
?>
