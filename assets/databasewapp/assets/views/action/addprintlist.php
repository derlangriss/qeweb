<?php

$username = "mkmorgangling"; //mysql username
$password = "nepenthes"; //mysql password
$hostname = "localhost"; //hostname
$databasename = "qsbgcoll"; //databasename

$id = $_POST["id"];
$conn = pg_connect("host=$hostname dbname=$databasename user=$username password=$password") or die("Cannot connect to the database");
$resultArray = array();
  for($i=0;$i<count($id);$i++)
	{
		if($id[$i] != "")
		{
			
                        $sql= "select * from collection WHERE idcollection='".$id[$i]."'";
                         $res = pg_query($sql);
                        $row=pg_fetch_array($res);
                        extract($row);

                

                        
		}
                       
          $arr = array('txt' => '<table width="100%" id="table_'.$idcollection.'">
  <tr>
    <td width="60%">'.$collectionid.'</td>
    <td>Copies</td>
    <td width="15%">
	 <input name="'.$idcollection.'_cnt" id="'.$idcollection.'_cnt" value="1" type=text></input>
	</td>
	<td width="15%"><a href="#" onclick="window.remove('.$idcollection.');return false;" class="remove">remove</a></td>
  </tr>
</table>');
          array_push($resultArray,$arr);
       	
	}
         
           echo json_encode($resultArray);
?>


