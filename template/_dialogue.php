<?php $code = file_get_contents($this->getPath() . 'dialogue.js') ?>

<div class="typography">
	<p>Flexible generation of dialogues. Examples:</p>
	<ol>

<?php foreach ([1, 2, 3] as $key): ?>
	
		<li><span class="link-primary js-dialogue-<?php echo $key ?>">Open</span></li>

<?php endforeach ?>

	</ol>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($code) ?></code></pre>
