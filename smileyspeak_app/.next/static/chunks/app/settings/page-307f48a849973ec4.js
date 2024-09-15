(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[938],{1402:function(e,a,s){Promise.resolve().then(s.bind(s,8972))},8972:function(e,a,s){"use strict";s.r(a);var r=s(7437),o=s(2265),t=s(3429),n=s(6463),l=s(8726),c=s(6648),d=s(9787);a.default=()=>{let{isAuthenticated:e}=(0,t.a)(),a=(0,n.useRouter)(),[s,i]=(0,o.useState)({changeusername:"",changeemail:"",changepassword:"",oldpassword:""}),h=e=>{i({...s,[e.target.name]:e.target.value})},u=async e=>{e.preventDefault();try{let e=await fetch("/api/auth/changeCredentials",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),r=await e.json();if(!e.ok)throw Error(r.message||"Something went wrong!");l.ZP.success("Credentials updated successfully!"),a.push("/")}catch(e){console.error(e),l.ZP.error(e.message)}};return(0,o.useEffect)(()=>{e||a.push("/login")},[e]),(0,r.jsxs)("form",{onSubmit:u,className:"w-[300px] sm:w-[350px] h-auto md:w-[450px] py-8 md:py-16 lg:w-[600px] rounded-[50px] bg-[#C4C4C4] border-black border-[1px] flex flex-col items-center gap-12 justify-center",children:[(0,r.jsx)("div",{className:"size-[64px] lg:size-[128px] relative",children:(0,r.jsx)(c.default,{src:"/images/smileylogo.png",alt:"SmileySpeak Logo",layout:"fill",objectFit:"cover",sizes:"100%"})}),(0,r.jsxs)("div",{className:"flex flex-col gap-4 md:gap-8 items-center",children:[(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("label",{htmlFor:"changeusername",children:"Change username"}),(0,r.jsx)("input",{type:"text",id:"changeusername",name:"changeusername",className:"md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4",placeholder:"DragonSlayer",onChange:h})]}),(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("label",{htmlFor:"changeemail",children:"Change Email Address"}),(0,r.jsx)("input",{type:"changeemail",id:"changeemail",name:"changeemail",className:"md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4",placeholder:"DragonSlayer@gmail.com",onChange:h})]}),(0,r.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("label",{htmlFor:"changepassword",children:"Change Password"}),(0,r.jsx)("input",{type:"password",id:"changepassword",name:"changepassword",className:"md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4",placeholder:"********",onChange:h})]}),(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("label",{htmlFor:"oldpassword",children:"Confirm Old Password"}),(0,r.jsx)("input",{type:"password",id:"oldpassword",name:"oldpassword",className:"md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4",placeholder:"********",onChange:h})]})]}),(0,r.jsx)(d.Z,{text:"Submit",redirect:!1})]})]})}},9787:function(e,a,s){"use strict";var r=s(7437),o=s(6463),t=s(3429),n=s(8726);a.Z=e=>{let{text:a,redirect:s}=e,l=(0,o.useRouter)(),{setIsAuthenticated:c}=(0,t.a)(),d=async()=>{if("Log Out"==a)try{if(!(await fetch("/api/auth/logout",{method:"POST",headers:{"Content-Type":"application/json"}})).ok)throw Error("An error occurred");return n.ZP.success("Logged out"),c(!1),l.push("/")}catch(e){return n.ZP.error("An error occurred")}if(s)return l.push("home"===a.toLowerCase()?"/":"/".concat(a.toLowerCase().replace(" ","")))};return(0,r.jsx)("button",{className:"px-8 py-4 text-[16px] md:text-[20px] bg-white rounded-[5px] box-shadow hover:bg-[#F0F0F0] text-black",onClick:d,children:a})}},3429:function(e,a,s){"use strict";s.d(a,{AuthProvider:function(){return n},a:function(){return l}});var r=s(7437),o=s(2265);let t=(0,o.createContext)(void 0),n=e=>{let{children:a}=e,[s,n]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{(async()=>{try{if(!(await fetch("/api/auth/check")).ok)throw Error("Not authenticated");n(!0)}catch(e){n(!1)}})()},[]),(0,r.jsx)(t.Provider,{value:{isAuthenticated:s,setIsAuthenticated:n},children:a})},l=()=>{let e=(0,o.useContext)(t);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}}},function(e){e.O(0,[726,595,971,23,744],function(){return e(e.s=1402)}),_N_E=e.O()}]);