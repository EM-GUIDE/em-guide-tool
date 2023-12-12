"use strict";(self.webpackChunkem_guide_app=self.webpackChunkem_guide_app||[]).push([[9336],{95207:(xt,k,n)=>{n.d(k,{c:()=>B});var t=n(56940),_=n(19681),$=n(65094),f=n(43669),x=n(66041),F=n(74065);const S=(0,_.default)($.x)`
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
    fill: ${({theme:y})=>y.colors.primary600};
  }
`,N=(0,_.default)($.x)`
  border-radius: 0 0 ${({theme:y})=>y.borderRadius} ${({theme:y})=>y.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,B=({children:y,icon:G,...z})=>(0,t.jsxs)("div",{children:[(0,t.jsx)(f.i,{}),(0,t.jsx)(N,{as:"button",background:"primary100",padding:5,...z,children:(0,t.jsxs)(x.k,{children:[(0,t.jsx)(S,{"aria-hidden":!0,background:"primary200",children:G}),(0,t.jsx)($.x,{paddingLeft:3,children:(0,t.jsx)(F.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:y})})]})})]})},59336:(xt,k,n)=>{n.r(k),n.d(k,{default:()=>zt});var t=n(56940),_=n(66041),$=n(81583),f=n(65094),x=n(74065),F=n(19493),S=n(2986),N=n(94684),B=n(44773),y=n(58400),G=n(95207),z=n(24091),Et=n(95984),yt=n(54997),c=n(30956),Ct=n(35184),U=n(7047),at=n(95227),Mt=n(68333),Tt=n(16361),Dt=n(42971),jt=n(30454),Pt=n(31941),D=n(333),Ot=n(37444),rt=n(45641),lt=n(28829),L=n(48288),Q=n(82018),W=n(75937),o=n(14025),d=n(91096),E=n(19681),Vt=n(41480),Ht=n(19637),Jt=n(21709),Xt=n(11632),Gt=n(12803),Qt=n(23330),Yt=n(78712),qt=n(42052),te=n(80649),ee=n(181),ne=n(93484),oe=n(51046),se=n(4549),ie=n(56201),ae=n(36684),re=n(30913),le=n(32635),de=n(71999),ce=n(53604);const dt=E.default.tr`
  &.component-row,
  &.dynamiczone-row {
    position: relative;
    border-top: none !important;

    table tr:first-child {
      border-top: none;
    }

    > td:first-of-type {
      padding: 0 0 0 ${(0,c.pxToRem)(20)};
      position: relative;

      &::before {
        content: '';
        width: ${(0,c.pxToRem)(4)};
        height: calc(100% - 40px);
        position: absolute;
        top: -7px;
        left: 1.625rem;
        border-radius: 4px;

        ${({isFromDynamicZone:e,isChildOfDynamicZone:s,theme:i})=>s?`background-color: ${i.colors.primary200};`:e?`background-color: ${i.colors.primary200};`:`background: ${i.colors.neutral150};`}
      }
    }
  }

  &.dynamiczone-row > td:first-of-type {
    padding: 0;
  }
`;function w({customRowComponent:e,component:s,isFromDynamicZone:i,isNestedInDZComponent:a,firstLoopComponentUid:p}){const{modifiedData:l}=(0,d.u)(),{schema:{attributes:m}}=D(l,["components",s],{schema:{attributes:[]}});return(0,t.jsx)(dt,{isChildOfDynamicZone:i,className:"component-row",children:(0,t.jsx)("td",{colSpan:12,children:(0,t.jsx)(V,{customRowComponent:e,items:m,targetUid:s,firstLoopComponentUid:p||s,editTarget:"components",isFromDynamicZone:i,isNestedInDZComponent:a,isSub:!0,secondLoopComponentUid:p?s:null})})})}w.defaultProps={component:null,customRowComponent:null,firstLoopComponentUid:null,isFromDynamicZone:!1,isNestedInDZComponent:!1},w.propTypes={component:o.string,customRowComponent:o.func,firstLoopComponentUid:o.string,isFromDynamicZone:o.bool,isNestedInDZComponent:o.bool};function Y({isActive:e,icon:s}){return(0,t.jsx)(_.k,{alignItems:"center",background:e?"primary200":"neutral200",justifyContent:"center",height:8,width:8,borderRadius:"50%",children:(0,t.jsx)($.J,{as:d.C[s]||d.C.cube,height:5,width:5})})}Y.defaultProps={isActive:!1,icon:"Cube"},Y.propTypes={isActive:o.bool,icon:o.string};const ct=(0,E.default)(f.x)`
  position: absolute;
  display: none;
  top: 5px;
  right: ${(0,c.pxToRem)(8)};

  svg {
    width: ${(0,c.pxToRem)(10)};
    height: ${(0,c.pxToRem)(10)};

    path {
      fill: ${({theme:e})=>e.colors.primary600};
    }
  }
`,vt=(0,E.default)(_.k)`
  width: ${(0,c.pxToRem)(140)};
  height: ${(0,c.pxToRem)(80)};
  position: relative;
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  background: ${({theme:e})=>e.colors.neutral100};
  border-radius: ${({theme:e})=>e.borderRadius};
  max-width: 100%;

  &.active,
  &:focus,
  &:hover {
    border: 1px solid ${({theme:e})=>e.colors.primary200};
    background: ${({theme:e})=>e.colors.primary100};

    ${ct} {
      display: block;
    }

    ${x.Z} {
      color: ${({theme:e})=>e.colors.primary600};
    }

    /* > ComponentIcon */
    > div:first-child {
      background: ${({theme:e})=>e.colors.primary200};
      color: ${({theme:e})=>e.colors.primary600};

      svg {
        path {
          fill: ${({theme:e})=>e.colors.primary600};
        }
      }
    }
  }
`;function q({component:e,dzName:s,index:i,isActive:a,isInDevelopmentMode:p,onClick:l}){const{modifiedData:m,removeComponentFromDynamicZone:j}=(0,d.u)(),{schema:{icon:M,displayName:C}}=D(m,["components",e],{schema:{}}),g=r=>{r.stopPropagation(),j(s,i)};return(0,t.jsxs)(vt,{alignItems:"center",direction:"column",className:a?"active":"",borderRadius:"borderRadius",justifyContent:"center",paddingLeft:4,paddingRight:4,shrink:0,onClick:l,role:"tab",tabIndex:a?0:-1,cursor:"pointer","aria-selected":a,"aria-controls":`dz-${s}-panel-${i}`,id:`dz-${s}-tab-${i}`,children:[(0,t.jsx)(Y,{icon:M,isActive:a}),(0,t.jsx)(f.x,{marginTop:1,maxWidth:"100%",children:(0,t.jsx)(x.Z,{variant:"pi",fontWeight:"bold",ellipsis:!0,children:C})}),p&&(0,t.jsx)(ct,{as:"button",onClick:g,children:(0,t.jsx)(Ct.Z,{})})]})}q.defaultProps={component:null,isActive:!1,isInDevelopmentMode:!1,onClick(){}},q.propTypes={component:o.string,dzName:o.string.isRequired,index:o.number.isRequired,isActive:o.bool,isInDevelopmentMode:o.bool,onClick:o.func};const bt=(0,E.default)(U.Z)`
  width: ${(0,c.pxToRem)(32)};
  height: ${(0,c.pxToRem)(32)};
  padding: ${(0,c.pxToRem)(9)};
  border-radius: ${(0,c.pxToRem)(64)};
  background: ${({theme:e})=>e.colors.primary100};
  path {
    fill: ${({theme:e})=>e.colors.primary600};
  }
`,Rt=(0,E.default)(f.x)`
  height: ${(0,c.pxToRem)(90)};
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`,At=(0,E.default)(_.k)`
  width: 100%;
  overflow-x: auto;
`,It=(0,E.default)(f.x)`
  padding-top: ${(0,c.pxToRem)(90)};
`,Bt=(0,E.default)(_.k)`
  flex-shrink: 0;
  width: ${(0,c.pxToRem)(140)};
  height: ${(0,c.pxToRem)(80)};
  justify-content: center;
  align-items: center;
`;function tt({customRowComponent:e,components:s,addComponent:i,name:a,targetUid:p}){const{isInDevelopmentMode:l}=(0,d.u)(),[m,j]=(0,W.useState)(0),{formatMessage:M}=(0,L.Z)(),C=r=>{m!==r&&j(r)},g=()=>{i(a)};return(0,t.jsx)(dt,{className:"dynamiczone-row",isFromDynamicZone:!0,children:(0,t.jsxs)("td",{colSpan:12,children:[(0,t.jsx)(Rt,{paddingLeft:8,children:(0,t.jsxs)(At,{gap:2,children:[l&&(0,t.jsx)("button",{type:"button",onClick:g,children:(0,t.jsxs)(Bt,{direction:"column",alignItems:"stretch",gap:1,children:[(0,t.jsx)(bt,{}),(0,t.jsx)(x.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:M({id:(0,d.g)("button.component.add"),defaultMessage:"Add a component"})})]})}),(0,t.jsx)(_.k,{role:"tablist",gap:2,children:s.map((r,u)=>(0,t.jsx)(q,{dzName:a,index:u,component:r,isActive:m===u,isInDevelopmentMode:l,onClick:()=>C(u)},r))})]})}),(0,t.jsx)(It,{children:s.map((r,u)=>{const h={customRowComponent:e,component:r};return(0,t.jsx)(f.x,{id:`dz-${a}-panel-${u}`,role:"tabpanel",tabindex:0,"aria-labelledby":`dz-${a}-tab-${u}`,style:{display:m===u?"block":"none"},children:(0,t.jsx)("table",{children:(0,t.jsx)("tbody",{children:(0,W.createElement)(w,{...h,isFromDynamicZone:!0,targetUid:p,key:r})})})},r)})})]})})}tt.defaultProps={addComponent(){},components:[],customRowComponent:null,name:null},tt.propTypes={addComponent:o.func,components:o.instanceOf(Array),customRowComponent:o.func,name:o.string,targetUid:o.string.isRequired};const Lt=(0,E.default)(f.x)`
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
    fill: ${({theme:e,color:s})=>e.colors[`${s}600`]};
  }
`,$t=(0,E.default)(f.x)`
  border-radius: 0 0 ${({theme:e})=>e.borderRadius} ${({theme:e})=>e.borderRadius};
  display: block;
  width: 100%;
  border: none;
  position: relative;
  left: -0.25rem;
`,pt=({children:e,icon:s,color:i,...a})=>(0,t.jsx)($t,{paddingBottom:4,paddingTop:4,as:"button",type:"button",...a,children:(0,t.jsxs)(_.k,{children:[(0,t.jsx)(Lt,{color:i,"aria-hidden":!0,background:`${i}200`,children:s}),(0,t.jsx)(f.x,{paddingLeft:3,children:(0,t.jsx)(x.Z,{variant:"pi",fontWeight:"bold",textColor:`${i}600`,children:e})})]})});pt.propTypes={color:o.string.isRequired,children:o.string.isRequired,icon:o.node.isRequired};const Ut=(0,E.default)(f.x)`
  table {
    width: 100%;
    white-space: nowrap;
  }

  thead {
    border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};

    tr {
      border-top: 0;
    }
  }

  tr {
    border-top: 1px solid ${({theme:e})=>e.colors.neutral150};

    & td,
    & th {
      padding: ${({theme:e})=>e.spaces[4]};
    }

    & td:first-of-type,
    & th:first-of-type {
      padding: 0 ${({theme:e})=>e.spaces[1]};
    }
  }

  th,
  td {
    vertical-align: middle;
    text-align: left;
    color: ${({theme:e})=>e.colors.neutral600};
    outline-offset: -4px;
  }
`;function V({addComponentToDZ:e,customRowComponent:s,editTarget:i,firstLoopComponentUid:a,isFromDynamicZone:p,isMain:l,isNestedInDZComponent:m,isSub:j,items:M,secondLoopComponentUid:C,targetUid:g}){const{formatMessage:r}=(0,L.Z)(),{trackUsage:u}=(0,c.useTracking)(),{isInDevelopmentMode:h,modifiedData:A,isInContentTypeView:O}=(0,d.u)(),{onOpenModalAddField:b}=(0,d.a)(),P=()=>{u("hasClickedCTBAddFieldBanner"),b({forTarget:i,targetUid:g})};return g?M.length===0&&l?(0,t.jsxs)(F.i,{colCount:2,rowCount:2,children:[(0,t.jsx)(S.h,{children:(0,t.jsxs)(N.Tr,{children:[(0,t.jsx)(B.Th,{children:(0,t.jsx)(x.Z,{variant:"sigma",textColor:"neutral600",children:r({id:"global.name",defaultMessage:"Name"})})}),(0,t.jsx)(B.Th,{children:(0,t.jsx)(x.Z,{variant:"sigma",textColor:"neutral600",children:r({id:"global.type",defaultMessage:"Type"})})})]})}),(0,t.jsx)(c.EmptyBodyTable,{action:(0,t.jsx)(y.z,{onClick:P,size:"L",startIcon:(0,t.jsx)(U.Z,{}),variant:"secondary",children:r({id:(0,d.g)("table.button.no-fields"),defaultMessage:"Add new field"})}),colSpan:2,content:O?{id:(0,d.g)("table.content.no-fields.collection-type"),defaultMessage:"Add your first field to this Collection-Type"}:{id:(0,d.g)("table.content.no-fields.component"),defaultMessage:"Add your first field to this component"}})]}):(0,t.jsxs)(Ut,{children:[(0,t.jsx)(f.x,{paddingLeft:6,paddingRight:l?6:0,...l&&{style:{overflowX:"auto"}},children:(0,t.jsxs)("table",{children:[l&&(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:(0,t.jsx)(x.Z,{variant:"sigma",textColor:"neutral600",children:r({id:"global.name",defaultMessage:"Name"})})}),(0,t.jsx)("th",{colSpan:"2",children:(0,t.jsx)(x.Z,{variant:"sigma",textColor:"neutral600",children:r({id:"global.type",defaultMessage:"Type"})})})]})}),(0,t.jsx)("tbody",{children:M.map(v=>{const{type:I}=v,K=s;return(0,t.jsxs)(W.Fragment,{children:[(0,t.jsx)(K,{...v,isNestedInDZComponent:m,targetUid:g,editTarget:i,firstLoopComponentUid:a,isFromDynamicZone:p,secondLoopComponentUid:C}),I==="component"&&(0,t.jsx)(w,{...v,customRowComponent:s,targetUid:g,isNestedInDZComponent:p,editTarget:i,firstLoopComponentUid:a}),I==="dynamiczone"&&(0,t.jsx)(tt,{...v,customRowComponent:s,addComponent:e,targetUid:g})]},v.name)})})]})}),l&&h&&(0,t.jsx)(G.c,{icon:(0,t.jsx)(U.Z,{}),onClick:P,children:r({id:(0,d.g)(`form.button.add.field.to.${A.contentType?A.contentType.schema.kind:i||"collectionType"}`),defaultMessage:"Add another field"})}),j&&h&&(0,t.jsx)(pt,{icon:(0,t.jsx)(U.Z,{}),onClick:P,color:p?"primary":"neutral",children:r({id:(0,d.g)("form.button.add.field.to.component"),defaultMessage:"Add another field"})})]}):(0,t.jsxs)(F.i,{colCount:2,rowCount:2,children:[(0,t.jsx)(S.h,{children:(0,t.jsxs)(N.Tr,{children:[(0,t.jsx)(B.Th,{children:(0,t.jsx)(x.Z,{variant:"sigma",textColor:"neutral600",children:r({id:"global.name",defaultMessage:"Name"})})}),(0,t.jsx)(B.Th,{children:(0,t.jsx)(x.Z,{variant:"sigma",textColor:"neutral600",children:r({id:"global.type",defaultMessage:"Type"})})})]})}),(0,t.jsx)(c.EmptyBodyTable,{colSpan:2,content:{id:(0,d.g)("table.content.create-first-content-type"),defaultMessage:"Create your first Collection-Type"}})]})}V.defaultProps={addComponentToDZ(){},customRowComponent:null,firstLoopComponentUid:null,isFromDynamicZone:!1,isNestedInDZComponent:!1,isMain:!1,isSub:!1,items:[],secondLoopComponentUid:null,targetUid:null},V.propTypes={addComponentToDZ:o.func,customRowComponent:o.func,editTarget:o.string.isRequired,firstLoopComponentUid:o.string,isFromDynamicZone:o.bool,isNestedInDZComponent:o.bool,isMain:o.bool,items:o.instanceOf(Array),secondLoopComponentUid:o.string,targetUid:o.string,isSub:o.bool};const Wt=(0,E.default)(f.x)`
  position: absolute;
  left: -1.125rem;
  top: 0px;

  &:before {
    content: '';
    width: ${4/16}rem;
    height: ${12/16}rem;
    background: ${({theme:e,color:s})=>e.colors[s]};
    display: block;
  }
`,Kt=E.default.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:e,color:s})=>e.colors[s]};
  }
`,ut=e=>(0,t.jsx)(Wt,{children:(0,t.jsx)(Kt,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,t.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z"})})});ut.propTypes={color:o.string.isRequired};const et=({content:e})=>lt(e);et.defaultProps={content:null},et.propTypes={content:o.string};const Zt=(0,E.default)(f.x)`
  position: relative;
`,nt=({type:e,customField:s,repeatable:i})=>{const{formatMessage:a}=(0,L.Z)();let p=e;return["integer","biginteger","float","decimal"].includes(e)?p="number":["string"].includes(e)&&(p="text"),s?(0,t.jsx)(x.Z,{children:a({id:(0,d.g)("attribute.customField"),defaultMessage:"Custom field"})}):(0,t.jsxs)(x.Z,{children:[a({id:(0,d.g)(`attribute.${p}`),defaultMessage:e}),"\xA0",i&&a({id:(0,d.g)("component.repeatable"),defaultMessage:"(repeatable)"})]})};nt.defaultProps={customField:null,repeatable:!1},nt.propTypes={type:o.string.isRequired,customField:o.string,repeatable:o.bool};function ot({configurable:e,customField:s,editTarget:i,firstLoopComponentUid:a,isFromDynamicZone:p,name:l,onClick:m,relation:j,repeatable:M,secondLoopComponentUid:C,target:g,targetUid:r,type:u}){const{contentTypes:h,isInDevelopmentMode:A,removeAttribute:O}=(0,d.u)(),{formatMessage:b}=(0,L.Z)(),P=u==="relation"&&j.includes("morph"),v=["integer","biginteger","float","decimal"].includes(u)?"number":u,I=D(h,[g],{}),K=D(I,["schema","displayName"],""),Z=D(I,"plugin"),it=g?"relation":v,H=()=>{P||e!==!1&&m(i,C||a||r,l,u,s)};let R;return C&&a?R=2:a?R=1:R=0,(0,t.jsxs)(Zt,{as:"tr",...(0,c.onRowClick)({fn:H,condition:A&&e&&!P}),children:[(0,t.jsxs)("td",{style:{position:"relative"},children:[R!==0&&(0,t.jsx)(ut,{color:p?"primary200":"neutral150"}),(0,t.jsxs)(_.k,{paddingLeft:2,gap:4,children:[(0,t.jsx)(d.A,{type:it,customField:s}),(0,t.jsx)(x.Z,{fontWeight:"bold",children:l})]})]}),(0,t.jsx)("td",{children:g?(0,t.jsxs)(x.Z,{children:[b({id:(0,d.g)(`modelPage.attribute.${P?"relation-polymorphic":"relationWith"}`),defaultMessage:"Relation with"}),"\xA0",(0,t.jsxs)("span",{style:{fontStyle:"italic"},children:[(0,t.jsx)(et,{content:K}),"\xA0",Z&&`(${b({id:(0,d.g)("from"),defaultMessage:"from"})}: ${Z})`]})]}):(0,t.jsx)(nt,{type:u,customField:s,repeatable:M})}),(0,t.jsx)("td",{children:A?(0,t.jsx)(_.k,{justifyContent:"flex-end",...c.stopPropagation,children:e?(0,t.jsxs)(_.k,{gap:1,children:[!P&&(0,t.jsx)(z.h,{onClick:H,label:`${b({id:"app.utils.edit",defaultMessage:"Edit"})} ${l}`,noBorder:!0,icon:(0,t.jsx)(at.Z,{})}),(0,t.jsx)(z.h,{onClick:J=>{J.stopPropagation(),O(i,l,C||a||"")},label:`${b({id:"global.delete",defaultMessage:"Delete"})} ${l}`,noBorder:!0,icon:(0,t.jsx)(Mt.Z,{})})]}):(0,t.jsx)(Tt.Z,{})}):(0,t.jsx)(f.x,{height:(0,c.pxToRem)(32)})})]})}ot.defaultProps={configurable:!0,customField:null,firstLoopComponentUid:null,isFromDynamicZone:!1,onClick(){},relation:"",repeatable:!1,secondLoopComponentUid:null,target:null,targetUid:null,type:null},ot.propTypes={configurable:o.bool,customField:o.string,editTarget:o.string.isRequired,firstLoopComponentUid:o.string,isFromDynamicZone:o.bool,name:o.string.isRequired,onClick:o.func,relation:o.string,repeatable:o.bool,secondLoopComponentUid:o.string,target:o.string,targetUid:o.string,type:o.string};const kt=(0,W.memo)(ot),Ft=e=>{let s;switch(e){case"date":case"datetime":case"time":case"timestamp":s="date";break;case"integer":case"biginteger":case"decimal":case"float":s="number";break;case"string":case"text":s="text";break;case"":s="relation";break;default:s=e}return s},St={collectionTypesConfigurations:[{action:"plugin::content-manager.collection-types.configure-view",subject:null}],componentsConfigurations:[{action:"plugin::content-manager.components.configure-layout",subject:null}],singleTypesConfigurations:[{action:"plugin::content-manager.single-types.configure-view",subject:null}]},st=({disabled:e,isTemporary:s,isInContentTypeView:i,contentTypeKind:a,targetUid:p})=>{const{formatMessage:l}=(0,L.Z)(),{push:m}=(0,Q.k6)(),{collectionTypesConfigurations:j,componentsConfigurations:M,singleTypesConfigurations:C}=St,g=l({id:"content-type-builder.form.button.configure-view",defaultMessage:"Configure the view"});let r=j;const u=()=>(s||m(i?`/content-manager/collectionType/${p}/configurations/edit`:`/content-manager/components/${p}/configurations/edit`),!1);return i&&a==="singleType"&&(r=C),i||(r=M),(0,t.jsx)(c.CheckPermissions,{permissions:r,children:(0,t.jsx)(y.z,{startIcon:(0,t.jsx)(Dt.Z,{}),variant:"tertiary",onClick:u,disabled:s||e,children:g})})};st.defaultProps={contentTypeKind:"collectionType",isInContentTypeView:!0,isTemporary:!1,targetUid:""},st.propTypes={disabled:o.bool.isRequired,contentTypeKind:o.string,isInContentTypeView:o.bool,isTemporary:o.bool,targetUid:o.string};const Nt=(0,W.memo)(st),zt=()=>{const{initialData:e,modifiedData:s,isInDevelopmentMode:i,isInContentTypeView:a,submitData:p}=(0,d.u)(),{formatMessage:l}=(0,L.Z)(),{trackUsage:m}=(0,c.useTracking)(),j=(0,Q.$B)("/plugins/content-type-builder/:kind/:currentUID"),{onOpenModalAddComponentsToDZ:M,onOpenModalAddField:C,onOpenModalEditField:g,onOpenModalEditSchema:r,onOpenModalEditCustomField:u}=(0,d.a)(),h=a?"contentType":"component",A=[h,"schema","attributes"],O=D(s,[h,"uid"]),b=D(s,[h,"isTemporary"],!1),P=D(s,[h,"schema","kind"],null),v=D(s,A,[]),I=Ot(e,[h,"plugin"]),K=!rt(s,e),Z=a?"contentType":"component",it=T=>{M({dynamicZoneTarget:T,targetUid:O})},H=async(T,mt,gt,ht,_t)=>{const ft=Ft(ht);_t?u({forTarget:T,targetUid:mt,attributeName:gt,attributeType:ft,customFieldUid:_t}):g({forTarget:T,targetUid:mt,attributeName:gt,attributeType:ft,step:ht==="component"?"2":null})};let R=D(s,[h,"schema","displayName"],"");const J=D(s,[h,"schema","kind"],""),X=j?.params.currentUID==="create-content-type";!R&&X&&(R=l({id:(0,d.g)("button.model.create"),defaultMessage:"Create new collection type"}));const wt=()=>{const T=J||h;T==="collectionType"&&m("willEditNameOfContentType"),T==="singleType"&&m("willEditNameOfSingleType"),r({modalType:h,forTarget:h,targetUid:O,kind:T})};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(Q.NL,{message:T=>T.hash==="#back"?!1:l({id:(0,d.g)("prompt.unsaved")}),when:K}),(0,t.jsx)(Et.T,{id:"title",primaryAction:i&&(0,t.jsxs)(_.k,{gap:2,children:[!X&&(0,t.jsx)(y.z,{startIcon:(0,t.jsx)(U.Z,{}),variant:"secondary",onClick:()=>{C({forTarget:Z,targetUid:O})},children:l({id:(0,d.g)("button.attributes.add.another"),defaultMessage:"Add another field"})}),(0,t.jsx)(y.z,{startIcon:(0,t.jsx)(jt.Z,{}),onClick:()=>p(),type:"submit",disabled:rt(s,e),children:l({id:"global.save",defaultMessage:"Save"})})]}),secondaryAction:i&&!I&&!X&&(0,t.jsx)(y.z,{startIcon:(0,t.jsx)(at.Z,{}),variant:"tertiary",onClick:wt,children:l({id:"app.utils.edit",defaultMessage:"Edit"})}),title:lt(R),subtitle:l({id:(0,d.g)("listView.headerLayout.description"),defaultMessage:"Build the data architecture of your content"}),navigationAction:(0,t.jsx)(c.Link,{startIcon:(0,t.jsx)(Pt.Z,{}),to:"/plugins/content-type-builder/",children:l({id:"global.back",defaultMessage:"Back"})})}),(0,t.jsx)(yt.D,{children:(0,t.jsxs)(_.k,{direction:"column",alignItems:"stretch",gap:4,children:[(0,t.jsx)(_.k,{justifyContent:"flex-end",children:(0,t.jsx)(_.k,{gap:2,children:(0,t.jsx)(Nt,{targetUid:O,isTemporary:b,isInContentTypeView:a,contentTypeKind:P,disabled:X},"link-to-cm-settings-view")})}),(0,t.jsx)(f.x,{background:"neutral0",shadow:"filterShadow",hasRadius:!0,children:(0,t.jsx)(V,{items:v,customRowComponent:T=>(0,t.jsx)(kt,{...T,onClick:H}),addComponentToDZ:it,targetUid:O,editTarget:Z,isMain:!0})})]})})]})}}}]);
