<?php $code = file_get_contents($this->getPathBase() . 'js/carousel.js') ?>

<div class="typography">
	<p>Still under development. Currently using   <a href="http://www.owlcarousel.owlgraphic.com/" target="_blank">Owl Carousel 2</a>.</p>
	<ul>
		<li>Must allow multiple independant instances</li>
		<li>Loop through items</li>
	</ul>
</div>
<pre class="rainbow-pre"><code data-language="js"><?php echo htmlentities($code) ?></code></pre>
