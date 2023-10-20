<?php
$report_month = 8;
$report_year  = 2018;

$month = date('m', $report_month);
$year  = date('Y', strtotime($report_year));
echo $month;
echo $year;
