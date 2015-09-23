<?php

include 'vendor/autoload.php';

// settings
$registry = \Mwyatt\Core\Registry::getInstance();
$registry->set('pathBase', (string) (__DIR__ . '/'));

$urlBase = '192.168.1.185/codex/';
$url = new \Mwyatt\Core\Url($urlBase);

// build routes
$route = new \Mwyatt\Core\Entity\Route;
$route->type = 'get';
$route->key = 'home';
$route->path = '';
$route->controller = 'Mwyatt\\Codex\\Controller\\Index';
$route->method = 'home';

// get response
$router = new \Mwyatt\Core\Router;
$router->appendRoutes([$route]);
$response = $router->getResponse($url->getPath());

// render
echo $response->getContent();
