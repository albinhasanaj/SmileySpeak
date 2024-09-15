"use strict";(()=>{var e={};e.id=835,e.ids=[835],e.modules={7096:e=>{e.exports=require("bcrypt")},9344:e=>{e.exports=require("jsonwebtoken")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,s){return s in t?t[s]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,s)):"function"==typeof t&&"default"===s?t:void 0}}})},4195:(e,t,s)=>{s.r(t),s.d(t,{config:()=>f,default:()=>p,routeModule:()=>m});var a={};s.r(a),s.d(a,{default:()=>c});var n=s(1802),r=s(7153),i=s(6249),u=s(6397),o=s(2167),d=s(7096),l=s.n(d);async function c(e,t){let s;if("PATCH"!==e.method)return t.status(405).json({message:"Method not allowed"});try{s=await (0,u.B)();let{changeusername:a,changeemail:n,changepassword:r,oldpassword:i}=e.body;if(console.log(i),!i)return t.status(400).json({message:"Old password is required"});let d=(0,o.H)(e,t);if(!d)return t.status(401).json({message:"Not authenticated"});let[c]=await s.execute(`
            SELECT * FROM users WHERE id = ?;
        `,[d]);if(0===c.length)return t.status(404).json({message:"User not found"});if(!await l().compare(i,c[0].password))return t.status(400).json({message:"Invalid old password"});if(a){let[e]=await s.execute(`
                SELECT id FROM users WHERE username = ? AND id <> ?;
            `,[a,d]);if(e.length>0)return t.status(409).json({message:"Username already exists"})}if(n){let[e]=await s.execute(`
                SELECT id FROM users WHERE email = ? AND id <> ?;
            `,[n,d]);if(e.length>0)return t.status(409).json({message:"Email already exists"})}let p=[],f=[];if(a&&(p.push("username = ?"),f.push(a)),n&&(p.push("email = ?"),f.push(n)),r){let e=await l().hash(r,10);p.push("password = ?"),f.push(e)}if(p.length>0){let e=`UPDATE users SET ${p.join(", ")} WHERE id = ?`;f.push(d),await s.execute(e,f),t.status(200).json({message:"Credentials updated successfully"})}else t.status(400).json({message:"No fields to update"})}catch(e){t.status(500).json({message:e.message})}finally{s&&s.release()}}let p=(0,i.l)(a,"default"),f=(0,i.l)(a,"config"),m=new n.PagesAPIRouteModule({definition:{kind:r.x.PAGES_API,page:"/api/auth/changeCredentials",pathname:"/api/auth/changeCredentials",bundlePath:"",filename:""},userland:a})},6397:(e,t,s)=>{s.d(t,{B:()=>r});let a=require("mysql2/promise"),n=s.n(a)().createPool({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:!0,connectionLimit:10,queueLimit:0});async function r(){return await n.getConnection()}},2167:(e,t,s)=>{s.d(t,{H:()=>r});var a=s(9344),n=s.n(a);function r(e,t){let{token:s}=e.cookies;if(!s)return t.status(401).json({message:"Not authenticated"});try{return n().verify(s,process.env.JWT_SECRET).id}catch(e){return t.status(401).json({message:"Invalid token"})}}},7153:(e,t)=>{var s;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return s}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(s||(s={}))},1802:(e,t,s)=>{e.exports=s(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var s=t(t.s=4195);module.exports=s})();