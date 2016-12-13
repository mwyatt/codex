<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Codex</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800" rel="stylesheet" type="text/css">
	<link href="asset/common.bundle.css" media="screen, projection, print" rel="stylesheet" type="text/css" />
</head>
<body>
	<div class="body-inner-container site-padding">
		<div class="site-heading-container">
			<h1 class="site-heading">Codex <span class="npm-version"><?php echo $package->version ?></span></h1>
			<div class="site-slogan">A refreshing start for your css.</div>
			<div class="site-heading-menu">
			    <div class="site-heading-menu-item"><a class="site-heading-menu-link button" href="https://www.npmjs.com/package/mwyatt-codex" target="_blank">NPM</a></div>
			    <div class="site-heading-menu-item"><a class="site-heading-menu-link button" href="https://github.com/mwyatt/codex" target="_blank">Github</a></div>
			</div>
		</div>
		<div class="topics-container">
			<div class="topic-container">
				<h2 class="topic-heading">Typography</h2>
				<div class="topic-container-secondary">
					<h3 class="topic-heading-secondary">Heading</h3>
					<div class="topic-html typography">
						<h1>Heading 1</h1>
						<h2>Heading 2</h2>
						<h3>Heading 3</h3>
						<h4>Heading 4</h4>
						<h5>Heading 5</h5>
						<h6>Heading 6</h6>
					</div>
				</div>
				<div class="topic-container-secondary">
					<h3 class="topic-heading-secondary">Paragraph</h3>
					<div class="topic-html typography">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
					</div>
				</div>
				<div class="topic-container-secondary">
					<h3 class="topic-heading-secondary">List</h3>
					<div class="topic-html typography">
						<ul>
							<li>List item 1</li>
							<li>List item 2</li>
							<li>List item 3</li>
						</ul>
						<ol>
							<li>List item 1</li>
							<li>List item 2</li>
							<li>List item 3</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="topic-container">
				<h2 class="topic-heading">Form</h2>
				<div class="topic-container-secondary">
					<h3 class="topic-heading-secondary">Input</h3>
					<div class="topic-html">
						<input type="text" class="form-input" placeholder="John Smith">
					</div>
				</div>
				<div class="topic-container-secondary">
					<h3 class="topic-heading-secondary">Radio</h3>
					<div class="topic-html">
						<label for="example-radio" class="form-label block">Example Label</label>
						<input id="example-radio" class="form-radio" name="example" type="radio">
						<label for="example-radio-2" class="form-label block">Example Label</label>
						<input id="example-radio-2" class="form-radio" name="example" type="radio">
					</div>
				</div>
			</div>
			<div class="topic-container">
				<h2 class="topic-heading">Button</h2>
				<div class="topic-html">
					<button class="button text-size-larger">Primary Button</button>
					<button class="button text-size-larger secondary">Secondary Button</button>
				</div>
			</div>
			<div class="topic-container">
				<h2 class="topic-heading">Easing</h2>
				<div class="easings-container">

<?php foreach ($easings as $ease): ?>
	
					<div class="ease-container">
						<div class="ease-ball <?php echo $ease ?>"></div>
						<span class="ease-label"><?php echo $ease ?></span>
					</div>

<?php endforeach ?>

				</div>
			</div>
		</div>
	</div>
</body>
</html>
