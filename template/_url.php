<?php $defaults = file_get_contents($this->getPathBase() . 'js/utility/url/defaults.js') ?>

<div class="typography">
    <p>Handles all url retrieval and operations.</p>
	<p>Here are the accepted options:</p>
</div>
<pre><code><?php echo htmlspecialchars(trim($defaults)) ?></code></pre>
<pre><code><?php echo trim("
Url.prototype.setup();
Url.prototype.getBase();
Url.prototype.generate();
Url.prototype.redirect();
Url.prototype.redirectAbsolute();
") ?></code></pre>
