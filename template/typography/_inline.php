<?php $code = file_get_contents($this->getPathBase() . 'template/code/typography/_inline.html') ?>

<div class="typography">
	<p>Inline elements.</p>
</div>
<div class="clearfix example-code"><?php echo $code ?></div>
<syntax-highlight lang="html" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
