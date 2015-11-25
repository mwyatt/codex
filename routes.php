<?php

$this->mux->any('/', ['\\Mwyatt\\Codex\\Controller\\Index', 'home'], ['id' => 'home', 'constructor_args' => [$database, $view, $url]]);
