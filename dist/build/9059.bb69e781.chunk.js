(self.webpackChunkem_guide_app=self.webpackChunkem_guide_app||[]).push([[9059],{10806:W=>{function K(c,o,g,A){for(var f=-1,R=c==null?0:c.length;++f<R;){var y=c[f];o(A,y,g(y),c)}return A}W.exports=K},24011:(W,K,c)=>{var o=c(87685);function g(A,f,R,y){return o(A,function(S,D,B){f(y,S,R(S),B)}),y}W.exports=g},81947:(W,K,c)=>{var o=c(10806),g=c(24011),A=c(52536),f=c(28768);function R(y,S){return function(D,B){var H=f(D)?o:g,se=S?S():{};return H(D,y,A(B,2),se)}}W.exports=R},80549:(W,K,c)=>{var o=c(41342),g=1/0;function A(f){var R=f==null?0:f.length;return R?o(f,g):[]}W.exports=A},80649:(W,K,c)=>{var o=c(8038),g=c(81947),A=Object.prototype,f=A.hasOwnProperty,R=g(function(y,S,D){f.call(y,D)?y[D].push(S):o(y,D,[S])});W.exports=R},69059:(W,K,c)=>{"use strict";c.d(K,{P:()=>Pt,a:()=>Dt,u:()=>vt});var o=c(56940),g=c(75937),A=c(58400),f=c(66041),R=c(74065),y=c(65094),S=c(41301),D=c(9144),B=c(91496),H=c(96820),se=c(90019),q=c(5964),z=c(5483),me=c(78054),he=c(11674),fe=c(72082),gs=c(47479),ms=c(53295),hs=c(70821),Ie=c(54134),te=c(24059),de=c(30956),ce=c(37444),ne=c(49079),r=c(14025),U=c(48288),fs=c(26420),Cs=c(53604),_=c(19681),ys=c(39416),xs=c(70754),_s=c(68431),bs=c(29224),T=c(333),Be=c(71999),js=c(2777),Os=c(67463),ke=c(74419),Ce=c(80649),oe=c(28829),Es=c(80549),Z=c(95721),Rs=c(5337),N=c(21709),ye=c(78712),We=c(40829);const[Ms,Ts]=(0,fs.k)("PermissionsDataManager"),Q=()=>Ts("usePermissionsDataManager"),As=_.default.div`
  position: relative;

  ${({hasConditions:e,disabled:s,theme:n})=>e&&`
    &:before {
      content: '';
      position: absolute;
      top: -3px;
      left: -10px;
      width: 6px;
      height: 6px;
      border-radius: ${20/16}rem;;
      background: ${s?n.colors.neutral100:n.colors.primary600};
    }
  `}
`,xe=({onClick:e,className:s,hasConditions:n,variant:t})=>{const{formatMessage:i}=(0,U.Z)();return(0,o.jsx)(As,{hasConditions:n,className:s,children:(0,o.jsx)(A.z,{variant:t,startIcon:(0,o.jsx)(ys.Z,{}),onClick:e,children:i({id:"global.settings",defaultMessage:"Settings"})})})};xe.defaultProps={className:null,hasConditions:!1,variant:"tertiary"},xe.propTypes={onClick:r.func.isRequired,className:r.string,hasConditions:r.bool,variant:r.string};const ue=(0,_.default)(xe)``,Ps=e=>Object.values(e).map(s=>Object.entries(s).filter(([,n])=>n).map(([n])=>n)).flat(),vs=e=>e.reduce((s,[n,t])=>(s.push({label:oe(n),children:t.map(i=>({label:i.displayName,value:i.id}))}),s),[]),Ds=(e,s)=>e.map(([,n])=>n).flat().reduce((n,t)=>({[t.id]:s.includes(t.id),...n}),{}),Ke=({arrayOfOptionsGroupedByCategory:e,isFormDisabled:s,isGrey:n,label:t,name:i,onChange:a,value:l})=>{const{formatMessage:d}=(0,U.Z)(),p=u=>{a(i,Ds(e,u))};return(0,o.jsxs)(f.k,{as:"li",background:n?"neutral100":"neutral0",paddingBottom:3,paddingTop:3,children:[(0,o.jsxs)(f.k,{paddingLeft:6,style:{width:180},children:[(0,o.jsxs)(R.Z,{variant:"sigma",textColor:"neutral600",children:[d({id:"Settings.permissions.conditions.can",defaultMessage:"Can"}),"\xA0"]}),(0,o.jsx)(R.Z,{variant:"sigma",title:t,textColor:"primary600",ellipsis:!0,children:d({id:`Settings.roles.form.permissions.${t.toLowerCase()}`,defaultMessage:t})}),(0,o.jsxs)(R.Z,{variant:"sigma",textColor:"neutral600",children:["\xA0",d({id:"Settings.permissions.conditions.when",defaultMessage:"When"})]})]}),(0,o.jsx)(y.x,{style:{maxWidth:430,width:"100%"},children:(0,o.jsx)(S.Q,{id:i,customizeContent:u=>`${u.length} currently selected`,onChange:p,value:Ps(l),options:vs(e),disabled:s})})]})};Ke.propTypes={arrayOfOptionsGroupedByCategory:r.array.isRequired,isFormDisabled:r.bool.isRequired,isGrey:r.bool.isRequired,label:r.string.isRequired,name:r.string.isRequired,value:r.object.isRequired,onChange:r.func.isRequired};const $s=(e,s)=>e.reduce((n,t)=>(n[t.id]=T(s,t.id,!1),n),{}),Ss=(e,s)=>e.reduce((n,t)=>{const[i,a]=t,l=$s(a,s);return n[i]=l,n},{}),Ls=(e,s,n)=>e.reduce((t,i)=>{const a=T(s,[...i.pathToConditionsObject,"conditions"],{}),l=Ss(n,a);return t[i.pathToConditionsObject.join("..")]=l,t},{}),_e=({actions:e,headerBreadCrumbs:s,isFormDisabled:n,onClosed:t,onToggle:i})=>{const{formatMessage:a}=(0,U.Z)(),{availableConditions:l,modifiedData:d,onChangeConditions:p}=Q(),u=(0,g.useMemo)(()=>Object.entries(Ce(l,"category")),[l]),m=e.filter(({isDisplayed:h,hasSomeActionsSelected:E,hasAllActionsSelected:j})=>h&&(E||j)),C=(0,g.useMemo)(()=>Ls(m,d,u),[m,d,u]),[b,P]=(0,g.useState)(C),O=(h,E)=>{P((0,ke.default)(j=>{j[h]||(j[h]={}),j[h].default||(j[h].default={}),j[h].default=E}))},x=()=>{const h=Object.entries(b).reduce((E,j)=>{const[M,I]=j,$=Object.values(I).reduce((L,v)=>({...L,...v}),{});return E[M]=$,E},{});p(h),i()};return(0,o.jsxs)(D.P,{labelledBy:"condition-modal-breadcrumbs",onClose:t,children:[(0,o.jsx)(B.x,{children:(0,o.jsx)(js.O,{id:"condition-modal-breadcrumbs",label:s.join(", "),children:s.map((h,E,j)=>(0,o.jsx)(Os.$,{isCurrent:E===j.length-1,children:oe(a({id:h,defaultMessage:h}))},h))})}),(0,o.jsxs)(H.f,{children:[m.length===0&&(0,o.jsx)(R.Z,{children:a({id:"Settings.permissions.conditions.no-actions",defaultMessage:"You first need to select actions (create, read, update, ...) before defining conditions on them."})}),(0,o.jsx)("ul",{children:m.map(({actionId:h,label:E,pathToConditionsObject:j},M)=>{const I=j.join("..");return(0,o.jsx)(Ke,{arrayOfOptionsGroupedByCategory:u,label:E,isFormDisabled:n,isGrey:M%2===0,name:I,onChange:O,value:T(b,I,{})},h)})})]}),(0,o.jsx)(se.m,{startActions:(0,o.jsx)(A.z,{variant:"tertiary",onClick:i,children:a({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),endActions:(0,o.jsx)(A.z,{onClick:x,children:a({id:"Settings.permissions.conditions.apply",defaultMessage:"Apply"})})})]})};_e.propTypes={actions:r.arrayOf(r.shape({actionId:r.string.isRequired,checkboxName:r.string,hasSomeActionsSelected:r.bool.isRequired,hasAllActionsSelected:r.bool,isDisplayed:r.bool.isRequired,label:r.string})).isRequired,headerBreadCrumbs:r.arrayOf(r.string).isRequired,isFormDisabled:r.bool.isRequired,onClosed:r.func.isRequired,onToggle:r.func.isRequired};const J=`${120/16}rem`,be=`${200/16}rem`,pe=`${53/16}rem`,je=_.default.div`
  width: ${J};
`,Ue=(0,_.default)(f.k)`
  padding-right: ${({theme:e})=>e.spaces[2]};
  overflow: hidden;
  flex: 1;
  ${({isCollapsable:e})=>e&&"cursor: pointer;"}
`,Oe=({children:e,isCollapsable:s,isActive:n,isFormDisabled:t,label:i,onChange:a,onClick:l,checkboxName:d,someChecked:p,value:u})=>{const{formatMessage:m}=(0,U.Z)();return(0,o.jsxs)(f.k,{alignItems:"center",paddingLeft:6,style:{width:be,flexShrink:0},children:[(0,o.jsx)(y.x,{paddingRight:2,children:(0,o.jsx)(q.C,{name:d,"aria-label":m({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:i}),disabled:t,onValueChange:C=>a({target:{name:d,value:C}}),indeterminate:p,value:u})}),(0,o.jsxs)(Ue,{title:i,alignItems:"center",isCollapsable:s,...s&&{onClick:l,"aria-expanded":n,onKeyDown:({key:C})=>(C==="Enter"||C===" ")&&l(),tabIndex:0,role:"button"},children:[(0,o.jsx)(R.Z,{fontWeight:n?"bold":"",textColor:n?"primary600":"neutral800",ellipsis:!0,children:oe(i)}),e]})]})};Oe.defaultProps={children:null,checkboxName:"",onChange(){},value:!1,someChecked:!1,isCollapsable:!1},Oe.propTypes={checkboxName:r.string,children:r.node,label:r.string.isRequired,isCollapsable:r.bool,isFormDisabled:r.bool.isRequired,onChange:r.func,onClick:r.func.isRequired,someChecked:r.bool,value:r.bool,isActive:r.bool.isRequired};const Ne=(0,g.memo)(Oe),w=e=>Z(e)?Es(Object.values(e).map(s=>Z(s)?w(s):s)):[],Ee=e=>e?Object.keys(e).reduce((s,n)=>(n!=="conditions"&&(s[n]=e[n]),s),{}):null,G=e=>{const s=Ee(e),n=w(s);if(!n.length)return{hasAllActionsSelected:!1,hasSomeActionsSelected:!1};const t=n.every(a=>a),i=n.some(a=>a)&&!t;return{hasAllActionsSelected:t,hasSomeActionsSelected:i}},ie=(0,_.default)(xs.Z)`
  display: none;
  width: ${10/16}rem;
  transform: rotate(${({$isActive:e})=>e?"180":"0"}deg);
  margin-left: ${({theme:e})=>e.spaces[2]};
`,re=e=>`
  ${R.Z} {
    color: ${e.colors.primary600};
    font-weight: ${e.fontWeights.bold}
  }
  ${ie} {
    display: block;
    path {
      fill: ${e.colors.primary600}
    };
  }
`,Is=(e,s,n)=>e.map(({actionId:t,isDisplayed:i,applyToProperties:a,label:l})=>{if(!i)return{actionId:t,hasSomeActionsSelected:!1,isDisplayed:i};const d=[...n.split(".."),t],p=ne(a)?[...d,"properties","enabled"]:d,u=p.join(".."),m=T(s,[...d,"conditions"],null),C=w(m).some(x=>x);if(ne(a)){const x=T(s,p,!1);return{actionId:t,checkboxName:u,hasAllActionsSelected:x,hasConditions:C,hasSomeActionsSelected:x,isDisplayed:i,isParentCheckbox:!1,label:l,pathToConditionsObject:d}}const b=T(s,p,null),{hasAllActionsSelected:P,hasSomeActionsSelected:O}=G(b);return{actionId:t,checkboxName:u,hasAllActionsSelected:P,hasConditions:C,hasSomeActionsSelected:O,isDisplayed:i,isParentCheckbox:!0,label:l,pathToConditionsObject:d}}),Re=(e,s)=>`
  ${Fe} {
    background-color: ${e.colors.primary100};
    color: ${e.colors.primary600};
    border-radius: ${s?"2px 2px 0 0":"2px"};
  }
  ${Ve} {
    display: flex;
  }
  ${ue} {
    display: block;
  }
  &:hover {
   ${re(e)}
  }

  &:focus-within {
    ${({theme:n,isActive:t})=>Re(n,t)}
  }
  
`,Fe=_.default.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: ${pe};
  background-color: ${({isGrey:e,theme:s})=>e?s.colors.neutral100:s.colors.neutral0};
  border: 1px solid transparent;
`,Bs=_.default.div`
  display: inline-flex;
  min-width: 100%;

  ${ue} {
    display: none;
  }
  ${({isActive:e,theme:s})=>e&&Re(s,e)}
  &:hover {
    ${({theme:e,isActive:s})=>Re(e,s)}
  }
`,qe=(0,_.default)(f.k)`
  width: ${J};
  position: relative;
`,Ve=(0,_.default)(y.x)`
  display: none;
  svg {
    width: 11px;
  }
  * {
    fill: ${({theme:e})=>e.colors.primary600};
  }
`,Ze=_.default.span`
  position: absolute;
  top: -6px;
  left: 37px;
  width: 6px;
  height: 6px;
  border-radius: 20px;
  background: ${({theme:e})=>e.colors.primary600};
`,ks=(0,_.default)(y.x)`
  position: absolute;
  right: 9px;
  transform: translateY(10px);
`,He=({availableActions:e,isActive:s,isGrey:n,isFormDisabled:t,label:i,onClickToggle:a,pathToData:l})=>{const[d,p]=(0,g.useState)(!1),{formatMessage:u}=(0,U.Z)(),{modifiedData:m,onChangeParentCheckbox:C,onChangeSimpleCheckbox:b}=Q(),P=()=>{p($=>!$)},O=()=>{p(!1)},x=T(m,l.split(".."),{}),h=(0,g.useMemo)(()=>Object.keys(x).reduce(($,L)=>($[L]=Be(x[L],"conditions"),$),{}),[x]),{hasAllActionsSelected:E,hasSomeActionsSelected:j}=G(h),M=(0,g.useMemo)(()=>Is(e,m,l),[e,m,l]),I=M.some(({hasConditions:$})=>$);return(0,o.jsxs)(Bs,{isActive:s,children:[(0,o.jsxs)(Fe,{isGrey:n,children:[(0,o.jsx)(Ne,{isCollapsable:!0,isFormDisabled:t,label:i,checkboxName:l,onChange:C,onClick:a,someChecked:j,value:E,isActive:s,children:(0,o.jsx)(Ve,{paddingLeft:2,children:s?(0,o.jsx)(_s.Z,{}):(0,o.jsx)(bs.Z,{})})}),(0,o.jsx)(f.k,{style:{flex:1},children:M.map(({actionId:$,hasConditions:L,hasAllActionsSelected:v,hasSomeActionsSelected:F,isDisplayed:ee,isParentCheckbox:k,checkboxName:V,label:le})=>ee?k?(0,o.jsxs)(qe,{justifyContent:"center",alignItems:"center",children:[L&&(0,o.jsx)(Ze,{}),(0,o.jsx)(q.C,{disabled:t,name:V,"aria-label":u({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${le} ${i}`}),onValueChange:X=>{C({target:{name:V,value:X}})},indeterminate:F,value:v})]},$):(0,o.jsxs)(qe,{justifyContent:"center",alignItems:"center",children:[L&&(0,o.jsx)(Ze,{}),(0,o.jsx)(q.C,{disabled:t,indeterminate:L,name:V,onValueChange:X=>{b({target:{name:V,value:X}})},value:v})]},$):(0,o.jsx)(je,{},$))}),d&&(0,o.jsx)(_e,{headerBreadCrumbs:[i,"Settings.permissions.conditions.conditions"],actions:M,isFormDisabled:t,onClosed:O,onToggle:P})]}),(0,o.jsx)(ks,{children:(0,o.jsx)(ue,{onClick:P,hasConditions:I})})]})};He.propTypes={availableActions:r.array.isRequired,isActive:r.bool.isRequired,isGrey:r.bool.isRequired,isFormDisabled:r.bool.isRequired,label:r.string.isRequired,onClickToggle:r.func.isRequired,pathToData:r.string.isRequired};const Ws=_.default.span`
  color: ${({theme:e})=>e.colors.danger700};
  padding-left: ${({theme:e})=>e.spaces[1]}px;
`,we=()=>(0,o.jsx)(Ws,{children:"*"}),Ks=(e,s)=>e.map(n=>{const t=Array.isArray(n.subjects)&&n.subjects.indexOf(s)!==-1;return{...n,isDisplayed:t}}),Us=(0,_.default)(y.x)`
  transform: translate(-4px, -12px);

  &:before {
    content: '';
    width: ${4/16}rem;
    height: ${12/16}rem;
    background: ${({theme:e})=>e.colors.primary200};
    display: block;
  }
`,Ns=_.default.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:e,color:s})=>e.colors[s]};
  }
