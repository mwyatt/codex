<?php $html = file_get_contents($this->getPath() . 'template/code/buttons/_default-buttons.html') ?>

<div class="typography">
	<p>Vanilla buttons can be used on all elements for a variety of implementations.</p>
</div>
<div class="example-code"><?php echo $html ?></div>
<pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($html) ?></code></pre>
