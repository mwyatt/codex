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
				<h2 class="topic-heading">Reset</h2>
				<div class="typography">
					<ul>
						<li><a href="https://necolas.github.io/normalize.css/" target="_blank">normalize.css</a></li>
					</ul>
				</div>
			</div>
			<div class="topic-container">
				<h2 class="topic-heading">BMS Menu</h2>
				<div class="topic-html">
					hi
				</div>
			</div>
			<div class="topic-container">
				<h2 class="topic-heading">Alert</h2>
				
				<div class="row">

					<?php foreach (['', 'success', 'fail'] as $type): ?>

						<div class="col-sm-4">
							<div class="alert <?php echo $type ?>">Hello alert <?php echo $type ?></div>
						</div>

					<?php endforeach ?>

				</div>
				
			</div>
			<div class="topic-container">
				<h2 class="topic-heading">Grid</h2>
				<div class="topic-html">
					<div class="row">
						<div class="col-xs-12 col-md-4">col</div>
						<div class="col-xs-12 col-md-4">col</div>
						<div class="col-xs-12 col-md-4">col</div>
					</div>
				</div>
			</div>
			<div class="topic-container">
				<h2 class="topic-heading">Portlet</h2>
				
				<div class="row">
						<div class="col-xs-12 col-md-4">
							<div class="portlet">
								<div class="portlet-actions right">
									<button class="button outline">Ok</button>
									<button class="button outline">Cancel</button>
								</div>
								<div class="portlet-title">
									General
								</div>
								<div class="portlet-body p1">
									<p>This a portlet body.</p>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-4">
							<div class="portlet">
								<div class="portlet-actions right">
									<button class="button outline">Ok</button>
									<button class="button outline">Cancel</button>
								</div>
								<div class="portlet-title">
									General
								</div>
								<div class="portlet-body">
									<table class="table">
										<tr>
											<th>Heading</th>
											<th>Heading</th>
										</tr>
										<tr>
											<td>Content</td>
											<td>Content</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
				</div>

			</div>
			<div class="topic-container">
				<h2 class="topic-heading">Typography</h2>
				<p class="topic-description p">Use the class 'typography' to wrap typographic elements. This will style them automatically.</p>
				<div class="topic-container-secondary">
					<div class="topic-html typography">
						<h1>Heading 1</h1>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						<h2>Heading 2</h2>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						<h3>Heading 3</h3>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						<h4>Heading 4</h4>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						<h5>Heading 5</h5>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						<h6>Heading 6</h6>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						<h2>Paragraph</h2>
						<p>Paragraph - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
						<h2>Italic</h2>
						<i>Italic</i>
						<h2>Bold</h2>
						<b>Bold</b>
						<a href="#">Anchor</a>
						<ul>
							<li>Unordered List item 1</li>
							<li>Unordered List item 2</li>
							<li>Unordered List item 3</li>
						</ul>
						<ol>
							<li>Ordered List item 1</li>
							<li>Ordered List item 2</li>
							<li>Ordered List item 3</li>
						</ol>
						<blockquote>Blockquote - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</blockquote>
					</div>
				</div>
			</div>
			<div class="topic-container">
				<h2 class="topic-heading">Form</h2>
				<div class="topic-container-secondary">
					<div class="row form-vertical">
						<div class="col-xs-12 col-sm-4">
							<div class="form-group">
								<label class="form-label" for="name">Input Text</label>
								<input id="name" type="text" class="form-control w100" placeholder="John Smith">
							</div>
							<div class="form-group">
								<label class="form-label" for="select">Select</label>
								<select id="select" class="form-control w100">
									<option value="">Foo</option>
									<option value="">Bar</option>
								</select>
							</div>
						</div>
						<div class="col-xs-12 col-sm-4">
							<div class="form-group">
								<label class="form-label" for="textarea">Textarea</label>
								<textarea id="textarea" class="form-control w100"></textarea>
							</div>							
							<div class="form-group">
								<label class="form-label" for="example-radio" class="form-label block">Example Label</label>
								<input id="example-radio" class="form-radio" name="example" type="radio">
								<label class="form-label" for="example-radio-2" class="form-label block">Example Label</label>
								<input id="example-radio-2" class="form-radio" name="example" type="radio">
							</div>
						</div>
					</div>
					<div class="text-right block-margins">
						<button class="button primary">Submit</button>
					</div>
				</div>
			</div>
			<div class="topic-container">
				<h2 class="topic-heading">Button</h2>
				<div class="topic-html">
					<div class="block-margins">
						<button class="button primary text-size-larger">Primary Button</button>
					</div>
					<div class="block-margins">
						<button class="button outline">Primary Button</button>
					</div>
					<div class="block-margins">
						<button class="button text-size-larger secondary">Secondary Button</button>
					</div>
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
