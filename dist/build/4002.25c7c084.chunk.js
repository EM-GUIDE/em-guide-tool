"use strict";(self.webpackChunkem_guide_app=self.webpackChunkem_guide_app||[]).push([[4002],{14002:(U,m,s)=>{s.r(m),s.d(m,{default:()=>ct});var t=s(56940),o=s(30956),c=s(93484),u=s(63355),l=s(75937),p=s(84319),S=s(53917),D=s(22512),L=s(95984),r=s(9728),g=s(74065),T=s(58400),q=s(54997),k=s(65094),_=s(19493),tt=s(95207),st=s(2986),F=s(94684),d=s(44773),K=s(5964),et=s(31220),nt=s(84093),P=s(66041),w=s(19681);const B=w.default.div`
  background: ${({theme:a})=>a.colors.danger500};
  border: none;
  border-radius: 16px;
  position: relative;
  height: ${24/16}rem;
  width: ${40/16}rem;

  & span {
    font-size: ${({visibleLabels:a})=>a?"1rem":0};
  }

  &:before {
    content: '';
    background: ${({theme:a})=>a.colors.neutral0};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    transition: all 0.5s;
    left: ${({theme:a})=>a.spaces[1]};
    top: ${({theme:a})=>a.spaces[1]};
  }

  @media (prefers-reduced-motion: reduce) {
    &:before {
      transition: none;
    }
  }
`,ot=w.default.button`
  background: transparent;
  padding: 0;
  border: none;

  &[aria-checked='true'] ${B} {
    background: ${({theme:a})=>a.colors.success500};
  }

  &[aria-checked='true'] ${B}:before {
    transform: translateX(1rem);
  }
`,at=l.forwardRef(({label:a,onChange:x,onLabel:f="On",offLabel:h="Off",selected:M,visibleLabels:n=!1,...v},j)=>(0,t.jsx)(ot,{ref:j,role:"switch","aria-checked":M,"aria-label":a,onClick:x,visibleLabels:n,type:"button",...v,children:(0,t.jsxs)(P.k,{children:[(0,t.jsxs)(B,{children:[(0,t.jsx)("span",{children:f}),(0,t.jsx)("span",{children:h})]}),n&&(0,t.jsx)(k.x,{as:"span","aria-hidden":!0,paddingLeft:2,color:M?"success600":"danger600",children:M?f:h})]})}));var N=s(24091),it=s(66558),$=s(7047),z=s(68333),dt=s(95227),lt=s(24356),rt=s(48288),O=s(40829),H=s(82018),pt=s(21633),St=s(85845),Dt=s(88720),Lt=s(66086),Pt=s(88193),Bt=s(8232),$t=s(5337),Ot=s(4357),At=s(41480),It=s(24926),Rt=s(32635),Wt=s(42052),Zt=s(67620),Ut=s(71999),kt=s(4549),Ft=s(333),Kt=s(21709),wt=s(78712);const ht=()=>{const[a,x]=(0,l.useState)(!1),[f,h]=(0,l.useState)([]),M=(0,c.useSelector)(u.s),{formatMessage:n}=(0,rt.Z)(),{formatAPIError:v}=(0,o.useAPIErrorHandler)(),j=(0,o.useNotification)();(0,o.useFocusWhenNavigate)();const{push:gt}=(0,H.k6)(),{pathname:V}=(0,H.TH)(),{isLoading:ut,allowedActions:{canCreate:A,canUpdate:G,canDelete:Q}}=(0,o.useRBAC)(M.settings.webhooks),{get:xt,post:mt,put:ft}=(0,o.useFetchClient)(),{notifyStatus:Y}=(0,p.G)(),vt="webhooks",{isLoading:jt,data:C,error:I,refetch:X}=(0,O.useQuery)(vt,async()=>{const{data:{data:e}}=await xt("/admin/webhooks");return e});(0,l.useEffect)(()=>{if(I){j({type:"warning",message:v(I)});return}C&&Y(n({id:"Settings.webhooks.list.loading.success",defaultMessage:"Webhooks have been loaded"}))},[C,I,j,n,Y,v]);const J=(0,O.useMutation)(async()=>{await mt("/admin/webhooks/batch-delete",{ids:f})},{onError(e){j({type:"warning",message:v(e)}),x(!1)},onSuccess(){h([]),x(!1),X()}}),Ct=(0,O.useMutation)(async({isEnabled:e,id:i})=>{const{id:E,...Z}=C.find(Et=>Et.id===i)??{},bt={...Z,isEnabled:e};await ft(`/admin/webhooks/${i}`,bt)},{onError(e){j({type:"warning",message:v(e)})},onSuccess(){X()}}),Mt=()=>J.mutate(),yt=e=>h(e?C.map(i=>i.id):[]),Tt=(e,i)=>h(e?E=>[...E,i]:E=>E.filter(Z=>Z!==i)),R=e=>gt(`${V}/${e}`),W=ut||jt,b=C?.length??0,y=f.length;return(0,t.jsxs)(S.A,{children:[(0,t.jsx)(o.SettingsPageTitle,{name:"Webhooks"}),(0,t.jsxs)(D.o,{"aria-busy":W,children:[(0,t.jsx)(L.T,{title:n({id:"Settings.webhooks.title",defaultMessage:"Webhooks"}),subtitle:n({id:"Settings.webhooks.list.description",defaultMessage:"Get POST changes notifications"}),primaryAction:A&&!W&&(0,t.jsx)(o.LinkButton,{startIcon:(0,t.jsx)($.Z,{}),variant:"default",to:`${V}/create`,size:"S",children:n({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"})})}),y>0&&Q&&(0,t.jsx)(r.Z,{startActions:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(g.Z,{variant:"epsilon",textColor:"neutral600",children:n({id:"Settings.webhooks.to.delete",defaultMessage:"{webhooksToDeleteLength, plural, one {# webhook} other {# webhooks}} selected"},{webhooksToDeleteLength:y})}),(0,t.jsx)(T.z,{onClick:()=>x(!0),startIcon:(0,t.jsx)(z.Z,{}),size:"L",variant:"danger-light",children:n({id:"global.delete",defaultMessage:"Delete"})})]})}),(0,t.jsx)(q.D,{children:W?(0,t.jsx)(k.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0,children:(0,t.jsx)(o.LoadingIndicatorPage,{})}):b>0?(0,t.jsxs)(_.i,{colCount:5,rowCount:b+1,footer:(0,t.jsx)(tt.c,{onClick:()=>A?R("create"):{},icon:(0,t.jsx)($.Z,{}),children:n({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"})}),children:[(0,t.jsx)(st.h,{children:(0,t.jsxs)(F.Tr,{children:[(0,t.jsx)(d.Th,{children:(0,t.jsx)(K.C,{"aria-label":n({id:"global.select-all-entries",defaultMessage:"Select all entries"}),indeterminate:y>0&&y<b,value:y===b,onValueChange:yt})}),(0,t.jsx)(d.Th,{width:"20%",children:(0,t.jsx)(g.Z,{variant:"sigma",textColor:"neutral600",children:n({id:"global.name",defaultMessage:"Name"})})}),(0,t.jsx)(d.Th,{width:"60%",children:(0,t.jsx)(g.Z,{variant:"sigma",textColor:"neutral600",children:n({id:"Settings.webhooks.form.url",defaultMessage:"URL"})})}),(0,t.jsx)(d.Th,{width:"20%",children:(0,t.jsx)(g.Z,{variant:"sigma",textColor:"neutral600",children:n({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"})})}),(0,t.jsx)(d.Th,{children:(0,t.jsx)(et.T,{children:n({id:"Settings.webhooks.list.th.actions",defaultMessage:"Actions"})})})]})}),(0,t.jsx)(nt.p,{children:C.map(e=>(0,t.jsxs)(F.Tr,{...(0,o.onRowClick)({fn:()=>R(e.id),condition:G}),children:[(0,t.jsx)(d.Td,{...o.stopPropagation,children:(0,t.jsx)(K.C,{"aria-label":`${n({id:"global.select",defaultMessage:"Select"})} ${e.name}`,value:f?.includes(e.id),onValueChange:i=>Tt(i,e.id),name:"select"})}),(0,t.jsx)(d.Td,{children:(0,t.jsx)(g.Z,{fontWeight:"semiBold",textColor:"neutral800",children:e.name})}),(0,t.jsx)(d.Td,{children:(0,t.jsx)(g.Z,{textColor:"neutral800",children:e.url})}),(0,t.jsx)(d.Td,{children:(0,t.jsx)(P.k,{children:(0,t.jsx)(at,{onLabel:n({id:"global.enabled",defaultMessage:"Enabled"}),offLabel:n({id:"global.disabled",defaultMessage:"Disabled"}),label:`${e.name} ${n({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"})}`,selected:e.isEnabled,onChange:i=>{i.stopPropagation(),Ct.mutate({isEnabled:!e.isEnabled,id:e.id})},visibleLabels:!0})})}),(0,t.jsx)(d.Td,{children:(0,t.jsxs)(P.k,{gap:1,children:[G&&(0,t.jsx)(N.h,{label:n({id:"Settings.webhooks.events.update",defaultMessage:"Update"}),icon:(0,t.jsx)(dt.Z,{}),noBorder:!0}),Q&&(0,t.jsx)(N.h,{onClick:i=>{i.stopPropagation(),h([e.id]),x(!0)},label:n({id:"Settings.webhooks.events.delete",defaultMessage:"Delete webhook"}),icon:(0,t.jsx)(z.Z,{}),noBorder:!0})]})})]},e.id))})]}):(0,t.jsx)(it.x,{icon:(0,t.jsx)(lt.Z,{width:"160px"}),content:n({id:"Settings.webhooks.list.empty.description",defaultMessage:"No webhooks found"}),action:(0,t.jsx)(T.z,{variant:"secondary",startIcon:(0,t.jsx)($.Z,{}),onClick:()=>A?R("create"):{},children:n({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"})})})})]}),(0,t.jsx)(o.ConfirmDialog,{isOpen:a,onToggleDialog:()=>x(e=>!e),onConfirm:Mt,isConfirmButtonLoading:J.isLoading})]})},ct=()=>{const a=(0,c.useSelector)(u.s);return(0,t.jsx)(o.CheckPagePermissions,{permissions:a.settings.webhooks.main,children:(0,t.jsx)(ht,{})})}},9728:(U,m,s)=>{s.d(m,{Z:()=>c});var t=s(56940),o=s(66041);const c=({startActions:u,endActions:l})=>!u&&!l?null:(0,t.jsxs)(o.k,{justifyContent:"space-between",alignItems:"flex-start",paddingBottom:4,paddingLeft:10,paddingRight:10,children:[(0,t.jsx)(o.k,{gap:2,wrap:"wrap",children:u}),(0,t.jsx)(o.k,{gap:2,shrink:0,wrap:"wrap",children:l})]})},95207:(U,m,s)=>{s.d(m,{c:()=>L});var t=s(56940),o=s(19681),c=s(65094),u=s(43669),l=s(66041),p=s(74065);const S=(0,o.default)(c.x)`
  height: ${24/16}rem;
  width: ${24/16}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${10/16}rem;
    width: ${10/16}rem;
  }

  svg path {
    fill: ${({theme:r})=>r.colors.primary600};
  }
`,D=(0,o.default)(c.x)`
  border-radius: 0 0 ${({theme:r})=>r.borderRadius} ${({theme:r})=>r.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,L=({children:r,icon:g,...T})=>(0,t.jsxs)("div",{children:[(0,t.jsx)(u.i,{}),(0,t.jsx)(D,{as:"button",background:"primary100",padding:5,...T,children:(0,t.jsxs)(l.k,{children:[(0,t.jsx)(S,{"aria-hidden":!0,background:"primary200",children:g}),(0,t.jsx)(c.x,{paddingLeft:3,children:(0,t.jsx)(p.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:r})})]})})]})}}]);
