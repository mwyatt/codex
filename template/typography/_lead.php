<?php $code = file_get_contents($this->getPathBase() . 'template/code/typography/_lead.html') ?>

<div class="typography">
	<p>Make a paragraph stand out by adding '.lead'.</p>
</div>
<div class="example-code"><?php echo $code ?></div>
<pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($code) ?></code></pre>
