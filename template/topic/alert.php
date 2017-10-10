<h2 class="topic-heading">Alert</h2>
<div class="row">

    <?php foreach ([''] as $type): ?>

        <div class="col-xs-12 col-sm-4">
            <div class="alert <?php echo $type ?>">Hello alert <?php echo $type ?></div>
        </div>

    <?php endforeach ?>

</div>
