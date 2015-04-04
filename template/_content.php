<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Codex</title>
	<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800" rel="stylesheet" type="text/css">
	<link href="asset/common.css" media="screen, projection, print" rel="stylesheet" type="text/css" />
</head>
<body>
	
<?php foreach ($structure as $headingPrimary => $secondary): ?>
	<?php include 'template/_' . $headingPrimary . '.php' ?>	
<?php endforeach ?>

</body>
</html>
