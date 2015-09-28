<?php $code = file_get_contents($this->getPath() . 'template/code/typography/_body.html') ?>

<div class="example-code"><?php echo $code ?></div>
<pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($code) ?></code></pre>
