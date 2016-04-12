<?php $code = file_get_contents($this->getPathBase() . 'template/code/buttons/_secondary.html') ?>

<div class="clearfix example-code"><?php echo $code ?></div>
<pre><code><?php echo htmlspecialchars(trim($code)) ?></code></pre>
