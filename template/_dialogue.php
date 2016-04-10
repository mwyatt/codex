<?php $code = file_get_contents($this->getPathBase() . 'js/dialogue.js') ?>

<div class="typography">
	<p>Flexible generation with a variety of options.</p>
	<ol>

<?php foreach ([1, 2, 3, 4, 5, 6] as $key): ?>
	
		<li><span class="link js-dialogue-<?php echo $key ?>">Open</span></li>

<?php endforeach ?>

	</ol>
</div>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
