<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title><?php echo $siteTitle ?></title>
	<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800" rel="stylesheet" type="text/css">

<?php include $this->getPathTemplate('header/_css') ?>

</head>
<body>
	<div class="body-inner-container">
		<h1 class="site-heading"><?php echo $siteTitle ?></h1>
		<div class="menu-container">
			<nav class="menu-primary">
				<ul>
	
<?php foreach ($structure as $headingPrimary => $secondary): ?>
	
					<li class="menu-primary-item"><a href="#<?php echo $headingPrimary ?>" class="menu-primary-item-link"><?php echo $headingPrimary ?></a></li>

<?php endforeach ?>

				</ul>
			</nav>
		</div>
		<div class="content-container">
	
<?php foreach ($structure as $headingPrimary => $secondary): ?>

			<div id="<?php echo $headingPrimary ?>" class="container-primary">
				<h1 class="heading-primary"><?php echo $headingPrimary ?></h1>

	<?php include 'template/_' . $headingPrimary . '.php' ?>
	<?php $pathCode = $this->getPath() . 'template/code/_' . $headingPrimary . '.html' ?>
	<?php $code = file_exists($pathCode) ? file_get_contents($pathCode) : null ?>
	<?php include 'template/_' . $headingPrimary . '.php' ?>
	<?php foreach ($secondary as $headingSecondary): ?>

				<div class="container-secondary">
					<h2 class="heading-secondary"><?php echo $headingSecondary ?></h2>

		<?php $pathCode = $this->getPath() . 'template/code/' . $headingPrimary . '/_' . $headingSecondary . '.html' ?>
		<?php $code = file_exists($pathCode) ? file_get_contents($pathCode) : null ?>
		<?php include 'template/' . $headingPrimary . '/_' . $headingSecondary . '.php' ?>

				</div>

	<?php endforeach ?>

			</div>

<?php endforeach ?>

		</div>
	</div>
	<script>var urlBase = '<?php echo $this->url->generate() ?>';</script>

<?php include $this->getPathTemplate('footer/_js') ?>

</body>
</html>
