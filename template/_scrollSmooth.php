<?php $code = file_get_contents($this->getPathBase() . 'js/scrollSmooth.js') ?>

<div class="typography">
	<p>Point this to links which visit the document you are currently on and it will smoothly transition to that location.</p>
	<p>Also possible to programmatically go to a target element.</p>
</div>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
