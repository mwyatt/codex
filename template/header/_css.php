<?php if (!empty($asset['css'])) : ?>
	<?php foreach ($asset['css'] as $path) : ?>
		
<link href="<?php echo $this->getUrlAssetCacheBusted($path . '.css') ?>" media="screen, projection, print" rel="stylesheet" type="text/css" />
		
	<?php
endforeach ?>
<?php endif ?>
