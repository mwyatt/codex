<?php 

$colours = [
    'primary-0',
    'primary-1',
    'primary-2',
    'primary-3',
    'primary-4',
    'secondary-1-0',
    'secondary-1-1',
    'secondary-1-2',
    'secondary-1-3',
    'secondary-1-4',
    'secondary-2-0',
    'secondary-2-1',
    'secondary-2-2',
    'secondary-2-3',
    'secondary-2-4',
    'gray-10',
    'gray-20',
    'gray-30',
    'gray-40',
    'gray-50',
];

 ?>

<h2 class="topic-heading h2">Palette</h2>
<div class="topic-html">

<?php foreach ($colours as $colour): ?>
    
    <div class="colour">
        <div class="colour-swatch background-<?php echo $colour ?>"></div>
        <span class="colour-swatch-name"><?php echo $colour ?></span>
    </div>

<?php endforeach ?>

</div>
