<?php

define('PATH_BASE', (string) (__DIR__ . '/'));
include PATH_BASE . 'vendor/autoload.php';
$config = include PATH_BASE . 'config.php';

// settings
$registry = \Mwyatt\Core\Registry::getInstance();

// build routes
$route = new \Mwyatt\Core\Entity\Route;
$route->type = 'get';
$route->key = 'home';
$route->path = '';
$route->controller = 'Mwyatt\\Codex\\Controller\\Index';
$route->method = 'home';

$url = new \Mwyatt\Core\Url($config['urlBase']);
$url->setRoutes([$route]);
$registry->set('url', $url);

// get response
$router = new \Mwyatt\Core\Router;
$router->appendRoutes([$route]);
$response = $router->getResponse($url->getPath());

// render
echo $response->getContent();
