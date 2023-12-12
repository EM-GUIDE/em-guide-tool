"use strict";(self.webpackChunkem_guide_app=self.webpackChunkem_guide_app||[]).push([[6894],{38843:(j,O,s)=>{s.d(O,{S:()=>m});var t=s(56940),P=s(78054),a=s(11674),i=s(78506),d=s(66041),D=s(74065),h=s(48288),c=s(47474),e=s(19681);const m=({providers:_,displayAllProviders:M})=>{const{formatMessage:E}=(0,h.Z)();return M?(0,t.jsx)(P.r,{gap:4,children:_.map(n=>(0,t.jsx)(a.P,{col:4,children:(0,t.jsx)(o,{provider:n})},n.uid))}):_.length>2&&!M?(0,t.jsxs)(P.r,{gap:4,children:[_.slice(0,2).map(n=>(0,t.jsx)(a.P,{col:4,children:(0,t.jsx)(o,{provider:n})},n.uid)),(0,t.jsx)(a.P,{col:4,children:(0,t.jsx)(i.u,{label:E({id:"global.see-more"}),children:(0,t.jsx)(r,{as:c.Link,to:"/auth/providers",children:(0,t.jsx)("span",{"aria-hidden":!0,children:"\u2022\u2022\u2022"})})})})]}):(0,t.jsx)(x,{justifyContent:"center",children:_.map(n=>(0,t.jsx)(o,{provider:n},n.uid))})},x=(0,e.default)(d.k)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:_})=>_.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:_})=>_.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:_})=>_.spaces[2]};
  }
`,o=({provider:_})=>(0,t.jsx)(i.u,{label:_.displayName,children:(0,t.jsx)(r,{href:`${window.strapi.backendURL}/admin/connect/${_.uid}`,children:_.icon?(0,t.jsx)("img",{src:_.icon,"aria-hidden":!0,alt:"",height:"32px"}):(0,t.jsx)(D.Z,{children:_.displayName})})}),r=e.default.a`
  width: ${136/16}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${48/16}rem;
  border: 1px solid ${({theme:_})=>_.colors.neutral150};
  border-radius: ${({theme:_})=>_.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:_})=>_.colors.neutral600};
`},96894:(j,O,s)=>{s.r(O),s.d(O,{FORMS:()=>R});var t=s(56940),P=s(22512),a=s(65094),i=s(74065),d=s(66041),D=s(39738),h=s(58400),c=s(43669),e=s(70468),m=s(30956),x=s(48288),o=s(40829),r=s(82018),_=s(47474),M=s(19681),E=s(88720),n=s(38843),W=s(66086),I=s(88193),K=s(8232),u=s(5337),f=s(4357),y=s(41480),p=s(75937),S=s(93484),$=s(24926),Z=s(32635),F=s(42052),N=s(67620),z=s(71999),Q=s(4549),G=s(333),H=s(21709);const L=()=>{const{push:A}=(0,r.k6)(),{formatMessage:l}=(0,x.Z)(),{get:B}=(0,m.useFetchClient)(),{isLoading:g,data:v=[]}=(0,o.useQuery)(["ee","providers"],async()=>{const{data:U}=await B("/admin/providers");return U},{enabled:window.strapi.features.isEnabled(window.strapi.features.SSO)}),T=()=>{A("/auth/login")};return!window.strapi.features.isEnabled(window.strapi.features.SSO)||!g&&v.length===0?(0,t.jsx)(r.l_,{to:"/auth/login"}):(0,t.jsx)(E.U,{children:(0,t.jsxs)(P.o,{children:[(0,t.jsxs)(E.e,{children:[(0,t.jsxs)(E.C,{children:[(0,t.jsx)(E.f,{}),(0,t.jsx)(a.x,{paddingTop:6,paddingBottom:1,children:(0,t.jsx)(i.Z,{as:"h1",variant:"alpha",children:l({id:"Auth.form.welcome.title"})})}),(0,t.jsx)(a.x,{paddingBottom:7,children:(0,t.jsx)(i.Z,{variant:"epsilon",textColor:"neutral600",children:l({id:"Auth.login.sso.subtitle"})})})]}),(0,t.jsxs)(d.k,{direction:"column",alignItems:"stretch",gap:7,children:[g?(0,t.jsx)(d.k,{justifyContent:"center",children:(0,t.jsx)(D.a,{children:l({id:"Auth.login.sso.loading"})})}):(0,t.jsx)(n.S,{providers:v}),(0,t.jsxs)(d.k,{children:[(0,t.jsx)(C,{}),(0,t.jsx)(a.x,{paddingLeft:3,paddingRight:3,children:(0,t.jsx)(i.Z,{variant:"sigma",textColor:"neutral600",children:l({id:"or"})})}),(0,t.jsx)(C,{})]}),(0,t.jsx)(h.z,{fullWidth:!0,size:"L",onClick:T,children:l({id:"Auth.form.button.login.strapi"})})]})]}),(0,t.jsx)(d.k,{justifyContent:"center",children:(0,t.jsx)(a.x,{paddingTop:4,children:(0,t.jsx)(e.r,{as:_.NavLink,to:"/auth/forgot-password",children:(0,t.jsx)(i.Z,{variant:"pi",children:l({id:"Auth.link.forgot-password"})})})})})]})})},C=(0,M.default)(c.i)`
  flex: 1;
`,R={providers:L}}}]);
