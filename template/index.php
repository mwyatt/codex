<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title><?php echo $siteTitle ?></title>
	<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800" rel="stylesheet" type="text/css">
	<link rel="import" href="asset/highlightjs/syntax-highlight.html">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

<?php include $this->getPathTemplate('header/_css') ?>

</head>
<body>
	<div class="body-inner-container clearfix">
		<div class="site-heading-container">
			<h1 class="site-heading"><a href="#installation" class="site-heading-link js-smooth-scroll"><?php echo $siteTitle ?> <span class="npm-version"><?php echo $npmVersion ?></span></a></h1>
			<div class="site-heading-menu-secondary">
			    <div class="site-heading-menu-secondary-item"><a class="site-heading-menu-secondary-link" href="https://github.com/mwyatt/codex" target="_blank">Github</a></div>
			    <div class="site-heading-menu-secondary-item"><a class="site-heading-menu-secondary-link" href="https://www.npmjs.com/package/mwyatt-codex" target="_blank">NPM</a></div>
			</div>
		</div>
		<div class="menu-container">
			<div class="menu-hamburger"><?php // include $this->getPath('asset/hamburger.svg') ?></div>
			<nav class="menu-primary">
	
<?php foreach ($structure as $headingPrimary => $secondary): ?>
	
					<div class="menu-primary-item"><a href="#<?php echo $headingPrimary ?>" class="menu-primary-item-link js-smooth-scroll"><?php echo ucwords($headingPrimary) ?></a></div>

<?php endforeach ?>

			</nav>
		</div>
		<div class="content-container">
	
<?php foreach ($structure as $headingPrimary => $secondary): ?>

			<div id="<?php echo $headingPrimary ?>" class="container-primary">
				<div class="container-primary-inner">
				<h1 class="heading-primary mt0"><?php echo ucwords($headingPrimary) ?></h1>

	<?php $pathCode = $this->getPathBase() . 'template/code/_' . $headingPrimary . '.html' ?>
	<?php $code = file_exists($pathCode) ? file_get_contents($pathCode) : null ?>
	<?php include 'template/_' . $headingPrimary . '.php' ?>
	<?php foreach ($secondary as $headingSecondary): ?>

				<div class="container-secondary">
					<h2 class="heading-secondary"><?php echo ucwords($headingSecondary) ?></h2>

		<?php $pathCode = $this->getPathBase() . 'template/code/' . $headingPrimary . '/_' . $headingSecondary . '.html' ?>
		<?php $code = file_exists($pathCode) ? file_get_contents($pathCode) : null ?>
		<?php include 'template/' . $headingPrimary . '/_' . $headingSecondary . '.php' ?>

				</div>

	<?php endforeach ?>

				</div>
			</div>

<?php endforeach ?>

		</div>
	</div>
	<script>var phpUrl = <?php echo json_encode($url) ?></script>

	<script src="<?php echo $url->generateVersioned($this->getPathBase(), 'asset/lib.js') ?>"></script>
	<script src="<?php echo $url->generateVersioned($this->getPathBase(), 'asset/common.bundle.js') ?>"></script>

</body>
</html>
