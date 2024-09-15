(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{7259:function(e,t,n){Promise.resolve().then(n.bind(n,9185))},9185:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return f}});var a=n(7437),o=n(2265),c={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function r(e){if("number"==typeof e)return{value:e,unit:"px"};var t,n=(e.match(/^[0-9.]*/)||"").toString();t=n.includes(".")?parseFloat(n):parseInt(n,10);var a=(e.match(/[^0-9]*$/)||"").toString();return c[a]?{value:t,unit:a}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(t,"px.")),{value:t,unit:"px"})}function i(e){var t=r(e);return"".concat(t.value).concat(t.unit)}var s=function(){return(s=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},l=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&0>t.indexOf(a)&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,a=Object.getOwnPropertySymbols(e);o<a.length;o++)0>t.indexOf(a[o])&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(n[a[o]]=e[a[o]]);return n},u=function(e,t,n){var a="react-spinners-".concat(e,"-").concat(n);if("undefined"==typeof window||!window.document)return a;var o=document.createElement("style");document.head.appendChild(o);var c=o.sheet,r="\n    @keyframes ".concat(a," {\n      ").concat(t,"\n    }\n  ");return c&&c.insertRule(r,0),a}("MoonLoader","100% {transform: rotate(360deg)}","moon"),p=function(e){var t=e.loading,n=e.color,a=void 0===n?"#000000":n,c=e.speedMultiplier,p=void 0===c?1:c,d=e.cssOverride,m=e.size,f=l(e,["loading","color","speedMultiplier","cssOverride","size"]),h=r(void 0===m?60:m),x=h.value,v=h.unit,y=x/7,g=s({display:"inherit",position:"relative",width:"".concat("".concat(x+2*y).concat(v)),height:"".concat("".concat(x+2*y).concat(v)),animation:"".concat(u," ").concat(.6/p,"s 0s infinite linear"),animationFillMode:"forwards"},void 0===d?{}:d),b=function(e){return{width:i(e),height:i(e),borderRadius:"100%"}},w=s(s({},b(y)),{backgroundColor:"".concat(a),opacity:"0.8",position:"absolute",top:"".concat("".concat(x/2-y/2).concat(v)),animation:"".concat(u," ").concat(.6/p,"s 0s infinite linear"),animationFillMode:"forwards"}),j=s(s({},b(x)),{border:"".concat(y,"px solid ").concat(a),opacity:"0.1",boxSizing:"content-box",position:"absolute"});return void 0===t||t?o.createElement("span",s({style:g},f),o.createElement("span",{style:w}),o.createElement("span",{style:j})):null},d=n(8726);let m=(0,o.lazy)(()=>Promise.all([n.e(778),n.e(776)]).then(n.bind(n,2776)));var f=()=>{let[e,t]=(0,o.useState)([]),[n,c]=(0,o.useState)(!0),[r,i]=(0,o.useState)("");return(0,o.useEffect)(()=>{(async()=>{c(!0);try{let e=r?"/api/comments/getComments?search=".concat(encodeURIComponent(r)):"/api/comments/getComments",n=await fetch(e),a=await n.json();if(n.ok)t(a);else throw Error("Failed to fetch comments")}catch(e){console.error(e),d.ZP.error("Failed to fetch comments, please try again later")}finally{c(!1)}})()},[r]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex flex-col items-center",children:[(0,a.jsxs)("h1",{className:"text-center text-[48px] md:text-[64px] lg:text-[96px]",children:["Discover & Share ",(0,a.jsx)("span",{className:"block h1__span__gradient",children:"Fun & Joyful comments"})]}),(0,a.jsxs)("p",{className:"text-center text-[20px] md:text-[26px] lg:text-[40px] opacity-50",children:["SmileySpeak is a free to use website to find the best",(0,a.jsx)("br",{}),"comments on planet earth!"]})]}),(0,a.jsxs)("div",{className:"w-full flex flex-col gap-2 items-center",children:[(0,a.jsx)("label",{htmlFor:"search",className:"lg:text-[20px]",children:"Search for a tag or a username"}),(0,a.jsx)("input",{type:"text",name:"search",id:"search",placeholder:"#funny",className:"w-2/3 md:w-[500px] lg:w-[700px] p-4 box-shadow rounded-[5px] focus:outline-none",value:r,onChange:e=>i(e.target.value)})]}),(0,a.jsx)(o.Suspense,{fallback:(0,a.jsx)(p,{}),children:n?(0,a.jsx)("div",{style:{height:"200px",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,a.jsx)(p,{})}):0===e.length?(0,a.jsx)("h2",{className:"text-center text-[24px]",children:"No comments :("}):(0,a.jsx)(m,{comments:e})})]})}}},function(e){e.O(0,[726,971,23,744],function(){return e(e.s=7259)}),_N_E=e.O()}]);