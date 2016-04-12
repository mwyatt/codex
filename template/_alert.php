<?php $code = file_get_contents($this->getPathBase() . 'template/code/_alert.html') ?>

<div class="typography">
	<p>Alert for generic inline warnings to stand out from other generic content.</p>
</div>
<div class="clearfix example-code"><?php echo $code ?></div>
<pre><code><?php echo htmlspecialchars(trim($code)) ?></code></pre>
