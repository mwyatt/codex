<?php if (!empty($asset['js'])) : ?>
	<?php foreach ($asset['js'] as $path) : ?>

<script src="<?php echo $url->generateVersioned($this->getPathBase(), 'asset/' . $path . '.js') ?>"></script>
		
	<?php
endforeach ?>
<?php endif ?>
