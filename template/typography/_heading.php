<?php $code = file_get_contents($this->getPathBase() . 'template/code/typography/_heading.html') ?>

<div class="example-code"><?php echo $code ?></div>
<pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($code) ?></code></pre>
