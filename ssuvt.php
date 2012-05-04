<!DOCTYPE html>
<?php 
include('jsmin.php'); 
$uvt_min = JSMin::minify(file_get_contents('ss-uvt.js'));
?>
<html>
<head>
<title>Silverstripe urlvariable tool bookmarklet page / ss-uvt.js</title>
</head>
<body>
<h1>Hello</h1>
<p>This page helps in development of the SilverStripe Urlvartool. See <a href="http://doc.silverstripe.org/sapphire/en/reference/urlvariabletools">http://doc.silverstripe.org/sapphire/en/reference/urlvariabletools</a> for more information.</p>
<p>You will need a PHP-enabled webserver to use it.</p>
<p>It provides a bookmarklet. Drag this link to your browser's bookmark bar: <a href="javascript:<?php echo ($uvt_min); ?>">SS-UVT</a>, click the link to view it in action.</p>
<p>This project is available at Github: <a href="https://github.com/brackindustries/ss-uvt">https://github.com/brackindustries/ss-uvt</a></p>
<script type="text/javascript" defer="defer">
</script>
<p></p>
<!--script type="text/javascript" src="ss-uvt.js" ></script-->
</body>
</html>
