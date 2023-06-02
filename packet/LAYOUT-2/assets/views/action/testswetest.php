<?PHP
$month = 4;
$year  = 2019;
$mixdate = $year."-".$month;

$monthDisplay = date('F', strtotime($mixdate));
$yearDisplay  = date('Y', strtotime($year));


echo $monthDisplay;
?>