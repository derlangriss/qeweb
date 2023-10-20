<?
if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('GMT');
}
include 'config.php';
$searchCollyear = $_POST['coll_year_on_inter'];
$curyear = date('Y');

if($searchCollyear == ""){
?>
<input type="text" class="collection" id="txtcoll_autonumber_inter" name="txtcoll_autonumber_inter" value="0001" />
<?
}
else if($searchCollyear > $curyear){
?>

<input type="text" class="collection" id="txtcoll_autonumber_inter" name="txtcoll_autonumber_inter" value="0001" />

<?
}
else{
$strSQL = "SELECT DISTINCT MAX(coll_number)+1 AS newnumber FROM collection WHERE coll_year = '".$searchCollyear."' ";
$objQuery = pg_query($strSQL);





while($objResult = pg_fetch_array($objQuery)){
?>

<input type="text" class="collection" id="txtcoll_autonumber_inter" name="txtcoll_autonumber_inter" value="<?=$objResult["newnumber"];?>" />

<?
}
}
?>
