<h2 class="topic-heading">Easing</h2>
<div class="easings-container">

    <?php foreach ($easings as $ease): ?>

        <div class="containing-box ease-container">
            <div class="ease-ball-container">
                <div class="ease-ball <?php echo $ease ?>"></div>
            </div>
            <div class="ease-label"><?php echo $ease ?></div>
        </div>

    <?php endforeach ?>

</div>
