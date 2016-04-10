<?php $code = file_get_contents($this->getPathBase() . 'js/spinner.js') ?>
<?php $codeHtml = file_get_contents($this->getPathBase() . 'template/code/_spinner.html') ?>

<div class="typography">
	<ul>
		<li>Flexible and portable spinning solution.</li>
		<li>Must be able to set multiple spinners.</li>
	</ul>
</div>
<div class="block-margins">
    <div class="spinner"></div>
</div>

<syntax-highlight lang="html" theme="github-gist"><?php echo trim($codeHtml) ?></syntax-highlight>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
