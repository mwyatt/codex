<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Codex</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800" rel="stylesheet" type="text/css">
    <link href="asset/common.bundle.css?<?php echo filemtime('asset/common.bundle.css') ?>" media="screen, projection, print" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="body-inner-container site-padding">
        <div class="site-heading-container row">
            <div class="col-xs-12 col-sm-8">
                <h1 class="site-heading">Codex <span class="npm-version"><?php echo $package->version ?></span></h1>
                <div class="site-slogan">A refreshing start for your css.</div>
            </div>
            <div class="col-xs-12 col-sm-4 site-heading-menu">
                <div class="row">
                    <div class="col-xs-6">
                        <div class="site-heading-menu-item"><a class="site-heading-menu-link button" href="https://www.npmjs.com/package/mwyatt-codex" target="_blank">NPM</a></div>
                    </div>
                    <div class="col-xs-6">
                        <div class="site-heading-menu-item"><a class="site-heading-menu-link button" href="https://github.com/mwyatt/codex" target="_blank">Github</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="topics-container">

<?php foreach ($areaTemplates as $path): ?>

            <div class="topic-container">

    <?php include("template/topic/{$path}.php") ?>

            </div>
            
<?php endforeach ?>

        </div>
    </div>
</body>
</html>
