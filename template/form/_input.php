<?php $code = file_get_contents($this->getPathBase() . 'template/code/form/_input.html') ?>

<div class="typography">
    <p>Acceptable input types:</p>
    <ul>
        <li>text</li>
        <li>number</li>
        <li>password</li>
        <li>email</li>
    </ul>
</div>
<div class="example-code"><?php echo $code ?></div>
<pre class="rainbow-pre"><code data-language="html"><?php echo htmlentities($code) ?></code></pre>
