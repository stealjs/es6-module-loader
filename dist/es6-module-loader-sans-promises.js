/*
 *  es6-module-loader v0.5.3
 *  https://github.com/ModuleLoader/es6-module-loader
 *  Implemented to the Jan 20 2014 ES6 specification draft rev 22
 *  Copyright (c) 2014 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
 */
!function(a){function b(a){return{status:"loading",name:a,linkSets:[],dependencies:[],metadata:{}}}function c(a,b,c){return new x(h({step:c.address?"fetch":"locate",loader:a,moduleName:b,moduleMetadata:{},moduleSource:c.source,moduleAddress:c.address}))}function d(a,c,d,f){return new x(function(b){b(a.loaderObj.normalize(c,d,f))}).then(function(c){var d;if(a.modules[c])return d=b(c),d.status="linked",d.module=a.modules[c],d;for(var f=0,g=a.loads.length;g>f;f++)if(d=a.loads[f],d.name==c)return d;return d=b(c),a.loads.push(d),setTimeout(function(){e(a,d)},7),d})}function e(a,b){f(a,b,x.resolve().then(function(){return a.loaderObj.locate({name:b.name,metadata:b.metadata})}))}function f(a,b,c){g(a,b,c.then(function(c){return 0!=b.linkSets.length?(b.address=c,a.loaderObj.fetch({name:b.name,metadata:b.metadata,address:c})):void 0}))}function g(b,c,e){e.then(function(a){return 0!=c.linkSets.length?b.loaderObj.translate({name:c.name,metadata:c.metadata,address:c.address,source:a}):void 0}).then(function(a){return 0!=c.linkSets.length?(c.source=a,b.loaderObj.instantiate({name:c.name,metadata:c.metadata,address:c.address,source:a})):void 0}).then(function(e){if(0!=c.linkSets.length){var f;if(void 0===e){if(!a.traceur)throw new TypeError("Include Traceur for module syntax support");v=v||a.traceur,c.address=c.address||"anon"+ ++B;var g=new v.syntax.Parser(new v.syntax.SourceFile(c.address,c.source));c.body=g.parseModule(),c.kind="declarative",f=s(c.body)}else{if("object"!=typeof e)throw TypeError("Invalid instantiate return value");f=e.deps||[],c.execute=e.execute,c.kind="dynamic"}c.dependencies=[],c.depsList=f;for(var h=[],i=0,k=f.length;k>i;i++)(function(a){h.push(d(b,a,c.name,c.address).then(function(b){if(c.dependencies.push({key:a,value:b.name}),"linked"!=b.status)for(var d=c.linkSets.concat([]),e=0,f=d.length;f>e;e++)j(d[e],b)}))})(f[i]);return x.all(h)}}).then(function(){c.status="loaded";for(var a=c.linkSets.concat([]),b=0,d=a.length;d>b;b++)k(a[b],c)})["catch"](function(a){c.status="failed",c.exception=a;for(var b=c.linkSets.concat([]),d=0,e=b.length;e>d;d++)l(b[d],a)})}function h(a){return function(c){var d=a.loader,h=a.moduleName,j=a.step;if(d.modules[h])throw new TypeError('"'+h+'" already exists in the module table');for(var k=0,l=d.loads.length;l>k;k++)if(d.loads[k].name==h)throw new TypeError('"'+h+'" already loading');var m=b(h);m.metadata=a.moduleMetadata;var n=i(d,m);d.loads.push(m),c(n.done),"locate"==j?e(d,m):"fetch"==j?f(d,m,x.resolve(a.moduleAddress)):(m.address=a.moduleAddress,g(d,m,x.resolve(a.moduleSource)))}}function i(a,b){var c={loader:a,loads:[],loadingCount:0};return c.done=new x(function(a,b){c.resolve=a,c.reject=b}),j(c,b),c}function j(a,b){for(var c=0,d=a.loads.length;d>c;c++)if(a.loads[c]==b)return;a.loads.push(b),b.linkSets.push(a),"loaded"!=b.status&&a.loadingCount++;for(var e=a.loader,c=0,d=b.dependencies.length;d>c;c++){var f=b.dependencies[c].value;if(!e.modules[f])for(var g=0,h=e.loads.length;h>g;g++)if(e.loads[g].name==f){j(a,e.loads[g]);break}}}function k(a,b){if(a.loadingCount--,!(a.loadingCount>0)){var c=a.loads[0];try{p(a.loads,a.loader)}catch(d){return l(a,d)}a.resolve(c)}}function l(a,b){for(var c=a.loads.concat([]),d=0,e=c.length;e>d;d++){var f=c[d],g=z.call(f.linkSets,a);if(f.linkSets.splice(g,1),0==f.linkSets.length){var h=z.call(a.loader.loads,f);-1!=h&&a.loader.loads.splice(h,1)}}a.reject(b)}function m(a,b){b.name&&(a.modules[b.name]=b.module);var c=z.call(a.loads,b);-1!=c&&a.loads.splice(c,1);for(var d=0,e=b.linkSets.length;e>d;d++)c=z.call(b.linkSets[d].loads,b),-1!=c&&b.linkSets[d].loads.splice(c,1);b.linkSets.splice(0,b.linkSets.length)}function n(a,b){return o(b.module,[],a),b.module.module}function o(b,c,d){if(!b.module){v.options.sourceMaps=!0,v.options.modules="instantiate";var e=new v.util.ErrorReporter;e.reportMessageInternal=function(a,b){throw b+"\n"+a};var f=a.System;a.System=a.traceurSystem;var g=new v.codegeneration.module.AttachModuleNameTransformer(b.name).transformAny(b.body);g=new v.codegeneration.FromOptionsTransformer(e).transform(g),a.System=f,delete b.body;var h=new v.outputgeneration.SourceMapGenerator({file:b.address}),i={sourceMapGenerator:h},j=v.outputgeneration.TreeWriter.write(g,i);a.btoa&&(j+="\n//# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(i.sourceMap)))+"\n");var k=System.register;System.register=function(c,d,e){for(var f=[],g=0;g<d.length;g++)for(var h=0;h<b.dependencies.length;h++)if(b.dependencies[h].key==d[g]){f.push(b.dependencies[h].value);break}b.module=new u(e.apply(a,f))},$traceurRuntime.ModuleStore.get=$traceurRuntime.getModuleImpl=function(a){return d.loaderObj.get(a)},t(j,a,b.address,b.name),System.register=k}}function p(a,b){a=a.concat([]);for(var c=0;c<a.length;c++){var d=a[c];if("declarative"==d.kind)d.module={name:d.name,dependencies:d.dependencies,body:d.body,address:d.address};else{var e=d.execute();if(!(e instanceof u))throw new TypeError("Execution must define a Module instance");d.module={module:e}}d.status="linked",m(b,d)}}function q(a){if("object"!=typeof a)throw new TypeError("Options must be an object");a.normalize&&(this.normalize=a.normalize),a.locate&&(this.locate=a.locate),a.fetch&&(this.fetch=a.fetch),a.translate&&(this.translate=a.translate),a.instantiate&&(this.instantiate=a.instantiate),this._loader={loaderObj:this,loads:[],modules:{}},w(this,"global",{get:function(){throw new TypeError("global accessor not provided by polyfill")}}),w(this,"realm",{get:function(){throw new TypeError("Realms not implemented in polyfill")}})}function r(a,b,c,d){var e,f;if(b(a,c,d)!==!1)for(e in a)a.hasOwnProperty(e)&&"location"!=e&&"type"!=e&&(f=a[e],"object"==typeof f&&null!==f&&r(f,b,a,e))}function s(a){function b(a){-1==z.call(c,a)&&c.push(a)}var c=[];return r(a,function(a){"EXPORT_DECLARATION"==a.type?a.declaration.moduleSpecifier&&b(a.declaration.moduleSpecifier.token.processedValue):"IMPORT_DECLARATION"==a.type?b(a.moduleSpecifier.token.processedValue):"MODULE_DECLARATION"==a.type&&b(a.expression.token.processedValue)}),c}function t(a,b,c,d){try{Function("global",'var __moduleName = "'+(d||"").replace('"','"')+'"; with(global) { '+a+" \n }"+(c&&!a.match(/\/\/[@#] ?(sourceURL|sourceMappingURL)=([^\n]+)/)?"\n//# sourceURL="+c:"")).call(b,b)}catch(e){throw"SyntaxError"==e.name&&(e.message="Evaluating "+c+"\n	"+e.message),e}}function u(a){if("object"!=typeof a)throw new TypeError("Expected object");if(!(this instanceof u))return new u(a);var b=this;for(var c in a)!function(a,c){w(b,a,{configurable:!1,enumerable:!0,get:function(){return c}})}(c,a[c]);Object.preventExtensions&&Object.preventExtensions(this)}var v,w,x=a.Promise||require("./promise");try{Object.defineProperty({},"a",{})&&(w=Object.defineProperty)}catch(y){w=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}console.assert=console.assert||function(){};var z=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},A={};q.prototype={define:function(a,b,c){if(A[a])throw new TypeError("Module is already loading.");return A[a]=new x(h({step:c&&c.address?"fetch":"translate",loader:this,moduleName:a,moduleMetadata:c&&c.metadata||{},moduleSource:b,moduleAddress:c&&c.address})),A[a].then(function(){delete A[a]})},load:function(a){return this._loader.modules[a]?(o(this._loader.modules[a],[],this._loader),x.resolve(this._loader.modules[a].module)):A[a]?A[a]:(A[a]=c(this._loader),A[a].then(function(){delete A[a]}))},module:function(a,c){var d=b();d.address=c&&c.address;var e=i(this._loader,d),f=x.resolve(a),h=this._loader,j=e.done.then(function(){return n(h,d)});return g(this,d,f),j},"import":function(a,b){var d=this;return new x(function(c){c(d.normalize.call(this,a,b&&b.name,b&&b.address))}).then(function(a){var e=d._loader;return e.modules[a]?(o(e.modules[a],[],e._loader),x.resolve(e.modules[a].module)):(A[a]||(A[a]=c(e,a,b||{}))).then(function(b){return delete A[a],n(e,b)})})},eval:function(){throw new TypeError("Eval not implemented in polyfill")},get:function(a){if(!this._loader.modules[a])throw new TypeError("Module "+a+" not defined");return o(this._loader.modules[a],[],this),this._loader.modules[a].module},has:function(a){return!!this._loader.modules[a]},set:function(a,b){if(!(b instanceof u))throw new TypeError("Set must be a module");this._loader.modules[a]={module:b}},"delete":function(a){return this._loader.modules[a]?delete this._loader.modules[a]:!1},entries:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},keys:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},values:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},normalize:function(a){return a},locate:function(a){return a.name},fetch:function(){throw new TypeError("Fetch not implemented")},translate:function(a){return a.source},instantiate:function(){}};var B=0;"object"==typeof exports&&(module.exports=q),a.LoaderPolyfill=q,a.Module=u}("undefined"!=typeof global?global:this),function(a){function b(a){var b=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return b?{href:b[0]||"",protocol:b[1]||"",authority:b[2]||"",host:b[3]||"",hostname:b[4]||"",port:b[5]||"",pathname:b[6]||"",search:b[7]||"",hash:b[8]||""}:null}function c(a,c){function d(a){var b=[];return a.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?b.pop():b.push(a)}),b.join("").replace(/^\//,"/"===a.charAt(0)?"/":"")}return c=b(c||""),a=b(a||""),c&&a?(c.protocol||a.protocol)+(c.protocol||c.authority?c.authority:a.authority)+d(c.protocol||c.authority||"/"===c.pathname.charAt(0)?c.pathname:c.pathname?(a.authority&&!a.pathname?"/":"")+a.pathname.slice(0,a.pathname.lastIndexOf("/")+1)+c.pathname:a.pathname)+(c.protocol||c.authority||c.pathname?c.search:c.search||a.search)+c.hash:null}function d(){document.removeEventListener("DOMContentLoaded",d,!1),window.removeEventListener("load",d,!1),e()}function e(){for(var a=document.getElementsByTagName("script"),b=0;b<a.length;b++){var c=a[b];if("module"==c.type){var d=c.getAttribute("name"),e=c.getAttribute("src"),f=c.innerHTML;(d?k.define(d,f,{address:e}):k.module(f,{address:e})).then(function(){},function(a){nextTick(function(){throw a})})}}}var f,g="undefined"!=typeof window,h=a.LoaderPolyfill||require("./loader"),i=a.Promise||require("./promise");if(g)f=function(a,b,c){function d(){b(f.responseText)}function e(){c(f.statusText+": "+a||"XHR error")}var f=new XMLHttpRequest,g=!0;if(!("withCredentials"in f)){var h=/^(\w+:)?\/\/([^\/]+)/.exec(a);h&&(g=h[2]===window.location.host,h[1]&&(g&=h[1]===window.location.protocol))}g||(f=new XDomainRequest,f.onload=d,f.onerror=e,f.ontimeout=e),f.onreadystatechange=function(){4===f.readyState&&(200===f.status||0==f.status&&f.responseText?d():e())},f.open("GET",a,!0),f.send(null)};else{var j=require("fs");f=function(a,b,c){return j.readFile(a,function(a,d){return a?c(a):(b(d+""),void 0)})}}var k=new h({global:g?window:a,strict:!0,normalize:function(a,b){if("string"!=typeof a)throw new TypeError("Module name must be a string");var c=a.split("/");if(0==c.length)throw new TypeError("No module name provided");var d=0,e=!1,f=0;if("."==c[0]){if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');e=!0}else{for(;".."==c[d];)if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');d&&(e=!0),f=d}for(var g=d;g<c.length;g++){var h=c[g];if(""==h||"."==h||".."==h)throw new TypeError('Illegal module name"'+a+'"')}if(!e)return a;{var i=[],j=(b||"").split("/");j.length-1-f}return i=i.concat(j.splice(0,j.length-1-f)),i=i.concat(c.splice(d)),i.join("/")},locate:function(a){var b,d=a.name,e="";for(var f in this.paths){var g=f.split("*");if(g.length>2)throw new TypeError("Only one wildcard in a path is permitted");1==g.length?d==f&&f.length>e.length&&(e=f):d.substr(0,g[0].length)==g[0]&&d.substr(d.length-g[1].length)==g[1]&&(e=f,b=d.substr(g[0].length,d.length-g[1].length-g[0].length))}var h=this.paths[e];return b&&(h=h.replace("*",b)),c(this.baseURL,h)},fetch:function(a){return new i(function(b,d){f(c(this.baseURL,a.address),function(a){b(a)},d)})}});if(g){var l=window.location.href.split("#")[0].split("?")[0];k.baseURL=l.substring(0,l.lastIndexOf("/")+1)}else k.baseURL="./";if(k.paths={"*":"*.js"},a.System&&a.traceur&&(a.traceurSystem=a.System),a.System=k,g){var m=document.getElementsByTagName("script");m=m[m.length-1],"complete"===document.readyState?setTimeout(e):document.addEventListener&&(document.addEventListener("DOMContentLoaded",d,!1),window.addEventListener("load",d,!1)),m.getAttribute("data-init")&&window[m.getAttribute("data-init")]()}"object"==typeof exports&&(module.exports=k)}("undefined"!=typeof global?global:this);