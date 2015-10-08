<?php $code = file_get_contents($this->getPath() . 'scrollDirection.js') ?>

<div class="typography">
	<p>Looks at the direction that the user is scrolling and can add a class.</p>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($code) ?></code></pre>
