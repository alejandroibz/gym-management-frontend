import{a as pt}from"./chunk-LQYNGCVU.js";import{a as ht,b as bt}from"./chunk-LE7LPZVA.js";import{a as ut}from"./chunk-IJBV7XUI.js";import{a as gt}from"./chunk-IOYGVWRV.js";import{a as lt,b as dt}from"./chunk-PHO3LZPD.js";import{a as rt,b as ct,h as re,i as ce,j as mt,k as me,l as U,o as X,p as H,q as Q,r as Z,s as W,t as K,u as J,v as st}from"./chunk-WY3FAMDD.js";import{g as tt,h as D,i as nt,j as b,l as F,m as T,o as R,p as L,q as z,r as A,s as ae,t as V,v as B,w as j}from"./chunk-PM7JGRC5.js";import{a as it,b as at}from"./chunk-SM3IAPPN.js";import{a as ot}from"./chunk-55HU546B.js";import{$a as ve,$b as Ze,A as Ee,B as Ie,C as Oe,D as we,Da as w,E as g,Ea as ze,Eb as Xe,Fa as p,Fb as He,G as E,H as I,Ha as h,I as Ne,Ia as ne,J as De,Ja as ie,La as Ae,Ma as be,N as he,Na as fe,O as Fe,Q as s,Ra as Ve,Rb as Qe,S as Te,Ta as S,U as Re,Ua as Be,Va as o,Wa as l,Xa as _,Y as c,_a as je,bb as _e,cb as ye,ea as P,ec as We,fa as Le,hb as v,ib as $e,j as ge,lb as Ge,mb as O,na as ue,nb as qe,nc as Ke,pa as C,qa as M,qc as Je,rc as et,ta as x,tc as $,ua as k,ub as Ye,uc as G,va as d,vc as oe,wa as i,wb as N,wc as q,xa as n,xc as Y,ya as f,yb as xe,zb as Ue}from"./chunk-OSUOQIS4.js";var ke=(r,t)=>t.id;function It(r,t){if(r&1&&(i(0,"mat-option",9),o(1),n()),r&2){let e=t.$implicit;d("value",e.id),c(),l(e.nombre)}}function Ot(r,t){if(r&1&&(i(0,"mat-option",9),o(1),n()),r&2){let e=t.$implicit,a=h(2);d("value",e.id),c(),l(a.getEmployeeLabel(e))}}function wt(r,t){if(r&1){let e=w();i(0,"mat-form-field",11)(1,"mat-label"),o(2,"Empleado relacionado"),n(),i(3,"mat-select",19),p("selectionChange",function(){E(e);let m=h();return I(m.onEmployeeChange())}),i(4,"mat-option",9),o(5,"Sin empleado"),n(),x(6,Ot,2,2,"mat-option",9,ke),n()()}if(r&2){let e=h();c(4),d("value",null),c(2),k(e.data.employees)}}function Nt(r,t){if(r&1&&(i(0,"mat-option",9),o(1),n()),r&2){let e=t.$implicit,a=h();d("value",a.getPaymentMethodLabel(e)),c(),l(a.getPaymentMethodLabel(e))}}var le=class r{formBuilder=g(B);dialogRef=g(re);data=g(ce);selectedType=s(1);selectedCategoryId=s(this.data.categories.find(t=>t.tipoMovimiento===1)?.id??null);selectedEmployeeId=s(null);filteredCategories=v(()=>this.data.categories.filter(t=>t.tipoMovimiento===this.selectedType()));selectedCategory=v(()=>{let t=this.selectedCategoryId();return this.data.categories.find(e=>e.id===t)??null});selectedEmployee=v(()=>{let t=this.selectedEmployeeId();return this.data.employees.find(e=>e.id===t)??null});shouldShowEmployeeField=v(()=>{let t=this.selectedCategory();return this.selectedType()===2&&t?.nombre.trim().toLowerCase()==="pago de sueldos"});amountLabel=v(()=>this.shouldShowEmployeeField()?"Sueldo empleado":"Monto");form=this.formBuilder.group({cashMovementCategoryId:[this.filteredCategories()[0]?.id??null,[b.required]],tipoMovimiento:[1,[b.required]],monto:[0,[b.required,b.min(0)]],fechaMovimiento:[this.data.defaultDate,[b.required]],descripcion:["",[b.required,b.minLength(3),b.maxLength(160)]],metodoPago:[null],employeeId:[null]});close(){this.dialogRef.close()}onTypeChange(){let t=Number(this.form.controls.tipoMovimiento.value);this.selectedType.set(t);let e=this.filteredCategories()[0]?.id??null;this.selectedCategoryId.set(e),this.form.controls.cashMovementCategoryId.setValue(e),this.syncEmployeeFieldVisibility()}onCategoryChange(){this.selectedCategoryId.set(Number(this.form.controls.cashMovementCategoryId.value)||null),this.syncEmployeeFieldVisibility()}onEmployeeChange(){let t=Number(this.form.controls.employeeId.value)||null;this.selectedEmployeeId.set(t);let e=this.selectedEmployee();e&&this.form.controls.monto.setValue(e.sueldo)}submit(){if(this.form.invalid){this.form.markAllAsTouched();return}let t=this.form.getRawValue();this.dialogRef.close({gymId:1,branchId:1,cashMovementCategoryId:Number(t.cashMovementCategoryId),tipoMovimiento:Number(t.tipoMovimiento),monto:Number(t.monto),fechaMovimiento:new Date(`${t.fechaMovimiento}T00:00:00`).toISOString(),descripcion:t.descripcion?.trim()??"",metodoPago:t.metodoPago?.trim()||null,employeeId:t.employeeId?Number(t.employeeId):null})}getPaymentMethodLabel(t){return t.nombre??t.descripcion??`Metodo #${t.id}`}getEmployeeLabel(t){return`${t.nombre} ${t.apellido} - DNI ${t.dni}`}syncEmployeeFieldVisibility(){this.shouldShowEmployeeField()||(this.selectedEmployeeId.set(null),this.form.controls.employeeId.setValue(null))}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=P({type:r,selectors:[["app-register-cash-movement-dialog"]],decls:54,vars:6,consts:[[1,"dialog-shell"],[1,"dialog-header"],[1,"dialog-eyebrow"],[1,"dialog-subtitle"],["mat-icon-button","","type","button","aria-label","Cerrar modal",3,"click"],[1,"dialog-form",3,"ngSubmit","formGroup"],[1,"form-grid"],["appearance","outline"],["formControlName","tipoMovimiento",3,"selectionChange"],[3,"value"],["formControlName","cashMovementCategoryId",3,"selectionChange"],["appearance","outline",1,"span-2"],["matInput","","type","date","formControlName","fechaMovimiento"],["matInput","","type","number","min","0","step","0.01","formControlName","monto"],["matInput","","formControlName","descripcion"],["formControlName","metodoPago"],[1,"dialog-actions"],["mat-stroked-button","","type","button",3,"click"],["mat-flat-button","","type","submit"],["formControlName","employeeId",3,"selectionChange"]],template:function(e,a){e&1&&(i(0,"div",0)(1,"div",1)(2,"div")(3,"p",2),o(4,"Caja manual"),n(),i(5,"h2"),o(6,"Registrar movimiento"),n(),i(7,"p",3),o(8,"Carga ingresos o egresos manuales de forma clara y ordenada."),n()(),i(9,"button",4),p("click",function(){return a.close()}),i(10,"mat-icon"),o(11,"close"),n()()(),i(12,"form",5),p("ngSubmit",function(){return a.submit()}),i(13,"div",6)(14,"mat-form-field",7)(15,"mat-label"),o(16,"Tipo"),n(),i(17,"mat-select",8),p("selectionChange",function(){return a.onTypeChange()}),i(18,"mat-option",9),o(19,"Ingreso"),n(),i(20,"mat-option",9),o(21,"Egreso"),n()()(),i(22,"mat-form-field",7)(23,"mat-label"),o(24,"Categoria"),n(),i(25,"mat-select",10),p("selectionChange",function(){return a.onCategoryChange()}),x(26,It,2,2,"mat-option",9,ke),n()(),C(28,wt,8,1,"mat-form-field",11),i(29,"mat-form-field",7)(30,"mat-label"),o(31,"Fecha"),n(),f(32,"input",12),n(),i(33,"mat-form-field",7)(34,"mat-label"),o(35),n(),f(36,"input",13),n(),i(37,"mat-form-field",11)(38,"mat-label"),o(39,"Descripcion"),n(),f(40,"input",14),n(),i(41,"mat-form-field",7)(42,"mat-label"),o(43,"Metodo de pago"),n(),i(44,"mat-select",15)(45,"mat-option",9),o(46,"Sin metodo"),n(),x(47,Nt,2,2,"mat-option",9,ke),n()()(),i(49,"div",16)(50,"button",17),p("click",function(){return a.close()}),o(51,"Cancelar"),n(),i(52,"button",18),o(53,"Registrar movimiento"),n()()()()),e&2&&(c(12),d("formGroup",a.form),c(6),d("value",1),c(2),d("value",2),c(6),k(a.filteredCategories()),c(2),M(a.shouldShowEmployeeField()?28:-1),c(7),l(a.amountLabel()),c(10),d("value",null),c(2),k(a.data.paymentMethods))},dependencies:[N,j,R,D,L,F,T,V,A,z,me,Y,q,oe,H,X,U,G,$,Z,Q,J,K,W],styles:[".dialog-shell[_ngcontent-%COMP%]{display:grid;gap:1rem;padding:1.5rem;background:#fff}.dialog-header[_ngcontent-%COMP%], .dialog-actions[_ngcontent-%COMP%], .form-grid[_ngcontent-%COMP%]{display:grid;gap:1rem}.dialog-header[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr) auto;align-items:start}.dialog-eyebrow[_ngcontent-%COMP%]{margin:0 0 .35rem;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#0f766e}.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .dialog-subtitle[_ngcontent-%COMP%]{margin:0}.dialog-subtitle[_ngcontent-%COMP%]{margin-top:.35rem;color:var(--app-text-muted)}.dialog-form[_ngcontent-%COMP%]{display:grid;gap:1rem}.form-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.span-2[_ngcontent-%COMP%]{grid-column:1/-1}.dialog-actions[_ngcontent-%COMP%]{grid-auto-flow:column;justify-content:end}[_nghost-%COMP%]     .mat-mdc-form-field{width:100%}[_nghost-%COMP%]     .mdc-text-field--outlined{border-radius:16px;background:#fff}@media(max-width:768px){.dialog-shell[_ngcontent-%COMP%]{padding:1rem}.form-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.span-2[_ngcontent-%COMP%]{grid-column:auto}.dialog-actions[_ngcontent-%COMP%]{grid-auto-flow:row}}"],changeDetection:0})};var Dt=["mat-internal-form-field",""],Ft=["*"],Mt=(()=>{class r{labelPosition="after";static \u0275fac=function(a){return new(a||r)};static \u0275cmp=P({type:r,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(a,m){a&2&&S("mdc-form-field--align-end",m.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:Dt,ngContentSelectors:Ft,decls:1,vars:0,template:function(a,m){a&1&&(ne(),ie(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2,changeDetection:0})}return r})();var Tt=["input"],Rt=["label"],Lt=["*"],Ce={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},zt=new we("mat-checkbox-default-options",{providedIn:"root",factory:()=>Ce}),y=(function(r){return r[r.Init=0]="Init",r[r.Checked=1]="Checked",r[r.Unchecked=2]="Unchecked",r[r.Indeterminate=3]="Indeterminate",r})(y||{}),Me=class{source;checked},Pe=(()=>{class r{_elementRef=g(Re);_changeDetectorRef=g(Ge);_ngZone=g(Fe);_animationsDisabled=Ke();_options=g(zt,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let a=new Me;return a.source=this,a.checked=e,a}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new he;indeterminateChange=new he;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=y.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){g(Qe).load(et);let e=g(new $e("tabindex"),{optional:!0});this._options=this._options||Ce,this.color=this._options.color||Ce.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=g(Ze).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let a=e!=this._indeterminate();this._indeterminate.set(e),a&&(e?this._transitionCheckState(y.Indeterminate):this._transitionCheckState(this.checked?y.Checked:y.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=s(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let a=this._currentCheckState,m=this._getAnimationTargetElement();if(!(a===e||!m)&&(this._currentAnimationClass&&m.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(a,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){m.classList.add(this._currentAnimationClass);let u=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{m.classList.remove(u)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?y.Checked:y.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,a){if(this._animationsDisabled)return"";switch(e){case y.Init:if(a===y.Checked)return this._animationClasses.uncheckedToChecked;if(a==y.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case y.Unchecked:return a===y.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case y.Checked:return a===y.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case y.Indeterminate:return a===y.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let a=this._inputElement;a&&(a.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(a){return new(a||r)};static \u0275cmp=P({type:r,selectors:[["mat-checkbox"]],viewQuery:function(a,m){if(a&1&&Ae(Tt,5)(Rt,5),a&2){let u;be(u=fe())&&(m._inputElement=u.first),be(u=fe())&&(m._labelElement=u.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(a,m){a&2&&(ze("id",m.id),ue("tabindex",null)("aria-label",null)("aria-labelledby",null),Be(m.color?"mat-"+m.color:"mat-accent"),S("_mat-animation-noopable",m._animationsDisabled)("mdc-checkbox--disabled",m.disabled)("mat-mdc-checkbox-disabled",m.disabled)("mat-mdc-checkbox-checked",m.checked)("mat-mdc-checkbox-disabled-interactive",m.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",O],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",O],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",O],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:qe(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",O],checked:[2,"checked","checked",O],disabled:[2,"disabled","disabled",O],indeterminate:[2,"indeterminate","indeterminate",O]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[je([{provide:tt,useExisting:Ee(()=>r),multi:!0},{provide:nt,useExisting:r,multi:!0}]),Te],ngContentSelectors:Lt,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(a,m){if(a&1&&(ne(),i(0,"div",3),p("click",function(pe){return m._preventBubblingFromLabel(pe)}),i(1,"div",4,0)(3,"div",5),p("click",function(){return m._onTouchTargetClick()}),n(),i(4,"input",6,1),p("blur",function(){return m._onBlur()})("click",function(){return m._onInputClick()})("change",function(pe){return m._onInteractionEvent(pe)}),n(),f(6,"div",7),i(7,"div",8),Ne(),i(8,"svg",9),f(9,"path",10),n(),De(),f(10,"div",11),n(),f(11,"div",12),n(),i(12,"label",13,2),ie(14),n()()),a&2){let u=Ve(2);d("labelPosition",m.labelPosition),c(4),S("mdc-checkbox--selected",m.checked),d("checked",m.checked)("indeterminate",m.indeterminate)("disabled",m.disabled&&!m.disabledInteractive)("id",m.inputId)("required",m.required)("tabIndex",m.disabled&&!m.disabledInteractive?-1:m.tabIndex),ue("aria-label",m.ariaLabel||null)("aria-labelledby",m.ariaLabelledby)("aria-describedby",m.ariaDescribedby)("aria-checked",m.indeterminate?"mixed":null)("aria-controls",m.ariaControls)("aria-disabled",m.disabled&&m.disabledInteractive?!0:null)("aria-expanded",m.ariaExpanded)("aria-owns",m.ariaOwns)("name",m.name)("value",m.value),c(7),d("matRippleTrigger",u)("matRippleDisabled",m.disableRipple||m.disabled)("matRippleCentered",!0),c(),d("for",m.inputId)}},dependencies:[Je,Mt],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return r})(),Pt=(()=>{class r{static \u0275fac=function(a){return new(a||r)};static \u0275mod=Le({type:r});static \u0275inj=Oe({imports:[Pe,We]})}return r})();var Se=(r,t)=>t.id;function Vt(r,t){if(r&1&&(i(0,"mat-option",9),o(1),n()),r&2){let e=t.$implicit,a=h();d("value",e.id),c(),l(a.getClientLabel(e))}}function Bt(r,t){r&1&&(i(0,"small"),o(1,"El cliente seleccionado no tiene una membresia activa para asociar el pago."),n())}function jt(r,t){if(r&1&&(i(0,"mat-option",9),o(1),n()),r&2){let e=t.$implicit,a=h();d("value",e.id),c(),l(a.getPaymentMethodLabel(e))}}function $t(r,t){if(r&1&&(i(0,"mat-option",9),o(1),n()),r&2){let e=t.$implicit;d("value",e.id),c(),l(e.nombre)}}var de=class r{formBuilder=g(B);dialogRef=g(re);data=g(ce);selectedClient=s(null);form=this.formBuilder.group({clientId:[null,[b.required]],clientMembershipId:[0,[b.required,b.min(1)]],fechaPago:[this.data.defaultDate,[b.required]],monto:[0,[b.required,b.min(0)]],confirmado:[!0],paymentMethodId:[null,[b.required]],cashMovementCategoryId:[this.data.incomeCategories[0]?.id??null,[b.required]],periodYear:[this.data.defaultYear,[b.required,b.min(2e3)]],periodMonth:[this.data.defaultMonth,[b.required,b.min(1),b.max(12)]]});membershipLabel=v(()=>{let t=this.selectedClient();return t?.membership?.plan?.nombre??(t?.membership?`Plan #${t.membership.membershipPlanId}`:"Sin membresia activa")});close(){this.dialogRef.close()}onClientChange(){let t=Number(this.form.controls.clientId.value),e=this.data.clients.find(a=>a.id===t)??null;if(this.selectedClient.set(e),!e?.membership?.id){this.form.patchValue({clientMembershipId:0,monto:0});return}this.form.patchValue({clientMembershipId:e.membership.id,monto:e.membership.precioFinal})}submit(){if(this.form.invalid){this.form.markAllAsTouched();return}let t=this.form.getRawValue();this.dialogRef.close({clientId:Number(t.clientId),clientMembershipId:Number(t.clientMembershipId),fechaPago:new Date(`${t.fechaPago}T00:00:00`).toISOString(),monto:Number(t.monto),confirmado:!!t.confirmado,paymentMethodId:Number(t.paymentMethodId),cashMovementCategoryId:Number(t.cashMovementCategoryId),periodYear:Number(t.periodYear),periodMonth:Number(t.periodMonth)})}getClientLabel(t){return`${t.nombre} ${t.apellido}`}getPaymentMethodLabel(t){return t.nombre??t.descripcion??`Metodo #${t.id}`}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=P({type:r,selectors:[["app-register-payment-dialog"]],decls:61,vars:3,consts:[[1,"dialog-shell"],[1,"dialog-header"],[1,"dialog-eyebrow"],[1,"dialog-subtitle"],["mat-icon-button","","type","button","aria-label","Cerrar modal",3,"click"],[1,"dialog-form",3,"ngSubmit","formGroup"],[1,"form-grid"],["appearance","outline",1,"span-2"],["formControlName","clientId",3,"selectionChange"],[3,"value"],[1,"context-box","span-2"],[1,"context-label"],["appearance","outline"],["formControlName","paymentMethodId"],["formControlName","cashMovementCategoryId"],["matInput","","type","date","formControlName","fechaPago"],["matInput","","type","number","min","0","step","0.01","formControlName","monto"],["matInput","","type","number","min","1","max","12","formControlName","periodMonth"],["matInput","","type","number","min","2000","formControlName","periodYear"],["formControlName","confirmado"],[1,"dialog-actions"],["mat-stroked-button","","type","button",3,"click"],["mat-flat-button","","type","submit"]],template:function(e,a){if(e&1&&(i(0,"div",0)(1,"div",1)(2,"div")(3,"p",2),o(4,"Cobro"),n(),i(5,"h2"),o(6,"Registrar pago"),n(),i(7,"p",3),o(8,"Carga un pago de cliente con todos los datos necesarios sin salir de movimientos."),n()(),i(9,"button",4),p("click",function(){return a.close()}),i(10,"mat-icon"),o(11,"close"),n()()(),i(12,"form",5),p("ngSubmit",function(){return a.submit()}),i(13,"div",6)(14,"mat-form-field",7)(15,"mat-label"),o(16,"Cliente"),n(),i(17,"mat-select",8),p("selectionChange",function(){return a.onClientChange()}),x(18,Vt,2,2,"mat-option",9,Se),n()(),i(20,"div",10)(21,"span",11),o(22,"Membresia activa"),n(),i(23,"strong"),o(24),n(),C(25,Bt,2,0,"small"),n(),i(26,"mat-form-field",12)(27,"mat-label"),o(28,"Metodo de pago"),n(),i(29,"mat-select",13),x(30,jt,2,2,"mat-option",9,Se),n()(),i(32,"mat-form-field",12)(33,"mat-label"),o(34,"Categoria movimiento"),n(),i(35,"mat-select",14),x(36,$t,2,2,"mat-option",9,Se),n()(),i(38,"mat-form-field",12)(39,"mat-label"),o(40,"Fecha"),n(),f(41,"input",15),n(),i(42,"mat-form-field",12)(43,"mat-label"),o(44,"Monto"),n(),f(45,"input",16),n(),i(46,"mat-form-field",12)(47,"mat-label"),o(48,"Mes"),n(),f(49,"input",17),n(),i(50,"mat-form-field",12)(51,"mat-label"),o(52,"Ano"),n(),f(53,"input",18),n()(),i(54,"mat-checkbox",19),o(55,"Registrar ya confirmado"),n(),i(56,"div",20)(57,"button",21),p("click",function(){return a.close()}),o(58,"Cancelar"),n(),i(59,"button",22),o(60,"Registrar pago"),n()()()()),e&2){let m;c(12),d("formGroup",a.form),c(6),k(a.data.clients),c(6),l(a.membershipLabel()),c(),M(!(!((m=a.selectedClient())==null||m.membership==null)&&m.membership.id)&&a.form.controls.clientId.value?25:-1),c(5),k(a.data.paymentMethods),c(6),k(a.data.incomeCategories)}},dependencies:[N,j,R,D,L,F,T,V,ae,A,z,me,Y,q,oe,Pt,Pe,H,X,U,G,$,Z,Q,J,K,W],styles:[".dialog-shell[_ngcontent-%COMP%]{display:grid;gap:1rem;padding:1.5rem;background:#fff}.dialog-header[_ngcontent-%COMP%], .dialog-actions[_ngcontent-%COMP%], .form-grid[_ngcontent-%COMP%]{display:grid;gap:1rem}.dialog-header[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr) auto;align-items:start}.dialog-eyebrow[_ngcontent-%COMP%]{margin:0 0 .35rem;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb}.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .dialog-subtitle[_ngcontent-%COMP%]{margin:0}.dialog-subtitle[_ngcontent-%COMP%]{margin-top:.35rem;color:var(--app-text-muted)}.dialog-form[_ngcontent-%COMP%]{display:grid;gap:1rem}.form-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.span-2[_ngcontent-%COMP%]{grid-column:1/-1}.context-box[_ngcontent-%COMP%]{padding:.95rem 1rem;border-radius:18px;background:#f8fafc;border:1px solid rgba(15,23,42,.08)}.context-label[_ngcontent-%COMP%]{display:block;margin-bottom:.25rem;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--app-text-soft)}.context-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#0f172a}.context-box[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{display:block;margin-top:.35rem;color:#a16207}.dialog-actions[_ngcontent-%COMP%]{grid-auto-flow:column;justify-content:end}[_nghost-%COMP%]     .mat-mdc-form-field{width:100%}[_nghost-%COMP%]     .mdc-text-field--outlined{border-radius:16px;background:#fff}@media(max-width:768px){.dialog-shell[_ngcontent-%COMP%]{padding:1rem}.form-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.span-2[_ngcontent-%COMP%]{grid-column:auto}.dialog-actions[_ngcontent-%COMP%]{grid-auto-flow:row}}"],changeDetection:0})};var se=class r{http=g(Ue);apiUrl=`${ot.apiUrl}/api/CashMovements`;getPaged(t,e,a={}){let m=new xe().set("PageNumber",t).set("PageSize",e);return a.tipo&&(m=m.set("Tipo",a.tipo)),a.categoryId&&(m=m.set("CategoryId",a.categoryId)),this.http.get(this.apiUrl,{params:m}).pipe(ge(u=>this.normalizePagedResponse(u,t,e)))}create(t){return this.http.post(this.apiUrl,t)}getMonthlyByCategories(t,e,a=[]){let m=new xe().set("year",t).set("month",e);for(let u of a)m=m.append("categoryIds",u);return this.http.get(`${this.apiUrl}/monthly-by-categories`,{params:m})}getBalance(){return this.http.get(`${this.apiUrl}/balance`).pipe(ge(t=>t.balance))}normalizePagedResponse(t,e,a){if(Array.isArray(t))return{items:t,pageNumber:e,pageSize:a,totalCount:t.length,totalPages:Math.max(1,Math.ceil(t.length/a))};let m=t.items??t.data??t.results??[],u=t.totalCount??t.totalItems??m.length;return{items:m,pageNumber:t.pageNumber??t.currentPage??e,pageSize:t.pageSize??a,totalCount:u,totalPages:t.totalPages??Math.max(1,Math.ceil(u/a))}}static \u0275fac=function(e){return new(e||r)};static \u0275prov=Ie({token:r,factory:r.\u0275fac,providedIn:"root"})};var St=()=>[5,10,20,50],te=(r,t)=>t.id,Gt=(r,t)=>t.cashMovementCategoryId;function qt(r,t){if(r&1&&(i(0,"div",16)(1,"mat-icon"),o(2,"error"),n(),i(3,"span"),o(4),n()()),r&2){let e=h();c(4),l(e.errorMessage())}}function Yt(r,t){if(r&1&&(i(0,"mat-option",56),o(1),n()),r&2){let e=t.$implicit,a=h(2);d("value",e.id),c(),l(a.getClientLabel(e))}}function Ut(r,t){if(r&1){let e=w();i(0,"form",52),p("ngSubmit",function(){E(e);let m=h();return I(m.applyPaymentFilters())}),i(1,"mat-form-field",53)(2,"mat-label"),o(3,"Cliente"),n(),i(4,"mat-select",54)(5,"mat-option",55),o(6,"Todos"),n(),x(7,Yt,2,2,"mat-option",56,te),n()(),i(9,"mat-form-field",53)(10,"mat-label"),o(11,"Ano"),n(),f(12,"input",57),n(),i(13,"mat-form-field",53)(14,"mat-label"),o(15,"Mes"),n(),f(16,"input",58),n(),i(17,"div",59)(18,"button",60)(19,"mat-icon"),o(20,"search"),n(),o(21," Filtrar "),n(),i(22,"button",61),p("click",function(){E(e);let m=h();return I(m.resetPaymentFilters())}),i(23,"mat-icon"),o(24,"restart_alt"),n(),o(25," Limpiar "),n()()()}if(r&2){let e=h();d("formGroup",e.paymentFiltersForm),c(7),k(e.clients()),c(11),d("disabled",e.isLoadingPayments()),c(4),d("disabled",e.isLoadingPayments())}}function Xt(r,t){r&1&&(i(0,"div",39),f(1,"mat-spinner",62),i(2,"span"),o(3,"Cargando pagos..."),n()())}function Ht(r,t){r&1&&(i(0,"div",40)(1,"mat-icon"),o(2,"receipt_long"),n(),i(3,"p"),o(4,"No hay pagos para mostrar con los filtros actuales."),n()())}function Qt(r,t){if(r&1&&(i(0,"article",63)(1,"div",64)(2,"div")(3,"strong",65),o(4),n(),i(5,"p",66),o(6),n(),i(7,"span",67),o(8),n()(),i(9,"div",68)(10,"span",69),o(11),n(),i(12,"span",70),o(13),_e(14,"date"),n()()(),i(15,"div",71)(16,"div")(17,"span"),o(18,"Metodo"),n(),i(19,"strong"),o(20),n()(),i(21,"div")(22,"span"),o(23,"Categoria movimiento"),n(),i(24,"strong"),o(25),n()(),i(26,"div")(27,"span"),o(28,"Periodo"),n(),i(29,"strong"),o(30),n()(),i(31,"div")(32,"span"),o(33,"Membresia"),n(),i(34,"strong"),o(35),n()()()()),r&2){let e=t.$implicit,a=h(2);c(4),l(a.formatCurrency(e.monto)),c(2),l(a.getClientName(e.clientId)),c(2),l(e.membershipPlanNombre||"Membresia sin nombre"),c(2),S("confirmed",a.isConfirmedPayment(e.estado))("pending",!a.isConfirmedPayment(e.estado)),c(),_(" ",a.isConfirmedPayment(e.estado)?"Confirmado":e.estado," "),c(2),l(ye(14,13,e.fechaPago,"dd/MM/yyyy")),c(7),l(e.paymentMethodNombre||"Sin dato"),c(5),l(e.cashMovementCategoryNombre||"Sin dato"),c(5),l(a.formatMonthYear(a.paymentFiltersForm.controls.periodMonth.value,a.paymentFiltersForm.controls.periodYear.value)),c(5),l(e.membershipPlanNombre||"Sin dato")}}function Zt(r,t){if(r&1&&(i(0,"div",41),x(1,Qt,36,16,"article",63,te),n()),r&2){let e=h();c(),k(e.payments())}}function Wt(r,t){if(r&1&&(i(0,"mat-option",56),o(1),n()),r&2){let e=t.$implicit;d("value",e.id),c(),l(e.nombre)}}function Kt(r,t){if(r&1){let e=w();i(0,"form",72),p("ngSubmit",function(){E(e);let m=h();return I(m.applyMovementFilters())}),i(1,"mat-form-field",53)(2,"mat-label"),o(3,"Tipo"),n(),i(4,"mat-select",73)(5,"mat-option",55),o(6,"Todos"),n(),i(7,"mat-option",56),o(8,"Ingreso"),n(),i(9,"mat-option",56),o(10,"Egreso"),n()()(),i(11,"mat-form-field",53)(12,"mat-label"),o(13,"Categoria"),n(),i(14,"mat-select",74)(15,"mat-option",55),o(16,"Todas"),n(),x(17,Wt,2,2,"mat-option",56,te),n()(),i(19,"div",59)(20,"button",60)(21,"mat-icon"),o(22,"search"),n(),o(23," Filtrar "),n(),i(24,"button",61),p("click",function(){E(e);let m=h();return I(m.resetMovementFilters())}),i(25,"mat-icon"),o(26,"restart_alt"),n(),o(27," Limpiar "),n()()()}if(r&2){let e=h();d("formGroup",e.movementFiltersForm),c(7),d("value",1),c(2),d("value",2),c(8),k(e.categories()),c(3),d("disabled",e.isLoadingMovements()),c(4),d("disabled",e.isLoadingMovements())}}function Jt(r,t){r&1&&(i(0,"div",39),f(1,"mat-spinner",62),i(2,"span"),o(3,"Cargando movimientos..."),n()())}function en(r,t){r&1&&(i(0,"div",40)(1,"mat-icon"),o(2,"swap_horiz"),n(),i(3,"p"),o(4,"No hay movimientos para mostrar con los filtros actuales."),n()())}function tn(r,t){if(r&1&&(i(0,"article",63)(1,"div",64)(2,"div")(3,"strong",65),o(4),n(),i(5,"p",66),o(6),n(),i(7,"span",67),o(8),n()(),i(9,"div",68)(10,"span",69)(11,"mat-icon"),o(12),n(),o(13),n(),i(14,"span",70),o(15),_e(16,"date"),n()()(),i(17,"div",71)(18,"div")(19,"span"),o(20,"Metodo"),n(),i(21,"strong"),o(22),n()(),i(23,"div")(24,"span"),o(25,"Categoria"),n(),i(26,"strong"),o(27),n()(),i(28,"div")(29,"span"),o(30,"Origen"),n(),i(31,"strong"),o(32),n()(),i(33,"div")(34,"span"),o(35,"Descripcion"),n(),i(36,"strong"),o(37),n()()()()),r&2){let e=t.$implicit,a=h(2);S("record-card-expense",e.tipoMovimiento===2),c(4),l(a.formatCurrency(e.monto)),c(2),l(a.getCategoryName(e.cashMovementCategoryId)),c(2),l(e.descripcion),c(2),S("confirmed",e.tipoMovimiento===1)("expense",e.tipoMovimiento===2),c(2),l(a.getMovementTypeIcon(e.tipoMovimiento)),c(),_(" ",a.getMovementTypeLabel(e.tipoMovimiento)," "),c(2),l(ye(16,16,e.fechaMovimiento,"dd/MM/yyyy")),c(7),l(e.metodoPago||"No informado"),c(5),l(a.getCategoryName(e.cashMovementCategoryId)),c(5),l(e.paymentId?"Vinculado a pago":e.employeeId?"Vinculado a empleado":"Manual"),c(5),l(e.descripcion)}}function nn(r,t){if(r&1&&(i(0,"div",41),x(1,tn,38,19,"article",75,te),n()),r&2){let e=h();c(),k(e.cashMovements())}}function an(r,t){if(r&1&&(i(0,"mat-option",56),o(1),n()),r&2){let e=t.$implicit;d("value",e.id),c(),l(e.nombre)}}function on(r,t){if(r&1){let e=w();i(0,"form",76),p("ngSubmit",function(){E(e);let m=h();return I(m.applyInsights())}),i(1,"div",77)(2,"mat-form-field",53)(3,"mat-label"),o(4,"Mes"),n(),f(5,"input",78),n(),i(6,"mat-form-field",53)(7,"mat-label"),o(8,"Ano"),n(),f(9,"input",79),n()(),i(10,"mat-form-field",53)(11,"mat-label"),o(12,"Categorias"),n(),i(13,"mat-select",80),x(14,an,2,2,"mat-option",56,te),n()(),i(16,"button",81)(17,"mat-icon"),o(18,"query_stats"),n(),o(19," Actualizar analisis "),n()()}if(r&2){let e=h();d("formGroup",e.insightsForm),c(14),k(e.categories()),c(2),d("disabled",e.isLoadingInsights())}}function rn(r,t){r&1&&(i(0,"div",39),f(1,"mat-spinner",82),i(2,"span"),o(3,"Calculando resumen..."),n()())}function cn(r,t){r&1&&(i(0,"div",40)(1,"mat-icon"),o(2,"bar_chart"),n(),i(3,"p"),o(4,"No hay resumen disponible para ese periodo."),n()())}function mn(r,t){if(r&1&&(i(0,"article",83)(1,"div")(2,"strong"),o(3),n(),i(4,"span"),o(5),n()(),i(6,"div",84)(7,"span",85),o(8),n(),i(9,"span",86),o(10),n()()()),r&2){let e=t.$implicit,a=h(2);c(3),l(e.categoryName),c(2),_("",a.formatCurrency(e.net)," netos"),c(3),_("Ingresos ",a.formatCurrency(e.totalIngresos)),c(2),_("Egresos ",a.formatCurrency(e.totalEgresos))}}function ln(r,t){if(r&1&&(i(0,"div",51),x(1,mn,11,4,"article",83,Gt),n()),r&2){let e=h();c(),k(e.monthlySummary())}}var Et=class r{formBuilder=g(B);dialog=g(mt);router=g(Xe);clientsService=g(gt);employeesService=g(pt);paymentsService=g(ht);paymentMethodsService=g(bt);cashMovementCategoriesService=g(ut);cashMovementsService=g(se);today=new Date;currentYear=this.today.getFullYear();currentMonth=this.today.getMonth()+1;clients=s([]);employees=s([]);paymentMethods=s([]);categories=s([]);payments=s([]);cashMovements=s([]);monthlySummary=s([]);balance=s(0);isLoadingLookups=s(!0);isLoadingPayments=s(!1);isLoadingMovements=s(!1);isLoadingInsights=s(!1);isSavingPayment=s(!1);isSavingMovement=s(!1);errorMessage=s("");paymentPageNumber=s(1);paymentPageSize=s(10);paymentTotalCount=s(0);paymentFiltersExpanded=s(this.getInitialFiltersExpanded());movementPageNumber=s(1);movementPageSize=s(10);movementTotalCount=s(0);movementFiltersExpanded=s(this.getInitialFiltersExpanded());insightsExpanded=s(this.getInitialFiltersExpanded());paymentFiltersForm=this.formBuilder.nonNullable.group({clientId:[""],periodYear:[this.currentYear],periodMonth:[this.currentMonth]});movementFiltersForm=this.formBuilder.nonNullable.group({tipo:[""],categoryId:[""]});insightsForm=this.formBuilder.nonNullable.group({year:[this.currentYear],month:[this.currentMonth],categoryIds:[[]]});incomeCategories=v(()=>this.categories().filter(t=>t.tipoMovimiento===1));expenseCategories=v(()=>this.categories().filter(t=>t.tipoMovimiento===2));paymentTotalAmount=v(()=>this.payments().reduce((t,e)=>t+e.monto,0));confirmedPaymentsCount=v(()=>this.payments().filter(t=>this.isConfirmedPayment(t.estado)).length);pendingPaymentsCount=v(()=>this.payments().filter(t=>!this.isConfirmedPayment(t.estado)).length);visibleIncomeAmount=v(()=>this.cashMovements().filter(t=>t.tipoMovimiento===1).reduce((t,e)=>t+e.monto,0));visibleExpenseAmount=v(()=>this.cashMovements().filter(t=>t.tipoMovimiento===2).reduce((t,e)=>t+e.monto,0));visibleNetAmount=v(()=>this.visibleIncomeAmount()-this.visibleExpenseAmount());monthlyNetAmount=v(()=>this.monthlySummary().reduce((t,e)=>t+e.net,0));activePaymentFiltersCount=v(()=>{let t=this.paymentFiltersForm.getRawValue(),e=0;return t.clientId&&(e+=1),Number(t.periodYear)!==this.currentYear&&(e+=1),Number(t.periodMonth)!==this.currentMonth&&(e+=1),e});activeMovementFiltersCount=v(()=>{let t=this.movementFiltersForm.getRawValue();return[t.tipo,t.categoryId].filter(e=>String(e).trim().length>0).length});activeInsightsFiltersCount=v(()=>{let t=this.insightsForm.getRawValue(),e=0;return Number(t.year)!==this.currentYear&&(e+=1),Number(t.month)!==this.currentMonth&&(e+=1),t.categoryIds.length>0&&(e+=1),e});constructor(){this.loadLookups(),this.loadPayments(),this.loadCashMovements(),this.loadInsights(),this.loadBalance()}applyPaymentFilters(){this.paymentPageNumber.set(1),this.loadPayments(),this.collapseSectionOnMobile(this.paymentFiltersExpanded)}resetPaymentFilters(){this.paymentFiltersForm.reset({clientId:"",periodYear:this.currentYear,periodMonth:this.currentMonth}),this.paymentPageNumber.set(1),this.loadPayments(),this.collapseSectionOnMobile(this.paymentFiltersExpanded)}handlePaymentPageChange(t){this.paymentPageNumber.set(t.pageIndex+1),this.paymentPageSize.set(t.pageSize),this.loadPayments()}openPaymentDialog(){if(this.categories().length===0){this.openMissingCategoriesDialog();return}this.dialog.open(de,{width:"760px",maxWidth:"calc(100vw - 1rem)",autoFocus:!1,panelClass:"employee-dialog-panel",backdropClass:"employee-dialog-backdrop",data:{clients:this.clients(),paymentMethods:this.paymentMethods(),incomeCategories:this.incomeCategories(),defaultDate:this.toDateInputValue(this.today.toISOString()),defaultMonth:this.currentMonth,defaultYear:this.currentYear}}).afterClosed().subscribe(e=>{e&&(this.isSavingPayment.set(!0),this.errorMessage.set(""),this.paymentsService.create(e).subscribe({next:()=>{this.isSavingPayment.set(!1),this.loadPayments(),this.loadCashMovements(),this.loadInsights(),this.loadBalance()},error:()=>{this.isSavingPayment.set(!1),this.errorMessage.set("No se pudo registrar el pago.")}}))})}openMovementDialog(){if(this.categories().length===0){this.openMissingCategoriesDialog();return}this.dialog.open(le,{width:"760px",maxWidth:"calc(100vw - 1rem)",autoFocus:!1,panelClass:"employee-dialog-panel",backdropClass:"employee-dialog-backdrop",data:{categories:this.categories(),employees:this.employees(),paymentMethods:this.paymentMethods(),defaultDate:this.toDateInputValue(this.today.toISOString())}}).afterClosed().subscribe(e=>{e&&(this.isSavingMovement.set(!0),this.errorMessage.set(""),this.cashMovementsService.create(e).subscribe({next:()=>{this.isSavingMovement.set(!1),this.loadCashMovements(),this.loadInsights(),this.loadBalance()},error:()=>{this.isSavingMovement.set(!1),this.errorMessage.set("No se pudo registrar el movimiento.")}}))})}applyMovementFilters(){this.movementPageNumber.set(1),this.loadCashMovements(),this.collapseSectionOnMobile(this.movementFiltersExpanded)}resetMovementFilters(){this.movementFiltersForm.reset({tipo:"",categoryId:""}),this.movementPageNumber.set(1),this.loadCashMovements(),this.collapseSectionOnMobile(this.movementFiltersExpanded)}handleMovementPageChange(t){this.movementPageNumber.set(t.pageIndex+1),this.movementPageSize.set(t.pageSize),this.loadCashMovements()}applyInsights(){this.loadInsights(),this.collapseSectionOnMobile(this.insightsExpanded)}togglePaymentFilters(){this.paymentFiltersExpanded.update(t=>!t)}toggleMovementFilters(){this.movementFiltersExpanded.update(t=>!t)}toggleInsights(){this.insightsExpanded.update(t=>!t)}getClientLabel(t){return`${t.nombre} ${t.apellido}`}getPaymentMethodLabel(t){return t.nombre??t.descripcion??`Metodo #${t.id}`}getClientName(t){let e=this.clients().find(a=>a.id===t);return e?`${e.nombre} ${e.apellido}`:`Cliente #${t}`}getCategoryName(t){return this.categories().find(e=>e.id===t)?.nombre??`Categoria #${t}`}getMovementTypeLabel(t){return t===1?"Ingreso":"Egreso"}getMovementTypeIcon(t){return t===1?"south_west":"north_east"}isConfirmedPayment(t){let e=t.trim().toLowerCase();return e==="confirmado"||e==="confirmed"||e==="paid"||e==="pagado"}formatCurrency(t){return new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(t)}formatMonthYear(t,e){return`${String(t).padStart(2,"0")}/${e}`}getCategoriesByType(t){return this.categories().filter(e=>e.tipoMovimiento===t)}openMissingCategoriesDialog(){this.dialog.open(st,{width:"460px",maxWidth:"calc(100vw - 1rem)",autoFocus:!1,data:{title:"Primero crea una categoria",message:"Para registrar un pago o un movimiento necesitas al menos una categoria disponible. Crea una categoria y luego vuelve para continuar.",confirmLabel:"Ir a categorias",cancelLabel:"Ahora no",tone:"primary"}}).afterClosed().subscribe(e=>{e&&this.router.navigate(["/movements/categories"])})}loadLookups(){this.isLoadingLookups.set(!0),this.errorMessage.set(""),this.clientsService.getPaged(1,1e3).subscribe({next:t=>{this.clients.set(t.items),this.employeesService.getPaged(1,1e3).subscribe({next:e=>{this.employees.set(e.items),this.paymentMethodsService.getPaged(1,1e3).subscribe({next:a=>{this.paymentMethods.set(a.items),this.cashMovementCategoriesService.getPaged(1,1e3).subscribe({next:m=>{this.categories.set(m.items),this.isLoadingLookups.set(!1)},error:()=>{this.categories.set([]),this.isLoadingLookups.set(!1),this.errorMessage.set("No se pudieron cargar las categorias de movimientos.")}})},error:()=>{this.paymentMethods.set([]),this.isLoadingLookups.set(!1),this.errorMessage.set("No se pudieron cargar los metodos de pago.")}})},error:()=>{this.employees.set([]),this.isLoadingLookups.set(!1),this.errorMessage.set("No se pudieron cargar los empleados.")}})},error:()=>{this.clients.set([]),this.isLoadingLookups.set(!1),this.errorMessage.set("No se pudieron cargar los clientes.")}})}loadPayments(){this.isLoadingPayments.set(!0),this.errorMessage.set("");let t=this.paymentFiltersForm.getRawValue();this.paymentsService.getPaged(this.paymentPageNumber(),this.paymentPageSize(),{clientId:t.clientId?Number(t.clientId):void 0,periodYear:Number(t.periodYear),periodMonth:Number(t.periodMonth)}).subscribe({next:e=>{this.payments.set(e.items),this.paymentTotalCount.set(e.totalCount),this.paymentPageNumber.set(e.pageNumber),this.paymentPageSize.set(e.pageSize),this.isLoadingPayments.set(!1)},error:()=>{this.payments.set([]),this.paymentTotalCount.set(0),this.isLoadingPayments.set(!1),this.errorMessage.set("No se pudieron cargar los pagos.")}})}loadCashMovements(){this.isLoadingMovements.set(!0),this.errorMessage.set("");let t=this.movementFiltersForm.getRawValue();this.cashMovementsService.getPaged(this.movementPageNumber(),this.movementPageSize(),{tipo:t.tipo?Number(t.tipo):void 0,categoryId:t.categoryId?Number(t.categoryId):void 0}).subscribe({next:e=>{this.cashMovements.set(e.items),this.movementTotalCount.set(e.totalCount),this.movementPageNumber.set(e.pageNumber),this.movementPageSize.set(e.pageSize),this.isLoadingMovements.set(!1)},error:()=>{this.cashMovements.set([]),this.movementTotalCount.set(0),this.isLoadingMovements.set(!1),this.errorMessage.set("No se pudieron cargar los movimientos de caja.")}})}loadInsights(){this.isLoadingInsights.set(!0);let t=this.insightsForm.getRawValue();this.cashMovementsService.getMonthlyByCategories(Number(t.year),Number(t.month),t.categoryIds.map(Number)).subscribe({next:e=>{this.monthlySummary.set(e),this.isLoadingInsights.set(!1)},error:()=>{this.monthlySummary.set([]),this.isLoadingInsights.set(!1),this.errorMessage.set("No se pudo cargar el resumen mensual por categorias.")}})}loadBalance(){this.cashMovementsService.getBalance().subscribe({next:t=>{this.balance.set(t)},error:()=>{this.balance.set(0)}})}toDateInputValue(t){return t.slice(0,10)}getInitialFiltersExpanded(){return typeof window>"u"?!0:!window.matchMedia("(max-width: 768px)").matches}collapseSectionOnMobile(t){typeof window<"u"&&window.matchMedia("(max-width: 768px)").matches&&t.set(!1)}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=P({type:r,selectors:[["app-movements-page"]],decls:177,vars:40,consts:[[1,"movements-page"],[1,"page-header"],[1,"page-header-copy"],[1,"eyebrow-pill"],[1,"eyebrow"],[1,"subtitle"],[1,"section-shortcuts"],["href","#pagos",1,"shortcut-chip"],["href","#caja",1,"shortcut-chip"],["href","#analisis",1,"shortcut-chip"],[1,"page-header-side"],[1,"header-actions"],["mat-flat-button","","type","button",1,"header-action-primary",3,"click","disabled"],["mat-stroked-button","","type","button",1,"header-action-secondary",3,"click","disabled"],["mat-stroked-button","","type","button","routerLink","/movements/categories",1,"header-action-secondary"],[1,"header-note"],[1,"feedback-banner","error"],[1,"stats-grid"],[1,"stat-card"],[1,"stat-icon-shell","accent"],[1,"stat-copy"],[1,"stat-label"],[1,"stat-icon-shell","success"],[1,"stat-icon-shell","info"],[1,"stat-icon-shell","warn"],[1,"content-grid"],[1,"main-column"],["id","pagos",1,"panel-card"],[1,"panel-heading"],[1,"panel-kicker"],[1,"heading-side"],[1,"heading-metrics"],[1,"metric-pill","positive"],[1,"metric-pill","warning"],["mat-flat-button","","type","button",1,"section-action-button",3,"click","disabled"],[1,"filters-toolbar"],["mat-stroked-button","","type","button",1,"filters-toggle",3,"click"],[1,"filters-summary"],[1,"filters-grid",3,"formGroup"],[1,"loading-state","compact"],[1,"empty-state","compact"],[1,"cards-list"],[3,"page","length","pageIndex","pageSize","pageSizeOptions"],["id","caja",1,"panel-card"],[1,"metric-pill","negative"],["mat-stroked-button","","type","button",1,"section-action-button","section-action-secondary",3,"click","disabled"],[1,"filters-grid","movement-filters",3,"formGroup"],[1,"side-column"],["id","analisis",1,"panel-card","analysis-card"],[1,"panel-heading","compact-heading"],[1,"stack-form",3,"formGroup"],[1,"summary-stack"],[1,"filters-grid",3,"ngSubmit","formGroup"],["appearance","outline"],["formControlName","clientId"],["value",""],[3,"value"],["matInput","","type","number","min","2000","formControlName","periodYear"],["matInput","","type","number","min","1","max","12","formControlName","periodMonth"],[1,"inline-actions"],["mat-flat-button","","type","submit",3,"disabled"],["mat-stroked-button","","type","button",3,"click","disabled"],["diameter","32"],[1,"record-card"],[1,"record-head"],[1,"record-amount"],[1,"record-title"],[1,"record-subtitle"],[1,"record-badges"],[1,"status-chip"],[1,"soft-chip"],[1,"record-grid"],[1,"filters-grid","movement-filters",3,"ngSubmit","formGroup"],["formControlName","tipo"],["formControlName","categoryId"],[1,"record-card",3,"record-card-expense"],[1,"stack-form",3,"ngSubmit","formGroup"],[1,"double-grid"],["matInput","","type","number","min","1","max","12","formControlName","month"],["matInput","","type","number","min","2000","formControlName","year"],["formControlName","categoryIds","multiple",""],["mat-stroked-button","","type","submit",1,"full-button",3,"disabled"],["diameter","28"],[1,"summary-row"],[1,"summary-values"],[1,"mini-pill","positive"],[1,"mini-pill","negative"]],template:function(e,a){e&1&&(i(0,"section",0)(1,"header",1)(2,"div",2)(3,"span",3)(4,"mat-icon"),o(5,"payments"),n(),o(6," Centro financiero "),n(),i(7,"div")(8,"p",4),o(9,"Pagos y caja"),n(),i(10,"h1"),o(11,"Movimientos"),n(),i(12,"p",5),o(13," Registra cobros, carga ingresos o egresos manuales y sigue el estado de la caja desde una sola pantalla. "),n()(),i(14,"div",6)(15,"a",7)(16,"mat-icon"),o(17,"receipt_long"),n(),o(18," Pagos "),n(),i(19,"a",8)(20,"mat-icon"),o(21,"swap_horiz"),n(),o(22," Caja "),n(),i(23,"a",9)(24,"mat-icon"),o(25,"insights"),n(),o(26," Analisis "),n()()(),i(27,"div",10)(28,"div",11)(29,"button",12),p("click",function(){return a.openPaymentDialog()}),i(30,"mat-icon"),o(31,"add_card"),n(),o(32," Registrar pago "),n(),i(33,"button",13),p("click",function(){return a.openMovementDialog()}),i(34,"mat-icon"),o(35,"playlist_add"),n(),o(36," Registrar movimiento "),n(),i(37,"button",14)(38,"mat-icon"),o(39,"category"),n(),o(40," Categorias "),n()(),i(41,"div",15)(42,"mat-icon"),o(43,"account_balance_wallet"),n(),i(44,"span"),o(45,"Unifica cobros, movimientos manuales y lectura financiera mensual sin cambiar de modulo."),n()()()(),C(46,qt,5,1,"div",16),i(47,"section",17)(48,"mat-card",18)(49,"div",19)(50,"mat-icon"),o(51,"account_balance_wallet"),n()(),i(52,"div",20)(53,"span",21),o(54,"Balance actual"),n(),i(55,"strong"),o(56),n(),i(57,"small"),o(58,"Saldo informado por la API"),n()()(),i(59,"mat-card",18)(60,"div",22)(61,"mat-icon"),o(62,"trending_up"),n()(),i(63,"div",20)(64,"span",21),o(65,"Neto del mes"),n(),i(66,"strong"),o(67),n(),i(68,"small"),o(69,"Resumen por categorias del periodo analizado"),n()()(),i(70,"mat-card",18)(71,"div",23)(72,"mat-icon"),o(73,"receipt_long"),n()(),i(74,"div",20)(75,"span",21),o(76,"Pagos visibles"),n(),i(77,"strong"),o(78),n(),i(79,"small"),o(80),n()()(),i(81,"mat-card",18)(82,"div",24)(83,"mat-icon"),o(84,"swap_horiz"),n()(),i(85,"div",20)(86,"span",21),o(87,"Movimientos visibles"),n(),i(88,"strong"),o(89),n(),i(90,"small"),o(91),n()()()(),i(92,"section",25)(93,"div",26)(94,"mat-card",27)(95,"div",28)(96,"div")(97,"p",29),o(98,"Cobros"),n(),i(99,"h2"),o(100,"Pagos registrados de membresias"),n(),i(101,"p"),o(102,"Filtra por cliente y periodo para revisar rapidamente el historial de cobros."),n()(),i(103,"div",30)(104,"div",31)(105,"span",32),o(106),n(),i(107,"span",33),o(108),n()(),i(109,"button",34),p("click",function(){return a.openPaymentDialog()}),i(110,"mat-icon"),o(111,"add_card"),n(),o(112," Registrar pago "),n()()(),i(113,"div",35)(114,"button",36),p("click",function(){return a.togglePaymentFilters()}),i(115,"mat-icon"),o(116),n(),o(117),n(),i(118,"span",37),o(119),n()(),C(120,Ut,26,3,"form",38),C(121,Xt,4,0,"div",39)(122,Ht,5,0,"div",40)(123,Zt,3,0,"div",41),i(124,"mat-paginator",42),p("page",function(u){return a.handlePaymentPageChange(u)}),n()(),i(125,"mat-card",43)(126,"div",28)(127,"div")(128,"p",29),o(129,"Caja"),n(),i(130,"h2"),o(131,"Movimientos de caja"),n(),i(132,"p"),o(133,"Consulta ingresos y egresos del gimnasio con filtros simples y lectura rapida."),n()(),i(134,"div",30)(135,"div",31)(136,"span",32),o(137),n(),i(138,"span",44),o(139),n()(),i(140,"button",45),p("click",function(){return a.openMovementDialog()}),i(141,"mat-icon"),o(142,"playlist_add"),n(),o(143," Registrar movimiento "),n()()(),i(144,"div",35)(145,"button",36),p("click",function(){return a.toggleMovementFilters()}),i(146,"mat-icon"),o(147),n(),o(148),n(),i(149,"span",37),o(150),n()(),C(151,Kt,28,5,"form",46),C(152,Jt,4,0,"div",39)(153,en,5,0,"div",40)(154,nn,3,0,"div",41),i(155,"mat-paginator",42),p("page",function(u){return a.handleMovementPageChange(u)}),n()()(),i(156,"div",47)(157,"mat-card",48)(158,"div",49)(159,"div")(160,"p",29),o(161,"Analisis"),n(),i(162,"h2"),o(163,"Mes por categorias"),n(),i(164,"p"),o(165,"Lee rapidamente que categorias impulsan la caja del periodo."),n()()(),i(166,"div",35)(167,"button",36),p("click",function(){return a.toggleInsights()}),i(168,"mat-icon"),o(169),n(),o(170),n(),i(171,"span",37),o(172),n()(),C(173,on,20,2,"form",50),C(174,rn,4,0,"div",39)(175,cn,5,0,"div",40)(176,ln,3,0,"div",51),n()()()()),e&2&&(c(29),d("disabled",a.isLoadingLookups()||a.isSavingPayment()),c(4),d("disabled",a.isLoadingLookups()||a.isSavingMovement()),c(13),M(a.errorMessage()?46:-1),c(10),l(a.formatCurrency(a.balance())),c(11),l(a.formatCurrency(a.monthlyNetAmount())),c(11),l(a.payments().length),c(2),_("",a.formatCurrency(a.paymentTotalAmount())," en el filtro actual"),c(9),l(a.cashMovements().length),c(2),_("",a.formatCurrency(a.visibleNetAmount())," netos en pantalla"),c(15),_("Confirmados ",a.confirmedPaymentsCount()),c(2),_("Pendientes ",a.pendingPaymentsCount()),c(),d("disabled",a.isLoadingLookups()||a.isSavingPayment()),c(7),l(a.paymentFiltersExpanded()?"filter_list_off":"filter_list"),c(),_(" ",a.paymentFiltersExpanded()?"Ocultar filtros":"Mostrar filtros"," "),c(2),_(" ",a.activePaymentFiltersCount()===0?"Sin filtros activos":a.activePaymentFiltersCount()+" filtros activos"," "),c(),M(a.paymentFiltersExpanded()?120:-1),c(),M(a.isLoadingPayments()?121:a.payments().length===0?122:123),c(3),d("length",a.paymentTotalCount())("pageIndex",a.paymentPageNumber()-1)("pageSize",a.paymentPageSize())("pageSizeOptions",ve(38,St)),c(13),_("Ingresos ",a.formatCurrency(a.visibleIncomeAmount())),c(2),_("Egresos ",a.formatCurrency(a.visibleExpenseAmount())),c(),d("disabled",a.isLoadingLookups()||a.isSavingMovement()),c(7),l(a.movementFiltersExpanded()?"filter_list_off":"filter_list"),c(),_(" ",a.movementFiltersExpanded()?"Ocultar filtros":"Mostrar filtros"," "),c(2),_(" ",a.activeMovementFiltersCount()===0?"Sin filtros activos":a.activeMovementFiltersCount()+" filtros activos"," "),c(),M(a.movementFiltersExpanded()?151:-1),c(),M(a.isLoadingMovements()?152:a.cashMovements().length===0?153:154),c(3),d("length",a.movementTotalCount())("pageIndex",a.movementPageNumber()-1)("pageSize",a.movementPageSize())("pageSizeOptions",ve(39,St)),c(14),l(a.insightsExpanded()?"filter_list_off":"filter_list"),c(),_(" ",a.insightsExpanded()?"Ocultar filtros":"Mostrar filtros"," "),c(2),_(" ",a.activeInsightsFiltersCount()===0?"Periodo actual":a.activeInsightsFiltersCount()+" filtros activos"," "),c(),M(a.insightsExpanded()?173:-1),c(),M(a.isLoadingInsights()?174:a.monthlySummary().length===0?175:176))},dependencies:[N,j,R,D,L,F,T,V,ae,A,z,Y,q,ct,rt,H,X,U,G,$,Z,Q,dt,lt,at,it,J,K,W,He,Ye],styles:[".movements-page[_ngcontent-%COMP%]{display:grid;gap:1.5rem;--mov-surface: #ffffff;--mov-surface-soft: #f8fafc;--mov-border: rgba(15, 23, 42, .08);--mov-shadow: 0 24px 70px rgba(15, 23, 42, .08);--mov-ink: #0f172a;--mov-blue: #2563eb;--mov-green: #0f766e;--mov-yellow: #a16207;--mov-red: #b91c1c}.page-header[_ngcontent-%COMP%], .page-header-copy[_ngcontent-%COMP%], .page-header-side[_ngcontent-%COMP%], .header-actions[_ngcontent-%COMP%], .section-shortcuts[_ngcontent-%COMP%], .content-grid[_ngcontent-%COMP%], .main-column[_ngcontent-%COMP%], .side-column[_ngcontent-%COMP%], .stats-grid[_ngcontent-%COMP%], .panel-heading[_ngcontent-%COMP%], .heading-side[_ngcontent-%COMP%], .heading-metrics[_ngcontent-%COMP%], .filters-grid[_ngcontent-%COMP%], .inline-actions[_ngcontent-%COMP%], .cards-list[_ngcontent-%COMP%], .record-head[_ngcontent-%COMP%], .record-badges[_ngcontent-%COMP%], .record-grid[_ngcontent-%COMP%], .double-grid[_ngcontent-%COMP%], .summary-stack[_ngcontent-%COMP%], .summary-values[_ngcontent-%COMP%]{display:grid;gap:1rem}.page-header[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1.6fr) minmax(280px,.9fr);padding:2rem;border-radius:30px;background:radial-gradient(circle at top left,rgba(37,99,235,.16),transparent 28%),radial-gradient(circle at 88% 14%,rgba(15,118,110,.16),transparent 24%),linear-gradient(135deg,#fff,#f5fbff 52%,#f4fffb);border:1px solid var(--mov-border);box-shadow:var(--mov-shadow)}.page-header-copy[_ngcontent-%COMP%]{gap:1.15rem}.eyebrow-pill[_ngcontent-%COMP%], .shortcut-chip[_ngcontent-%COMP%], .metric-pill[_ngcontent-%COMP%], .status-chip[_ngcontent-%COMP%], .soft-chip[_ngcontent-%COMP%], .mini-pill[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.5rem}.eyebrow-pill[_ngcontent-%COMP%]{width:fit-content;padding:.55rem .9rem;border-radius:999px;background:#0f172a0a;border:1px solid var(--mov-border);color:var(--mov-ink);font-size:.84rem;font-weight:700}.eyebrow-pill[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .eyebrow[_ngcontent-%COMP%]{color:var(--mov-blue)}.eyebrow[_ngcontent-%COMP%]{margin:0 0 .45rem;text-transform:uppercase;letter-spacing:.08em;font-size:.78rem;font-weight:700}.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .panel-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .record-title[_ngcontent-%COMP%], .summary-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{margin:0}.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:clamp(2rem,3.4vw,3rem);line-height:1;letter-spacing:-.04em;color:var(--mov-ink)}.subtitle[_ngcontent-%COMP%], .panel-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .header-note[_ngcontent-%COMP%], .record-subtitle[_ngcontent-%COMP%], .summary-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--app-text-muted)}.subtitle[_ngcontent-%COMP%]{margin:.55rem 0 0;max-width:62ch;line-height:1.65}.section-shortcuts[_ngcontent-%COMP%]{grid-auto-flow:column;justify-content:start;grid-auto-columns:max-content;flex-wrap:wrap}.shortcut-chip[_ngcontent-%COMP%]{padding:.72rem .95rem;border-radius:16px;background:#ffffffdb;border:1px solid var(--mov-border);color:var(--mov-ink);text-decoration:none;font-size:.9rem;font-weight:600}.page-header-side[_ngcontent-%COMP%]{align-content:end}.header-actions[_ngcontent-%COMP%]{grid-auto-flow:row;justify-items:end}.header-action-primary[_ngcontent-%COMP%], .header-action-secondary[_ngcontent-%COMP%], .section-action-button[_ngcontent-%COMP%]{min-height:46px;border-radius:14px}.header-action-primary[_ngcontent-%COMP%]{box-shadow:0 16px 40px #c1121f29}.header-action-secondary[_ngcontent-%COMP%], .section-action-secondary[_ngcontent-%COMP%]{background:#fff}.header-note[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.75rem;padding:1rem;border-radius:20px;background:#0f172a0a;border:1px solid rgba(15,23,42,.06)}.feedback-banner[_ngcontent-%COMP%], .stat-card[_ngcontent-%COMP%], .panel-card[_ngcontent-%COMP%], .record-card[_ngcontent-%COMP%], .summary-row[_ngcontent-%COMP%]{border-radius:24px;border:1px solid var(--mov-border);background:var(--mov-surface)}.feedback-banner[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.6rem;padding:.95rem 1rem;background:var(--app-accent-soft);color:var(--app-accent-strong);border-color:#c1121f1f}.stats-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(4,minmax(0,1fr))}.stat-card[_ngcontent-%COMP%], .panel-card[_ngcontent-%COMP%]{box-shadow:var(--mov-shadow)}.stat-card[_ngcontent-%COMP%]{padding:1.35rem;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:1rem}.stat-icon-shell[_ngcontent-%COMP%]{width:3rem;height:3rem;display:grid;place-items:center;border-radius:18px}.stat-icon-shell.accent[_ngcontent-%COMP%]{background:#c1121f1a;color:var(--app-accent)}.stat-icon-shell.success[_ngcontent-%COMP%]{background:#0f766e1f;color:var(--mov-green)}.stat-icon-shell.info[_ngcontent-%COMP%]{background:#2563eb1f;color:var(--mov-blue)}.stat-icon-shell.warn[_ngcontent-%COMP%]{background:#f59e0b24;color:#b45309}.stat-copy[_ngcontent-%COMP%]{display:grid;gap:.25rem}.stat-label[_ngcontent-%COMP%]{font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--app-text-muted)}.stat-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:2rem;line-height:1}.stat-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--app-text-soft)}.content-grid[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1.45fr) minmax(320px,.95fr);align-items:start}.main-column[_ngcontent-%COMP%], .side-column[_ngcontent-%COMP%]{gap:1.5rem}.panel-card[_ngcontent-%COMP%]{padding:1.5rem}.panel-heading[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr) auto;align-items:start;margin-bottom:1.2rem}.heading-side[_ngcontent-%COMP%]{justify-items:end;align-content:start}.compact-heading[_ngcontent-%COMP%]{grid-template-columns:1fr}.panel-kicker[_ngcontent-%COMP%]{margin:0 0 .35rem;font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--mov-green)}.panel-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--mov-ink)}.panel-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.45rem 0 0}.heading-metrics[_ngcontent-%COMP%]{grid-auto-flow:row;justify-items:end}.filters-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(4,minmax(0,1fr));align-items:start;margin-bottom:1.25rem}.movement-filters[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.inline-actions[_ngcontent-%COMP%]{grid-auto-flow:column;justify-content:end;align-content:start}.metric-pill[_ngcontent-%COMP%], .mini-pill[_ngcontent-%COMP%]{padding:.45rem .75rem;border-radius:999px;font-size:.8rem;font-weight:700}.metric-pill.positive[_ngcontent-%COMP%], .mini-pill.positive[_ngcontent-%COMP%], .status-chip.confirmed[_ngcontent-%COMP%]{background:#dcfce7;border:1px solid #86efac;color:#166534}.metric-pill.warning[_ngcontent-%COMP%], .status-chip.pending[_ngcontent-%COMP%]{background:#fef3c7;border:1px solid #fcd34d;color:var(--mov-yellow)}.metric-pill.negative[_ngcontent-%COMP%], .mini-pill.negative[_ngcontent-%COMP%], .status-chip.expense[_ngcontent-%COMP%]{background:#fee2e2;border:1px solid #fca5a5;color:var(--mov-red)}.cards-list[_ngcontent-%COMP%]{gap:1rem}.record-card[_ngcontent-%COMP%]{padding:1rem;background:linear-gradient(180deg,#f8fafcf5,#fff)}.record-card-expense[_ngcontent-%COMP%]{background:linear-gradient(180deg,#fff7f7f5,#fff)}.record-head[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:1rem}.record-amount[_ngcontent-%COMP%]{display:block;font-size:1.45rem;line-height:1;color:var(--mov-ink)}.record-title[_ngcontent-%COMP%]{margin-top:.55rem;font-size:1rem;color:var(--mov-ink)}.record-subtitle[_ngcontent-%COMP%]{display:block;margin-top:.2rem}.record-badges[_ngcontent-%COMP%]{justify-items:end}.status-chip[_ngcontent-%COMP%], .soft-chip[_ngcontent-%COMP%]{padding:.42rem .72rem;border-radius:999px;font-size:.8rem;font-weight:700}.soft-chip[_ngcontent-%COMP%]{background:#0f172a0d;color:var(--mov-ink)}.record-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(4,minmax(0,1fr));margin-top:1rem}.record-grid[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:grid;gap:.25rem}.record-grid[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.76rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--app-text-soft)}.record-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--mov-ink)}.double-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.analysis-card[_ngcontent-%COMP%]{background:radial-gradient(circle at top right,rgba(37,99,235,.08),transparent 28%),linear-gradient(180deg,#fff,#f9fbff)}.summary-stack[_ngcontent-%COMP%]{gap:.8rem}.summary-row[_ngcontent-%COMP%]{padding:.9rem 1rem;display:grid;gap:.7rem}.summary-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;color:var(--mov-ink)}.summary-values[_ngcontent-%COMP%]{grid-auto-flow:row}.loading-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%]{display:grid;justify-items:center;gap:.75rem;padding:2rem 1rem;text-align:center;color:var(--app-text-muted)}.loading-state.compact[_ngcontent-%COMP%], .empty-state.compact[_ngcontent-%COMP%]{padding:1.5rem 1rem;border-radius:20px;background:linear-gradient(180deg,#fbfdfe,#f8fafc);border:1px dashed rgba(15,23,42,.12)}mat-paginator[_ngcontent-%COMP%]{margin-top:1rem;background:transparent}[_nghost-%COMP%]     .movements-page .mat-mdc-form-field{width:100%}[_nghost-%COMP%]     .movements-page .mdc-text-field--outlined{border-radius:16px;background:#fff}@media(max-width:1200px){.stats-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.content-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}@media(max-width:900px){.page-header[_ngcontent-%COMP%], .record-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.page-header-side[_ngcontent-%COMP%], .header-actions[_ngcontent-%COMP%], .heading-side[_ngcontent-%COMP%], .heading-metrics[_ngcontent-%COMP%], .inline-actions[_ngcontent-%COMP%]{justify-items:start}.inline-actions[_ngcontent-%COMP%]{grid-auto-flow:row}.record-head[_ngcontent-%COMP%]{grid-template-columns:1fr}.record-badges[_ngcontent-%COMP%]{justify-items:start}.section-action-button[_ngcontent-%COMP%], .header-action-primary[_ngcontent-%COMP%], .header-action-secondary[_ngcontent-%COMP%]{width:100%;justify-content:center}}@media(max-width:768px){.page-header[_ngcontent-%COMP%], .panel-card[_ngcontent-%COMP%]{padding:1rem}.stats-grid[_ngcontent-%COMP%], .double-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.section-shortcuts[_ngcontent-%COMP%]{grid-auto-flow:row}.filters-grid[_ngcontent-%COMP%], .movement-filters[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}.inline-actions[_ngcontent-%COMP%]{grid-column:1/-1;grid-auto-flow:column;justify-content:stretch}.inline-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .full-button[_ngcontent-%COMP%]{width:100%;justify-content:center}.record-card[_ngcontent-%COMP%]{padding:.9rem}.record-amount[_ngcontent-%COMP%]{font-size:1.25rem}.summary-row[_ngcontent-%COMP%]{padding:.85rem .9rem}mat-paginator[_ngcontent-%COMP%]{margin-inline:-.25rem}}@media(max-width:520px){.filters-grid[_ngcontent-%COMP%], .movement-filters[_ngcontent-%COMP%], .double-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.inline-actions[_ngcontent-%COMP%]{grid-auto-flow:row}}"],changeDetection:0})};export{Et as MovementsPageComponent};
