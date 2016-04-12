<?php $code = file_get_contents($this->getPathBase() . 'js/scrollDirection.js') ?>

<div class="typography">
	<p>Looks at the direction that the user is scrolling and can add a class.</p>
</div>
<pre><code><?php echo trim($code) ?></code></pre>
