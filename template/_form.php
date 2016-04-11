<?php $code = file_get_contents($this->getPathBase() . 'template/code/_form.html') ?>

<div class="typography">
	<p>Use the '.form' class to style up a form using a common theme. Alternatively there are many reusable styles to be used independently.</p>
</div>
<div class="clearfix example-code"><?php echo $code ?></div>
<syntax-highlight lang="html" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
