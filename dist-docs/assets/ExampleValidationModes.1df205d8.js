import{s as f}from"./doc-tools.f01ca670.js";import{_ as v,f as a,c as b,b as s,a as o,F as L,e as n,d as h,o as g,v as M,x as y}from"./index.55f63345.js";const T={setup(){let r=a(""),t=a(""),_=a(""),e=a(""),u={required:!0,minLength:5,alphanumeric:!0},m=a(""),i=a(""),d=a(""),l=a("");return{username:r,username2:t,username3:_,username4:e,rules:u,usernameStatus:m,usernameStatus2:i,usernameStatus3:d,usernameStatus4:l,messages:{required:"Please enter a value for this field",alpha:"Please enter only letters",numeric:"Please enter only numbers",alphanumeric:"Please enter only letters or numbers",minLength:"Please enter at least 3 characters",email:"Please enter valid email address",atLeastOneUppercase:"Please enter at least one uppercase character",atLeastOneLowercase:"Please enter at least one lowercase character",atLeastOneDigit:"Please enter at least one numeric character",atLeastOneSpecial:"Please enter at least one special character"},stringifyObject:f}}},c=r=>(M("data-v-ff23cc19"),r=r(),y(),r),H={class:"flex gap-x-20"},x={class:"basis-1/2"},p={class:"m-0"},O=n("      "),V=c(()=>s("ul",{class:"font-semibold mb-5"},[n(`\r
        `),s("li",null,'validate-on: "blur"'),n(`\r
        `),s("li",null,'validate-mode: "silent""'),n(`\r
      `)],-1)),S=n(`\r
      `),j=["innerHTML"],U=n(`\r
      `),P=["innerHTML"],w=n(`\r
      `),k=["innerHTML"],I=n(`\r
    `),B={class:"flex gap-x-20"},E={class:"basis-1/2"},N={class:"m-0"},q=n("      "),F=c(()=>s("ul",{class:"font-semibold mb-5"},[n(`\r
        `),s("li",null,'validate-on: "blur"'),n(`\r
        `),s("li",null,'validate-mode: "eager""'),n(`\r
      `)],-1)),C=n(`\r
      `),D=["innerHTML"],z=n(`\r
      `),A=["innerHTML"],G=n(`\r
      `),J=["innerHTML"],K=n(`\r
    `),Q={class:"flex gap-x-20"},R={class:"basis-1/2"},W={class:"m-0"},X=n("      "),Y=c(()=>s("ul",{class:"font-semibold mb-5"},[n(`\r
        `),s("li",null,'validate-on: "immediate"'),n(`\r
        `),s("li",null,'validate-mode: "silent""'),n(`\r
      `)],-1)),Z=n(`\r
      `),$=["innerHTML"],ee=n(`\r
      `),se=["innerHTML"],ne=n(`\r
      `),te=["innerHTML"],le=n(`\r
    `),ae={class:"flex gap-x-20"},oe={class:"basis-1/2"},re={class:"m-0"},ie=n("      "),de=c(()=>s("ul",{class:"font-semibold text-lg mb-5"},[n(`\r
        `),s("li",null,'validate-on: "immediate"'),n(`\r
        `),s("li",null,'validate-mode: "eager""'),n(`\r
      `)],-1)),ce=n(`\r
      `),_e=["innerHTML"],ue=n(`\r
      `),me=["innerHTML"],he=n(`\r
      `),fe=["innerHTML"],ve=n(`\r
    `);function be(r,t,_,e,u,m){const i=h("v-input"),d=h("v-divider");return g(),b(L,null,[s("div",H,[s("div",x,[o(i,{type:"text",placeholder:"Username",block:"",class:"w-full",modelValue:e.username,"onUpdate:modelValue":t[0]||(t[0]=l=>e.username=l),rules:e.rules,"validate-on":"blur","validate-mode":"silent","onUpdate:status":t[1]||(t[1]=l=>e.usernameStatus=l)},null,8,["modelValue","rules"])]),s("pre",p,[O,V,S,s("code",{innerHTML:"model: "+e.stringifyObject(e.username)},null,8,j),U,s("code",{innerHTML:"rules: "+e.stringifyObject(e.rules)},null,8,P),w,s("code",{innerHTML:"status: "+e.stringifyObject(e.usernameStatus,!0)},null,8,k),I])]),o(d,{class:"my-10"}),s("div",B,[s("div",E,[o(i,{type:"text",placeholder:"Username",block:"",class:"w-full",modelValue:e.username2,"onUpdate:modelValue":t[2]||(t[2]=l=>e.username2=l),rules:e.rules,"validate-on":"blur","validate-mode":"eager","onUpdate:status":t[3]||(t[3]=l=>e.usernameStatus2=l)},null,8,["modelValue","rules"])]),s("pre",N,[q,F,C,s("code",{innerHTML:"model: "+e.stringifyObject(e.username2)},null,8,D),z,s("code",{innerHTML:"rules: "+e.stringifyObject(e.rules)},null,8,A),G,s("code",{innerHTML:"status: "+e.stringifyObject(e.usernameStatus2,!0)},null,8,J),K])]),o(d,{class:"my-10"}),s("div",Q,[s("div",R,[o(i,{type:"text",placeholder:"Username",block:"",class:"w-full",modelValue:e.username3,"onUpdate:modelValue":t[4]||(t[4]=l=>e.username3=l),rules:e.rules,"validate-on":"immediate","validate-mode":"silent","onUpdate:status":t[5]||(t[5]=l=>e.usernameStatus3=l)},null,8,["modelValue","rules"])]),s("pre",W,[X,Y,Z,s("code",{innerHTML:"model: "+e.stringifyObject(e.username3)},null,8,$),ee,s("code",{innerHTML:"rules: "+e.stringifyObject(e.rules)},null,8,se),ne,s("code",{innerHTML:"status: "+e.stringifyObject(e.usernameStatus3,!0)},null,8,te),le])]),o(d,{class:"my-10"}),s("div",ae,[s("div",oe,[o(i,{type:"text",placeholder:"Username",block:"",class:"w-full",modelValue:e.username4,"onUpdate:modelValue":t[6]||(t[6]=l=>e.username4=l),rules:e.rules,"validate-on":"immediate","validate-mode":"eager","onUpdate:status":t[7]||(t[7]=l=>e.usernameStatus4=l)},null,8,["modelValue","rules"])]),s("pre",re,[ie,de,ce,s("code",{innerHTML:"model: "+e.stringifyObject(e.username4)},null,8,_e),ue,s("code",{innerHTML:"rules: "+e.stringifyObject(e.rules)},null,8,me),he,s("code",{innerHTML:"status: "+e.stringifyObject(e.usernameStatus4,!0)},null,8,fe),ve])])],64)}const ye=v(T,[["render",be],["__scopeId","data-v-ff23cc19"]]);export{ye as default};
