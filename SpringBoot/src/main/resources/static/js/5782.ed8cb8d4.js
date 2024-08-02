"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[5782],{5782:function(e,t,o){o.r(t),o.d(t,{default:function(){return j}});var n=o(641),r=o(3751),i=o(33);const a=e=>((0,n.Qi)("data-v-67f55eda"),e=e(),(0,n.jt)(),e),s={class:"app-container"},l={class:"content cards"},c={class:"header"},u={class:"button-container"},f=a((()=>(0,n.Lk)("span",{class:"arrow"},"❮",-1))),d=a((()=>(0,n.Lk)("div",{class:"actions"},[(0,n.Lk)("h1",{class:"title"},"공지사항 수정")],-1))),p={class:"form-group"},h=a((()=>(0,n.Lk)("label",{for:"title"},"제목",-1))),m=a((()=>(0,n.Lk)("label",{for:"category"},"카테고리",-1))),g={class:"drop-category"},y={class:"selected"},v={key:0,class:"dropdown-category",ref:"dropdownMenu"},b={class:"menu-items"},k=["onClick"],_=a((()=>(0,n.Lk)("div",null,[(0,n.Lk)("i",{class:"bi bi-caret-down-fill icon-right"})],-1))),w={class:"form-group content"},C=a((()=>(0,n.Lk)("label",{for:"content"},"내용",-1))),L={class:"form-group file-upload"},F=a((()=>(0,n.Lk)("label",{for:"file"},"첨부파일",-1))),x={class:"custom-file-upload"},N={key:0},O={class:"file-info"},E={key:1},I=a((()=>(0,n.Lk)("div",{class:"btn-yellow-container"},[(0,n.Lk)("button",{type:"submit",class:"btn-yellow"},"수정")],-1)));function A(e,t,o,a,A,M){return(0,n.uX)(),(0,n.CE)("div",s,[(0,n.Lk)("div",l,[(0,n.Lk)("div",c,[(0,n.Lk)("div",u,[(0,n.Lk)("button",{class:"back-button",onClick:t[0]||(t[0]=(...e)=>M.goBack&&M.goBack(...e))},[f,(0,n.eW)(" 이전 ")])])]),d,(0,n.Lk)("form",{onSubmit:t[8]||(t[8]=(0,r.D$)(((...e)=>M.submitForm&&M.submitForm(...e)),["prevent"]))},[(0,n.Lk)("div",p,[h,(0,n.bo)((0,n.Lk)("input",{type:"text",id:"title","onUpdate:modelValue":t[1]||(t[1]=e=>A.form.title=e),placeholder:"제목을 입력해주세요",class:"title-input"},null,512),[[r.Jo,A.form.title]])]),(0,n.Lk)("div",{class:"form-group",onClick:t[3]||(t[3]=(0,r.D$)(((...e)=>M.toggleCategory&&M.toggleCategory(...e)),["stop"])),ref:"categoryButton"},[m,(0,n.Lk)("div",g,[(0,n.Lk)("div",y,(0,i.v_)(A.selectedCategory||"마일리지를 선택해주세요"),1)]),A.showCategory?((0,n.uX)(),(0,n.CE)("div",v,[(0,n.Lk)("div",b,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(A.mileages,(e=>((0,n.uX)(),(0,n.CE)("a",{class:"dropdown-item",key:e.mile_no,onClick:t=>M.selectCategory(e.mile_no,e.mile_name,t)},(0,i.v_)(e.mile_name)+" 마일리지 ",9,k)))),128)),(0,n.Lk)("a",{class:"dropdown-item",onClick:t[2]||(t[2]=e=>M.selectCategory(null,"기타",e))},"기타")])],512)):(0,n.Q3)("",!0),_],512),(0,n.Lk)("div",w,[C,(0,n.bo)((0,n.Lk)("textarea",{id:"content","onUpdate:modelValue":t[4]||(t[4]=e=>A.form.content=e),placeholder:"내용을 입력해주세요"},null,512),[[r.Jo,A.form.content]])]),(0,n.Lk)("div",L,[F,(0,n.Lk)("div",x,[A.displayFileName?((0,n.uX)(),(0,n.CE)("div",N,[(0,n.Lk)("div",O,[(0,n.Lk)("span",null,(0,i.v_)(A.displayFileName),1),(0,n.Lk)("button",{onClick:t[5]||(t[5]=(...e)=>M.triggerFileInput&&M.triggerFileInput(...e)),type:"button",class:"file-modify-button"},"파일 수정")]),(0,n.Lk)("input",{type:"file",onChange:t[6]||(t[6]=(...e)=>M.handleFileUpload&&M.handleFileUpload(...e)),ref:"fileInput",style:{display:"none"}},null,544)])):((0,n.uX)(),(0,n.CE)("div",E,[(0,n.Lk)("input",{type:"file",onChange:t[7]||(t[7]=(...e)=>M.handleFileUpload&&M.handleFileUpload(...e)),ref:"fileInput"},null,544)]))])]),I],32)])])}o(4114);var M=o(7682),$=o(6278),P={name:"NoticeModifyAdminView",data(){return{form:{notice_board_no:"",title:"",mile_no:null,file:"",content:"",user_no:"",user_name:""},uploadedFileName:"",displayFileName:"",mileages:[],showCategory:!1,selectedCategory:null}},computed:{...(0,$.L8)("login",["getLoginInfo"]),decodedFileName(){if(this.uploadedFileName){const e=this.uploadedFileName.split("_",2);if(e.length>1)return decodeURIComponent(e[1])}return""}},mounted(){this.fetchNoticeDetails(),this.fetchMileages(),this.setUserInfo(),document.addEventListener("click",this.handleClickOutside)},beforeUnmount(){document.removeEventListener("click",this.handleClickOutside)},methods:{async handleFileUpload(e){const t=e.target.files[0];if(!t)return;const o=new FormData;o.append("files",t);try{const e=await M.A.post("/notice/upload",o,{headers:{"Content-Type":"multipart/form-data"}});console.log("서버 응답:",e.data);const[t,n]=e.data.split(",");console.log("저장된 파일명:",t),console.log("원본 파일명:",n),this.uploadedFileName=t,this.displayFileName=n,this.form.file=t}catch(n){console.error("파일 업로드 중 오류 발생:",n),this.showAlert("파일 업로드 중 오류가 발생했습니다.","error")}},getDisplayFileName(e){const t=37;return!e||e.length<=t?e:"_"===e.charAt(t-1)?e.substring(t):e},async submitForm(){const e=new FormData;e.append("notice_board_no",this.form.notice_board_no),e.append("notice_board_title",this.form.title),e.append("mile_name",this.selectedCategory),e.append("notice_board_content",this.form.content),e.append("user_no",this.form.user_no),e.append("user_name",this.form.user_name),this.form.file?(e.append("file",this.form.file),e.append("originalFileName",this.displayFileName)):this.displayFileName&&e.append("originalFileName",this.displayFileName);for(let[o,n]of e.entries())console.log(`${o}: ${n}`);try{const t=await M.A.post("/notice/update",e,{headers:{"Content-Type":"multipart/form-data"}});console.log("서버 응답:",t.data),200===t.status?(this.showAlert("공지사항이 수정되었습니다.","success"),this.$router.push("/noticeListView")):this.showAlert("공지사항 수정 중 오류가 발생했습니다.","error")}catch(t){console.error("Error submitting form:",t),this.showAlert("공지사항 수정 중 오류가 발생했습니다.","error")}},goBack(){this.$router.go(-1)},toggleCategory(){this.showCategory=!this.showCategory},selectCategory(e,t,o){o&&o.stopPropagation(),this.selectedCategory=t,this.form.mile_no=null===e?"기타":e,this.showCategory=!1},handleClickOutside(e){this.$refs.dropdownMenu&&!this.$refs.dropdownMenu.contains(e.target)&&this.$refs.categoryButton&&!this.$refs.categoryButton.contains(e.target)&&(this.showCategory=!1)},triggerFileInput(){const e=this.$refs.fileInput;e?e.click():console.error("fileInput reference is not available.")},setUserInfo(){const e=this.getLoginInfo;e&&(this.form.user_no=e.user_no,this.form.user_name=e.user_name)},fetchNoticeDetails(){const e=this.$route.params.id;M.A.get(`/notice/${e}`).then((e=>{const t=e.data;this.form.notice_board_no=t.notice_board_no,this.form.title=t.notice_board_title,this.form.mile_no=t.mile_no,this.originalMileNo=t.mile_no,this.selectedCategory=null===t.mile_no?"기타":t.mile_name,this.form.content=t.notice_board_content,this.displayFileName=t.notice_board_file,console.log("detail 에서 정보 가지고 오기.:",t),console.log("수정 카테고리 로그",this.selectedCategory)})).catch((e=>{console.error("Error fetching notice details:",e.response?e.response.data:e.message)}))},async fetchMileages(){try{const e=await M.A.get("/notice/mileage");this.mileages=e.data}catch(e){console.error("Error fetching mileages:",e.response?e.response.data:e.message)}},showAlert(e,t){this.$swal({title:e,icon:t,confirmButtonText:"확인",confirmButtonColor:"#4b4a4a"})}}},U=o(6262);const D=(0,U.A)(P,[["render",A],["__scopeId","data-v-67f55eda"]]);var j=D},9617:function(e,t,o){var n=o(5397),r=o(5610),i=o(6198),a=function(e){return function(t,o,a){var s=n(t),l=i(s);if(0===l)return!e&&-1;var c,u=r(a,l);if(e&&o!==o){while(l>u)if(c=s[u++],c!==c)return!0}else for(;l>u;u++)if((e||u in s)&&s[u]===o)return e||u||0;return!e&&-1}};e.exports={includes:a(!0),indexOf:a(!1)}},4527:function(e,t,o){var n=o(3724),r=o(4376),i=TypeError,a=Object.getOwnPropertyDescriptor,s=n&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}();e.exports=s?function(e,t){if(r(e)&&!a(e,"length").writable)throw new i("Cannot set read only .length");return e.length=t}:function(e,t){return e.length=t}},7740:function(e,t,o){var n=o(9297),r=o(5031),i=o(7347),a=o(4913);e.exports=function(e,t,o){for(var s=r(t),l=a.f,c=i.f,u=0;u<s.length;u++){var f=s[u];n(e,f)||o&&n(o,f)||l(e,f,c(t,f))}}},6837:function(e){var t=TypeError,o=9007199254740991;e.exports=function(e){if(e>o)throw t("Maximum allowed index exceeded");return e}},8727:function(e){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},6518:function(e,t,o){var n=o(4475),r=o(7347).f,i=o(6699),a=o(6840),s=o(9433),l=o(7740),c=o(2796);e.exports=function(e,t){var o,u,f,d,p,h,m=e.target,g=e.global,y=e.stat;if(u=g?n:y?n[m]||s(m,{}):n[m]&&n[m].prototype,u)for(f in t){if(p=t[f],e.dontCallGetSet?(h=r(u,f),d=h&&h.value):d=u[f],o=c(g?f:m+(y?".":"#")+f,e.forced),!o&&void 0!==d){if(typeof p==typeof d)continue;l(p,d)}(e.sham||d&&d.sham)&&i(p,"sham",!0),a(u,f,p,e)}}},7055:function(e,t,o){var n=o(9504),r=o(9039),i=o(4576),a=Object,s=n("".split);e.exports=r((function(){return!a("z").propertyIsEnumerable(0)}))?function(e){return"String"===i(e)?s(e,""):a(e)}:a},4376:function(e,t,o){var n=o(4576);e.exports=Array.isArray||function(e){return"Array"===n(e)}},2796:function(e,t,o){var n=o(9039),r=o(4901),i=/#|\.prototype\./,a=function(e,t){var o=l[s(e)];return o===u||o!==c&&(r(t)?n(t):!!t)},s=a.normalize=function(e){return String(e).replace(i,".").toLowerCase()},l=a.data={},c=a.NATIVE="N",u=a.POLYFILL="P";e.exports=a},6198:function(e,t,o){var n=o(8014);e.exports=function(e){return n(e.length)}},741:function(e){var t=Math.ceil,o=Math.floor;e.exports=Math.trunc||function(e){var n=+e;return(n>0?o:t)(n)}},7347:function(e,t,o){var n=o(3724),r=o(9565),i=o(8773),a=o(6980),s=o(5397),l=o(6969),c=o(9297),u=o(5917),f=Object.getOwnPropertyDescriptor;t.f=n?f:function(e,t){if(e=s(e),t=l(t),u)try{return f(e,t)}catch(o){}if(c(e,t))return a(!r(i.f,e,t),e[t])}},8480:function(e,t,o){var n=o(1828),r=o(8727),i=r.concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,i)}},3717:function(e,t){t.f=Object.getOwnPropertySymbols},1828:function(e,t,o){var n=o(9504),r=o(9297),i=o(5397),a=o(9617).indexOf,s=o(421),l=n([].push);e.exports=function(e,t){var o,n=i(e),c=0,u=[];for(o in n)!r(s,o)&&r(n,o)&&l(u,o);while(t.length>c)r(n,o=t[c++])&&(~a(u,o)||l(u,o));return u}},8773:function(e,t){var o={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,r=n&&!o.call({1:2},1);t.f=r?function(e){var t=n(this,e);return!!t&&t.enumerable}:o},5031:function(e,t,o){var n=o(7751),r=o(9504),i=o(8480),a=o(3717),s=o(8551),l=r([].concat);e.exports=n("Reflect","ownKeys")||function(e){var t=i.f(s(e)),o=a.f;return o?l(t,o(e)):t}},5610:function(e,t,o){var n=o(1291),r=Math.max,i=Math.min;e.exports=function(e,t){var o=n(e);return o<0?r(o+t,0):i(o,t)}},5397:function(e,t,o){var n=o(7055),r=o(7750);e.exports=function(e){return n(r(e))}},1291:function(e,t,o){var n=o(741);e.exports=function(e){var t=+e;return t!==t||0===t?0:n(t)}},8014:function(e,t,o){var n=o(1291),r=Math.min;e.exports=function(e){var t=n(e);return t>0?r(t,9007199254740991):0}},4114:function(e,t,o){var n=o(6518),r=o(8981),i=o(6198),a=o(4527),s=o(6837),l=o(9039),c=l((function(){return 4294967297!==[].push.call({length:4294967296},1)})),u=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},f=c||!u();n({target:"Array",proto:!0,arity:1,forced:f},{push:function(e){var t=r(this),o=i(t),n=arguments.length;s(o+n);for(var l=0;l<n;l++)t[o]=arguments[l],o++;return a(t,o),o}})}}]);
//# sourceMappingURL=5782.ed8cb8d4.js.map