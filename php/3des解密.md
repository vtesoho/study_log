对方给的demo是7.1之前的，版本没办法切换，解密就只能用openssl，之前需要iv,现在不需要了。简洁很多




这是7.2以上版本
```php
public function encrypt($data, $key)
{
    $encData = openssl_encrypt($data, 'DES-EDE3', $key, OPENSSL_RAW_DATA);
    $encData = base64_encode($encData);
    return $encData;
}

/**
 * Decrypt
 * @param $data
 * @return string
 * @DateTime 2019-02-22  10:30
 */
public function decrypt($data, $key)
{
    $data    = base64_decode($data);
    $decData = openssl_decrypt($data, 'DES-EDE3', $key, OPENSSL_RAW_DATA);
    return $decData;
}
```


这是7.2以下版本
```php
class STD3Des
{
    private $key  = "";
    private $iv   = "";
    private $mode = MCRYPT_MODE_ECB;

    /**
     * 构造，传递二个已经进行base64_encode的KEY与IV
     *
     * @param string $key
     * @param string $iv
     */
    function __construct($key, $iv = null) {
        if (empty($key)) {
            echo 'key is not valid';
            exit();
        }
        if ($iv == null) {
            $iv         = $key;
            $this->mode = MCRYPT_MODE_ECB;
        }
        $this->key = $key;
        $this->iv  = $iv;
    }

    /**
     * 加密
     * @param <type> $value
     * @return <type>
     */
    public function encrypt($value) {
        $td    = mcrypt_module_open(MCRYPT_3DES, '', $this->mode, '');
        $iv    = $this->mode == MCRYPT_MODE_CBC ? base64_decode($this->iv) : mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
        $value = $this->PaddingPKCS7($value);
        $key   = base64_decode($this->key);
        mcrypt_generic_init($td, $key, $iv);
        $dec   = mcrypt_generic($td, $value);
        $ret   = base64_encode($dec);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);
        return $ret;
    }

    /**
     * 解密
     * @param <type> $value
     * @return <type>
     */

    public function decrypt($value) {
        $td  = mcrypt_module_open(MCRYPT_3DES, '', $this->mode, '');
        $iv  = $this->mode == MCRYPT_MODE_CBC ? base64_decode($this->iv) : mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
        $key = base64_decode($this->key);
        mcrypt_generic_init($td, $key, $iv);
        $ret = trim(mdecrypt_generic($td, base64_decode($value)));
        $ret = $this->UnPaddingPKCS7($ret);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);
        return $ret;
    }

    private function PaddingPKCS7($data) {
        $block_size   = mcrypt_get_block_size('tripledes', $this->mode);
        $padding_char = $block_size - (strlen($data) % $block_size);
        $data .= str_repeat(chr($padding_char), $padding_char);
        return $data;
    }

    private function UnPaddingPKCS7($text) {
        $pad = ord($text{strlen($text) - 1});

        if ($pad > strlen($text)) {
            return false;
        }

        if (strspn($text, chr($pad), strlen($text) - $pad) != $pad) {
            return false;
        }
        return substr($text, 0, -1 * $pad);
    }
}
```