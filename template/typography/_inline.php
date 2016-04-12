<?php $code = file_get_contents($this->getPathBase() . 'template/code/typography/_inline.html') ?>

<div class="typography">
	<p>Inline elements.</p>
</div>
<div class="clearfix example-code"><?php echo $code ?></div>
<pre><code><?php echo trim($code) ?></code></pre>
