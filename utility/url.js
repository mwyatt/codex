var $ = require('jquery');


/**
 * handles all url operations
 * phpUrl must be defined to proceed
 */
var Url = function () {
  if (typeof phpUrl === 'undefined') {
    return console.warn('variable phpUrl must be defined');
  };
  this.protocol = phpUrl.protocol;
  this.base = phpUrl.base;
  this.path = phpUrl.path;
	this.routes = phpUrl.routes;
};


/**
 * get the base url plus any appended path
 * @param  {string} append path/query
 * @return {string}        
 */
Url.prototype.getBase = function(append) {
  var append = typeof append === 'undefined' ? '' : append;
	return this.protocol + this.base + append;
};


/**
 * generate a url using the routes stored
 * @param  {string} key    
 * @param  {object} config 
 * @return {string}        
 */
Url.prototype.generate = function(key, config) {
  var key = typeof key === 'undefined' ? '' : key;
  var config = typeof config === 'undefined' ? {} : config;

  // no key means home
  if (!key) {
    return this.getBase();
  };

  // generate route and replace any config
  var route = this.routes[key];
  if (config) {
    for (var property in config) {
      if (config.hasOwnProperty(property)) {
        route = route.replace(':' + property, config[property]);
      };
    };
  };

  // pass base plus route
  return this.getBase(route);
};


/**
 * redirect to generated url
 * @param  {string} key    
 * @param  {object} config 
 * @return {string}        
 */
Url.prototype.redirect = function(key, config) {
  var key = typeof key === 'undefined' ? '' : key;
  var config = typeof config === 'undefined' ? {} : config;
  var destination = this.generate(key, config);
	window.location.href = destination;
  return 'redirecting to \'' + destination + '\'';
};


/**
 * jump to exact specified url
 * @param  {string} path combine base and relative
 * @return {null}              
 */
Url.prototype.redirectAbsolute = function(path) {
	window.location.href = path;
};


module.exports = new Url;
