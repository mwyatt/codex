<?php if (isset($secondary)): ?>

<div class="container-primary">
	<h1 class="heading-primary"><?php echo $headingPrimary ?></h1>

	<?php foreach ($secondary as $headingSecondary): ?>
		<?php include 'template/' . $headingPrimary . '/_' . $headingSecondary . '.php' ?>
	<?php endforeach ?>

</div>

<?php endif ?>
