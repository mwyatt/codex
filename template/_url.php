<?php $defaults = file_get_contents($this->getPathBase() . 'js/utility/url/defaults.js') ?>

<div class="typography">
    <p>Handles all url retrieval and operations.</p>
	<p>Here are the accepted options:</p>
</div>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim($defaults) ?></syntax-highlight>
<syntax-highlight lang="js" theme="github-gist"><?php echo trim("
Url.prototype.setup();
Url.prototype.getBase();
Url.prototype.generate();
Url.prototype.redirect();
Url.prototype.redirectAbsolute();
") ?></syntax-highlight>
