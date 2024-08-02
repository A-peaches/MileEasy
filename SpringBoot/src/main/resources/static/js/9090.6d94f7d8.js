"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[9090],{9090:function(t,e,o){o.r(e),o.d(e,{default:function(){return $}});var n=o(641),r=o(3751),i=o(33);const s=t=>((0,n.Qi)("data-v-25e0b48b"),t=t(),(0,n.jt)(),t),a={class:"app-container"},l={class:"content cards"},c={class:"header"},u={class:"button-container"},f=s((()=>(0,n.Lk)("span",{class:"arrow"},"❮",-1))),d=s((()=>(0,n.Lk)("div",{class:"actions"},[(0,n.Lk)("h1",{class:"title"},"공지사항 작성")],-1))),h={class:"form-group"},p=s((()=>(0,n.Lk)("label",{for:"title"},"제목",-1))),m=s((()=>(0,n.Lk)("label",{for:"category"},"카테고리",-1))),g={class:"drop-category"},y={class:"selected"},v={key:0,class:"dropdown-category",ref:"dropdownMenu"},w={class:"menu-items"},k=["onClick"],b=s((()=>(0,n.Lk)("div",null,[(0,n.Lk)("i",{class:"bi bi-caret-down-fill icon-right"})],-1))),L={class:"form-group content"},C=s((()=>(0,n.Lk)("label",{for:"content"},"내용",-1))),x={class:"form-group file-upload"},O=s((()=>(0,n.Lk)("label",{for:"file"},"첨부파일",-1))),_={class:"p-4"},E=s((()=>(0,n.Lk)("div",{class:"btn-yellow-container"},[(0,n.Lk)("button",{type:"submit",class:"btn-yellow"},"등록")],-1)));function F(t,e,o,s,F,A){return(0,n.uX)(),(0,n.CE)("div",a,[(0,n.Lk)("div",l,[(0,n.Lk)("div",c,[(0,n.Lk)("div",u,[(0,n.Lk)("button",{class:"back-button",onClick:e[0]||(e[0]=(...t)=>A.goBack&&A.goBack(...t))},[f,(0,n.eW)(" 이전 ")])])]),d,(0,n.Lk)("form",{onSubmit:e[6]||(e[6]=(0,r.D$)(((...t)=>A.submitForm&&A.submitForm(...t)),["prevent"]))},[(0,n.Lk)("div",h,[p,(0,n.bo)((0,n.Lk)("input",{type:"text",id:"title","onUpdate:modelValue":e[1]||(e[1]=t=>F.form.title=t),placeholder:"제목을 입력해주세요",class:"title-input"},null,512),[[r.Jo,F.form.title]])]),(0,n.Lk)("div",{class:"form-group",onClick:e[3]||(e[3]=(0,r.D$)(((...t)=>A.toggleCategory&&A.toggleCategory(...t)),["stop"])),ref:"categoryButton"},[m,(0,n.Lk)("div",g,[(0,n.Lk)("div",y,(0,i.v_)(t.selectedCategory||"마일리지를 선택해주세요"),1)]),F.showCategory?((0,n.uX)(),(0,n.CE)("div",v,[(0,n.Lk)("div",w,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(F.mileages,(t=>((0,n.uX)(),(0,n.CE)("a",{class:"dropdown-item",key:t.mile_no,onClick:e=>A.selectCategory(t.mile_no,t.mile_name,e)},(0,i.v_)(t.mile_name)+" 마일리지 ",9,k)))),128)),(0,n.Lk)("a",{class:"dropdown-item",onClick:e[2]||(e[2]=t=>A.selectCategory(null,"기타",t))},"기타")])],512)):(0,n.Q3)("",!0),b],512),(0,n.Lk)("div",L,[C,(0,n.bo)((0,n.Lk)("textarea",{id:"content","onUpdate:modelValue":e[4]||(e[4]=t=>F.form.content=t),placeholder:"내용을 입력해주세요"},null,512),[[r.Jo,F.form.content]])]),(0,n.Lk)("div",x,[O,(0,n.Lk)("div",_,[(0,n.Lk)("div",null,[(0,n.Lk)("input",{type:"file",onChange:e[5]||(e[5]=(...t)=>A.handleFileUpload&&A.handleFileUpload(...t)),class:"md",style:{width:"100%","text-align":"right","padding-right":"70px"}},null,32)])])]),E],32)])])}o(4114);var A=o(7682),K=o(6278),I={name:"NoticeWriteAdminView",data(){return{form:{title:"",mile_no:"",kind:"",file:null,content:"",category:"",selectedKind:""},mileages:[],showCategory:!1,showKind:!1,uploadedFileName:null}},computed:{...(0,K.L8)("login",["getLoginInfo"])},mounted(){this.fetchMileages(),this.setUserInfo(),document.addEventListener("click",this.handleClickOutside)},beforeUnmount(){document.removeEventListener("click",this.handleClickOutside)},methods:{async handleFileUpload(t){const e=t.target.files[0];if(!e)return;const o=new FormData;o.append("files",e);try{const t=await A.A.post("/notice/upload",o,{headers:{"Content-Type":"multipart/form-data"}}),[e,n]=t.data.split(",");console.log("Saved file name with UUID:",e),console.log("Original file name:",n),this.uploadedFileName=e+","+n,console.log("글쓰기 fileInfo:",this.uploadedFileName),this.displayFileName=n,this.form.file=this.uploadedFileName}catch(n){console.error("파일 업로드 중 오류 발생:",n),this.showAlert("파일 업로드 중 오류가 발생했습니다.","error")}},getDisplayFileName(t){const e=37;return!t||t.length<=e?t:"_"===t.charAt(e-1)?t.substring(e):t},async submitForm(){const t=new FormData;t.append("title",this.form.title),t.append("mile_no",null!==this.form.mile_no?this.form.mile_no:"기타"),t.append("content",this.form.content),t.append("user_no",this.form.user_no),t.append("user_name",this.form.user_name),this.form.file&&(t.append("file",this.form.file),console.log("Form fileInfo:",this.form.file)),this.uploadedFileName&&t.append("file",this.uploadedFileName);try{const e=await A.A.post("/notice/write",t,{headers:{"Content-Type":"multipart/form-data"}});200===e.status?(this.showAlert("공지사항이 등록되었습니다.","success"),this.$router.push("/noticeListView")):this.showAlert("공지사항 등록 중 오류가 발생했습니다.","error")}catch(e){console.error("Error submitting form:",e),this.showAlert("공지사항 등록 중 오류가 발생했습니다.","error")}},goBack(){this.$router.go(-1)},toggleCategory(){this.showCategory=!this.showCategory,this.showKind=!1},toggleKind(){this.showKind=!this.showKind,this.showCategory=!1},selectCategory(t,e,o){o&&o.stopPropagation(),this.selectedCategory=null===t?"기타":e,this.form.mile_no=t,this.showCategory=!1},selectKind(t){this.form.kind=t,this.showKind=!1},handleClickOutside(t){this.$refs.dropdownMenu&&!this.$refs.dropdownMenu.contains(t.target)&&this.$refs.categoryButton&&!this.$refs.categoryButton.contains(t.target)&&(this.showCategory=!1),this.$refs.dropdownKindMenu&&!this.$refs.dropdownKindMenu.contains(t.target)&&this.$refs.kindButton&&!this.$refs.kindButton.contains(t.target)&&(this.showKind=!1)},setUserInfo(){const t=this.getLoginInfo;t&&(this.form.user_no=t.user_no,this.form.user_name=t.user_name)},async fetchMileages(){try{const t=await A.A.get("/notice/mileage");this.mileages=t.data}catch(t){console.error("Error fetching mileages:",t.response?t.response.data:t.message)}},showAlert(t,e){this.$swal({title:t,icon:e,confirmButtonText:"확인",confirmButtonColor:"#4b4a4a",allowOutsideClick:!1,allowEscapeKey:!1,allowEnterKey:!1,stopKeydownPropagation:!1,scrollbarPadding:!1,backdrop:!0,didOpen:()=>{document.body.classList.add("no-scroll"),document.documentElement.style.overflow="hidden"},willClose:()=>{document.body.classList.remove("no-scroll"),document.documentElement.style.overflow="",window.scrollTo(0,scrollY)}})},handleClick(t){this.handleClickOutside(t)}},watch:{selectedCategory(t){this.form.category=t}}},M=o(6262);const P=(0,M.A)(I,[["render",F],["__scopeId","data-v-25e0b48b"]]);var $=P},9617:function(t,e,o){var n=o(5397),r=o(5610),i=o(6198),s=function(t){return function(e,o,s){var a=n(e),l=i(a);if(0===l)return!t&&-1;var c,u=r(s,l);if(t&&o!==o){while(l>u)if(c=a[u++],c!==c)return!0}else for(;l>u;u++)if((t||u in a)&&a[u]===o)return t||u||0;return!t&&-1}};t.exports={includes:s(!0),indexOf:s(!1)}},4527:function(t,e,o){var n=o(3724),r=o(4376),i=TypeError,s=Object.getOwnPropertyDescriptor,a=n&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}();t.exports=a?function(t,e){if(r(t)&&!s(t,"length").writable)throw new i("Cannot set read only .length");return t.length=e}:function(t,e){return t.length=e}},7740:function(t,e,o){var n=o(9297),r=o(5031),i=o(7347),s=o(4913);t.exports=function(t,e,o){for(var a=r(e),l=s.f,c=i.f,u=0;u<a.length;u++){var f=a[u];n(t,f)||o&&n(o,f)||l(t,f,c(e,f))}}},6837:function(t){var e=TypeError,o=9007199254740991;t.exports=function(t){if(t>o)throw e("Maximum allowed index exceeded");return t}},8727:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},6518:function(t,e,o){var n=o(4475),r=o(7347).f,i=o(6699),s=o(6840),a=o(9433),l=o(7740),c=o(2796);t.exports=function(t,e){var o,u,f,d,h,p,m=t.target,g=t.global,y=t.stat;if(u=g?n:y?n[m]||a(m,{}):n[m]&&n[m].prototype,u)for(f in e){if(h=e[f],t.dontCallGetSet?(p=r(u,f),d=p&&p.value):d=u[f],o=c(g?f:m+(y?".":"#")+f,t.forced),!o&&void 0!==d){if(typeof h==typeof d)continue;l(h,d)}(t.sham||d&&d.sham)&&i(h,"sham",!0),s(u,f,h,t)}}},7055:function(t,e,o){var n=o(9504),r=o(9039),i=o(4576),s=Object,a=n("".split);t.exports=r((function(){return!s("z").propertyIsEnumerable(0)}))?function(t){return"String"===i(t)?a(t,""):s(t)}:s},4376:function(t,e,o){var n=o(4576);t.exports=Array.isArray||function(t){return"Array"===n(t)}},2796:function(t,e,o){var n=o(9039),r=o(4901),i=/#|\.prototype\./,s=function(t,e){var o=l[a(t)];return o===u||o!==c&&(r(e)?n(e):!!e)},a=s.normalize=function(t){return String(t).replace(i,".").toLowerCase()},l=s.data={},c=s.NATIVE="N",u=s.POLYFILL="P";t.exports=s},6198:function(t,e,o){var n=o(8014);t.exports=function(t){return n(t.length)}},741:function(t){var e=Math.ceil,o=Math.floor;t.exports=Math.trunc||function(t){var n=+t;return(n>0?o:e)(n)}},7347:function(t,e,o){var n=o(3724),r=o(9565),i=o(8773),s=o(6980),a=o(5397),l=o(6969),c=o(9297),u=o(5917),f=Object.getOwnPropertyDescriptor;e.f=n?f:function(t,e){if(t=a(t),e=l(e),u)try{return f(t,e)}catch(o){}if(c(t,e))return s(!r(i.f,t,e),t[e])}},8480:function(t,e,o){var n=o(1828),r=o(8727),i=r.concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,i)}},3717:function(t,e){e.f=Object.getOwnPropertySymbols},1828:function(t,e,o){var n=o(9504),r=o(9297),i=o(5397),s=o(9617).indexOf,a=o(421),l=n([].push);t.exports=function(t,e){var o,n=i(t),c=0,u=[];for(o in n)!r(a,o)&&r(n,o)&&l(u,o);while(e.length>c)r(n,o=e[c++])&&(~s(u,o)||l(u,o));return u}},8773:function(t,e){var o={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,r=n&&!o.call({1:2},1);e.f=r?function(t){var e=n(this,t);return!!e&&e.enumerable}:o},5031:function(t,e,o){var n=o(7751),r=o(9504),i=o(8480),s=o(3717),a=o(8551),l=r([].concat);t.exports=n("Reflect","ownKeys")||function(t){var e=i.f(a(t)),o=s.f;return o?l(e,o(t)):e}},5610:function(t,e,o){var n=o(1291),r=Math.max,i=Math.min;t.exports=function(t,e){var o=n(t);return o<0?r(o+e,0):i(o,e)}},5397:function(t,e,o){var n=o(7055),r=o(7750);t.exports=function(t){return n(r(t))}},1291:function(t,e,o){var n=o(741);t.exports=function(t){var e=+t;return e!==e||0===e?0:n(e)}},8014:function(t,e,o){var n=o(1291),r=Math.min;t.exports=function(t){var e=n(t);return e>0?r(e,9007199254740991):0}},4114:function(t,e,o){var n=o(6518),r=o(8981),i=o(6198),s=o(4527),a=o(6837),l=o(9039),c=l((function(){return 4294967297!==[].push.call({length:4294967296},1)})),u=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(t){return t instanceof TypeError}},f=c||!u();n({target:"Array",proto:!0,arity:1,forced:f},{push:function(t){var e=r(this),o=i(e),n=arguments.length;a(o+n);for(var l=0;l<n;l++)e[o]=arguments[l],o++;return s(e,o),o}})}}]);
//# sourceMappingURL=9090.6d94f7d8.js.map