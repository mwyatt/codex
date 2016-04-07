<div class="typography">
	<p>This is a lightweight starting point for css & js functionality.</p>
    <ul>
        <li><a href="https://github.com/mwyatt/codex" target="_blank">Github (mwyatt/codex)</a></li>
        <li><a href="https://www.npmjs.com/package/mwyatt-codex" target="_blank">NPM (mwyatt-codex)</a></li>
    </ul>
    <p>Core gulp tasks</p>
    <ul>

<?php if (!empty($gulpTasks)): ?>
    <?php foreach ($gulpTasks as $task): ?>
    
        <li><?php echo $task ?></li>
    
    <?php endforeach ?>
<?php endif ?>    

    </ul>
</div>
