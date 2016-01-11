<?php

session_start();
$pathBase = (string) (__DIR__ . '/');
include $pathBase . 'vendor/autoload.php';
$request = new \Mwyatt\Core\Request;

$url = new \Mwyatt\Core\Url($request->getServer('HTTP_HOST'), $request->getServer('REQUEST_URI'), 'codex/');

$view = new \Mwyatt\Core\View;
$view->appendTemplatePath($pathBase . 'template/');
$view->setPathBase($pathBase);

$view->data->offsetSet('url', $url);

$routes = array_merge(
    include $view->getPathBase('routes.php')
);

$router = new \Mwyatt\Core\Router(new \Pux\Mux);

$router->appendMuxRoutes($routes);

$url->setRoutes($router->getMux());

$route = $router->getMuxRouteCurrent($url->getPath());

if ($route) {
	$request->setMuxUrlVars($route);
	$controllerNs = $router->getMuxRouteCurrentController();
	$controllerMethod = $router->getMuxRouteCurrentControllerMethod();

	$controller = new $controllerNs(new \Mwyatt\Core\ServiceFactory, $view);
	$response = $controller->$controllerMethod($request);
} else {
	$response = new \Mwyatt\Core\Response('Not Found', 404);
}

$router->setHeaders($response);
echo $response->getContent();
