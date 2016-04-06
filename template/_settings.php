<?php $code = file_get_contents($this->getPathBase() . 'css/settings.css') ?>

<div class="typography">
	<p>These are the foundation variables which make the library work. But also work as a structure for any projects created using this.</p>
    <pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($code) ?></code></pre>
</div>
