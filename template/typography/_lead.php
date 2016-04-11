<?php $code = file_get_contents($this->getPathBase() . 'template/code/typography/_lead.html') ?>

<div class="typography">
	<p>Make a paragraph stand out by adding '.lead'.</p>
</div>
<div class="clearfix example-code"><?php echo $code ?></div>
<syntax-highlight lang="html" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
