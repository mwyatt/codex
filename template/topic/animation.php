<?php 

$animations = [
    'zoomOut',
    'zoomIn',
    'fadeOut',
    'fadeOutRight',
    'fadeOutLeft',
    'fadeIn',
    'fadeInTop',
    'fadeOutTop',
    'fadeOutBottom',
    'verticalFlip',
    'horizontalFlip',
    'bounceOutBottom',
    'bounceOutTop',
    'bounceOutLeft',
    'bounceOutRight',
    'rubberBand',
    'tada',
    'rollOutRight',
    'rollOutLeft',
    'rotateClockwise',
    'rotateAntiClockwise',
    'flipInX',
    'flipOutX',
];

 ?>

<h2 class="topic-heading">Animation</h2>
<div class="topic-html clearfix">
    
<?php foreach ($animations as $animation): ?>
    
    <div class="animation">
        <div class="animated <?php echo $animation ?>"></div>
        <span><?php echo $animation ?></span>
    </div>

<?php endforeach ?>

</div>
