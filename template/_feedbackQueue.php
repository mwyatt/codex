<?php $code = file_get_contents($this->getPath() . 'feedbackQueue.js') ?>

<div class="typography">
	<p>Presents the user with a feedback bar briefly which explains a recent action. Is this an admin element only?</p>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($code) ?></code></pre>
