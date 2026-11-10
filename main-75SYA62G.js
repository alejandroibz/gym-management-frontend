import{c as Vt,d as jt,e as Nt}from"./chunk-LS7VYJ3T.js";import{c as Zt}from"./chunk-FJATUFZT.js";import"./chunk-QAHKEQR6.js";import{c as kt}from"./chunk-T6DR5Q2Q.js";import{a as _e}from"./chunk-2ZUGCBN3.js";import{a as qt}from"./chunk-6V2JVVCQ.js";import{a as Wt}from"./chunk-VUQV4CPJ.js";import{c as Qt}from"./chunk-WPQOUWOP.js";import{a as zt,b as be}from"./chunk-L526RK2G.js";import"./chunk-WMMMG3WL.js";import"./chunk-X4JOZIDO.js";import{a as Rt}from"./chunk-XDETTL4C.js";import"./chunk-OXPKHVU4.js";import{a as _t,b as W,c as bt,d as Be}from"./chunk-SAKSPL32.js";import{C as Dt,c as St,g as Pt,j as At,o as Ot}from"./chunk-L5B2PCE7.js";import{a as Ut,b as Ht}from"./chunk-ZLR7ZJZ5.js";import{a as fe,b as Lt,c as Bt,d as Ft}from"./chunk-OZKB2LTE.js";import{f as N,j as Mt,q as Tt,r as Et,s as It}from"./chunk-DWYIEQAO.js";import{G as $t,H as Gt,a as Q,g as Le,i as ft,j as he,l as vt,p as Ct,t as wt,w as xt,x as yt}from"./chunk-XXVDMYGL.js";import{a as pt,c as ge,d as V,e as ut,f as gt,g as ht}from"./chunk-6IC2ZXTO.js";import{a as st,e as lt,f as te,g as ct,h as dt,i as mt,l as y}from"./chunk-EE63LP47.js";import{$b as u,Aa as E,B as Ue,Bc as H,C as Z,E as L,Ea as G,G as ae,Ga as U,Gb as j,Gc as v,H as oe,Ha as Ke,Hc as C,I as De,Ib as S,Jb as et,K as He,Kb as P,Nb as de,Ob as me,Pb as b,Qb as o,Qc as it,Rb as s,Sb as D,U as K,V as re,W as T,Xc as ue,Y as Qe,Zb as _,a as Pe,b as Ae,bc as p,ca as $,cb as Ye,cc as B,da as Y,db as m,dc as x,ec as ee,fa as Te,fc as ze,g as k,gc as F,ha as c,hc as R,ib as Ie,ja as We,lb as Je,ld as at,m as z,mc as pe,n as Oe,na as h,nc as A,nd as ot,oa as f,oc as tt,pc as l,qc as I,r as O,ra as Ee,rd as rt,s as $e,sa as se,sb as w,sc as nt,tb as J,ub as Xe,va as le,wa as ce,wb as X,x as Ge,xa as qe,xb as M,za as Ze}from"./chunk-RQQQOGFW.js";var ve=(()=>{class t{changes=new k;itemsPerPageLabel="Items per page:";nextPageLabel="Next page";previousPageLabel="Previous page";firstPageLabel="First page";lastPageLabel="Last page";getRangeLabel=(e,n,i)=>{if(i==0||n==0)return`0 of ${i}`;i=Math.max(i,0);let r=e*n,d=r<i?Math.min(r+n,i):r+n;return`${r+1} \u2013 ${d} of ${i}`};static \u0275fac=function(n){return new(n||t)};static \u0275prov=$({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var xe=["*"],cn=["content"],dn=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],mn=["mat-drawer","mat-drawer-content","*"];function pn(t,a){if(t&1){let e=_();o(0,"div",1),u("click",function(){h(e);let i=p();return f(i._onBackdropClicked())}),s()}if(t&2){let e=p();A("mat-drawer-shown",e._isShowingBackdrop())}}function un(t,a){t&1&&(o(0,"mat-drawer-content"),x(1,2),s())}var gn=[[["mat-sidenav"]],[["mat-sidenav-content"]],"*"],hn=["mat-sidenav","mat-sidenav-content","*"];function fn(t,a){if(t&1){let e=_();o(0,"div",1),u("click",function(){h(e);let i=p();return f(i._onBackdropClicked())}),s()}if(t&2){let e=p();A("mat-drawer-shown",e._isShowingBackdrop())}}function _n(t,a){t&1&&(o(0,"mat-sidenav-content"),x(1,2),s())}var bn=`.mat-drawer-container {
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
`;var vn=new Te("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),Ve=new Te("MAT_DRAWER_CONTAINER"),Ce=(()=>{class t extends W{_platform=c(Q);_changeDetectorRef=c(ue);_container=c(Re);constructor(){let e=c(U),n=c(_t),i=c(ce);super(e,n,i)}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:e,end:n}=this._container;return e!=null&&e.mode!=="over"&&e.opened||n!=null&&n.mode!=="over"&&n.opened}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=w({type:t,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(n,i){n&2&&(pe("margin-left",i._container._contentMargins.left,"px")("margin-right",i._container._contentMargins.right,"px"),A("mat-drawer-content-hidden",i._shouldBeHidden()))},features:[H([{provide:W,useExisting:t}]),X],ngContentSelectors:xe,decls:1,vars:0,template:function(n,i){n&1&&(B(),x(0))},encapsulation:2,changeDetection:0})}return t})(),Fe=(()=>{class t{_elementRef=c(U);_focusTrapFactory=c(yt);_focusMonitor=c(Ct);_platform=c(Q);_ngZone=c(ce);_renderer=c(Je);_interactivityChecker=c(xt);_doc=c(se);_container=c(Ve,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=N(e)}_disableClose=!1;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=N(e)),this._autoFocus=e}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(N(e))}_opened=E(!1);_openedVia=null;_animationStarted=new k;_animationEnd=new k;openedChange=new le(!0);_openedStream=this.openedChange.pipe(Z(e=>e),O(()=>{}));openedStart=this._animationStarted.pipe(Z(()=>this.opened),De(void 0));_closedStream=this.openedChange.pipe(Z(e=>!e),O(()=>{}));closedStart=this._animationStarted.pipe(Z(()=>!this.opened),De(void 0));_destroyed=new k;onPositionChanged=new le;_content;_modeChanged=new k;_injector=c(Ee);_changeDetectorRef=c(ue);constructor(){this.openedChange.pipe(T(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,n=this._elementRef.nativeElement;return[e.listen(n,"keydown",i=>{i.keyCode===27&&!this.disableClose&&!vt(i)&&this._ngZone.run(()=>{this.close(),i.stopPropagation(),i.preventDefault()})}),e.listen(n,"transitionend",this._handleTransitionEvent),e.listen(n,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_forceFocus(e,n){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{r(),d(),e.removeAttribute("tabindex")},r=this._renderer.listen(e,"blur",i),d=this._renderer.listen(e,"mousedown",i)})),e.focus(n)}_focusByCssSelector(e,n){let i=this._elementRef.nativeElement.querySelector(e);i&&this._forceFocus(i,n)}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":Ie(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,n){e&&n&&(this._openedVia=n);let i=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),i}_setOpen(e,n,i){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&n&&this._restoreFocus(i),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(r=>{this.openedChange.pipe(oe(1)).subscribe(d=>r(d?"open":"close"))}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let n=this._elementRef.nativeElement,i=n.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),i.insertBefore(this._anchor,n)),i.appendChild(n)):this._anchor&&this._anchor.parentNode.insertBefore(n,this._anchor)}_handleTransitionEvent=e=>{let n=this._elementRef.nativeElement;e.target===n&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(e)})};static \u0275fac=function(n){return new(n||t)};static \u0275cmp=w({type:t,selectors:[["mat-drawer"]],viewQuery:function(n,i){if(n&1&&ze(cn,5),n&2){let r;F(r=R())&&(i._content=r.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(n,i){n&2&&(j("align",null)("tabIndex",i.mode!=="side"?"-1":null),pe("visibility",!i._container&&!i.opened?"hidden":null),A("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:xe,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(n,i){n&1&&(B(),o(0,"div",1,0),x(2),s())},dependencies:[W],encapsulation:2,changeDetection:0})}return t})(),Re=(()=>{class t{_dir=c(ft,{optional:!0});_element=c(U);_ngZone=c(ce);_changeDetectorRef=c(ue);_animationDisabled=Mt();_transitionsEnabled=!1;_allDrawers;_drawers=new Ke;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=N(e)}_autosize=c(vn);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:N(e)}_backdropOverride=null;backdropClick=new le;_start=null;_end=null;_left=null;_right=null;_destroyed=new k;_doCheckSubject=new k;_contentMargins={left:null,right:null};_contentMarginChanges=new k;get scrollable(){return this._userContent||this._content}_injector=c(Ee);constructor(){let e=c(Q),n=c(bt);this._dir?.change.pipe(T(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),n.change().pipe(T(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(K(this._allDrawers),T(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(n=>!n._container||n._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(K(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(ae(10),T(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,n=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let i=this._left._getWidth();e+=i,n-=i}}if(this._right&&this._right.opened){if(this._right.mode=="side")n+=this._right._getWidth();else if(this._right.mode=="push"){let i=this._right._getWidth();n+=i,e-=i}}e=e||null,n=n||null,(e!==this._contentMargins.left||n!==this._contentMargins.right)&&(this._contentMargins={left:e,right:n},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(T(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(T(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e.onPositionChanged.pipe(T(this._drawers.changes)).subscribe(()=>{Ie({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(e){e._modeChanged.pipe(T(Ue(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let n=this._element.nativeElement.classList,i="mat-drawer-container-has-open";e?n.add(i):n.remove(i)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=w({type:t,selectors:[["mat-drawer-container"]],contentQueries:function(n,i,r){if(n&1&&ee(r,Ce,5)(r,Fe,5),n&2){let d;F(d=R())&&(i._content=d.first),F(d=R())&&(i._allDrawers=d)}},viewQuery:function(n,i){if(n&1&&ze(Ce,5),n&2){let r;F(r=R())&&(i._userContent=r.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(n,i){n&2&&A("mat-drawer-container-explicit-backdrop",i._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[H([{provide:Ve,useExisting:t}])],ngContentSelectors:mn,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(n,i){n&1&&(B(dn),S(0,pn,1,2,"div",0),x(1),x(2,1),S(3,un,2,0,"mat-drawer-content")),n&2&&(P(i.hasBackdrop?0:-1),m(3),P(i._content?-1:3))},dependencies:[Ce],styles:[`.mat-drawer-container {
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
`],encapsulation:2,changeDetection:0})}return t})(),we=(()=>{class t extends Ce{static \u0275fac=(()=>{let e;return function(i){return(e||(e=G(t)))(i||t)}})();static \u0275cmp=w({type:t,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[H([{provide:W,useExisting:t}]),X],ngContentSelectors:xe,decls:1,vars:0,template:function(n,i){n&1&&(B(),x(0))},encapsulation:2,changeDetection:0})}return t})(),je=(()=>{class t extends Fe{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(e){this._fixedInViewport=N(e)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(e){this._fixedTopGap=Le(e)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(e){this._fixedBottomGap=Le(e)}_fixedBottomGap=0;static \u0275fac=(()=>{let e;return function(i){return(e||(e=G(t)))(i||t)}})();static \u0275cmp=w({type:t,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(n,i){n&2&&(j("tabIndex",i.mode!=="side"?"-1":null)("align",null),pe("top",i.fixedInViewport?i.fixedTopGap:null,"px")("bottom",i.fixedInViewport?i.fixedBottomGap:null,"px"),A("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side")("mat-sidenav-fixed",i.fixedInViewport))},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[H([{provide:Fe,useExisting:t}]),X],ngContentSelectors:xe,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(n,i){n&1&&(B(),o(0,"div",1,0),x(2),s())},dependencies:[W],encapsulation:2,changeDetection:0})}return t})(),Kt=(()=>{class t extends Re{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let e;return function(i){return(e||(e=G(t)))(i||t)}})();static \u0275cmp=w({type:t,selectors:[["mat-sidenav-container"]],contentQueries:function(n,i,r){if(n&1&&ee(r,we,5)(r,je,5),n&2){let d;F(d=R())&&(i._content=d.first),F(d=R())&&(i._allDrawers=d)}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(n,i){n&2&&A("mat-drawer-container-explicit-backdrop",i._backdropOverride)},exportAs:["matSidenavContainer"],features:[H([{provide:Ve,useExisting:t},{provide:Re,useExisting:t}]),X],ngContentSelectors:hn,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(n,i){n&1&&(B(gn),S(0,fn,1,2,"div",0),x(1),x(2,1),S(3,_n,2,0,"mat-sidenav-content")),n&2&&(P(i.hasBackdrop?0:-1),m(3),P(i._content?-1:3))},dependencies:[we],styles:[bn],encapsulation:2,changeDetection:0})}return t})(),Yt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=J({type:t});static \u0275inj=Y({imports:[Be,he,Be]})}return t})();var wn=["*",[["mat-toolbar-row"]]],xn=["*","mat-toolbar-row"],yn=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275dir=Xe({type:t,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return t})(),Jt=(()=>{class t{_elementRef=c(U);_platform=c(Q);_document=c(se);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=w({type:t,selectors:[["mat-toolbar"]],contentQueries:function(n,i,r){if(n&1&&ee(r,yn,5),n&2){let d;F(d=R())&&(i._toolbarRows=d)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(n,i){n&2&&(tt(i.color?"mat-"+i.color:""),A("mat-toolbar-multiple-rows",i._toolbarRows.length>0)("mat-toolbar-single-row",i._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:xn,decls:2,vars:0,template:function(n,i){n&1&&(B(wn),x(0),x(1,1))},styles:[`.mat-toolbar {
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
`],encapsulation:2,changeDetection:0})}return t})();var Xt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=J({type:t});static \u0275inj=Y({imports:[he]})}return t})();var en=(t,a)=>a.route;function Sn(t,a){t&1&&(o(0,"div",33),l(1,"Principal"),s())}function Pn(t,a){if(t&1){let e=_();o(0,"a",34),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"forum"),s(),o(4,"span",36),l(5,"Comunidad"),s()()()}}function An(t,a){if(t&1){let e=_();o(0,"a",37),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"menu_book"),s(),o(4,"span",36),l(5,"Contenidos"),s()()()}}function On(t,a){if(t&1){let e=_();o(0,"a",38),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"verified_user"),s(),o(4,"span",36),l(5,"Mis contratos"),s()()()}}function Dn(t,a){if(t&1){let e=_();o(0,"a",39),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"dashboard"),s(),o(4,"span",36),l(5,"Dashboard"),s()()()}}function Tn(t,a){if(t&1){let e=_();o(0,"a",40),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"groups"),s(),o(4,"span",36),l(5,"Empleados"),s()()()}}function En(t,a){if(t&1){let e=_();o(0,"a",41),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"person"),s(),o(4,"span",36),l(5,"Clientes"),s()()()}}function In(t,a){if(t&1){let e=_();o(0,"a",42),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"calendar_month"),s(),o(4,"span",36),l(5,"Turnos"),s()()()}}function zn(t,a){if(t&1){let e=_();o(0,"a",43),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"description"),s(),o(4,"span",36),l(5,"Contratos"),s()()()}}function Ln(t,a){if(t&1){let e=_();o(0,"a",44),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"health_and_safety"),s(),o(4,"span",36),l(5,"Salud"),s()()()}}function Bn(t,a){if(t&1){let e=_();o(0,"a",45),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"payments"),s(),o(4,"span",36),l(5,"Movimientos"),s()()()}}function Fn(t,a){if(t&1){let e=_();o(0,"a",46),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"school"),s(),o(4,"span",36),l(5,"Alumnos"),s()()()}}function Rn(t,a){if(t&1){let e=_();o(0,"div",21)(1,"div",47),D(2,"div",48),o(3,"div")(4,"strong"),l(5,"Gesti\xF3n central"),s(),o(6,"p"),l(7),s()()(),o(8,"button",49),u("click",function(){h(e);let i=p();return f(i.logout())}),o(9,"mat-icon"),l(10,"logout"),s(),o(11,"span"),l(12,"Cerrar sesi\xF3n"),s()()()}if(t&2){let e=p();m(7),I(e.getUserDisplayName(a))}}function Vn(t,a){if(t&1){let e=_();o(0,"button",49),u("click",function(){h(e);let i=p();return f(i.logout())}),o(1,"mat-icon"),l(2,"logout"),s()()}if(t&2){let e=p();j("aria-label",e.isCollapsed?"Cerrar sesi\xF3n":null)}}function jn(t,a){if(t&1){let e=_();o(0,"button",50),u("click",function(){h(e);let i=p();return f(i.toggleSidebar())}),o(1,"mat-icon"),l(2,"menu"),s()()}}function Nn(t,a){if(t&1&&(o(0,"button",30),D(1,"app-user-avatar",51),s()),t&2){let e=a,n=p();m(),b("seed",n.currentProfile()?n.currentProfile().profileType+":"+n.currentProfile().id:""+e.sub)("src",n.getUserPicture(e))}}function $n(t,a){if(t&1){let e=_();o(0,"button",62),u("click",function(){let i=h(e).$implicit,r=p(3);return f(r.runCommand(i))}),o(1,"span",63)(2,"mat-icon"),l(3),s()(),o(4,"span")(5,"strong"),l(6),s(),o(7,"small"),l(8),s()(),o(9,"mat-icon"),l(10,"arrow_forward"),s()()}if(t&2){let e=a.$implicit;m(3),I(e.icon),m(3),I(e.label),m(2),I(e.description)}}function Gn(t,a){if(t&1&&(o(0,"div",59)(1,"span"),l(2,"Acciones r\xE1pidas"),s(),o(3,"small"),l(4,"Eleg\xED una acci\xF3n o empez\xE1 a escribir"),s()(),o(5,"div",60),de(6,$n,11,3,"button",61,en),s()),t&2){let e=p(2);m(6),me(e.quickCommands())}}function Un(t,a){t&1&&(o(0,"div",57)(1,"mat-icon"),l(2,"keyboard"),s(),o(3,"p"),l(4,"Escrib\xED al menos dos caracteres."),s()())}function Hn(t,a){t&1&&(o(0,"div",57)(1,"mat-icon",64),l(2,"progress_activity"),s(),o(3,"p"),l(4,"Buscando en el sistema..."),s()())}function Qn(t,a){if(t&1){let e=_();o(0,"button",62),u("click",function(){let i=h(e).$implicit,r=p(3);return f(r.runCommand(i))}),o(1,"span",63)(2,"mat-icon"),l(3),s()(),o(4,"span")(5,"strong"),l(6),s(),o(7,"small"),l(8),s()(),o(9,"mat-icon"),l(10,"arrow_forward"),s()()}if(t&2){let e=a.$implicit;m(3),I(e.icon),m(3),I(e.label),m(2),nt("",e.group," \xB7 ",e.description)}}function Wn(t,a){if(t&1&&(o(0,"div",58),de(1,Qn,11,4,"button",61,en),s()),t&2){let e=p(2);m(),me(e.commandResults())}}function qn(t,a){t&1&&(o(0,"div",57)(1,"mat-icon"),l(2,"search_off"),s(),o(3,"strong"),l(4,"Sin resultados"),s(),o(5,"p"),l(6,"Prob\xE1 con nombre, apellido, DNI o t\xEDtulo."),s()())}function Zn(t,a){if(t&1){let e=_();o(0,"div",52),u("click",function(){h(e);let i=p();return f(i.closeCommandPalette())}),o(1,"section",53),u("click",function(i){return i.stopPropagation()}),o(2,"header")(3,"mat-icon"),l(4,"search"),s(),D(5,"input",54),o(6,"button",55),u("click",function(){h(e);let i=p();return f(i.closeCommandPalette())}),o(7,"mat-icon"),l(8,"close"),s()()(),o(9,"div",56),S(10,Gn,8,0)(11,Un,5,0,"div",57)(12,Hn,5,0,"div",57)(13,Wn,3,0,"div",58)(14,qn,7,0,"div",57),s(),o(15,"footer")(16,"span")(17,"kbd"),l(18,"Ctrl"),s(),o(19,"kbd"),l(20,"K"),s(),l(21," para abrir"),s(),o(22,"span")(23,"kbd"),l(24,"Esc"),s(),l(25," para cerrar"),s()()()()}if(t&2){let e=p();m(5),b("formControl",e.commandQuery),m(5),P(e.commandQuery.value.trim()?e.commandQuery.value.trim().length<2?11:e.commandSearching()?12:e.commandResults().length?13:14:10)}}var ye=class t{router=c(V);breakpointObserver=c(wt);roleService=c(_e);auth=c(fe);profileService=c(Wt);clientsService=c(qt);platformService=c(Zt);commandQueryChanges=new k;isSuperAdmin$=this.roleService.hasRole("SuperAdmin");isAdminOrSuperAdmin$=this.roleService.hasAnyRole(["SuperAdmin","Admin"]);user$=this.auth.user$;currentProfile=E(null);commandQuery=new At("",{nonNullable:!0});commandOpen=E(!1);commandSearching=E(!1);commandResults=E([]);isSuperAdmin=E(!1);quickCommands=it(()=>[{icon:"person_add",label:"Nuevo alumno",description:"Abrir alta de alumnos",route:"/clients/new",group:"Acciones"},...this.isSuperAdmin()?[{icon:"payments",label:"Registrar pago",description:"Cargar un nuevo cobro",route:"/movements/payments/new",group:"Acciones"},{icon:"add_circle",label:"Nuevo ejercicio",description:"Crear ejercicio del gimnasio",route:"/student-platform/exercises/new",group:"Acciones"},{icon:"fitness_center",label:"Nuevo workout",description:"Armar una rutina reutilizable",route:"/student-platform/routines/new",group:"Acciones"},{icon:"assignment_add",label:"Nuevo plan",description:"Crear un plan de entrenamiento",route:"/student-platform/training-plans/new",group:"Acciones"},{icon:"description",label:"Contratos pendientes",description:"Revisar seguimiento contractual",route:"/contracts",group:"Acciones"}]:[]]);isCollapsed=!0;isMobile=!1;isMobileSidebarOpen=!1;employeesMenuOpen=!1;clientsMenuOpen=!1;movementsMenuOpen=!1;isDarkTheme=!1;constructor(){this.initTheme(),this.initCommandSearch(),this.isSuperAdmin$.subscribe(a=>this.isSuperAdmin.set(a)),this.breakpointObserver.observe("(max-width: 1024px)").subscribe(({matches:a})=>{if(this.isMobile=a,a){this.isCollapsed=!1,this.isMobileSidebarOpen=!1,this.syncLayout();return}this.isCollapsed=!0,this.isMobileSidebarOpen=!1,this.syncLayout()}),this.router.events.subscribe(a=>{a instanceof pt&&(this.loadCurrentProfile(),this.syncLayout())}),this.loadCurrentProfile()}get isEmployeesSectionActive(){return this.router.url.startsWith("/employees")}get isClientsSectionActive(){return this.router.url.startsWith("/clients")||this.router.url.startsWith("/membership-plans")}get isHealthSectionActive(){return this.router.url.startsWith("/health")}get isMovementsSectionActive(){return this.router.url.startsWith("/movements")}toggleSidebar(){if(this.isMobile){this.isMobileSidebarOpen=!this.isMobileSidebarOpen,this.syncLayout();return}this.isCollapsed=!this.isCollapsed,this.syncLayout()}toggleEmployeesMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.employeesMenuOpen=!this.employeesMenuOpen}toggleClientsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.clientsMenuOpen=!this.clientsMenuOpen}toggleMovementsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.movementsMenuOpen=!this.movementsMenuOpen}closeSidebarOnMobile(){this.isMobile&&(this.isMobileSidebarOpen=!1,this.syncLayout())}toggleTheme(){this.isDarkTheme=!this.isDarkTheme,this.applyTheme()}handleGlobalShortcut(a){(a.ctrlKey||a.metaKey)&&a.key.toLowerCase()==="k"?(a.preventDefault(),this.openCommandPalette()):a.key==="Escape"&&this.commandOpen()&&this.closeCommandPalette()}openCommandPalette(){this.commandOpen.set(!0),document.body.style.overflow="hidden",window.setTimeout(()=>document.querySelector(".global-command-input")?.focus())}closeCommandPalette(){this.commandOpen.set(!1),this.commandQuery.setValue(""),this.commandResults.set([]),document.body.style.overflow=""}runCommand(a){this.closeCommandPalette(),this.router.navigateByUrl(a.route)}logout(){let a=y.auth0.logoutReturnTo||window.location.origin;this.auth.logout({logoutParams:{returnTo:a}})}getUserDisplayName(a){let e=this.currentProfile(),n=`${e?.nombre??""} ${e?.apellido??""}`.trim();if(n)return n;let i=a?.name,r=a?.nickname,d=a?.email;return typeof i=="string"&&i.trim()?i:typeof r=="string"&&r.trim()?r:typeof d=="string"&&d.trim()?d:"usuario"}getUserInitials(a){let e=this.currentProfile();return(`${e?.nombre??""} ${e?.apellido??""}`.trim()||this.getUserDisplayName(a)).split(/[\s@._-]+/).map(d=>d.trim()).filter(Boolean).slice(0,2).map(d=>d[0]?.toUpperCase()).join("")||"U"}getUserPicture(a){let e=this.currentProfile()?.avatarUrl;if(e?.trim())return e;let n=a?.picture;return typeof n=="string"&&n.trim()?n:null}loadCurrentProfile(){this.profileService.getMe().subscribe({next:a=>this.currentProfile.set(a),error:()=>this.currentProfile.set(null)})}syncLayout(){requestAnimationFrame(()=>{window.dispatchEvent(new Event("resize"))})}initTheme(){let a=localStorage.getItem("gym-theme"),e=window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1;this.isDarkTheme=a?a==="dark":e,this.applyTheme()}applyTheme(){document.body.classList.toggle("dark-theme",this.isDarkTheme),localStorage.setItem("gym-theme",this.isDarkTheme?"dark":"light")}initCommandSearch(){this.commandQuery.valueChanges.subscribe(a=>this.commandQueryChanges.next(a)),this.commandQueryChanges.pipe(K(""),O(a=>a.trim()),ae(220),He(),re(a=>{if(a.length<2)return this.commandSearching.set(!1),z([]);this.commandSearching.set(!0);let e=a.toLocaleLowerCase("es"),n=this.clientsService.getPaged(1,6,{search:a}).pipe(L(()=>z({items:[],pageNumber:1,pageSize:6,totalCount:0,totalPages:0})));return this.isSuperAdmin()?Ge({clients:n,exercises:this.platformService.getExercises(a).pipe(L(()=>z([]))),routines:this.platformService.getRoutineTemplates().pipe(L(()=>z([]))),plans:this.platformService.getTrainingPlans().pipe(L(()=>z([])))}).pipe(O(i=>[...i.clients.items.slice(0,6).map(r=>({icon:"person",label:`${r.nombre} ${r.apellido}`,description:`DNI ${r.dni}`,route:`/clients/${r.id}`,group:"Alumnos"})),...i.exercises.slice(0,5).map(r=>({icon:"exercise",label:r.name,description:r.muscleGroup||"Ejercicio",route:`/student-platform/exercises/${r.id}`,group:"Ejercicios"})),...i.routines.filter(r=>`${r.name} ${r.description??""}`.toLocaleLowerCase("es").includes(e)).slice(0,5).map(r=>({icon:"fitness_center",label:r.name,description:`${r.exercises.length} ejercicios`,route:`/student-platform/routines/${r.id}`,group:"Workouts"})),...i.plans.filter(r=>`${r.name} ${r.description??""}`.toLocaleLowerCase("es").includes(e)).slice(0,5).map(r=>({icon:"assignment",label:r.name,description:`${r.workoutCount} workouts`,route:`/student-platform/training-plans/${r.id}`,group:"Planes"}))])):n.pipe(O(i=>i.items.slice(0,6).map(r=>({icon:"person",label:`${r.nombre} ${r.apellido}`,description:`DNI ${r.dni}`,route:`/clients/${r.id}`,group:"Alumnos"}))))})).subscribe(a=>{this.commandResults.set(a),this.commandSearching.set(!1)})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=w({type:t,selectors:[["app-shell"]],hostBindings:function(e,n){e&1&&u("keydown",function(r){return n.handleGlobalShortcut(r)},Ye)},decls:59,vars:53,consts:[["autosize","",1,"app-container"],[1,"app-sidenav",3,"mode","opened"],[1,"sidebar-content"],[1,"sidebar-header"],[1,"brand"],["src","assets/brand/simbiosis-logo.svg","alt","Simbiosis Gym","width","160","height","56",1,"brand-logo"],["mat-icon-button","","type","button",1,"collapse-button",3,"click"],["class","sidebar-section-label",4,"ngIf"],[1,"nav-list"],["mat-list-item","","routerLink","/community","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/contents","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/my-contracts","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/dashboard","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/clients","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/weekly-schedules","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/contracts","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/health","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/movements","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/student-platform","routerLinkActive","active-link",3,"click",4,"ngIf"],[1,"sidebar-footer"],[1,"sidebar-session-card"],["mat-stroked-button","","type","button",1,"logout-button"],["color","primary",1,"app-toolbar"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button"],[1,"toolbar-brand"],["src","assets/brand/simbiosis-logo.svg","alt","Simbiosis Gym","width","132","height","52",1,"toolbar-logo"],[1,"toolbar-spacer"],["type","button","aria-label","Abrir b\xFAsqueda global",1,"global-search-trigger",3,"click"],["mat-icon-button","","type","button",1,"theme-toggle-button",3,"click","title"],["type","button","routerLink","/profile","title","Mi perfil","aria-label","Ir a mi perfil",1,"profile-avatar-button"],[1,"app-content"],[1,"command-backdrop"],[1,"sidebar-section-label"],["mat-list-item","","routerLink","/community","routerLinkActive","active-link",3,"click"],[1,"nav-item-content"],[1,"nav-text"],["mat-list-item","","routerLink","/contents","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/my-contracts","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/dashboard","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/clients","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/weekly-schedules","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/contracts","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/health","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/movements","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/student-platform","routerLinkActive","active-link",3,"click"],[1,"session-heading"],[1,"footer-dot"],["mat-stroked-button","","type","button",1,"logout-button",3,"click"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button",3,"click"],[3,"seed","src"],[1,"command-backdrop",3,"click"],["role","dialog","aria-modal","true","aria-label","B\xFAsqueda global",1,"command-palette",3,"click"],["type","search","placeholder","Buscar en el sistema...","aria-label","B\xFAsqueda global",1,"global-command-input",3,"formControl"],["mat-icon-button","","type","button","aria-label","Cerrar b\xFAsqueda",3,"click"],[1,"command-content"],[1,"command-empty"],[1,"command-list","results"],[1,"command-heading"],[1,"command-list"],["type","button"],["type","button",3,"click"],[1,"command-icon"],[1,"spin"]],template:function(e,n){if(e&1&&(o(0,"mat-sidenav-container",0)(1,"mat-sidenav",1)(2,"div",2)(3,"div",3)(4,"div",4),D(5,"img",5),s(),o(6,"button",6),u("click",function(){return n.toggleSidebar()}),o(7,"mat-icon"),l(8),s()()(),M(9,Sn,2,0,"div",7),o(10,"mat-nav-list",8),M(11,Pn,6,0,"a",9),v(12,"async"),M(13,An,6,0,"a",10),v(14,"async"),M(15,On,6,0,"a",11),v(16,"async"),M(17,Dn,6,0,"a",12),v(18,"async"),M(19,Tn,6,0,"a",13),v(20,"async"),M(21,En,6,0,"a",14),v(22,"async"),M(23,In,6,0,"a",15),v(24,"async"),v(25,"async"),M(26,zn,6,0,"a",16),v(27,"async"),M(28,Ln,6,0,"a",17),v(29,"async"),M(30,Bn,6,0,"a",18),v(31,"async"),M(32,Fn,6,0,"a",19),v(33,"async"),s(),o(34,"div",20),S(35,Rn,13,1,"div",21),v(36,"async"),et(37,Vn,3,1,"button",22),s()()(),o(38,"mat-sidenav-content")(39,"mat-toolbar",23),S(40,jn,3,0,"button",24),o(41,"div",25),D(42,"img",26),s(),D(43,"span",27),o(44,"button",28),u("click",function(){return n.openCommandPalette()}),o(45,"mat-icon"),l(46,"search"),s(),o(47,"span"),l(48,"Buscar en el sistema"),s(),o(49,"kbd"),l(50,"Ctrl K"),s()(),o(51,"button",29),u("click",function(){return n.toggleTheme()}),o(52,"mat-icon"),l(53),s()(),S(54,Nn,2,2,"button",30),v(55,"async"),s(),o(56,"main",31),D(57,"router-outlet"),s()()(),S(58,Zn,26,2,"div",32)),e&2){let i,r;m(),A("collapsed",n.isCollapsed),b("mode",n.isMobile?"over":"side")("opened",n.isMobile?n.isMobileSidebarOpen:!0),m(5),j("aria-label",n.isMobile?"Cerrar menu lateral":"Colapsar menu lateral"),m(2),I(n.isMobile?"close":"menu"),m(),b("ngIf",!n.isCollapsed),m(2),b("ngIf",C(12,25,n.isAdminOrSuperAdmin$)),m(2),b("ngIf",C(14,27,n.isAdminOrSuperAdmin$)),m(2),b("ngIf",!C(16,29,n.isAdminOrSuperAdmin$)),m(2),b("ngIf",C(18,31,n.isSuperAdmin$)),m(2),b("ngIf",C(20,33,n.isSuperAdmin$)),m(2),b("ngIf",C(22,35,n.isAdminOrSuperAdmin$)),m(2),b("ngIf",C(24,37,n.isAdminOrSuperAdmin$)&&!C(25,39,n.isSuperAdmin$)),m(3),b("ngIf",C(27,41,n.isSuperAdmin$)),m(2),b("ngIf",C(29,43,n.isAdminOrSuperAdmin$)),m(2),b("ngIf",C(31,45,n.isSuperAdmin$)),m(2),b("ngIf",C(33,47,n.isAdminOrSuperAdmin$)),m(3),P((i=!n.isCollapsed&&C(36,49,n.user$))?35:37,i),m(5),P(n.isMobile?40:-1),m(11),b("title",n.isDarkTheme?"Cambiar a modo claro":"Cambiar a modo oscuro"),j("aria-label",n.isDarkTheme?"Cambiar a modo claro":"Cambiar a modo oscuro"),m(2),I(n.isDarkTheme?"light_mode":"dark_mode"),m(),P((r=C(55,51,n.user$))?54:-1,r),m(4),P(n.commandOpen()?58:-1)}},dependencies:[Rt,rt,at,Dt,St,Pt,Ot,ge,ut,gt,Yt,je,Kt,we,Xt,Jt,Nt,jt,Vt,Gt,$t,It,Et,Tt,ot],styles:[".app-container[_ngcontent-%COMP%]{height:100dvh;background:var(--app-bg)}.global-search-trigger[_ngcontent-%COMP%]{align-items:center;background:var(--app-surface-muted);border:1px solid var(--app-border);border-radius:8px;color:var(--app-text-muted);cursor:pointer;display:flex;gap:.45rem;min-height:38px;padding:0 .65rem}.global-search-trigger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.78rem}.global-search-trigger[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%], .command-palette[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{background:var(--app-surface);border:1px solid var(--app-border);border-radius:4px;color:var(--app-text-soft);font-size:.65rem;padding:.12rem .3rem}.command-backdrop[_ngcontent-%COMP%]{align-items:flex-start;background:#00000094;display:flex;inset:0;justify-content:center;padding:min(12dvh,100px) .5rem .5rem;position:fixed;z-index:2000;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.command-palette[_ngcontent-%COMP%]{background:var(--app-surface);border:1px solid var(--app-border);border-radius:12px;box-shadow:0 24px 80px #00000061;color:var(--app-text);max-width:720px;min-height:460px;overflow:hidden;width:100%}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{align-items:center;border-bottom:1px solid var(--app-border);display:grid;gap:.75rem;grid-template-columns:auto 1fr auto;min-height:66px;padding:0 1rem}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:var(--app-text-muted)}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;border:0;color:var(--app-text);font-size:1rem;min-width:0;outline:0;width:100%}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:var(--app-text-soft)}.command-content[_ngcontent-%COMP%]{max-height:min(60dvh,580px);overflow:auto;padding:.75rem}.command-heading[_ngcontent-%COMP%]{align-items:end;display:flex;justify-content:space-between;padding:.35rem .45rem .7rem}.command-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.command-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--app-text-muted)}.command-list[_ngcontent-%COMP%]{display:grid;gap:.3rem}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{align-items:center;background:transparent;border:1px solid transparent;border-radius:8px;color:inherit;cursor:pointer;display:grid;gap:.7rem;grid-template-columns:42px 1fr auto;min-height:60px;padding:.55rem .65rem;text-align:left;width:100%}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible{background:var(--app-surface-muted);border-color:var(--app-border);outline:0}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:nth-child(2){min-width:0}.command-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .command-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.command-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--app-text-muted);margin-top:.15rem}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:var(--app-text-soft)}.command-icon[_ngcontent-%COMP%]{align-items:center;background:var(--app-accent-soft);border-radius:8px;color:var(--app-accent);display:flex;height:42px;justify-content:center;width:42px}.command-empty[_ngcontent-%COMP%]{align-items:center;color:var(--app-text-muted);display:flex;flex-direction:column;min-height:260px;justify-content:center;text-align:center}.command-empty[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{font-size:42px;height:42px;width:42px}.command-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.35rem 0}.command-palette[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{align-items:center;border-top:1px solid var(--app-border);color:var(--app-text-muted);display:flex;font-size:.72rem;justify-content:space-between;min-height:46px;padding:0 1rem}.spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_command-spin 1s linear infinite}@keyframes _ngcontent-%COMP%_command-spin{to{transform:rotate(360deg)}}@media(max-width:700px){.global-search-trigger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .global-search-trigger[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{display:none}.global-search-trigger[_ngcontent-%COMP%]{border:0;padding:0;width:40px;justify-content:center}.command-backdrop[_ngcontent-%COMP%]{padding:.5rem}.command-palette[_ngcontent-%COMP%]{border-radius:10px;min-height:calc(100dvh - 1rem)}.command-content[_ngcontent-%COMP%]{max-height:calc(100dvh - 114px)}.command-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .command-palette[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{display:none}}.app-sidenav[_ngcontent-%COMP%]{width:260px;transition:width .2s ease;overflow:hidden;border-right:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,#0f0f10,#19191c);color:#fff;box-shadow:inset -1px 0 #ffffff0a}.app-sidenav.collapsed[_ngcontent-%COMP%]{width:80px}.sidebar-content[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;gap:1rem;padding:1rem .875rem;box-sizing:border-box;overflow:hidden}.sidebar-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;min-height:72px;padding:.25rem .35rem .75rem;border-bottom:1px solid rgba(255,255,255,.08)}.brand[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;min-width:0;min-height:64px}.brand-logo[_ngcontent-%COMP%]{display:block;width:min(160px,100%);height:56px;object-fit:contain;object-position:left center}.collapse-button[_ngcontent-%COMP%]{flex-shrink:0;color:#fff;background:#ffffff14;display:inline-grid;height:44px;min-width:44px;place-items:center;width:44px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%]{justify-content:center;padding:.25rem 0}.app-sidenav.collapsed[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{display:none}.sidebar-section-label[_ngcontent-%COMP%]{padding:0 .8rem;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#ffffff70}.nav-list[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;-webkit-overflow-scrolling:touch;padding:.25rem 0}.nav-item-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;width:100%}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]{--mdc-list-list-item-container-shape: 16px;min-height:48px;margin:.2rem 0;color:#ffffffdb}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .nav-text[_ngcontent-%COMP%]{color:#ffffffe6!important}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]:hover, .menu-trigger[_ngcontent-%COMP%]:hover{background:#ffffff12}.nav-list[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444;flex:0 0 24px;font-size:24px;height:24px;line-height:24px;overflow:visible;text-align:center;width:24px}.nav-text[_ngcontent-%COMP%]{white-space:nowrap;font-weight:500}.menu-group[_ngcontent-%COMP%]{margin:.1rem 0}.menu-group.group-active[_ngcontent-%COMP%] > .menu-trigger[_ngcontent-%COMP%]{background:#c1121f29}.menu-trigger[_ngcontent-%COMP%]{width:100%;border:0;background:transparent}.submenu-icon[_ngcontent-%COMP%]{margin-left:auto;transition:transform .2s ease;color:#ffffff80}.submenu-icon.open[_ngcontent-%COMP%]{transform:rotate(180deg)}.submenu[_ngcontent-%COMP%]{margin-top:.1rem;padding-left:.9rem}.submenu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{min-height:42px}.submenu-item-content[_ngcontent-%COMP%]{gap:10px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-item-content[_ngcontent-%COMP%]{justify-content:center;gap:0}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-text[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]   .submenu-icon[_ngcontent-%COMP%]{display:none}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]{border-radius:16px;display:grid;height:48px;margin:.35rem auto;min-height:48px;overflow:visible;place-items:center;width:48px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__content[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%]{display:grid;overflow:visible;place-items:center;width:100%}.active-link[_ngcontent-%COMP%]{background:linear-gradient(90deg,#c1121f3d,#c1121f14);box-shadow:inset 0 0 0 1px #c1121f3d}.sidebar-footer[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;margin-top:auto}.sidebar-session-card[_ngcontent-%COMP%]{display:grid;gap:.85rem;padding:.9rem;border-radius:18px;background:#ffffff0d;border:1px solid rgba(255,255,255,.08)}.session-heading[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.session-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;color:#fff;font-size:.92rem}.session-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.2rem 0 0;color:#ffffffb8;font-size:.92rem;line-height:1.2;overflow-wrap:anywhere}.footer-dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:999px;background:#ef4444;box-shadow:0 0 0 6px #ef444429}.logout-button[_ngcontent-%COMP%]{width:100%;min-height:46px;justify-content:flex-start;border-radius:16px;border-color:#ffffff24!important;background:#ffffff0a;color:#fff!important}.logout-button[_ngcontent-%COMP%]:hover{background:#ef44441f;border-color:#ef444459!important}.logout-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-footer[_ngcontent-%COMP%]{align-items:center}.app-sidenav.collapsed[_ngcontent-%COMP%]   .logout-button[_ngcontent-%COMP%]{width:48px;min-width:48px;padding:0;justify-content:center}.app-toolbar[_ngcontent-%COMP%]{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:.5rem;background:#ffffffeb;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:var(--app-text);box-shadow:inset 0 -1px #12121214}.mobile-menu-button[_ngcontent-%COMP%]{display:none;flex-shrink:0;background:var(--app-accent-soft);color:var(--app-accent)}.toolbar-brand[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.55rem;min-width:0}.toolbar-logo[_ngcontent-%COMP%]{flex-shrink:1;max-width:100%;width:132px;height:52px;object-fit:contain;filter:brightness(0)}body.dark-theme[_nghost-%COMP%]   .toolbar-logo[_ngcontent-%COMP%], body.dark-theme   [_nghost-%COMP%]   .toolbar-logo[_ngcontent-%COMP%]{filter:none}.toolbar-title[_ngcontent-%COMP%]{font-weight:700;letter-spacing:-.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.toolbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.theme-toggle-button[_ngcontent-%COMP%]{background:var(--app-accent-soft);color:var(--app-accent);flex:0 0 auto}.profile-avatar-button[_ngcontent-%COMP%]{align-items:center;background:#fff;border:2px solid #fff;border-radius:999px;box-shadow:0 0 0 1px #1212121a,0 10px 24px #1018282e;color:#991b1b;cursor:pointer;display:inline-grid;flex:0 0 42px;font-weight:800;height:42px;justify-content:center;overflow:hidden;padding:0;transition:border-color .16s ease,box-shadow .16s ease,transform .16s ease;width:42px}.profile-avatar-button[_ngcontent-%COMP%]:hover, .profile-avatar-button[_ngcontent-%COMP%]:focus-visible{border-color:#fff;box-shadow:0 0 0 3px #c1121f38,0 14px 30px #c1121f38;outline:0;transform:translateY(-1px)}.profile-avatar-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;object-fit:cover;width:100%}.profile-avatar-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{align-items:center;background:#fff3f2;display:flex;height:100%;justify-content:center;width:100%}.app-content[_ngcontent-%COMP%]{padding:1.5rem;background:radial-gradient(circle at top right,rgba(193,18,31,.1),transparent 22%),linear-gradient(180deg,#f6f6f7,#fff);min-height:calc(100dvh - 64px);box-sizing:border-box}@media(max-width:1024px){.app-sidenav[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]{width:min(86vw,320px)}.sidebar-content[_ngcontent-%COMP%]{padding:.9rem .75rem}.sidebar-header[_ngcontent-%COMP%]{min-height:64px}.mobile-menu-button[_ngcontent-%COMP%]{display:inline-flex}.toolbar-title[_ngcontent-%COMP%]{font-size:.95rem;line-height:1.25}.toolbar-logo[_ngcontent-%COMP%]{width:112px;height:48px}.app-content[_ngcontent-%COMP%]{padding:1rem;min-height:calc(100dvh - 56px)}}"]})};var g=t=>{let a=c(fe),e=c(V),n=t.data.roles??[];return $e([a.isAuthenticated$,a.user$]).pipe(O(([i,r])=>{if(!i)return e.createUrlTree(["/login"]);if(n.length===0)return!0;let d=Ut(r);return Ht(d,n)?!0:e.createUrlTree(["/sin-acceso"])}))};var tn=(t,a)=>{let e=c(_e),n=c(ct),i=c(V);return e.roles$.pipe(oe(1),re(r=>!r.includes("User")||a.url==="/sin-acceso"?z(!0):n.get(`${y.apiUrl}/api/contracts/mine`).pipe(O(d=>{let ie=d.find(sn=>sn.status==="PendingSignature");return d.length===0?i.createUrlTree(["/sin-acceso"]):!ie||a.url===`/contracts/${ie.id}/sign`?!0:i.createUrlTree(["/contracts",ie.id,"sign"])}),L(()=>z(i.createUrlTree(["/sin-acceso"]))))))};var nn=[{path:"body-map-calibrator",loadComponent:()=>import("./chunk-HM32RDUK.js").then(t=>t.BodyMapCalibratorPageComponent)},{path:"login",loadComponent:()=>import("./chunk-24ZLYMLS.js").then(t=>t.LoginComponent)},{path:"",component:ye,canActivate:[Bt],canActivateChild:[tn],children:[{path:"community",loadComponent:()=>import("./chunk-J2NCFH5B.js").then(t=>t.Community),canActivate:[g],canDeactivate:[t=>t.canLeave()],data:{roles:["SuperAdmin","Admin"]}},{path:"contents",loadComponent:()=>import("./chunk-ROGHBGOR.js").then(t=>t.ContentsPage),canActivate:[g],data:{roles:["SuperAdmin","Admin"]},canDeactivate:[t=>t.canLeave()]},{path:"preregistrations",redirectTo:({queryParams:t})=>c(V).createUrlTree(["/clients"],{queryParams:Ae(Pe({},t),{tab:"preinscripciones"})})},{path:"",redirectTo:"profile",pathMatch:"full"},{path:"sin-acceso",loadComponent:()=>import("./chunk-2VIQ2PCH.js").then(t=>t.AccessDeniedComponent)},{path:"dashboard",loadComponent:()=>import("./chunk-BK3AVL5U.js").then(t=>t.DashboardPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"profile",loadComponent:()=>import("./chunk-47QX3WP5.js").then(t=>t.ProfilePageComponent)},{path:"employees",loadComponent:()=>import("./chunk-IXUL36JD.js").then(t=>t.EmployeesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"employees/categories",loadComponent:()=>import("./chunk-B4GTNCMI.js").then(t=>t.EmployeeCategoriesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"employees/:id",loadComponent:()=>import("./chunk-2USNVL4L.js").then(t=>t.EmployeeDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"clients",loadComponent:()=>import("./chunk-ZP7DBZHG.js").then(t=>t.ClientsEntry),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"clients/new",loadComponent:()=>import("./chunk-FRGIJEU7.js").then(t=>t.ClientDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"clients/:id",loadComponent:()=>import("./chunk-FRGIJEU7.js").then(t=>t.ClientDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"my-contracts",loadComponent:()=>import("./chunk-5I2SXSHX.js").then(t=>t.MyContractsPageComponent),canActivate:[g],data:{roles:["User"]}},{path:"contracts",loadComponent:()=>import("./chunk-2UGSPZYK.js").then(t=>t.ContractsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"contracts/:id/sign",loadComponent:()=>import("./chunk-SUJYVA5S.js").then(t=>t.ContractSignaturePageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin","User"]}},{path:"contracts/:id",loadComponent:()=>import("./chunk-5C7DBZTC.js").then(t=>t.ContractDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"health/patients/:id",loadComponent:()=>import("./chunk-S7AYVDSM.js").then(t=>t.HealthPatientDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"health",loadComponent:()=>import("./chunk-JH64Z6BC.js").then(t=>t.HealthPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"membership-plans",loadComponent:()=>import("./chunk-7R46HX5K.js").then(t=>t.MembershipPlansPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"movements",loadComponent:()=>import("./chunk-7OUEC6JD.js").then(t=>t.MovementsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"movements/payments/new",loadComponent:()=>import("./chunk-YJAP3BR5.js").then(t=>t.PaymentRegisterPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"movements/categories",loadComponent:()=>import("./chunk-I6HKYZ4J.js").then(t=>t.CashMovementCategoriesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/routines/new",loadComponent:()=>import("./chunk-CTVNOGIZ.js").then(t=>t.RoutineCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"weekly-schedules",loadComponent:()=>import("./chunk-OTD23PJ3.js").then(t=>t.WeeklySchedulesPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"student-platform/routines/:id",loadComponent:()=>import("./chunk-XRN5TDGA.js").then(t=>t.WorkoutDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/training-plans/new",loadComponent:()=>import("./chunk-C5E4B6Y2.js").then(t=>t.TrainingPlanCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/training-plans/:id",loadComponent:()=>import("./chunk-AFBSYKEL.js").then(t=>t.TrainingPlanDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/exercises/new",loadComponent:()=>import("./chunk-OFP2CTA4.js").then(t=>t.ExerciseCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/exercises/:id",loadComponent:()=>import("./chunk-OFP2CTA4.js").then(t=>t.ExerciseCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"strength",redirectTo:({queryParams:t})=>c(V).createUrlTree(["/student-platform"],{queryParams:Ae(Pe({},t),{tab:"seguimiento",section:"fuerza"})})},{path:"student-platform",loadComponent:()=>import("./chunk-BBVXZUD6.js").then(t=>t.StudentPlatformEntry),canActivate:[g],canDeactivate:[t=>t.canLeave()],data:{roles:["SuperAdmin","Admin"]}}]}];var Me=class t extends ve{itemsPerPageLabel="Filas por p\xE1gina";nextPageLabel="P\xE1gina siguiente";previousPageLabel="P\xE1gina anterior";firstPageLabel="Primera p\xE1gina";lastPageLabel="\xDAltima p\xE1gina";getRangeLabel=(a,e,n)=>{if(n===0||e===0)return`0 de ${n}`;let i=a*e,r=Math.min(i+e,n);return`${i+1}-${r} de ${n}`};static \u0275fac=(()=>{let a;return function(n){return(a||(a=G(t)))(n||t)}})();static \u0275prov=$({token:t,factory:t.\u0275fac})};function an(t){if(!(t instanceof te))return{title:"Ocurri\xF3 un error",message:"No pudimos completar la operaci\xF3n. Intent\xE1 nuevamente."};if(t.status===0)return{title:"Sin conexi\xF3n con el sistema",message:"No pudimos comunicarnos con el servidor. Revis\xE1 tu conexi\xF3n e intent\xE1 nuevamente."};let a=t.error,e=Kn(a),n=ne(a,"message")||ne(a,"detail")||ne(a,"error"),i=ne(a,"title")||ei(t.status),r=ne(a,"referenceId"),d=e.length>0?e.slice(0,4).join(`
`):n||Xn(a)||ti(t.status);return e.length>4&&(d+=`
Y ${e.length-4} observaci\xF3n(es) m\xE1s.`),r&&!d.includes(r)&&t.status>=500&&(d+=`
C\xF3digo: ${r}`),{title:i,message:d}}function Kn(t){if(!t||typeof t!="object")return[];let a=t.errors;return Array.isArray(a)?a.map(e=>typeof e=="string"?Ne("",e):Yn(e)).filter(e=>!!e):a&&typeof a=="object"?Object.entries(a).flatMap(([e,n])=>(Array.isArray(n)?n:[n]).filter(r=>typeof r=="string").map(r=>Ne(e,r))):[]}function Yn(t){if(!t||typeof t!="object")return null;let a=t;return typeof a.message=="string"?Ne(typeof a.field=="string"?a.field:"",a.message):null}function Ne(t,a){let e=Jn(t),n=a.replace(/^'[^']+'\s*/,"").replace(/must be between (\d+) and (\d+)\.?/i,"debe estar entre $1 y $2.").replace(/must not be empty\.?/i,"es obligatorio.").replace(/must be a valid email address\.?/i,"debe ser un correo v\xE1lido.").replace(/must match[^.]*\.?/i,"debe coincidir con el per\xEDodo seleccionado.");return n=n.charAt(0).toLocaleLowerCase("es-AR")+n.slice(1),e?`${e}: ${n}`:ni(n)}function Jn(t){let a=t.replace(/[^a-z0-9]/gi,"").toLowerCase();return{membershipperiodyear:"A\xF1o del per\xEDodo de la membres\xEDa",membershipperiodmonth:"Mes del per\xEDodo de la membres\xEDa",initialpaymentperiodyear:"A\xF1o del per\xEDodo del pago",initialpaymentperiodmonth:"Mes del per\xEDodo del pago",nombre:"Nombre",apellido:"Apellido",dni:"DNI",email:"Correo electr\xF3nico",telefono:"Tel\xE9fono",direccion:"Direcci\xF3n"}[a]??t.replace(/\./g," ")}function ne(t,a){if(!t||typeof t!="object")return"";let e=t[a];return typeof e=="string"?e.trim():""}function Xn(t){return typeof t=="string"&&!t.trimStart().startsWith("<")?t.trim():""}function ei(t){return t===400||t===422?"Revis\xE1 los datos ingresados":t===401?"Tu sesi\xF3n venci\xF3":t===403?"No ten\xE9s permiso para esta acci\xF3n":t===404?"No encontramos el dato solicitado":t===409?"La informaci\xF3n entr\xF3 en conflicto":t>=500?"El servidor no pudo completar la operaci\xF3n":"No se pudo completar"}function ti(t){return t===400||t===422?"Hay datos incorrectos o incompletos. Revisalos e intent\xE1 nuevamente.":t===401?"Volv\xE9 a iniciar sesi\xF3n para continuar.":t===403?"Tu usuario no tiene autorizaci\xF3n para realizar esta operaci\xF3n.":t===404?"El registro pudo haber sido eliminado o ya no estar disponible.":t===409?"Actualiz\xE1 la pantalla y volv\xE9 a intentarlo.":"Intent\xE1 nuevamente. Si el problema contin\xFAa, comunicate con soporte."}function ni(t){return t&&t.charAt(0).toLocaleUpperCase("es-AR")+t.slice(1)}function on(t,a){let e=c(be),n=e.currentRevision;return t.url.startsWith(y.apiUrl)?a(t).pipe(Qe(r=>{!(r instanceof lt)||!ii(t.method)||queueMicrotask(()=>e.successIfUnchanged(ai(t.method),n))}),L(r=>{if(t.method==="GET"&&t.url===`${y.apiUrl}/api/Profile/me`&&r instanceof te&&r.status===404)return Oe(()=>r);let d=an(r);return queueMicrotask(()=>e.show(d.message,"error",2e4,d.title)),Oe(()=>r instanceof te?r:new Error(d.message))})):a(t)}function ii(t){return t==="POST"||t==="PUT"||t==="PATCH"||t==="DELETE"}function ai(t){return t==="DELETE"?"El registro se elimin\xF3 correctamente.":t==="POST"?"La informaci\xF3n se guard\xF3 correctamente.":"Los cambios se guardaron correctamente."}var ke=class t{toast=c(be);handleError(a){console.error(a),this.toast.show("Ocurri\xF3 un error inesperado en la pantalla. Recarg\xE1 la p\xE1gina e intent\xE1 nuevamente.","error",2e4,"La pantalla encontr\xF3 un problema")}static \u0275fac=function(e){return new(e||t)};static \u0275prov=$({token:t,factory:t.\u0275fac})};var oi=y.auth0.redirectUri||`${window.location.origin}/`,rn={providers:[Ze(),dt(mt([Ft,Qt,on])),ht(nn),We(zt),{provide:qe,useClass:ke},{provide:ve,useClass:Me},{provide:kt,useValue:{disableClose:!0}},Lt({domain:y.auth0.domain,clientId:y.auth0.clientId,authorizationParams:{redirect_uri:oi,audience:y.auth0.audience},httpInterceptor:{allowedList:[{uri:`${y.apiUrl}/api/*`,tokenOptions:{authorizationParams:{audience:y.auth0.audience}}}]}})]};var Se=class t{title=E("gym-management-frontend");static \u0275fac=function(e){return new(e||t)};static \u0275cmp=w({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(e,n){e&1&&D(0,"router-outlet")},dependencies:[ge],encapsulation:2})};st(Se,rn).catch(t=>console.error(t));
