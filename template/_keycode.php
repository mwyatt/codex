<?php $code = file_get_contents($this->getPathBase() . 'js/keyCode.js') ?>

<div class="typography">
	<p>Allows easy reference of keycodes.</p>
</div>
<pre><code><?php echo trim($code) ?></code></pre>
