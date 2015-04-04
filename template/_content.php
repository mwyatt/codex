<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Codex</title>
	<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800" rel="stylesheet" type="text/css">
	<link href="asset/common.css" media="screen, projection, print" rel="stylesheet" type="text/css" />
	<link href="asset/vendor/rainbow/theme/github.css" media="screen, projection, print" rel="stylesheet" type="text/css" />
</head>
<body>
	<div class="container">
		<h1 class="site-heading">Codex</h1>
	
<?php foreach ($structure as $headingPrimary => $secondary): ?>

		<div class="container-primary">
			<h1 class="heading-primary"><?php echo $headingPrimary ?></h1>

	<?php include 'template/_' . $headingPrimary . '.php' ?>
	<?php foreach ($secondary as $headingSecondary): ?>

			<div class="container-secondary">
				<h2 class="heading-secondary"><?php echo $headingSecondary ?></h2>

		<?php $pathCode = BASE_PATH . 'template/code/' . $headingPrimary . '/_' . $headingSecondary . '.html' ?>
		<?php if (file_exists($pathCode)): ?>
			<?php $html = file_get_contents($pathCode) ?>
		<?php else: ?>
			<?php unset($html) ?>
		<?php endif ?>
		<?php include 'template/' . $headingPrimary . '/_' . $headingSecondary . '.php' ?>
	<?php endforeach ?>

			</div>
		</div>

<?php endforeach ?>

	</div>
    <script src="asset/vendor/rainbow.min.js"></script>
	<script src="asset/vendor/rainbow/language/generic.js"></script>
	<script src="asset/vendor/rainbow/language/html.js"></script>
	<script src="asset/vendor/rainbow/language/css.js"></script>
    <script src="asset/common.js"></script>
</body>
</html>
