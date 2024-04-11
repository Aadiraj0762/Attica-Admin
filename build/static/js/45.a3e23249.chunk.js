(this["webpackJsonpattica-admin"]=this["webpackJsonpattica-admin"]||[]).push([[45],{1232:function(e,t,a){"use strict";a.r(t);var r=a(35),s=a(0),n=a(22),o=a(3),c=a(209),i=a(89),d=a(170),l=a(152),u=a(212),m=a(37),f=a(814),h=a(815),p=a(1);t.default=()=>{const{t:e}=Object(i.a)(),{token:t}=Object(o.i)(),a=Object(s.useRef)(""),[b,w]=Object(s.useState)(!1),{register:g,handleSubmit:j,watch:x,formState:{errors:y}}=Object(c.a)();a.current=x("newPassword");return Object(p.jsx)("div",{className:"flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900",children:Object(p.jsx)("div",{className:"flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800",children:Object(p.jsxs)("div",{className:"flex flex-col overflow-y-auto md:flex-row",children:[Object(p.jsxs)("div",{className:"h-32 md:h-auto md:w-1/2",children:[Object(p.jsx)("img",{"aria-hidden":"true",className:"object-cover w-full h-full dark:hidden",src:f.a,alt:"Office"}),Object(p.jsx)("img",{"aria-hidden":"true",className:"hidden object-cover w-full h-full dark:block",src:h.a,alt:"Office"})]}),Object(p.jsx)("main",{className:"flex items-center justify-center p-6 sm:p-12 md:w-1/2",children:Object(p.jsxs)("div",{className:"w-full",children:[Object(p.jsx)("h1",{className:"mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200",children:e("ResetPassword")}),Object(p.jsxs)("form",{onSubmit:j((e=>{let{newPassword:a}=e;w(!0),u.a.resetPassword({newPassword:a,token:t}).then((e=>{w(!1),Object(m.c)(e.message)})).catch((e=>{w(!1),Object(m.b)(e?e.response.data.message:e.message)}))})),children:[Object(p.jsx)(l.a,{label:"Password"}),Object(p.jsx)(r.Input,{label:"Password",name:"newPassword",type:"password",placeholder:"Password",...g("newPassword",{required:"You must specify a password",minLength:{value:10,message:"Password must have at least 10 characters"}}),className:"border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"}),Object(p.jsx)(d.a,{errorName:y.newPassword}),Object(p.jsx)("div",{className:"mt-6"}),Object(p.jsx)(l.a,{label:"Confirm Password"}),Object(p.jsx)(r.Input,{label:"Confirm Password",name:"confirm_password",type:"password",placeholder:e("ConfirmPassword"),...g("confirm_password",{validate:e=>e===a.current||"The passwords do not match"}),className:"border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"}),Object(p.jsx)(d.a,{errorName:y.confirm_password}),Object(p.jsx)(r.Button,{disabled:b,type:"submit",block:!0,className:"mt-4 h-12",children:e("Reset")})]}),Object(p.jsx)("p",{className:"mt-4",children:Object(p.jsx)(n.b,{className:"text-sm font-medium text-green-500 dark:text-green-400 hover:underline",to:"/login",children:e("AlreadyAccount")})})]})})]})})})}},152:function(e,t,a){"use strict";a(0);var r=a(35),s=a(1);t.a=e=>{let{label:t}=e;return Object(s.jsx)(r.Label,{className:"col-span-4 sm:col-span-2 font-medium text-sm",children:t})}},170:function(e,t,a){"use strict";a(0);var r=a(1);t.a=e=>{let{errorName:t}=e;return Object(r.jsx)(r.Fragment,{children:t&&Object(r.jsx)("span",{className:"text-red-400 text-sm mt-2",children:t.message})})}},212:function(e,t,a){"use strict";var r=a(94);const s={registerAdmin:async e=>r.a.post("/admin/register",e),loginAdmin:async e=>{try{const t=await r.a.post("/admin/login",e);return t.data&&t.data.redirectToDashboard&&t.data.redirectURL?{...t,redirectToDashboard:t.data.redirectToDashboard,redirectURL:t.data.redirectURL}:{...t,redirectToDashboard:!1,redirectURL:"/"}}catch(t){throw t}},forgetPassword:async e=>r.a.put("/admin/forget-password",e),resetPassword:async e=>r.a.put("/admin/reset-password",e),signUpWithProvider:async e=>r.a.post("/admin/signup",e),addStaff:async e=>r.a.post("/admin/add",e),getAllStaff:async e=>r.a.get("/admin",e),getStaffById:async(e,t)=>r.a.post(`/admin/${e}`,t),updateStaff:async(e,t)=>r.a.put(`/admin/${e}`,t),updateStaffStatus:async(e,t)=>r.a.put(`/admin/update-status/${e}`,t),deleteStaff:async e=>r.a.delete(`/admin/${e}`)};t.a=s},814:function(e,t,a){"use strict";t.a=a.p+"static/media/forgot-password-office.d1630a33.jpeg"},815:function(e,t,a){"use strict";t.a=a.p+"static/media/forgot-password-office-dark.d1630a33.jpeg"},94:function(e,t,a){"use strict";var r=a(131),s=a.n(r),n=a(15),o=a.n(n);const c=s.a.create({baseURL:"https://attica.onrender.com/api/",timeout:5e4,headers:{Accept:"application/json","Content-Type":"application/json"}});c.interceptors.request.use((function(e){let t,a;return o.a.get("adminInfo")&&(t=JSON.parse(o.a.get("adminInfo"))),o.a.get("company")&&(a=o.a.get("company")),{...e,headers:{authorization:t?`Bearer ${t.token}`:null,company:a||null}}}));const i=e=>e.data,d={get:(e,t,a)=>c.get(e,t,a).then(i),post:(e,t)=>c.post(e,t).then(i),put:(e,t,a)=>c.put(e,t,a).then(i),patch:(e,t)=>c.patch(e,t).then(i),delete:(e,t)=>c.delete(e,t).then(i)};t.a=d},98:function(e,t){var a,r,s=e.exports={};function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function c(e){if(a===setTimeout)return setTimeout(e,0);if((a===n||!a)&&setTimeout)return a=setTimeout,setTimeout(e,0);try{return a(e,0)}catch(t){try{return a.call(null,e,0)}catch(t){return a.call(this,e,0)}}}!function(){try{a="function"===typeof setTimeout?setTimeout:n}catch(e){a=n}try{r="function"===typeof clearTimeout?clearTimeout:o}catch(e){r=o}}();var i,d=[],l=!1,u=-1;function m(){l&&i&&(l=!1,i.length?d=i.concat(d):u=-1,d.length&&f())}function f(){if(!l){var e=c(m);l=!0;for(var t=d.length;t;){for(i=d,d=[];++u<t;)i&&i[u].run();u=-1,t=d.length}i=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===o||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{return r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function p(){}s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var a=1;a<arguments.length;a++)t[a-1]=arguments[a];d.push(new h(e,t)),1!==d.length||l||c(f)},h.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=p,s.addListener=p,s.once=p,s.off=p,s.removeListener=p,s.removeAllListeners=p,s.emit=p,s.prependListener=p,s.prependOnceListener=p,s.listeners=function(e){return[]},s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}}}]);
//# sourceMappingURL=45.a3e23249.chunk.js.map