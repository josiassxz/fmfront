"use strict";(self.webpackChunkFmInspecao=self.webpackChunkFmInspecao||[]).push([[383],{1383:(ht,g,n)=>{n.r(g),n.d(g,{ManterUsuariosModule:()=>ct});var c=n(6895),u=n(9299),d=n(8739),l=n(671),Z=n(6451),M=n(8675),y=n(3900),x=n(4004),L=n(529),N=n(8112),t=n(4650),S=n(8242),f=n(8212),s=n(4006),U=n(3238),b=n(4859),p=n(9549),T=n(4144),_=n(4385),v=n(266),A=n(2216);function J(o,a){1&o&&(t.TgZ(0,"th",29),t._uU(1," Nome"),t.qZA())}function F(o,a){if(1&o&&(t.TgZ(0,"td",30)(1,"span",31),t._uU(2),t.qZA()()),2&o){const e=a.$implicit;t.xp6(1),t.Q6J("matTooltip",e.nome),t.xp6(1),t.hij(" ",e.nome?e.nome.length>70?e.nome.substr(0,70)+"...":e.nome:"Sem Nome"," ")}}function Q(o,a){1&o&&(t.TgZ(0,"th",29),t._uU(1," E-mail"),t.qZA())}function I(o,a){if(1&o&&(t.TgZ(0,"td",30)(1,"span",31),t._uU(2),t.qZA()()),2&o){const e=a.$implicit;t.xp6(1),t.Q6J("matTooltip",e.email),t.xp6(1),t.hij(" ",e.email?e.email.length>70?e.email.substr(0,70)+"...":e.email:"Sem E-mail"," ")}}function q(o,a){1&o&&(t.TgZ(0,"th",29),t._uU(1," Tipo de Usu\xe1rio"),t.qZA())}function E(o,a){if(1&o&&(t.TgZ(0,"td",30)(1,"span",31),t._uU(2),t.qZA()()),2&o){const e=a.$implicit,i=t.oxw();t.xp6(1),t.Q6J("matTooltip",i.getTipo(e.tipo)),t.xp6(1),t.hij(" ",i.getTipo(e.tipo)," ")}}function O(o,a){1&o&&(t.TgZ(0,"th",32),t._uU(1," Editar"),t.qZA())}const k=function(o){return["/administrador/manter-usuarios/form/editar",!1,o]};function Y(o,a){if(1&o&&(t.TgZ(0,"td",33)(1,"button",34),t._UZ(2,"fa-icon",35),t.qZA()()),2&o){const e=a.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(1,k,e.id))}}function w(o,a){1&o&&(t.TgZ(0,"th",32),t._uU(1," Excluir"),t.qZA())}function D(o,a){if(1&o){const e=t.EpF();t.TgZ(0,"td",33)(1,"button",36),t.NdJ("click",function(){const m=t.CHM(e).$implicit,ft=t.oxw();return t.KtG(ft.excluir(m))}),t._UZ(2,"fa-icon",37),t.qZA()()}}function z(o,a){1&o&&(t.TgZ(0,"th",32),t._uU(1," Visualizar"),t.qZA())}const R=function(o){return["/administrador/manter-usuarios/form/visualizar",!0,o]},P=function(){return["fas","search"]};function B(o,a){if(1&o&&(t.TgZ(0,"td",33)(1,"button",34),t._UZ(2,"fa-icon",38),t.qZA()()),2&o){const e=a.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(2,R,e.id)),t.xp6(1),t.Q6J("icon",t.DdM(4,P))}}function G(o,a){1&o&&t._UZ(0,"tr",39)}function H(o,a){1&o&&t._UZ(0,"tr",40)}const V=function(){return["/administrador/manter-usuarios/form"]};let j=(()=>{class o{constructor(e,i){this.bottomSheet=e,this.usuarioService=i,this.isLoading=!0,this.usuario=[],this.displayedColumns=["nome","email","tipo","editar","excluir","visualizar"],this.dataSource=new l.by([]),this.pageSizeOptions=[5,10,25,100],this.totalElements=0,this.size=5,this.page=0,this.resultsLength=0,this.isLoadingResults=!0,this.isRateLimitReached=!1,this.filtro={size:5,page:0},this.tipo=[{id:1,descricao:"Administrador"},{id:2,descricao:"Cliente"}]}ngOnInit(){}get_http_params_from_object(e){let i=new L.LE;return Object.keys(e).forEach((r,m)=>{null!==e[r]&&""!==e[r]&&void 0!==e[r]&&(i=i.append(r,e[r].toString()))}),i}ngAfterViewInit(){(0,Z.T)(this.paginator.page).pipe((0,M.O)({}),(0,y.w)(()=>{const e={...this.filtro};e&&e.descricao&&""!==e.descricao&&(e.descricao=e.descricao.toUpperCase().trim()),this.paginator&&this.paginator.length&&this.paginator.pageSize&&(e.size=this.paginator.pageSize,e.page=this.paginator.pageIndex);const i=this.get_http_params_from_object(e);return this.isLoadingResults=!0,console.log(i,"mandei esses parametros"),this.usuarioService.pagination(i)}),(0,x.U)(e=>(this.isLoadingResults=!1,this.isRateLimitReached=!1,this.resultsLength=e.totalElements,e.content))).subscribe(e=>{this.dataSource.data=[...e]})}limparFiltro(){this.dataSource.data=[],this.filtro={},this.pesquisar()}pesquisar(){this.paginator._changePageSize(5),this.paginator.firstPage()}getTipo(e){return this.tipo.find(i=>i.id==e).descricao}excluir(e){this.bottomSheet.open(N.n,{data:{registro:e.nome.length>70?e.nome.substr(0,70)+"...":e.nome}}).afterDismissed().subscribe(i=>{i&&this.usuarioService.excluir(e.id).subscribe(()=>{this.pesquisar()})})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(S.ch),t.Y36(f.B))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-manter-usuarios-list"]],viewQuery:function(e,i){if(1&e&&t.Gf(d.NW,5),2&e){let r;t.iGM(r=t.CRH())&&(i.paginator=r.first)}},decls:52,vars:10,consts:[[1,"container-fluid"],[1,"row"],[1,"col-lg-4","col-xl-4","col-md-4","col-sm-12"],[1,"mat-form-field"],["matInput","","placeholder","Nome Do Usu\xe1rio",3,"ngModel","ngModelChange","keyup.enter"],["matInput","","placeholder","E-mail",3,"ngModel","ngModelChange","keyup.enter"],["placeholder","Tipo de Usu\xe1rio",3,"ngModel","ngModelChange"],["value","1"],["value","2"],[1,"col-12","text-right"],["mat-flat-button","","color","primary","matTooltip","Novo",1,"btn-block","mt-2","width-button",3,"routerLink"],["mat-flat-button","","color","primary","matTooltip","Limpar",1,"btn-block","ml-3","width-button",3,"click"],["mat-flat-button","","color","primary","matTooltip","Pesquisar",1,"btn-block","ml-3","width-button",3,"click"],[1,"mat-elevation-z8","mt-3"],[1,"responsive_table"],["mat-table","","summary","Usuarios Cadastrados - Listagem de Usuarios cadastrados",3,"dataSource"],["matColumnDef","nome"],["mat-header-cell","","tabindex","0",4,"matHeaderCellDef"],["mat-cell","","tabindex","0",4,"matCellDef"],["matColumnDef","email"],["matColumnDef","tipo"],["matColumnDef","editar"],["mat-header-cell","","tabindex","0","class","text-center",4,"matHeaderCellDef"],["mat-cell","","class","text-center",4,"matCellDef"],["matColumnDef","excluir"],["matColumnDef","visualizar"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"length","pageSizeOptions"],["mat-header-cell","","tabindex","0"],["mat-cell","","tabindex","0"],[3,"matTooltip"],["mat-header-cell","","tabindex","0",1,"text-center"],["mat-cell","",1,"text-center"],["mat-icon-button","","color","primary",3,"routerLink"],["icon","edit","matTooltipPosition","above"],["mat-icon-button","","color","primary","data-testid","delete-crud",3,"click"],["icon","trash","matTooltipPosition","above"],["matTooltipPosition","above",3,"icon"],["mat-header-row",""],["mat-row",""]],template:function(e,i){1&e&&(t.TgZ(0,"div",0),t._UZ(1,"br"),t.TgZ(2,"h2"),t._uU(3,"Lista de Usu\xe1rios"),t.qZA(),t.TgZ(4,"div",1)(5,"div",2)(6,"mat-form-field",3)(7,"input",4),t.NdJ("ngModelChange",function(m){return i.filtro.nome=m})("keyup.enter",function(){return i.pesquisar()}),t.qZA()()(),t.TgZ(8,"div",2)(9,"mat-form-field",3)(10,"input",5),t.NdJ("ngModelChange",function(m){return i.filtro.email=m})("keyup.enter",function(){return i.pesquisar()}),t.qZA()()(),t.TgZ(11,"div",2)(12,"mat-form-field",3)(13,"mat-select",6),t.NdJ("ngModelChange",function(m){return i.filtro.tipo=m}),t.TgZ(14,"mat-option"),t._uU(15,"--"),t.qZA(),t.TgZ(16,"mat-option",7),t._uU(17,"Administrador"),t.qZA(),t.TgZ(18,"mat-option",8),t._uU(19,"Cliente"),t.qZA()()()()(),t.TgZ(20,"div",1)(21,"div",9)(22,"button",10),t._uU(23,"Novo "),t.qZA(),t.TgZ(24,"button",11),t.NdJ("click",function(){return i.limparFiltro()}),t._uU(25,"Limpar "),t.qZA(),t.TgZ(26,"button",12),t.NdJ("click",function(){return i.pesquisar()}),t._uU(27,"Pesquisar "),t.qZA()()(),t.TgZ(28,"div",13)(29,"div",14)(30,"table",15),t.ynx(31,16),t.YNc(32,J,2,0,"th",17),t.YNc(33,F,3,2,"td",18),t.BQk(),t.ynx(34,19),t.YNc(35,Q,2,0,"th",17),t.YNc(36,I,3,2,"td",18),t.BQk(),t.ynx(37,20),t.YNc(38,q,2,0,"th",17),t.YNc(39,E,3,2,"td",18),t.BQk(),t.ynx(40,21),t.YNc(41,O,2,0,"th",22),t.YNc(42,Y,3,3,"td",23),t.BQk(),t.ynx(43,24),t.YNc(44,w,2,0,"th",22),t.YNc(45,D,3,0,"td",23),t.BQk(),t.ynx(46,25),t.YNc(47,z,2,0,"th",22),t.YNc(48,B,3,5,"td",23),t.BQk(),t.YNc(49,G,1,0,"tr",26),t.YNc(50,H,1,0,"tr",27),t.qZA(),t._UZ(51,"mat-paginator",28),t.qZA()()()),2&e&&(t.xp6(7),t.Q6J("ngModel",i.filtro.nome),t.xp6(3),t.Q6J("ngModel",i.filtro.email),t.xp6(3),t.Q6J("ngModel",i.filtro.tipo),t.xp6(9),t.Q6J("routerLink",t.DdM(9,V)),t.xp6(8),t.Q6J("dataSource",i.dataSource),t.xp6(19),t.Q6J("matHeaderRowDef",i.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",i.displayedColumns),t.xp6(1),t.Q6J("length",i.resultsLength)("pageSizeOptions",i.pageSizeOptions))},dependencies:[u.rH,s.Fj,s.JJ,s.On,U.ey,b.lW,p.KE,T.Nt,_.gD,v.gM,l.BZ,l.fO,l.as,l.w1,l.Dz,l.nj,l.ge,l.ev,l.XQ,l.Gk,d.NW,A.BN],styles:["table[_ngcontent-%COMP%]{width:100%}th[_ngcontent-%COMP%]:nth-child(1){width:40%}.width-button[_ngcontent-%COMP%]{width:8%}.mat-form-field[_ngcontent-%COMP%]{width:100%!important}"]}),o})();var W=n(6308),K=n(3546),$=n(7392),X=n(5829);function tt(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," O campo Nome deve ser informado. "),t.qZA())}function et(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," O campo Tipo de Usu\xe1rio deve ser informado. "),t.qZA())}function ot(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," O campo E-mail deve ser informado. "),t.qZA())}function it(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," O campo E-mail est\xe1 inv\xe1lido. "),t.qZA())}function at(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," O campo Senha deve ser informado. "),t.qZA())}function nt(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," O campo Senha deve ter no m\xednimo 6 digitos e no m\xe1ximo 12. "),t.qZA())}const C=function(){return["/administrador/manter-usuarios/lista"]};function rt(o,a){1&o&&(t.TgZ(0,"button",24),t._uU(1,"Cancelar "),t.qZA()),2&o&&t.Q6J("routerLink",t.DdM(1,C))}function st(o,a){if(1&o){const e=t.EpF();t.TgZ(0,"button",25),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.saveOrUpdate())}),t._uU(1,"Salvar "),t.qZA()}}function lt(o,a){1&o&&(t.TgZ(0,"button",26),t._uU(1,"Voltar "),t.qZA()),2&o&&t.Q6J("routerLink",t.DdM(1,C))}const mt=function(){return{"font-size":"20px"}};let h=(()=>{class o{constructor(e,i,r,m){this.formBuilder=e,this.usuarioService=i,this.router=r,this.activatedRoute=m,this.edicao=!1,this.disabled=!1,this.mostrarSenha=!0,this.dataSource=new l.by([]),this.displayedColumnsusuario=["nome","email","senha"],this.pageSizeOptions=[5,10,25,100],this.pageSize=5}ngOnInit(){this.activatedRoute.params.subscribe(e=>{Promise.resolve(null).then(()=>{const i=e.id;this.disabled="true"===e.disabled,i&&(this.edicao=!0,this.openEdit(i))}),this.initForm()})}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}set matPaginator(e){this.paginator=e,this.dataSource.paginator=this.paginator}initForm(){this.usuarioForm=this.formBuilder.group({nome:new s.NI("",[s.kI.required,s.kI.maxLength(255)]),email:new s.NI("",[s.kI.required,s.kI.maxLength(255),s.kI.email]),senha:new s.NI("",[s.kI.required]),tipo:new s.NI("",[s.kI.required])})}openEdit(e){this.usuarioService.get(e).subscribe(i=>{this.usuario=i,this.usuarioForm.reset(i),this.usuarioForm.patchValue({id:e})})}saveOrUpdate(){if(this.validarForm(this.usuarioForm)){const e=this.usuarioForm.value;console.log(e),this.edicao?(e.id=this.usuario.id,this.usuarioService.alterar(e).subscribe(()=>{this.router.navigate(["/administrador/manter-usuarios/lista"])})):this.usuarioService.salvar(e).subscribe(()=>{this.router.navigate(["/administrador/manter-usuarios/lista"])})}}validarForm(e){return!e.invalid}getTittle(){return this.edicao&&!this.disabled?"Editar Usu\xe1rio":this.disabled?"Visualizar Usu\xe1rio":"Incluir Usu\xe1rio"}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(s.qu),t.Y36(f.B),t.Y36(u.F0),t.Y36(u.gz))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-manter-usuarios-form"]],viewQuery:function(e,i){if(1&e&&(t.Gf(d.NW,5),t.Gf(W.YE,5),t.Gf(d.NW,5)),2&e){let r;t.iGM(r=t.CRH())&&(i.paginator=r.first),t.iGM(r=t.CRH())&&(i.sort=r.first),t.iGM(r=t.CRH())&&(i.matPaginator=r.first)}},decls:42,vars:24,consts:[[1,"container-fluid"],[1,"mt-3"],[1,"row","m-2"],[1,"col"],["tabindex","0","id","title-titulo"],["titulo",""],["novalidate","","autocomplete","off",3,"formGroup"],[1,"row","ml-1","mr-1"],[1,"col-lg-6","col-xl-6","col-md-6","col-sm-12"],[1,"mat-form-field"],["matInput","","formControlName","nome","required","","placeholder","Nome do Usuario","maxlength","255",3,"readonly","disabled"],[4,"ngIf"],["formControlName","tipo","placeholder","Tipo de Usu\xe1rio","required","",3,"disabled"],["value","1"],["value","2"],["matInput","","type","email","formControlName","email","required","","placeholder","E-mail","maxlength","255",3,"readonly","disabled"],["type","password","matInput","","placeholder","Senha","formControlName","senha","minlength","6","maxlength","12","id","senha","name","senha",3,"type","readonly","disabled"],["type","button","mat-icon-button","","matSuffix","","id","visibilidadeSenha","name","visibilidadeSenha",3,"click"],["color","primary",3,"ngStyle"],[1,"col-12","row","justify-content-md-end","justify-content-xs-center","d-flex"],[1,"col-xs-12","col-sm-12","col-lg-4","d-lg-flex","text-md-right","text-sm-center","align-items-center","mb-3"],["mat-flat-button","","color","primary","class","btn-block ml-3 mt-md-2 ","type","button","matTooltip","Cancelar",3,"routerLink",4,"ngIf"],["mat-flat-button","","color","primary","class","btn-block ml-3","type","submit","matTooltip","Salvar",3,"click",4,"ngIf"],["mat-flat-button","","color","primary","class","btn-block ml-3","type","button","matTooltip","Voltar",3,"routerLink",4,"ngIf"],["mat-flat-button","","color","primary","type","button","matTooltip","Cancelar",1,"btn-block","ml-3","mt-md-2",3,"routerLink"],["mat-flat-button","","color","primary","type","submit","matTooltip","Salvar",1,"btn-block","ml-3",3,"click"],["mat-flat-button","","color","primary","type","button","matTooltip","Voltar",1,"btn-block","ml-3",3,"routerLink"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"mat-card",1)(2,"div",2)(3,"div",3)(4,"h2",4,5),t._uU(6),t.qZA()()(),t.TgZ(7,"form",6)(8,"div",7)(9,"div",8)(10,"mat-form-field",9),t._UZ(11,"input",10),t.YNc(12,tt,2,0,"mat-error",11),t.qZA()(),t.TgZ(13,"div",8)(14,"mat-form-field",9)(15,"mat-select",12)(16,"mat-option"),t._uU(17,"--"),t.qZA(),t.TgZ(18,"mat-option",13),t._uU(19,"Administrador"),t.qZA(),t.TgZ(20,"mat-option",14),t._uU(21,"Cliente"),t.qZA()(),t.YNc(22,et,2,0,"mat-error",11),t.qZA()()(),t.TgZ(23,"div",7)(24,"div",8)(25,"mat-form-field",9),t._UZ(26,"input",15),t.YNc(27,ot,2,0,"mat-error",11),t.YNc(28,it,2,0,"mat-error",11),t.qZA()(),t.TgZ(29,"div",8)(30,"mat-form-field"),t._UZ(31,"input",16),t.TgZ(32,"button",17),t.NdJ("click",function(){return i.mostrarSenha=!i.mostrarSenha}),t.TgZ(33,"mat-icon",18),t._uU(34),t.qZA()(),t.YNc(35,at,2,0,"mat-error",11),t.YNc(36,nt,2,0,"mat-error",11),t.qZA()()(),t.TgZ(37,"div",19)(38,"div",20),t.YNc(39,rt,2,2,"button",21),t.YNc(40,st,2,0,"button",22),t.YNc(41,lt,2,2,"button",23),t.qZA()()()()()),2&e&&(t.xp6(6),t.Oqu(i.getTittle()),t.xp6(1),t.Q6J("formGroup",i.usuarioForm),t.xp6(4),t.Q6J("readonly",i.disabled)("disabled",i.disabled),t.xp6(1),t.Q6J("ngIf",i.usuarioForm.get("nome").invalid),t.xp6(3),t.Q6J("disabled",i.disabled),t.xp6(7),t.Q6J("ngIf",i.usuarioForm.get("tipo").invalid),t.xp6(4),t.Q6J("readonly",i.disabled)("disabled",i.disabled),t.xp6(1),t.Q6J("ngIf",i.usuarioForm.get("email").hasError("required")),t.xp6(1),t.Q6J("ngIf",i.usuarioForm.get("email").hasError("email")),t.xp6(3),t.Q6J("type",i.mostrarSenha?"password":"text")("readonly",i.disabled)("disabled",i.disabled),t.xp6(1),t.uIk("aria-label","Senha escondida")("aria-pressed",i.mostrarSenha),t.xp6(1),t.Q6J("ngStyle",t.DdM(23,mt)),t.xp6(1),t.Oqu(i.mostrarSenha?"visibility_off":"visibility"),t.xp6(1),t.Q6J("ngIf",i.usuarioForm.get("senha").hasError("required")),t.xp6(1),t.Q6J("ngIf",i.usuarioForm.get("senha").hasError("minlength")),t.xp6(3),t.Q6J("ngIf",!i.disabled),t.xp6(1),t.Q6J("ngIf",!i.disabled),t.xp6(1),t.Q6J("ngIf",i.disabled))},dependencies:[c.O5,c.PC,u.rH,s._Y,s.Fj,s.JJ,s.JL,s.Q7,s.wO,s.nD,U.ey,s.sg,s.u,b.lW,p.TO,p.KE,p.R9,T.Nt,K.a8,_.gD,$.Hw,v.gM,X.Zl],styles:["table[_ngcontent-%COMP%]{width:100%}th[_ngcontent-%COMP%]:nth-child(2){width:16%}th[_ngcontent-%COMP%]:nth-child(3){width:8%}.mat-form-field[_ngcontent-%COMP%]{width:100%!important}"]}),o})();const ut=[{path:"manter-usuarios",redirectTo:"lista",data:{title:""}},{path:"lista",component:j,data:{title:"Lista de Usu\xe1rios"}},{path:"form",component:h,data:{title:"Incluir Usu\xe1rio"}},{path:"form/visualizar/:disabled/:id",component:h,data:{title:"Visualizar Usu\xe1rio"}},{path:"form/editar/:disabled/:id",component:h,data:{title:"Editar Usu\xe1rio"}}];let dt=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[u.Bz.forChild(ut),u.Bz]}),o})();var pt=n(8147);let ct=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[f.B],imports:[c.ez,dt,pt.m]}),o})()}}]);