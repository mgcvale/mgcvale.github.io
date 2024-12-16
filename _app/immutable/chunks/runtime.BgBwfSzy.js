var Fn=Array.isArray,Ln=Array.from,Mn=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,Wt=Object.getOwnPropertyDescriptors,qn=Object.prototype,Hn=Array.prototype,Xt=Object.getPrototypeOf;function Yn(t){return typeof t=="function"}const Un=()=>{};function jn(t){return t()}function tn(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,wt=4,j=8,lt=16,m=32,J=64,tt=128,O=256,K=512,h=1024,I=2048,P=4096,C=8192,b=16384,nn=32768,Tt=65536,Bn=1<<17,rn=1<<19,mt=1<<20,ht=Symbol("$state"),Vn=Symbol("legacy props"),Gn=Symbol("");function At(t){return t===this.v}function en(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function gt(t){return!en(t,this.v)}function sn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function ln(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function an(t){throw new Error("https://svelte.dev/e/effect_orphan")}function on(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Kn(){throw new Error("https://svelte.dev/e/hydration_failed")}function $n(t){throw new Error("https://svelte.dev/e/lifecycle_legacy_only")}function Zn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function zn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Jn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function un(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function fn(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let Q=!1;function Qn(){Q=!0}function at(t){return{f:0,v:t,reactions:null,equals:At,version:0}}function Wn(t){return It(at(t))}function _n(t,n=!1){var e;const r=at(t);return n||(r.equals=gt),Q&&u!==null&&u.l!==null&&((e=u.l).s??(e.s=[])).push(r),r}function Xn(t,n=!1){return It(_n(t,n))}function It(t){return i!==null&&i.f&y&&(T===null?xn([t]):T.push(t)),t}function tr(t,n){return ot(t,Jt(()=>ct(t))),n}function ot(t,n){return i!==null&&_t()&&i.f&(y|lt)&&(T===null||!T.includes(t))&&fn(),cn(t,n)}function cn(t,n){return t.equals(n)||(t.v=n,t.version=Vt(),St(t,I),_t()&&o!==null&&o.f&h&&!(o.f&m)&&(v!==null&&v.includes(t)?(w(o,I),X(o)):g===null?On([t]):g.push(t))),n}function St(t,n){var r=t.reactions;if(r!==null)for(var e=_t(),s=r.length,l=0;l<s;l++){var a=r[l],f=a.f;f&I||!e&&a===o||(w(a,n),f&(h|O)&&(f&y?St(a,P):X(a)))}}function xt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}const nr=1,rr=2,er=4,sr=8,lr=16,ar=1,or=2,ur=4,ir=8,fr=16,_r=1,cr=2,vr=4,pr=1,hr=2,vn="[",pn="[!",hn="]",Ot={},dr=Symbol(),Er="http://www.w3.org/2000/svg";let k=!1;function yr(t){k=t}let A;function q(t){if(t===null)throw xt(),Ot;return A=t}function wr(){return q(F(A))}function Tr(t){if(k){if(F(A)!==null)throw xt(),Ot;A=t}}function mr(){for(var t=0,n=A;;){if(n.nodeType===8){var r=n.data;if(r===hn){if(t===0)return n;t-=1}else(r===vn||r===pn)&&(t+=1)}var e=F(n);n.remove(),n=e}}var dt,Rt,Nt;function Ar(){if(dt===void 0){dt=window;var t=Element.prototype,n=Node.prototype;Rt=pt(n,"firstChild").get,Nt=pt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function nt(t=""){return document.createTextNode(t)}function rt(t){return Rt.call(t)}function F(t){return Nt.call(t)}function gr(t,n){if(!k)return rt(t);var r=rt(A);if(r===null)r=A.appendChild(nt());else if(n&&r.nodeType!==3){var e=nt();return r==null||r.before(e),q(e),e}return q(r),r}function Ir(t,n){if(!k){var r=rt(t);return r instanceof Comment&&r.data===""?F(r):r}return A}function Sr(t,n=1,r=!1){let e=k?A:t;for(var s;n--;)s=e,e=F(e);if(!k)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var a=nt();return e===null?s==null||s.after(a):e.before(a),q(a),a}return q(e),e}function xr(t){t.textContent=""}function dn(t){var n=y|I;o===null?n|=O:o.f|=mt;var r=i!==null&&i.f&y?i:null;const e={children:null,ctx:u,deps:null,equals:At,f:n,fn:t,reactions:null,v:null,version:0,parent:r??o};return r!==null&&(r.children??(r.children=[])).push(e),e}function Or(t){const n=dn(t);return n.equals=gt,n}function Dt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?ut(e):x(e)}}}function En(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function Ct(t){var n,r=o;z(En(t));try{Dt(t),n=Gt(t)}finally{z(r)}return n}function kt(t){var n=Ct(t),r=(R||t.f&O)&&t.deps!==null?P:h;w(t,r),t.equals(n)||(t.v=n,t.version=Vt())}function ut(t){Dt(t),U(t,0),w(t,b),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Pt(t){o===null&&i===null&&an(),i!==null&&i.f&O&&ln(),ft&&sn()}function yn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function L(t,n,r,e=!0){var s=(t&J)!==0,l=o,a={ctx:u,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|I,first:null,fn:n,last:null,next:null,parent:s?null:l,prev:null,teardown:null,transitions:null,version:0};if(r){var f=N;try{Et(!0),B(a),a.f|=nn}catch(_){throw x(a),_}finally{Et(f)}}else n!==null&&X(a);var p=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&mt)===0;if(!p&&!s&&e&&(l!==null&&yn(a,l),i!==null&&i.f&y)){var d=i;(d.children??(d.children=[])).push(a)}return a}function Rr(t){const n=L(j,null,!1);return w(n,h),n.teardown=t,n}function Nr(t){Pt();var n=o!==null&&(o.f&m)!==0&&u!==null&&!u.m;if(n){var r=u;(r.e??(r.e=[])).push({fn:t,effect:o,reaction:i})}else{var e=bt(t);return e}}function Dr(t){return Pt(),it(t)}function Cr(t){const n=L(J,t,!0);return(r={})=>new Promise(e=>{r.outro?mn(n,()=>{x(n),e(void 0)}):(x(n),e(void 0))})}function bt(t){return L(wt,t,!1)}function kr(t,n){var r=u,e={effect:null,ran:!1};r.l.r1.push(e),e.effect=it(()=>{t(),!e.ran&&(e.ran=!0,ot(r.l.r2,!0),Jt(n))})}function Pr(){var t=u;it(()=>{if(ct(t.l.r2)){for(var n of t.l.r1){var r=n.effect;r.f&h&&w(r,P),M(r)&&B(r),n.ran=!1}t.l.r2.v=!1}})}function it(t){return L(j,t,!0)}function br(t){return wn(t)}function wn(t,n=0){return L(j|lt|n,t,!0)}function Fr(t,n=!0){return L(j|m,t,!0,n)}function Ft(t){var n=t.teardown;if(n!==null){const r=ft,e=i;yt(!0),Z(null);try{n.call(null)}finally{yt(r),Z(e)}}}function Lt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ut(n[r])}}function Mt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;x(r,n),r=e}}function Tn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&m||x(n),n=r}}function x(t,n=!0){var r=!1;if((n||t.f&rn)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var l=e===s?null:F(e);e.remove(),e=l}r=!0}Mt(t,n&&!r),Lt(t),U(t,0),w(t,b);var a=t.transitions;if(a!==null)for(const p of a)p.stop();Ft(t);var f=t.parent;f!==null&&f.first!==null&&qt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function qt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function mn(t,n){var r=[];Ht(t,r,!0),An(r,()=>{x(t),n&&n()})}function An(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Ht(t,n,r){if(!(t.f&C)){if(t.f^=C,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var s=e.next,l=(e.f&Tt)!==0||(e.f&m)!==0;Ht(e,n,l?r:!1),e=s}}}function Lr(t){Yt(t,!0)}function Yt(t,n){if(t.f&C){M(t)&&B(t),t.f^=C;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&Tt)!==0||(r.f&m)!==0;Yt(r,s?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}let $=!1,et=[];function Ut(){$=!1;const t=et.slice();et=[],tn(t)}function Mr(t){$||($=!0,queueMicrotask(Ut)),et.push(t)}function gn(){$&&Ut()}function qr(){throw new Error("https://svelte.dev/e/invalid_default_snippet")}function In(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}const jt=0,Sn=1;let V=!1,G=jt,H=!1,Y=null,N=!1,ft=!1;function Et(t){N=t}function yt(t){ft=t}let S=[],D=0;let i=null;function Z(t){i=t}let o=null;function z(t){o=t}let T=null;function xn(t){T=t}let v=null,E=0,g=null;function On(t){g=t}let Bt=0,R=!1,u=null;function Vt(){return++Bt}function _t(){return!Q||u!==null&&u.l===null}function M(t){var a,f;var n=t.f;if(n&I)return!0;if(n&P){var r=t.deps,e=(n&O)!==0;if(r!==null){var s;if(n&K){for(s=0;s<r.length;s++)((a=r[s]).reactions??(a.reactions=[])).push(t);t.f^=K}for(s=0;s<r.length;s++){var l=r[s];if(M(l)&&kt(l),e&&o!==null&&!R&&!((f=l==null?void 0:l.reactions)!=null&&f.includes(t))&&(l.reactions??(l.reactions=[])).push(t),l.version>t.version)return!0}}e||w(t,h)}return!1}function Rn(t,n){for(var r=n;r!==null;){if(r.f&tt)try{r.fn(t);return}catch{r.f^=tt}r=r.parent}throw V=!1,t}function Nn(t){return(t.f&b)===0&&(t.parent===null||(t.parent.f&tt)===0)}function W(t,n,r,e){if(V){if(r===null&&(V=!1),Nn(n))throw t;return}r!==null&&(V=!0);{Rn(t,n);return}}function Gt(t){var vt;var n=v,r=E,e=g,s=i,l=R,a=T,f=u,p=t.f;v=null,E=0,g=null,i=p&(m|J)?null:t,R=!N&&(p&O)!==0,T=null,u=t.ctx;try{var d=(0,t.fn)(),_=t.deps;if(v!==null){var c;if(U(t,E),_!==null&&E>0)for(_.length=E+v.length,c=0;c<v.length;c++)_[E+c]=v[c];else t.deps=_=v;if(!R)for(c=E;c<_.length;c++)((vt=_[c]).reactions??(vt.reactions=[])).push(t)}else _!==null&&E<_.length&&(U(t,E),_.length=E);return d}finally{v=n,E=r,g=e,i=s,R=l,T=a,u=f}}function Dn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&y&&(v===null||!v.includes(n))&&(w(n,P),n.f&(O|K)||(n.f^=K),U(n,0))}function U(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)Dn(t,r[e])}function B(t){var n=t.f;if(!(n&b)){w(t,h);var r=o,e=u;o=t;try{n&lt?Tn(t):Mt(t),Lt(t),Ft(t);var s=Gt(t);t.teardown=typeof s=="function"?s:null,t.version=Bt}catch(l){W(l,t,r,e||t.ctx)}finally{o=r}}}function Kt(){if(D>1e3){D=0;try{on()}catch(t){if(Y!==null)W(t,Y,null);else throw t}}D++}function $t(t){var n=t.length;if(n!==0){Kt();var r=N;N=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&h||(s.f^=h);var l=[];Zt(s,l),Cn(l)}}finally{N=r}}}function Cn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(b|C)))try{M(e)&&(B(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?qt(e):e.fn=null))}catch(s){W(s,e,null,e.ctx)}}}function kn(){if(H=!1,D>1001)return;const t=S;S=[],$t(t),H||(D=0,Y=null)}function X(t){G===jt&&(H||(H=!0,queueMicrotask(kn))),Y=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(J|m)){if(!(r&h))return;n.f^=h}}S.push(n)}function Zt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,l=(s&m)!==0,a=l&&(s&h)!==0,f=r.next;if(!a&&!(s&C))if(s&j){if(l)r.f^=h;else try{M(r)&&B(r)}catch(c){W(c,r,null,r.ctx)}var p=r.first;if(p!==null){r=p;continue}}else s&wt&&e.push(r);if(f===null){let c=r.parent;for(;c!==null;){if(t===c)break t;var d=c.next;if(d!==null){r=d;continue t}c=c.parent}}r=f}for(var _=0;_<e.length;_++)p=e[_],n.push(p),Zt(p,n)}function zt(t){var n=G,r=S;try{Kt();const s=[];G=Sn,S=s,H=!1,$t(r);var e=t==null?void 0:t();return gn(),(S.length>0||s.length>0)&&zt(),D=0,Y=null,e}finally{G=n,S=r}}async function Hr(){await Promise.resolve(),zt()}function ct(t){var _;var n=t.f,r=(n&y)!==0;if(r&&n&b){var e=Ct(t);return ut(t),e}if(i!==null){T!==null&&T.includes(t)&&un();var s=i.deps;v===null&&s!==null&&s[E]===t?E++:v===null?v=[t]:v.push(t),g!==null&&o!==null&&o.f&h&&!(o.f&m)&&g.includes(t)&&(w(o,I),X(o))}else if(r&&t.deps===null)for(var l=t,a=l.parent,f=l;a!==null;)if(a.f&y){var p=a;f=p,a=p.parent}else{var d=a;(_=d.deriveds)!=null&&_.includes(f)||(d.deriveds??(d.deriveds=[])).push(f);break}return r&&(l=t,M(l)&&kt(l)),t.v}function Jt(t){const n=i;try{return i=null,t()}finally{i=n}}const Pn=~(I|P|h);function w(t,n){t.f=t.f&Pn|n}function Yr(t){return Qt().get(t)}function Ur(t,n){return Qt().set(t,n),n}function Qt(t){return u===null&&In(),u.c??(u.c=new Map(bn(u)||void 0))}function bn(t){let n=t.p;for(;n!==null;){const r=n.c;if(r!==null)return r;n=n.p}return null}function jr(t,n=1){var r=ct(t),e=n===1?r++:r--;return ot(t,r),e}function Br(t,n=!1,r){u={p:u,c:null,e:null,m:!1,s:t,x:null,l:null},Q&&!n&&(u.l={s:null,u:null,r1:[],r2:at(!1)})}function Vr(t){const n=u;if(n!==null){const a=n.e;if(a!==null){var r=o,e=i;n.e=null;try{for(var s=0;s<a.length;s++){var l=a[s];z(l.effect),Z(l.reaction),bt(l.fn)}}finally{z(r),Z(e)}}u=n.p,n.m=!0}return{}}function Gr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ht in t)st(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ht in r&&st(r)}}}function st(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{st(t[e],n)}catch{}const r=Xt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Wt(r);for(let s in e){const l=e[s].get;if(l)try{l.call(t)}catch{}}}}}export{zt as $,o as A,hr as B,wr as C,q as D,Tt as E,Z as F,z as G,i as H,Rr as I,Mr as J,Mn as K,Fn as L,Ar as M,vn as N,F as O,Ot as P,yr as Q,hn as R,xt as S,pr as T,Kn as U,xr as V,Ln as W,Cr as X,_n as Y,ot as Z,Vn as _,Fr as a,Hr as a0,Wn as a1,ht as a2,qn as a3,Hn as a4,at as a5,zn as a6,dr as a7,pt as a8,Jn as a9,cn as aA,rr as aB,Ht as aC,An as aD,sr as aE,lr as aF,Er as aG,Gn as aH,Wt as aI,lt as aJ,nn as aK,_r as aL,cr as aM,vr as aN,Yr as aO,Ur as aP,Xn as aQ,kr as aR,Pr as aS,tr as aT,qr as aU,Xt as aa,pn as ab,mr as ac,Lr as ad,mn as ae,bt as af,it as ag,Zn as ah,Bn as ai,ur as aj,gt as ak,jr as al,Yn as am,m as an,J as ao,ar as ap,Q as aq,or as ar,ir as as,Or as at,fr as au,In as av,$n as aw,er as ax,C as ay,nr as az,wn as b,A as c,x as d,Vr as e,Ir as f,gr as g,k as h,Tr as i,Sr as j,Dr as k,Nr as l,u as m,Un as n,jn as o,Br as p,ct as q,tn as r,en as s,br as t,Jt as u,Gr as v,dn as w,Qn as x,nt as y,rt as z};
