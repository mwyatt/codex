<?php $code = file_get_contents($this->getPathBase() . 'js/autoComplete.js') ?>

<div class="typography">
	<p>Todo! Keyboard navigable autocomplete.</p>
</div>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
