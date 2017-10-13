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
<div class="clearfix easings-container">
    
<?php foreach ($animations as $animation): ?>
    
    <div class="animation containing-box ease-container">
        <div class="ease-ball-container">
            <div class="animated <?php echo $animation ?>"></div>
        </div>
        <div class="ease-label"><?php echo $animation ?></div>
    </div>

<?php endforeach ?>

</div>
