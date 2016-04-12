<?php $code = file_get_contents($this->getPathBase() . 'template/code/typography/_lead.html') ?>

<div class="typography">
	<p>Make a paragraph stand out by adding '.lead'.</p>
</div>
<div class="clearfix example-code"><?php echo $code ?></div>
<pre><code><?php echo htmlspecialchars(trim($code)) ?></code></pre>
