(this["webpackJsonpattica-admin"]=this["webpackJsonpattica-admin"]||[]).push([[44],{1253:function(e,t,a){"use strict";a.r(t);a(0);var s=a(22),r=a(35),c=a(970),n=a(89),i=a(170),l=a(203),o=a(152),d=a(791),m=a(790),b=a.p+"static/media/create-account-office.080280cb.jpeg",u=a.p+"static/media/create-account-office-dark.080280cb.jpeg",h=a(1);t.default=()=>{const{t:e}=Object(n.a)(),{onSubmit:t,register:a,handleSubmit:j,errors:p,loading:g}=Object(m.a)();return Object(h.jsx)("div",{className:"flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900",children:Object(h.jsx)("div",{className:"flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800",children:Object(h.jsxs)("div",{className:"flex flex-col overflow-y-auto md:flex-row",children:[Object(h.jsxs)("div",{className:"h-32 md:h-auto md:w-1/2",children:[Object(h.jsx)("img",{"aria-hidden":"true",className:"object-cover w-full h-full dark:hidden",src:b,alt:"Office"}),Object(h.jsx)("img",{"aria-hidden":"true",className:"hidden object-cover w-full h-full dark:block",src:u,alt:"Office"})]}),Object(h.jsx)("main",{className:"flex items-center justify-center p-6 sm:p-12 md:w-1/2",children:Object(h.jsxs)("div",{className:"w-full",children:[Object(h.jsx)("h1",{className:"mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200",children:e("CreateAccount")}),Object(h.jsxs)("form",{onSubmit:j(t),children:[Object(h.jsx)(o.a,{label:"Name"}),Object(h.jsx)(l.a,{register:a,label:"Name",name:"name",type:"text",placeholder:"Admin"}),Object(h.jsx)(i.a,{errorName:p.name}),Object(h.jsx)(o.a,{label:"Email"}),Object(h.jsx)(l.a,{register:a,label:"Email",name:"email",type:"email",placeholder:"john@doe.com"}),Object(h.jsx)(i.a,{errorName:p.email}),Object(h.jsx)(o.a,{label:"Password"}),Object(h.jsx)(l.a,{register:a,label:"Password",name:"password",type:"password",placeholder:"***************"}),Object(h.jsx)(i.a,{errorName:p.password}),Object(h.jsx)(o.a,{label:"Staff Role"}),Object(h.jsxs)("div",{className:"col-span-8 sm:col-span-4",children:[Object(h.jsx)(d.a,{register:a,label:"Role",name:"role"}),Object(h.jsx)(i.a,{errorName:p.role})]}),Object(h.jsxs)(r.Label,{className:"mt-6",check:!0,children:[Object(h.jsx)(r.Input,{type:"checkbox"}),Object(h.jsxs)("span",{className:"ml-2",children:[e("Iagree")," ",Object(h.jsx)("span",{className:"underline",children:e("privacyPolicy")})]})]}),Object(h.jsx)(r.Button,{disabled:g,type:"submit",className:"mt-4 h-12 w-full",to:"/dashboard",block:!0,children:e("CreateAccountTitle")})]}),Object(h.jsx)("hr",{className:"my-10"}),Object(h.jsxs)("button",{disabled:!0,className:"text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2",children:[Object(h.jsx)(c.a,{className:"w-4 h-4 mr-2"})," ",Object(h.jsxs)("span",{className:"ml-2",children:[" ",e("LoginWithFacebook")," "]})]}),Object(h.jsxs)("button",{disabled:!0,className:"text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full",children:[Object(h.jsx)(c.b,{className:"w-4 h-4 mr-2"})," ",Object(h.jsx)("span",{className:"ml-2",children:e("LoginWithGoogle")})]}),Object(h.jsx)("p",{className:"mt-4",children:Object(h.jsx)(s.b,{className:"text-sm font-medium text-green-500 dark:text-green-400 hover:underline",to:"/login",children:e("AlreadyAccount")})})]})})]})})})}},152:function(e,t,a){"use strict";a(0);var s=a(35),r=a(1);t.a=e=>{let{label:t}=e;return Object(r.jsx)(s.Label,{className:"col-span-4 sm:col-span-2 font-medium text-sm",children:t})}},170:function(e,t,a){"use strict";a(0);var s=a(1);t.a=e=>{let{errorName:t}=e;return Object(s.jsx)(s.Fragment,{children:t&&Object(s.jsx)("span",{className:"text-red-400 text-sm mt-2",children:t.message})})}},203:function(e,t,a){"use strict";a(0);var s=a(35),r=a(1);t.a=e=>{let{register:t,defaultValue:a,required:c,name:n,label:i,type:l,placeholder:o}=e;return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(s.Input,{...t(`${n}`,{required:!c&&`${i} is required!`}),defaultValue:a,type:l,placeholder:o,name:n,className:"border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"})})}},212:function(e,t,a){"use strict";var s=a(94);const r={registerAdmin:async e=>s.a.post("/admin/register",e),loginAdmin:async e=>{try{const t=await s.a.post("/admin/login",e);return t.data&&t.data.redirectToDashboard&&t.data.redirectURL?{...t,redirectToDashboard:t.data.redirectToDashboard,redirectURL:t.data.redirectURL}:{...t,redirectToDashboard:!1,redirectURL:"/"}}catch(t){throw t}},forgetPassword:async e=>s.a.put("/admin/forget-password",e),resetPassword:async e=>s.a.put("/admin/reset-password",e),signUpWithProvider:async e=>s.a.post("/admin/signup",e),addStaff:async e=>s.a.post("/admin/add",e),getAllStaff:async e=>s.a.get("/admin",e),getStaffById:async(e,t)=>s.a.post(`/admin/${e}`,t),updateStaff:async(e,t)=>s.a.put(`/admin/${e}`,t),updateStaffStatus:async(e,t)=>s.a.put(`/admin/update-status/${e}`,t),deleteStaff:async e=>s.a.delete(`/admin/${e}`)};t.a=r},790:function(e,t,a){"use strict";var s=a(15),r=a.n(s),c=a(0),n=a(209),i=a(3),l=a(25),o=a(212),d=a(37);t.a=()=>{const[e,t]=Object(c.useState)(!1),{dispatch:a}=Object(c.useContext)(l.a),s=Object(i.g)(),m=Object(i.h)(),{register:b,handleSubmit:u,formState:{errors:h}}=Object(n.a)();return{onSubmit:e=>{let{name:c,email:n,verifyEmail:i,password:l,role:b}=e;t(!0);"/login"===m.pathname?o.a.loginAdmin({email:n,password:l}).then((e=>{e&&(t(!1),Object(d.c)("Login Success!"),a({type:"USER_LOGIN",payload:e}),r.a.set("adminInfo",JSON.stringify(e),{expires:.5}),e.redirectToDashboard?s.push(e.redirectURL||"/dashboard"):s.push("/"))})).catch((e=>{Object(d.b)(e?e.response.data.message:e.message),t(!1)})):"/signup"===m.pathname?o.a.registerAdmin({name:c,email:n,password:l,role:b}).then((e=>{e&&(t(!1),Object(d.c)("Register Success!"),a({type:"USER_LOGIN",payload:e}),r.a.set("adminInfo",JSON.stringify(e),{expires:.5}),s.push("/"))})).catch((e=>{Object(d.b)(e?e.response.data.message:e.message),t(!1)})):"/forgot-password"===m.pathname&&o.a.forgetPassword({verifyEmail:i}).then((e=>{t(!1),Object(d.c)(e.message)})).catch((e=>{t(!1),Object(d.b)(e?e.response.data.message:e.message)}))},register:b,handleSubmit:u,errors:h,loading:e}}},791:function(e,t,a){"use strict";a(0);var s=a(35),r=a(1);t.a=e=>{let{setRole:t,register:a,name:c,label:n}=e;return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(s.Select,{onChange:e=>t(e.target.value),className:"border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white",name:c,...a(`${c}`,{required:`${n} is required!`}),children:[Object(r.jsx)("option",{value:"",defaultValue:!0,hidden:!0,children:"Staff role"}),Object(r.jsx)("option",{value:"Admin",children:"Admin"}),Object(r.jsx)("option",{value:"Executive",children:"Executive"})]})})}},94:function(e,t,a){"use strict";var s=a(131),r=a.n(s),c=a(15),n=a.n(c);const i=r.a.create({baseURL:"https://attica.onrender.com/api/",timeout:5e4,headers:{Accept:"application/json","Content-Type":"application/json"}});i.interceptors.request.use((function(e){let t,a;return n.a.get("adminInfo")&&(t=JSON.parse(n.a.get("adminInfo"))),n.a.get("company")&&(a=n.a.get("company")),{...e,headers:{authorization:t?`Bearer ${t.token}`:null,company:a||null}}}));const l=e=>e.data,o={get:(e,t,a)=>i.get(e,t,a).then(l),post:(e,t)=>i.post(e,t).then(l),put:(e,t,a)=>i.put(e,t,a).then(l),patch:(e,t)=>i.patch(e,t).then(l),delete:(e,t)=>i.delete(e,t).then(l)};t.a=o}}]);
//# sourceMappingURL=44.4d924194.chunk.js.map