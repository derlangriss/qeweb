<?php
require_once "json-util.php";
if(!empty($_GET['getlist']))
{
    $list = $_GET['getlist'];
    $qry='';
    switch($list)
    {
        case 'countryCode':
        {
            $qry = "select CustomerID,countryCode from customer";
            break;
        }
    }
    /*
    Note: Why not send  the table name itself as the 'getlist'
    param (avoiding the switch above)?
    Because it is dangerous! that will enable anyone your database!
    */
    if(empty($qry)){ echo "invalid params! "; exit; }
    
    $dbconn = mysql_connect('localhost','mkmorgangling','nepenthes') 
            or die("DB login failed!");
    
    mysql_select_db('mydatabase', $dbconn) 
            or die("Database does not exist! ".mysql_error($dbconn));
    
    $result = mysql_query($qry,$dbconn)
            or die("Query $qry failed! ".mysql_error($dbconn));
    
    $rows = array();
        
    while($rec = mysql_fetch_assoc($result)) 
    {
        $rows[] = $rec;
    }
    mysql_free_result($result);
    mysql_close($dbconn);
    
    echo json_encode($rows);
}
?>