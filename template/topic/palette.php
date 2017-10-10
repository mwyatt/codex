<?php 

$colours = [
    'scorpion',
    'gallery',
    'razzmatazz',
    'bud',
    'red-damask',
    'white',
];

 ?>

<h2 class="topic-heading">Palette</h2>
<div class="topic-html">
    <div class="typography">
        <p>Colors generated from <a href="https://coolors.co/">Coolors</a> and names from <a href="http://chir.ag/projects/name-that-color/">Name That Color</a>.</p>
    </div>
    <div class="colors clearfix">

<?php foreach ($colours as $colour): ?>
    
    <div class="colour">
        <div class="colour-swatch background-<?php echo $colour ?>"></div>
        <span class=""><?php echo $colour ?></span>
    </div>

<?php endforeach ?>

    </div>
</div>
