import{a as Pe,b as ke,c as Me}from"./chunk-5H2ZAQUF.js";import{a as Ce}from"./chunk-JAD4PFQN.js";import{a as xe,b as ye,e as Ee,f as Se}from"./chunk-MQTYPKOT.js";import{B as ee,D as te,F as g,H as ne,I as re,L as ie,M as ae,O as oe,P as se,T as me,U as le,Y as ce,ba as de,ea as pe,fa as ue,u as Y}from"./chunk-KSYESGDJ.js";import{D as W,Q as ge,R as fe,S as be,T as _e,U as ve,n as K}from"./chunk-XPGK2BF7.js";import{$ as A,Aa as V,Ac as k,Bb as P,Bc as J,Gc as he,Ja as s,Mb as w,Na as j,Nb as q,Ob as L,Pb as a,Qb as d,Rb as F,Sb as y,Ta as E,Ua as G,Vb as H,aa as B,ca as D,ea as c,eb as z,gb as _,ia as O,ib as v,ja as N,jc as Z,lb as f,lc as T,mb as b,nb as h,ob as r,pb as n,qa as U,qb as l,ra as X,rb as S,sb as C,tb as x,va as u,xb as $,xc as Q,zb as p}from"./chunk-SE6S6X2P.js";function Fe(i,e){i&1&&x(0,"div",2)}var Te=new D("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var Oe=(()=>{class i{_elementRef=c(V);_ngZone=c(X);_changeDetectorRef=c(Z);_renderer=c(j);_cleanupTransitionEnd;constructor(){let t=W(),o=c(Te,{optional:!0});this._isNoopAnimation=t==="di-disabled",t==="reduced-motion"&&this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion"),o&&(o.color&&(this.color=this._defaultColor=o.color),this.mode=o.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;_defaultColor="primary";get value(){return this._value}set value(t){this._value=Re(t||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(t){this._bufferValue=Re(t||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new U;get mode(){return this._mode}set mode(t){this._mode=t,this._changeDetectorRef.markForCheck()}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=t=>{this.animationEnd.observers.length===0||!t.target||!t.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static \u0275fac=function(o){return new(o||i)};static \u0275cmp=E({type:i,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(o,m){o&2&&(z("aria-valuenow",m._isIndeterminate()?null:m.value)("mode",m.mode),L("mat-"+m.color),q("_mat-animation-noopable",m._isNoopAnimation)("mdc-linear-progress--animation-ready",!m._isNoopAnimation)("mdc-linear-progress--indeterminate",m._isIndeterminate()))},inputs:{color:"color",value:[2,"value","value",T],bufferValue:[2,"bufferValue","bufferValue",T],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(o,m){o&1&&(S(0,"div",0),x(1,"div",1),_(2,Fe,1,0,"div",2),C(),S(3,"div",3),x(4,"span",4),C(),S(5,"div",5),x(6,"span",4),C()),o&2&&(s(),w("flex-basis",m._getBufferBarFlexBasis()),s(),v(m.mode==="buffer"?2:-1),s(),w("transform",m._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
  --mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--mat-progress-bar-track-height, 4px), var(--mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--mat-progress-bar-track-height, 4px);
  border-radius: var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2,changeDetection:0})}return i})();function Re(i,e=0,t=100){return Math.max(e,Math.min(t,i))}var Ne=(()=>{class i{static \u0275fac=function(o){return new(o||i)};static \u0275mod=G({type:i});static \u0275inj=B({imports:[K]})}return i})();var M=class i{http=c(J);apiUrl=`${he.apiUrl}/api`;getExercises(e=""){let t=new k;return e.trim()&&(t=t.set("search",e.trim())),this.http.get(`${this.apiUrl}/Exercises`,{params:t})}createExercise(e){return this.http.post(`${this.apiUrl}/Exercises`,e)}updateExercise(e,t){return this.http.put(`${this.apiUrl}/Exercises/${e}`,t)}deleteExercise(e){return this.http.delete(`${this.apiUrl}/Exercises/${e}`)}getRoutines(e){let t=new k;return e&&(t=t.set("clientId",e)),this.http.get(`${this.apiUrl}/Routines`,{params:t})}createRoutine(e){return this.http.post(`${this.apiUrl}/Routines`,e)}getRanking(e,t){let o=new k().set("metric",e).set("period",t);return this.http.get(`${this.apiUrl}/Rankings`,{params:o})}static \u0275fac=function(t){return new(t||i)};static \u0275prov=A({token:i,factory:i.\u0275fac,providedIn:"root"})};var Be=()=>[],R=(i,e)=>e.id,De=(i,e)=>e.clientId;function Ue(i,e){if(i&1&&(r(0,"div",4),a(1),n()),i&2){let t=P();s(),d(t.feedback())}}function Xe(i,e){i&1&&l(0,"mat-progress-bar",5)}function Ve(i,e){if(i&1){let t=$();r(0,"mat-card",21)(1,"div")(2,"strong"),a(3),n(),r(4,"span"),a(5),n(),r(6,"p"),a(7),n(),r(8,"small"),a(9),n()(),r(10,"div",34)(11,"button",35),p("click",function(){let m=O(t).$implicit,I=P();return N(I.editExercise(m))}),r(12,"mat-icon"),a(13,"edit"),n()(),r(14,"button",36),p("click",function(){let m=O(t).$implicit,I=P();return N(I.deleteExercise(m))}),r(15,"mat-icon"),a(16,"delete"),n()()()()}if(i&2){let t=e.$implicit;s(3),d(t.name),s(2),d(t.muscleGroup),s(2),d(t.description),s(2),F("QR: ",t.qrUrl)}}function je(i,e){if(i&1&&(r(0,"mat-option",24),a(1),n()),i&2){let t=e.$implicit;h("value",t.id),s(),y("",t.apellido,", ",t.nombre)}}function Ge(i,e){if(i&1&&(r(0,"mat-option",24),a(1),n()),i&2){let t=e.$implicit;h("value",t.id),s(),d(t.name)}}function ze(i,e){if(i&1&&(r(0,"mat-card",21)(1,"div")(2,"strong"),a(3),n(),r(4,"span"),a(5),n(),r(6,"p"),a(7),n()()()),i&2){let t=e.$implicit;s(3),d(t.name),s(2),y("",t.goal," \xB7 ",t.level),s(2),y("",t.exercises.length," ejercicios \xB7 ",t.completionPercent,"% completado")}}function $e(i,e){if(i&1&&(r(0,"mat-card",33)(1,"strong"),a(2),n(),r(3,"span"),a(4),n(),r(5,"b"),a(6),n()()),i&2){let t=e.$implicit;s(2),F("#",t.position),s(2),y("",t.apellido,", ",t.nombre),s(2),d(t.score)}}var we=class i{formBuilder=c(me);platformService=c(M);clientsService=c(Ce);exercises=u([]);clients=u([]);routines=u([]);ranking=u(null);feedback=u("");isLoading=u(!1);exerciseForm=this.formBuilder.nonNullable.group({id:[0],name:["",g.required],description:["",g.required],muscleGroup:["",g.required],musclesInvolved:[""],photoUrl:[""],videoUrl:[""],qrSlug:[""]});routineForm=this.formBuilder.nonNullable.group({name:["",g.required],description:[""],level:["General"],goal:["General"],clientId:[0,g.required],exerciseId:[0,g.required],sets:[3],reps:[10],restSeconds:[60]});constructor(){this.loadAll()}loadAll(){this.isLoading.set(!0),this.feedback.set(""),this.platformService.getExercises().subscribe({next:e=>{this.exercises.set(e),this.isLoading.set(!1)},error:()=>{this.isLoading.set(!1),this.feedback.set("No se pudo cargar la biblioteca de ejercicios.")}}),this.clientsService.getPaged(1,100,{clientStatus:"active"}).subscribe({next:e=>this.clients.set(e.items),error:()=>this.feedback.set("No se pudo cargar la lista de alumnos.")}),this.platformService.getRoutines().subscribe({next:e=>this.routines.set(e),error:()=>this.feedback.set("No se pudieron cargar las rutinas.")}),this.loadRanking("attendance")}editExercise(e){this.exerciseForm.setValue({id:e.id,name:e.name,description:e.description,muscleGroup:e.muscleGroup,musclesInvolved:e.musclesInvolved??"",photoUrl:e.photoUrl??"",videoUrl:e.videoUrl??"",qrSlug:e.qrSlug??""})}saveExercise(){if(this.exerciseForm.invalid)return;let e=this.exerciseForm.getRawValue(),t={name:e.name,description:e.description,muscleGroup:e.muscleGroup,musclesInvolved:e.musclesInvolved||null,photoUrl:e.photoUrl||null,videoUrl:e.videoUrl||null,qrSlug:e.qrSlug||null};(e.id?this.platformService.updateExercise(e.id,t):this.platformService.createExercise(t)).subscribe({next:()=>{this.feedback.set("Ejercicio guardado."),this.exerciseForm.reset({id:0,name:"",description:"",muscleGroup:"",musclesInvolved:"",photoUrl:"",videoUrl:"",qrSlug:""}),this.platformService.getExercises().subscribe(m=>this.exercises.set(m))},error:()=>this.feedback.set("No se pudo guardar el ejercicio.")})}deleteExercise(e){this.platformService.deleteExercise(e.id).subscribe({next:()=>{this.feedback.set("Ejercicio eliminado."),this.exercises.update(t=>t.filter(o=>o.id!==e.id))},error:()=>this.feedback.set("No se pudo eliminar el ejercicio.")})}createRoutine(){if(this.routineForm.invalid)return;let e=this.routineForm.getRawValue();this.platformService.createRoutine({name:e.name,description:e.description||null,level:e.level,goal:e.goal,clientIds:[e.clientId],exercises:[{exerciseId:e.exerciseId,sortOrder:1,sets:e.sets,reps:e.reps,restSeconds:e.restSeconds}]}).subscribe({next:()=>{this.feedback.set("Rutina asignada."),this.platformService.getRoutines().subscribe(t=>this.routines.set(t))},error:()=>this.feedback.set("No se pudo asignar la rutina.")})}loadRanking(e){this.platformService.getRanking(e,"monthly").subscribe({next:t=>this.ranking.set(t),error:()=>this.feedback.set("No se pudo cargar el ranking.")})}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=E({type:i,selectors:[["app-student-platform-page"]],decls:107,vars:6,consts:[[1,"student-platform"],[1,"page-header"],[1,"eyebrow"],["mat-flat-button","","color","primary","type","button",3,"click"],[1,"feedback"],["mode","indeterminate"],["animationDuration","160ms"],["label","Ejercicios"],[1,"tab-grid"],[1,"form-grid",3,"ngSubmit","formGroup"],["appearance","outline"],["matInput","","formControlName","name"],["matInput","","formControlName","muscleGroup"],["appearance","outline",1,"wide"],["matInput","","rows","3","formControlName","description"],["matInput","","formControlName","musclesInvolved"],["matInput","","formControlName","qrSlug"],["matInput","","formControlName","photoUrl"],["matInput","","formControlName","videoUrl"],["mat-flat-button","","color","primary","type","submit"],[1,"list"],[1,"item-card"],["label","Rutinas"],["formControlName","clientId"],[3,"value"],["formControlName","exerciseId"],["matInput","","formControlName","goal"],["matInput","","type","number","formControlName","sets"],["matInput","","type","number","formControlName","reps"],["label","Ranking"],[1,"ranking-toolbar"],["mat-stroked-button","","type","button",3,"click"],[1,"ranking-list"],[1,"ranking-row"],[1,"actions"],["mat-icon-button","","type","button","aria-label","Editar ejercicio",3,"click"],["mat-icon-button","","type","button","aria-label","Eliminar ejercicio",3,"click"]],template:function(t,o){if(t&1&&(r(0,"section",0)(1,"header",1)(2,"div")(3,"span",2),a(4,"Fase 2"),n(),r(5,"h1"),a(6,"Plataforma del alumno"),n(),r(7,"p"),a(8,"Gestiona ejercicios, rutinas, progreso y rankings desde un solo lugar."),n()(),r(9,"button",3),p("click",function(){return o.loadAll()}),r(10,"mat-icon"),a(11,"refresh"),n(),a(12," Actualizar "),n()(),_(13,Ue,2,1,"div",4),_(14,Xe,1,0,"mat-progress-bar",5),r(15,"mat-tab-group",6)(16,"mat-tab",7)(17,"div",8)(18,"mat-card")(19,"h2"),a(20),n(),r(21,"form",9),p("ngSubmit",function(){return o.saveExercise()}),r(22,"mat-form-field",10)(23,"mat-label"),a(24,"Nombre"),n(),l(25,"input",11),n(),r(26,"mat-form-field",10)(27,"mat-label"),a(28,"Grupo muscular"),n(),l(29,"input",12),n(),r(30,"mat-form-field",13)(31,"mat-label"),a(32,"Descripcion"),n(),l(33,"textarea",14),n(),r(34,"mat-form-field",10)(35,"mat-label"),a(36,"Musculos involucrados"),n(),l(37,"input",15),n(),r(38,"mat-form-field",10)(39,"mat-label"),a(40,"Slug QR"),n(),l(41,"input",16),n(),r(42,"mat-form-field",10)(43,"mat-label"),a(44,"Foto URL"),n(),l(45,"input",17),n(),r(46,"mat-form-field",10)(47,"mat-label"),a(48,"Video URL"),n(),l(49,"input",18),n(),r(50,"button",19)(51,"mat-icon"),a(52,"save"),n(),a(53," Guardar "),n()()(),r(54,"div",20),f(55,Ve,17,4,"mat-card",21,R),n()()(),r(57,"mat-tab",22)(58,"div",8)(59,"mat-card")(60,"h2"),a(61,"Asignar rutina"),n(),r(62,"form",9),p("ngSubmit",function(){return o.createRoutine()}),r(63,"mat-form-field",10)(64,"mat-label"),a(65,"Alumno"),n(),r(66,"mat-select",23),f(67,je,2,3,"mat-option",24,R),n()(),r(69,"mat-form-field",10)(70,"mat-label"),a(71,"Ejercicio inicial"),n(),r(72,"mat-select",25),f(73,Ge,2,2,"mat-option",24,R),n()(),r(75,"mat-form-field",10)(76,"mat-label"),a(77,"Nombre"),n(),l(78,"input",11),n(),r(79,"mat-form-field",10)(80,"mat-label"),a(81,"Objetivo"),n(),l(82,"input",26),n(),r(83,"mat-form-field",10)(84,"mat-label"),a(85,"Series"),n(),l(86,"input",27),n(),r(87,"mat-form-field",10)(88,"mat-label"),a(89,"Repeticiones"),n(),l(90,"input",28),n(),r(91,"button",19)(92,"mat-icon"),a(93,"assignment_add"),n(),a(94," Asignar "),n()()(),r(95,"div",20),f(96,ze,8,5,"mat-card",21,R),n()()(),r(98,"mat-tab",29)(99,"div",30)(100,"button",31),p("click",function(){return o.loadRanking("attendance")}),a(101,"Asistencia mensual"),n(),r(102,"button",31),p("click",function(){return o.loadRanking("achievements")}),a(103,"Logros mensual"),n()(),r(104,"div",32),f(105,$e,7,4,"mat-card",33,De),n()()()()),t&2){let m;s(13),v(o.feedback()?13:-1),s(),v(o.isLoading()?14:-1),s(6),d(o.exerciseForm.controls.id.value?"Editar ejercicio":"Nuevo ejercicio"),s(),h("formGroup",o.exerciseForm),s(34),b(o.exercises()),s(7),h("formGroup",o.routineForm),s(5),b(o.clients()),s(6),b(o.exercises()),s(23),b(o.routines()),s(9),b(((m=o.ranking())==null?null:m.items)??H(5,Be))}},dependencies:[Q,le,ie,te,ae,ne,re,se,oe,be,fe,ge,ye,xe,de,ee,Y,ve,_e,Se,Ee,Ne,Oe,ue,pe,ce,Me,Pe,ke],styles:[".student-platform[_ngcontent-%COMP%]{display:grid;gap:1rem}.page-header[_ngcontent-%COMP%]{align-items:center;display:flex;gap:1rem;justify-content:space-between}.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#5f6877;margin:.35rem 0 0}.eyebrow[_ngcontent-%COMP%]{color:#176b87;font-size:.78rem;font-weight:700;text-transform:uppercase}.feedback[_ngcontent-%COMP%]{background:#e8f4f8;border:1px solid #b8dbe6;border-radius:6px;color:#174b5c;padding:.75rem 1rem}.tab-grid[_ngcontent-%COMP%]{display:grid;gap:1rem;grid-template-columns:minmax(320px,460px) 1fr;padding:1rem 0}.form-grid[_ngcontent-%COMP%]{display:grid;gap:.75rem;grid-template-columns:1fr 1fr}.wide[_ngcontent-%COMP%]{grid-column:1/-1}.list[_ngcontent-%COMP%], .ranking-list[_ngcontent-%COMP%]{display:grid;gap:.75rem}.item-card[_ngcontent-%COMP%], .ranking-row[_ngcontent-%COMP%]{align-items:center;display:flex;gap:1rem;justify-content:space-between}.item-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .item-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#607080;display:block}.item-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.35rem 0}.actions[_ngcontent-%COMP%], .ranking-toolbar[_ngcontent-%COMP%]{display:flex;gap:.5rem}.ranking-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#176b87;min-width:3rem}.ranking-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{flex:1}@media(max-width:900px){.page-header[_ngcontent-%COMP%], .item-card[_ngcontent-%COMP%]{align-items:stretch;flex-direction:column}.tab-grid[_ngcontent-%COMP%], .form-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}"],changeDetection:0})};export{we as StudentPlatformPageComponent};
