<?php $code = file_get_contents($this->getPathBase() . 'js/keyCode.js') ?>

<div class="typography">
	<p>Allows easy reference of keycodes.</p>
</div>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
