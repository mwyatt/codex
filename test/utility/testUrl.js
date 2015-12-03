url = require('utility/url');
console.log(url.getBase('append/'), url.generate());
console.assert(url.getBase('append/') == 'http://192.168.1.121/codex/append/', 'testGetBase');
console.assert(url.generate() == 'http://192.168.1.121/codex/', 'testGenerate');
