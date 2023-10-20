<?
include 'config.php';
$searchCollyear = $_POST['coll_year'];

if($_POST['coll_year']){
if($collyear == ""){
exit();
}
else{

$strSQL = "SELECT DISTINCT MAX(coll_number) FROM collection WHERE CAST(coll_year as text) LIKE '%".$searchCollyear."%' ORDER BY coll_number DESC ";
$objQuery = pg_query($strSQL);



pg_query($conn,$sql);
pg_close();



}
}
?>
<input type="hidden" class="collection" id="txtcoll_year" name="txtcoll_year" value="<?=$coll_number;?>" />