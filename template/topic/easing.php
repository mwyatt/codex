<h2 class="topic-heading">Easing</h2>
<div class="easings-container">

    <?php foreach ($easings as $ease): ?>

        <div class="ease-container">
            <div class="ease-ball <?php echo $ease ?>"></div>
            <span class="ease-label"><?php echo $ease ?></span>
        </div>

    <?php endforeach ?>

</div>
