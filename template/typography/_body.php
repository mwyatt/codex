<?php $code = file_get_contents($this->getPathBase() . 'template/code/typography/_body.html') ?>

<div class="clearfix example-code"><?php echo $code ?></div>
<pre><code><?php echo trim($code) ?></code></pre>
