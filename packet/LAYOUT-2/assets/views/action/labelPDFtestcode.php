<?php
require_once 'LatexTemplate.php';
$resultArray         = array();
$arrCol              = array();
$arrCol['firstname'] = "สมพงษ์";

array_push($resultArray, $arrCol);

$labeltype = "specimens.tex";

try {
LatexTemplate::download($resultArray, $labeltype, 'label.pdf');
} catch (Exception $e) {
echo $e->getMessage();

}
 
/*
foreach ($resultArray as $labelitem) {
   echo LatexTemplate::escape($labelitem['firstname']);
}
*/
/*
echo json_encode($resultArray);
 */
