<?php
$output = '';

$nameArray = array(
    'firstname'  => 'Sompong',
    'lastname' => 'Thongkhaow',
  
);

/* Create the new array */
$users = array();

/* Add each user to the new array */
foreach ($nameArray as $key => $value) {
    $users[] = $value;
}
$output = 'The values are: ' . implode(' ', $users);
echo $output;
 