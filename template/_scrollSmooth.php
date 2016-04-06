<?php $code = file_get_contents($this->getPathBase() . 'js/scrollSmooth.js') ?>

<div class="typography">
	<p>Point this to links which visit the document you are currently on and it will smoothly transition to that location.</p>
	<p>Also possible to programmatically go to a target element.</p>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($code) ?></code></pre>
