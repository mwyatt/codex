<?php $code = file_get_contents($this->getPathBase() . 'js/equalHeight.js') ?>

<div class="typography">
	<p>Equals the height of elements which have content with different lengths.</p>
</div>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
