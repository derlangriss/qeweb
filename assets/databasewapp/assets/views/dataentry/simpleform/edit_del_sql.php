<?
include 'config.php';
$collectionmethod = $_POST['collection_method'];

if($_POST['collection_method']){
if($collectionmethod == ""){
exit();
}
else{
$sql = "insert into collectionmethods (collectionmethodsdetails)

values ('$collectionmethod')";
pg_query($conn,$sql);
pg_close();



}
}
?>
<SELECT class="validate[required]" tabindex="20" id="txtcollection_method_ID" name="txtcollection_method_ID">
            <OPTION value="">
              Collection Method
            </OPTION><?
                                             $strSQL = "SELECT * FROM collectionmethods ORDER BY idcollectionmethods ASC ";
                                            $result = pg_query($conn,$strSQL);
                                            @pg_query("SET NAMES UTF8");
                                             while($objResult = pg_fetch_array($result))
                                            {
                                             extract($objResult);
                                              ?>

            <OPTION value="<?=$idcollectionmethods?>">
              <?=$collectionmethodsdetails?>
              </OPTION><?
                                            }
                                            ?>
</SELECT>