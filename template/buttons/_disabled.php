<?php $code = file_get_contents($this->getPathBase() . 'template/code/buttons/_disabled.html') ?>

<div class="typography">
	<p>Buttons can be disabled using the 'disabled' element attribute. Alternatively using the '.disabled' class.</p>
</div>
<div class="clearfix example-code"><?php echo $code ?></div>
<pre><code><?php echo htmlspecialchars(trim($code)) ?></code></pre>
