<?php

$this->mux->any('/', ['\\Mwyatt\\Codex\\Controller\\Index', 'home'], ['id' => 'home', 'constructor_args' => [$database, $view, $url]]);
$this->mux->get('/foo/bar/:name/:id/', ['\\Mwyatt\\Codex\\Controller\\Index', 'home'], ['id' => 'foo.bar', 'constructor_args' => [$database, $view, $url]]);