`,Me=e=>(0,o.jsx)(Us,{children:(0,o.jsx)(Ns,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z",fill:"#D9D8FF"})})});Me.defaultProps={fill:"primary200"},Me.propTypes={fill:r.string};const Fs=(0,g.memo)(Me),Ge=(0,_.default)(f.k)`
  width: ${J};
  position: relative;
`,qs=(0,_.default)(f.k)`
  height: ${pe};
`,Vs=(0,_.default)(y.x)`
  padding-left: ${31/16}rem;
`,Zs=(0,_.default)(y.x)`
  border-left: ${({isVisible:e,theme:s})=>e?`4px solid ${s.colors.primary200}`:"4px solid transparent"};
`,Hs=(0,_.default)(f.k)`
  padding-left: ${({theme:e})=>e.spaces[4]};
  width: ${({level:e})=>145-e*36}px;

  ${({isCollapsable:e,theme:s})=>e&&`
      ${ie} {
        display: block;
        color: ${s.colors.neutral100};
      }
      &:hover {
        ${re(s)}
      }
  `}
  ${({isActive:e,theme:s})=>e&&re(s)};
`,ws=_.default.div`
  padding-top: ${({theme:e})=>e.spaces[2]};
  margin-top: ${({theme:e})=>e.spaces[2]};
  width: ${4/16}rem;
  background-color: ${({theme:e})=>e.colors.primary200};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`,Te=({childrenForm:e,isFormDisabled:s,recursiveLevel:n,pathToDataFromActionRow:t,propertyActions:i,parentName:a,propertyName:l})=>{const{formatMessage:d}=(0,U.Z)(),{modifiedData:p,onChangeParentCheckbox:u,onChangeSimpleCheckbox:m}=Q(),[C,b]=(0,g.useState)(null),P=x=>{b(h=>h===x?null:x)},O=(0,g.useMemo)(()=>C?e.find(({value:x})=>x===C):null,[C,e]);return(0,o.jsxs)(Vs,{children:[(0,o.jsx)(ws,{}),e.map(({label:x,value:h,required:E,children:j},M)=>{const I=M+1<e.length,$=Array.isArray(j),L=C===h;return(0,o.jsxs)(Zs,{isVisible:I,children:[(0,o.jsxs)(qs,{children:[(0,o.jsx)(Fs,{color:"primary200"}),(0,o.jsxs)(f.k,{style:{flex:1},children:[(0,o.jsx)(Hs,{level:n,isActive:L,isCollapsable:$,children:(0,o.jsxs)(Ue,{alignItems:"center",isCollapsable:$,...$&&{onClick:()=>P(h),"aria-expanded":L,onKeyDown:({key:v})=>(v==="Enter"||v===" ")&&P(h),tabIndex:0,role:"button"},title:x,children:[(0,o.jsx)(R.Z,{ellipsis:!0,children:oe(x)}),E&&(0,o.jsx)(we,{}),(0,o.jsx)(ie,{$isActive:L})]})}),(0,o.jsx)(f.k,{style:{flex:1},children:i.map(({actionId:v,label:F,isActionRelatedToCurrentProperty:ee})=>{if(!ee)return(0,o.jsx)(je,{},v);const k=[...t.split(".."),v,"properties",l,...a.split(".."),h],V=T(p,k,!1);if(!j)return(0,o.jsx)(Ge,{justifyContent:"center",alignItems:"center",children:(0,o.jsx)(q.C,{disabled:s,name:k.join(".."),"aria-label":d({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${a} ${x} ${F}`}),onValueChange:Y=>{m({target:{name:k.join(".."),value:Y}})},value:V})},F);const{hasAllActionsSelected:le,hasSomeActionsSelected:X}=G(V);return(0,o.jsx)(Ge,{justifyContent:"center",alignItems:"center",children:(0,o.jsx)(q.C,{disabled:s,name:k.join(".."),"aria-label":d({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${a} ${x} ${F}`}),onValueChange:Y=>{u({target:{name:k.join(".."),value:Y}})},value:le,indeterminate:X},F)},F)})})]})]}),O&&L&&(0,o.jsx)(y.x,{paddingBottom:2,children:(0,o.jsx)(Te,{isFormDisabled:s,parentName:`${a}..${h}`,pathToDataFromActionRow:t,propertyActions:i,propertyName:l,recursiveLevel:n+1,childrenForm:O.children})})]},h)})]})};Te.propTypes={childrenForm:r.array.isRequired,isFormDisabled:r.bool.isRequired,parentName:r.string.isRequired,pathToDataFromActionRow:r.string.isRequired,propertyActions:r.array.isRequired,propertyName:r.string.isRequired,recursiveLevel:r.number.isRequired};const Gs=(0,g.memo)(Te),Xs=e=>e.reduce((n,t)=>(t.isActionRelatedToCurrentProperty&&n.push(t.actionId),n),[]),Ys=(e,s,n,t,i)=>{const l=Xs(e).reduce((d,p)=>{const u=[...n.split(".."),p,"properties",t,i],m=T(s,u,!1);return d[p]=m,d},{});return G(l)},Xe=(0,_.default)(f.k)`
  width: ${J};
  position: relative;
`,zs=(0,_.default)(f.k)`
  height: ${pe};
  flex: 1;

  ${({isCollapsable:e,theme:s})=>e&&`
      ${ie} {
        display: block;
        color: ${s.colors.neutral100};
      }
      &:hover {
        ${re(s)}
      }
  `}
  ${({isActive:e,theme:s})=>e&&re(s)};
`,Ae=({childrenForm:e,label:s,isFormDisabled:n,name:t,required:i,pathToData:a,propertyActions:l,propertyName:d,isOdd:p})=>{const{formatMessage:u}=(0,U.Z)(),[m,C]=(0,g.useState)(null),{modifiedData:b,onChangeCollectionTypeLeftActionRowCheckbox:P,onChangeParentCheckbox:O,onChangeSimpleCheckbox:x}=Q(),h=m===t,E=(0,g.useMemo)(()=>Array.isArray(e)?e:[],[e]),j=E.length>0,M=(0,g.useCallback)(()=>{j&&C(v=>v===t?null:t)},[j,t]),I=({target:{value:v}})=>{P(a,d,t,v)},{hasAllActionsSelected:$,hasSomeActionsSelected:L}=(0,g.useMemo)(()=>Ys(l,b,a,d,t),[l,b,a,d,t]);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(zs,{alignItems:"center",isCollapsable:j,isActive:h,background:p?"neutral100":"neutral0",children:(0,o.jsxs)(f.k,{children:[(0,o.jsxs)(Ne,{onChange:I,onClick:M,isCollapsable:j,isFormDisabled:n,label:s,someChecked:L,value:$,isActive:h,children:[i&&(0,o.jsx)(we,{}),(0,o.jsx)(ie,{$isActive:h})]}),(0,o.jsx)(f.k,{children:l.map(({label:v,isActionRelatedToCurrentProperty:F,actionId:ee})=>{if(!F)return(0,o.jsx)(je,{},v);const k=[...a.split(".."),ee,"properties",d,t];if(!j){const Y=T(b,k,!1);return(0,o.jsx)(Xe,{justifyContent:"center",alignItems:"center",children:(0,o.jsx)(q.C,{disabled:n,name:k.join(".."),"aria-label":u({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${t} ${v}`}),onValueChange:$t=>{x({target:{name:k.join(".."),value:$t}})},value:Y})},ee)}const V=T(b,k,{}),{hasAllActionsSelected:le,hasSomeActionsSelected:X}=G(V);return(0,o.jsx)(Xe,{justifyContent:"center",alignItems:"center",children:(0,o.jsx)(q.C,{disabled:n,name:k.join(".."),onValueChange:Y=>{O({target:{name:k.join(".."),value:Y}})},"aria-label":u({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${t} ${v}`}),value:le,indeterminate:X})},v)})})]})}),h&&(0,o.jsx)(Gs,{childrenForm:E,isFormDisabled:n,parentName:t,pathToDataFromActionRow:a,propertyName:d,propertyActions:l,recursiveLevel:0})]})};Ae.defaultProps={childrenForm:[],required:!1},Ae.propTypes={childrenForm:r.array,label:r.string.isRequired,isFormDisabled:r.bool.isRequired,name:r.string.isRequired,pathToData:r.string.isRequired,propertyActions:r.array.isRequired,propertyName:r.string.isRequired,required:r.bool,isOdd:r.bool.isRequired};const Qs=(0,g.memo)(Ae),Ye=(0,_.default)(f.k)`
  width: ${J};
  flex-shrink: 0;
`,Js=(0,_.default)(f.k)`
  width: ${be};
  height: ${pe};
  flex-shrink: 0;
`,ze=({headers:e,label:s})=>{const{formatMessage:n}=(0,U.Z)(),t=n({id:"Settings.roles.form.permission.property-label",defaultMessage:"{label} permissions"},{label:s});return(0,o.jsxs)(f.k,{children:[(0,o.jsx)(Js,{alignItems:"center",paddingLeft:6,children:(0,o.jsx)(R.Z,{variant:"sigma",textColor:"neutral500",children:t})}),e.map(i=>i.isActionRelatedToCurrentProperty?(0,o.jsx)(Ye,{justifyContent:"center",children:(0,o.jsx)(R.Z,{variant:"sigma",textColor:"neutral500",children:n({id:`Settings.roles.form.permissions.${i.label.toLowerCase()}`,defaultMessage:i.label})})},i.label):(0,o.jsx)(Ye,{},i.label))]})};ze.propTypes={headers:r.arrayOf(r.shape({label:r.string.isRequired,isActionRelatedToCurrentProperty:r.bool.isRequired})).isRequired,label:r.string.isRequired};const et=(e,s)=>e.map(n=>{const t=Array.isArray(n.applyToProperties)&&n.applyToProperties.indexOf(s)!==-1&&n.isDisplayed;return{label:n.label,actionId:n.actionId,isActionRelatedToCurrentProperty:t}}),st=_.default.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
`,Qe=({availableActions:e,childrenForm:s,isFormDisabled:n,label:t,pathToData:i,propertyName:a})=>{const l=(0,g.useMemo)(()=>et(e,a),[e,a]);return(0,o.jsxs)(st,{children:[(0,o.jsx)(ze,{label:t,headers:l}),(0,o.jsx)(y.x,{children:s.map(({children:d,label:p,value:u,required:m},C)=>(0,o.jsx)(Qs,{childrenForm:d,label:p,isFormDisabled:n,name:u,required:m,propertyActions:l,pathToData:i,propertyName:a,isOdd:C%2===0},u))})]})};Qe.propTypes={childrenForm:r.array.isRequired,availableActions:r.array.isRequired,isFormDisabled:r.bool.isRequired,label:r.string.isRequired,pathToData:r.string.isRequired,propertyName:r.string.isRequired};const tt=_.default.div`
  flex-direction: column;
  display: inline-flex;
  min-width: 100%;
  ${({theme:e,isActive:s})=>s&&`border: 1px solid ${e.colors.primary600};`}
`,Je=({allActions:e,contentTypeName:s,label:n,index:t,isActive:i,isFormDisabled:a,onClickToggleCollapse:l,pathToData:d,properties:p})=>{const u=(0,g.useCallback)(()=>{l(s)},[s,l]),m=(0,g.useMemo)(()=>Ks(e,s),[e,s]);return(0,o.jsxs)(tt,{isActive:i,children:[(0,o.jsx)(He,{availableActions:m,isActive:i,isGrey:t%2===0,isFormDisabled:a,label:n,onClickToggle:u,pathToData:d}),i&&p.map(({label:C,value:b,children:P})=>(0,o.jsx)(Qe,{availableActions:m,childrenForm:P,isFormDisabled:a,label:C,pathToData:d,propertyName:b},b))]})};Je.propTypes={allActions:r.array.isRequired,contentTypeName:r.string.isRequired,index:r.number.isRequired,isActive:r.bool.isRequired,isFormDisabled:r.bool.isRequired,label:r.string.isRequired,onClickToggleCollapse:r.func.isRequired,pathToData:r.string.isRequired,properties:r.array.isRequired};const Pe=({actions:e,isFormDisabled:s,pathToData:n,subjects:t})=>{const[i,a]=(0,g.useState)(null),l=d=>{a(i===d?null:d)};return t.map(({uid:d,label:p,properties:u},m)=>(0,o.jsx)(Je,{allActions:e,contentTypeName:d,label:p,isActive:i===d,isFormDisabled:s,index:m,onClickToggleCollapse:l,pathToData:`${n}..${d}`,properties:u},d))};Pe.defaultProps={actions:[],subjects:[]},Pe.propTypes={actions:r.array.isRequired,isFormDisabled:r.bool.isRequired,pathToData:r.string.isRequired,subjects:r.arrayOf(r.shape({uid:r.string.isRequired,label:r.string.isRequired,properties:r.array.isRequired}))};const nt=(0,g.memo)(Pe),ot=e=>e.filter(({subjects:s})=>s&&s.length),it=e=>e.map(({actionId:s})=>s),rt=(e,s)=>e.reduce((n,t)=>(Object.keys(s).forEach(i=>{const a=T(s,[i,t],{}),l={[i]:Ee(a)};n[t]?n[t]={...n[t],...l}:n[t]=l}),n),{}),at=(e,s)=>{const n=it(e),t=rt(n,s);return Object.keys(t).reduce((a,l)=>(a[l]=G(t[l]),a),{})},lt=(0,_.default)(f.k)`
  width: ${J};
  flex-shrink: 0;
`,ve=({actions:e,isFormDisabled:s,kind:n})=>{const{formatMessage:t}=(0,U.Z)(),{modifiedData:i,onChangeCollectionTypeGlobalActionCheckbox:a}=Q(),l=(0,g.useMemo)(()=>ot(e),[e]),d=(0,g.useMemo)(()=>at(l,i[n]),[i,l,n]);return(0,o.jsx)(y.x,{paddingBottom:4,paddingTop:6,style:{paddingLeft:be},children:(0,o.jsx)(f.k,{gap:0,children:l.map(({label:p,actionId:u})=>(0,o.jsxs)(lt,{direction:"column",alignItems:"center",justifyContent:"center",gap:3,children:[(0,o.jsx)(R.Z,{variant:"sigma",textColor:"neutral500",children:t({id:`Settings.roles.form.permissions.${p.toLowerCase()}`,defaultMessage:p})}),(0,o.jsx)(q.C,{disabled:s,onValueChange:m=>{a(n,u,m)},name:u,"aria-label":t({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:t({id:`Settings.roles.form.permissions.${p.toLowerCase()}`,defaultMessage:p})}),value:T(d,[u,"hasAllActionsSelected"],!1),indeterminate:T(d,[u,"hasSomeActionsSelected"],!1)})]},u))})})};ve.defaultProps={actions:[]},ve.propTypes={actions:r.arrayOf(r.shape({label:r.string.isRequired,actionId:r.string.isRequired,subjects:r.array.isRequired})),isFormDisabled:r.bool.isRequired,kind:r.string.isRequired};const dt=(0,g.memo)(ve),ct=(0,_.default)(y.x)`
  overflow-x: auto;
`,es=({isFormDisabled:e,kind:s,layout:{actions:n,subjects:t}})=>{const i=Cs([...t],"label");return(0,o.jsxs)(ct,{background:"neutral0",children:[(0,o.jsx)(dt,{actions:n,kind:s,isFormDisabled:e}),(0,o.jsx)(nt,{actions:n,isFormDisabled:e,pathToData:s,subjects:i})]})};es.propTypes={isFormDisabled:r.bool.isRequired,kind:r.string.isRequired,layout:r.shape({actions:r.array,subjects:r.arrayOf(r.shape({uid:r.string.isRequired,label:r.string.isRequired,properties:r.array.isRequired}))}).isRequired};const ss=(0,g.memo)(es),ut=(e,s,n)=>e.map(t=>{const i=[...n,t.action,"properties","enabled"],a=T(s,i,!1),l=T(s,[...n,t.action,"conditions"],{}),d=w(l).some(p=>p);return{...t,isDisplayed:a,checkboxName:i.join(".."),hasSomeActionsSelected:a,value:a,hasConditions:d,label:t.displayName,actionId:t.action,pathToConditionsObject:[...n,t.action]}}),pt=e=>{const s=Object.entries(e).reduce((t,i)=>{const[a,{conditions:l}]=i;return t[a]=l,t},{});return w(s).some(t=>t)},gt=_.default.div`
  flex: 1;
  align-self: center;
  border-top: 1px solid ${({theme:e})=>e.colors.neutral150};
`,mt=_.default.div`
  position: relative;
  word-break: keep-all;
  ${({hasConditions:e,disabled:s,theme:n})=>e&&`
    &:before {
      content: '';
      position: absolute;
      top: ${-4/16}rem;
      left: ${-8/16}rem;
      width: ${6/16}rem;
      height: ${6/16}rem;
      border-radius: ${20/16}rem;
      background: ${s?n.colors.neutral100:n.colors.primary600};
    }
  `}
`,ts=({categoryName:e,isFormDisabled:s,subCategoryName:n,actions:t,pathToData:i})=>{const[a,l]=(0,g.useState)(!1),{modifiedData:d,onChangeParentCheckbox:p,onChangeSimpleCheckbox:u}=Q(),{formatMessage:m}=(0,U.Z)(),C=T(d,i,{}),b=(0,g.useMemo)(()=>Object.keys(C).reduce((M,I)=>(M[I]=Ee(C[I]),M),{}),[C]),{hasAllActionsSelected:P,hasSomeActionsSelected:O}=G(b),x=()=>{l(M=>!M)},h=()=>{l(!1)},E=ut(t,d,i),j=pt(T(d,[...i],{}));return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(y.x,{children:[(0,o.jsxs)(f.k,{justifyContent:"space-between",alignItems:"center",children:[(0,o.jsx)(y.x,{paddingRight:4,children:(0,o.jsx)(R.Z,{variant:"sigma",textColor:"neutral600",children:n})}),(0,o.jsx)(gt,{}),(0,o.jsx)(y.x,{paddingLeft:4,children:(0,o.jsx)(z.X,{name:i.join(".."),disabled:s,onValueChange:M=>{p({target:{name:i.join(".."),value:M}})},indeterminate:O,value:P,children:m({id:"app.utils.select-all",defaultMessage:"Select all"})})})]}),(0,o.jsxs)(f.k,{paddingTop:6,paddingBottom:6,children:[(0,o.jsx)(me.r,{gap:2,style:{flex:1},children:E.map(({checkboxName:M,value:I,action:$,displayName:L,hasConditions:v})=>(0,o.jsx)(he.P,{col:3,children:(0,o.jsx)(mt,{disabled:s,hasConditions:v,children:(0,o.jsx)(z.X,{name:M,disabled:s,onValueChange:F=>{u({target:{name:M,value:F}})},value:I,children:L})})},$))}),(0,o.jsx)(ue,{hasConditions:j,onClick:x})]})]}),a&&(0,o.jsx)(_e,{headerBreadCrumbs:[e,n],actions:E,isFormDisabled:s,onClosed:h,onToggle:x})]})};ts.propTypes={actions:r.array.isRequired,categoryName:r.string.isRequired,isFormDisabled:r.bool.isRequired,subCategoryName:r.string.isRequired,pathToData:r.array.isRequired};const De=({childrenForm:e,kind:s,name:n,isOpen:t,isFormDisabled:i,isWhite:a,onOpenCategory:l,pathToData:d})=>{const{formatMessage:p}=(0,U.Z)(),u=()=>{l(n)},m=(0,g.useMemo)(()=>n.split("::").pop(),[n]);return(0,o.jsxs)(fe.U,{expanded:t,onToggle:u,id:`accordion-${n}`,variant:a?"primary":"secondary",children:[(0,o.jsx)(gs.B,{title:oe(m),description:`${p({id:"Settings.permissions.category"},{category:m})} ${s==="plugins"?"plugin":s}`}),(0,o.jsx)(ms.v,{children:(0,o.jsx)(y.x,{padding:6,children:e.map(({actions:C,subCategoryName:b,subCategoryId:P})=>(0,o.jsx)(ts,{actions:C,categoryName:m,isFormDisabled:i,subCategoryName:b,pathToData:[...d,P]},b))})})]})};De.defaultProps={},De.propTypes={childrenForm:r.array.isRequired,isOpen:r.bool.isRequired,isFormDisabled:r.bool.isRequired,isWhite:r.bool.isRequired,kind:r.string.isRequired,name:r.string.isRequired,onOpenCategory:r.func.isRequired,pathToData:r.array.isRequired};const $e=({isFormDisabled:e,kind:s,layout:n})=>{const[t,i]=(0,g.useState)(null),a=l=>{i(l===t?null:l)};return(0,o.jsx)(y.x,{padding:6,background:"neutral0",children:n.map(({category:l,categoryId:d,childrenForm:p},u)=>(0,o.jsx)(De,{childrenForm:p,kind:s,isFormDisabled:e,isOpen:t===l,isWhite:u%2===1,name:l,onOpenCategory:a,pathToData:[s,d]},l))})};$e.propTypes={isFormDisabled:r.bool.isRequired,kind:r.string.isRequired,layout:r.arrayOf(r.shape({category:r.string.isRequired,categoryId:r.string.isRequired,childrenForm:r.arrayOf(r.shape({actions:r.array.isRequired})).isRequired}).isRequired).isRequired};const ns=(e,s,n)=>e.find(t=>t.action===s&&t.subject===n),os=(e,s=[])=>e.reduce((n,t)=>(n[t.id]=s.indexOf(t.id)!==-1,n),{}),is=({children:e},s,n="")=>e.reduce((t,i)=>{if(i.children)return{...t,[i.value]:is(i,s,`${n}${i.value}.`)};const a=s.indexOf(`${n}${i.value}`)!==-1;return t[i.value]=a,t},{}),ht=(e,s,n)=>e.reduce((t,i)=>{const a=s.properties.find(({value:l})=>l===i);if(a){const l=T(n,["properties",a.value],[]),d=is(a,l);t.properties[i]=d}return t},{properties:{}}),ft=(e,s)=>s.reduce((n,t)=>{const i=e.find(({uid:a})=>a===t)||null;return i&&(n[t]=i),n},{}),rs=({subjects:e},s,n,t=[])=>s.reduce((i,a)=>{const l=a.subjects,d=ft(e,l);if(ne(d))return i;const p=Object.keys(d).reduce((u,m)=>{const{actionId:C,applyToProperties:b}=a,x=d[m].properties.map(({value:M})=>M).every(M=>(b||[]).indexOf(M)===-1),h=ns(t,C,m),E=os(n,T(h,"conditions",[]));if(ne(b)||x)return N(u,[m,C],{properties:{enabled:h!==void 0},conditions:E}),u;const j=ht(b,d[m],h);return N(u,[m,C],{...j,conditions:E}),u},{});return Rs(i,p)},{}),Ct=(e,s,n)=>e.reduce((t,i)=>{const a=ns(n,i.action,null);return t[i.action]={properties:{enabled:a!==void 0},conditions:os(s,a?.conditions??[])},t},{}),yt=(e,s,n)=>e.reduce((t,i)=>(t[i.subCategoryId]=Ct(i.actions,s,n),t),{}),as=(e,s,n=[])=>e.reduce((t,{categoryId:i,childrenForm:a})=>{const l=yt(a,s,n);return t[i]=l,t},{}),ls=e=>e.split(" ").join("-"),ds=(e,s)=>Object.entries(Ce(e,s)).map(([n,t])=>({category:n,categoryId:ls(n),childrenForm:Object.entries(Ce(t,"subCategory")).map(([i,a])=>({subCategoryName:i,subCategoryId:ls(i),actions:a}))})),xt=(e,s)=>{const{conditions:n,sections:{collectionTypes:t,singleTypes:i,plugins:a,settings:l}}=e,d={collectionTypes:t,singleTypes:i,plugins:ds(a,"plugin"),settings:ds(l,"category")},p={collectionTypes:rs(t,t.actions||[],n,s),singleTypes:rs(i,i.actions||[],n,s),plugins:as(d.plugins,n,s),settings:as(d.settings,n,s)};return{initialData:p,modifiedData:p,layouts:d}},ge=e=>Object.keys(e).reduce((s,n)=>{const t=e[n];if(Z(t)&&!ce(t,"conditions"))return{...s,[n]:ge(t)};if(Z(t)&&ce(t,"conditions")&&!w(Be(t,"conditions")).some(a=>a)){const a=Object.keys(t.conditions).reduce((l,d)=>(l[d]=!1,l),{});return{...s,[n]:{...t,conditions:a}}}return s[n]=t,s},{}),ae=(e,s,n=!1)=>Object.keys(e).reduce((t,i)=>{const a=e[i];return i==="conditions"&&!n?(t[i]=a,t):Z(a)?{...t,[i]:ae(a,s,i==="fields")}:(t[i]=s,t)},{}),_t={initialData:{},modifiedData:{},layouts:{}},bt=(e,s)=>(0,ke.default)(e,n=>{switch(s.type){case"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX":{const{collectionTypeKind:t,actionId:i,value:a}=s,l=["modifiedData",t];Object.keys(T(e,l)).forEach(d=>{const p=T(e,[...l,d,i],void 0);if(p){let u=ae(p,a);if(!a&&u.conditions){const m=ae(u.conditions,!1);u={...u,conditions:m}}N(n,[...l,d,i],u)}});break}case"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX":{const{pathToCollectionType:t,propertyName:i,rowName:a,value:l}=s;let d=ye(e.modifiedData);const p=t.split(".."),u=T(d,p,{});Object.keys(u).forEach(m=>{if(ce(u[m],`properties.${i}`)){const C=T(u,[m,"properties",i,a]),b=[...p,m,"properties",i,a];if(!Z(C))N(d,b,l);else{const P=ae(C,l);N(d,b,P)}}}),l||(d=ge(d)),N(n,"modifiedData",d);break}case"ON_CHANGE_CONDITIONS":{Object.entries(s.conditions).forEach(t=>{const[i,a]=t;N(n,["modifiedData",...i.split(".."),"conditions"],a)});break}case"ON_CHANGE_SIMPLE_CHECKBOX":{let t=ye(e.modifiedData);N(t,[...s.keys.split("..")],s.value),s.value||(t=ge(t)),N(n,"modifiedData",t);break}case"ON_CHANGE_TOGGLE_PARENT_CHECKBOX":{const{keys:t,value:i}=s,a=[...t.split("..")];let l=ye(e.modifiedData);const d=T(l,a,{}),p=ae(d,i);N(l,a,p),i||(l=ge(l)),N(n,["modifiedData"],l);break}case"RESET_FORM":{n.modifiedData=e.initialData;break}case"SET_FORM_AFTER_SUBMIT":{n.initialData=e.modifiedData;break}default:return n}}),Se=e=>Object.entries(e).filter(([,s])=>s).map(([s])=>s),jt=e=>{const[s,{conditions:n}]=e;return{action:s,subject:null,conditions:Se(n),properties:{}}},Ot=e=>Object.values(e).reduce((s,n)=>{const t=Object.entries(n).reduce((i,a)=>{const[,{properties:{enabled:l}}]=a;if(!l)return i;const d=jt(a);return i.push(d),i},[]);return[...s,...t]},[]),cs=e=>Object.values(e).reduce((s,n)=>{const t=Ot(n);return[...s,...t]},[]),us=(e,s="")=>Object.entries(e).reduce((n,t)=>{const[i,a]=t;return Z(a)?[...n,...us(a,`${s}${i}.`)]:(a&&!Z(a)&&n.push(`${s}${i}`),n)},[]),Et=(e,s,{conditions:n,properties:t})=>Object.entries(t).reduce((i,a)=>{const[l,d]=a;return i.properties[l]=us(d),i},{action:e,subject:s,conditions:Se(n),properties:{}}),Rt=(e,s,{conditions:n})=>({action:e,subject:s,properties:{},conditions:Se(n)}),Mt=(e,s)=>Object.entries(s).reduce((t,i)=>{const[a,l]=i;if(!w(l).some(u=>u))return t;if(!l?.properties?.enabled){const u=Et(a,e,l);return[...t,u]}if(!l.properties.enabled)return t;const p=Rt(a,e,l);return t.push(p),t},[]),ps=e=>Object.entries(e).reduce((n,t)=>{const[i,a]=t,l=Mt(i,a);return[...n,...l]},[]),Tt=e=>{const s=cs(e.plugins),n=cs(e.settings),t=ps(e.collectionTypes),i=ps(e.singleTypes);return[...s,...n,...t,...i]},At=[{labelId:"app.components.LeftMenuLinkContainer.collectionTypes",defaultMessage:"Collection Types",id:"collectionTypes"},{labelId:"app.components.LeftMenuLinkContainer.singleTypes",id:"singleTypes",defaultMessage:"Single Types"},{labelId:"app.components.LeftMenuLinkContainer.plugins",defaultMessage:"Plugins",id:"plugins"},{labelId:"app.components.LeftMenuLinkContainer.settings",defaultMessage:"Settings",id:"settings"}],Le=(0,g.forwardRef)(({layout:e,isFormDisabled:s,permissions:n},t)=>{const[{initialData:i,layouts:a,modifiedData:l},d]=(0,g.useReducer)(bt,_t,()=>xt(e,n)),{formatMessage:p}=(0,U.Z)();(0,g.useImperativeHandle)(t,()=>({getPermissions(){const O=(0,de.difference)(i.collectionTypes,l.collectionTypes),x=(0,de.difference)(i.singleTypes,l.singleTypes),h={...O,...x};let E;return ne(h)?E=!1:E=Object.values(h).some(j=>Object.values(j).some(M=>ce(M,"conditions"))),{permissionsToSend:Tt(l),didUpdateConditions:E}},resetForm(){d({type:"RESET_FORM"})},setFormAfterSubmit(){d({type:"SET_FORM_AFTER_SUBMIT"})}}));const u=(O,x,h,E)=>{d({type:"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX",pathToCollectionType:O,propertyName:x,rowName:h,value:E})},m=(O,x,h)=>{d({type:"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX",collectionTypeKind:O,actionId:x,value:h})},C=O=>{d({type:"ON_CHANGE_CONDITIONS",conditions:O})},b=(0,g.useCallback)(({target:{name:O,value:x}})=>{d({type:"ON_CHANGE_SIMPLE_CHECKBOX",keys:O,value:x})},[]),P=(0,g.useCallback)(({target:{name:O,value:x}})=>{d({type:"ON_CHANGE_TOGGLE_PARENT_CHECKBOX",keys:O,value:x})},[]);return(0,o.jsx)(Ms,{availableConditions:e.conditions,modifiedData:l,onChangeConditions:C,onChangeSimpleCheckbox:b,onChangeParentCheckbox:P,onChangeCollectionTypeLeftActionRowCheckbox:u,onChangeCollectionTypeGlobalActionCheckbox:m,children:(0,o.jsxs)(hs.v,{id:"tabs",label:p({id:"Settings.permissions.users.tabs.label",defaultMessage:"Tabs Permissions"}),children:[(0,o.jsx)(Ie.m,{children:At.map(O=>(0,o.jsx)(Ie.O,{children:p({id:O.labelId,defaultMessage:O.defaultMessage})},O.id))}),(0,o.jsxs)(te.n,{style:{position:"relative"},children:[(0,o.jsx)(te.x,{children:(0,o.jsx)(ss,{layout:a.collectionTypes,kind:"collectionTypes",isFormDisabled:s})}),(0,o.jsx)(te.x,{children:(0,o.jsx)(ss,{layout:a.singleTypes,kind:"singleTypes",isFormDisabled:s})}),(0,o.jsx)(te.x,{children:(0,o.jsx)($e,{layout:a.plugins,kind:"plugins",isFormDisabled:s})}),(0,o.jsx)(te.x,{children:(0,o.jsx)($e,{layout:a.settings,kind:"settings",isFormDisabled:s})})]})]})})});Le.defaultProps={permissions:[],layout:{conditions:[],sections:{collectionTypes:{},singleTypes:{actions:[]},settings:[],plugins:[]}}},Le.propTypes={layout:r.object,isFormDisabled:r.bool.isRequired,permissions:r.array};const Pt=(0,g.memo)(Le),vt=(e,s={})=>{const{get:n}=(0,de.useFetchClient)(),{data:t,error:i,isError:a,isLoading:l}=(0,We.useQuery)(["permissions",e],async()=>{const{data:{data:d}}=await n("/admin/permissions",{params:{role:e}});return d},s);return{data:t,error:i,isError:a,isLoading:l}},Dt=(e={id:null},s={})=>{const{id:n,...t}=e,{get:i}=(0,de.useFetchClient)(),{data:a,error:l,isError:d,isLoading:p,refetch:u}=(0,We.useQuery)(["roles",n,"permissions",t],async()=>{const{data:{data:m}}=await i(`/admin/roles/${n}/permissions`,{params:t});return m},s);return{permissions:a,error:l,isError:d,isLoading:p,refetch:u}}},41301:(W,K,c)=>{"use strict";c.d(K,{Q:()=>f});var o=c(56940),g=c(19681),A=c(77856);const f=({options:y,...S})=>(0,o.jsx)(A.NU,{...S,children:y.map(D=>"children"in D?(0,o.jsx)(A.Ab,{label:D.label,values:D.children.map(B=>B.value.toString()),children:D.children.map(B=>(0,o.jsx)(R,{value:B.value,children:B.label},B.value))},D.label):(0,o.jsx)(A.ML,{value:D.value,children:D.label},D.value))}),R=(0,g.default)(A.ML)`
  padding-left: ${({theme:y})=>y.spaces[7]};
`},2777:(W,K,c)=>{"use strict";c.d(K,{O:()=>B});var o=c(56940),g=c(75937),A=c(19681),f=c(65094),R=c(74065);const y=()=>(0,o.jsx)(f.x,{"aria-hidden":!0,paddingLeft:1,paddingRight:1,children:(0,o.jsx)(R.Z,{variant:"pi",textColor:"neutral500",children:"/"})});y.displayName="Divider";var S=c(66041);const D=(0,A.default)(S.k)`
  // CrumbLinks do have padding-x, because they need to have a
  // interaction effect, which mis-aligns the breadcrumbs on the left.
  // This normalizes the behavior by moving the first item to left by
  // the same amount it has inner padding
  :first-child {
    margin-left: ${({theme:H})=>`calc(-1*${H.spaces[2]})`};
  }
`,B=({label:H,children:se,...q})=>{const z=g.Children.toArray(se);return(0,o.jsx)(f.x,{"aria-label":H,...q,children:(0,o.jsx)(D,{as:"ol",children:g.Children.map(z,(me,he)=>{const fe=z.length>1&&he+1<z.length;return(0,o.jsxs)(S.k,{inline:!0,as:"li",children:[me,fe&&(0,o.jsx)(y,{})]})})})})};B.displayName="Breadcrumbs"},67463:(W,K,c)=>{"use strict";c.d(K,{$:()=>f});var o=c(56940),g=c(65094),A=c(74065);const f=({children:R,isCurrent:y=!1,...S})=>(0,o.jsx)(g.x,{paddingLeft:2,paddingRight:2,paddingTop:1,paddingBottom:1,children:(0,o.jsx)(A.Z,{variant:"pi",textColor:"neutral800",fontWeight:y?"bold":"normal","aria-current":y,...S,children:R})});f.displayName="Crumb"}}]);
