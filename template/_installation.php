<p class="p">To install use the following command:</p>
<syntax-highlight lang="bash" theme="github-gist"><?php echo htmlentities(trim("
    npm install --save mwyatt-codex
")) ?></syntax-highlight>
<div class="typography">
    <ul class="hidden">
        <li><a href="https://github.com/mwyatt/codex" target="_blank">Github (mwyatt/codex)</a></li>
        <li><a href="https://www.npmjs.com/package/mwyatt-codex" target="_blank">NPM (mwyatt-codex)</a></li>
    </ul>

<?php if (!empty($gulpTasks)): ?>

    <p>Core gulp tasks</p>
    <ul>

    <?php foreach ($gulpTasks as $task): ?>
    
        <li><?php echo $task ?></li>
    
    <?php endforeach ?>

    </ul>
    
<?php endif ?>    

</div>
