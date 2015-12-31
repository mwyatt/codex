<?php $code = file_get_contents($this->getPathBase() . 'template/code/typography/_inline.html') ?>

<div class="typography">
	<p>Inline elements.</p>
</div>
<div class="example-code"><?php echo $code ?></div>
<pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($code) ?></code></pre>
