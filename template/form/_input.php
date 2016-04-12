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
<div class="clearfix example-code"><?php echo $code ?></div>
<pre><code><?php echo htmlspecialchars(trim($code)) ?></code></pre>
