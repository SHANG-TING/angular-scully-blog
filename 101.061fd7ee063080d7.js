"use strict";(self.webpackChunkangular_scully_blog=self.webpackChunkangular_scully_blog||[]).push([[101],{9940:($,p,t)=>{t.d(p,{eo:()=>H,Z$:()=>E,me:()=>F,P2:()=>I,HQ:()=>M,AB:()=>N});var P=t(4813),f=t(9300),A=t(8505),d=t(3900),l=t(4004),v=t(6571),c=t(5e3),g=t(6523),h=t(188),L=t(9635),G=t(4307),U=t(2286);let y=(()=>{class s{constructor(o){this.postApi=o}getList(){return this.postApi.getPublishedList().pipe((0,l.U)(o=>{const n={};for(const a of o)for(const r of a.tags)n[r]?n[r].count++:n[r]={name:r,count:1};return Object.values(n)}),(0,l.U)(o=>(0,g.Z)(o,["count"],["desc"])))}getPostList(o,n=null){return this.postApi.getPublishedList().pipe((0,d.w)(h.D),(0,f.h)(a=>a.tags.includes(o)),n?(0,f.h)(a=>a.title.toLowerCase().includes(n.toLowerCase())||a.description.toLowerCase().includes(n.toLowerCase())):(0,L.z)(),(0,G.q)(),(0,l.U)(a=>(0,g.Z)(a,["createdAt"],["desc"])))}}return s.\u0275fac=function(o){return new(o||s)(c.LFG(U.e))},s.\u0275prov=c.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();var B=t(4997);let H=(()=>{class s extends v.m1{constructor(o,n){super({}),this.tagApi=o,this.route=n,this.tagNameParams$=this.route.params.pipe((0,P.j)("tagName"),(0,f.h)(a=>!!a)),this.paginatedPosts$=this.select(a=>{var r;return null===(r=a.data)||void 0===r?void 0:r.posts}),this.loadPosts=this.effect(a=>a.pipe((0,A.b)(()=>{this.patchState({status:"loading",error:null})}),(0,d.w)(r=>this.tagNameParams$.pipe((0,l.U)(T=>Object.assign(Object.assign({},r),{tagName:T})))),(0,d.w)(({keyword:r,pageIndex:T,pageSize:m,tagName:O})=>this.tagApi.getPostList(O,r).pipe((0,l.U)(u=>({pageIndex:T,pageSize:m,pageCount:Math.ceil(u.length/m),totalCount:u.length,data:u.slice(m*T,m*(T+1))})),(0,v._b)(u=>{this.patchState({data:{name:O,posts:u},status:"success",error:""})},u=>{this.patchState({status:"error",error:u})})))))}}return s.\u0275fac=function(o){return new(o||s)(c.LFG(y),c.LFG(B.gz))},s.\u0275prov=c.Yz7({token:s,factory:s.\u0275fac}),s})();var e=t(5094);const F=(0,e.PH)("[Tags Page/API] Init"),j=(0,e.PH)("[Tags Page/API] Load Tags Success",(0,e.Ky)()),C=(0,e.PH)("[Tags Page/API] Load Tags Failure",(0,e.Ky)());var Z=t(9646),z=t(262),S=t(4394);let E=(()=>{class s{constructor(o,n){this.actions$=o,this.tagApi=n,this.loadTags$=(0,S.GW)(()=>this.actions$.pipe((0,S.l4)(F),(0,d.w)(()=>this.tagApi.getList().pipe((0,l.U)(a=>j({tags:a})),(0,z.K)(a=>(0,Z.of)(C({error:a})))))))}}return s.\u0275fac=function(o){return new(o||s)(c.LFG(S.eX),c.LFG(y))},s.\u0275prov=c.Yz7({token:s,factory:s.\u0275fac}),s})();const M="tags",N=(0,e.Lq)({data:null,status:"pending",error:null},(0,e.on)(F,s=>Object.assign(Object.assign({},s),{status:"loading",error:null})),(0,e.on)(j,(s,{tags:i})=>Object.assign(Object.assign({},s),{data:i,status:"success",error:null})),(0,e.on)(C,(s,{error:i})=>Object.assign(Object.assign({},s),{status:"error",error:i}))),x=(0,e.ZF)(M),I=(0,e.P1)(x,s=>s.data)},2101:($,p,t)=>{t.r(p),t.d(p,{TagShellModule:()=>c});var P=t(9808),f=t(4997),A=t(4394),d=t(5094),l=t(9940),v=t(5e3);let c=(()=>{class g{}return g.\u0275fac=function(L){return new(L||g)},g.\u0275mod=v.oAB({type:g}),g.\u0275inj=v.cJS({imports:[[P.ez,f.Bz.forChild([{path:"",loadChildren:()=>t.e(150).then(t.bind(t,4150)).then(h=>h.TagsModule)},{path:":tagName",loadChildren:()=>Promise.all([t.e(382),t.e(557)]).then(t.bind(t,5557)).then(h=>h.TagModule)}]),d.Aw.forFeature(l.HQ,l.AB),A.sQ.forFeature([l.Z$])]]}),g})()}}]);