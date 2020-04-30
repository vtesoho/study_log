<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>浮点型</title>
</head>
<body>
    <?php
        $floatA = 10.03;
        echo $floatA;
        var_dump($floatA);
        echo '<hr />';


        //如果小数位是0,不会显示出来
        $floatB = -9910.00;
        echo number_format($floatB,2,'.', '');
        var_dump($floatB);
        echo '<hr />';

    ?>
</body>
</html>