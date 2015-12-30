<?php $code = file_get_contents(PATH_BASE . 'keycode.js') ?>

<div class="typography">
	<p>Allows easy reference of keycodes.</p>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($code) ?></code></pre>
