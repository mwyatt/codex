<?php $codeJs = file_get_contents($this->getPathBase() . 'spinner.js') ?>
<?php $codeHtml = file_get_contents($this->getPathBase() . 'template/code/_spinner.html') ?>

<div class="typography">
	<ul>
		<li>flexible and portable spinning solution</li>
		<li>must be able to set multiple spinners</li>
	</ul>
</div>
<div class="spinner-container">
    <div class="spinner"></div>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($codeHtml) ?></code></pre>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($codeJs) ?></code></pre>
