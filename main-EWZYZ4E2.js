import{c as Xe}from"./chunk-KR2LU3LU.js";import{a as Ue,b as We,c as qe}from"./chunk-UFDHUNR5.js";import{a as vt,b as Ne,c as Qe,d as $e}from"./chunk-JEZRDDXT.js";import{a as Ke}from"./chunk-3REVJOGU.js";import{a as Ze}from"./chunk-I523OUN5.js";import{a as Ve,b as xt}from"./chunk-4EPKNNNL.js";import{g as Fe}from"./chunk-DBNYSR7C.js";import{c as Se}from"./chunk-Y7UWQ5US.js";import"./chunk-EJ4YK6TY.js";import{a as be,b as et,c as fe,d as Et}from"./chunk-WFONATOK.js";import{H as Te,l as Pe,p as Oe,s as Ae,v as De}from"./chunk-FHOM4C6E.js";import{A as Me,E as D,I as ft,P as Ie,Q as Ee,S as Le,T as ze,U as Re,V as Be,W as je,X as Ge,Y as He,a as W,e as ue,h as lt,j as _e,n as q,p as ve,s as xe,w as we,x as ke,y as ye,z as Ce}from"./chunk-PEQPQOLS.js";import{a as se,c as le,d as ut,f as ce,g as de,i as me,k as _t,l as bt,m as pe,n as he,o as ge,q as z}from"./chunk-YTYJIT2J.js";import{$ as Y,$a as m,$b as u,B as K,Ba as I,Cb as O,D as dt,Da as R,E as Gt,Ea as Xt,Eb as C,F as Dt,Fb as te,Gb as M,Gc as ne,H as Ht,Jb as pt,Kb as ht,Lb as y,Mb as r,Mc as st,Nb as s,Ob as A,R as nt,S as Ut,T as F,V as Wt,Vb as v,Xa as Yt,Xb as h,Zb as p,_a as Jt,_b as T,aa as $,ac as H,ad as ae,bc as rt,ca as J,cc as x,d as Vt,dc as w,dd as oe,ea as l,eb as Tt,g as S,ga as qt,gd as re,hb as It,ic as gt,jc as k,ka as _,kc as ee,l as X,la as b,lc as c,m as Nt,mc as L,oa as at,ob as f,oc as ie,p as Q,pa as mt,pb as G,q as Qt,qb as E,sa as ot,sb as B,ta as tt,tb as j,ua as Zt,uc as U,v as $t,wa as Kt,xa as P,xc as V,y as ct,yc as N,z as it}from"./chunk-GGSJLPS2.js";var wt=(()=>{class e{changes=new S;itemsPerPageLabel="Items per page:";nextPageLabel="Next page";previousPageLabel="Previous page";firstPageLabel="First page";lastPageLabel="Last page";getRangeLabel=(t,i,n)=>{if(n==0||i==0)return`0 of ${n}`;n=Math.max(n,0);let o=t*i,d=o<n?Math.min(o+i,n):o+i;return`${o+1} \u2013 ${d} of ${n}`};static \u0275fac=function(i){return new(i||e)};static \u0275prov=Y({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Ct=["*"],_i=["content"],bi=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],fi=["mat-drawer","mat-drawer-content","*"];function vi(e,a){if(e&1){let t=v();r(0,"div",1),h("click",function(){_(t);let n=p();return b(n._onBackdropClicked())}),s()}if(e&2){let t=p();k("mat-drawer-shown",t._isShowingBackdrop())}}function xi(e,a){e&1&&(r(0,"mat-drawer-content"),u(1,2),s())}var wi=[[["mat-sidenav"]],[["mat-sidenav-content"]],"*"],ki=["mat-sidenav","mat-sidenav-content","*"];function yi(e,a){if(e&1){let t=v();r(0,"div",1),h("click",function(){_(t);let n=p();return b(n._onBackdropClicked())}),s()}if(e&2){let t=p();k("mat-drawer-shown",t._isShowingBackdrop())}}function Ci(e,a){e&1&&(r(0,"mat-sidenav-content"),u(1,2),s())}var Mi=`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`;var Si=new J("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),Ft=new J("MAT_DRAWER_CONTAINER"),kt=(()=>{class e extends et{_platform=l(W);_changeDetectorRef=l(st);_container=l(zt);constructor(){let t=l(R),i=l(be),n=l(tt);super(t,i,n)}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:t,end:i}=this._container;return t!=null&&t.mode!=="over"&&t.opened||i!=null&&i.mode!=="over"&&i.opened}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=f({type:e,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(i,n){i&2&&(gt("margin-left",n._container._contentMargins.left,"px")("margin-right",n._container._contentMargins.right,"px"),k("mat-drawer-content-hidden",n._shouldBeHidden()))},features:[U([{provide:et,useExisting:e}]),B],ngContentSelectors:Ct,decls:1,vars:0,template:function(i,n){i&1&&(T(),u(0))},encapsulation:2,changeDetection:0})}return e})(),Lt=(()=>{class e{_elementRef=l(R);_focusTrapFactory=l(Me);_focusMonitor=l(xe);_platform=l(W);_ngZone=l(tt);_renderer=l(It);_interactivityChecker=l(Ce);_doc=l(mt);_container=l(Ft,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(t){t=t==="end"?"end":"start",t!==this._position&&(this._isAttached&&this._updatePositionInParent(t),this._position=t,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(t){this._mode=t,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(t){this._disableClose=D(t)}_disableClose=!1;get autoFocus(){let t=this._autoFocus;return t??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(t){(t==="true"||t==="false"||t==null)&&(t=D(t)),this._autoFocus=t}_autoFocus;get opened(){return this._opened()}set opened(t){this.toggle(D(t))}_opened=P(!1);_openedVia=null;_animationStarted=new S;_animationEnd=new S;openedChange=new ot(!0);_openedStream=this.openedChange.pipe(it(t=>t),Q(()=>{}));openedStart=this._animationStarted.pipe(it(()=>this.opened),Dt(void 0));_closedStream=this.openedChange.pipe(it(t=>!t),Q(()=>{}));closedStart=this._animationStarted.pipe(it(()=>!this.opened),Dt(void 0));_destroyed=new S;onPositionChanged=new ot;_content;_modeChanged=new S;_injector=l(at);_changeDetectorRef=l(st);constructor(){this.openedChange.pipe(F(this._destroyed)).subscribe(t=>{t?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let t=this._renderer,i=this._elementRef.nativeElement;return[t.listen(i,"keydown",n=>{n.keyCode===27&&!this.disableClose&&!ve(n)&&this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault()})}),t.listen(i,"transitionend",this._handleTransitionEvent),t.listen(i,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_forceFocus(t,i){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{o(),d(),t.removeAttribute("tabindex")},o=this._renderer.listen(t,"blur",n),d=this._renderer.listen(t,"mousedown",n)})),t.focus(i)}_focusByCssSelector(t,i){let n=this._elementRef.nativeElement.querySelector(t);n&&this._forceFocus(n,i)}_takeFocus(){if(!this._focusTrap)return;let t=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":Tt(()=>{!this._focusTrap.focusInitialElement()&&typeof t.focus=="function"&&t.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(t){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,t):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let t=this._doc.activeElement;return!!t&&this._elementRef.nativeElement.contains(t)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(t){return this.toggle(!0,t)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(t=!this.opened,i){t&&i&&(this._openedVia=i);let n=this._setOpen(t,!t&&this._isFocusWithinDrawer(),this._openedVia||"program");return t||(this._openedVia=null),n}_setOpen(t,i,n){return t===this.opened?Promise.resolve(t?"open":"close"):(this._opened.set(t),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",t),!t&&i&&this._restoreFocus(n),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(o=>{this.openedChange.pipe(Gt(1)).subscribe(d=>o(d?"open":"close"))}))}_setIsAnimating(t){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",t)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(t){if(!this._platform.isBrowser)return;let i=this._elementRef.nativeElement,n=i.parentNode;t==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),n.insertBefore(this._anchor,i)),n.appendChild(i)):this._anchor&&this._anchor.parentNode.insertBefore(i,this._anchor)}_handleTransitionEvent=t=>{let i=this._elementRef.nativeElement;t.target===i&&this._ngZone.run(()=>{t.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(t)})};static \u0275fac=function(i){return new(i||e)};static \u0275cmp=f({type:e,selectors:[["mat-drawer"]],viewQuery:function(i,n){if(i&1&&rt(_i,5),i&2){let o;x(o=w())&&(n._content=o.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(i,n){i&2&&(O("align",null)("tabIndex",n.mode!=="side"?"-1":null),gt("visibility",!n._container&&!n.opened?"hidden":null),k("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:Ct,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(i,n){i&1&&(T(),r(0,"div",1,0),u(2),s())},dependencies:[et],encapsulation:2,changeDetection:0})}return e})(),zt=(()=>{class e{_dir=l(_e,{optional:!0});_element=l(R);_ngZone=l(tt);_changeDetectorRef=l(st);_animationDisabled=ft();_transitionsEnabled=!1;_allDrawers;_drawers=new Xt;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(t){this._autosize=D(t)}_autosize=l(Si);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(t){this._backdropOverride=t==null?null:D(t)}_backdropOverride=null;backdropClick=new ot;_start=null;_end=null;_left=null;_right=null;_destroyed=new S;_doCheckSubject=new S;_contentMargins={left:null,right:null};_contentMarginChanges=new S;get scrollable(){return this._userContent||this._content}_injector=l(at);constructor(){let t=l(W),i=l(fe);this._dir?.change.pipe(F(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),i.change().pipe(F(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&t.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(nt(this._allDrawers),F(this._destroyed)).subscribe(t=>{this._drawers.reset(t.filter(i=>!i._container||i._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(nt(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(t=>{this._watchDrawerToggle(t),this._watchDrawerPosition(t),this._watchDrawerMode(t)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(dt(10),F(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(t=>t.open())}close(){this._drawers.forEach(t=>t.close())}updateContentMargins(){let t=0,i=0;if(this._left&&this._left.opened){if(this._left.mode=="side")t+=this._left._getWidth();else if(this._left.mode=="push"){let n=this._left._getWidth();t+=n,i-=n}}if(this._right&&this._right.opened){if(this._right.mode=="side")i+=this._right._getWidth();else if(this._right.mode=="push"){let n=this._right._getWidth();i+=n,t-=n}}t=t||null,i=i||null,(t!==this._contentMargins.left||i!==this._contentMargins.right)&&(this._contentMargins={left:t,right:i},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(t){t._animationStarted.pipe(F(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),t.mode!=="side"&&t.openedChange.pipe(F(this._drawers.changes)).subscribe(()=>this._setContainerClass(t.opened))}_watchDrawerPosition(t){t.onPositionChanged.pipe(F(this._drawers.changes)).subscribe(()=>{Tt({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(t){t._modeChanged.pipe(F(ct(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(t){let i=this._element.nativeElement.classList,n="mat-drawer-container-has-open";t?i.add(n):i.remove(n)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(t=>{t.position=="end"?(this._end!=null,this._end=t):(this._start!=null,this._start=t)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(t=>t&&!t.disableClose&&this._drawerHasBackdrop(t)).forEach(t=>t._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(t){return t!=null&&t.opened}_drawerHasBackdrop(t){return this._backdropOverride==null?!!t&&t.mode!=="side":this._backdropOverride}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=f({type:e,selectors:[["mat-drawer-container"]],contentQueries:function(i,n,o){if(i&1&&H(o,kt,5)(o,Lt,5),i&2){let d;x(d=w())&&(n._content=d.first),x(d=w())&&(n._allDrawers=d)}},viewQuery:function(i,n){if(i&1&&rt(kt,5),i&2){let o;x(o=w())&&(n._userContent=o.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(i,n){i&2&&k("mat-drawer-container-explicit-backdrop",n._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[U([{provide:Ft,useExisting:e}])],ngContentSelectors:fi,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(i,n){i&1&&(T(bi),C(0,vi,1,2,"div",0),u(1),u(2,1),C(3,xi,2,0,"mat-drawer-content")),i&2&&(M(n.hasBackdrop?0:-1),m(3),M(n._content?-1:3))},dependencies:[kt],styles:[`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`],encapsulation:2,changeDetection:0})}return e})(),yt=(()=>{class e extends kt{static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[U([{provide:et,useExisting:e}]),B],ngContentSelectors:Ct,decls:1,vars:0,template:function(i,n){i&1&&(T(),u(0))},encapsulation:2,changeDetection:0})}return e})(),Rt=(()=>{class e extends Lt{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(t){this._fixedInViewport=D(t)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(t){this._fixedTopGap=lt(t)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(t){this._fixedBottomGap=lt(t)}_fixedBottomGap=0;static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(i,n){i&2&&(O("tabIndex",n.mode!=="side"?"-1":null)("align",null),gt("top",n.fixedInViewport?n.fixedTopGap:null,"px")("bottom",n.fixedInViewport?n.fixedBottomGap:null,"px"),k("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side")("mat-sidenav-fixed",n.fixedInViewport))},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[U([{provide:Lt,useExisting:e}]),B],ngContentSelectors:Ct,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(i,n){i&1&&(T(),r(0,"div",1,0),u(2),s())},dependencies:[et],encapsulation:2,changeDetection:0})}return e})(),Ye=(()=>{class e extends zt{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-sidenav-container"]],contentQueries:function(i,n,o){if(i&1&&H(o,yt,5)(o,Rt,5),i&2){let d;x(d=w())&&(n._content=d.first),x(d=w())&&(n._allDrawers=d)}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(i,n){i&2&&k("mat-drawer-container-explicit-backdrop",n._backdropOverride)},exportAs:["matSidenavContainer"],features:[U([{provide:Ft,useExisting:e},{provide:zt,useExisting:e}]),B],ngContentSelectors:ki,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(i,n){i&1&&(T(wi),C(0,yi,1,2,"div",0),u(1),u(2,1),C(3,Ci,2,0,"mat-sidenav-content")),i&2&&(M(n.hasBackdrop?0:-1),m(3),M(n._content?-1:3))},dependencies:[yt],styles:[Mi],encapsulation:2,changeDetection:0})}return e})(),Je=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=G({type:e});static \u0275inj=$({imports:[Et,q,Et]})}return e})();var Oi=["*",[["mat-toolbar-row"]]],Ai=["*","mat-toolbar-row"],Di=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return e})(),ti=(()=>{class e{_elementRef=l(R);_platform=l(W);_document=l(mt);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=f({type:e,selectors:[["mat-toolbar"]],contentQueries:function(i,n,o){if(i&1&&H(o,Di,5),i&2){let d;x(d=w())&&(n._toolbarRows=d)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(i,n){i&2&&(ee(n.color?"mat-"+n.color:""),k("mat-toolbar-multiple-rows",n._toolbarRows.length>0)("mat-toolbar-single-row",n._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:Ai,decls:2,vars:0,template:function(i,n){i&1&&(T(Oi),u(0),u(1,1))},styles:[`.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2,changeDetection:0})}return e})();var ei=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=G({type:e});static \u0275inj=$({imports:[q]})}return e})();var ii=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=G({type:e});static \u0275inj=$({imports:[q]})}return e})();var Ii=["*"],Ei=`.mdc-list {
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
}
.mdc-list:focus {
  outline: none;
}

.mdc-list-item {
  display: flex;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  align-items: stretch;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--mat-list-list-item-container-color, transparent);
  border-radius: var(--mat-list-list-item-container-shape, var(--mat-sys-corner-none));
}
.mdc-list-item.mdc-list-item--selected {
  background-color: var(--mat-list-list-item-selected-container-color);
}
.mdc-list-item:focus {
  outline: 0;
}
.mdc-list-item.mdc-list-item--disabled {
  cursor: auto;
}
.mdc-list-item.mdc-list-item--with-one-line {
  height: var(--mat-list-list-item-one-line-container-height, 48px);
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-two-lines {
  height: var(--mat-list-list-item-two-line-container-height, 64px);
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-three-lines {
  height: var(--mat-list-list-item-three-line-container-height, 88px);
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--selected::before, .mdc-list-item.mdc-list-item--selected:focus::before, .mdc-list-item:not(.mdc-list-item--selected):focus::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  pointer-events: none;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-item__start {
  fill: currentColor;
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-leading-icon-size, 24px);
  height: var(--mat-list-list-item-leading-icon-size, 24px);
  margin-left: 16px;
  margin-right: 32px;
}
[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-left: 32px;
  margin-right: 16px;
}
.mdc-list-item--with-leading-icon:hover .mdc-list-item__start {
  color: var(--mat-list-list-item-hover-leading-icon-color);
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start {
  width: var(--mat-list-list-item-leading-avatar-size, 40px);
  height: var(--mat-list-list-item-leading-avatar-size, 40px);
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start, [dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}

.mdc-list-item__end {
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  font-family: var(--mat-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));
  line-height: var(--mat-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));
  font-size: var(--mat-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));
  font-weight: var(--mat-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));
  letter-spacing: var(--mat-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking));
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-trailing-icon-size, 24px);
  height: var(--mat-list-list-item-trailing-icon-size, 24px);
}
.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end {
  color: var(--mat-list-list-item-hover-trailing-icon-color);
}
.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary));
}

.mdc-list-item__content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  flex: 1;
  pointer-events: none;
}
.mdc-list-item--with-two-lines .mdc-list-item__content, .mdc-list-item--with-three-lines .mdc-list-item__content {
  align-self: stretch;
}

.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--mat-list-list-item-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-list-list-item-label-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-list-list-item-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-list-item:hover .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item:focus .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-focus-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text, .mdc-list-item--with-three-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}

.mdc-list-item__secondary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  color: var(--mat-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));
  font-family: var(--mat-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));
  letter-spacing: var(--mat-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking));
}
.mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-three-lines .mdc-list-item__secondary-text {
  white-space: normal;
  line-height: 20px;
}
.mdc-list-item--with-overline .mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: auto;
}

.mdc-list-item--with-leading-radio.mdc-list-item,
.mdc-list-item--with-leading-checkbox.mdc-list-item,
.mdc-list-item--with-leading-icon.mdc-list-item,
.mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  display: block;
  margin-top: 0;
  line-height: normal;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-trailing-icon.mdc-list-item, [dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item {
  padding-left: 0;
  padding-right: 0;
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 16px;
}

.mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  -webkit-user-select: none;
  user-select: none;
  margin-left: 28px;
  margin-right: 16px;
}
[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 28px;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end {
  display: block;
  line-height: normal;
  align-self: flex-start;
  margin-top: 0;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-leading-radio .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 8px;
  margin-right: 24px;
}
[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,
[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 24px;
  margin-right: 8px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-item--with-trailing-radio.mdc-list-item,
.mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-left: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, [dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-right: 0;
}
.mdc-list-item--with-trailing-radio .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 24px;
  margin-right: 8px;
}
[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,
[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 8px;
  margin-right: 24px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-group__subheader {
  margin: 0.75rem 16px;
}

.mdc-list-item--disabled .mdc-list-item__start,
.mdc-list-item--disabled .mdc-list-item__content,
.mdc-list-item--disabled .mdc-list-item__end {
  opacity: 1;
}
.mdc-list-item--disabled .mdc-list-item__primary-text,
.mdc-list-item--disabled .mdc-list-item__secondary-text {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}
.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-leading-icon-opacity, 0.38);
}
.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-trailing-icon-opacity, 0.38);
}

.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing, [dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing {
  padding-left: 0;
  padding-right: 0;
}

.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface));
}

