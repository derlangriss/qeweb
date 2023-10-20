<?php
require 'connectdb.php';
if ( !empty( $_FILES ) ) {
    $coll_id = $_POST["coll_id"];
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $serverUploadpath = './assets/views/action/uploads/';
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $savepathtodb = $serverUploadpath.$_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $strSQL = "INSERT INTO allimages ";
    $strSQL .= "(images_path,another_id)"; 
    $strSQL .= "VALUES ";
    $strSQL .= "('" . $savepathtodb . "',".$coll_id;
    $strSQL .= ")";
    $objQuery  = pg_query($strSQL);
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );
    echo $json;
} else {
    echo 'No files';
}
?>