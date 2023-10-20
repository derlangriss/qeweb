<?php

class dbConnect {

    private $conn;

    function __construct() {        
    }

    /**
     * Establishing database connection
     * @return database connection handler
     */
    function connect() {
        include_once '../config.php';

        // Connecting to mysql database
        $this->conn = new PDO("pgsql:host=$hostname;port=5432;dbname=$dbName", $dbUser, $dbPass);
/*
        // Check for database connection error
        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
*/
        // returing connection resource
        return $this->conn;
    }

}

?>