.mdc-list-item:hover::before {
  background-color: var(--mat-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}

.mdc-list-item.mdc-list-item--disabled::before {
  background-color: var(--mat-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item:focus::before {
  background-color: var(--mat-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item--disabled .mdc-radio,
.mdc-list-item--disabled .mdc-checkbox {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}

.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar {
  border-radius: var(--mat-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));
  background-color: var(--mat-list-list-item-leading-avatar-color, var(--mat-sys-primary-container));
}

.mat-mdc-list-item-icon {
  font-size: var(--mat-list-list-item-leading-icon-size, 24px);
}

@media (forced-colors: active) {
  a.mdc-list-item--activated::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  a.mdc-list-item--activated [dir=rtl]::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-list-base {
  display: block;
}
.mat-mdc-list-base .mdc-list-item__start,
.mat-mdc-list-base .mdc-list-item__end,
.mat-mdc-list-base .mdc-list-item__content {
  pointer-events: auto;
}

.mat-mdc-list-item,
.mat-mdc-list-option {
  width: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),
.mat-mdc-list-option:not(.mat-mdc-list-item-interactive) {
  cursor: default;
}
.mat-mdc-list-item .mat-divider-inset,
.mat-mdc-list-option .mat-divider-inset {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
.mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-left: 72px;
}
[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-right: 72px;
}

.mat-mdc-list-item-interactive::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  content: "";
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-list-item > .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-list-item:focus-visible > .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: normal;
}
.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

mat-action-list button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  text-align: start;
}
mat-action-list button::-moz-focus-inner {
  border: 0;
}

.mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-inline-start: var(--mat-list-list-item-leading-icon-start-space, 16px);
  margin-inline-end: var(--mat-list-list-item-leading-icon-end-space, 16px);
}

.mat-mdc-nav-list .mat-mdc-list-item {
  border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
  --mat-focus-indicator-border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
}
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container));
}
`,Li=["unscopedContent"],zi=["text"],Fi=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],Ri=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var Bi=new J("ListOption"),ji=(()=>{class e{_elementRef=l(R);constructor(){}static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return e})(),Vi=(()=>{class e{_elementRef=l(R);constructor(){}static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return e})(),Ni=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"]})}return e})(),ni=(()=>{class e{_listOption=l(Bi,{optional:!0});constructor(){}_isAlignedAtStart(){return!this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,hostVars:4,hostBindings:function(i,n){i&2&&k("mdc-list-item__start",n._isAlignedAtStart())("mdc-list-item__end",!n._isAlignedAtStart())}})}return e})(),Qi=(()=>{class e extends ni{static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275dir=E({type:e,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[B]})}return e})(),$i=(()=>{class e extends ni{static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275dir=E({type:e,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[B]})}return e})(),Gi=new J("MAT_LIST_CONFIG"),Bt=(()=>{class e{_isNonInteractive=!0;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=D(t)}_disableRipple=!1;get disabled(){return this._disabled()}set disabled(t){this._disabled.set(D(t))}_disabled=P(!1);_defaultOptions=l(Gi,{optional:!0});static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,hostVars:1,hostBindings:function(i,n){i&2&&O("aria-disabled",n.disabled)},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return e})(),Hi=(()=>{class e{_elementRef=l(R);_ngZone=l(tt);_listBase=l(Bt,{optional:!0});_platform=l(W);_hostElement;_isButtonElement;_noopAnimations=ft();_avatars;_icons;set lines(t){this._explicitLines=lt(t,null),this._updateItemLines(!1)}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(t){this._disableRipple=D(t)}_disableRipple=!1;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(t){this._disabled.set(D(t))}_disabled=P(!1);_subscriptions=new Vt;_rippleRenderer=null;_hasUnscopedTextContent=!1;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){l(ue).load(Le);let t=l(Ee,{optional:!0});this.rippleConfig=t||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button")}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(!0)}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents()}_hasIconOrAvatar(){return!!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new Ie(this,this._ngZone,this._hostElement,this._platform,l(at)),this._rippleRenderer.setupTriggerEvents(this._hostElement)}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(ct(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(!1)))})}_updateItemLines(t){if(!this._lines||!this._titles||!this._unscopedContent)return;t&&this._checkDomForUnscopedTextContent();let i=this._explicitLines??this._inferLinesFromContent(),n=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",i<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",i<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",i===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",i===3),this._hasUnscopedTextContent){let o=this._titles.length===0&&i===1;n.classList.toggle("mdc-list-item__primary-text",o),n.classList.toggle("mdc-list-item__secondary-text",!o)}else n.classList.remove("mdc-list-item__primary-text"),n.classList.remove("mdc-list-item__secondary-text")}_inferLinesFromContent(){let t=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(t+=1),t}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(t=>t.nodeType!==t.COMMENT_NODE).some(t=>!!(t.textContent&&t.textContent.trim()))}static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,contentQueries:function(i,n,o){if(i&1&&H(o,Qi,4)(o,$i,4),i&2){let d;x(d=w())&&(n._avatars=d),x(d=w())&&(n._icons=d)}},hostVars:4,hostBindings:function(i,n){i&2&&(O("aria-disabled",n.disabled)("disabled",n._isButtonElement&&n.disabled||null),k("mdc-list-item--disabled",n.disabled))},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return e})();var ai=(()=>{class e extends Hi{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(t){this._activated=D(t)}_activated=!1;_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(i,n,o){if(i&1&&H(o,Vi,5)(o,ji,5)(o,Ni,5),i&2){let d;x(d=w())&&(n._lines=d),x(d=w())&&(n._titles=d),x(d=w())&&(n._meta=d)}},viewQuery:function(i,n){if(i&1&&rt(Li,5)(zi,5),i&2){let o;x(o=w())&&(n._unscopedContent=o.first),x(o=w())&&(n._itemText=o.first)}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(i,n){i&2&&(O("aria-current",n._getAriaCurrent()),k("mdc-list-item--activated",n.activated)("mdc-list-item--with-leading-avatar",n._avatars.length!==0)("mdc-list-item--with-leading-icon",n._icons.length!==0)("mdc-list-item--with-trailing-meta",n._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",n._hasBothLeadingAndTrailing())("_mat-animation-noopable",n._noopAnimations))},inputs:{activated:"activated"},exportAs:["matListItem"],features:[B],ngContentSelectors:Ri,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-focus-indicator"]],template:function(i,n){i&1&&(T(Fi),u(0),r(1,"span",1),u(2,1),u(3,2),r(4,"span",2,0),h("cdkObserveContent",function(){return n._updateItemLines(!0)}),u(6,3),s()(),u(7,4),u(8,5),A(9,"div",3))},dependencies:[ke],encapsulation:2,changeDetection:0})}return e})();var oi=(()=>{class e extends Bt{_isNonInteractive=!1;static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-nav-list"]],hostAttrs:["role","navigation",1,"mat-mdc-nav-list","mat-mdc-list-base","mdc-list"],exportAs:["matNavList"],features:[U([{provide:Bt,useExisting:e}]),B],ngContentSelectors:Ii,decls:1,vars:0,template:function(i,n){i&1&&(T(),u(0))},styles:[Ei],encapsulation:2,changeDetection:0})}return e})();var ri=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=G({type:e});static \u0275inj=$({imports:[ye,ze,Fe,q,ii]})}return e})();var si=(e,a)=>a.route;function qi(e,a){e&1&&(r(0,"div",30),c(1,"Principal"),s())}function Zi(e,a){if(e&1){let t=v();r(0,"a",31),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),r(1,"div",32)(2,"mat-icon"),c(3,"dashboard"),s(),r(4,"span",33),c(5,"Dashboard"),s()()()}}function Ki(e,a){if(e&1){let t=v();r(0,"a",34),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),r(1,"div",32)(2,"mat-icon"),c(3,"groups"),s(),r(4,"span",33),c(5,"Empleados"),s()()()}}function Xi(e,a){if(e&1){let t=v();r(0,"a",35),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),r(1,"div",32)(2,"mat-icon"),c(3,"person"),s(),r(4,"span",33),c(5,"Clientes"),s()()()}}function Yi(e,a){if(e&1){let t=v();r(0,"a",36),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),r(1,"div",32)(2,"mat-icon"),c(3,"description"),s(),r(4,"span",33),c(5,"Contratos"),s()()()}}function Ji(e,a){if(e&1){let t=v();r(0,"a",37),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),r(1,"div",32)(2,"mat-icon"),c(3,"health_and_safety"),s(),r(4,"span",33),c(5,"Salud"),s()()()}}function tn(e,a){if(e&1){let t=v();r(0,"a",38),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),r(1,"div",32)(2,"mat-icon"),c(3,"payments"),s(),r(4,"span",33),c(5,"Movimientos"),s()()()}}function en(e,a){if(e&1){let t=v();r(0,"a",39),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),r(1,"div",32)(2,"mat-icon"),c(3,"school"),s(),r(4,"span",33),c(5,"Alumnos"),s()()()}}function nn(e,a){if(e&1){let t=v();r(0,"div",17)(1,"div",40),A(2,"div",41),r(3,"div")(4,"strong"),c(5,"Gesti\xF3n central"),s(),r(6,"p"),c(7),s()()(),r(8,"button",42),h("click",function(){_(t);let n=p();return b(n.logout())}),r(9,"mat-icon"),c(10,"logout"),s(),r(11,"span"),c(12,"Cerrar sesi\xF3n"),s()()()}if(e&2){let t=p();m(7),L(t.getUserDisplayName(a))}}function an(e,a){if(e&1){let t=v();r(0,"button",42),h("click",function(){_(t);let n=p();return b(n.logout())}),r(1,"mat-icon"),c(2,"logout"),s()()}if(e&2){let t=p();O("aria-label",t.isCollapsed?"Cerrar sesi\xF3n":null)}}function on(e,a){if(e&1){let t=v();r(0,"button",43),h("click",function(){_(t);let n=p();return b(n.toggleSidebar())}),r(1,"mat-icon"),c(2,"menu"),s()()}}function rn(e,a){if(e&1&&A(0,"img",44),e&2){let t=p(),i=p();y("src",i.getUserPicture(t),Yt)("alt",i.getUserDisplayName(t))}}function sn(e,a){if(e&1&&(r(0,"span"),c(1),s()),e&2){let t=p(),i=p();m(),L(i.getUserInitials(t))}}function ln(e,a){if(e&1&&(r(0,"button",27),C(1,rn,1,2,"img",44)(2,sn,2,1,"span"),s()),e&2){let t=p();m(),M(t.getUserPicture(a)?1:2)}}function cn(e,a){if(e&1){let t=v();r(0,"button",55),h("click",function(){let n=_(t).$implicit,o=p(3);return b(o.runCommand(n))}),r(1,"span",56)(2,"mat-icon"),c(3),s()(),r(4,"span")(5,"strong"),c(6),s(),r(7,"small"),c(8),s()(),r(9,"mat-icon"),c(10,"arrow_forward"),s()()}if(e&2){let t=a.$implicit;m(3),L(t.icon),m(3),L(t.label),m(2),L(t.description)}}function dn(e,a){if(e&1&&(r(0,"div",52)(1,"span"),c(2,"Acciones r\xE1pidas"),s(),r(3,"small"),c(4,"Eleg\xED una acci\xF3n o empez\xE1 a escribir"),s()(),r(5,"div",53),pt(6,cn,11,3,"button",54,si),s()),e&2){let t=p(2);m(6),ht(t.quickCommands())}}function mn(e,a){e&1&&(r(0,"div",50)(1,"mat-icon"),c(2,"keyboard"),s(),r(3,"p"),c(4,"Escrib\xED al menos dos caracteres."),s()())}function pn(e,a){e&1&&(r(0,"div",50)(1,"mat-icon",57),c(2,"progress_activity"),s(),r(3,"p"),c(4,"Buscando en el sistema..."),s()())}function hn(e,a){if(e&1){let t=v();r(0,"button",55),h("click",function(){let n=_(t).$implicit,o=p(3);return b(o.runCommand(n))}),r(1,"span",56)(2,"mat-icon"),c(3),s()(),r(4,"span")(5,"strong"),c(6),s(),r(7,"small"),c(8),s()(),r(9,"mat-icon"),c(10,"arrow_forward"),s()()}if(e&2){let t=a.$implicit;m(3),L(t.icon),m(3),L(t.label),m(2),ie("",t.group," \xB7 ",t.description)}}function gn(e,a){if(e&1&&(r(0,"div",51),pt(1,hn,11,4,"button",54,si),s()),e&2){let t=p(2);m(),ht(t.commandResults())}}function un(e,a){e&1&&(r(0,"div",50)(1,"mat-icon"),c(2,"search_off"),s(),r(3,"strong"),c(4,"Sin resultados"),s(),r(5,"p"),c(6,"Prob\xE1 con nombre, apellido, DNI o t\xEDtulo."),s()())}function _n(e,a){if(e&1){let t=v();r(0,"div",45),h("click",function(){_(t);let n=p();return b(n.closeCommandPalette())}),r(1,"section",46),h("click",function(n){return n.stopPropagation()}),r(2,"header")(3,"mat-icon"),c(4,"search"),s(),A(5,"input",47),r(6,"button",48),h("click",function(){_(t);let n=p();return b(n.closeCommandPalette())}),r(7,"mat-icon"),c(8,"close"),s()()(),r(9,"div",49),C(10,dn,8,0)(11,mn,5,0,"div",50)(12,pn,5,0,"div",50)(13,gn,3,0,"div",51)(14,un,7,0,"div",50),s(),r(15,"footer")(16,"span")(17,"kbd"),c(18,"Ctrl"),s(),r(19,"kbd"),c(20,"K"),s(),c(21," para abrir"),s(),r(22,"span")(23,"kbd"),c(24,"Esc"),s(),c(25," para cerrar"),s()()()()}if(e&2){let t=p();m(5),y("formControl",t.commandQuery),m(5),M(t.commandQuery.value.trim()?t.commandQuery.value.trim().length<2?11:t.commandSearching()?12:t.commandResults().length?13:14:10)}}var Mt=class e{router=l(bt);breakpointObserver=l(we);roleService=l(qe);auth=l(vt);profileService=l(Ze);clientsService=l(Ke);platformService=l(Xe);commandQueryChanges=new S;isSuperAdmin$=this.roleService.hasRole("SuperAdmin");isAdminOrSuperAdmin$=this.roleService.hasAnyRole(["SuperAdmin","Admin"]);user$=this.auth.user$;currentProfile=P(null);commandQuery=new Ae("",{nonNullable:!0});commandOpen=P(!1);commandSearching=P(!1);commandResults=P([]);isSuperAdmin=P(!1);quickCommands=ne(()=>[{icon:"person_add",label:"Nuevo alumno",description:"Abrir alta de alumnos",route:"/clients/new",group:"Acciones"},...this.isSuperAdmin()?[{icon:"payments",label:"Registrar pago",description:"Cargar un nuevo cobro",route:"/movements/payments/new",group:"Acciones"},{icon:"add_circle",label:"Nuevo ejercicio",description:"Crear ejercicio del gimnasio",route:"/student-platform/exercises/new",group:"Acciones"},{icon:"fitness_center",label:"Nuevo workout",description:"Armar una rutina reutilizable",route:"/student-platform/routines/new",group:"Acciones"},{icon:"assignment_add",label:"Nuevo plan",description:"Crear un plan de entrenamiento",route:"/student-platform/training-plans/new",group:"Acciones"},{icon:"description",label:"Contratos pendientes",description:"Revisar seguimiento contractual",route:"/contracts",group:"Acciones"}]:[]]);isCollapsed=!0;isMobile=!1;isMobileSidebarOpen=!1;employeesMenuOpen=!1;clientsMenuOpen=!1;movementsMenuOpen=!1;isDarkTheme=!1;constructor(){this.initTheme(),this.initCommandSearch(),this.isSuperAdmin$.subscribe(a=>this.isSuperAdmin.set(a)),this.breakpointObserver.observe("(max-width: 1024px)").subscribe(({matches:a})=>{if(this.isMobile=a,a){this.isCollapsed=!1,this.isMobileSidebarOpen=!1,this.syncLayout();return}this.isCollapsed=!0,this.isMobileSidebarOpen=!1,this.syncLayout()}),this.router.events.subscribe(a=>{a instanceof me&&(this.loadCurrentProfile(),this.syncLayout())}),this.loadCurrentProfile()}get isEmployeesSectionActive(){return this.router.url.startsWith("/employees")}get isClientsSectionActive(){return this.router.url.startsWith("/clients")||this.router.url.startsWith("/membership-plans")}get isHealthSectionActive(){return this.router.url.startsWith("/health")}get isMovementsSectionActive(){return this.router.url.startsWith("/movements")}toggleSidebar(){if(this.isMobile){this.isMobileSidebarOpen=!this.isMobileSidebarOpen,this.syncLayout();return}this.isCollapsed=!this.isCollapsed,this.syncLayout()}toggleEmployeesMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.employeesMenuOpen=!this.employeesMenuOpen}toggleClientsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.clientsMenuOpen=!this.clientsMenuOpen}toggleMovementsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.movementsMenuOpen=!this.movementsMenuOpen}closeSidebarOnMobile(){this.isMobile&&(this.isMobileSidebarOpen=!1,this.syncLayout())}toggleTheme(){this.isDarkTheme=!this.isDarkTheme,this.applyTheme()}handleGlobalShortcut(a){(a.ctrlKey||a.metaKey)&&a.key.toLowerCase()==="k"?(a.preventDefault(),this.openCommandPalette()):a.key==="Escape"&&this.commandOpen()&&this.closeCommandPalette()}openCommandPalette(){this.commandOpen.set(!0),document.body.style.overflow="hidden",window.setTimeout(()=>document.querySelector(".global-command-input")?.focus())}closeCommandPalette(){this.commandOpen.set(!1),this.commandQuery.setValue(""),this.commandResults.set([]),document.body.style.overflow=""}runCommand(a){this.closeCommandPalette(),this.router.navigateByUrl(a.route)}logout(){let a=z.auth0.logoutReturnTo||window.location.origin;this.auth.logout({logoutParams:{returnTo:a}})}getUserDisplayName(a){let t=this.currentProfile(),i=`${t?.nombre??""} ${t?.apellido??""}`.trim();if(i)return i;let n=a?.name,o=a?.nickname,d=a?.email;return typeof n=="string"&&n.trim()?n:typeof o=="string"&&o.trim()?o:typeof d=="string"&&d.trim()?d:"usuario"}getUserInitials(a){let t=this.currentProfile();return(`${t?.nombre??""} ${t?.apellido??""}`.trim()||this.getUserDisplayName(a)).split(/[\s@._-]+/).map(d=>d.trim()).filter(Boolean).slice(0,2).map(d=>d[0]?.toUpperCase()).join("")||"U"}getUserPicture(a){let t=this.currentProfile()?.avatarUrl;if(t?.trim())return t;let i=a?.picture;return typeof i=="string"&&i.trim()?i:null}loadCurrentProfile(){this.profileService.getMe().subscribe({next:a=>this.currentProfile.set(a),error:()=>this.currentProfile.set(null)})}syncLayout(){requestAnimationFrame(()=>{window.dispatchEvent(new Event("resize"))})}initTheme(){let a=localStorage.getItem("gym-theme"),t=window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1;this.isDarkTheme=a?a==="dark":t,this.applyTheme()}applyTheme(){document.body.classList.toggle("dark-theme",this.isDarkTheme),localStorage.setItem("gym-theme",this.isDarkTheme?"dark":"light")}initCommandSearch(){this.commandQuery.valueChanges.subscribe(a=>this.commandQueryChanges.next(a)),this.commandQueryChanges.pipe(nt(""),Q(a=>a.trim()),dt(220),Ht(),Ut(a=>{if(a.length<2)return this.commandSearching.set(!1),X([]);this.commandSearching.set(!0);let t=a.toLocaleLowerCase("es"),i=this.clientsService.getPaged(1,6,{search:a}).pipe(K(()=>X({items:[],pageNumber:1,pageSize:6,totalCount:0,totalPages:0})));return this.isSuperAdmin()?$t({clients:i,exercises:this.platformService.getExercises(a).pipe(K(()=>X([]))),routines:this.platformService.getRoutineTemplates().pipe(K(()=>X([]))),plans:this.platformService.getTrainingPlans().pipe(K(()=>X([])))}).pipe(Q(n=>[...n.clients.items.slice(0,6).map(o=>({icon:"person",label:`${o.nombre} ${o.apellido}`,description:`DNI ${o.dni}`,route:`/clients/${o.id}`,group:"Alumnos"})),...n.exercises.slice(0,5).map(o=>({icon:"exercise",label:o.name,description:o.muscleGroup||"Ejercicio",route:`/student-platform/exercises/${o.id}`,group:"Ejercicios"})),...n.routines.filter(o=>`${o.name} ${o.description??""}`.toLocaleLowerCase("es").includes(t)).slice(0,5).map(o=>({icon:"fitness_center",label:o.name,description:`${o.exercises.length} ejercicios`,route:`/student-platform/routines/${o.id}`,group:"Workouts"})),...n.plans.filter(o=>`${o.name} ${o.description??""}`.toLocaleLowerCase("es").includes(t)).slice(0,5).map(o=>({icon:"assignment",label:o.name,description:`${o.workoutCount} workouts`,route:`/student-platform/training-plans/${o.id}`,group:"Planes"}))])):i.pipe(Q(n=>n.items.slice(0,6).map(o=>({icon:"person",label:`${o.nombre} ${o.apellido}`,description:`DNI ${o.dni}`,route:`/clients/${o.id}`,group:"Alumnos"}))))})).subscribe(a=>{this.commandResults.set(a),this.commandSearching.set(!1)})}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=f({type:e,selectors:[["app-shell"]],hostBindings:function(t,i){t&1&&h("keydown",function(o){return i.handleGlobalShortcut(o)},Jt)},decls:52,vars:39,consts:[["autosize","",1,"app-container"],[1,"app-sidenav",3,"mode","opened"],[1,"sidebar-content"],[1,"sidebar-header"],[1,"brand"],["src","images/gymLogo.png","alt","Gym Admin","width","160","height","56",1,"brand-logo"],["mat-icon-button","","type","button",1,"collapse-button",3,"click"],["class","sidebar-section-label",4,"ngIf"],[1,"nav-list"],["mat-list-item","","routerLink","/dashboard","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/clients","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/contracts","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/health","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/movements","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/student-platform","routerLinkActive","active-link",3,"click",4,"ngIf"],[1,"sidebar-footer"],[1,"sidebar-session-card"],["mat-stroked-button","","type","button",1,"logout-button"],["color","primary",1,"app-toolbar"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button"],[1,"toolbar-brand"],["src","images/gymLogoBlack.png","alt","","width","28","height","28",1,"toolbar-logo"],[1,"toolbar-title"],[1,"toolbar-spacer"],["type","button","aria-label","Abrir b\xFAsqueda global",1,"global-search-trigger",3,"click"],["mat-icon-button","","type","button",1,"theme-toggle-button",3,"click","title"],["type","button","routerLink","/profile","title","Mi perfil","aria-label","Ir a mi perfil",1,"profile-avatar-button"],[1,"app-content"],[1,"command-backdrop"],[1,"sidebar-section-label"],["mat-list-item","","routerLink","/dashboard","routerLinkActive","active-link",3,"click"],[1,"nav-item-content"],[1,"nav-text"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/clients","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/contracts","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/health","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/movements","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/student-platform","routerLinkActive","active-link",3,"click"],[1,"session-heading"],[1,"footer-dot"],["mat-stroked-button","","type","button",1,"logout-button",3,"click"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button",3,"click"],[3,"src","alt"],[1,"command-backdrop",3,"click"],["role","dialog","aria-modal","true","aria-label","B\xFAsqueda global",1,"command-palette",3,"click"],["type","search","placeholder","Buscar en el sistema...","aria-label","B\xFAsqueda global",1,"global-command-input",3,"formControl"],["mat-icon-button","","type","button","aria-label","Cerrar b\xFAsqueda",3,"click"],[1,"command-content"],[1,"command-empty"],[1,"command-list","results"],[1,"command-heading"],[1,"command-list"],["type","button"],["type","button",3,"click"],[1,"command-icon"],[1,"spin"]],template:function(t,i){if(t&1&&(r(0,"mat-sidenav-container",0)(1,"mat-sidenav",1)(2,"div",2)(3,"div",3)(4,"div",4),A(5,"img",5),s(),r(6,"button",6),h("click",function(){return i.toggleSidebar()}),r(7,"mat-icon"),c(8),s()()(),j(9,qi,2,0,"div",7),r(10,"mat-nav-list",8),j(11,Zi,6,0,"a",9),V(12,"async"),j(13,Ki,6,0,"a",10),V(14,"async"),j(15,Xi,6,0,"a",11),V(16,"async"),j(17,Yi,6,0,"a",12),V(18,"async"),j(19,Ji,6,0,"a",13),V(20,"async"),j(21,tn,6,0,"a",14),V(22,"async"),j(23,en,6,0,"a",15),V(24,"async"),s(),r(25,"div",16),C(26,nn,13,1,"div",17),V(27,"async"),te(28,an,3,1,"button",18),s()()(),r(29,"mat-sidenav-content")(30,"mat-toolbar",19),C(31,on,3,0,"button",20),r(32,"div",21),A(33,"img",22),r(34,"span",23),c(35,"Sistema de Gesti\xF3n de Gimnasio"),s()(),A(36,"span",24),r(37,"button",25),h("click",function(){return i.openCommandPalette()}),r(38,"mat-icon"),c(39,"search"),s(),r(40,"span"),c(41,"Buscar en el sistema"),s(),r(42,"kbd"),c(43,"Ctrl K"),s()(),r(44,"button",26),h("click",function(){return i.toggleTheme()}),r(45,"mat-icon"),c(46),s()(),C(47,ln,3,1,"button",27),V(48,"async"),s(),r(49,"main",28),A(50,"router-outlet"),s()()(),C(51,_n,26,2,"div",29)),t&2){let n,o;m(),k("collapsed",i.isCollapsed),y("mode",i.isMobile?"over":"side")("opened",i.isMobile?i.isMobileSidebarOpen:!0),m(5),O("aria-label",i.isMobile?"Cerrar menu lateral":"Colapsar menu lateral"),m(2),L(i.isMobile?"close":"menu"),m(),y("ngIf",!i.isCollapsed),m(2),y("ngIf",N(12,21,i.isSuperAdmin$)),m(2),y("ngIf",N(14,23,i.isSuperAdmin$)),m(2),y("ngIf",N(16,25,i.isAdminOrSuperAdmin$)),m(2),y("ngIf",N(18,27,i.isSuperAdmin$)),m(2),y("ngIf",N(20,29,i.isAdminOrSuperAdmin$)),m(2),y("ngIf",N(22,31,i.isSuperAdmin$)),m(2),y("ngIf",N(24,33,i.isSuperAdmin$)),m(3),M((n=!i.isCollapsed&&N(27,35,i.user$))?26:28,n),m(5),M(i.isMobile?31:-1),m(13),y("title",i.isDarkTheme?"Cambiar a modo claro":"Cambiar a modo oscuro"),O("aria-label",i.isDarkTheme?"Cambiar a modo claro":"Cambiar a modo oscuro"),m(2),L(i.isDarkTheme?"light_mode":"dark_mode"),m(),M((o=N(48,37,i.user$))?47:-1,o),m(4),M(i.commandOpen()?51:-1)}},dependencies:[re,ae,Te,Pe,Oe,De,_t,pe,he,Je,Rt,Ye,yt,ei,ti,ri,oi,ai,He,Ge,je,Be,Re,oe],styles:[".app-container[_ngcontent-%COMP%]{height:100dvh;background:var(--app-bg)}.global-search-trigger[_ngcontent-%COMP%]{align-items:center;background:var(--app-surface-muted);border:1px solid var(--app-border);border-radius:8px;color:var(--app-text-muted);cursor:pointer;display:flex;gap:.45rem;min-height:38px;padding:0 .65rem}.global-search-trigger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.78rem}.global-search-trigger[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%], .command-palette[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{background:var(--app-surface);border:1px solid var(--app-border);border-radius:4px;color:var(--app-text-soft);font-size:.65rem;padding:.12rem .3rem}.command-backdrop[_ngcontent-%COMP%]{align-items:flex-start;background:#00000094;display:flex;inset:0;justify-content:center;padding:min(12dvh,100px) .5rem .5rem;position:fixed;z-index:2000;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.command-palette[_ngcontent-%COMP%]{background:var(--app-surface);border:1px solid var(--app-border);border-radius:12px;box-shadow:0 24px 80px #00000061;color:var(--app-text);max-width:720px;min-height:460px;overflow:hidden;width:100%}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{align-items:center;border-bottom:1px solid var(--app-border);display:grid;gap:.75rem;grid-template-columns:auto 1fr auto;min-height:66px;padding:0 1rem}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:var(--app-text-muted)}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;border:0;color:var(--app-text);font-size:1rem;min-width:0;outline:0;width:100%}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:var(--app-text-soft)}.command-content[_ngcontent-%COMP%]{max-height:min(60dvh,580px);overflow:auto;padding:.75rem}.command-heading[_ngcontent-%COMP%]{align-items:end;display:flex;justify-content:space-between;padding:.35rem .45rem .7rem}.command-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.command-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--app-text-muted)}.command-list[_ngcontent-%COMP%]{display:grid;gap:.3rem}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{align-items:center;background:transparent;border:1px solid transparent;border-radius:8px;color:inherit;cursor:pointer;display:grid;gap:.7rem;grid-template-columns:42px 1fr auto;min-height:60px;padding:.55rem .65rem;text-align:left;width:100%}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible{background:var(--app-surface-muted);border-color:var(--app-border);outline:0}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:nth-child(2){min-width:0}.command-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .command-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.command-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--app-text-muted);margin-top:.15rem}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:var(--app-text-soft)}.command-icon[_ngcontent-%COMP%]{align-items:center;background:var(--app-accent-soft);border-radius:8px;color:var(--app-accent);display:flex;height:42px;justify-content:center;width:42px}.command-empty[_ngcontent-%COMP%]{align-items:center;color:var(--app-text-muted);display:flex;flex-direction:column;min-height:260px;justify-content:center;text-align:center}.command-empty[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{font-size:42px;height:42px;width:42px}.command-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.35rem 0}.command-palette[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{align-items:center;border-top:1px solid var(--app-border);color:var(--app-text-muted);display:flex;font-size:.72rem;justify-content:space-between;min-height:46px;padding:0 1rem}.spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_command-spin 1s linear infinite}@keyframes _ngcontent-%COMP%_command-spin{to{transform:rotate(360deg)}}@media(max-width:700px){.global-search-trigger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .global-search-trigger[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{display:none}.global-search-trigger[_ngcontent-%COMP%]{border:0;padding:0;width:40px;justify-content:center}.command-backdrop[_ngcontent-%COMP%]{padding:.5rem}.command-palette[_ngcontent-%COMP%]{border-radius:10px;min-height:calc(100dvh - 1rem)}.command-content[_ngcontent-%COMP%]{max-height:calc(100dvh - 114px)}.command-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .command-palette[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{display:none}}.app-sidenav[_ngcontent-%COMP%]{width:260px;transition:width .2s ease;overflow:hidden;border-right:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,#0f0f10,#19191c);color:#fff;box-shadow:inset -1px 0 #ffffff0a}.app-sidenav.collapsed[_ngcontent-%COMP%]{width:80px}.sidebar-content[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;gap:1rem;padding:1rem .875rem;box-sizing:border-box;overflow:hidden}.sidebar-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;min-height:72px;padding:.25rem .35rem .75rem;border-bottom:1px solid rgba(255,255,255,.08)}.brand[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;min-width:0;min-height:130px}.brand-logo[_ngcontent-%COMP%]{display:block;width:min(160px,100%);height:130px;object-fit:contain;object-position:left center}.collapse-button[_ngcontent-%COMP%]{flex-shrink:0;color:#fff;background:#ffffff14;display:inline-grid;height:44px;min-width:44px;place-items:center;width:44px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%]{justify-content:center;padding:.25rem 0}.app-sidenav.collapsed[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{display:none}.sidebar-section-label[_ngcontent-%COMP%]{padding:0 .8rem;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#ffffff70}.nav-list[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;-webkit-overflow-scrolling:touch;padding:.25rem 0}.nav-item-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;width:100%}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]{--mdc-list-list-item-container-shape: 16px;min-height:48px;margin:.2rem 0;color:#ffffffdb}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .nav-text[_ngcontent-%COMP%]{color:#ffffffe6!important}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]:hover, .menu-trigger[_ngcontent-%COMP%]:hover{background:#ffffff12}.nav-list[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444;flex:0 0 24px;font-size:24px;height:24px;line-height:24px;overflow:visible;text-align:center;width:24px}.nav-text[_ngcontent-%COMP%]{white-space:nowrap;font-weight:500}.menu-group[_ngcontent-%COMP%]{margin:.1rem 0}.menu-group.group-active[_ngcontent-%COMP%] > .menu-trigger[_ngcontent-%COMP%]{background:#c1121f29}.menu-trigger[_ngcontent-%COMP%]{width:100%;border:0;background:transparent}.submenu-icon[_ngcontent-%COMP%]{margin-left:auto;transition:transform .2s ease;color:#ffffff80}.submenu-icon.open[_ngcontent-%COMP%]{transform:rotate(180deg)}.submenu[_ngcontent-%COMP%]{margin-top:.1rem;padding-left:.9rem}.submenu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{min-height:42px}.submenu-item-content[_ngcontent-%COMP%]{gap:10px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-item-content[_ngcontent-%COMP%]{justify-content:center;gap:0}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-text[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]   .submenu-icon[_ngcontent-%COMP%]{display:none}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]{border-radius:16px;display:grid;height:48px;margin:.35rem auto;min-height:48px;overflow:visible;place-items:center;width:48px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__content[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%]{display:grid;overflow:visible;place-items:center;width:100%}.active-link[_ngcontent-%COMP%]{background:linear-gradient(90deg,#c1121f3d,#c1121f14);box-shadow:inset 0 0 0 1px #c1121f3d}.sidebar-footer[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;margin-top:auto}.sidebar-session-card[_ngcontent-%COMP%]{display:grid;gap:.85rem;padding:.9rem;border-radius:18px;background:#ffffff0d;border:1px solid rgba(255,255,255,.08)}.session-heading[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.session-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;color:#fff;font-size:.92rem}.session-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.2rem 0 0;color:#ffffffb8;font-size:.92rem;line-height:1.2;overflow-wrap:anywhere}.footer-dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:999px;background:#ef4444;box-shadow:0 0 0 6px #ef444429}.logout-button[_ngcontent-%COMP%]{width:100%;min-height:46px;justify-content:flex-start;border-radius:16px;border-color:#ffffff24!important;background:#ffffff0a;color:#fff!important}.logout-button[_ngcontent-%COMP%]:hover{background:#ef44441f;border-color:#ef444459!important}.logout-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-footer[_ngcontent-%COMP%]{align-items:center}.app-sidenav.collapsed[_ngcontent-%COMP%]   .logout-button[_ngcontent-%COMP%]{width:48px;min-width:48px;padding:0;justify-content:center}.app-toolbar[_ngcontent-%COMP%]{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:.5rem;background:#ffffffeb;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:var(--app-text);box-shadow:inset 0 -1px #12121214}.mobile-menu-button[_ngcontent-%COMP%]{display:none;flex-shrink:0;background:var(--app-accent-soft);color:var(--app-accent)}.toolbar-brand[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.55rem;min-width:0}.toolbar-logo[_ngcontent-%COMP%]{flex-shrink:0;width:28px;height:28px;object-fit:contain}body.dark-theme[_nghost-%COMP%]   .toolbar-logo[_ngcontent-%COMP%], body.dark-theme   [_nghost-%COMP%]   .toolbar-logo[_ngcontent-%COMP%]{filter:invert(1)}.toolbar-title[_ngcontent-%COMP%]{font-weight:700;letter-spacing:-.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.toolbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.theme-toggle-button[_ngcontent-%COMP%]{background:var(--app-accent-soft);color:var(--app-accent);flex:0 0 auto}.profile-avatar-button[_ngcontent-%COMP%]{align-items:center;background:#fff;border:2px solid #fff;border-radius:999px;box-shadow:0 0 0 1px #1212121a,0 10px 24px #1018282e;color:#991b1b;cursor:pointer;display:inline-grid;flex:0 0 42px;font-weight:800;height:42px;justify-content:center;overflow:hidden;padding:0;transition:border-color .16s ease,box-shadow .16s ease,transform .16s ease;width:42px}.profile-avatar-button[_ngcontent-%COMP%]:hover, .profile-avatar-button[_ngcontent-%COMP%]:focus-visible{border-color:#fff;box-shadow:0 0 0 3px #c1121f38,0 14px 30px #c1121f38;outline:0;transform:translateY(-1px)}.profile-avatar-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;object-fit:cover;width:100%}.profile-avatar-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{align-items:center;background:#fff3f2;display:flex;height:100%;justify-content:center;width:100%}.app-content[_ngcontent-%COMP%]{padding:1.5rem;background:radial-gradient(circle at top right,rgba(193,18,31,.1),transparent 22%),linear-gradient(180deg,#f6f6f7,#fff);min-height:calc(100dvh - 64px);box-sizing:border-box}@media(max-width:1024px){.app-sidenav[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]{width:min(86vw,320px)}.sidebar-content[_ngcontent-%COMP%]{padding:.9rem .75rem}.sidebar-header[_ngcontent-%COMP%]{min-height:64px}.mobile-menu-button[_ngcontent-%COMP%]{display:inline-flex}.toolbar-title[_ngcontent-%COMP%]{font-size:.95rem;line-height:1.25}.toolbar-logo[_ngcontent-%COMP%]{width:24px;height:24px}.app-content[_ngcontent-%COMP%]{padding:1rem;min-height:calc(100dvh - 56px)}}"]})};var g=e=>{let a=l(vt),t=l(bt),i=e.data.roles??[];return Qt([a.isAuthenticated$,a.user$]).pipe(Q(([n,o])=>{if(!n)return t.createUrlTree(["/login"]);if(i.length===0)return!0;let d=Ue(o);return We(d,i)?!0:t.createUrlTree(["/sin-acceso"])}))};var li=[{path:"body-map-calibrator",loadComponent:()=>import("./chunk-6SLOQSBQ.js").then(e=>e.BodyMapCalibratorPageComponent)},{path:"login",loadComponent:()=>import("./chunk-ZBAANL4M.js").then(e=>e.LoginComponent)},{path:"",component:Mt,canActivate:[Qe],children:[{path:"",redirectTo:"clients",pathMatch:"full"},{path:"sin-acceso",loadComponent:()=>import("./chunk-DT6LRNV5.js").then(e=>e.AccessDeniedComponent)},{path:"dashboard",loadComponent:()=>import("./chunk-XRLFNACZ.js").then(e=>e.DashboardPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"profile",loadComponent:()=>import("./chunk-YFP7TXQS.js").then(e=>e.ProfilePageComponent)},{path:"employees",loadComponent:()=>import("./chunk-MPLKOEAZ.js").then(e=>e.EmployeesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"employees/categories",loadComponent:()=>import("./chunk-ZWKCHHJB.js").then(e=>e.EmployeeCategoriesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"employees/:id",loadComponent:()=>import("./chunk-7MM3L5OR.js").then(e=>e.EmployeeDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"clients",loadComponent:()=>import("./chunk-S7MKZCTN.js").then(e=>e.ClientsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"clients/new",loadComponent:()=>import("./chunk-WKIQUFUU.js").then(e=>e.ClientDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"clients/:id",loadComponent:()=>import("./chunk-WKIQUFUU.js").then(e=>e.ClientDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"contracts",loadComponent:()=>import("./chunk-NOFDBBPU.js").then(e=>e.ContractsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"contracts/:id/sign",loadComponent:()=>import("./chunk-HRIYFDVX.js").then(e=>e.ContractSignaturePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"health/patients/:id",loadComponent:()=>import("./chunk-P5HVW2BU.js").then(e=>e.HealthPatientDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"health",loadComponent:()=>import("./chunk-FRV34KOR.js").then(e=>e.HealthPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"membership-plans",loadComponent:()=>import("./chunk-R4KATVQF.js").then(e=>e.MembershipPlansPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"movements",loadComponent:()=>import("./chunk-YW3RQELH.js").then(e=>e.MovementsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"movements/payments/new",loadComponent:()=>import("./chunk-7TW5WE7Z.js").then(e=>e.PaymentRegisterPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"movements/categories",loadComponent:()=>import("./chunk-KSKUF3EA.js").then(e=>e.CashMovementCategoriesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/routines/new",loadComponent:()=>import("./chunk-YCKAM24X.js").then(e=>e.RoutineCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/routines/:id",loadComponent:()=>import("./chunk-OB7FOQBJ.js").then(e=>e.WorkoutDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/training-plans/new",loadComponent:()=>import("./chunk-TRIGN4NY.js").then(e=>e.TrainingPlanCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/training-plans/:id",loadComponent:()=>import("./chunk-2CMLTEVX.js").then(e=>e.TrainingPlanDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/exercises/new",loadComponent:()=>import("./chunk-VQC3B737.js").then(e=>e.ExerciseCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/exercises/:id",loadComponent:()=>import("./chunk-VQC3B737.js").then(e=>e.ExerciseCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform",loadComponent:()=>import("./chunk-MATEIPKW.js").then(e=>e.StudentPlatformPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}}]}];var St=class e extends wt{itemsPerPageLabel="Filas por p\xE1gina";nextPageLabel="P\xE1gina siguiente";previousPageLabel="P\xE1gina anterior";firstPageLabel="Primera p\xE1gina";lastPageLabel="\xDAltima p\xE1gina";getRangeLabel=(a,t,i)=>{if(i===0||t===0)return`0 de ${i}`;let n=a*t,o=Math.min(n+t,i);return`${n+1}-${o} de ${i}`};static \u0275fac=(()=>{let a;return function(i){return(a||(a=I(e)))(i||e)}})();static \u0275prov=Y({token:e,factory:e.\u0275fac})};function ci(e){if(!(e instanceof ut))return{title:"Ocurri\xF3 un error",message:"No pudimos completar la operaci\xF3n. Intent\xE1 nuevamente."};if(e.status===0)return{title:"Sin conexi\xF3n con el sistema",message:"No pudimos comunicarnos con el servidor. Revis\xE1 tu conexi\xF3n e intent\xE1 nuevamente."};let a=e.error,t=bn(a),i=Pt(a,"message")||Pt(a,"detail"),n=Pt(a,"title")||wn(e.status),o=Pt(a,"referenceId"),d=t.length>0?t.slice(0,4).join(`
`):i||xn(a)||kn(e.status);return t.length>4&&(d+=`
Y ${t.length-4} observaci\xF3n(es) m\xE1s.`),o&&!d.includes(o)&&e.status>=500&&(d+=`
C\xF3digo: ${o}`),{title:n,message:d}}function bn(e){if(!e||typeof e!="object")return[];let a=e.errors;return Array.isArray(a)?a.map(t=>typeof t=="string"?jt("",t):fn(t)).filter(t=>!!t):a&&typeof a=="object"?Object.entries(a).flatMap(([t,i])=>(Array.isArray(i)?i:[i]).filter(o=>typeof o=="string").map(o=>jt(t,o))):[]}function fn(e){if(!e||typeof e!="object")return null;let a=e;return typeof a.message=="string"?jt(typeof a.field=="string"?a.field:"",a.message):null}function jt(e,a){let t=vn(e),i=a.replace(/^'[^']+'\s*/,"").replace(/must be between (\d+) and (\d+)\.?/i,"debe estar entre $1 y $2.").replace(/must not be empty\.?/i,"es obligatorio.").replace(/must be a valid email address\.?/i,"debe ser un correo v\xE1lido.").replace(/must match[^.]*\.?/i,"debe coincidir con el per\xEDodo seleccionado.");return i=i.charAt(0).toLocaleLowerCase("es-AR")+i.slice(1),t?`${t}: ${i}`:yn(i)}function vn(e){let a=e.replace(/[^a-z0-9]/gi,"").toLowerCase();return{membershipperiodyear:"A\xF1o del per\xEDodo de la membres\xEDa",membershipperiodmonth:"Mes del per\xEDodo de la membres\xEDa",initialpaymentperiodyear:"A\xF1o del per\xEDodo del pago",initialpaymentperiodmonth:"Mes del per\xEDodo del pago",nombre:"Nombre",apellido:"Apellido",dni:"DNI",email:"Correo electr\xF3nico",telefono:"Tel\xE9fono",direccion:"Direcci\xF3n"}[a]??e.replace(/\./g," ")}function Pt(e,a){if(!e||typeof e!="object")return"";let t=e[a];return typeof t=="string"?t.trim():""}function xn(e){return typeof e=="string"&&!e.trimStart().startsWith("<")?e.trim():""}function wn(e){return e===400||e===422?"Revis\xE1 los datos ingresados":e===401?"Tu sesi\xF3n venci\xF3":e===403?"No ten\xE9s permiso para esta acci\xF3n":e===404?"No encontramos el dato solicitado":e===409?"La informaci\xF3n entr\xF3 en conflicto":e>=500?"El servidor no pudo completar la operaci\xF3n":"No se pudo completar"}function kn(e){return e===400||e===422?"Hay datos incorrectos o incompletos. Revisalos e intent\xE1 nuevamente.":e===401?"Volv\xE9 a iniciar sesi\xF3n para continuar.":e===403?"Tu usuario no tiene autorizaci\xF3n para realizar esta operaci\xF3n.":e===404?"El registro pudo haber sido eliminado o ya no estar disponible.":e===409?"Actualiz\xE1 la pantalla y volv\xE9 a intentarlo.":"Intent\xE1 nuevamente. Si el problema contin\xFAa, comunicate con soporte."}function yn(e){return e&&e.charAt(0).toLocaleUpperCase("es-AR")+e.slice(1)}function di(e,a){let t=l(xt),i=t.currentRevision;return e.url.startsWith(z.apiUrl)?a(e).pipe(Wt(o=>{!(o instanceof le)||!Cn(e.method)||queueMicrotask(()=>t.successIfUnchanged(Mn(e.method),i))}),K(o=>{let d=ci(o);return queueMicrotask(()=>t.show(d.message,"error",2e4,d.title)),Nt(()=>o instanceof ut?o:new Error(d.message))})):a(e)}function Cn(e){return e==="POST"||e==="PUT"||e==="PATCH"||e==="DELETE"}function Mn(e){return e==="DELETE"?"El registro se elimin\xF3 correctamente.":e==="POST"?"La informaci\xF3n se guard\xF3 correctamente.":"Los cambios se guardaron correctamente."}var Ot=class e{toast=l(xt);handleError(a){console.error(a),this.toast.show("Ocurri\xF3 un error inesperado en la pantalla. Recarg\xE1 la p\xE1gina e intent\xE1 nuevamente.","error",2e4,"La pantalla encontr\xF3 un problema")}static \u0275fac=function(t){return new(t||e)};static \u0275prov=Y({token:e,factory:e.\u0275fac})};var Sn=z.auth0.redirectUri||`${window.location.origin}/`,mi={providers:[Kt(),ce(de([$e,di])),ge(li),qt(Ve),{provide:Zt,useClass:Ot},{provide:wt,useClass:St},{provide:Se,useValue:{disableClose:!0}},Ne({domain:z.auth0.domain,clientId:z.auth0.clientId,authorizationParams:{redirect_uri:Sn,audience:z.auth0.audience},httpInterceptor:{allowedList:[{uri:`${z.apiUrl}/api/*`,tokenOptions:{authorizationParams:{audience:z.auth0.audience}}}]}})]};var At=class e{title=P("gym-management-frontend");static \u0275fac=function(t){return new(t||e)};static \u0275cmp=f({type:e,selectors:[["app-root"]],decls:1,vars:0,template:function(t,i){t&1&&A(0,"router-outlet")},dependencies:[_t],encapsulation:2})};se(At,mi).catch(e=>console.error(e));
