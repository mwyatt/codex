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
<pre><code><?php echo htmlentities(trim("
@import 'mwyatt-codex/css/reset';
@import 'mwyatt-codex/css/keyframe';
@import 'mwyatt-codex/css/form';
@import 'mwyatt-codex/css/typography';
@import 'mwyatt-codex/css/reusable';
")) ?></code></pre>
