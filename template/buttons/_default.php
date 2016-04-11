<?php $code = file_get_contents($this->getPathBase() . 'template/code/buttons/_default.html') ?>

<div class="typography">
	<p>Vanilla buttons can be used on all elements for a variety of implementations.</p>
</div>
<div class="clearfix example-code"><?php echo $code ?></div>
<syntax-highlight lang="html" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
