<?php $code = file_get_contents($this->getPathBase() . 'js/carousel.js') ?>

<div class="typography">
	<p>Still under development. Currently using   <a href="http://www.owlcarousel.owlgraphic.com/" target="_blank">Owl Carousel 2</a>.</p>
	<ul>
		<li>Must allow multiple independant instances</li>
		<li>Loop through items</li>
	</ul>
</div>
<pre><code><?php echo trim($code) ?></code></pre>
