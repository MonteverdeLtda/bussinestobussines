/**
* Copyright (c) 2017-presente, FelipheGomez. Todos los derechos reservados.
*
* Por la presente, se le otorga una licencia mundial, libre de regalías y no exclusiva para usar,
* copiar, modificar y distribuir este software en código fuente o en forma binaria para su uso
* en relación con los servicios web y API proporcionados por FelipheGomez.
*
* Al igual que con cualquier software que se integra con las plataformas de FelipheGomez, su uso de
* Este software está sujeto a las políticas de la plataformas de FelipheGomez.
* Este aviso de copyright será Incluido en todas las copias o partes sustanciales del software.
*
* EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O
* IMPLÍCITOS, INCLUIDOS PERO NO LIMITADOS A LAS GARANTÍAS DE COMERCIALIZACIÓN, ADECUACIÓN
* PARA UN PROPÓSITO PARTICULAR Y NO INCUMPLIMIENTO. EN NINGÚN CASO LOS AUTORES O
* LOS TITULARES DEL DERECHO DE AUTOR SERÁN RESPONSABLES POR CUALQUIER RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, SI
* EN UNA ACCIÓN DE CONTRATO, CORTA O DE OTRA MANERA, DERIVADO DE, FUERA DE O DE
* CONEXIÓN CON EL SOFTWARE O EL USO O OTRAS REPARACIONES EN EL SOFTWARE.
*
**/
/* axios v0.18.0 | (c) 2018 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(5),u=n(6),a=r(u);a.Axios=s,a.create=function(e){return r(o.merge(u,e))},a.Cancel=n(23),a.CancelToken=n(24),a.isCancel=n(20),a.all=function(e){return Promise.all(e)},a.spread=n(25),e.exports=a,e.exports.default=a},function(e,t,n){"use strict";function r(e){return"[object Array]"===R.call(e)}function o(e){return"[object ArrayBuffer]"===R.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return"string"==typeof e}function a(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===R.call(e)}function d(e){return"[object File]"===R.call(e)}function l(e){return"[object Blob]"===R.call(e)}function h(e){return"[object Function]"===R.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function g(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function v(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)v(arguments[n],e);return t}function b(e,t,n){return v(t,function(t,r){n&&"function"==typeof t?e[r]=E(t,n):e[r]=t}),e}var E=n(3),C=n(4),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:i,isArrayBufferView:s,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:g,forEach:v,merge:x,extend:b,trim:w}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(6),i=n(2),s=n(17),u=n(18);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,{method:"get"},this.defaults,e),e.method=e.method.toLowerCase();var t=[u,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(8):"undefined"!=typeof process&&(e=n(8)),e}var i=n(2),s=n(7),u={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:o(),transformRequest:[function(e,t){return s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){a.headers[e]={}}),i.forEach(["post","put","patch"],function(e){a.headers[e]=i.merge(u)}),e.exports=a},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(9),i=n(12),s=n(13),u=n(14),a=n(10),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(15);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",w=e.auth.password||"";d.Authorization="Basic "+c(y+":"+w)}if(l.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:r,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:n,config:e,request:l};o(t,f,i),l=null}},l.onerror=function(){f(a("Network Error",e,null,l)),l=null},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var g=n(16),v=(e.withCredentials||u(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v)}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null)}),void 0===p&&(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(10);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(11);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t){"use strict";function n(){this.message="String contains an invalid character"}function r(e){for(var t,r,i=String(e),s="",u=0,a=o;i.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if(r=i.charCodeAt(u+=.75),r>255)throw new n;t=t<<8|r}return s}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=r},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),s===!0&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),i=n(19),s=n(20),u=n(6),a=n(21),c=n(22);e.exports=function(e){r(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||u.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});

var FG = {};

var aPiMap = axios.create({
	baseURL: 'https://nominatim.openstreetmap.org',
	// timeout: 10000,
	headers: {
		'accept-language': 'es_CO',
	}
});

FG = {
	config: {
		host:'https://b2b.monteverdeltda.com/',
		path_api:'https://b2b.monteverdeltda.com/api/api.php'
	},
	userActive: {
		status: 'not_authorized',
		authResponse: {
			accessToken: 'none',
			userID:'0',
			userData: {
				id: 0,
				location: '',
				password: '',
				username: '',
			}
		}
	},
	exceptionFG: function(message) {
		this.message = message;
		this.name = "exceptionFG";
	},
	init: function(options) {
		var s = this;
		s.Modal.loadStyle();
		
		axios.create({
			headers: {"Access-Control-Allow-Origin": '*'},
			baseURL: s.config.host,
			//timeout: 1000,
			//	withCredentials: true
		});
		
		/**/
		axios.interceptors.response.use(function(response) {
			if (response.headers['x-xsrf-token']) { document.cookie = 'XSRF-TOKEN=' + response.headers['x-xsrf-token'] + '; path=/'; };
			return response;
		});
			
		s.session_check();
	},
	url_api_use: function(){
		return this.config.path_api + '/records';
	},
	getLoginStatus: function(callback) {
		var s = this;
		if(localStorage._csrf != undefined &&  localStorage._idUser != undefined && localStorage._idUser > 0)
			{
				s.callback("GET", s.url_api_use() + '/users/' + localStorage._idUser, {
					csrf: localStorage._csrf,
					filter: [ 'id,eq,' + localStorage._idUser ],
					join: [ 'permissions' ]
				}, function(r2){
					if(r2.id > 0){
						//r2.permissions = JSON.parse(r2.permissions);
						r2.permissions.data = JSON.parse(r2.permissions.data);
						s.userActive.status = 'connected';
						s.userActive.authResponse.accessToken = localStorage._csrf;
						s.userActive.authResponse.userID = r2.id;
						s.userActive.authResponse.userData = r2;
					}
					return callback(s.userActive);
				});
			}
		else 
			{
				return callback(s.userActive);
			}
	},
	url_api: function(){
		var s = this;
		var tu = s.config.path_api;
		return tu;
	},
	api: function(m = 'GET', p = '', d = null, cb) {
		var s = this;
		if(!m){ throw new s.exceptionFG('Falta el metodo.'); };
		if(!p){ throw new s.exceptionFG('Falta la url de la api.'); };
		var tu = s.url_api_use() + p;
		s.callback(m, tu, d, cb);
	},
	callback: function(method,url,fields,callback){
		var s = this;
		if(fields == undefined) { fields = {}; }
		
		var json = {
			code: 404,
			error: true,
			status: 'Unauthorized',
			message: 'sin mensaje'
		};
		
		if(method == 'GET')
			{
				axios.get(url, {
					params: fields
				  })
				  .then(function (response) {
					json = response.data;
					if(json.records != undefined)
						{
							json = json.records;
						}
						callback(json);
				  })
				  .catch(function (error) {
					  json = error;
					  callback(json.response);
				  });
			}
		else if(method == 'POST')
			{
				axios.post(url, fields)
				  .then(function (response) {
					json = response.data;
					callback(json);
				  })
				  .catch(function (error) {
					json = error;
					callback(json.response);
				  });
			} 
		else 
			{
				axios({
					method: method,
					url: url,
					responseType: 'json',
					data: fields,
					withCredentials: true
				})
				.then(function (response) {
					json = response.data;
					callback(json);
				})
				.catch(function (error) {
					json = error;
					callback(json.response);
				  });
			};
	},
	callbackXRM: function(method,url,fields,callback){
		var s = this;
		
		var xhr = new XMLHttpRequest(); 
		var json = {
			code: 404,
			error: true,
			status: 'Unauthorized',
			message: 'sin mensaje'
		};
		
		if(method == 'GET')
			{
				fields = s.json_to_url(fields);
				xhr.open(method, url + '?' + fields, true);
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						json = JSON.parse(xhr.responseText);
						callback(json);
					}
				}
				xhr.send(); 
			}
		else if(method == 'POST' || method == 'PUT')
			{
				var xhr = new XMLHttpRequest();
				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4 && xhr.status === 200){
						json = JSON.parse(xhr.responseText);
						callback(json);
					}
				};
				var data = JSON.stringify(fields);
				xhr.send(data);
			}
		else 
			{
				console.log('Methodo no admitido o no reconocido.');
			};
	},
	session_clear: function(){
		localStorage.clear();
		window.location.reload();
	},
	session_check: function(){
		var s = this;
		var r = false;
		if(!localStorage._csrf &&  localStorage._idUser)
			{ s.session_clear(); }
		else if(localStorage._csrf &&  !localStorage._idUser)
			{ s.session_clear(); };
		if(localStorage._csrf != undefined &&  localStorage._idUser != undefined && localStorage._idUser > 0)
			{
				s.callback("GET", s.url_api_use() + '/users/' + localStorage._idUser, {
					csrf: localStorage._csrf,
					filter: [ 'id,eq,' + localStorage._idUser ],
					join: [ 'permissions' ]
				}, function(r){
					s.session_save(r);
				});
			}
		return r;
	},
	session_save: function(r){
		var s = this;
		if(localStorage._csrf != undefined &&  localStorage._idUser != undefined && localStorage._idUser > 0)
			{
				if(r != undefined && r.id > 0){
					r.permissions = JSON.parse(r.permissions);
					r.permissions.data = JSON.parse(r.permissions.data);
					s.userActive.status = 'connected';
					s.userActive.authResponse.accessToken = localStorage._csrf;
					s.userActive.authResponse.userID = r.id;
					s.userActive.authResponse.userData = r;
				}
			}
	},
	session_close: function (){
		var s = this;
		localStorage.clear();
		s.callback("POST", s.url_api(), {
			'logout': true
		}, function(response){
		});
			window.location.reload();
	},
	callback_active: function(r){
		console.log('Callback No definido.');
		console.log(r);
	},
	loadSession: function(){
		var self = this;
		return self.userActive;
	},
	AccessToken: function (){
		var s = this;
		var _me = s.userActive;
		if(_me.authResponse.accessToken != 'none'){
			return (_me.authResponse.accessToken);
		}else{
			return false;
		}
	},
	json_to_url: function(data){
		return Object.keys(data).map(function(k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }).join('&');
	},
	input_to_code: function(target){
		var self = this;
		var params = {};
		for (var k in target){
			if (typeof target[k] !== 'function') {
				if(target[k].name != undefined && target[k].value != undefined)
					{
						temp_name = target[k].name;
						temp_value = target[k].value;
						params[temp_name] = temp_value;
					}
			}
		}
		return params;
	},
	postLogIn: function(id_form, method, callback){
		var s = this;
		var oAlert = document.getElementById(id_form + '-alert-error');
		method = method || "post";
		callback = callback || s.callback_active;
		var oForm = document.getElementById(id_form);
		var params = s.input_to_code(oForm.elements);
		
		s.callback("POST", s.url_api(), params, function(csrfToken){
			if(csrfToken.error != undefined && csrfToken.error == true && csrfToken.response)
				{
					console.log('No se pudo inicar sesion, intenta nuevamente.');
					oAlert.className = 'alert alert-danger';
					oAlert.innerHTML = 'No se pudo inicar sesion, intenta nuevamente.';
				}
			else 
				{
					console.log('Cargando Usuario.');
					s.callback("GET", s.url_api_use() + '/users', {
						csrf: csrfToken,
						filter: [
							'username,eq,' + params.username
						]
				   	}, function(r){
						console.log(r);
						if(r.error == true)
							{
								console.log('Error.');
								oAlert.className = 'alert alert-danger';
								oAlert.innerHTML = 'Ocurrio un error, intenta nuevamente.';
							}
						else if(r[0] && Number(r[0].id) > 0)
							{
								console.log('Guardando Usuario.');
								console.log(r[0]);
								oAlert.className = 'alert alert-success';

								localStorage._csrf = csrfToken;
								localStorage._idUser = r[0].id;
								window.location.reload();
							}
						else 
							{
								console.log('Datos invalidos.');
								oAlert.className = 'alert alert-danger';
								oAlert.innerHTML = 'Datos invalidos, intenta nuevamente.';
							}
					});
					
				}
		});
	},
	login: function (callback){
		var self = this;
		var code =  new Date().valueOf();
		var id_form = 'FG-login-modal-form-' + code;
		
		FG.callback_active = callback;
		FG.Modal.create('FG-login-modal', `
			<div class="login-container">
				<div class="login-box animated fadeInDown">
					<div class="login-logo"></div>
					<div class="login-body">
						<div id="` + id_form + `-alert-error" class="login-title" role="alert"><strong>Bienvenid@</strong>, Por favor ingresa.</div>
						<form action="javascript:FG.postLogIn('` + id_form + `', 'POST');" id="` + id_form + `" method="POST">
						
							<div class="form-group">
								<div class="col-md-12">
									<input type="text" class="form-control" name="username" required autofocus />
								</div>
							</div>
							<div class="form-group">
								<div class="col-md-12">
									<input type="password" class="form-control" name="password" required />
								</div>
							</div>
							<div class="form-group">
								<div class="col-md-6">
									<a href="#" class="btn btn-link btn-block">¿Olvidaste tu contraseña?</a>
								</div>
								<div class="col-md-6">
									<button type="submit" class="btn btn-info btn-block">Ingresar</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			
		`);
		FG.Modal.open('FG-login-modal');
	},
	Modal: {
		removeElement: function(element) {
			var elem = document.getElementById(element);
			elem && elem.parentNode && elem.parentNode.removeChild(elem);
		},
		loadStyle: function(include_bootstrap = false){
			var self = this;
			var css = '';
			
			FG.getLoginStatus(function(r){
				if (r.status != 'connected') {
					css += `.FG-userReq {
						display: none;
						visibility: hidden;
					}`;
				}
			});
				
			if(include_bootstrap == true)
				{ css += '@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");'; }
			
			css += `.FG-modal {
				  position: fixed;
				  top: 0;
				  right: 0;
				  bottom: 0;
				  left: 0;
				  z-index: 20;
				  padding: 30px;
				  width: 100%;
				  height: 100%;
				  margin: 0;
				  padding: 0;
				  opacity: 0;
				  visibility: hidden;
				  transition: visibility 0s linear 0.1s,opacity 0.3s ease;
				}
				.FG-modal.open {
				  visibility: visible;
				  opacity: 1;
				  transition-delay: 0s;
				}
				.modal__overlay {
				  position: fixed;
				  top: 0;
				  left: 0;
				  bottom: 0;
				  right: 0;
				  z-index: 21;
				  background-color: rgba(0, 0, 0, 0.7);
				}
				.modal__close {
				  position: absolute;
				  top: 10px;
				  right: 10px;
				  border: none;
				  outline: none;
				  background: none;
				  font-size: 24px;
				  color: #747474;
				  font-weight: bold;
				}
				.modal__close:hover {
				  color: #000;
				}
				.modal__container {
					position: relative;
					z-index: 22;
					min-width: 330px;
					max-width: 550px;
					height: auto;
					min-height: 435px;
					top: 40%;
					-webkit-transform: translateY(-50%);
					transform: translateY(-50%);
					/* box-shadow: 0 0 10px #fff; */
					margin: 0 auto;
					padding: 30px;
					/* background-color: #fff; */
					text-align: center;
				}
				.FG-hidden {
					display: none;
					visibility: hidden;
				}
				
				.login-container {
					padding: 20px;
				}
				
				.login-container .login-box {
					margin: 25px;
					padding-top: 0px;
				}
				
				.login-container .login-box .login-logo {
					width: 100%;
					height: 135px;
					float: left;
					margin-bottom: 10px;
					background-color: #FFF;
					border-radius: 25px;
					padding: 70px 45px;
					background-size: contain;
				}
				
				`,
			head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');
			head.appendChild(style);
			style.type = 'text/css';
			if (style.styleSheet){
				// This is required for IE8 and below.
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			};			
		},
		create_link: function(el){
			// Uso: FG.Modal.create_link('jsModal2');
			var self = this;
			var a_1 = document.createElement("a");
			a_1.id = 'popup-' + el;
			a_1.href = '#' + el;
			a_1.className = 'jsModalTrigger FG-hidden';
			var a_1_text = document.createTextNode('Abrir Modal: ' + el);
			a_1.appendChild(a_1_text);
			document.getElementsByTagName('body')[0].appendChild(a_1);
			
			self.ready(self.openModal);
			self.ready(self.closeModal);
		},
		eventFire: function(el, etype){
			// Uso: FG.Modal.eventFire('jsModal2', 'click');
			var self = this;
			var elem = document.getElementById('popup-' + el);
			if (elem.fireEvent) {
				elem.fireEvent('on' + etype);
			} else {
				var evObj = document.createEvent('Events');
				evObj.initEvent(etype, true, false);
				elem.dispatchEvent(evObj);
			}
		},
		create: function(modal_id, html_out = 'FG Modal window text'){
			// Uso: FG.Modal.create('jsModal2', 'Texto o codigo HTML');
			var self = this;
			if(document.getElementById(modal_id))
				{
					FG.Modal.removeElement(modal_id);
				};
			
			var p_1 = document.createElement("p");
			p_1.innerHTML = html_out;
			
			var btn_1 = document.createElement("button");
			btn_1.className = 'modal__close jsModalClose';
			btn_1.innerHTML = '&#10005;';
			
			var jsModal = document.createElement("div");
			// jsModal.id = 'jsModal';
			jsModal.id = modal_id;
			jsModal.className = 'FG-modal';
			
			var jsOverlay = document.createElement("div");
			jsOverlay.className = 'modal__overlay jsOverlay';
			
			var modal__container = document.createElement("div");
			modal__container.className = 'modal__container';
			
			modal__container.appendChild(p_1);
			modal__container.appendChild(btn_1);
			jsModal.appendChild(jsOverlay);
			jsModal.appendChild(modal__container);
			
			document.getElementsByTagName('body')[0].appendChild(jsModal);
			FG.Modal.create_link(modal_id);
		},
		open: function(modal_id){
			// Uso: FG.Modal.open('jsModal2');
			FG.Modal.eventFire(modal_id, 'click');
		},
		openModal: function() {
			var modalTrigger = document.getElementsByClassName('jsModalTrigger');
			for(var i = 0; i < modalTrigger.length; i++) {
				modalTrigger[i].onclick = function() {
					var target = this.getAttribute('href').substr(1);
					var modalWindow = document.getElementById(target);

					modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open'; 
				}
			}   
		},
		closeModal: function(){
			var closeButton = document.getElementsByClassName('jsModalClose');
			var closeOverlay = document.getElementsByClassName('jsOverlay');

			for(var i = 0; i < closeButton.length; i++) {
				closeButton[i].onclick = function() {
					var modalWindow = this.parentNode.parentNode;

					modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
					}
			}   
			
			for(var i = 0; i < closeOverlay.length; i++) {
				closeOverlay[i].onclick = function() {
					var modalWindow = this.parentNode;
					modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			}

		},
		ready: function(fn) {
			if (document.readyState != 'loading'){
			  fn();
			} else {
			  document.addEventListener('DOMContentLoaded', fn);
			}
		}
	}
};
(function(){
	try 
		{
			if(!FG){ throw new FG.exceptionFG('No existe FG'); };
			if(!window.fgAsyncInit){ throw new FG.exceptionFG('No existe window.fgAsyncInit'); };
			FG.init();
			window.fgAsyncInit();
		} 
	catch (e) {
		console.log(e);
	}
})();