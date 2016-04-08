<?php $code = file_get_contents($this->getPathBase() . 'js/utility/url.js') ?>

<div class="typography">
	<p>Handles all url retrieval and operations.</p>
	<ul>
		<li>Depends upon 'baseUrl' global echoed from php script.</li>
	</ul>
</div>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($code) ?></syntax-highlight>
