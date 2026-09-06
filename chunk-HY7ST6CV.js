import{c as ft,h as ut,j as ht,m as _t}from"./chunk-XM4IBWPX.js";import{f as P,g as dt,h as mt,k as j,l as pt}from"./chunk-77IYW2UC.js";import{D as kt,H as vt,J as F,V as gt,W as yt,X as B,Y as xt,Z as At,a as st,o as ct,p as lt,x as bt}from"./chunk-CYEDTPS4.js";import{$b as y,Eb as Y,Fa as K,Gb as C,Ib as M,Ob as l,Pb as m,Qb as tt,Qc as ot,V as q,Xb as et,Zb as g,a as h,ba as x,bb as d,ca as H,dc as nt,ea as D,ec as R,fc as I,g as f,ga as r,gb as E,hb as X,lc as at,ld as rt,m as V,ma as Z,mc as it,na as Q,nc as p,oc as w,pc as O,qa as k,qb as v,ra as U,rb as G,sb as A,ub as $,va as W,vb as J}from"./chunk-GA54ARE3.js";function Tt(a,o){if(a&1){let t=et();l(0,"div",1)(1,"button",2),g("click",function(){Z(t);let n=y();return Q(n.action())}),p(2),m()()}if(a&2){let t=y();d(2),O(" ",t.data.action," ")}}var Dt=["label"];function Et(a,o){}var Rt=Math.pow(2,31)-1,u=class{_overlayRef;instance;containerInstance;_afterDismissed=new f;_afterOpened=new f;_onAction=new f;_durationTimeoutId;_dismissedByAction=!1;constructor(o,t){this._overlayRef=t,this.containerInstance=o,o._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(o){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(o,Rt))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},S=new D("MatSnackBarData"),_=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},It=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275dir=A({type:a,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return a})(),Ot=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275dir=A({type:a,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return a})(),Pt=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275dir=A({type:a,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return a})(),Mt=(()=>{class a{snackBarRef=r(u);data=r(S);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=v({type:a,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(e,n){e&1&&(l(0,"div",0),p(1),m(),C(2,Tt,3,1,"div",1)),e&2&&(d(),O(" ",n.data.message,`
`),d(),M(n.hasAction?2:-1))},dependencies:[yt,It,Ot,Pt],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return a})(),N="_mat-snack-bar-enter",z="_mat-snack-bar-exit",jt=(()=>{class a extends mt{_ngZone=r(W);_elementRef=r(K);_changeDetectorRef=r(ot);_platform=r(st);_animationsDisabled=F();snackBarConfig=r(_);_document=r(U);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=r(k);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new f;_onExit=new f;_onEnter=new f;_animationState="void";_live;_label;_role;_liveElementId=r(lt).getId("mat-snack-bar-container-live-");constructor(){super();let t=this.snackBarConfig;t.politeness==="assertive"&&!t.announcementMessage?this._live="assertive":t.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(t){this._assertNotAttached();let e=this._portalOutlet.attachComponentPortal(t);return this._afterPortalAttached(),e}attachTemplatePortal(t){this._assertNotAttached();let e=this._portalOutlet.attachTemplatePortal(t);return this._afterPortalAttached(),e}attachDomPortal=t=>{this._assertNotAttached();let e=this._portalOutlet.attachDomPortal(t);return this._afterPortalAttached(),e};onAnimationEnd(t){t===z?this._completeExit():t===N&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?E(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(N)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(N)},200)))}exit(){return this._destroyed?V(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?E(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(z)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(z),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let t=this._elementRef.nativeElement,e=this.snackBarConfig.panelClass;e&&(Array.isArray(e)?e.forEach(s=>t.classList.add(s)):t.classList.add(e)),this._exposeToModals();let n=this._label.nativeElement,i="mdc-snackbar__label";n.classList.toggle(i,!n.querySelector(`.${i}`))}_exposeToModals(){let t=this._liveElementId,e=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let n=0;n<e.length;n++){let i=e[n],s=i.getAttribute("aria-owns");this._trackedModals.add(i),s?s.indexOf(t)===-1&&i.setAttribute("aria-owns",s+" "+t):i.setAttribute("aria-owns",t)}}_clearFromModals(){this._trackedModals.forEach(t=>{let e=t.getAttribute("aria-owns");if(e){let n=e.replace(this._liveElementId,"").trim();n.length>0?t.setAttribute("aria-owns",n):t.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let t=this._elementRef.nativeElement,e=t.querySelector("[aria-hidden]"),n=t.querySelector("[aria-live]");if(e&&n){let i=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&e.contains(document.activeElement)&&(i=document.activeElement),e.removeAttribute("aria-hidden"),n.appendChild(e),i?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=v({type:a,selectors:[["mat-snack-bar-container"]],viewQuery:function(e,n){if(e&1&&nt(j,7)(Dt,7),e&2){let i;R(i=I())&&(n._portalOutlet=i.first),R(i=I())&&(n._label=i.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(e,n){e&1&&g("animationend",function(s){return n.onAnimationEnd(s.animationName)})("animationcancel",function(s){return n.onAnimationEnd(s.animationName)}),e&2&&at("mat-snack-bar-container-enter",n._animationState==="visible")("mat-snack-bar-container-exit",n._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!n._animationsDisabled)},features:[$],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(e,n){e&1&&(l(0,"div",1)(1,"div",2,0)(3,"div",3),J(4,Et,0,0,"ng-template",4),m(),tt(5,"div"),m()()),e&2&&(d(5),Y("aria-live",n._live)("role",n._role)("id",n._liveElementId))},dependencies:[j],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2})}return a})(),Ft=new D("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new _}),L=(()=>{class a{_live=r(kt);_injector=r(k);_breakpointObserver=r(bt);_parentSnackBar=r(a,{optional:!0,skipSelf:!0});_defaultConfig=r(Ft);_animationsDisabled=F();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=Mt;snackBarContainerComponent=jt;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let t=this._parentSnackBar;return t?t._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(t){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=t:this._snackBarRefAtThisLevel=t}constructor(){}openFromComponent(t,e){return this._attach(t,e)}openFromTemplate(t,e){return this._attach(t,e)}open(t,e="",n){let i=h(h({},this._defaultConfig),n);return i.data={message:t,action:e},i.announcementMessage===t&&(i.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,i)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(t,e){let n=e&&e.viewContainerRef&&e.viewContainerRef.injector,i=k.create({parent:n||this._injector,providers:[{provide:_,useValue:e}]}),s=new P(this.snackBarContainerComponent,e.viewContainerRef,i),c=t.attach(s);return c.instance.snackBarConfig=e,c.instance}_attach(t,e){let n=h(h(h({},new _),this._defaultConfig),e),i=this._createOverlay(n),s=this._attachSnackBarContainer(i,n),c=new u(s,i);if(t instanceof X){let b=new dt(t,null,{$implicit:n.data,snackBarRef:c});c.instance=s.attachTemplatePortal(b)}else{let b=this._createInjector(n,c),Bt=new P(t,void 0,b),St=s.attachComponentPortal(Bt);c.instance=St.instance}return this._breakpointObserver.observe(vt.HandsetPortrait).pipe(q(i.detachments())).subscribe(b=>{i.overlayElement.classList.toggle(this.handsetCssClass,b.matches)}),n.announcementMessage&&s._onAnnounce.subscribe(()=>{this._live.announce(n.announcementMessage,n.politeness)}),this._animateSnackBar(c,n),this._openedSnackBarRef=c,this._openedSnackBarRef}_animateSnackBar(t,e){t.afterDismissed().subscribe(()=>{this._openedSnackBarRef==t&&(this._openedSnackBarRef=null),e.announcementMessage&&this._live.clear()}),e.duration&&e.duration>0&&t.afterOpened().subscribe(()=>t._dismissAfter(e.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{t.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):t.containerInstance.enter()}_createOverlay(t){let e=new ft;e.direction=t.direction;let n=ut(this._injector),i=t.direction==="rtl",s=t.horizontalPosition==="left"||t.horizontalPosition==="start"&&!i||t.horizontalPosition==="end"&&i,c=!s&&t.horizontalPosition!=="center";return s?n.left("0"):c?n.right("0"):n.centerHorizontally(),t.verticalPosition==="top"?n.top("0"):n.bottom("0"),e.positionStrategy=n,e.disableAnimations=this._animationsDisabled,ht(this._injector,e)}_createInjector(t,e){let n=t&&t.viewContainerRef&&t.viewContainerRef.injector;return k.create({parent:n||this._injector,providers:[{provide:u,useValue:e},{provide:S,useValue:t.data}]})}static \u0275fac=function(e){return new(e||a)};static \u0275prov=x({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})();var ae=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275mod=G({type:a});static \u0275inj=H({providers:[L],imports:[_t,pt,B,Mt,ct]})}return a})();function Nt(a,o){if(a&1&&(l(0,"strong"),p(1),m()),a&2){let t=y();d(),w(t.data.title)}}var T=class a{data=r(S);snackBarRef=r(u);get icon(){switch(this.data.tone){case"success":return"check_circle";case"error":return"error";case"warning":return"warning";default:return"info"}}close(){this.snackBarRef.dismiss()}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=v({type:a,selectors:[["app-toast"]],decls:11,vars:5,consts:[[1,"toast-card"],[1,"toast-icon"],[1,"toast-copy"],["mat-icon-button","","type","button","aria-label","Cerrar notificacion",3,"click"]],template:function(t,e){t&1&&(l(0,"div",0)(1,"span",1)(2,"mat-icon"),p(3),m()(),l(4,"div",2),C(5,Nt,2,1,"strong"),l(6,"p"),p(7),m()(),l(8,"button",3),g("click",function(){return e.close()}),l(9,"mat-icon"),p(10,"close"),m()()()),t&2&&(it(e.data.tone),d(3),w(e.icon),d(2),M(e.data.title?5:-1),d(2),w(e.data.message))},dependencies:[rt,B,gt,At,xt],styles:[".toast-card[_ngcontent-%COMP%]{align-items:center;background:#fff;border:1px solid #dce3ea;border-left:4px solid #176b87;border-radius:8px;box-shadow:0 16px 36px #1018282e;color:#1f2937;display:grid;gap:.65rem;grid-template-columns:34px minmax(0,1fr) 36px;min-width:min(360px,100vw - 2rem);padding:.7rem .75rem}.toast-copy[_ngcontent-%COMP%]{display:grid;gap:.18rem}.toast-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:.92rem;line-height:1.25}.toast-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.9rem;font-weight:600;line-height:1.35;margin:0;white-space:pre-line}.toast-icon[_ngcontent-%COMP%]{align-items:center;background:#e8f4f8;border-radius:999px;color:#176b87;display:inline-flex;height:34px;justify-content:center;width:34px}.toast-card.success[_ngcontent-%COMP%]{border-left-color:#16803c}.toast-card.success[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%]{background:#e9f8ef;color:#16803c}.toast-card.error[_ngcontent-%COMP%]{border-left-color:#c92a1f}.toast-card.error[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%]{background:#fff3f2;color:#c92a1f}.toast-card.warning[_ngcontent-%COMP%]{border-left-color:#d18b00}.toast-card.warning[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%]{background:#fff8e6;color:#9a6500}"],changeDetection:0})};var wt=class a{snackBar=r(L);revision=0;get currentRevision(){return this.revision}show(o,t="info",e=5e3,n){o.trim()&&(this.revision+=1,this.snackBar.openFromComponent(T,{data:{title:n,message:o,tone:t},duration:e,horizontalPosition:"end",verticalPosition:"top",panelClass:["app-toast-panel"],politeness:t==="error"?"assertive":"polite"}))}success(o){this.show(o,"success")}error(o){this.show(o,"error",2e4,"No se pudo completar")}warning(o){this.show(o,"warning")}info(o){this.show(o,"info")}successIfUnchanged(o,t){this.revision===t&&this.success(o)}static \u0275fac=function(t){return new(t||a)};static \u0275prov=x({token:a,factory:a.\u0275fac,providedIn:"root"})};export{ae as a,wt as b};
