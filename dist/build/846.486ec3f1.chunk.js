(self.webpackChunkem_guide_app=self.webpackChunkem_guide_app||[]).push([[846],{41062:(P,M,n)=>{var i=n(30013),h=n(78905),c="[object Boolean]";function T(s){return s===!0||s===!1||h(s)&&i(s)==c}P.exports=T},1205:(P,M,n)=>{var i=n(61124);function h(c){return i(c)&&c!=+c}P.exports=h},61124:(P,M,n)=>{var i=n(30013),h=n(78905),c="[object Number]";function T(s){return typeof s=="number"||h(s)&&i(s)==c}P.exports=T},30120:(P,M,n)=>{"use strict";n.d(M,{D:()=>s});var i=n(56940),h=n(65094),c=n(26488);function T(D,R,O){if(!D||!R||!O)return{display:"none"};const{x:I,y:x}=O;return{transform:`translate(${I}px, ${x}px)`}}const s=({renderItem:D})=>{const{itemType:R,isDragging:O,item:I,initialOffset:x,currentOffset:d,mouseOffset:C}=(0,c.useDragLayer)(p=>({item:p.getItem(),itemType:p.getItemType(),initialOffset:p.getInitialSourceClientOffset(),currentOffset:p.getSourceClientOffset(),isDragging:p.isDragging(),mouseOffset:p.getClientOffset()}));return O?(0,i.jsx)(h.x,{height:"100%",left:0,position:"fixed",pointerEvents:"none",top:0,zIndex:100,width:"100%",children:(0,i.jsx)(h.x,{style:T(x,d,C),children:D({type:R,item:I})})}):null}},27469:(P,M,n)=>{"use strict";n.d(M,{a:()=>v,b:()=>W,c:()=>Z,d:()=>S,g:()=>p,i:()=>U,m:()=>A,s:()=>L,u:()=>K});var i=n(75937),h=n(26488),c=n(70865),T=n(88720),s=n(30956),D=n(333),R=n(41062),O=n(49079),I=n(1205),x=n(30913),d=n(42052);const p=e=>`content-manager.${e}`;(0,i.createContext)();const k=(e,o,{onCancel:a,onDropItem:t,onGrabItem:u,onMoveItem:f})=>{const[l,E]=(0,i.useState)(!1),y=g=>{l&&(g==="UP"?f(o-1,o):g==="DOWN"&&f(o+1,o))},m=()=>{l?(t&&t(o),E(!1)):(u&&u(o),E(!0))},r=()=>{l&&(E(!1),a&&a(o))};return g=>{if(e&&!(g.key==="Tab"&&!l))switch(g.preventDefault(),g.key){case" ":case"Enter":m();break;case"Escape":r();break;case"ArrowDown":case"ArrowRight":y("DOWN");break;case"ArrowUp":case"ArrowLeft":y("UP");break}}},K=(e,{type:o="STRAPI_DND",index:a,item:t={},onStart:u,onEnd:f,onGrabItem:l,onDropItem:E,onCancel:y,onMoveItem:m,dropSensitivity:r="regular"})=>{const _=(0,i.useRef)(null),[{handlerId:g},B]=(0,h.useDrop)({accept:o,collect(j){return{handlerId:j.getHandlerId()}},hover(j,Q){if(!_.current)return;const N=j.index,w=a;if(N!==w){if(r==="regular"){const z=_.current.getBoundingClientRect(),H=(z.bottom-z.top)/2,X=Q.getClientOffset().y-z.top;if(N<w&&X<H||N>w&&X>H)return}m(w,N),j.index=w}}}),[{isDragging:b},V,Y]=(0,h.useDrag)({type:o,item(){u&&u();const{width:j}=_.current?.getBoundingClientRect()??{};return{index:a,width:j,...t}},end(){f&&f()},canDrag:e,isDragging:t.id?j=>t.id===j.getItem().id:void 0,collect:j=>({isDragging:j.isDragging()})}),G=k(e,a,{onGrabItem:l,onDropItem:E,onCancel:y,onMoveItem:m});return[{handlerId:g,isDragging:b,handleKeyDown:G},_,B,V,Y]},S=()=>e=>e["content-manager_app"]||T.J,W=()=>(0,c.createSelector)(S(),e=>({collectionTypeLinks:e.collectionTypeLinks,singleTypeLinks:e.singleTypeLinks})),A=()=>(0,c.createSelector)(S(),({components:e,models:o})=>({schemas:[...e,...o]})),L=(0,c.createSelector)(S(),e=>e.fieldSizes),$=(e,o)=>{typeof e=="function"?e(o):e!=null&&(e.current=o)},Z=(...e)=>o=>e.forEach(a=>$(a,o));function U(e){return["integer","biginteger","decimal","float","number"].includes(e)}d.kM(d.nK,"defined",function(){return this.test("defined",s.translatedErrors.required,e=>e!==void 0)}),d.kM(d.IX,"notEmptyMin",function(e){return this.test("notEmptyMin",s.translatedErrors.min,o=>O(o)?!0:o.length>=e)}),d.kM(d.Z_,"isInferior",function(e,o){return this.test("isInferior",e,function(a){return!a||Number.isNaN(x(a))?!0:x(o)>=x(a)})}),d.kM(d.Z_,"isSuperior",function(e,o){return this.test("isSuperior",e,function(a){return!a||Number.isNaN(x(a))?!0:x(a)>=x(o)})});const F=e=>D(e,["attributes"],{}),v=(e,{components:o},a={isCreatingEntry:!0,isDraft:!0,isFromComponent:!1,isJSONTestDisabled:!1})=>{const t=F(e);return d.Ry().shape(Object.keys(t).reduce((u,f)=>{const l=t[f];if(l.type!=="relation"&&l.type!=="component"&&l.type!=="dynamiczone"){const E=J(l.type,l,a);u[f]=E}if(l.type==="relation"&&(u[f]=["oneWay","oneToOne","manyToOne","oneToManyMorph","oneToOneMorph"].includes(l.relationType)?d.Ry().nullable():d.IX().nullable()),l.type==="component"){const E=v(o[l.component],{components:o},{...a,isFromComponent:!0});if(l.repeatable===!0){const{min:m,max:r,required:_}=l;let g=d.Vo(B=>{let b=d.IX().of(E);return m?_?b=b.min(m,s.translatedErrors.min):_!==!0&&O(B)?b=b.nullable():b=b.min(m,s.translatedErrors.min):_&&!a.isDraft&&(b=b.min(1,s.translatedErrors.required)),r&&(b=b.max(r,s.translatedErrors.max)),b});return u[f]=g,u}const y=d.Vo(m=>m!==void 0?l.required===!0&&!a.isDraft?E.defined():E.nullable():l.required===!0?d.Ry().defined():d.Ry().nullable());return u[f]=y,u}if(l.type==="dynamiczone"){let E=d.IX().of(d.Vo(({__component:r})=>v(o[r],{components:o},{...a,isFromComponent:!0})));const{max:y,min:m}=l;m?l.required?E=E.test("min",s.translatedErrors.min,r=>a.isCreatingEntry?r&&r.length>=m:r===void 0?!0:r!==null&&r.length>=m).test("required",s.translatedErrors.required,r=>a.isCreatingEntry?r!==null||r!==void 0:r===void 0?!0:r!==null):E=E.notEmptyMin(m):l.required&&!a.isDraft&&(E=E.test("required",s.translatedErrors.required,r=>a.isCreatingEntry?r!==null||r!==void 0:r===void 0?!0:r!==null)),y&&(E=E.max(y,s.translatedErrors.max)),u[f]=E}return u},{}))},J=(e,o,a)=>{let t=d.nK();return["string","uid","text","richtext","email","password","enumeration"].includes(e)&&(t=d.Z_()),e==="blocks"&&(t=d.nK().test("isJSON",s.translatedErrors.json,u=>a.isJSONTestDisabled||a.isDraft?!0:!(u&&!Array.isArray(u)))),e==="json"&&(t=d.nK(s.translatedErrors.json).test("isJSON",s.translatedErrors.json,u=>{if(a.isJSONTestDisabled||!u||!u.length)return!0;try{return JSON.parse(u),!0}catch{return!1}}).nullable().test("required",s.translatedErrors.required,u=>!(o.required&&(!u||!u.length)))),e==="email"&&(t=t.email(s.translatedErrors.email)),["number","integer","float","decimal"].includes(e)&&(t=d.Rx().transform(u=>I(u)?void 0:u).typeError()),e==="biginteger"&&(t=d.Z_().matches(/^-?\d*$/)),["date","datetime"].includes(e)&&(t=d.hT()),Object.keys(o).forEach(u=>{const f=o[u];if(f||!R(f)&&Number.isInteger(Math.floor(f))||f===0)switch(u){case"required":{a.isDraft||(e==="password"&&a.isCreatingEntry&&(t=t.required(s.translatedErrors.required)),e!=="password"&&(a.isCreatingEntry?t=t.required(s.translatedErrors.required):t=t.test("required",s.translatedErrors.required,l=>l===void 0&&!a.isFromComponent?!0:U(e)?l===0?!0:!!l:e==="boolean"?l!=null:e==="date"||e==="datetime"?typeof l=="string"?!O(l):!O(l?.toString()):!O(l))));break}case"max":{e==="biginteger"?t=t.isInferior(s.translatedErrors.max,f):t=t.max(f,s.translatedErrors.max);break}case"maxLength":t=t.max(f,s.translatedErrors.maxLength);break;case"min":{e==="biginteger"?t=t.isSuperior(s.translatedErrors.min,f):t=t.min(f,s.translatedErrors.min);break}case"minLength":{a.isDraft||(t=t.min(f,s.translatedErrors.minLength));break}case"regex":t=t.matches(new RegExp(f),{message:s.translatedErrors.regex,excludeEmptyString:!o.required});break;case"lowercase":["text","textarea","email","string"].includes(e)&&(t=t.strict().lowercase());break;case"uppercase":["text","textarea","email","string"].includes(e)&&(t=t.strict().uppercase());break;case"positive":U(e)&&(t=t.positive());break;case"negative":U(e)&&(t=t.negative());break;default:t=t.nullable()}}),t}},93468:(P,M,n)=>{"use strict";n.d(M,{VY:()=>u,__:()=>l,ck:()=>f,fC:()=>a,fF:()=>y,rl:()=>E,tu:()=>m,xz:()=>t});var i=n(56940),h=n(75937),c=n(96202),T=n(70754),s=n(62694),D=n(19681),R=n(95319),O=n(70468),I=n(58400),x=n(65094),d=n(66041),C=n(74065);const p=c.fC,k=(0,h.forwardRef)(({size:r,endIcon:_=(0,i.jsx)(T.Z,{width:`${6/16}rem`,height:`${4/16}rem`,"aria-hidden":!0}),...g},B)=>(0,i.jsx)(c.xz,{asChild:!0,children:(0,i.jsx)(I.z,{ref:B,type:"button",variant:"ghost",endIcon:_,paddingTop:r==="S"?1:2,paddingBottom:r==="S"?1:2,paddingLeft:r==="S"?3:4,paddingRight:r==="S"?3:4,...g})})),K=(0,h.forwardRef)(({children:r,intersectionId:_,popoverPlacement:g="bottom-start",...B},b)=>{const[V,Y]=g.split("-");return(0,i.jsx)(c.Uv,{children:(0,i.jsx)(c.VY,{align:Y,side:V,loop:!0,asChild:!0,children:(0,i.jsxs)(S,{ref:b,direction:"column",borderStyle:"solid",borderWidth:"1px",borderColor:"neutral150",hasRadius:!0,background:"neutral0",shadow:"filterShadow",maxHeight:"15rem",padding:1,alignItems:"flex-start",position:"relative",overflow:"auto",...B,children:[r,(0,i.jsx)(x.x,{id:_,width:"100%",height:"1px"})]})})})}),S=(0,D.default)(d.k)`
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`,W=({onSelect:r,disabled:_=!1,...g})=>(0,i.jsx)(c.ck,{asChild:!0,onSelect:r,disabled:_,children:g.isLink||g.isExternal?(0,i.jsx)($,{color:"neutral800",...g,isExternal:g.isExternal??!1,children:(0,i.jsx)(C.Z,{children:g.children})}):(0,i.jsx)(L,{cursor:"pointer",color:"neutral800",background:"transparent",borderStyle:"none",...g,children:(0,i.jsx)(C.Z,{children:g.children})})}),A=({theme:r})=>(0,D.css)`
  text-align: left;
  width: 100%;
  border-radius: ${r.borderRadius};
  padding: ${r.spaces[2]} ${r.spaces[4]};

  ${C.Z} {
    color: inherit;
  }

  &[aria-disabled] {
    cursor: not-allowed;

    ${C.Z} {
      color: ${r.colors.neutral500};
    }
  }

  &[data-highlighted] {
    background-color: ${r.colors.primary100};
  }

  &:focus-visible {
    outline: none;

    &:after {
      content: none;
    }
  }
`,L=(0,D.default)(d.k)`
  ${A}
`,$=(0,D.default)(O.r)`
  /* We include this here again because typically when people use OptionLink they provide an as prop which cancels the Box props */
  color: ${({theme:r,color:_})=>(0,R.$)(r.colors,_,void 0)};
  text-decoration: none;

  &:hover {
    color: unset;
  }

  svg > path,
  &:focus-visible svg > path {
    fill: currentColor;
  }

  ${A}
`,Z=(0,h.forwardRef)((r,_)=>(0,i.jsx)(c.__,{asChild:!0,children:(0,i.jsx)(U,{ref:_,variant:"sigma",textColor:"neutral600",...r})})),U=(0,D.default)(C.Z)`
  padding: ${({theme:r})=>r.spaces[2]} ${({theme:r})=>r.spaces[4]};
`,F=c.Tr,v=(0,h.forwardRef)(({disabled:r=!1,..._},g)=>(0,i.jsx)(c.fF,{asChild:!0,disabled:r,children:(0,i.jsxs)(J,{ref:g,color:"neutral800",as:"button",type:"button",background:"transparent",borderStyle:"none",gap:5,..._,children:[(0,i.jsx)(C.Z,{children:_.children}),(0,i.jsx)(e,{height:12,width:12})]})})),J=(0,D.default)(L)`
  &[data-state='open'] {
    background-color: ${({theme:r})=>r.colors.primary100};
  }
`,e=(0,D.default)(s.Z)`
  path {
    fill: ${({theme:r})=>r.colors.neutral500};
  }
`,o=(0,h.forwardRef)((r,_)=>(0,i.jsx)(c.Uv,{children:(0,i.jsx)(c.tu,{sideOffset:8,asChild:!0,children:(0,i.jsx)(S,{ref:_,direction:"column",borderStyle:"solid",borderWidth:"1px",borderColor:"neutral150",hasRadius:!0,background:"neutral0",shadow:"filterShadow",maxHeight:"15rem",padding:1,alignItems:"flex-start",overflow:"auto",...r})})})),a=p,t=k,u=K,f=W,l=Z,E=F,y=v,m=o},37434:(P,M,n)=>{"use strict";n.d(M,{sN:()=>s});var i=n(56940),h=n(75937),c=n(93468);const T=({children:D,onOpen:R,onClose:O,popoverPlacement:I,onReachEnd:x,...d})=>{const C=useRef(null),[p,k]=useState(!1),K=L=>{x&&x(L)},S=L=>{L&&typeof R=="function"?R():!L&&typeof O=="function"&&O(),k(L)},W=useId(),A=`intersection-${stripReactIdOfColon(W)}`;return useIntersection(C,K,{selectorToWatch:`#${A}`,skipWhen:!p}),jsxs(Root,{onOpenChange:S,children:[jsx(Trigger,{...d,children:d.label}),jsx(Content,{intersectionId:A,popoverPlacement:I,children:D})]})},s=c.ck},56892:(P,M,n)=>{"use strict";n.d(M,{d7:()=>c});var i=n(50646);const{Axios:h,AxiosError:c,CanceledError:T,isCancel:s,CancelToken:D,VERSION:R,all:O,Cancel:I,isAxiosError:x,spread:d,toFormData:C,AxiosHeaders:p,HttpStatusCode:k,formToJSON:K,getAdapter:S,mergeConfig:W}=i.default}}]);
