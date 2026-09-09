import{c as Ft,d as Rt,e as Vt}from"./chunk-2YHQTHAM.js";import{c as Qt}from"./chunk-ZZ5DREME.js";import{a as $t,b as Gt,c as fe}from"./chunk-UBR6TL5G.js";import{a as he,b as zt,c as Lt,d as Bt}from"./chunk-TUBH37CQ.js";import{a as Ht}from"./chunk-UDXNVUZW.js";import{a as Ut}from"./chunk-NH42EYLQ.js";import{a as It,b as _e}from"./chunk-HLMOMLUH.js";import"./chunk-VXEVRODT.js";import{c as Mt}from"./chunk-4CEMHMZZ.js";import"./chunk-GRMWXOAD.js";import{a as ft,b as W,c as _t,d as Ie}from"./chunk-QNE2QPP3.js";import{K as Ot,l as St,p as kt,s as Pt,w as At}from"./chunk-Z2UZP5SE.js";import{A as wt,B as xt,F as j,J as yt,V as Dt,W as Tt,X as Et,Y as jt,Z as Nt,a as Q,i as Ee,k as ht,o as ge,q as bt,t as vt,x as Ct}from"./chunk-34YV5JVJ.js";import{a as mt,c as ue,d as H,e as pt,f as ut,g as gt}from"./chunk-SSGNQL6F.js";import{a as rt,c as st,d as pe,e as lt,f as ct,g as dt,j as S}from"./chunk-Z6P5RHQV.js";import{$b as p,A as $e,B as Z,Bc as w,Cc as x,D as L,Da as $,Eb as V,F as ne,Fa as G,G as ie,Ga as qe,Gb as y,H as Pe,Hb as Xe,Ib as M,J as Ge,Lb as le,Lc as nt,Mb as ce,Nb as b,Ob as o,Pb as s,Qb as D,Rc as me,T as K,U as ae,V as E,X as Ue,Xb as _,Za as Ze,Zb as u,ab as Ke,ac as B,ba as N,bb as m,bc as C,ca as Y,cc as ee,dc as Te,ea as Ae,ec as F,fc as R,fd as it,g as k,ga as c,gb as De,ia as He,id as at,jb as Ye,kc as de,lc as A,m as z,ma as h,mc as et,md as ot,n as Ve,na as f,nc as l,oc as T,q as O,qa as Oe,qb as v,qc as tt,r as je,ra as oe,rb as J,sb as Je,ua as re,ub as X,va as se,vb as P,w as Ne,wa as Qe,ya as We,yc as U,za as I}from"./chunk-OAFD7H4A.js";var be=(()=>{class t{changes=new k;itemsPerPageLabel="Items per page:";nextPageLabel="Next page";previousPageLabel="Previous page";firstPageLabel="First page";lastPageLabel="Last page";getRangeLabel=(e,n,i)=>{if(i==0||n==0)return`0 of ${i}`;i=Math.max(i,0);let r=e*n,d=r<i?Math.min(r+n,i):r+n;return`${r+1} \u2013 ${d} of ${i}`};static \u0275fac=function(n){return new(n||t)};static \u0275prov=N({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var we=["*"],rn=["content"],sn=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],ln=["mat-drawer","mat-drawer-content","*"];function cn(t,a){if(t&1){let e=_();o(0,"div",1),u("click",function(){h(e);let i=p();return f(i._onBackdropClicked())}),s()}if(t&2){let e=p();A("mat-drawer-shown",e._isShowingBackdrop())}}function dn(t,a){t&1&&(o(0,"mat-drawer-content"),C(1,2),s())}var mn=[[["mat-sidenav"]],[["mat-sidenav-content"]],"*"],pn=["mat-sidenav","mat-sidenav-content","*"];function un(t,a){if(t&1){let e=_();o(0,"div",1),u("click",function(){h(e);let i=p();return f(i._onBackdropClicked())}),s()}if(t&2){let e=p();A("mat-drawer-shown",e._isShowingBackdrop())}}function gn(t,a){t&1&&(o(0,"mat-sidenav-content"),C(1,2),s())}var hn=`.mat-drawer-container {
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
`;var fn=new Ae("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),Be=new Ae("MAT_DRAWER_CONTAINER"),ve=(()=>{class t extends W{_platform=c(Q);_changeDetectorRef=c(me);_container=c(Le);constructor(){let e=c(G),n=c(ft),i=c(se);super(e,n,i)}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:e,end:n}=this._container;return e!=null&&e.mode!=="over"&&e.opened||n!=null&&n.mode!=="over"&&n.opened}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=v({type:t,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(n,i){n&2&&(de("margin-left",i._container._contentMargins.left,"px")("margin-right",i._container._contentMargins.right,"px"),A("mat-drawer-content-hidden",i._shouldBeHidden()))},features:[U([{provide:W,useExisting:t}]),X],ngContentSelectors:we,decls:1,vars:0,template:function(n,i){n&1&&(B(),C(0))},encapsulation:2,changeDetection:0})}return t})(),ze=(()=>{class t{_elementRef=c(G);_focusTrapFactory=c(xt);_focusMonitor=c(vt);_platform=c(Q);_ngZone=c(se);_renderer=c(Ye);_interactivityChecker=c(wt);_doc=c(oe);_container=c(Be,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=j(e)}_disableClose=!1;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=j(e)),this._autoFocus=e}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(j(e))}_opened=I(!1);_openedVia=null;_animationStarted=new k;_animationEnd=new k;openedChange=new re(!0);_openedStream=this.openedChange.pipe(Z(e=>e),O(()=>{}));openedStart=this._animationStarted.pipe(Z(()=>this.opened),Pe(void 0));_closedStream=this.openedChange.pipe(Z(e=>!e),O(()=>{}));closedStart=this._animationStarted.pipe(Z(()=>!this.opened),Pe(void 0));_destroyed=new k;onPositionChanged=new re;_content;_modeChanged=new k;_injector=c(Oe);_changeDetectorRef=c(me);constructor(){this.openedChange.pipe(E(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,n=this._elementRef.nativeElement;return[e.listen(n,"keydown",i=>{i.keyCode===27&&!this.disableClose&&!bt(i)&&this._ngZone.run(()=>{this.close(),i.stopPropagation(),i.preventDefault()})}),e.listen(n,"transitionend",this._handleTransitionEvent),e.listen(n,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_forceFocus(e,n){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{r(),d(),e.removeAttribute("tabindex")},r=this._renderer.listen(e,"blur",i),d=this._renderer.listen(e,"mousedown",i)})),e.focus(n)}_focusByCssSelector(e,n){let i=this._elementRef.nativeElement.querySelector(e);i&&this._forceFocus(i,n)}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":De(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,n){e&&n&&(this._openedVia=n);let i=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),i}_setOpen(e,n,i){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&n&&this._restoreFocus(i),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(r=>{this.openedChange.pipe(ie(1)).subscribe(d=>r(d?"open":"close"))}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let n=this._elementRef.nativeElement,i=n.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),i.insertBefore(this._anchor,n)),i.appendChild(n)):this._anchor&&this._anchor.parentNode.insertBefore(n,this._anchor)}_handleTransitionEvent=e=>{let n=this._elementRef.nativeElement;e.target===n&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(e)})};static \u0275fac=function(n){return new(n||t)};static \u0275cmp=v({type:t,selectors:[["mat-drawer"]],viewQuery:function(n,i){if(n&1&&Te(rn,5),n&2){let r;F(r=R())&&(i._content=r.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(n,i){n&2&&(V("align",null)("tabIndex",i.mode!=="side"?"-1":null),de("visibility",!i._container&&!i.opened?"hidden":null),A("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:we,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(n,i){n&1&&(B(),o(0,"div",1,0),C(2),s())},dependencies:[W],encapsulation:2,changeDetection:0})}return t})(),Le=(()=>{class t{_dir=c(ht,{optional:!0});_element=c(G);_ngZone=c(se);_changeDetectorRef=c(me);_animationDisabled=yt();_transitionsEnabled=!1;_allDrawers;_drawers=new qe;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=j(e)}_autosize=c(fn);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:j(e)}_backdropOverride=null;backdropClick=new re;_start=null;_end=null;_left=null;_right=null;_destroyed=new k;_doCheckSubject=new k;_contentMargins={left:null,right:null};_contentMarginChanges=new k;get scrollable(){return this._userContent||this._content}_injector=c(Oe);constructor(){let e=c(Q),n=c(_t);this._dir?.change.pipe(E(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),n.change().pipe(E(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(K(this._allDrawers),E(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(n=>!n._container||n._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(K(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(ne(10),E(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,n=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let i=this._left._getWidth();e+=i,n-=i}}if(this._right&&this._right.opened){if(this._right.mode=="side")n+=this._right._getWidth();else if(this._right.mode=="push"){let i=this._right._getWidth();n+=i,e-=i}}e=e||null,n=n||null,(e!==this._contentMargins.left||n!==this._contentMargins.right)&&(this._contentMargins={left:e,right:n},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(E(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(E(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e.onPositionChanged.pipe(E(this._drawers.changes)).subscribe(()=>{De({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(e){e._modeChanged.pipe(E($e(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let n=this._element.nativeElement.classList,i="mat-drawer-container-has-open";e?n.add(i):n.remove(i)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=v({type:t,selectors:[["mat-drawer-container"]],contentQueries:function(n,i,r){if(n&1&&ee(r,ve,5)(r,ze,5),n&2){let d;F(d=R())&&(i._content=d.first),F(d=R())&&(i._allDrawers=d)}},viewQuery:function(n,i){if(n&1&&Te(ve,5),n&2){let r;F(r=R())&&(i._userContent=r.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(n,i){n&2&&A("mat-drawer-container-explicit-backdrop",i._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[U([{provide:Be,useExisting:t}])],ngContentSelectors:ln,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(n,i){n&1&&(B(sn),y(0,cn,1,2,"div",0),C(1),C(2,1),y(3,dn,2,0,"mat-drawer-content")),n&2&&(M(i.hasBackdrop?0:-1),m(3),M(i._content?-1:3))},dependencies:[ve],styles:[`.mat-drawer-container {
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
`],encapsulation:2,changeDetection:0})}return t})(),Ce=(()=>{class t extends ve{static \u0275fac=(()=>{let e;return function(i){return(e||(e=$(t)))(i||t)}})();static \u0275cmp=v({type:t,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[U([{provide:W,useExisting:t}]),X],ngContentSelectors:we,decls:1,vars:0,template:function(n,i){n&1&&(B(),C(0))},encapsulation:2,changeDetection:0})}return t})(),Fe=(()=>{class t extends ze{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(e){this._fixedInViewport=j(e)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(e){this._fixedTopGap=Ee(e)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(e){this._fixedBottomGap=Ee(e)}_fixedBottomGap=0;static \u0275fac=(()=>{let e;return function(i){return(e||(e=$(t)))(i||t)}})();static \u0275cmp=v({type:t,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(n,i){n&2&&(V("tabIndex",i.mode!=="side"?"-1":null)("align",null),de("top",i.fixedInViewport?i.fixedTopGap:null,"px")("bottom",i.fixedInViewport?i.fixedBottomGap:null,"px"),A("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side")("mat-sidenav-fixed",i.fixedInViewport))},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[U([{provide:ze,useExisting:t}]),X],ngContentSelectors:we,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(n,i){n&1&&(B(),o(0,"div",1,0),C(2),s())},dependencies:[W],encapsulation:2,changeDetection:0})}return t})(),Wt=(()=>{class t extends Le{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let e;return function(i){return(e||(e=$(t)))(i||t)}})();static \u0275cmp=v({type:t,selectors:[["mat-sidenav-container"]],contentQueries:function(n,i,r){if(n&1&&ee(r,Ce,5)(r,Fe,5),n&2){let d;F(d=R())&&(i._content=d.first),F(d=R())&&(i._allDrawers=d)}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(n,i){n&2&&A("mat-drawer-container-explicit-backdrop",i._backdropOverride)},exportAs:["matSidenavContainer"],features:[U([{provide:Be,useExisting:t},{provide:Le,useExisting:t}]),X],ngContentSelectors:pn,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(n,i){n&1&&(B(mn),y(0,un,1,2,"div",0),C(1),C(2,1),y(3,gn,2,0,"mat-sidenav-content")),n&2&&(M(i.hasBackdrop?0:-1),m(3),M(i._content?-1:3))},dependencies:[Ce],styles:[hn],encapsulation:2,changeDetection:0})}return t})(),qt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=J({type:t});static \u0275inj=Y({imports:[Ie,ge,Ie]})}return t})();var bn=["*",[["mat-toolbar-row"]]],vn=["*","mat-toolbar-row"],Cn=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275dir=Je({type:t,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return t})(),Zt=(()=>{class t{_elementRef=c(G);_platform=c(Q);_document=c(oe);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=v({type:t,selectors:[["mat-toolbar"]],contentQueries:function(n,i,r){if(n&1&&ee(r,Cn,5),n&2){let d;F(d=R())&&(i._toolbarRows=d)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(n,i){n&2&&(et(i.color?"mat-"+i.color:""),A("mat-toolbar-multiple-rows",i._toolbarRows.length>0)("mat-toolbar-single-row",i._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:vn,decls:2,vars:0,template:function(n,i){n&1&&(B(bn),C(0),C(1,1))},styles:[`.mat-toolbar {
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
`],encapsulation:2,changeDetection:0})}return t})();var Kt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=J({type:t});static \u0275inj=Y({imports:[ge]})}return t})();var Yt=(t,a)=>a.route;function yn(t,a){t&1&&(o(0,"div",33),l(1,"Principal"),s())}function Mn(t,a){if(t&1){let e=_();o(0,"a",34),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"person_add"),s(),o(4,"span",36),l(5,"Preinscripciones"),s()()()}}function Sn(t,a){if(t&1){let e=_();o(0,"a",37),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"verified_user"),s(),o(4,"span",36),l(5,"Mis contratos"),s()()()}}function kn(t,a){if(t&1){let e=_();o(0,"a",38),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"dashboard"),s(),o(4,"span",36),l(5,"Dashboard"),s()()()}}function Pn(t,a){if(t&1){let e=_();o(0,"a",39),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"groups"),s(),o(4,"span",36),l(5,"Empleados"),s()()()}}function An(t,a){if(t&1){let e=_();o(0,"a",40),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"person"),s(),o(4,"span",36),l(5,"Clientes"),s()()()}}function On(t,a){if(t&1){let e=_();o(0,"a",41),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"calendar_month"),s(),o(4,"span",36),l(5,"Turnos"),s()()()}}function Dn(t,a){if(t&1){let e=_();o(0,"a",42),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"description"),s(),o(4,"span",36),l(5,"Contratos"),s()()()}}function Tn(t,a){if(t&1){let e=_();o(0,"a",43),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"health_and_safety"),s(),o(4,"span",36),l(5,"Salud"),s()()()}}function En(t,a){if(t&1){let e=_();o(0,"a",44),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"payments"),s(),o(4,"span",36),l(5,"Movimientos"),s()()()}}function In(t,a){if(t&1){let e=_();o(0,"a",45),u("click",function(){h(e);let i=p();return f(i.closeSidebarOnMobile())}),o(1,"div",35)(2,"mat-icon"),l(3,"school"),s(),o(4,"span",36),l(5,"Alumnos"),s()()()}}function zn(t,a){if(t&1){let e=_();o(0,"div",20)(1,"div",46),D(2,"div",47),o(3,"div")(4,"strong"),l(5,"Gesti\xF3n central"),s(),o(6,"p"),l(7),s()()(),o(8,"button",48),u("click",function(){h(e);let i=p();return f(i.logout())}),o(9,"mat-icon"),l(10,"logout"),s(),o(11,"span"),l(12,"Cerrar sesi\xF3n"),s()()()}if(t&2){let e=p();m(7),T(e.getUserDisplayName(a))}}function Ln(t,a){if(t&1){let e=_();o(0,"button",48),u("click",function(){h(e);let i=p();return f(i.logout())}),o(1,"mat-icon"),l(2,"logout"),s()()}if(t&2){let e=p();V("aria-label",e.isCollapsed?"Cerrar sesi\xF3n":null)}}function Bn(t,a){if(t&1){let e=_();o(0,"button",49),u("click",function(){h(e);let i=p();return f(i.toggleSidebar())}),o(1,"mat-icon"),l(2,"menu"),s()()}}function Fn(t,a){if(t&1&&D(0,"img",50),t&2){let e=p(),n=p();b("src",n.getUserPicture(e),Ze)("alt",n.getUserDisplayName(e))}}function Rn(t,a){if(t&1&&(o(0,"span"),l(1),s()),t&2){let e=p(),n=p();m(),T(n.getUserInitials(e))}}function Vn(t,a){if(t&1&&(o(0,"button",30),y(1,Fn,1,2,"img",50)(2,Rn,2,1,"span"),s()),t&2){let e=p();m(),M(e.getUserPicture(a)?1:2)}}function jn(t,a){if(t&1){let e=_();o(0,"button",61),u("click",function(){let i=h(e).$implicit,r=p(3);return f(r.runCommand(i))}),o(1,"span",62)(2,"mat-icon"),l(3),s()(),o(4,"span")(5,"strong"),l(6),s(),o(7,"small"),l(8),s()(),o(9,"mat-icon"),l(10,"arrow_forward"),s()()}if(t&2){let e=a.$implicit;m(3),T(e.icon),m(3),T(e.label),m(2),T(e.description)}}function Nn(t,a){if(t&1&&(o(0,"div",58)(1,"span"),l(2,"Acciones r\xE1pidas"),s(),o(3,"small"),l(4,"Eleg\xED una acci\xF3n o empez\xE1 a escribir"),s()(),o(5,"div",59),le(6,jn,11,3,"button",60,Yt),s()),t&2){let e=p(2);m(6),ce(e.quickCommands())}}function $n(t,a){t&1&&(o(0,"div",56)(1,"mat-icon"),l(2,"keyboard"),s(),o(3,"p"),l(4,"Escrib\xED al menos dos caracteres."),s()())}function Gn(t,a){t&1&&(o(0,"div",56)(1,"mat-icon",63),l(2,"progress_activity"),s(),o(3,"p"),l(4,"Buscando en el sistema..."),s()())}function Un(t,a){if(t&1){let e=_();o(0,"button",61),u("click",function(){let i=h(e).$implicit,r=p(3);return f(r.runCommand(i))}),o(1,"span",62)(2,"mat-icon"),l(3),s()(),o(4,"span")(5,"strong"),l(6),s(),o(7,"small"),l(8),s()(),o(9,"mat-icon"),l(10,"arrow_forward"),s()()}if(t&2){let e=a.$implicit;m(3),T(e.icon),m(3),T(e.label),m(2),tt("",e.group," \xB7 ",e.description)}}function Hn(t,a){if(t&1&&(o(0,"div",57),le(1,Un,11,4,"button",60,Yt),s()),t&2){let e=p(2);m(),ce(e.commandResults())}}function Qn(t,a){t&1&&(o(0,"div",56)(1,"mat-icon"),l(2,"search_off"),s(),o(3,"strong"),l(4,"Sin resultados"),s(),o(5,"p"),l(6,"Prob\xE1 con nombre, apellido, DNI o t\xEDtulo."),s()())}function Wn(t,a){if(t&1){let e=_();o(0,"div",51),u("click",function(){h(e);let i=p();return f(i.closeCommandPalette())}),o(1,"section",52),u("click",function(i){return i.stopPropagation()}),o(2,"header")(3,"mat-icon"),l(4,"search"),s(),D(5,"input",53),o(6,"button",54),u("click",function(){h(e);let i=p();return f(i.closeCommandPalette())}),o(7,"mat-icon"),l(8,"close"),s()()(),o(9,"div",55),y(10,Nn,8,0)(11,$n,5,0,"div",56)(12,Gn,5,0,"div",56)(13,Hn,3,0,"div",57)(14,Qn,7,0,"div",56),s(),o(15,"footer")(16,"span")(17,"kbd"),l(18,"Ctrl"),s(),o(19,"kbd"),l(20,"K"),s(),l(21," para abrir"),s(),o(22,"span")(23,"kbd"),l(24,"Esc"),s(),l(25," para cerrar"),s()()()()}if(t&2){let e=p();m(5),b("formControl",e.commandQuery),m(5),M(e.commandQuery.value.trim()?e.commandQuery.value.trim().length<2?11:e.commandSearching()?12:e.commandResults().length?13:14:10)}}var xe=class t{router=c(H);breakpointObserver=c(Ct);roleService=c(fe);auth=c(he);profileService=c(Ut);clientsService=c(Ht);platformService=c(Qt);commandQueryChanges=new k;isSuperAdmin$=this.roleService.hasRole("SuperAdmin");isAdminOrSuperAdmin$=this.roleService.hasAnyRole(["SuperAdmin","Admin"]);user$=this.auth.user$;currentProfile=I(null);commandQuery=new Pt("",{nonNullable:!0});commandOpen=I(!1);commandSearching=I(!1);commandResults=I([]);isSuperAdmin=I(!1);quickCommands=nt(()=>[{icon:"person_add",label:"Nuevo alumno",description:"Abrir alta de alumnos",route:"/clients/new",group:"Acciones"},...this.isSuperAdmin()?[{icon:"payments",label:"Registrar pago",description:"Cargar un nuevo cobro",route:"/movements/payments/new",group:"Acciones"},{icon:"add_circle",label:"Nuevo ejercicio",description:"Crear ejercicio del gimnasio",route:"/student-platform/exercises/new",group:"Acciones"},{icon:"fitness_center",label:"Nuevo workout",description:"Armar una rutina reutilizable",route:"/student-platform/routines/new",group:"Acciones"},{icon:"assignment_add",label:"Nuevo plan",description:"Crear un plan de entrenamiento",route:"/student-platform/training-plans/new",group:"Acciones"},{icon:"description",label:"Contratos pendientes",description:"Revisar seguimiento contractual",route:"/contracts",group:"Acciones"}]:[]]);isCollapsed=!0;isMobile=!1;isMobileSidebarOpen=!1;employeesMenuOpen=!1;clientsMenuOpen=!1;movementsMenuOpen=!1;isDarkTheme=!1;constructor(){this.initTheme(),this.initCommandSearch(),this.isSuperAdmin$.subscribe(a=>this.isSuperAdmin.set(a)),this.breakpointObserver.observe("(max-width: 1024px)").subscribe(({matches:a})=>{if(this.isMobile=a,a){this.isCollapsed=!1,this.isMobileSidebarOpen=!1,this.syncLayout();return}this.isCollapsed=!0,this.isMobileSidebarOpen=!1,this.syncLayout()}),this.router.events.subscribe(a=>{a instanceof mt&&(this.loadCurrentProfile(),this.syncLayout())}),this.loadCurrentProfile()}get isEmployeesSectionActive(){return this.router.url.startsWith("/employees")}get isClientsSectionActive(){return this.router.url.startsWith("/clients")||this.router.url.startsWith("/membership-plans")}get isHealthSectionActive(){return this.router.url.startsWith("/health")}get isMovementsSectionActive(){return this.router.url.startsWith("/movements")}toggleSidebar(){if(this.isMobile){this.isMobileSidebarOpen=!this.isMobileSidebarOpen,this.syncLayout();return}this.isCollapsed=!this.isCollapsed,this.syncLayout()}toggleEmployeesMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.employeesMenuOpen=!this.employeesMenuOpen}toggleClientsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.clientsMenuOpen=!this.clientsMenuOpen}toggleMovementsMenu(){this.isCollapsed&&(this.isCollapsed=!1),this.movementsMenuOpen=!this.movementsMenuOpen}closeSidebarOnMobile(){this.isMobile&&(this.isMobileSidebarOpen=!1,this.syncLayout())}toggleTheme(){this.isDarkTheme=!this.isDarkTheme,this.applyTheme()}handleGlobalShortcut(a){(a.ctrlKey||a.metaKey)&&a.key.toLowerCase()==="k"?(a.preventDefault(),this.openCommandPalette()):a.key==="Escape"&&this.commandOpen()&&this.closeCommandPalette()}openCommandPalette(){this.commandOpen.set(!0),document.body.style.overflow="hidden",window.setTimeout(()=>document.querySelector(".global-command-input")?.focus())}closeCommandPalette(){this.commandOpen.set(!1),this.commandQuery.setValue(""),this.commandResults.set([]),document.body.style.overflow=""}runCommand(a){this.closeCommandPalette(),this.router.navigateByUrl(a.route)}logout(){let a=S.auth0.logoutReturnTo||window.location.origin;this.auth.logout({logoutParams:{returnTo:a}})}getUserDisplayName(a){let e=this.currentProfile(),n=`${e?.nombre??""} ${e?.apellido??""}`.trim();if(n)return n;let i=a?.name,r=a?.nickname,d=a?.email;return typeof i=="string"&&i.trim()?i:typeof r=="string"&&r.trim()?r:typeof d=="string"&&d.trim()?d:"usuario"}getUserInitials(a){let e=this.currentProfile();return(`${e?.nombre??""} ${e?.apellido??""}`.trim()||this.getUserDisplayName(a)).split(/[\s@._-]+/).map(d=>d.trim()).filter(Boolean).slice(0,2).map(d=>d[0]?.toUpperCase()).join("")||"U"}getUserPicture(a){let e=this.currentProfile()?.avatarUrl;if(e?.trim())return e;let n=a?.picture;return typeof n=="string"&&n.trim()?n:null}loadCurrentProfile(){this.profileService.getMe().subscribe({next:a=>this.currentProfile.set(a),error:()=>this.currentProfile.set(null)})}syncLayout(){requestAnimationFrame(()=>{window.dispatchEvent(new Event("resize"))})}initTheme(){let a=localStorage.getItem("gym-theme"),e=window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1;this.isDarkTheme=a?a==="dark":e,this.applyTheme()}applyTheme(){document.body.classList.toggle("dark-theme",this.isDarkTheme),localStorage.setItem("gym-theme",this.isDarkTheme?"dark":"light")}initCommandSearch(){this.commandQuery.valueChanges.subscribe(a=>this.commandQueryChanges.next(a)),this.commandQueryChanges.pipe(K(""),O(a=>a.trim()),ne(220),Ge(),ae(a=>{if(a.length<2)return this.commandSearching.set(!1),z([]);this.commandSearching.set(!0);let e=a.toLocaleLowerCase("es"),n=this.clientsService.getPaged(1,6,{search:a}).pipe(L(()=>z({items:[],pageNumber:1,pageSize:6,totalCount:0,totalPages:0})));return this.isSuperAdmin()?Ne({clients:n,exercises:this.platformService.getExercises(a).pipe(L(()=>z([]))),routines:this.platformService.getRoutineTemplates().pipe(L(()=>z([]))),plans:this.platformService.getTrainingPlans().pipe(L(()=>z([])))}).pipe(O(i=>[...i.clients.items.slice(0,6).map(r=>({icon:"person",label:`${r.nombre} ${r.apellido}`,description:`DNI ${r.dni}`,route:`/clients/${r.id}`,group:"Alumnos"})),...i.exercises.slice(0,5).map(r=>({icon:"exercise",label:r.name,description:r.muscleGroup||"Ejercicio",route:`/student-platform/exercises/${r.id}`,group:"Ejercicios"})),...i.routines.filter(r=>`${r.name} ${r.description??""}`.toLocaleLowerCase("es").includes(e)).slice(0,5).map(r=>({icon:"fitness_center",label:r.name,description:`${r.exercises.length} ejercicios`,route:`/student-platform/routines/${r.id}`,group:"Workouts"})),...i.plans.filter(r=>`${r.name} ${r.description??""}`.toLocaleLowerCase("es").includes(e)).slice(0,5).map(r=>({icon:"assignment",label:r.name,description:`${r.workoutCount} workouts`,route:`/student-platform/training-plans/${r.id}`,group:"Planes"}))])):n.pipe(O(i=>i.items.slice(0,6).map(r=>({icon:"person",label:`${r.nombre} ${r.apellido}`,description:`DNI ${r.dni}`,route:`/clients/${r.id}`,group:"Alumnos"}))))})).subscribe(a=>{this.commandResults.set(a),this.commandSearching.set(!1)})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=v({type:t,selectors:[["app-shell"]],hostBindings:function(e,n){e&1&&u("keydown",function(r){return n.handleGlobalShortcut(r)},Ke)},decls:59,vars:50,consts:[["autosize","",1,"app-container"],[1,"app-sidenav",3,"mode","opened"],[1,"sidebar-content"],[1,"sidebar-header"],[1,"brand"],["src","images/gymLogo.png","alt","Gym Admin","width","160","height","56",1,"brand-logo"],["mat-icon-button","","type","button",1,"collapse-button",3,"click"],["class","sidebar-section-label",4,"ngIf"],[1,"nav-list"],["mat-list-item","","routerLink","/preregistrations","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/my-contracts","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/dashboard","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/clients","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/weekly-schedules","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/contracts","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/health","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/movements","routerLinkActive","active-link",3,"click",4,"ngIf"],["mat-list-item","","routerLink","/student-platform","routerLinkActive","active-link",3,"click",4,"ngIf"],[1,"sidebar-footer"],[1,"sidebar-session-card"],["mat-stroked-button","","type","button",1,"logout-button"],["color","primary",1,"app-toolbar"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button"],[1,"toolbar-brand"],["src","images/gymLogoBlack.png","alt","","width","28","height","28",1,"toolbar-logo"],[1,"toolbar-title"],[1,"toolbar-spacer"],["type","button","aria-label","Abrir b\xFAsqueda global",1,"global-search-trigger",3,"click"],["mat-icon-button","","type","button",1,"theme-toggle-button",3,"click","title"],["type","button","routerLink","/profile","title","Mi perfil","aria-label","Ir a mi perfil",1,"profile-avatar-button"],[1,"app-content"],[1,"command-backdrop"],[1,"sidebar-section-label"],["mat-list-item","","routerLink","/preregistrations","routerLinkActive","active-link",3,"click"],[1,"nav-item-content"],[1,"nav-text"],["mat-list-item","","routerLink","/my-contracts","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/dashboard","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/employees","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/clients","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/weekly-schedules","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/contracts","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/health","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/movements","routerLinkActive","active-link",3,"click"],["mat-list-item","","routerLink","/student-platform","routerLinkActive","active-link",3,"click"],[1,"session-heading"],[1,"footer-dot"],["mat-stroked-button","","type","button",1,"logout-button",3,"click"],["mat-icon-button","","type","button","aria-label","Abrir menu lateral",1,"mobile-menu-button",3,"click"],[3,"src","alt"],[1,"command-backdrop",3,"click"],["role","dialog","aria-modal","true","aria-label","B\xFAsqueda global",1,"command-palette",3,"click"],["type","search","placeholder","Buscar en el sistema...","aria-label","B\xFAsqueda global",1,"global-command-input",3,"formControl"],["mat-icon-button","","type","button","aria-label","Cerrar b\xFAsqueda",3,"click"],[1,"command-content"],[1,"command-empty"],[1,"command-list","results"],[1,"command-heading"],[1,"command-list"],["type","button"],["type","button",3,"click"],[1,"command-icon"],[1,"spin"]],template:function(e,n){if(e&1&&(o(0,"mat-sidenav-container",0)(1,"mat-sidenav",1)(2,"div",2)(3,"div",3)(4,"div",4),D(5,"img",5),s(),o(6,"button",6),u("click",function(){return n.toggleSidebar()}),o(7,"mat-icon"),l(8),s()()(),P(9,yn,2,0,"div",7),o(10,"mat-nav-list",8),P(11,Mn,6,0,"a",9),w(12,"async"),P(13,Sn,6,0,"a",10),w(14,"async"),P(15,kn,6,0,"a",11),w(16,"async"),P(17,Pn,6,0,"a",12),w(18,"async"),P(19,An,6,0,"a",13),w(20,"async"),P(21,On,6,0,"a",14),w(22,"async"),w(23,"async"),P(24,Dn,6,0,"a",15),w(25,"async"),P(26,Tn,6,0,"a",16),w(27,"async"),P(28,En,6,0,"a",17),w(29,"async"),P(30,In,6,0,"a",18),w(31,"async"),s(),o(32,"div",19),y(33,zn,13,1,"div",20),w(34,"async"),Xe(35,Ln,3,1,"button",21),s()()(),o(36,"mat-sidenav-content")(37,"mat-toolbar",22),y(38,Bn,3,0,"button",23),o(39,"div",24),D(40,"img",25),o(41,"span",26),l(42,"Sistema de Gesti\xF3n de Gimnasio"),s()(),D(43,"span",27),o(44,"button",28),u("click",function(){return n.openCommandPalette()}),o(45,"mat-icon"),l(46,"search"),s(),o(47,"span"),l(48,"Buscar en el sistema"),s(),o(49,"kbd"),l(50,"Ctrl K"),s()(),o(51,"button",29),u("click",function(){return n.toggleTheme()}),o(52,"mat-icon"),l(53),s()(),y(54,Vn,3,1,"button",30),w(55,"async"),s(),o(56,"main",31),D(57,"router-outlet"),s()()(),y(58,Wn,26,2,"div",32)),e&2){let i,r;m(),A("collapsed",n.isCollapsed),b("mode",n.isMobile?"over":"side")("opened",n.isMobile?n.isMobileSidebarOpen:!0),m(5),V("aria-label",n.isMobile?"Cerrar menu lateral":"Colapsar menu lateral"),m(2),T(n.isMobile?"close":"menu"),m(),b("ngIf",!n.isCollapsed),m(2),b("ngIf",x(12,24,n.isAdminOrSuperAdmin$)),m(2),b("ngIf",!x(14,26,n.isAdminOrSuperAdmin$)),m(2),b("ngIf",x(16,28,n.isSuperAdmin$)),m(2),b("ngIf",x(18,30,n.isSuperAdmin$)),m(2),b("ngIf",x(20,32,n.isAdminOrSuperAdmin$)),m(2),b("ngIf",x(22,34,n.isAdminOrSuperAdmin$)&&!x(23,36,n.isSuperAdmin$)),m(3),b("ngIf",x(25,38,n.isSuperAdmin$)),m(2),b("ngIf",x(27,40,n.isAdminOrSuperAdmin$)),m(2),b("ngIf",x(29,42,n.isSuperAdmin$)),m(2),b("ngIf",x(31,44,n.isSuperAdmin$)),m(3),M((i=!n.isCollapsed&&x(34,46,n.user$))?33:35,i),m(5),M(n.isMobile?38:-1),m(13),b("title",n.isDarkTheme?"Cambiar a modo claro":"Cambiar a modo oscuro"),V("aria-label",n.isDarkTheme?"Cambiar a modo claro":"Cambiar a modo oscuro"),m(2),T(n.isDarkTheme?"light_mode":"dark_mode"),m(),M((r=x(55,48,n.user$))?54:-1,r),m(4),M(n.commandOpen()?58:-1)}},dependencies:[ot,it,Ot,St,kt,At,ue,pt,ut,qt,Fe,Wt,Ce,Kt,Zt,Vt,Rt,Ft,Nt,jt,Et,Tt,Dt,at],styles:[".app-container[_ngcontent-%COMP%]{height:100dvh;background:var(--app-bg)}.global-search-trigger[_ngcontent-%COMP%]{align-items:center;background:var(--app-surface-muted);border:1px solid var(--app-border);border-radius:8px;color:var(--app-text-muted);cursor:pointer;display:flex;gap:.45rem;min-height:38px;padding:0 .65rem}.global-search-trigger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.78rem}.global-search-trigger[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%], .command-palette[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{background:var(--app-surface);border:1px solid var(--app-border);border-radius:4px;color:var(--app-text-soft);font-size:.65rem;padding:.12rem .3rem}.command-backdrop[_ngcontent-%COMP%]{align-items:flex-start;background:#00000094;display:flex;inset:0;justify-content:center;padding:min(12dvh,100px) .5rem .5rem;position:fixed;z-index:2000;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.command-palette[_ngcontent-%COMP%]{background:var(--app-surface);border:1px solid var(--app-border);border-radius:12px;box-shadow:0 24px 80px #00000061;color:var(--app-text);max-width:720px;min-height:460px;overflow:hidden;width:100%}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{align-items:center;border-bottom:1px solid var(--app-border);display:grid;gap:.75rem;grid-template-columns:auto 1fr auto;min-height:66px;padding:0 1rem}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:var(--app-text-muted)}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;border:0;color:var(--app-text);font-size:1rem;min-width:0;outline:0;width:100%}.command-palette[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:var(--app-text-soft)}.command-content[_ngcontent-%COMP%]{max-height:min(60dvh,580px);overflow:auto;padding:.75rem}.command-heading[_ngcontent-%COMP%]{align-items:end;display:flex;justify-content:space-between;padding:.35rem .45rem .7rem}.command-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.command-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--app-text-muted)}.command-list[_ngcontent-%COMP%]{display:grid;gap:.3rem}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{align-items:center;background:transparent;border:1px solid transparent;border-radius:8px;color:inherit;cursor:pointer;display:grid;gap:.7rem;grid-template-columns:42px 1fr auto;min-height:60px;padding:.55rem .65rem;text-align:left;width:100%}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible{background:var(--app-surface-muted);border-color:var(--app-border);outline:0}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:nth-child(2){min-width:0}.command-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .command-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.command-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--app-text-muted);margin-top:.15rem}.command-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:var(--app-text-soft)}.command-icon[_ngcontent-%COMP%]{align-items:center;background:var(--app-accent-soft);border-radius:8px;color:var(--app-accent);display:flex;height:42px;justify-content:center;width:42px}.command-empty[_ngcontent-%COMP%]{align-items:center;color:var(--app-text-muted);display:flex;flex-direction:column;min-height:260px;justify-content:center;text-align:center}.command-empty[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{font-size:42px;height:42px;width:42px}.command-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.35rem 0}.command-palette[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{align-items:center;border-top:1px solid var(--app-border);color:var(--app-text-muted);display:flex;font-size:.72rem;justify-content:space-between;min-height:46px;padding:0 1rem}.spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_command-spin 1s linear infinite}@keyframes _ngcontent-%COMP%_command-spin{to{transform:rotate(360deg)}}@media(max-width:700px){.global-search-trigger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .global-search-trigger[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{display:none}.global-search-trigger[_ngcontent-%COMP%]{border:0;padding:0;width:40px;justify-content:center}.command-backdrop[_ngcontent-%COMP%]{padding:.5rem}.command-palette[_ngcontent-%COMP%]{border-radius:10px;min-height:calc(100dvh - 1rem)}.command-content[_ngcontent-%COMP%]{max-height:calc(100dvh - 114px)}.command-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .command-palette[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{display:none}}.app-sidenav[_ngcontent-%COMP%]{width:260px;transition:width .2s ease;overflow:hidden;border-right:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,#0f0f10,#19191c);color:#fff;box-shadow:inset -1px 0 #ffffff0a}.app-sidenav.collapsed[_ngcontent-%COMP%]{width:80px}.sidebar-content[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;gap:1rem;padding:1rem .875rem;box-sizing:border-box;overflow:hidden}.sidebar-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;min-height:72px;padding:.25rem .35rem .75rem;border-bottom:1px solid rgba(255,255,255,.08)}.brand[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;min-width:0;min-height:130px}.brand-logo[_ngcontent-%COMP%]{display:block;width:min(160px,100%);height:130px;object-fit:contain;object-position:left center}.collapse-button[_ngcontent-%COMP%]{flex-shrink:0;color:#fff;background:#ffffff14;display:inline-grid;height:44px;min-width:44px;place-items:center;width:44px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%]{justify-content:center;padding:.25rem 0}.app-sidenav.collapsed[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{display:none}.sidebar-section-label[_ngcontent-%COMP%]{padding:0 .8rem;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#ffffff70}.nav-list[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;-webkit-overflow-scrolling:touch;padding:.25rem 0}.nav-item-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;width:100%}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]{--mdc-list-list-item-container-shape: 16px;min-height:48px;margin:.2rem 0;color:#ffffffdb}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%], .nav-text[_ngcontent-%COMP%]{color:#ffffffe6!important}.nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]:hover, .menu-trigger[_ngcontent-%COMP%]:hover{background:#ffffff12}.nav-list[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .menu-trigger[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444;flex:0 0 24px;font-size:24px;height:24px;line-height:24px;overflow:visible;text-align:center;width:24px}.nav-text[_ngcontent-%COMP%]{white-space:nowrap;font-weight:500}.menu-group[_ngcontent-%COMP%]{margin:.1rem 0}.menu-group.group-active[_ngcontent-%COMP%] > .menu-trigger[_ngcontent-%COMP%]{background:#c1121f29}.menu-trigger[_ngcontent-%COMP%]{width:100%;border:0;background:transparent}.submenu-icon[_ngcontent-%COMP%]{margin-left:auto;transition:transform .2s ease;color:#ffffff80}.submenu-icon.open[_ngcontent-%COMP%]{transform:rotate(180deg)}.submenu[_ngcontent-%COMP%]{margin-top:.1rem;padding-left:.9rem}.submenu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{min-height:42px}.submenu-item-content[_ngcontent-%COMP%]{gap:10px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-item-content[_ngcontent-%COMP%]{justify-content:center;gap:0}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-text[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]   .submenu-icon[_ngcontent-%COMP%]{display:none}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]{border-radius:16px;display:grid;height:48px;margin:.35rem auto;min-height:48px;overflow:visible;place-items:center;width:48px}.app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__content[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]   .nav-list[_ngcontent-%COMP%]   a[mat-list-item][_ngcontent-%COMP%]   .mdc-list-item__primary-text[_ngcontent-%COMP%]{display:grid;overflow:visible;place-items:center;width:100%}.active-link[_ngcontent-%COMP%]{background:linear-gradient(90deg,#c1121f3d,#c1121f14);box-shadow:inset 0 0 0 1px #c1121f3d}.sidebar-footer[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;margin-top:auto}.sidebar-session-card[_ngcontent-%COMP%]{display:grid;gap:.85rem;padding:.9rem;border-radius:18px;background:#ffffff0d;border:1px solid rgba(255,255,255,.08)}.session-heading[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.session-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;color:#fff;font-size:.92rem}.session-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.2rem 0 0;color:#ffffffb8;font-size:.92rem;line-height:1.2;overflow-wrap:anywhere}.footer-dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:999px;background:#ef4444;box-shadow:0 0 0 6px #ef444429}.logout-button[_ngcontent-%COMP%]{width:100%;min-height:46px;justify-content:flex-start;border-radius:16px;border-color:#ffffff24!important;background:#ffffff0a;color:#fff!important}.logout-button[_ngcontent-%COMP%]:hover{background:#ef44441f;border-color:#ef444459!important}.logout-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ef4444}.app-sidenav.collapsed[_ngcontent-%COMP%]   .sidebar-footer[_ngcontent-%COMP%]{align-items:center}.app-sidenav.collapsed[_ngcontent-%COMP%]   .logout-button[_ngcontent-%COMP%]{width:48px;min-width:48px;padding:0;justify-content:center}.app-toolbar[_ngcontent-%COMP%]{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:.5rem;background:#ffffffeb;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:var(--app-text);box-shadow:inset 0 -1px #12121214}.mobile-menu-button[_ngcontent-%COMP%]{display:none;flex-shrink:0;background:var(--app-accent-soft);color:var(--app-accent)}.toolbar-brand[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.55rem;min-width:0}.toolbar-logo[_ngcontent-%COMP%]{flex-shrink:0;width:28px;height:28px;object-fit:contain}body.dark-theme[_nghost-%COMP%]   .toolbar-logo[_ngcontent-%COMP%], body.dark-theme   [_nghost-%COMP%]   .toolbar-logo[_ngcontent-%COMP%]{filter:invert(1)}.toolbar-title[_ngcontent-%COMP%]{font-weight:700;letter-spacing:-.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.toolbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.theme-toggle-button[_ngcontent-%COMP%]{background:var(--app-accent-soft);color:var(--app-accent);flex:0 0 auto}.profile-avatar-button[_ngcontent-%COMP%]{align-items:center;background:#fff;border:2px solid #fff;border-radius:999px;box-shadow:0 0 0 1px #1212121a,0 10px 24px #1018282e;color:#991b1b;cursor:pointer;display:inline-grid;flex:0 0 42px;font-weight:800;height:42px;justify-content:center;overflow:hidden;padding:0;transition:border-color .16s ease,box-shadow .16s ease,transform .16s ease;width:42px}.profile-avatar-button[_ngcontent-%COMP%]:hover, .profile-avatar-button[_ngcontent-%COMP%]:focus-visible{border-color:#fff;box-shadow:0 0 0 3px #c1121f38,0 14px 30px #c1121f38;outline:0;transform:translateY(-1px)}.profile-avatar-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;object-fit:cover;width:100%}.profile-avatar-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{align-items:center;background:#fff3f2;display:flex;height:100%;justify-content:center;width:100%}.app-content[_ngcontent-%COMP%]{padding:1.5rem;background:radial-gradient(circle at top right,rgba(193,18,31,.1),transparent 22%),linear-gradient(180deg,#f6f6f7,#fff);min-height:calc(100dvh - 64px);box-sizing:border-box}@media(max-width:1024px){.app-sidenav[_ngcontent-%COMP%], .app-sidenav.collapsed[_ngcontent-%COMP%]{width:min(86vw,320px)}.sidebar-content[_ngcontent-%COMP%]{padding:.9rem .75rem}.sidebar-header[_ngcontent-%COMP%]{min-height:64px}.mobile-menu-button[_ngcontent-%COMP%]{display:inline-flex}.toolbar-title[_ngcontent-%COMP%]{font-size:.95rem;line-height:1.25}.toolbar-logo[_ngcontent-%COMP%]{width:24px;height:24px}.app-content[_ngcontent-%COMP%]{padding:1rem;min-height:calc(100dvh - 56px)}}"]})};var g=t=>{let a=c(he),e=c(H),n=t.data.roles??[];return je([a.isAuthenticated$,a.user$]).pipe(O(([i,r])=>{if(!i)return e.createUrlTree(["/login"]);if(n.length===0)return!0;let d=$t(r);return Gt(d,n)?!0:e.createUrlTree(["/sin-acceso"])}))};var Jt=(t,a)=>{let e=c(fe),n=c(lt),i=c(H);return e.roles$.pipe(ie(1),ae(r=>!r.includes("User")||a.url==="/sin-acceso"?z(!0):n.get(`${S.apiUrl}/api/contracts/mine`).pipe(O(d=>{let te=d.find(an=>an.status==="PendingSignature");return d.length===0?i.createUrlTree(["/sin-acceso"]):!te||a.url===`/contracts/${te.id}/sign`?!0:i.createUrlTree(["/contracts",te.id,"sign"])}),L(()=>z(i.createUrlTree(["/sin-acceso"]))))))};var Xt=[{path:"body-map-calibrator",loadComponent:()=>import("./chunk-BSSFDTD3.js").then(t=>t.BodyMapCalibratorPageComponent)},{path:"login",loadComponent:()=>import("./chunk-HEWAWJKP.js").then(t=>t.LoginComponent)},{path:"",component:xe,canActivate:[Lt],canActivateChild:[Jt],children:[{path:"preregistrations",loadComponent:()=>import("./chunk-TDYYFHAN.js").then(t=>t.PreregistrationsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"",redirectTo:"profile",pathMatch:"full"},{path:"sin-acceso",loadComponent:()=>import("./chunk-BE45EMJO.js").then(t=>t.AccessDeniedComponent)},{path:"dashboard",loadComponent:()=>import("./chunk-DIVPA5C7.js").then(t=>t.DashboardPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"profile",loadComponent:()=>import("./chunk-7FJFEC4N.js").then(t=>t.ProfilePageComponent)},{path:"employees",loadComponent:()=>import("./chunk-PUKFNFNR.js").then(t=>t.EmployeesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"employees/categories",loadComponent:()=>import("./chunk-UB5DF7FO.js").then(t=>t.EmployeeCategoriesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"employees/:id",loadComponent:()=>import("./chunk-MCLZFXIY.js").then(t=>t.EmployeeDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"clients",loadComponent:()=>import("./chunk-IGREEKI4.js").then(t=>t.ClientsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"clients/new",loadComponent:()=>import("./chunk-QJZIM2ES.js").then(t=>t.ClientDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"clients/:id",loadComponent:()=>import("./chunk-QJZIM2ES.js").then(t=>t.ClientDetailsPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"my-contracts",loadComponent:()=>import("./chunk-NMYKMU57.js").then(t=>t.MyContractsPageComponent),canActivate:[g],data:{roles:["User"]}},{path:"contracts",loadComponent:()=>import("./chunk-4LDLSNWN.js").then(t=>t.ContractsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"contracts/:id/sign",loadComponent:()=>import("./chunk-VAI7NFVR.js").then(t=>t.ContractSignaturePageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin","User"]}},{path:"contracts/:id",loadComponent:()=>import("./chunk-H7FL2WSN.js").then(t=>t.ContractDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"health/patients/:id",loadComponent:()=>import("./chunk-Q6J6V7QQ.js").then(t=>t.HealthPatientDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"health",loadComponent:()=>import("./chunk-DYUD4ID3.js").then(t=>t.HealthPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"membership-plans",loadComponent:()=>import("./chunk-PHTHJ35P.js").then(t=>t.MembershipPlansPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"movements",loadComponent:()=>import("./chunk-KVMMQKPP.js").then(t=>t.MovementsPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"movements/payments/new",loadComponent:()=>import("./chunk-DHXUPQXY.js").then(t=>t.PaymentRegisterPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"movements/categories",loadComponent:()=>import("./chunk-MKDBP7UY.js").then(t=>t.CashMovementCategoriesPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/routines/new",loadComponent:()=>import("./chunk-BU2XA33E.js").then(t=>t.RoutineCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"weekly-schedules",loadComponent:()=>import("./chunk-JSRYNJGX.js").then(t=>t.WeeklySchedulesPageComponent),canActivate:[g],data:{roles:["SuperAdmin","Admin"]}},{path:"student-platform/routines/:id",loadComponent:()=>import("./chunk-VIM4OXYS.js").then(t=>t.WorkoutDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/training-plans/new",loadComponent:()=>import("./chunk-CS6XNKUX.js").then(t=>t.TrainingPlanCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/training-plans/:id",loadComponent:()=>import("./chunk-6XVF5OYW.js").then(t=>t.TrainingPlanDetailPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/exercises/new",loadComponent:()=>import("./chunk-MTD6OCAH.js").then(t=>t.ExerciseCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform/exercises/:id",loadComponent:()=>import("./chunk-MTD6OCAH.js").then(t=>t.ExerciseCreatePageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}},{path:"student-platform",loadComponent:()=>import("./chunk-DTH5B2TD.js").then(t=>t.StudentPlatformPageComponent),canActivate:[g],data:{roles:["SuperAdmin"]}}]}];var ye=class t extends be{itemsPerPageLabel="Filas por p\xE1gina";nextPageLabel="P\xE1gina siguiente";previousPageLabel="P\xE1gina anterior";firstPageLabel="Primera p\xE1gina";lastPageLabel="\xDAltima p\xE1gina";getRangeLabel=(a,e,n)=>{if(n===0||e===0)return`0 de ${n}`;let i=a*e,r=Math.min(i+e,n);return`${i+1}-${r} de ${n}`};static \u0275fac=(()=>{let a;return function(n){return(a||(a=$(t)))(n||t)}})();static \u0275prov=N({token:t,factory:t.\u0275fac})};function en(t){if(!(t instanceof pe))return{title:"Ocurri\xF3 un error",message:"No pudimos completar la operaci\xF3n. Intent\xE1 nuevamente."};if(t.status===0)return{title:"Sin conexi\xF3n con el sistema",message:"No pudimos comunicarnos con el servidor. Revis\xE1 tu conexi\xF3n e intent\xE1 nuevamente."};let a=t.error,e=qn(a),n=Me(a,"message")||Me(a,"detail"),i=Me(a,"title")||Jn(t.status),r=Me(a,"referenceId"),d=e.length>0?e.slice(0,4).join(`
`):n||Yn(a)||Xn(t.status);return e.length>4&&(d+=`
Y ${e.length-4} observaci\xF3n(es) m\xE1s.`),r&&!d.includes(r)&&t.status>=500&&(d+=`
C\xF3digo: ${r}`),{title:i,message:d}}function qn(t){if(!t||typeof t!="object")return[];let a=t.errors;return Array.isArray(a)?a.map(e=>typeof e=="string"?Re("",e):Zn(e)).filter(e=>!!e):a&&typeof a=="object"?Object.entries(a).flatMap(([e,n])=>(Array.isArray(n)?n:[n]).filter(r=>typeof r=="string").map(r=>Re(e,r))):[]}function Zn(t){if(!t||typeof t!="object")return null;let a=t;return typeof a.message=="string"?Re(typeof a.field=="string"?a.field:"",a.message):null}function Re(t,a){let e=Kn(t),n=a.replace(/^'[^']+'\s*/,"").replace(/must be between (\d+) and (\d+)\.?/i,"debe estar entre $1 y $2.").replace(/must not be empty\.?/i,"es obligatorio.").replace(/must be a valid email address\.?/i,"debe ser un correo v\xE1lido.").replace(/must match[^.]*\.?/i,"debe coincidir con el per\xEDodo seleccionado.");return n=n.charAt(0).toLocaleLowerCase("es-AR")+n.slice(1),e?`${e}: ${n}`:ei(n)}function Kn(t){let a=t.replace(/[^a-z0-9]/gi,"").toLowerCase();return{membershipperiodyear:"A\xF1o del per\xEDodo de la membres\xEDa",membershipperiodmonth:"Mes del per\xEDodo de la membres\xEDa",initialpaymentperiodyear:"A\xF1o del per\xEDodo del pago",initialpaymentperiodmonth:"Mes del per\xEDodo del pago",nombre:"Nombre",apellido:"Apellido",dni:"DNI",email:"Correo electr\xF3nico",telefono:"Tel\xE9fono",direccion:"Direcci\xF3n"}[a]??t.replace(/\./g," ")}function Me(t,a){if(!t||typeof t!="object")return"";let e=t[a];return typeof e=="string"?e.trim():""}function Yn(t){return typeof t=="string"&&!t.trimStart().startsWith("<")?t.trim():""}function Jn(t){return t===400||t===422?"Revis\xE1 los datos ingresados":t===401?"Tu sesi\xF3n venci\xF3":t===403?"No ten\xE9s permiso para esta acci\xF3n":t===404?"No encontramos el dato solicitado":t===409?"La informaci\xF3n entr\xF3 en conflicto":t>=500?"El servidor no pudo completar la operaci\xF3n":"No se pudo completar"}function Xn(t){return t===400||t===422?"Hay datos incorrectos o incompletos. Revisalos e intent\xE1 nuevamente.":t===401?"Volv\xE9 a iniciar sesi\xF3n para continuar.":t===403?"Tu usuario no tiene autorizaci\xF3n para realizar esta operaci\xF3n.":t===404?"El registro pudo haber sido eliminado o ya no estar disponible.":t===409?"Actualiz\xE1 la pantalla y volv\xE9 a intentarlo.":"Intent\xE1 nuevamente. Si el problema contin\xFAa, comunicate con soporte."}function ei(t){return t&&t.charAt(0).toLocaleUpperCase("es-AR")+t.slice(1)}function tn(t,a){let e=c(_e),n=e.currentRevision;return t.url.startsWith(S.apiUrl)?a(t).pipe(Ue(r=>{!(r instanceof st)||!ti(t.method)||queueMicrotask(()=>e.successIfUnchanged(ni(t.method),n))}),L(r=>{let d=en(r);return queueMicrotask(()=>e.show(d.message,"error",2e4,d.title)),Ve(()=>r instanceof pe?r:new Error(d.message))})):a(t)}function ti(t){return t==="POST"||t==="PUT"||t==="PATCH"||t==="DELETE"}function ni(t){return t==="DELETE"?"El registro se elimin\xF3 correctamente.":t==="POST"?"La informaci\xF3n se guard\xF3 correctamente.":"Los cambios se guardaron correctamente."}var Se=class t{toast=c(_e);handleError(a){console.error(a),this.toast.show("Ocurri\xF3 un error inesperado en la pantalla. Recarg\xE1 la p\xE1gina e intent\xE1 nuevamente.","error",2e4,"La pantalla encontr\xF3 un problema")}static \u0275fac=function(e){return new(e||t)};static \u0275prov=N({token:t,factory:t.\u0275fac})};var ii=S.auth0.redirectUri||`${window.location.origin}/`,nn={providers:[We(),ct(dt([Bt,tn])),gt(Xt),He(It),{provide:Qe,useClass:Se},{provide:be,useClass:ye},{provide:Mt,useValue:{disableClose:!0}},zt({domain:S.auth0.domain,clientId:S.auth0.clientId,authorizationParams:{redirect_uri:ii,audience:S.auth0.audience},httpInterceptor:{allowedList:[{uri:`${S.apiUrl}/api/*`,tokenOptions:{authorizationParams:{audience:S.auth0.audience}}}]}})]};var ke=class t{title=I("gym-management-frontend");static \u0275fac=function(e){return new(e||t)};static \u0275cmp=v({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(e,n){e&1&&D(0,"router-outlet")},dependencies:[ue],encapsulation:2})};rt(ke,nn).catch(t=>console.error(t));
