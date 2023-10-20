<?php

function show_Spanish($n, $m)
{
   print_r($users['new'] = $n.$m);
}

function map_Spanish($n, $m)
{
    return (array($n => $m));
}

$array1 = ['name' => 'wichai', 'surname' => 'Srisuka'];
$array2 = ['name1' => 'sompong', 'surname1' => 'Thongkahow'];

$c = array_map("show_Spanish", $array1, $array2);

