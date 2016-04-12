<p class="p">To install use the following command:</p>
<pre><code><?php echo htmlentities(trim("
npm install --save mwyatt-codex
")) ?></code></pre>
<div class="typography">

<?php if (!empty($gulpTasks)): ?>

    <p>Core gulp tasks</p>
    <ul>

    <?php foreach ($gulpTasks as $task): ?>
    
        <li><?php echo $task ?></li>
    
    <?php endforeach ?>

    </ul>
    
<?php endif ?>    

</div>
<p class="p">Then you can import into css:</p>
<syntax-highlight lang="css" theme="github-gist"><?php echo htmlentities(trim("
@import 'mwyatt-codex/css/reset.css';
@import 'mwyatt-codex/css/keyframe.css';
@import 'mwyatt-codex/css/form.css';
@import 'mwyatt-codex/css/typography.css';
@import 'mwyatt-codex/css/reusable.css';
")) ?></syntax-highlight>
<p class="p">Scripts can be used like this:</p>
<syntax-highlight lang="js" theme="github-gist"><?php echo htmlentities(trim("
var url = require('mwyatt-codex/js/utility/url');
")) ?></syntax-highlight>
