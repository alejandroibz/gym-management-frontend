import{a as $,b as _e,c as ge,d as ue}from"./chunk-6WY3XS25.js";import{a as lt}from"./chunk-B5XAVFYI.js";import{T as de,g as ae,h as Z,i as oe,j as yt}from"./chunk-PQMBZJLW.js";import{A as f,H as ct,I as re,J as se,L as ce,M as le,N as me,O as he,P as pe,Q as be,R as fe,S as A,c as R,d as et,f as $t,g as Kt,k as Xt,l as Yt,m as Jt,n as te,o as ee,r as ie,x as ne,y as B}from"./chunk-B2NG2YY4.js";import{$ as H,$b as Qt,A as vt,Cb as Rt,Da as m,Db as Bt,Ea as I,Fa as w,Ga as M,Ha as U,K as xt,M as y,Ma as k,Nb as tt,Oa as P,Pa as T,T as nt,U as L,Ua as V,Ub as jt,V as Q,Va as r,Wa as l,Wb as Vt,X as a,Xa as E,Zb as Nt,_ as G,ca as X,cb as q,cc as Gt,d as At,da as at,dc as Ht,eb as b,f as D,fa as Y,fc as Wt,ga as W,gb as S,hb as v,hc as rt,ia as Tt,ib as d,ic as st,ja as j,jb as F,jc as Ut,kb as J,kc as qt,lb as h,lc as Zt,m as O,ma as x,mb as p,n as Lt,na as C,oa as Et,rb as ot,sb as _,t as it,tb as Ft,u as K,ub as g,va as u,vb as zt,wa as wt,y as It,z as Pt,za as kt,zb as z}from"./chunk-2G5AUPF3.js";var ht=["*"],Pe=["content"],Te=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],Ee=["mat-drawer","mat-drawer-content","*"];function Fe(i,o){if(i&1){let t=q();r(0,"div",1),b("click",function(){G(t);let n=S();return H(n._onBackdropClicked())}),l()}if(i&2){let t=S();_("mat-drawer-shown",t._isShowingBackdrop())}}function ze(i,o){i&1&&(r(0,"mat-drawer-content"),d(1,2),l())}var Re=[[["mat-sidenav"]],[["mat-sidenav-content"]],"*"],Be=["mat-sidenav","mat-sidenav-content","*"];function je(i,o){if(i&1){let t=q();r(0,"div",1),b("click",function(){G(t);let n=S();return H(n._onBackdropClicked())}),l()}if(i&2){let t=S();_("mat-drawer-shown",t._isShowingBackdrop())}}function Ve(i,o){i&1&&(r(0,"mat-sidenav-content"),d(1,2),l())}var Ne=`.mat-drawer-container {
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
`;var Qe=new Q("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),Dt=new Q("MAT_DRAWER_CONTAINER"),dt=(()=>{class i extends Z{_platform=a(R);_changeDetectorRef=a(tt);_container=a(Mt);constructor(){let t=a(C),e=a(ae),n=a(W);super(t,e,n)}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:t,end:e}=this._container;return t!=null&&t.mode!=="over"&&t.opened||e!=null&&e.mode!=="over"&&e.opened}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=m({type:i,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(e,n){e&2&&(ot("margin-left",n._container._contentMargins.left,"px")("margin-right",n._container._contentMargins.right,"px"),_("mat-drawer-content-hidden",n._shouldBeHidden()))},features:[z([{provide:Z,useExisting:i}]),M],ngContentSelectors:ht,decls:1,vars:0,template:function(e,n){e&1&&(v(),d(0))},encapsulation:2,changeDetection:0})}return i})(),Ct=(()=>{class i{_elementRef=a(C);_focusTrapFactory=a(ee);_focusMonitor=a($t);_platform=a(R);_ngZone=a(W);_renderer=a(kt);_interactivityChecker=a(te);_doc=a(at);_container=a(Dt,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(t){t=t==="end"?"end":"start",t!==this._position&&(this._isAttached&&this._updatePositionInParent(t),this._position=t,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(t){this._mode=t,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(t){this._disableClose=f(t)}_disableClose=!1;get autoFocus(){let t=this._autoFocus;return t??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(t){(t==="true"||t==="false"||t==null)&&(t=f(t)),this._autoFocus=t}_autoFocus;get opened(){return this._opened()}set opened(t){this.toggle(f(t))}_opened=j(!1);_openedVia=null;_animationStarted=new D;_animationEnd=new D;openedChange=new Y(!0);_openedStream=this.openedChange.pipe(K(t=>t),O(()=>{}));openedStart=this._animationStarted.pipe(K(()=>this.opened),vt(void 0));_closedStream=this.openedChange.pipe(K(t=>!t),O(()=>{}));closedStart=this._animationStarted.pipe(K(()=>!this.opened),vt(void 0));_destroyed=new D;onPositionChanged=new Y;_content;_modeChanged=new D;_injector=a(X);_changeDetectorRef=a(tt);constructor(){this.openedChange.pipe(y(this._destroyed)).subscribe(t=>{t?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let t=this._renderer,e=this._elementRef.nativeElement;return[t.listen(e,"keydown",n=>{n.keyCode===27&&!this.disableClose&&!ie(n)&&this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault()})}),t.listen(e,"transitionend",this._handleTransitionEvent),t.listen(e,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_forceFocus(t,e){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{s(),c(),t.removeAttribute("tabindex")},s=this._renderer.listen(t,"blur",n),c=this._renderer.listen(t,"mousedown",n)})),t.focus(e)}_focusByCssSelector(t,e){let n=this._elementRef.nativeElement.querySelector(t);n&&this._forceFocus(n,e)}_takeFocus(){if(!this._focusTrap)return;let t=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":wt(()=>{!this._focusTrap.focusInitialElement()&&typeof t.focus=="function"&&t.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(t){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,t):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let t=this._doc.activeElement;return!!t&&this._elementRef.nativeElement.contains(t)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(t){return this.toggle(!0,t)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(t=!this.opened,e){t&&e&&(this._openedVia=e);let n=this._setOpen(t,!t&&this._isFocusWithinDrawer(),this._openedVia||"program");return t||(this._openedVia=null),n}_setOpen(t,e,n){return t===this.opened?Promise.resolve(t?"open":"close"):(this._opened.set(t),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",t),!t&&e&&this._restoreFocus(n),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(s=>{this.openedChange.pipe(Pt(1)).subscribe(c=>s(c?"open":"close"))}))}_setIsAnimating(t){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",t)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(t){if(!this._platform.isBrowser)return;let e=this._elementRef.nativeElement,n=e.parentNode;t==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),n.insertBefore(this._anchor,e)),n.appendChild(e)):this._anchor&&this._anchor.parentNode.insertBefore(e,this._anchor)}_handleTransitionEvent=t=>{let e=this._elementRef.nativeElement;t.target===e&&this._ngZone.run(()=>{t.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(t)})};static \u0275fac=function(e){return new(e||i)};static \u0275cmp=m({type:i,selectors:[["mat-drawer"]],viewQuery:function(e,n){if(e&1&&J(Pe,5),e&2){let s;h(s=p())&&(n._content=s.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(e,n){e&2&&(k("align",null)("tabIndex",n.mode!=="side"?"-1":null),ot("visibility",!n._container&&!n.opened?"hidden":null),_("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:ht,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(e,n){e&1&&(v(),r(0,"div",1,0),d(2),l())},dependencies:[Z],encapsulation:2,changeDetection:0})}return i})(),Mt=(()=>{class i{_dir=a(ne,{optional:!0});_element=a(C);_ngZone=a(W);_changeDetectorRef=a(tt);_animationDisabled=ct();_transitionsEnabled=!1;_allDrawers;_drawers=new Et;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(t){this._autosize=f(t)}_autosize=a(Qe);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(t){this._backdropOverride=t==null?null:f(t)}_backdropOverride=null;backdropClick=new Y;_start=null;_end=null;_left=null;_right=null;_destroyed=new D;_doCheckSubject=new D;_contentMargins={left:null,right:null};_contentMarginChanges=new D;get scrollable(){return this._userContent||this._content}_injector=a(X);constructor(){let t=a(R),e=a(oe);this._dir?.change.pipe(y(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),e.change().pipe(y(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&t.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(xt(this._allDrawers),y(this._destroyed)).subscribe(t=>{this._drawers.reset(t.filter(e=>!e._container||e._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(xt(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(t=>{this._watchDrawerToggle(t),this._watchDrawerPosition(t),this._watchDrawerMode(t)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(It(10),y(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(t=>t.open())}close(){this._drawers.forEach(t=>t.close())}updateContentMargins(){let t=0,e=0;if(this._left&&this._left.opened){if(this._left.mode=="side")t+=this._left._getWidth();else if(this._left.mode=="push"){let n=this._left._getWidth();t+=n,e-=n}}if(this._right&&this._right.opened){if(this._right.mode=="side")e+=this._right._getWidth();else if(this._right.mode=="push"){let n=this._right._getWidth();e+=n,t-=n}}t=t||null,e=e||null,(t!==this._contentMargins.left||e!==this._contentMargins.right)&&(this._contentMargins={left:t,right:e},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(t){t._animationStarted.pipe(y(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),t.mode!=="side"&&t.openedChange.pipe(y(this._drawers.changes)).subscribe(()=>this._setContainerClass(t.opened))}_watchDrawerPosition(t){t.onPositionChanged.pipe(y(this._drawers.changes)).subscribe(()=>{wt({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(t){t._modeChanged.pipe(y(it(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(t){let e=this._element.nativeElement.classList,n="mat-drawer-container-has-open";t?e.add(n):e.remove(n)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(t=>{t.position=="end"?(this._end!=null,this._end=t):(this._start!=null,this._start=t)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(t=>t&&!t.disableClose&&this._drawerHasBackdrop(t)).forEach(t=>t._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(t){return t!=null&&t.opened}_drawerHasBackdrop(t){return this._backdropOverride==null?!!t&&t.mode!=="side":this._backdropOverride}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=m({type:i,selectors:[["mat-drawer-container"]],contentQueries:function(e,n,s){if(e&1&&F(s,dt,5)(s,Ct,5),e&2){let c;h(c=p())&&(n._content=c.first),h(c=p())&&(n._allDrawers=c)}},viewQuery:function(e,n){if(e&1&&J(dt,5),e&2){let s;h(s=p())&&(n._userContent=s.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(e,n){e&2&&_("mat-drawer-container-explicit-backdrop",n._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[z([{provide:Dt,useExisting:i}])],ngContentSelectors:Ee,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(e,n){e&1&&(v(Te),P(0,Fe,1,2,"div",0),d(1),d(2,1),P(3,ze,2,0,"mat-drawer-content")),e&2&&(T(n.hasBackdrop?0:-1),u(3),T(n._content?-1:3))},dependencies:[dt],styles:[`.mat-drawer-container {
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
`],encapsulation:2,changeDetection:0})}return i})(),mt=(()=>{class i extends dt{static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(i)))(n||i)}})();static \u0275cmp=m({type:i,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[z([{provide:Z,useExisting:i}]),M],ngContentSelectors:ht,decls:1,vars:0,template:function(e,n){e&1&&(v(),d(0))},encapsulation:2,changeDetection:0})}return i})(),Ot=(()=>{class i extends Ct{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(t){this._fixedInViewport=f(t)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(t){this._fixedTopGap=et(t)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(t){this._fixedBottomGap=et(t)}_fixedBottomGap=0;static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(i)))(n||i)}})();static \u0275cmp=m({type:i,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(e,n){e&2&&(k("tabIndex",n.mode!=="side"?"-1":null)("align",null),ot("top",n.fixedInViewport?n.fixedTopGap:null,"px")("bottom",n.fixedInViewport?n.fixedBottomGap:null,"px"),_("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side")("mat-sidenav-fixed",n.fixedInViewport))},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[z([{provide:Ct,useExisting:i}]),M],ngContentSelectors:ht,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(e,n){e&1&&(v(),r(0,"div",1,0),d(2),l())},dependencies:[Z],encapsulation:2,changeDetection:0})}return i})(),ve=(()=>{class i extends Mt{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(i)))(n||i)}})();static \u0275cmp=m({type:i,selectors:[["mat-sidenav-container"]],contentQueries:function(e,n,s){if(e&1&&F(s,mt,5)(s,Ot,5),e&2){let c;h(c=p())&&(n._content=c.first),h(c=p())&&(n._allDrawers=c)}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(e,n){e&2&&_("mat-drawer-container-explicit-backdrop",n._backdropOverride)},exportAs:["matSidenavContainer"],features:[z([{provide:Dt,useExisting:i},{provide:Mt,useExisting:i}]),M],ngContentSelectors:Be,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(e,n){e&1&&(v(Re),P(0,je,1,2,"div",0),d(1),d(2,1),P(3,Ve,2,0,"mat-sidenav-content")),e&2&&(T(n.hasBackdrop?0:-1),u(3),T(n._content?-1:3))},dependencies:[mt],styles:[Ne],encapsulation:2,changeDetection:0})}return i})(),xe=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=I({type:i});static \u0275inj=L({imports:[yt,B,yt]})}return i})();var He=["*",[["mat-toolbar-row"]]],We=["*","mat-toolbar-row"],Ue=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=w({type:i,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return i})(),we=(()=>{class i{_elementRef=a(C);_platform=a(R);_document=a(at);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=m({type:i,selectors:[["mat-toolbar"]],contentQueries:function(e,n,s){if(e&1&&F(s,Ue,5),e&2){let c;h(c=p())&&(n._toolbarRows=c)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(e,n){e&2&&(Ft(n.color?"mat-"+n.color:""),_("mat-toolbar-multiple-rows",n._toolbarRows.length>0)("mat-toolbar-single-row",n._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:We,decls:2,vars:0,template:function(e,n){e&1&&(v(He),d(0),d(1,1))},styles:[`.mat-toolbar {
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
`],encapsulation:2,changeDetection:0})}return i})();var ke=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=I({type:i});static \u0275inj=L({imports:[B]})}return i})();var ye=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=I({type:i});static \u0275inj=L({imports:[B]})}return i})();var Ze=["*"],$e=`.mdc-list {
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
`,Ke=["unscopedContent"],Xe=["text"],Ye=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],Je=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var ti=new Q("ListOption"),ei=(()=>{class i{_elementRef=a(C);constructor(){}static \u0275fac=function(e){return new(e||i)};static \u0275dir=w({type:i,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return i})(),ii=(()=>{class i{_elementRef=a(C);constructor(){}static \u0275fac=function(e){return new(e||i)};static \u0275dir=w({type:i,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return i})(),ni=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=w({type:i,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"]})}return i})(),Ce=(()=>{class i{_listOption=a(ti,{optional:!0});constructor(){}_isAlignedAtStart(){return!this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(e){return new(e||i)};static \u0275dir=w({type:i,hostVars:4,hostBindings:function(e,n){e&2&&_("mdc-list-item__start",n._isAlignedAtStart())("mdc-list-item__end",!n._isAlignedAtStart())}})}return i})(),ai=(()=>{class i extends Ce{static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(i)))(n||i)}})();static \u0275dir=w({type:i,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[M]})}return i})(),oi=(()=>{class i extends Ce{static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(i)))(n||i)}})();static \u0275dir=w({type:i,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[M]})}return i})(),ri=new Q("MAT_LIST_CONFIG"),St=(()=>{class i{_isNonInteractive=!0;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=f(t)}_disableRipple=!1;get disabled(){return this._disabled()}set disabled(t){this._disabled.set(f(t))}_disabled=j(!1);_defaultOptions=a(ri,{optional:!0});static \u0275fac=function(e){return new(e||i)};static \u0275dir=w({type:i,hostVars:1,hostBindings:function(e,n){e&2&&k("aria-disabled",n.disabled)},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return i})(),si=(()=>{class i{_elementRef=a(C);_ngZone=a(W);_listBase=a(St,{optional:!0});_platform=a(R);_hostElement;_isButtonElement;_noopAnimations=ct();_avatars;_icons;set lines(t){this._explicitLines=et(t,null),this._updateItemLines(!1)}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(t){this._disableRipple=f(t)}_disableRipple=!1;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(t){this._disabled.set(f(t))}_disabled=j(!1);_subscriptions=new At;_rippleRenderer=null;_hasUnscopedTextContent=!1;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){a(Kt).load(ce);let t=a(se,{optional:!0});this.rippleConfig=t||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button")}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(!0)}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents()}_hasIconOrAvatar(){return!!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new re(this,this._ngZone,this._hostElement,this._platform,a(X)),this._rippleRenderer.setupTriggerEvents(this._hostElement)}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(it(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(!1)))})}_updateItemLines(t){if(!this._lines||!this._titles||!this._unscopedContent)return;t&&this._checkDomForUnscopedTextContent();let e=this._explicitLines??this._inferLinesFromContent(),n=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",e<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",e<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",e===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",e===3),this._hasUnscopedTextContent){let s=this._titles.length===0&&e===1;n.classList.toggle("mdc-list-item__primary-text",s),n.classList.toggle("mdc-list-item__secondary-text",!s)}else n.classList.remove("mdc-list-item__primary-text"),n.classList.remove("mdc-list-item__secondary-text")}_inferLinesFromContent(){let t=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(t+=1),t}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(t=>t.nodeType!==t.COMMENT_NODE).some(t=>!!(t.textContent&&t.textContent.trim()))}static \u0275fac=function(e){return new(e||i)};static \u0275dir=w({type:i,contentQueries:function(e,n,s){if(e&1&&F(s,ai,4)(s,oi,4),e&2){let c;h(c=p())&&(n._avatars=c),h(c=p())&&(n._icons=c)}},hostVars:4,hostBindings:function(e,n){e&2&&(k("aria-disabled",n.disabled)("disabled",n._isButtonElement&&n.disabled||null),_("mdc-list-item--disabled",n.disabled))},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return i})();var Me=(()=>{class i extends si{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(t){this._activated=f(t)}_activated=!1;_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(i)))(n||i)}})();static \u0275cmp=m({type:i,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(e,n,s){if(e&1&&F(s,ii,5)(s,ei,5)(s,ni,5),e&2){let c;h(c=p())&&(n._lines=c),h(c=p())&&(n._titles=c),h(c=p())&&(n._meta=c)}},viewQuery:function(e,n){if(e&1&&J(Ke,5)(Xe,5),e&2){let s;h(s=p())&&(n._unscopedContent=s.first),h(s=p())&&(n._itemText=s.first)}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(e,n){e&2&&(k("aria-current",n._getAriaCurrent()),_("mdc-list-item--activated",n.activated)("mdc-list-item--with-leading-avatar",n._avatars.length!==0)("mdc-list-item--with-leading-icon",n._icons.length!==0)("mdc-list-item--with-trailing-meta",n._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",n._hasBothLeadingAndTrailing())("_mat-animation-noopable",n._noopAnimations))},inputs:{activated:"activated"},exportAs:["matListItem"],features:[M],ngContentSelectors:Je,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-focus-indicator"]],template:function(e,n){e&1&&(v(Ye),d(0),r(1,"span",1),d(2,1),d(3,2),r(4,"span",2,0),b("cdkObserveContent",function(){return n._updateItemLines(!0)}),d(6,3),l()(),d(7,4),d(8,5),E(9,"div",3))},dependencies:[Yt],encapsulation:2,changeDetection:0})}return i})();var De=(()=>{class i extends St{_isNonInteractive=!1;static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(i)))(n||i)}})();static \u0275cmp=m({type:i,selectors:[["mat-nav-list"]],hostAttrs:["role","navigation",1,"mat-mdc-nav-list","mat-mdc-list-base","mdc-list"],exportAs:["matNavList"],features:[z([{provide:St,useExisting:i}]),M],ngContentSelectors:Ze,decls:1,vars:0,template:function(e,n){e&1&&(v(),d(0))},styles:[$e],encapsulation:2,changeDetection:0})}return i})();var Oe=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=I({type:i});static \u0275inj=L({imports:[Jt,le,de,B,ye]})}return i})();var li={audience:A.auth0.audience,rolesClaim:A.auth0.rolesClaim};function pt(i){let o=i?.[li.rolesClaim];return Array.isArray(o)?o.filter(t=>typeof t=="string"):typeof o=="string"&&o.trim().length>0?[o]:[]}var _t=class i{auth=a($);roles$=this.auth.user$.pipe(O(o=>pt(o)));hasRole(o){return this.roles$.pipe(O(t=>t.includes(o)))}hasAnyRole(o){return this.roles$.pipe(O(t=>t.some(e=>o.includes(e))))}static \u0275fac=function(t){return new(t||i)};static \u0275prov=nt({token:i,factory:i.\u0275fac,providedIn:"root"})};function mi(i,o){i&1&&(r(0,"div",23),g(1,"Principal"),l())}function hi(i,o){if(i&1){let t=q();r(0,"a",24),b("click",function(){G(t);let n=S();return H(n.closeSidebarOnMobile())}),r(1,"div",10)(2,"mat-icon"),g(3,"groups"),l(),r(4,"span",11),g(5,"Empleados"),l()()()}}function pi(i,o){i&1&&(r(0,"div",25),E(1,"div",26),r(2,"div")(3,"strong"),g(4,"Gestion central"),l(),r(5,"p"),g(6,"Accesos rapidos del sistema"),l()()())}function _i(i,o){i&1&&(r(0,"span"),g(1,"Cerrar sesion"),l())}function gi(i,o){if(i&1){let t=q();r(0,"button",27),b("click",function(){G(t);let n=S();return H(n.toggleSidebar())}),r(1,"mat-icon"),g(2,"menu"),l()()}}var gt=class i{router=a(st);breakpointObserver=a(Xt);roleService=a(_t);auth=a($);isSuperAdmin$=this.roleService.hasRole("SuperAdmin");isAdminOrSuperAdmin$=this.roleService.hasAnyRole(["SuperAdmin","Admin"]);isCollapsed=!0;isMobile=!1;isMobileSidebarOpen=!1;employeesMenuOpen=!1;clientsMenuOpen=!1;movementsMenuOpen=!1;constructor(){this.breakpointObserver.observe("(max-width: 767px)").subscribe(({matches:o})=>{if(this.isMobile=o,o){this.isCollapsed=!1,this.isMobileSidebarOpen=!1,this.syncLayout();return}this.isCollapsed=!0,this.isMobileSidebarOpen=!1,this.syncLayout()}),this.router.events.subscribe(o=>{o instanceof Wt&&this.syncLayout()})}get isEmployeesSectionActive(){return this.router.url.startsWith("/employees")}get isClientsSectionActive(){return this.router.url.startsWith("/clients")||this.router.url.startsWith("/membership-plans")}get isMovementsSectionActive(){return this.router.url.startsWith("/movements")}toggleSidebar(){if(this.isMobile){this.isMobileSidebarOpen=!this.isMobileSidebarOpen,this.syncLayout();return}this.isCollapsed=!this.isCollapsed,this.syncLayout()}toggleEmployeesMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.employeesMenuOpen=!this.employeesMenuOpen}toggleClientsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.clientsMenuOpen=!this.clientsMenuOpen}toggleMovementsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.movementsMenuOpen=!this.movementsMenuOpen}closeSidebarOnMobile(){this.isMobile&&(this.isMobileSidebarOpen=!1,this.syncLayout())}logout(){let t=window.location.hostname.includes("github.io")?`${window.location.origin}/gym-management-frontend/`:window.location.origin;this.auth.logout({logoutParams:{returnTo:t}})}syncLayout(){requestAnimationFrame(()=>{window.dispatchEvent(new Event("resize"))})}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=m({type:i,selectors:[["app-shell"]],decls:44,vars:14,consts:[["autosize","",1,"app-container"],[1,"app-sidenav",3,"mode","opened"],[1,"sidebar-content"],[1,"sidebar-header"],[1,"brand"],["src","images/gymLogo.png","alt","Gym Admin","width","160","height","56",1,"brand-logo"],["mat-icon-button","","type","button",1,"collapse-button",3,"click"],["class","sidebar-section-label",4,"ngIf"],[1,"nav-list"],["mat-list-item","","routerLink","/dashboard","routerLinkActive","active-link",3,"click"],[1,"nav-item-content"],[1,"nav-text"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/clients","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/movements","routerLinkActive","active-link",3,"click"],[1,"sidebar-footer"],["class","sidebar-footer-card",4,"ngIf"],["mat-stroked-button","","type","button",1,"logout-button",3,"click"],[4,"ngIf"],["color","primary",1,"app-toolbar"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button"],[1,"toolbar-title"],[1,"app-content"],[1,"sidebar-section-label"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click"],[1,"sidebar-footer-card"],[1,"footer-dot"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button",3,"click"]],template:function(t,e){t&1&&(r(0,"mat-sidenav-container",0)(1,"mat-sidenav",1)(2,"div",2)(3,"div",3)(4,"div",4),E(5,"img",5),l(),r(6,"button",6),b("click",function(){return e.toggleSidebar()}),r(7,"mat-icon"),g(8),l()()(),U(9,mi,2,0,"div",7),r(10,"mat-nav-list",8)(11,"a",9),b("click",function(){return e.closeSidebarOnMobile()}),r(12,"div",10)(13,"mat-icon"),g(14,"dashboard"),l(),r(15,"span",11),g(16,"Dashboard"),l()()(),U(17,hi,6,0,"a",12),Rt(18,"async"),r(19,"a",13),b("click",function(){return e.closeSidebarOnMobile()}),r(20,"div",10)(21,"mat-icon"),g(22,"person"),l(),r(23,"span",11),g(24,"Clientes"),l()()(),r(25,"a",14),b("click",function(){return e.closeSidebarOnMobile()}),r(26,"div",10)(27,"mat-icon"),g(28,"payments"),l(),r(29,"span",11),g(30,"Movimientos"),l()()()(),r(31,"div",15),U(32,pi,7,0,"div",16),r(33,"button",17),b("click",function(){return e.logout()}),r(34,"mat-icon"),g(35,"logout"),l(),U(36,_i,2,0,"span",18),l()()()(),r(37,"mat-sidenav-content")(38,"mat-toolbar",19),P(39,gi,3,0,"button",20),r(40,"span",21),g(41,"Sistema de Gestion de Gimnasio"),l()(),r(42,"main",22),E(43,"router-outlet"),l()()()),t&2&&(u(),_("collapsed",e.isCollapsed),V("mode",e.isMobile?"over":"side")("opened",e.isMobile?e.isMobileSidebarOpen:!0),u(5),k("aria-label",e.isMobile?"Cerrar menu lateral":"Colapsar menu lateral"),u(2),zt(e.isMobile?"close":"menu"),u(),V("ngIf",!e.isCollapsed),u(8),V("ngIf",Bt(18,12,e.isSuperAdmin$)),u(15),V("ngIf",!e.isCollapsed),u(),k("aria-label",e.isCollapsed?"Cerrar sesion":null),u(3),V("ngIf",!e.isCollapsed),u(3),T(e.isMobile?39:-1))},dependencies:[Nt,jt,rt,Ut,qt,xe,Ot,ve,mt,ke,we,Oe,De,Me,fe,be,pe,he,me,Vt],styles:[".app-container[_ngcontent-%COMP%]{height:100dvh;background:var(--app-bg)}.app-sidenav[_ngcontent-%COMP%]{width:260px;transition:width .2s ease;overflow:hidden;border-right:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,#0f0f10,#19191c);color:#fff;box-shadow:inset -1px 0 #ffffff0a}.app-sidenav.collapsed[_ngcontent-%COMP%]{width:80px}.sidebar-content[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;gap:1rem;padding:1rem .875rem;box-sizing:border-box;overflow:hidden}.sidebar-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;min-height:72px;padding:.25rem .35rem .75rem;border-bottom:1px solid rgba(255,255,255,.08)}.brand[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;min-width:0;min-height:130px}.brand-logo[_ngcontent-%COMP%]{display:block;width:min(160px,100%);height:130px;object-fit:contain;object-position:left center}.collapse-button[_ngcontent-%COMP%]{flex-shrink:0;color:#fff;background:#ffffff14}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%]{justify-content:center;padding:.25rem 0}.app-sidenav.collapsed[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{display:none}.sidebar-section-label[_ngcontent-%COMP%]{padding:0 .8rem;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#ffffff70}.nav-list[_ngcontent-%COMP%]{flex:1;overflow:hidden;padding:.25rem 0}.nav-item-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;width:100%}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]{--mdc-list-list-item-container-shape: 16px;min-height:48px;margin:.2rem 0;color:#ffffffdb}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .nav-text[_ngcontent-%COMP%]{color:#ffffffe6!important}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]:hover, .menu-trigger[_ngcontent-%COMP%]:hover{background:#ffffff12}.nav-list[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444}.nav-text[_ngcontent-%COMP%]{white-space:nowrap;font-weight:500}.menu-group[_ngcontent-%COMP%]{margin:.1rem 0}.menu-group.group-active[_ngcontent-%COMP%] > .menu-trigger[_ngcontent-%COMP%]{background:#c1121f29}.menu-trigger[_ngcontent-%COMP%]{width:100%;border:0;background:transparent}.submenu-icon[_ngcontent-%COMP%]{margin-left:auto;transition:transform .2s ease;color:#ffffff80}.submenu-icon.open[_ngcontent-%COMP%]{transform:rotate(180deg)}.submenu[_ngcontent-%COMP%]{margin-top:.1rem;padding-left:.9rem}.submenu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{min-height:42px}.submenu-item-content[_ngcontent-%COMP%]{gap:10px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-item-content[_ngcontent-%COMP%]{justify-content:center}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-text[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]   .submenu-icon[_ngcontent-%COMP%]{display:none}.active-link[_ngcontent-%COMP%]{background:linear-gradient(90deg,#c1121f3d,#c1121f14);box-shadow:inset 0 0 0 1px #c1121f3d}.sidebar-footer[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;margin-top:auto}.sidebar-footer-card[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;padding:.9rem 1rem;border-radius:18px;background:#ffffff0d;border:1px solid rgba(255,255,255,.08)}.sidebar-footer-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:.92rem}.sidebar-footer-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.2rem 0 0;font-size:.8rem;color:#ffffff9e}.footer-dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:999px;background:#ef4444;box-shadow:0 0 0 6px #ef444429}.logout-button[_ngcontent-%COMP%]{width:100%;min-height:46px;justify-content:flex-start;border-radius:16px;border-color:#ffffff24!important;background:#ffffff0a;color:#fff!important}.logout-button[_ngcontent-%COMP%]:hover{background:#ef44441f;border-color:#ef444459!important}.logout-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-footer[_ngcontent-%COMP%]{align-items:center}.app-sidenav.collapsed[_ngcontent-%COMP%]   .logout-button[_ngcontent-%COMP%]{width:48px;min-width:48px;padding:0;justify-content:center}.app-toolbar[_ngcontent-%COMP%]{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:.5rem;background:#ffffffeb;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:var(--app-text);box-shadow:inset 0 -1px #12121214}.mobile-menu-button[_ngcontent-%COMP%]{display:none;flex-shrink:0;background:var(--app-accent-soft);color:var(--app-accent)}.toolbar-title[_ngcontent-%COMP%]{font-weight:700;letter-spacing:-.01em}.app-content[_ngcontent-%COMP%]{padding:1.5rem;background:radial-gradient(circle at top right,rgba(193,18,31,.1),transparent 22%),linear-gradient(180deg,#f6f6f7,#fff);min-height:calc(100dvh - 64px);box-sizing:border-box}@media(max-width:767px){.app-sidenav[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]{width:min(86vw,320px)}.sidebar-content[_ngcontent-%COMP%]{padding:.9rem .75rem}.sidebar-header[_ngcontent-%COMP%]{min-height:64px}.mobile-menu-button[_ngcontent-%COMP%]{display:inline-flex}.toolbar-title[_ngcontent-%COMP%]{font-size:.95rem;line-height:1.25}.app-content[_ngcontent-%COMP%]{padding:1rem;min-height:calc(100dvh - 56px)}}"]})};var ut=i=>{let o=a($),t=a(st),e=i.data.roles??[];return Lt([o.isAuthenticated$,o.user$]).pipe(O(([n,s])=>n?e.length===0||pt(s).some(Le=>e.includes(Le))?!0:t.createUrlTree(["/dashboard"]):t.createUrlTree(["/login"])))};var Se=[{path:"login",loadComponent:()=>import("./chunk-JVTW6BDR.js").then(i=>i.LoginComponent)},{path:"",component:gt,canActivate:[ge],children:[{path:"",redirectTo:"dashboard",pathMatch:"full"},{path:"dashboard",loadComponent:()=>import("./chunk-K3SBZHRU.js").then(i=>i.DashboardPageComponent)},{path:"employees",loadComponent:()=>import("./chunk-RN2WALMV.js").then(i=>i.EmployeesPageComponent),canActivate:[ut],data:{roles:["SuperAdmin"]}},{path:"employees/categories",loadComponent:()=>import("./chunk-JOLAHF76.js").then(i=>i.EmployeeCategoriesPageComponent),canActivate:[ut],data:{roles:["SuperAdmin"]}},{path:"employees/:id",loadComponent:()=>import("./chunk-ZIW7FO5W.js").then(i=>i.EmployeeDetailsPageComponent),canActivate:[ut],data:{roles:["SuperAdmin"]}},{path:"clients",loadComponent:()=>import("./chunk-2VSC2UIG.js").then(i=>i.ClientsPageComponent)},{path:"clients/:id",loadComponent:()=>import("./chunk-AJ2YSSI3.js").then(i=>i.ClientDetailsPageComponent)},{path:"membership-plans",loadComponent:()=>import("./chunk-QVB5XNPO.js").then(i=>i.MembershipPlansPageComponent)},{path:"movements",loadComponent:()=>import("./chunk-32DNPMEB.js").then(i=>i.MovementsPageComponent)},{path:"movements/categories",loadComponent:()=>import("./chunk-ICKPWFFW.js").then(i=>i.CashMovementCategoriesPageComponent)}]}];var bt=class i extends lt{itemsPerPageLabel="Filas por pagina";nextPageLabel="Pagina siguiente";previousPageLabel="Pagina anterior";firstPageLabel="Primera pagina";lastPageLabel="Ultima pagina";getRangeLabel=(o,t,e)=>{if(e===0||t===0)return`0 de ${e}`;let n=o*t,s=Math.min(n+t,e);return`${n+1}-${s} de ${e}`};static \u0275fac=(()=>{let o;return function(e){return(o||(o=x(i)))(e||i)}})();static \u0275prov=nt({token:i,factory:i.\u0275fac})};var ui="/gym-management-frontend/",bi=window.location.hostname.includes("github.io")?`${window.location.origin}${ui}`:window.location.origin,Ae={providers:[Tt(),Gt(Ht([ue])),Zt(Se),{provide:lt,useClass:bt},_e({domain:A.auth0.domain,clientId:A.auth0.clientId,authorizationParams:{redirect_uri:bi,audience:A.auth0.audience},httpInterceptor:{allowedList:[{uri:`${A.apiUrl}/api/*`,tokenOptions:{authorizationParams:{audience:A.auth0.audience}}}]}})]};var ft=class i{title=j("gym-management-frontend");static \u0275fac=function(t){return new(t||i)};static \u0275cmp=m({type:i,selectors:[["app-root"]],decls:1,vars:0,template:function(t,e){t&1&&E(0,"router-outlet")},dependencies:[rt],encapsulation:2})};Qt(ft,Ae).catch(i=>console.error(i));
