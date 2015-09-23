<?php $html = file_get_contents($this->getPath() . 'template/code/typography/_inline.html') ?>

<div class="typography">
	<p>Inline elements.</p>
</div>
<div class="example-code"><?php echo $html ?></div>
<pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($html) ?></code></pre>
