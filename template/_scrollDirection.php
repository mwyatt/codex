<?php $code = file_get_contents($this->getPathBase() . 'js/scrollDirection.js') ?>

<div class="typography">
	<p>Looks at the direction that the user is scrolling and can add a class.</p>
</div>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
