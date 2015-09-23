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
		$this
			->view
			->appendAsset('mustache', 'admin/dialogue')
			->setDataKey('structure', include $this->view->getPath('structure.php'));
		return new \Mwyatt\Core\Response($this->view->getTemplate('_content'));
	}
}
