import{c as Qe}from"./chunk-Z7WKM6UX.js";import{a as Be,b as Re,c as je}from"./chunk-U6MR4SQI.js";import{a as ft,b as Ie,c as Ee,d as Le}from"./chunk-JDMUGCIQ.js";import{a as Ne}from"./chunk-TMM4MLA3.js";import{a as Ve}from"./chunk-52VXTSRU.js";import{d as Te}from"./chunk-PVCFLY3E.js";import{g as Pe}from"./chunk-A3GLTE7T.js";import{c as be}from"./chunk-JMOBWV77.js";import"./chunk-H36OK5IN.js";import{a as le,b as J,c as ce,d as At}from"./chunk-2CUK44VX.js";import{H as ke,l as fe,p as ve,s as xe,v as we}from"./chunk-XRB5EXYA.js";import{A as _e,E as D,I as bt,P as ye,Q as Ce,S as Me,T as Se,U as Oe,V as Ae,W as De,X as ze,Y as Fe,a as W,e as re,h as st,j as se,n as q,p as de,s as me,w as pe,x as he,y as ge,z as ue}from"./chunk-NDGVGTOU.js";import{a as Jt,d as te,e as ee,g as ie,i as ut,j as _t,k as ne,l as ae,m as oe,o as $}from"./chunk-SLW6C7XU.js";import{$ as dt,$a as m,$b as u,B as et,Ba as I,Cb as O,D as ct,Da as F,E as Rt,Ea as Gt,Eb as C,F as St,Fb as Ht,Gb as M,Gc as Zt,H as jt,Jb as pt,Kb as ht,Lb as y,Mb as a,Mc as rt,Nb as s,Ob as A,R as it,S as Vt,T as z,Vb as v,Xa as $t,Xb as h,Zb as p,_a as Ut,_b as T,aa as Q,ac as U,ad as Kt,bc as ot,ca as X,cc as x,d as zt,dc as w,dd as Xt,ea as c,eb as Pt,g as S,ga as Nt,gd as Yt,hb as Ot,ic as gt,jc as k,ka as _,kc as Wt,l as K,la as b,lc as l,mc as L,oa as nt,ob as f,oc as qt,p as N,pa as mt,pb as G,q as Ft,qb as E,sa as at,sb as B,ta as Y,tb as R,uc as H,v as Bt,wa as Qt,xa as P,xc as j,y as lt,yc as V,z as tt}from"./chunk-MS2OK67X.js";var vt=(()=>{class e{changes=new S;itemsPerPageLabel="Items per page:";nextPageLabel="Next page";previousPageLabel="Previous page";firstPageLabel="First page";lastPageLabel="Last page";getRangeLabel=(t,i,n)=>{if(n==0||i==0)return`0 of ${n}`;n=Math.max(n,0);let r=t*i,d=r<n?Math.min(r+i,n):r+i;return`${r+1} \u2013 ${d} of ${n}`};static \u0275fac=function(i){return new(i||e)};static \u0275prov=dt({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var kt=["*"],oi=["content"],ri=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],si=["mat-drawer","mat-drawer-content","*"];function li(e,o){if(e&1){let t=v();a(0,"div",1),h("click",function(){_(t);let n=p();return b(n._onBackdropClicked())}),s()}if(e&2){let t=p();k("mat-drawer-shown",t._isShowingBackdrop())}}function ci(e,o){e&1&&(a(0,"mat-drawer-content"),u(1,2),s())}var di=[[["mat-sidenav"]],[["mat-sidenav-content"]],"*"],mi=["mat-sidenav","mat-sidenav-content","*"];function pi(e,o){if(e&1){let t=v();a(0,"div",1),h("click",function(){_(t);let n=p();return b(n._onBackdropClicked())}),s()}if(e&2){let t=p();k("mat-drawer-shown",t._isShowingBackdrop())}}function hi(e,o){e&1&&(a(0,"mat-sidenav-content"),u(1,2),s())}var gi=`.mat-drawer-container {
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
`;var ui=new X("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),It=new X("MAT_DRAWER_CONTAINER"),xt=(()=>{class e extends J{_platform=c(W);_changeDetectorRef=c(rt);_container=c(Tt);constructor(){let t=c(F),i=c(le),n=c(Y);super(t,i,n)}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:t,end:i}=this._container;return t!=null&&t.mode!=="over"&&t.opened||i!=null&&i.mode!=="over"&&i.opened}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=f({type:e,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(i,n){i&2&&(gt("margin-left",n._container._contentMargins.left,"px")("margin-right",n._container._contentMargins.right,"px"),k("mat-drawer-content-hidden",n._shouldBeHidden()))},features:[H([{provide:J,useExisting:e}]),B],ngContentSelectors:kt,decls:1,vars:0,template:function(i,n){i&1&&(T(),u(0))},encapsulation:2,changeDetection:0})}return e})(),Dt=(()=>{class e{_elementRef=c(F);_focusTrapFactory=c(_e);_focusMonitor=c(me);_platform=c(W);_ngZone=c(Y);_renderer=c(Ot);_interactivityChecker=c(ue);_doc=c(mt);_container=c(It,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(t){t=t==="end"?"end":"start",t!==this._position&&(this._isAttached&&this._updatePositionInParent(t),this._position=t,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(t){this._mode=t,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(t){this._disableClose=D(t)}_disableClose=!1;get autoFocus(){let t=this._autoFocus;return t??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(t){(t==="true"||t==="false"||t==null)&&(t=D(t)),this._autoFocus=t}_autoFocus;get opened(){return this._opened()}set opened(t){this.toggle(D(t))}_opened=P(!1);_openedVia=null;_animationStarted=new S;_animationEnd=new S;openedChange=new at(!0);_openedStream=this.openedChange.pipe(tt(t=>t),N(()=>{}));openedStart=this._animationStarted.pipe(tt(()=>this.opened),St(void 0));_closedStream=this.openedChange.pipe(tt(t=>!t),N(()=>{}));closedStart=this._animationStarted.pipe(tt(()=>!this.opened),St(void 0));_destroyed=new S;onPositionChanged=new at;_content;_modeChanged=new S;_injector=c(nt);_changeDetectorRef=c(rt);constructor(){this.openedChange.pipe(z(this._destroyed)).subscribe(t=>{t?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let t=this._renderer,i=this._elementRef.nativeElement;return[t.listen(i,"keydown",n=>{n.keyCode===27&&!this.disableClose&&!de(n)&&this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault()})}),t.listen(i,"transitionend",this._handleTransitionEvent),t.listen(i,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_forceFocus(t,i){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{r(),d(),t.removeAttribute("tabindex")},r=this._renderer.listen(t,"blur",n),d=this._renderer.listen(t,"mousedown",n)})),t.focus(i)}_focusByCssSelector(t,i){let n=this._elementRef.nativeElement.querySelector(t);n&&this._forceFocus(n,i)}_takeFocus(){if(!this._focusTrap)return;let t=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":Pt(()=>{!this._focusTrap.focusInitialElement()&&typeof t.focus=="function"&&t.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(t){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,t):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let t=this._doc.activeElement;return!!t&&this._elementRef.nativeElement.contains(t)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(t){return this.toggle(!0,t)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(t=!this.opened,i){t&&i&&(this._openedVia=i);let n=this._setOpen(t,!t&&this._isFocusWithinDrawer(),this._openedVia||"program");return t||(this._openedVia=null),n}_setOpen(t,i,n){return t===this.opened?Promise.resolve(t?"open":"close"):(this._opened.set(t),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",t),!t&&i&&this._restoreFocus(n),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(r=>{this.openedChange.pipe(Rt(1)).subscribe(d=>r(d?"open":"close"))}))}_setIsAnimating(t){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",t)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(t){if(!this._platform.isBrowser)return;let i=this._elementRef.nativeElement,n=i.parentNode;t==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),n.insertBefore(this._anchor,i)),n.appendChild(i)):this._anchor&&this._anchor.parentNode.insertBefore(i,this._anchor)}_handleTransitionEvent=t=>{let i=this._elementRef.nativeElement;t.target===i&&this._ngZone.run(()=>{t.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(t)})};static \u0275fac=function(i){return new(i||e)};static \u0275cmp=f({type:e,selectors:[["mat-drawer"]],viewQuery:function(i,n){if(i&1&&ot(oi,5),i&2){let r;x(r=w())&&(n._content=r.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(i,n){i&2&&(O("align",null)("tabIndex",n.mode!=="side"?"-1":null),gt("visibility",!n._container&&!n.opened?"hidden":null),k("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:kt,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(i,n){i&1&&(T(),a(0,"div",1,0),u(2),s())},dependencies:[J],encapsulation:2,changeDetection:0})}return e})(),Tt=(()=>{class e{_dir=c(se,{optional:!0});_element=c(F);_ngZone=c(Y);_changeDetectorRef=c(rt);_animationDisabled=bt();_transitionsEnabled=!1;_allDrawers;_drawers=new Gt;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(t){this._autosize=D(t)}_autosize=c(ui);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(t){this._backdropOverride=t==null?null:D(t)}_backdropOverride=null;backdropClick=new at;_start=null;_end=null;_left=null;_right=null;_destroyed=new S;_doCheckSubject=new S;_contentMargins={left:null,right:null};_contentMarginChanges=new S;get scrollable(){return this._userContent||this._content}_injector=c(nt);constructor(){let t=c(W),i=c(ce);this._dir?.change.pipe(z(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),i.change().pipe(z(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&t.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(it(this._allDrawers),z(this._destroyed)).subscribe(t=>{this._drawers.reset(t.filter(i=>!i._container||i._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(it(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(t=>{this._watchDrawerToggle(t),this._watchDrawerPosition(t),this._watchDrawerMode(t)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(ct(10),z(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(t=>t.open())}close(){this._drawers.forEach(t=>t.close())}updateContentMargins(){let t=0,i=0;if(this._left&&this._left.opened){if(this._left.mode=="side")t+=this._left._getWidth();else if(this._left.mode=="push"){let n=this._left._getWidth();t+=n,i-=n}}if(this._right&&this._right.opened){if(this._right.mode=="side")i+=this._right._getWidth();else if(this._right.mode=="push"){let n=this._right._getWidth();i+=n,t-=n}}t=t||null,i=i||null,(t!==this._contentMargins.left||i!==this._contentMargins.right)&&(this._contentMargins={left:t,right:i},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(t){t._animationStarted.pipe(z(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),t.mode!=="side"&&t.openedChange.pipe(z(this._drawers.changes)).subscribe(()=>this._setContainerClass(t.opened))}_watchDrawerPosition(t){t.onPositionChanged.pipe(z(this._drawers.changes)).subscribe(()=>{Pt({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(t){t._modeChanged.pipe(z(lt(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(t){let i=this._element.nativeElement.classList,n="mat-drawer-container-has-open";t?i.add(n):i.remove(n)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(t=>{t.position=="end"?(this._end!=null,this._end=t):(this._start!=null,this._start=t)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(t=>t&&!t.disableClose&&this._drawerHasBackdrop(t)).forEach(t=>t._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(t){return t!=null&&t.opened}_drawerHasBackdrop(t){return this._backdropOverride==null?!!t&&t.mode!=="side":this._backdropOverride}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=f({type:e,selectors:[["mat-drawer-container"]],contentQueries:function(i,n,r){if(i&1&&U(r,xt,5)(r,Dt,5),i&2){let d;x(d=w())&&(n._content=d.first),x(d=w())&&(n._allDrawers=d)}},viewQuery:function(i,n){if(i&1&&ot(xt,5),i&2){let r;x(r=w())&&(n._userContent=r.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(i,n){i&2&&k("mat-drawer-container-explicit-backdrop",n._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[H([{provide:It,useExisting:e}])],ngContentSelectors:si,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(i,n){i&1&&(T(ri),C(0,li,1,2,"div",0),u(1),u(2,1),C(3,ci,2,0,"mat-drawer-content")),i&2&&(M(n.hasBackdrop?0:-1),m(3),M(n._content?-1:3))},dependencies:[xt],styles:[`.mat-drawer-container {
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
`],encapsulation:2,changeDetection:0})}return e})(),wt=(()=>{class e extends xt{static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[H([{provide:J,useExisting:e}]),B],ngContentSelectors:kt,decls:1,vars:0,template:function(i,n){i&1&&(T(),u(0))},encapsulation:2,changeDetection:0})}return e})(),Et=(()=>{class e extends Dt{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(t){this._fixedInViewport=D(t)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(t){this._fixedTopGap=st(t)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(t){this._fixedBottomGap=st(t)}_fixedBottomGap=0;static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(i,n){i&2&&(O("tabIndex",n.mode!=="side"?"-1":null)("align",null),gt("top",n.fixedInViewport?n.fixedTopGap:null,"px")("bottom",n.fixedInViewport?n.fixedBottomGap:null,"px"),k("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side")("mat-sidenav-fixed",n.fixedInViewport))},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[H([{provide:Dt,useExisting:e}]),B],ngContentSelectors:kt,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(i,n){i&1&&(T(),a(0,"div",1,0),u(2),s())},dependencies:[J],encapsulation:2,changeDetection:0})}return e})(),Ge=(()=>{class e extends Tt{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-sidenav-container"]],contentQueries:function(i,n,r){if(i&1&&U(r,wt,5)(r,Et,5),i&2){let d;x(d=w())&&(n._content=d.first),x(d=w())&&(n._allDrawers=d)}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(i,n){i&2&&k("mat-drawer-container-explicit-backdrop",n._backdropOverride)},exportAs:["matSidenavContainer"],features:[H([{provide:It,useExisting:e},{provide:Tt,useExisting:e}]),B],ngContentSelectors:mi,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(i,n){i&1&&(T(di),C(0,pi,1,2,"div",0),u(1),u(2,1),C(3,hi,2,0,"mat-sidenav-content")),i&2&&(M(n.hasBackdrop?0:-1),m(3),M(n._content?-1:3))},dependencies:[wt],styles:[gi],encapsulation:2,changeDetection:0})}return e})(),$e=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=G({type:e});static \u0275inj=Q({imports:[At,q,At]})}return e})();var bi=["*",[["mat-toolbar-row"]]],fi=["*","mat-toolbar-row"],vi=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return e})(),Ue=(()=>{class e{_elementRef=c(F);_platform=c(W);_document=c(mt);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=f({type:e,selectors:[["mat-toolbar"]],contentQueries:function(i,n,r){if(i&1&&U(r,vi,5),i&2){let d;x(d=w())&&(n._toolbarRows=d)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(i,n){i&2&&(Wt(n.color?"mat-"+n.color:""),k("mat-toolbar-multiple-rows",n._toolbarRows.length>0)("mat-toolbar-single-row",n._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:fi,decls:2,vars:0,template:function(i,n){i&1&&(T(bi),u(0),u(1,1))},styles:[`.mat-toolbar {
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
`],encapsulation:2,changeDetection:0})}return e})();var He=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=G({type:e});static \u0275inj=Q({imports:[q]})}return e})();var We=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=G({type:e});static \u0275inj=Q({imports:[q]})}return e})();var wi=["*"],ki=`.mdc-list {
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
`,yi=["unscopedContent"],Ci=["text"],Mi=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],Si=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var Pi=new X("ListOption"),Oi=(()=>{class e{_elementRef=c(F);constructor(){}static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return e})(),Ai=(()=>{class e{_elementRef=c(F);constructor(){}static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return e})(),Di=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"]})}return e})(),qe=(()=>{class e{_listOption=c(Pi,{optional:!0});constructor(){}_isAlignedAtStart(){return!this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,hostVars:4,hostBindings:function(i,n){i&2&&k("mdc-list-item__start",n._isAlignedAtStart())("mdc-list-item__end",!n._isAlignedAtStart())}})}return e})(),Ti=(()=>{class e extends qe{static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275dir=E({type:e,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[B]})}return e})(),Ii=(()=>{class e extends qe{static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275dir=E({type:e,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[B]})}return e})(),Ei=new X("MAT_LIST_CONFIG"),Lt=(()=>{class e{_isNonInteractive=!0;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=D(t)}_disableRipple=!1;get disabled(){return this._disabled()}set disabled(t){this._disabled.set(D(t))}_disabled=P(!1);_defaultOptions=c(Ei,{optional:!0});static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,hostVars:1,hostBindings:function(i,n){i&2&&O("aria-disabled",n.disabled)},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return e})(),Li=(()=>{class e{_elementRef=c(F);_ngZone=c(Y);_listBase=c(Lt,{optional:!0});_platform=c(W);_hostElement;_isButtonElement;_noopAnimations=bt();_avatars;_icons;set lines(t){this._explicitLines=st(t,null),this._updateItemLines(!1)}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(t){this._disableRipple=D(t)}_disableRipple=!1;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(t){this._disabled.set(D(t))}_disabled=P(!1);_subscriptions=new zt;_rippleRenderer=null;_hasUnscopedTextContent=!1;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){c(re).load(Me);let t=c(Ce,{optional:!0});this.rippleConfig=t||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button")}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(!0)}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents()}_hasIconOrAvatar(){return!!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new ye(this,this._ngZone,this._hostElement,this._platform,c(nt)),this._rippleRenderer.setupTriggerEvents(this._hostElement)}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(lt(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(!1)))})}_updateItemLines(t){if(!this._lines||!this._titles||!this._unscopedContent)return;t&&this._checkDomForUnscopedTextContent();let i=this._explicitLines??this._inferLinesFromContent(),n=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",i<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",i<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",i===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",i===3),this._hasUnscopedTextContent){let r=this._titles.length===0&&i===1;n.classList.toggle("mdc-list-item__primary-text",r),n.classList.toggle("mdc-list-item__secondary-text",!r)}else n.classList.remove("mdc-list-item__primary-text"),n.classList.remove("mdc-list-item__secondary-text")}_inferLinesFromContent(){let t=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(t+=1),t}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(t=>t.nodeType!==t.COMMENT_NODE).some(t=>!!(t.textContent&&t.textContent.trim()))}static \u0275fac=function(i){return new(i||e)};static \u0275dir=E({type:e,contentQueries:function(i,n,r){if(i&1&&U(r,Ti,4)(r,Ii,4),i&2){let d;x(d=w())&&(n._avatars=d),x(d=w())&&(n._icons=d)}},hostVars:4,hostBindings:function(i,n){i&2&&(O("aria-disabled",n.disabled)("disabled",n._isButtonElement&&n.disabled||null),k("mdc-list-item--disabled",n.disabled))},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return e})();var Ze=(()=>{class e extends Li{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(t){this._activated=D(t)}_activated=!1;_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(i,n,r){if(i&1&&U(r,Ai,5)(r,Oi,5)(r,Di,5),i&2){let d;x(d=w())&&(n._lines=d),x(d=w())&&(n._titles=d),x(d=w())&&(n._meta=d)}},viewQuery:function(i,n){if(i&1&&ot(yi,5)(Ci,5),i&2){let r;x(r=w())&&(n._unscopedContent=r.first),x(r=w())&&(n._itemText=r.first)}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(i,n){i&2&&(O("aria-current",n._getAriaCurrent()),k("mdc-list-item--activated",n.activated)("mdc-list-item--with-leading-avatar",n._avatars.length!==0)("mdc-list-item--with-leading-icon",n._icons.length!==0)("mdc-list-item--with-trailing-meta",n._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",n._hasBothLeadingAndTrailing())("_mat-animation-noopable",n._noopAnimations))},inputs:{activated:"activated"},exportAs:["matListItem"],features:[B],ngContentSelectors:Si,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-focus-indicator"]],template:function(i,n){i&1&&(T(Mi),u(0),a(1,"span",1),u(2,1),u(3,2),a(4,"span",2,0),h("cdkObserveContent",function(){return n._updateItemLines(!0)}),u(6,3),s()(),u(7,4),u(8,5),A(9,"div",3))},dependencies:[he],encapsulation:2,changeDetection:0})}return e})();var Ke=(()=>{class e extends Lt{_isNonInteractive=!1;static \u0275fac=(()=>{let t;return function(n){return(t||(t=I(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["mat-nav-list"]],hostAttrs:["role","navigation",1,"mat-mdc-nav-list","mat-mdc-list-base","mdc-list"],exportAs:["matNavList"],features:[H([{provide:Lt,useExisting:e}]),B],ngContentSelectors:wi,decls:1,vars:0,template:function(i,n){i&1&&(T(),u(0))},styles:[ki],encapsulation:2,changeDetection:0})}return e})();var Xe=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=G({type:e});static \u0275inj=Q({imports:[ge,Se,Pe,q,We]})}return e})();var Ye=(e,o)=>o.route;function Bi(e,o){e&1&&(a(0,"div",30),l(1,"Principal"),s())}function Ri(e,o){if(e&1){let t=v();a(0,"a",31),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),a(1,"div",32)(2,"mat-icon"),l(3,"dashboard"),s(),a(4,"span",33),l(5,"Dashboard"),s()()()}}function ji(e,o){if(e&1){let t=v();a(0,"a",34),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),a(1,"div",32)(2,"mat-icon"),l(3,"groups"),s(),a(4,"span",33),l(5,"Empleados"),s()()()}}function Vi(e,o){if(e&1){let t=v();a(0,"a",35),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),a(1,"div",32)(2,"mat-icon"),l(3,"person"),s(),a(4,"span",33),l(5,"Clientes"),s()()()}}function Ni(e,o){if(e&1){let t=v();a(0,"a",36),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),a(1,"div",32)(2,"mat-icon"),l(3,"description"),s(),a(4,"span",33),l(5,"Contratos"),s()()()}}function Qi(e,o){if(e&1){let t=v();a(0,"a",37),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),a(1,"div",32)(2,"mat-icon"),l(3,"health_and_safety"),s(),a(4,"span",33),l(5,"Salud"),s()()()}}function Gi(e,o){if(e&1){let t=v();a(0,"a",38),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),a(1,"div",32)(2,"mat-icon"),l(3,"payments"),s(),a(4,"span",33),l(5,"Movimientos"),s()()()}}function $i(e,o){if(e&1){let t=v();a(0,"a",39),h("click",function(){_(t);let n=p();return b(n.closeSidebarOnMobile())}),a(1,"div",32)(2,"mat-icon"),l(3,"school"),s(),a(4,"span",33),l(5,"Alumnos"),s()()()}}function Ui(e,o){if(e&1){let t=v();a(0,"div",17)(1,"div",40),A(2,"div",41),a(3,"div")(4,"strong"),l(5,"Gesti\xF3n central"),s(),a(6,"p"),l(7),s()()(),a(8,"button",42),h("click",function(){_(t);let n=p();return b(n.logout())}),a(9,"mat-icon"),l(10,"logout"),s(),a(11,"span"),l(12,"Cerrar sesi\xF3n"),s()()()}if(e&2){let t=p();m(7),L(t.getUserDisplayName(o))}}function Hi(e,o){if(e&1){let t=v();a(0,"button",42),h("click",function(){_(t);let n=p();return b(n.logout())}),a(1,"mat-icon"),l(2,"logout"),s()()}if(e&2){let t=p();O("aria-label",t.isCollapsed?"Cerrar sesi\xF3n":null)}}function Wi(e,o){if(e&1){let t=v();a(0,"button",43),h("click",function(){_(t);let n=p();return b(n.toggleSidebar())}),a(1,"mat-icon"),l(2,"menu"),s()()}}function qi(e,o){if(e&1&&A(0,"img",44),e&2){let t=p(),i=p();y("src",i.getUserPicture(t),$t)("alt",i.getUserDisplayName(t))}}function Zi(e,o){if(e&1&&(a(0,"span"),l(1),s()),e&2){let t=p(),i=p();m(),L(i.getUserInitials(t))}}function Ki(e,o){if(e&1&&(a(0,"button",27),C(1,qi,1,2,"img",44)(2,Zi,2,1,"span"),s()),e&2){let t=p();m(),M(t.getUserPicture(o)?1:2)}}function Xi(e,o){if(e&1){let t=v();a(0,"button",55),h("click",function(){let n=_(t).$implicit,r=p(3);return b(r.runCommand(n))}),a(1,"span",56)(2,"mat-icon"),l(3),s()(),a(4,"span")(5,"strong"),l(6),s(),a(7,"small"),l(8),s()(),a(9,"mat-icon"),l(10,"arrow_forward"),s()()}if(e&2){let t=o.$implicit;m(3),L(t.icon),m(3),L(t.label),m(2),L(t.description)}}function Yi(e,o){if(e&1&&(a(0,"div",52)(1,"span"),l(2,"Acciones r\xE1pidas"),s(),a(3,"small"),l(4,"Eleg\xED una acci\xF3n o empez\xE1 a escribir"),s()(),a(5,"div",53),pt(6,Xi,11,3,"button",54,Ye),s()),e&2){let t=p(2);m(6),ht(t.quickCommands())}}function Ji(e,o){e&1&&(a(0,"div",50)(1,"mat-icon"),l(2,"keyboard"),s(),a(3,"p"),l(4,"Escrib\xED al menos dos caracteres."),s()())}function tn(e,o){e&1&&(a(0,"div",50)(1,"mat-icon",57),l(2,"progress_activity"),s(),a(3,"p"),l(4,"Buscando en el sistema..."),s()())}function en(e,o){if(e&1){let t=v();a(0,"button",55),h("click",function(){let n=_(t).$implicit,r=p(3);return b(r.runCommand(n))}),a(1,"span",56)(2,"mat-icon"),l(3),s()(),a(4,"span")(5,"strong"),l(6),s(),a(7,"small"),l(8),s()(),a(9,"mat-icon"),l(10,"arrow_forward"),s()()}if(e&2){let t=o.$implicit;m(3),L(t.icon),m(3),L(t.label),m(2),qt("",t.group," \xB7 ",t.description)}}function nn(e,o){if(e&1&&(a(0,"div",51),pt(1,en,11,4,"button",54,Ye),s()),e&2){let t=p(2);m(),ht(t.commandResults())}}function an(e,o){e&1&&(a(0,"div",50)(1,"mat-icon"),l(2,"search_off"),s(),a(3,"strong"),l(4,"Sin resultados"),s(),a(5,"p"),l(6,"Prob\xE1 con nombre, apellido, DNI o t\xEDtulo."),s()())}function on(e,o){if(e&1){let t=v();a(0,"div",45),h("click",function(){_(t);let n=p();return b(n.closeCommandPalette())}),a(1,"section",46),h("click",function(n){return n.stopPropagation()}),a(2,"header")(3,"mat-icon"),l(4,"search"),s(),A(5,"input",47),a(6,"button",48),h("click",function(){_(t);let n=p();return b(n.closeCommandPalette())}),a(7,"mat-icon"),l(8,"close"),s()()(),a(9,"div",49),C(10,Yi,8,0)(11,Ji,5,0,"div",50)(12,tn,5,0,"div",50)(13,nn,3,0,"div",51)(14,an,7,0,"div",50),s(),a(15,"footer")(16,"span")(17,"kbd"),l(18,"Ctrl"),s(),a(19,"kbd"),l(20,"K"),s(),l(21," para abrir"),s(),a(22,"span")(23,"kbd"),l(24,"Esc"),s(),l(25," para cerrar"),s()()()()}if(e&2){let t=p();m(5),y("formControl",t.commandQuery),m(5),M(t.commandQuery.value.trim()?t.commandQuery.value.trim().length<2?11:t.commandSearching()?12:t.commandResults().length?13:14:10)}}var yt=class e{router=c(_t);breakpointObserver=c(pe);roleService=c(je);auth=c(ft);profileService=c(Ve);clientsService=c(Ne);platformService=c(Qe);commandQueryChanges=new S;isSuperAdmin$=this.roleService.hasRole("SuperAdmin");isAdminOrSuperAdmin$=this.roleService.hasAnyRole(["SuperAdmin","Admin"]);user$=this.auth.user$;currentProfile=P(null);commandQuery=new xe("",{nonNullable:!0});commandOpen=P(!1);commandSearching=P(!1);commandResults=P([]);isSuperAdmin=P(!1);quickCommands=Zt(()=>[{icon:"person_add",label:"Nuevo alumno",description:"Abrir alta de alumnos",route:"/clients/new",group:"Acciones"},...this.isSuperAdmin()?[{icon:"payments",label:"Registrar pago",description:"Cargar un nuevo cobro",route:"/movements/payments/new",group:"Acciones"},{icon:"add_circle",label:"Nuevo ejercicio",description:"Crear ejercicio del gimnasio",route:"/student-platform/exercises/new",group:"Acciones"},{icon:"fitness_center",label:"Nuevo workout",description:"Armar una rutina reutilizable",route:"/student-platform/routines/new",group:"Acciones"},{icon:"assignment_add",label:"Nuevo plan",description:"Crear un plan de entrenamiento",route:"/student-platform/training-plans/new",group:"Acciones"},{icon:"description",label:"Contratos pendientes",description:"Revisar seguimiento contractual",route:"/contracts",group:"Acciones"}]:[]]);isCollapsed=!0;isMobile=!1;isMobileSidebarOpen=!1;employeesMenuOpen=!1;clientsMenuOpen=!1;movementsMenuOpen=!1;isDarkTheme=!1;constructor(){this.initTheme(),this.initCommandSearch(),this.isSuperAdmin$.subscribe(o=>this.isSuperAdmin.set(o)),this.breakpointObserver.observe("(max-width: 1024px)").subscribe(({matches:o})=>{if(this.isMobile=o,o){this.isCollapsed=!1,this.isMobileSidebarOpen=!1,this.syncLayout();return}this.isCollapsed=!0,this.isMobileSidebarOpen=!1,this.syncLayout()}),this.router.events.subscribe(o=>{o instanceof ie&&(this.loadCurrentProfile(),this.syncLayout())}),this.loadCurrentProfile()}get isEmployeesSectionActive(){return this.router.url.startsWith("/employees")}get isClientsSectionActive(){return this.router.url.startsWith("/clients")||this.router.url.startsWith("/membership-plans")}get isHealthSectionActive(){return this.router.url.startsWith("/health")}get isMovementsSectionActive(){return this.router.url.startsWith("/movements")}toggleSidebar(){if(this.isMobile){this.isMobileSidebarOpen=!this.isMobileSidebarOpen,this.syncLayout();return}this.isCollapsed=!this.isCollapsed,this.syncLayout()}toggleEmployeesMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.employeesMenuOpen=!this.employeesMenuOpen}toggleClientsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.clientsMenuOpen=!this.clientsMenuOpen}toggleMovementsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.movementsMenuOpen=!this.movementsMenuOpen}closeSidebarOnMobile(){this.isMobile&&(this.isMobileSidebarOpen=!1,this.syncLayout())}toggleTheme(){this.isDarkTheme=!this.isDarkTheme,this.applyTheme()}handleGlobalShortcut(o){(o.ctrlKey||o.metaKey)&&o.key.toLowerCase()==="k"?(o.preventDefault(),this.openCommandPalette()):o.key==="Escape"&&this.commandOpen()&&this.closeCommandPalette()}openCommandPalette(){this.commandOpen.set(!0),document.body.style.overflow="hidden",window.setTimeout(()=>document.querySelector(".global-command-input")?.focus())}closeCommandPalette(){this.commandOpen.set(!1),this.commandQuery.setValue(""),this.commandResults.set([]),document.body.style.overflow=""}runCommand(o){this.closeCommandPalette(),this.router.navigateByUrl(o.route)}logout(){let o=$.auth0.logoutReturnTo||window.location.origin;this.auth.logout({logoutParams:{returnTo:o}})}getUserDisplayName(o){let t=this.currentProfile(),i=`${t?.nombre??""} ${t?.apellido??""}`.trim();if(i)return i;let n=o?.name,r=o?.nickname,d=o?.email;return typeof n=="string"&&n.trim()?n:typeof r=="string"&&r.trim()?r:typeof d=="string"&&d.trim()?d:"usuario"}getUserInitials(o){let t=this.currentProfile();return(`${t?.nombre??""} ${t?.apellido??""}`.trim()||this.getUserDisplayName(o)).split(/[\s@._-]+/).map(d=>d.trim()).filter(Boolean).slice(0,2).map(d=>d[0]?.toUpperCase()).join("")||"U"}getUserPicture(o){let t=this.currentProfile()?.avatarUrl;if(t?.trim())return t;let i=o?.picture;return typeof i=="string"&&i.trim()?i:null}loadCurrentProfile(){this.profileService.getMe().subscribe({next:o=>this.currentProfile.set(o),error:()=>this.currentProfile.set(null)})}syncLayout(){requestAnimationFrame(()=>{window.dispatchEvent(new Event("resize"))})}initTheme(){let o=localStorage.getItem("gym-theme"),t=window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1;this.isDarkTheme=o?o==="dark":t,this.applyTheme()}applyTheme(){document.body.classList.toggle("dark-theme",this.isDarkTheme),localStorage.setItem("gym-theme",this.isDarkTheme?"dark":"light")}initCommandSearch(){this.commandQuery.valueChanges.subscribe(o=>this.commandQueryChanges.next(o)),this.commandQueryChanges.pipe(it(""),N(o=>o.trim()),ct(220),jt(),Vt(o=>{if(o.length<2)return this.commandSearching.set(!1),K([]);this.commandSearching.set(!0);let t=o.toLocaleLowerCase("es"),i=this.clientsService.getPaged(1,6,{search:o}).pipe(et(()=>K({items:[],pageNumber:1,pageSize:6,totalCount:0,totalPages:0})));return this.isSuperAdmin()?Bt({clients:i,exercises:this.platformService.getExercises(o).pipe(et(()=>K([]))),routines:this.platformService.getRoutineTemplates().pipe(et(()=>K([]))),plans:this.platformService.getTrainingPlans().pipe(et(()=>K([])))}).pipe(N(n=>[...n.clients.items.slice(0,6).map(r=>({icon:"person",label:`${r.nombre} ${r.apellido}`,description:`DNI ${r.dni}`,route:`/clients/${r.id}`,group:"Alumnos"})),...n.exercises.slice(0,5).map(r=>({icon:"exercise",label:r.name,description:r.muscleGroup||"Ejercicio",route:`/student-platform/exercises/${r.id}`,group:"Ejercicios"})),...n.routines.filter(r=>`${r.name} ${r.description??""}`.toLocaleLowerCase("es").includes(t)).slice(0,5).map(r=>({icon:"fitness_center",label:r.name,description:`${r.exercises.length} ejercicios`,route:`/student-platform/routines/${r.id}`,group:"Workouts"})),...n.plans.filter(r=>`${r.name} ${r.description??""}`.toLocaleLowerCase("es").includes(t)).slice(0,5).map(r=>({icon:"assignment",label:r.name,description:`${r.workoutCount} workouts`,route:`/student-platform/training-plans/${r.id}`,group:"Planes"}))])):i.pipe(N(n=>n.items.slice(0,6).map(r=>({icon:"person",label:`${r.nombre} ${r.apellido}`,description:`DNI ${r.dni}`,route:`/clients/${r.id}`,group:"Alumnos"}))))})).subscribe(o=>{this.commandResults.set(o),this.commandSearching.set(!1)})}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=f({type:e,selectors:[["app-shell"]],hostBindings:function(t,i){t&1&&h("keydown",function(r){return i.handleGlobalShortcut(r)},Ut)},decls:52,vars:39,consts:[["autosize","",1,"app-container"],[1,"app-sidenav",3,"mode","opened"],[1,"sidebar-content"],[1,"sidebar-header"],[1,"brand"],["src","images/gymLogo.png","alt","Gym Admin","width","160","height","56",1,"brand-logo"],["mat-icon-button","","type","button",1,"collapse-button",3,"click"],["class","sidebar-section-label",4,"ngIf"],[1,"nav-list"],["mat-list-item","","routerLink","/dashboard","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/clients","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/contracts","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/health","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/movements","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/student-platform","routerLinkActive","active-link",3,"click",4,"ngIf"],[1,"sidebar-footer"],[1,"sidebar-session-card"],["mat-stroked-button","","type","button",1,"logout-button"],["color","primary",1,"app-toolbar"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button"],[1,"toolbar-brand"],["src","images/gymLogoBlack.png","alt","","width","28","height","28",1,"toolbar-logo"],[1,"toolbar-title"],[1,"toolbar-spacer"],["type","button","aria-label","Abrir b\xFAsqueda global",1,"global-search-trigger",3,"click"],["mat-icon-button","","type","button",1,"theme-toggle-button",3,"click","title"],["type","button","routerLink","/profile","title","Mi perfil","aria-label","Ir a mi perfil",1,"profile-avatar-button"],[1,"app-content"],[1,"command-backdrop"],[1,"sidebar-section-label"],["mat-list-item","","routerLink","/dashboard","routerLinkActive","active-link",3,"click"],[1,"nav-item-content"],[1,"nav-text"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/clients","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/contracts","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/health","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/movements","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/student-platform","routerLinkActive","active-link",3,"click"],[1,"session-heading"],[1,"footer-dot"],["mat-stroked-button","","type","button",1,"logout-button",3,"click"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button",3,"click"],[3,"src","alt"],[1,"command-backdrop",3,"click"],["role","dialog","aria-modal","true","aria-label","B\xFAsqueda global",1,"command-palette",3,"click"],["type","search","placeholder","Buscar en el sistema...","aria-label","B\xFAsqueda global",1,"global-command-input",3,"formControl"],["mat-icon-button","","type","button","aria-label","Cerrar b\xFAsqueda",3,"click"],[1,"command-content"],[1,"command-empty"],[1,"command-list","results"],[1,"command-heading"],[1,"command-list"],["type","button"],["type","button",3,"click"],[1,"command-icon"],[1,"spin"]],template:function(t,i){if(t&1&&(a(0,"mat-sidenav-container",0)(1,"mat-sidenav",1)(2,"div",2)(3,"div",3)(4,"div",4),A(5,"img",5),s(),a(6,"button",6),h("click",function(){return i.toggleSidebar()}),a(7,"mat-icon"),l(8),s()()(),R(9,Bi,2,0,"div",7),a(10,"mat-nav-list",8),R(11,Ri,6,0,"a",9),j(12,"async"),R(13,ji,6,0,"a",10),j(14,"async"),R(15,Vi,6,0,"a",11),j(16,"async"),R(17,Ni,6,0,"a",12),j(18,"async"),R(19,Qi,6,0,"a",13),j(20,"async"),R(21,Gi,6,0,"a",14),j(22,"async"),R(23,$i,6,0,"a",15),j(24,"async"),s(),a(25,"div",16),C(26,Ui,13,1,"div",17),j(27,"async"),Ht(28,Hi,3,1,"button",18),s()()(),a(29,"mat-sidenav-content")(30,"mat-toolbar",19),C(31,Wi,3,0,"button",20),a(32,"div",21),A(33,"img",22),a(34,"span",23),l(35,"Sistema de Gesti\xF3n de Gimnasio"),s()(),A(36,"span",24),a(37,"button",25),h("click",function(){return i.openCommandPalette()}),a(38,"mat-icon"),l(39,"search"),s(),a(40,"span"),l(41,"Buscar en el sistema"),s(),a(42,"kbd"),l(43,"Ctrl K"),s()(),a(44,"button",26),h("click",function(){return i.toggleTheme()}),a(45,"mat-icon"),l(46),s()(),C(47,Ki,3,1,"button",27),j(48,"async"),s(),a(49,"main",28),A(50,"router-outlet"),s()()(),C(51,on,26,2,"div",29)),t&2){let n,r;m(),k("collapsed",i.isCollapsed),y("mode",i.isMobile?"over":"side")("opened",i.isMobile?i.isMobileSidebarOpen:!0),m(5),O("aria-label",i.isMobile?"Cerrar menu lateral":"Colapsar menu lateral"),m(2),L(i.isMobile?"close":"menu"),m(),y("ngIf",!i.isCollapsed),m(2),y("ngIf",V(12,21,i.isSuperAdmin$)),m(2),y("ngIf",V(14,23,i.isSuperAdmin$)),m(2),y("ngIf",V(16,25,i.isAdminOrSuperAdmin$)),m(2),y("ngIf",V(18,27,i.isSuperAdmin$)),m(2),y("ngIf",V(20,29,i.isAdminOrSuperAdmin$)),m(2),y("ngIf",V(22,31,i.isSuperAdmin$)),m(2),y("ngIf",V(24,33,i.isSuperAdmin$)),m(3),M((n=!i.isCollapsed&&V(27,35,i.user$))?26:28,n),m(5),M(i.isMobile?31:-1),m(13),y("title",i.isDarkTheme?"Cambiar a modo claro":"Cambiar a modo oscuro"),O("aria-label",i.isDarkTheme?"Cambiar a modo claro":"Cambiar a modo oscuro"),m(2),L(i.isDarkTheme?"light_mode":"dark_mode"),m(),M((r=V(48,37,i.user$))?47:-1,r),m(4),M(i.commandOpen()?51:-1)}},dependencies:[Yt,Kt,ke,fe,ve,we,ut,ne,ae,$e,Et,Ge,wt,He,Ue,Xe,Ke,Ze,Fe,ze,De,Ae,Oe,Xt],styles:[".app-container[_ngcontent-%COMP%]{height:100dvh;background:var(--app-bg)}.global-search-trigger[_ngcontent-%COMP%]{align-items:center;background:var(--app-surface-muted);border:1px solid var(--app-border);border-radius:8px;color:var(--app-text-muted);cursor:pointer;display:flex;gap:.45rem;min-height:38px;padding:0 .65rem}.global-search-trigger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.78rem}.global-search-trigger[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%], .command-palette[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{background:var(--app-surface);border:1px solid var(--app-border);border-radius:4px;color:var(--app-text-soft);font-size:.65rem;padding:.12rem .3rem}.command-backdrop[_ngcontent-%COMP%]{align-items:flex-start;background:#00000094;display:flex;inset:0;justify-content:center;padding:min(12dvh,100px) .5rem .5rem;position:fixed;z-index:2000;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.command-palette[_ngcontent-%COMP%]{background:var(--app-surface);border:1px solid var(--app-border);border-radius:12px;box-shadow:0 24px 80px #00000061;color:var(--app-text);max-width:720px;min-height:460px;overflow:hidden;width:100%}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{align-items:center;border-bottom:1px solid var(--app-border);display:grid;gap:.75rem;grid-template-columns:auto 1fr auto;min-height:66px;padding:0 1rem}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:var(--app-text-muted)}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;border:0;color:var(--app-text);font-size:1rem;min-width:0;outline:0;width:100%}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:var(--app-text-soft)}.command-content[_ngcontent-%COMP%]{max-height:min(60dvh,580px);overflow:auto;padding:.75rem}.command-heading[_ngcontent-%COMP%]{align-items:end;display:flex;justify-content:space-between;padding:.35rem .45rem .7rem}.command-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.command-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--app-text-muted)}.command-list[_ngcontent-%COMP%]{display:grid;gap:.3rem}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{align-items:center;background:transparent;border:1px solid transparent;border-radius:8px;color:inherit;cursor:pointer;display:grid;gap:.7rem;grid-template-columns:42px 1fr auto;min-height:60px;padding:.55rem .65rem;text-align:left;width:100%}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible{background:var(--app-surface-muted);border-color:var(--app-border);outline:0}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:nth-child(2){min-width:0}.command-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .command-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.command-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--app-text-muted);margin-top:.15rem}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:var(--app-text-soft)}.command-icon[_ngcontent-%COMP%]{align-items:center;background:var(--app-accent-soft);border-radius:8px;color:var(--app-accent);display:flex;height:42px;justify-content:center;width:42px}.command-empty[_ngcontent-%COMP%]{align-items:center;color:var(--app-text-muted);display:flex;flex-direction:column;min-height:260px;justify-content:center;text-align:center}.command-empty[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{font-size:42px;height:42px;width:42px}.command-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.35rem 0}.command-palette[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{align-items:center;border-top:1px solid var(--app-border);color:var(--app-text-muted);display:flex;font-size:.72rem;justify-content:space-between;min-height:46px;padding:0 1rem}.spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_command-spin 1s linear infinite}@keyframes _ngcontent-%COMP%_command-spin{to{transform:rotate(360deg)}}@media(max-width:700px){.global-search-trigger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .global-search-trigger[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{display:none}.global-search-trigger[_ngcontent-%COMP%]{border:0;padding:0;width:40px;justify-content:center}.command-backdrop[_ngcontent-%COMP%]{padding:.5rem}.command-palette[_ngcontent-%COMP%]{border-radius:10px;min-height:calc(100dvh - 1rem)}.command-content[_ngcontent-%COMP%]{max-height:calc(100dvh - 114px)}.command-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .command-palette[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{display:none}}.app-sidenav[_ngcontent-%COMP%]{width:260px;transition:width .2s ease;overflow:hidden;border-right:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,#0f0f10,#19191c);color:#fff;box-shadow:inset -1px 0 #ffffff0a}.app-sidenav.collapsed[_ngcontent-%COMP%]{width:80px}.sidebar-content[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;gap:1rem;padding:1rem .875rem;box-sizing:border-box;overflow:hidden}.sidebar-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;min-height:72px;padding:.25rem .35rem .75rem;border-bottom:1px solid rgba(255,255,255,.08)}.brand[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;min-width:0;min-height:130px}.brand-logo[_ngcontent-%COMP%]{display:block;width:min(160px,100%);height:130px;object-fit:contain;object-position:left center}.collapse-button[_ngcontent-%COMP%]{flex-shrink:0;color:#fff;background:#ffffff14;display:inline-grid;height:44px;min-width:44px;place-items:center;width:44px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%]{justify-content:center;padding:.25rem 0}.app-sidenav.collapsed[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{display:none}.sidebar-section-label[_ngcontent-%COMP%]{padding:0 .8rem;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#ffffff70}.nav-list[_ngcontent-%COMP%]{flex:1;overflow:hidden;padding:.25rem 0}.nav-item-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;width:100%}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]{--mdc-list-list-item-container-shape: 16px;min-height:48px;margin:.2rem 0;color:#ffffffdb}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .nav-text[_ngcontent-%COMP%]{color:#ffffffe6!important}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]:hover, .menu-trigger[_ngcontent-%COMP%]:hover{background:#ffffff12}.nav-list[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444;flex:0 0 24px;font-size:24px;height:24px;line-height:24px;overflow:visible;text-align:center;width:24px}.nav-text[_ngcontent-%COMP%]{white-space:nowrap;font-weight:500}.menu-group[_ngcontent-%COMP%]{margin:.1rem 0}.menu-group.group-active[_ngcontent-%COMP%] > .menu-trigger[_ngcontent-%COMP%]{background:#c1121f29}.menu-trigger[_ngcontent-%COMP%]{width:100%;border:0;background:transparent}.submenu-icon[_ngcontent-%COMP%]{margin-left:auto;transition:transform .2s ease;color:#ffffff80}.submenu-icon.open[_ngcontent-%COMP%]{transform:rotate(180deg)}.submenu[_ngcontent-%COMP%]{margin-top:.1rem;padding-left:.9rem}.submenu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{min-height:42px}.submenu-item-content[_ngcontent-%COMP%]{gap:10px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-item-content[_ngcontent-%COMP%]{justify-content:center;gap:0}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-text[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]   .submenu-icon[_ngcontent-%COMP%]{display:none}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]{border-radius:16px;display:grid;height:48px;margin:.35rem auto;min-height:48px;overflow:visible;place-items:center;width:48px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__content[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%]{display:grid;overflow:visible;place-items:center;width:100%}.active-link[_ngcontent-%COMP%]{background:linear-gradient(90deg,#c1121f3d,#c1121f14);box-shadow:inset 0 0 0 1px #c1121f3d}.sidebar-footer[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;margin-top:auto}.sidebar-session-card[_ngcontent-%COMP%]{display:grid;gap:.85rem;padding:.9rem;border-radius:18px;background:#ffffff0d;border:1px solid rgba(255,255,255,.08)}.session-heading[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.session-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;color:#fff;font-size:.92rem}.session-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.2rem 0 0;color:#ffffffb8;font-size:.92rem;line-height:1.2;overflow-wrap:anywhere}.footer-dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:999px;background:#ef4444;box-shadow:0 0 0 6px #ef444429}.logout-button[_ngcontent-%COMP%]{width:100%;min-height:46px;justify-content:flex-start;border-radius:16px;border-color:#ffffff24!important;background:#ffffff0a;color:#fff!important}.logout-button[_ngcontent-%COMP%]:hover{background:#ef44441f;border-color:#ef444459!important}.logout-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-footer[_ngcontent-%COMP%]{align-items:center}.app-sidenav.collapsed[_ngcontent-%COMP%]   .logout-button[_ngcontent-%COMP%]{width:48px;min-width:48px;padding:0;justify-content:center}.app-toolbar[_ngcontent-%COMP%]{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:.5rem;background:#ffffffeb;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:var(--app-text);box-shadow:inset 0 -1px #12121214}.mobile-menu-button[_ngcontent-%COMP%]{display:none;flex-shrink:0;background:var(--app-accent-soft);color:var(--app-accent)}.toolbar-brand[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.55rem;min-width:0}.toolbar-logo[_ngcontent-%COMP%]{flex-shrink:0;width:28px;height:28px;object-fit:contain}body.dark-theme[_nghost-%COMP%]   .toolbar-logo[_ngcontent-%COMP%], body.dark-theme   [_nghost-%COMP%]   .toolbar-logo[_ngcontent-%COMP%]{filter:invert(1)}.toolbar-title[_ngcontent-%COMP%]{font-weight:700;letter-spacing:-.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.toolbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.theme-toggle-button[_ngcontent-%COMP%]{background:var(--app-accent-soft);color:var(--app-accent);flex:0 0 auto}.profile-avatar-button[_ngcontent-%COMP%]{align-items:center;background:#fff;border:2px solid #fff;border-radius:999px;box-shadow:0 0 0 1px #1212121a,0 10px 24px #1018282e;color:#991b1b;cursor:pointer;display:inline-grid;flex:0 0 42px;font-weight:800;height:42px;justify-content:center;overflow:hidden;padding:0;transition:border-color .16s ease,box-shadow .16s ease,transform .16s ease;width:42px}.profile-avatar-button[_ngcontent-%COMP%]:hover, .profile-avatar-button[_ngcontent-%COMP%]:focus-visible{border-color:#fff;box-shadow:0 0 0 3px #c1121f38,0 14px 30px #c1121f38;outline:0;transform:translateY(-1px)}.profile-avatar-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;object-fit:cover;width:100%}.profile-avatar-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{align-items:center;background:#fff3f2;display:flex;height:100%;justify-content:center;width:100%}.app-content[_ngcontent-%COMP%]{padding:1.5rem;background:radial-gradient(circle at top right,rgba(193,18,31,.1),transparent 22%),linear-gradient(180deg,#f6f6f7,#fff);min-height:calc(100dvh - 64px);box-sizing:border-box}@media(max-width:1024px){.app-sidenav[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]{width:min(86vw,320px)}.sidebar-content[_ngcontent-%COMP%]{padding:.9rem .75rem}.sidebar-header[_ngcontent-%COMP%]{min-height:64px}.mobile-menu-button[_ngcontent-%COMP%]{display:inline-flex}.toolbar-title[_ngcontent-%COMP%]{font-size:.95rem;line-height:1.25}.toolbar-logo[_ngcontent-%COMP%]{width:24px;height:24px}.app-content[_ngcontent-%COMP%]{padding:1rem;min-height:calc(100dvh - 56px)}}"]})};var g=e=>{let o=c(ft),t=c(_t),i=e.data.roles??[];return Ft([o.isAuthenticated$,o.user$]).pipe(N(([n,r])=>{if(!n)return t.createUrlTree(["/login"]);if(i.length===0)return!0;let d=Be(r);return Re(d,i)?!0:t.createUrlTree(["/sin-acceso"])}))};var Je=[{path:"body-map-calibrator",loadComponent:()=>import("./chunk-J6U7P6SB.js").then(e=>e.BodyMapCalibratorPageComponent)},{path:"login",loadComponent:()=>import("./chunk-GV2UVIHJ.js").then(e=>e.LoginComponent)},{path:"",component:yt,canActivate:[Ee],children:[{path:"",redirectTo:"clients",pathMatch:"full"},{path:"sin-acceso",loadComponent:()=>import("./chunk-D3EXTTUF.js").then(e=>e.AccessDeniedComponent)},{path:"dashboard",loadComponent:()=>import("./chunk-DPOEB4XW.js").then(e=>e.DashboardPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"profile",loadComponent:()=>import("./chunk-VA4QHNNY.js").then(e=>e.ProfilePageComponent)},{path:"employees",loadComponent:()=>import("./chunk-UGIWAZRJ.js").then(e=>e.EmployeesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"employees/categories",loadComponent:()=>import("./chunk-ZTMZ54A6.js").then(e=>e.EmployeeCategoriesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"employees/:id",loadComponent:()=>import("./chunk-FZPAKXEV.js").then(e=>e.EmployeeDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"clients",loadComponent:()=>import("./chunk-WSIIITWN.js").then(e=>e.ClientsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"clients/new",loadComponent:()=>import("./chunk-NNT26AVS.js").then(e=>e.ClientDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"clients/:id",loadComponent:()=>import("./chunk-NNT26AVS.js").then(e=>e.ClientDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"contracts",loadComponent:()=>import("./chunk-RTK5PEWO.js").then(e=>e.ContractsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"contracts/:id/sign",loadComponent:()=>import("./chunk-RPIYYPEP.js").then(e=>e.ContractSignaturePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"health/patients/:id",loadComponent:()=>import("./chunk-6EGD7E25.js").then(e=>e.HealthPatientDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"health",loadComponent:()=>import("./chunk-J3JU7TKR.js").then(e=>e.HealthPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"membership-plans",loadComponent:()=>import("./chunk-JSJACKLX.js").then(e=>e.MembershipPlansPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"movements",loadComponent:()=>import("./chunk-QZA3KVMG.js").then(e=>e.MovementsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"movements/payments/new",loadComponent:()=>import("./chunk-U4VBB343.js").then(e=>e.PaymentRegisterPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"movements/categories",loadComponent:()=>import("./chunk-Q7U3ATHM.js").then(e=>e.CashMovementCategoriesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/routines/new",loadComponent:()=>import("./chunk-QO2TJSYI.js").then(e=>e.RoutineCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/routines/:id",loadComponent:()=>import("./chunk-2DVX6DJG.js").then(e=>e.WorkoutDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/training-plans/new",loadComponent:()=>import("./chunk-VUR5XNH7.js").then(e=>e.TrainingPlanCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/training-plans/:id",loadComponent:()=>import("./chunk-HB7A7UMT.js").then(e=>e.TrainingPlanDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/exercises/new",loadComponent:()=>import("./chunk-J4IZNQ2O.js").then(e=>e.ExerciseCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/exercises/:id",loadComponent:()=>import("./chunk-J4IZNQ2O.js").then(e=>e.ExerciseCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform",loadComponent:()=>import("./chunk-TP7O5SNR.js").then(e=>e.StudentPlatformPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}}]}];var Ct=class e extends vt{itemsPerPageLabel="Filas por p\xE1gina";nextPageLabel="P\xE1gina siguiente";previousPageLabel="P\xE1gina anterior";firstPageLabel="Primera p\xE1gina";lastPageLabel="\xDAltima p\xE1gina";getRangeLabel=(o,t,i)=>{if(i===0||t===0)return`0 de ${i}`;let n=o*t,r=Math.min(n+t,i);return`${n+1}-${r} de ${i}`};static \u0275fac=(()=>{let o;return function(i){return(o||(o=I(e)))(i||e)}})();static \u0275prov=dt({token:e,factory:e.\u0275fac})};var rn=$.auth0.redirectUri||`${window.location.origin}/`,ti={providers:[Qt(),te(ee([Le])),oe(Je),Nt(Te),{provide:vt,useClass:Ct},{provide:be,useValue:{disableClose:!0}},Ie({domain:$.auth0.domain,clientId:$.auth0.clientId,authorizationParams:{redirect_uri:rn,audience:$.auth0.audience},httpInterceptor:{allowedList:[{uri:`${$.apiUrl}/api/*`,tokenOptions:{authorizationParams:{audience:$.auth0.audience}}}]}})]};var Mt=class e{title=P("gym-management-frontend");static \u0275fac=function(t){return new(t||e)};static \u0275cmp=f({type:e,selectors:[["app-root"]],decls:1,vars:0,template:function(t,i){t&1&&A(0,"router-outlet")},dependencies:[ut],encapsulation:2})};Jt(Mt,ti).catch(e=>console.error(e));
