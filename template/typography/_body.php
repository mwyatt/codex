<?php $html = file_get_contents($this->getPath() . 'template/code/typography/_body.html') ?>

<div class="example-code"><?php echo $html ?></div>
<pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($html) ?></code></pre>
