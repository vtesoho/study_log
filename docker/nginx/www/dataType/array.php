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
        echo '执行这里start <br />';
        function getArray() {
            echo '执行这里getArray <br />';
            return array(1,2,3);
        }
        
        $arrarE = getArray()[1];

        var_dump($arrarE);
        echo '执行这里end <br />';


    ?>
</body>
</html>