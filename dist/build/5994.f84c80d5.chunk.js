"use strict";(self.webpackChunkem_guide_app=self.webpackChunkem_guide_app||[]).push([[5994],{85994:(R,d,s)=>{s.r(d),s.d(d,{LoginEE:()=>v});var _=s(56940),i=s(43669),n=s(65094),E=s(66041),r=s(74065),D=s(30956),M=s(48288),o=s(40829),l=s(19681),O=s(88720),e=s(38843),P=s(66086),h=s(88193),t=s(8232),m=s(5337),c=s(4357),a=s(41480),T=s(75937),U=s(93484),W=s(24926),K=s(32635),j=s(42052),f=s(67620),u=s(71999),y=s(4549),S=s(333),$=s(21709);const L=(0,l.default)(i.i)`
  flex: 1;
`,v=C=>{const{formatMessage:x}=(0,M.Z)(),{get:B}=(0,D.useFetchClient)(),{isLoading:A,data:g=[]}=(0,o.useQuery)(["ee","providers"],async()=>{const{data:I}=await B("/admin/providers");return I},{enabled:window.strapi.features.isEnabled(window.strapi.features.SSO)});return!window.strapi.features.isEnabled(window.strapi.features.SSO)||!A&&g.length===0?(0,_.jsx)(O.L,{...C}):(0,_.jsx)(O.L,{...C,children:(0,_.jsx)(n.x,{paddingTop:7,children:(0,_.jsxs)(E.k,{direction:"column",alignItems:"stretch",gap:7,children:[(0,_.jsxs)(E.k,{children:[(0,_.jsx)(L,{}),(0,_.jsx)(n.x,{paddingLeft:3,paddingRight:3,children:(0,_.jsx)(r.Z,{variant:"sigma",textColor:"neutral600",children:x({id:"Auth.login.sso.divider"})})}),(0,_.jsx)(L,{})]}),(0,_.jsx)(e.S,{providers:g,displayAllProviders:!1})]})})})}},38843:(R,d,s)=>{s.d(d,{S:()=>O});var _=s(56940),i=s(78054),n=s(11674),E=s(78506),r=s(66041),D=s(74065),M=s(48288),o=s(47474),l=s(19681);const O=({providers:t,displayAllProviders:m})=>{const{formatMessage:c}=(0,M.Z)();return m?(0,_.jsx)(i.r,{gap:4,children:t.map(a=>(0,_.jsx)(n.P,{col:4,children:(0,_.jsx)(P,{provider:a})},a.uid))}):t.length>2&&!m?(0,_.jsxs)(i.r,{gap:4,children:[t.slice(0,2).map(a=>(0,_.jsx)(n.P,{col:4,children:(0,_.jsx)(P,{provider:a})},a.uid)),(0,_.jsx)(n.P,{col:4,children:(0,_.jsx)(E.u,{label:c({id:"global.see-more"}),children:(0,_.jsx)(h,{as:o.Link,to:"/auth/providers",children:(0,_.jsx)("span",{"aria-hidden":!0,children:"\u2022\u2022\u2022"})})})})]}):(0,_.jsx)(e,{justifyContent:"center",children:t.map(a=>(0,_.jsx)(P,{provider:a},a.uid))})},e=(0,l.default)(r.k)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:t})=>t.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:t})=>t.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:t})=>t.spaces[2]};
  }
`,P=({provider:t})=>(0,_.jsx)(E.u,{label:t.displayName,children:(0,_.jsx)(h,{href:`${window.strapi.backendURL}/admin/connect/${t.uid}`,children:t.icon?(0,_.jsx)("img",{src:t.icon,"aria-hidden":!0,alt:"",height:"32px"}):(0,_.jsx)(D.Z,{children:t.displayName})})}),h=l.default.a`
  width: ${136/16}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${48/16}rem;
  border: 1px solid ${({theme:t})=>t.colors.neutral150};
  border-radius: ${({theme:t})=>t.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:t})=>t.colors.neutral600};
`}}]);
