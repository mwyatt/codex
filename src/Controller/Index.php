<?php

namespace Mwyatt\Codex\Controller;


/**
 * @author Martin Wyatt <martin.wyatt@gmail.com> 
 * @version	0.1
 * @license http://www.php.net/license/3_01.txt PHP License 3.01
 */
class Index extends \Mwyatt\Core\Controller
{


	public function home() {
		$structure = array_merge((array) json_decode(file_get_contents('json/structure/css.json')), (array) json_decode(file_get_contents('json/structure/js.json')));
		$this
			->view
			->appendAsset('js', 'common')
			->appendAsset('css', 'common')
			->appendAsset('mustache', 'admin/dialogue')
			->setDataKey('siteTitle', 'mwyatt/codex')
			->setDataKey('structure', $structure);
		return new \Mwyatt\Core\Response($this->view->getTemplate('index'));
	}
}
