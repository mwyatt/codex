<?php $code = file_get_contents($this->getPathBase() . 'autoComplete.js') ?>

<div class="typography">
	<p>Todo! Keyboard navigable autocomplete.</p>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($code) ?></code></pre>
