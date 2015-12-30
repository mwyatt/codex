<?php $code = file_get_contents(PATH_BASE . 'dialogue.js') ?>

<div class="typography">
	<p>Flexible generation with a variety of options.</p>
	<ol>

<?php foreach ([1, 2, 3, 4, 5, 6] as $key): ?>
	
		<li><span class="link-primary js-dialogue-<?php echo $key ?>">Open</span></li>

<?php endforeach ?>

	</ol>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($code) ?></code></pre>
