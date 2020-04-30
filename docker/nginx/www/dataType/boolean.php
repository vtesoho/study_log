<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>布尔型</title>
</head>
<body>
    <?php
        $x = true;
        var_dump($x);
        echo $x;
        if($x !== false){
            echo 'true';
        }
        echo '<hr>';

        $a = false;
        var_dump($a);
        echo '|'.$a.'|';
        if($a === false){
            echo 'false';
        }
        if($a !== false){
            echo 'true';
        }
        echo '<hr>';
    ?>
</body>
</html>