<?php

$password = $_POST["password"];
$hash = $_POST["hash"];
require_once('wp-includes/class-phpass.php');
function wp_check_password($password, $hash) {
    global $wp_hasher;
    if ( empty($wp_hasher) ) {
        $wp_hasher = new PasswordHash(8, true);
    }
    return $wp_hasher->CheckPassword($password, $hash);
}
if ( wp_check_password($password,$hash) ) {
        echo "OK";
} else {
        echo "KO";
}

?>
