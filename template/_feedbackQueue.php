<?php $code = file_get_contents($this->getPathBase() . 'js/feedbackQueue.js') ?>

<div class="typography">
	<p>Presents the user with a feedback bar briefly which explains a recent action.</p>
	<ul>

<?php foreach ([1, 2, 3] as $key): ?>
	
		<li><span class="link js-feedback-queue-<?php echo $key ?>">Create <?php echo $key ?></span></li>

<?php endforeach ?>

	</ul>
</div>
<!-- <pre><code><?php echo trim($code) ?></code></pre> -->
