<?php $code = file_get_contents($this->getPathBase() . 'js/lightbox.js') ?>

<div class="typography">
	<p></p>
</div>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
