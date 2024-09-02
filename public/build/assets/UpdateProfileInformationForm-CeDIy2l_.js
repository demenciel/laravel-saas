import{q as g,W as j,u as v,j as e,b as y}from"./app-CqjuiQQL.js";import{I as o,a as m}from"./InputLabel-CjdxEBzi.js";import{P as N}from"./PrimaryButton-q-EIxXXZ.js";import{T as l}from"./TextInput-RNEii0jW.js";import{X as b}from"./transition-BH3c9Q3E.js";function P({mustVerifyEmail:c,status:d,className:u=""}){const t=g().props.auth.user,{data:s,setData:r,patch:f,errors:i,processing:x,recentlySuccessful:h}=j({name:t.name,email:t.email}),{theme:n}=v(),p=a=>{a.preventDefault(),f(route("profile.update"))};return e.jsxs("section",{className:u,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Profile Information"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Update your account's profile information and email address."})]}),e.jsxs("form",{onSubmit:p,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(o,{htmlFor:"name",value:"Name"}),e.jsx(l,{id:"name",style:{background:n==="dark"?"#171717":"#fff"},className:"mt-1 block w-full",value:s.name,onChange:a=>r("name",a.target.value),required:!0,isFocused:!0,autoComplete:"name"}),e.jsx(m,{className:"mt-2",message:i.name})]}),e.jsxs("div",{children:[e.jsx(o,{htmlFor:"email",value:"Email"}),e.jsx(l,{id:"email",style:{background:n==="dark"?"#171717":"#fff"},type:"email",className:"mt-1 block w-full",value:s.email,onChange:a=>r("email",a.target.value),required:!0,autoComplete:"username"}),e.jsx(m,{className:"mt-2",message:i.email})]}),c&&t.email_verified_at===null&&e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm mt-2 text-gray-800",children:["Your email address is unverified.",e.jsx(y,{href:route("verification.send"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Click here to re-send the verification email."})]}),d==="verification-link-sent"&&e.jsx("div",{className:"mt-2 font-medium text-sm text-green-600",children:"A new verification link has been sent to your email address."})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(N,{disabled:x,children:"Save"}),e.jsx(b,{show:h,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-green-600",children:"Saved."})})]})]})]})}export{P as default};
