<?php $code = file_get_contents($this->getPath() . 'template/code/typography/_heading.html') ?>

<div class="typography">
	<p>Encapsulates all loose typography and styles accordingly.</p>
</div>
<div class="example-code"><?php echo $code ?></div>
<pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($code) ?></code></pre>
