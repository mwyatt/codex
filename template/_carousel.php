<?php $code = file_get_contents($this->getPathBase() . 'carousel.js') ?>

<div class="typography">
	<p>Needs to</p>
	<ul>
		<li>Must allow multiple independant instances</li>
		<li>Loop through items</li>
	</ul>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($code) ?></code></pre>
