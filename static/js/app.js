!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=2)}([function(e,n){function t(e){Object.freeze(e);var n="function"==typeof e;return Object.getOwnPropertyNames(e).forEach((function(r){!e.hasOwnProperty(r)||null===e[r]||"object"!=typeof e[r]&&"function"!=typeof e[r]||n&&("caller"===r||"callee"===r||"arguments"===r)||Object.isFrozen(e[r])||t(e[r])})),e}function r(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function i(e){var n,t={},r=Array.prototype.slice.call(arguments,1);for(n in e)t[n]=e[n];return r.forEach((function(e){for(n in e)t[n]=e[n]})),t}function a(e){return e.nodeName.toLowerCase()}var s=Object.freeze({__proto__:null,escapeHTML:r,inherit:i,nodeStream:function(e){var n=[];return function e(t,r){for(var i=t.firstChild;i;i=i.nextSibling)3===i.nodeType?r+=i.nodeValue.length:1===i.nodeType&&(n.push({event:"start",offset:r,node:i}),r=e(i,r),a(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:r,node:i}));return r}(e,0),n},mergeStreams:function(e,n,t){var i=0,s="",o=[];function l(){return e.length&&n.length?e[0].offset!==n[0].offset?e[0].offset<n[0].offset?e:n:"start"===n[0].event?e:n:e.length?e:n}function c(e){s+="<"+a(e)+[].map.call(e.attributes,(function(e){return" "+e.nodeName+'="'+r(e.value).replace(/"/g,"&quot;")+'"'})).join("")+">"}function u(e){s+="</"+a(e)+">"}function d(e){("start"===e.event?c:u)(e.node)}for(;e.length||n.length;){var g=l();if(s+=r(t.substring(i,g[0].offset)),i=g[0].offset,g===e){o.reverse().forEach(u);do{d(g.splice(0,1)[0]),g=l()}while(g===e&&g.length&&g[0].offset===i);o.reverse().forEach(c)}else"start"===g[0].event?o.push(g[0].node):o.pop(),d(g.splice(0,1)[0])}return s+r(t.substr(i))}});const o=e=>!!e.kind;class l{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=r(e)}openNode(e){if(!o(e))return;let n=e.kind;e.sublanguage||(n=`${this.classPrefix}${n}`),this.span(n)}closeNode(e){o(e)&&(this.buffer+="</span>")}span(e){this.buffer+=`<span class="${e}">`}value(){return this.buffer}}class c{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let n={kind:e,children:[]};this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(n=>this._walk(e,n)),e.closeNode(n)),e}static _collapse(e){e.children&&(e.children.every(e=>"string"==typeof e)?(e.text=e.children.join(""),delete e.children):e.children.forEach(e=>{"string"!=typeof e&&c._collapse(e)}))}}class u extends c{constructor(e){super(),this.options=e}addKeyword(e,n){""!==e&&(this.openNode(n),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,n){let t=e.root;t.kind=n,t.sublanguage=!0,this.add(t)}toHTML(){return new l(this,this.options).value()}finalize(){}}function d(e){return e&&e.source||e}const g="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",f={begin:"\\\\[\\s\\S]",relevance:0},h={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[f]},p={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[f]},m={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},b=function(e,n,t){var r=i({className:"comment",begin:e,end:n,contains:[]},t||{});return r.contains.push(m),r.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),r},v=b("//","$"),x=b("/\\*","\\*/"),_=b("#","$"),E={className:"number",begin:"\\b\\d+(\\.\\d+)?",relevance:0},y={className:"number",begin:g,relevance:0},w={className:"number",begin:"\\b(0b[01]+)",relevance:0},N={className:"number",begin:"\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},R={begin:/(?=\/[^\/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[f,{begin:/\[/,end:/\]/,relevance:0,contains:[f]}]}]},O={className:"title",begin:"[a-zA-Z]\\w*",relevance:0},M={className:"title",begin:"[a-zA-Z_]\\w*",relevance:0},k={begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0};var T=Object.freeze({__proto__:null,IDENT_RE:"[a-zA-Z]\\w*",UNDERSCORE_IDENT_RE:"[a-zA-Z_]\\w*",NUMBER_RE:"\\b\\d+(\\.\\d+)?",C_NUMBER_RE:g,BINARY_NUMBER_RE:"\\b(0b[01]+)",RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",BACKSLASH_ESCAPE:f,APOS_STRING_MODE:h,QUOTE_STRING_MODE:p,PHRASAL_WORDS_MODE:m,COMMENT:b,C_LINE_COMMENT_MODE:v,C_BLOCK_COMMENT_MODE:x,HASH_COMMENT_MODE:_,NUMBER_MODE:E,C_NUMBER_MODE:y,BINARY_NUMBER_MODE:w,CSS_NUMBER_MODE:N,REGEXP_MODE:R,TITLE_MODE:O,UNDERSCORE_TITLE_MODE:M,METHOD_GUARD:k}),L="of and for in not or if then".split(" ");function S(e){function n(n,t){return new RegExp(d(n),"m"+(e.case_insensitive?"i":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=function(e){return new RegExp(e.toString()+"|").exec("").length-1}(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);let e=this.regexes.map(e=>e[1]);this.matcherRe=n(function(e,n){for(var t=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,r=0,i="",a=0;a<e.length;a++){var s=r+=1,o=d(e[a]);for(a>0&&(i+=n),i+="(";o.length>0;){var l=t.exec(o);if(null==l){i+=o;break}i+=o.substring(0,l.index),o=o.substring(l.index+l[0].length),"\\"==l[0][0]&&l[1]?i+="\\"+String(Number(l[1])+s):(i+=l[0],"("==l[0]&&r++)}i+=")"}return i}(e,"|"),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;let n=this.matcherRe.exec(e);if(!n)return null;let t=n.findIndex((e,n)=>n>0&&null!=e),r=this.matchIndexes[t];return Object.assign(n,r)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];let n=new t;return this.rules.slice(e).forEach(([e,t])=>n.addRule(e,t)),n.compile(),this.multiRegexes[e]=n,n}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){let n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&(this.regexIndex=0)),t}}function a(e){let n=e.input[e.index-1],t=e.input[e.index+e[0].length];if("."===n||"."===t)return{ignoreMatch:!0}}if(e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");!function t(s,o){s.compiled||(s.compiled=!0,s.__onBegin=null,s.keywords=s.keywords||s.beginKeywords,s.keywords&&(s.keywords=function(e,n){var t={};"string"==typeof e?r("keyword",e):Object.keys(e).forEach((function(n){r(n,e[n])}));return t;function r(e,r){n&&(r=r.toLowerCase()),r.split(" ").forEach((function(n){var r=n.split("|");t[r[0]]=[e,j(r[0],r[1])]}))}}(s.keywords,e.case_insensitive)),s.lexemesRe=n(s.lexemes||/\w+/,!0),o&&(s.beginKeywords&&(s.begin="\\b("+s.beginKeywords.split(" ").join("|")+")(?=\\b|\\s)",s.__onBegin=a),s.begin||(s.begin=/\B|\b/),s.beginRe=n(s.begin),s.endSameAsBegin&&(s.end=s.begin),s.end||s.endsWithParent||(s.end=/\B|\b/),s.end&&(s.endRe=n(s.end)),s.terminator_end=d(s.end)||"",s.endsWithParent&&o.terminator_end&&(s.terminator_end+=(s.end?"|":"")+o.terminator_end)),s.illegal&&(s.illegalRe=n(s.illegal)),null==s.relevance&&(s.relevance=1),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map((function(e){return function(e){e.variants&&!e.cached_variants&&(e.cached_variants=e.variants.map((function(n){return i(e,{variants:null},n)})));return e.cached_variants?e.cached_variants:function e(n){return!!n&&(n.endsWithParent||e(n.starts))}(e)?i(e,{starts:e.starts?i(e.starts):null}):Object.isFrozen(e)?i(e):e}("self"===e?s:e)}))),s.contains.forEach((function(e){t(e,s)})),s.starts&&t(s.starts,o),s.matcher=function(e){let n=new r;return e.contains.forEach(e=>n.addRule(e.begin,{rule:e,type:"begin"})),e.terminator_end&&n.addRule(e.terminator_end,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(s))}(e)}function j(e,n){return n?Number(n):(t=e,L.includes(t.toLowerCase())?0:1);var t}const A=r,B=i,{nodeStream:I,mergeStreams:D}=s;var C=function(e){var n=[],r={},i={},a=[],s=!0,o=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,l="Could not find the language '{}', did you forget to load/include a language module?",c={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0,__emitter:u};function d(e){return c.noHighlightRe.test(e)}function g(e,n,t,r){var i={code:n,language:e};E("before:highlight",i);var a=i.result?i.result:f(i.language,i.code,t,r);return a.code=i.code,E("after:highlight",a),a}function f(e,n,t,i){var a=n;function o(e,n){var t=v.case_insensitive?n[0].toLowerCase():n[0];return e.keywords.hasOwnProperty(t)&&e.keywords[t]}function u(){null!=E.subLanguage?function(){if(""!==O){var e="string"==typeof E.subLanguage;if(!e||r[E.subLanguage]){var n=e?f(E.subLanguage,O,!0,y[E.subLanguage]):h(O,E.subLanguage.length?E.subLanguage:void 0);E.relevance>0&&(M+=n.relevance),e&&(y[E.subLanguage]=n.top),w.addSublanguage(n.emitter,n.language)}else w.addText(O)}}():function(){var e,n,t,r;if(E.keywords){for(n=0,E.lexemesRe.lastIndex=0,t=E.lexemesRe.exec(O),r="";t;){r+=O.substring(n,t.index);var i=null;(e=o(E,t))?(w.addText(r),r="",M+=e[1],i=e[0],w.addKeyword(t[0],i)):r+=t[0],n=E.lexemesRe.lastIndex,t=E.lexemesRe.exec(O)}r+=O.substr(n),w.addText(r)}else w.addText(O)}(),O=""}function d(e){e.className&&w.openNode(e.className),E=Object.create(e,{parent:{value:E}})}function g(e){var n=e[0],t=e.rule;if(t.__onBegin){if((t.__onBegin(e)||{}).ignoreMatch)return function(e){return 0===E.matcher.regexIndex?(O+=e[0],1):(T=!0,0)}(n)}return t&&t.endSameAsBegin&&(t.endRe=new RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")),t.skip?O+=n:(t.excludeBegin&&(O+=n),u(),t.returnBegin||t.excludeBegin||(O=n)),d(t),t.returnBegin?0:n.length}function p(e){var n=e[0],t=a.substr(e.index),r=function e(n,t){if(function(e,n){var t=e&&e.exec(n);return t&&0===t.index}(n.endRe,t)){for(;n.endsParent&&n.parent;)n=n.parent;return n}if(n.endsWithParent)return e(n.parent,t)}(E,t);if(r){var i=E;i.skip?O+=n:(i.returnEnd||i.excludeEnd||(O+=n),u(),i.excludeEnd&&(O=n));do{E.className&&w.closeNode(),E.skip||E.subLanguage||(M+=E.relevance),E=E.parent}while(E!==r.parent);return r.starts&&(r.endSameAsBegin&&(r.starts.endRe=r.endRe),d(r.starts)),i.returnEnd?0:n.length}}var m={};function b(n,r){var i,o=r&&r[0];if(O+=n,null==o)return u(),0;if("begin"==m.type&&"end"==r.type&&m.index==r.index&&""===o){if(O+=a.slice(r.index,r.index+1),!s)throw(i=new Error("0 width match regex")).languageName=e,i.badRule=m.rule,i;return 1}if(m=r,"begin"===r.type)return g(r);if("illegal"===r.type&&!t)throw(i=new Error('Illegal lexeme "'+o+'" for mode "'+(E.className||"<unnamed>")+'"')).mode=E,i;if("end"===r.type){var l=p(r);if(null!=l)return l}return O+=o,o.length}var v=x(e);if(!v)throw console.error(l.replace("{}",e)),new Error('Unknown language: "'+e+'"');S(v);var _,E=i||v,y={},w=new c.__emitter(c);!function(){for(var e=[],n=E;n!==v;n=n.parent)n.className&&e.unshift(n.className);e.forEach(e=>w.openNode(e))}();var N,R,O="",M=0,k=0;try{var T=!1;for(E.matcher.considerAll();T?T=!1:(E.matcher.lastIndex=k,E.matcher.considerAll()),N=E.matcher.exec(a);){R=b(a.substring(k,N.index),N),k=N.index+R}return b(a.substr(k)),w.closeAllNodes(),w.finalize(),_=w.toHTML(),{relevance:M,value:_,language:e,illegal:!1,emitter:w,top:E}}catch(n){if(n.message&&n.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:n.message,context:a.slice(k-100,k+100),mode:n.mode},sofar:_,relevance:0,value:A(a),emitter:w};if(s)return{relevance:0,value:A(a),emitter:w,language:e,top:E,errorRaised:n};throw n}}function h(e,n){n=n||c.languages||Object.keys(r);var t={relevance:0,emitter:new c.__emitter(c),value:A(e)},i=t;return n.filter(x).filter(_).forEach((function(n){var r=f(n,e,!1);r.language=n,r.relevance>i.relevance&&(i=r),r.relevance>t.relevance&&(i=t,t=r)})),i.language&&(t.second_best=i),t}function p(e){return c.tabReplace||c.useBR?e.replace(o,(function(e,n){return c.useBR&&"\n"===e?"<br>":c.tabReplace?n.replace(/\t/g,c.tabReplace):""})):e}function m(e){var n,t,r,a,s,o=function(e){var n,t=e.className+" ";if(t+=e.parentNode?e.parentNode.className:"",n=c.languageDetectRe.exec(t)){var r=x(n[1]);return r||(console.warn(l.replace("{}",n[1])),console.warn("Falling back to no-highlight mode for this block.",e)),r?n[1]:"no-highlight"}return t.split(/\s+/).find(e=>d(e)||x(e))}(e);d(o)||(E("before:highlightBlock",{block:e,language:o}),c.useBR?(n=document.createElement("div")).innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n"):n=e,s=n.textContent,r=o?g(o,s,!0):h(s),(t=I(n)).length&&((a=document.createElement("div")).innerHTML=r.value,r.value=D(t,I(a),s)),r.value=p(r.value),E("after:highlightBlock",{block:e,result:r}),e.innerHTML=r.value,e.className=function(e,n,t){var r=n?i[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),e.includes(r)||a.push(r),a.join(" ").trim()}(e.className,o,r.language),e.result={language:r.language,re:r.relevance},r.second_best&&(e.second_best={language:r.second_best.language,re:r.second_best.relevance}))}function b(){if(!b.called){b.called=!0;var e=document.querySelectorAll("pre code");n.forEach.call(e,m)}}var v={disableAutodetect:!0};function x(e){return e=(e||"").toLowerCase(),r[e]||r[i[e]]}function _(e){var n=x(e);return n&&!n.disableAutodetect}function E(e,n){var t=e;a.forEach((function(e){e[t]&&e[t](n)}))}Object.assign(e,{highlight:g,highlightAuto:h,fixMarkup:p,highlightBlock:m,configure:function(e){c=B(c,e)},initHighlighting:b,initHighlightingOnLoad:function(){window.addEventListener("DOMContentLoaded",b,!1)},registerLanguage:function(n,t){var a;try{a=t(e)}catch(e){if(console.error("Language definition for '{}' could not be registered.".replace("{}",n)),!s)throw e;console.error(e),a=v}a.name||(a.name=n),r[n]=a,a.rawDefinition=t.bind(null,e),a.aliases&&a.aliases.forEach((function(e){i[e]=n}))},listLanguages:function(){return Object.keys(r)},getLanguage:x,requireLanguage:function(e){var n=x(e);if(n)return n;throw new Error("The '{}' language is required, but not loaded.".replace("{}",e))},autoDetection:_,inherit:B,addPlugin:function(e,n){a.push(e)}}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString="10.0.0-beta.0";for(const e in T)"object"==typeof T[e]&&t(T[e]);return Object.assign(e,T),e}({});e.exports=C},function(e,n){e.exports=function(e){return{name:"Protocol Buffers",keywords:{keyword:"package import option optional required repeated group oneof",built_in:"double float int32 int64 uint32 uint64 sint32 sint64 fixed32 fixed64 sfixed32 sfixed64 bool string bytes",literal:"true false"},contains:[e.QUOTE_STRING_MODE,e.NUMBER_MODE,e.C_LINE_COMMENT_MODE,{className:"class",beginKeywords:"message enum service",end:/\{/,illegal:/\n/,contains:[e.inherit(e.TITLE_MODE,{starts:{endsWithParent:!0,excludeEnd:!0}})]},{className:"function",beginKeywords:"rpc",end:/[{;]/,excludeEnd:!0,keywords:"rpc returns"},{begin:/^\s*[A-Z_]+/,end:/\s*=/,excludeEnd:!0}]}}},function(e,n,t){"use strict";t.r(n);var r=t(0),i=t.n(r),a=t(1),s=t.n(a);i.a.registerLanguage("protobuf",s.a);let o=function(){!function(e){const n=document.getElementsByTagName("head")[0],t=document.createElement("link");t.rel="stylesheet",t.href=e,n.appendChild(t)}("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css"),o=function(){}};class l{constructor(e,n){this.success=e,this.error=n}}function c(e,n){if(""===e)return new l("","");const t=e.replace(/\.0/g,".1");try{const e=JSON.parse(t);return new l(function(e){const n=[],t=new Set,r=[];if(Array.isArray(e)){const i=e;if(0===i.length)return t.add("google/protobuf/any.proto"),n.push("    repeated google.protobuf.Any some_key = 1;"),u(t,r,n);const a=i[0];let s=d(a,t,0);if("object"===s){s="SomeNestedMessage",r.push(""),r.push(`    message ${s} {`);let e=1;for(const[n,i]of Object.entries(a)){let a=d(i,t,1);r.push(`        ${a} ${n} = ${e};`),e+=1}r.push("    }"),r.push("")}return n.push(`    repeated ${s} some_key = 1;`),u(t,r,n)}{let i=1;for(const[a,s]of Object.entries(e)){let e=d(s,t,0);if("object"===e){e=a.charAt(0).toUpperCase()+a.substr(1).toLowerCase(),r.push(""),r.push(`    message ${e} {`);let n=1;for(const[e,i]of Object.entries(s)){let a=d(i,t,1);r.push(`        ${a} ${e} = ${n};`),n+=1}r.push("    }"),r.push("")}n.push(`    ${e} ${a} = ${i};`),i+=1}}return u(t,r,n)}(e),"")}catch(e){return new l("",e.message)}}function u(e,n,t){const r=[];if(r.push('syntax = "proto3";'),r.push(""),e.size>0){for(const n of e)r.push(`import "${n}";`);r.push("")}return r.push("message SomeMessage {"),r.push(...n),r.push(...t),r.push("}"),r.join("\n")}function d(e,n,t){switch(typeof e){case"string":return"string";case"number":return e%1==0?e>-2147483648&&e<2147483647?"int32":"int64":"double";case"boolean":return"bool";case"object":if(null===e)return n.add("google/protobuf/any.proto"),"google.protobuf.Any";if(0===t)return"object"}return n.add("google/protobuf/any.proto"),"google.protobuf.Any"}const g=document.getElementById("input"),f=document.getElementById("output"),h=document.getElementById("inline"),p=new class{constructor(e){this.inline=e}}(h.checked);function m(){const e=c(g.innerText.trim());var n;e.success?f.innerHTML=(n=e.success,o(),i.a.highlight("protobuf",n).value):f.innerHTML=e.error}g.addEventListener("keyup",m),h.addEventListener("change",(function(){p.inline=h.checked,m()}))}]);