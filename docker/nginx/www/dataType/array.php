<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>数组</title>
</head>
<body>
    <?php
        $arrayA = array("A","B","C");
        var_dump($arrayA);
        print_r($arrayA[0]);
        print_r($arrayA[1]);

        echo '<hr />';

        //5.4版本后用[]替代array()
        //相同的key会被最后一条覆盖
        $arrayB = [
            'foo' => 'bar',
            'bar' => 'foo',
            'bar' => 'faaa',
        ];

        var_dump($arrayB);

        //可以数字与字符串做为key，如果没有指定key ,将自动使用之前用过的最大 integer 键名加上 1 作为新的键名。
        //这例子中d的key 为7
        $arrayC = [
            'a',
            'b',
            6 => 'c',
            'd',
        ];
        var_dump($arrayC);

        echo '<hr />';

        //访问数组单元
        $arrayD = array(
            'foo' => 'bar',
            42 => 24,
            'multi' => array(
                'dimensional' => array(
                    'array' => 'foo'
                )
            )
        );

        var_dump($arrayD['foo']);
        var_dump($arrayD[42]);
        var_dump($arrayD['multi']['dimensional']['array']);



        echo '<hr />';
        // 5.4 之后可以直接用返回数组的下标
        function getArray() {
            return array(1,2,3);
        }
        
        $arrarE = getArray()[1];

        var_dump($arrarE);


    ?>


    <h4>is_array 判断是否是数组</h4>
    <?php
        $is_array = [1,2,3];
        var_dump(is_array($is_array));
    ?>


    <h4>explode 字符串分隔成数组</h4>
    <?php
        $str = 'explodeA explodeB explodeC explodeD explodeE';
        $explode_arrA = explode(' ',$str);
        var_dump($explode_arrA);
        echo "<br />";
        
        $explode_arrB = explode(' ',$str,2);
        echo "<br /> explode(' ',str,2)";
        var_dump($explode_arrB);

        $explode_arrC = explode(' ',$str,-2);
        echo "<br />explode(' ',str,-2)";
        var_dump($explode_arrC);
    ?>


    <h4>array_change_key_case 将数组中的所有键名修改为全大写或小写</h4>
    <?php
        $arrayG = [
            "keyA" => "valueA",
            "keyB" => "valueB",
            "keyC" => "valueC",
        ];

        var_dump(array_change_key_case($arrayG,CASE_UPPER));

        var_dump(array_change_key_case($arrayG));
    ?>

    <h4>array_chunk 将一个数组分割成多个</h4>
    <?php
        $input_array = array('a', 'b', 'c', 'd', 'e');
        print_r(array_chunk($input_array, 2));
        print_r(array_chunk($input_array, 2, true));
    ?>


</body>
</html>