<?php
$title = $_POST['theTitle'];
$txt = $_POST['changedTones'];
$myfile = fopen("json/".$title.".txt", "w") or die("Unable to open file!");
// $txt = "abc";
fwrite($myfile, $txt);
fclose($myfile);
?>