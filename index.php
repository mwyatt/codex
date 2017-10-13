<?php

$package = file_get_contents('./package.json');
$package = json_decode($package);
$easings = [
    'ease-in-sine',
    'ease-out-sine',
    'ease-in-out-sine',
    'ease-in-quad',
    'ease-out-quad',
    'ease-in-out-quad',
    'ease-in-cubic',
    'ease-out-cubic',
    'ease-in-out-cubic',
    'ease-in-quart',
    'ease-out-quart',
    'ease-in-out-quart',
    'ease-in-quint',
    'ease-out-quint',
    'ease-in-out-quint',
    'ease-in-expo',
    'ease-out-expo',
    'ease-in-out-expo',
    'ease-in-circ',
    'ease-out-circ',
    'ease-in-out-circ',
    'ease-in-back',
    'ease-in-out-back',
];
$areaTemplates = [
    'layout',
    'form',
    'button',
    'badge',
    'animation',
    'easing',
    'grid',
    'palette',
    'dialogue',
    'toggler',
    'reset',
    // 'bms-menu',
    'alert',
    'grid',
    'portlet',
    'typography',
];

include 'template/home.php';
