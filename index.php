<?php

define('PATH_BASE', (string) (__DIR__ . '/'));
include PATH_BASE . 'vendor/autoload.php';
$url = new \Mwyatt\Core\Url($_SERVER['HTTP_HOST'], $_SERVER['REQUEST_URI'], 'codex/');
$view = new \Mwyatt\Core\View($url);
$view->prependTemplatePath(PATH_BASE . 'template/');
$mux = new \Pux\Mux;
$router = new \Mwyatt\Core\Router($mux);
$database = new \Mwyatt\Core\Database;
$router->appendMuxRoutes([PATH_BASE . 'routes.php'], $database, $view, $url);
$url->setRoutes($router->getUrlRoutes());
echo "<script>var hihi = " . json_encode($url) . "</script>";

if ($route = $router->getRoute($url->getPath())) {
	$response = $router->executeRoute($route);
} else {
	$response = new \Mwyatt\Core\Response('Not Found', 404);
}

// render
$router->setHeaders($response);
echo $response->getContent();
