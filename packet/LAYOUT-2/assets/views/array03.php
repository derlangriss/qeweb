<?php
/*
$array1 = [
    '0' => ['name' => 'Hardik', 'Surname' => 'Savani'],
    '1' => ['name' => 'Harsukh', 'Surname' => 'Makawana'],
];

$array2 = [
    '0' => ['name1' => 'Harshad', 'Surname1' => 'Pathak'],
    '1' => ['name1' => 'Vimal', 'Surname1' => 'Kashiyani'],
];
*/
/*
$ac = array_merge($array1, $array2); // all-cases?
print_r($ac);*/

/*
$C = array_merge_recursive($array1, $array2);
$aWhere = array();
foreach ($C as $k=>$v) {

if (is_array($v)) {
$aWhere[] = $k . ' in ('.implode(', ',$v).')';
}
else {
$aWhere[] = $k . ' = ' . $v;
}
}
$where = implode(' AND ', $aWhere);
echo $where;

 */
function array_map_keys($param1, $param2, $param3 = null)
{
    $res = array();

    if ($param3 !== null) {
        foreach (array(2, 3) as $p_name) {
            if (!is_array(${'param' . $p_name})) {
                trigger_error(__FUNCTION__ . '(): Argument #' . $p_name . ' should be an array', E_USER_WARNING);
                return;
            }
        }
        foreach ($param2 as $key => $val) {
            $res[$key] = call_user_func($param1, $param2[$key], $param3[$key]);
        }
    } else {
        if (!is_array($param2)) {
            trigger_error(__FUNCTION__ . '(): Argument #2 should be an array', E_USER_WARNING);
            return;
        }
        foreach ($param2 as $key => $val) {
            $res[$key] = call_user_func($param1, $param2[$key]);
        }
    }
    return $res;
}
function show_Spanish($n, $m)
{

    return ($n . "," . $m);
}

$array1 = ['name' => 'Wichai', 'surname' => 'Srisuka'];
$array2 = ['name' => 'sompong', 'surname' => 'Thongkahow'];

$c = array_map_keys("show_Spanish", $array1, $array2);
var_dump($c);
