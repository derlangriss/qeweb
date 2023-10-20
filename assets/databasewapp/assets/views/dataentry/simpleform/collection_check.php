<?php
include('_header.php');
if(isset($_POST['collectionid']))
{
$name=pg_escape_string($_POST['collectionid']);
$query=pg_query("select * from collection where collectionid='$collectionid'");
$row=pg_num_rows($query);
if($row==0)
{
echo "<span style='color:green;'>Available</span>";
}
else
{
echo "<span style='color:red;'>Already exist</span>";
}
}
?>