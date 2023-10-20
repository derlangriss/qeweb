<?
include 'config.php';
$collector = $_POST['collector'];

if($_POST['collector']){
if($collector == ""){
exit();
}
else{
$sql = "insert into collectors (collectorsen)

values ('$collector')";
pg_query($conn,$sql);
pg_close();



}
}
?>
<SELECT class="validate[required]" tabindex="21" name="txtcollector_ID" id="txtcollector_ID" style="width:120px;" >
            <OPTION value="">
              Choose Collector
            </OPTION><?
                                              $strSQL = "SELECT * FROM collectors ORDER BY idcollectors ASC ";
                                              $objQuery = $result = pg_query($conn,$strSQL);
                                              @pg_query("SET NAMES UTF8");
                                              while($objResult = pg_fetch_array($objQuery))
                                              {
                                      extract($objResult);
                                           ?>

            <OPTION value="<?=$idcollectors?>">
              <?=$collectorsen?>
              </OPTION><?
                                             }
                                             ?>
            </SELECT>

