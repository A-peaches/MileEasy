"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[4014],{4014:function(e,t,o){o.r(t),o.d(t,{default:function(){return N}});var s=o(641),i=o(3751),n=o(33);const l=e=>((0,s.Qi)("data-v-69484e70"),e=e(),(0,s.jt)(),e),a={class:"app-container"},r={class:"content cards"},d={class:"header"},c={class:"button-container"},h=l((()=>(0,s.Lk)("span",{class:"arrow"},"❮",-1))),m=l((()=>(0,s.Lk)("div",{class:"actions"},[(0,s.Lk)("h1",{class:"title"},"M-Tip 글작성")],-1))),u={class:"form-group"},p=l((()=>(0,s.Lk)("label",{for:"title"},"제목",-1))),f=l((()=>(0,s.Lk)("label",{for:"category"},"카테고리",-1))),g={class:"drop-category"},k={class:"selected"},w={key:0,class:"dropdown-category",ref:"dropdownMenu"},y={class:"menu-items"},C=["onClick"],L=l((()=>(0,s.Lk)("div",null,[(0,s.Lk)("i",{class:"bi bi-caret-down-fill icon-right"})],-1))),v={class:"form-group content"},b=l((()=>(0,s.Lk)("label",{for:"content"},"내용",-1))),_={class:"form-group file-upload"},F=l((()=>(0,s.Lk)("label",{for:"file"},"첨부파일",-1))),K={class:"p-4"},$=l((()=>(0,s.Lk)("div",{class:"btn-yellow-container"},[(0,s.Lk)("button",{type:"submit",class:"btn-yellow"},"등록")],-1)));function E(e,t,o,l,E,A){return(0,s.uX)(),(0,s.CE)("div",a,[(0,s.Lk)("div",r,[(0,s.Lk)("div",d,[(0,s.Lk)("div",c,[(0,s.Lk)("button",{class:"back-button",onClick:t[0]||(t[0]=(...e)=>A.goBack&&A.goBack(...e))},[h,(0,s.eW)(" 이전 ")])])]),m,(0,s.Lk)("form",{onSubmit:t[6]||(t[6]=(0,i.D$)(((...e)=>A.submitForm&&A.submitForm(...e)),["prevent"]))},[(0,s.Lk)("div",u,[p,(0,s.bo)((0,s.Lk)("input",{type:"text",id:"title","onUpdate:modelValue":t[1]||(t[1]=e=>E.form.title=e),placeholder:"제목을 입력해주세요",class:"title-input"},null,512),[[i.Jo,E.form.title]])]),(0,s.Lk)("div",{class:"form-group",onClick:t[3]||(t[3]=(0,i.D$)(((...e)=>A.toggleCategory&&A.toggleCategory(...e)),["stop"])),ref:"categoryButton"},[f,(0,s.Lk)("div",g,[(0,s.Lk)("div",k,(0,n.v_)(e.selectedCategory||"마일리지를 선택해주세요"),1)]),E.showCategory?((0,s.uX)(),(0,s.CE)("div",w,[(0,s.Lk)("div",y,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(E.mileages,(e=>((0,s.uX)(),(0,s.CE)("a",{class:"dropdown-item",key:e.mile_no,onClick:t=>A.selectCategory(e.mile_no,e.mile_name,t)},(0,n.v_)(e.mile_name)+" 마일리지 ",9,C)))),128)),(0,s.Lk)("a",{class:"dropdown-item",onClick:t[2]||(t[2]=e=>A.selectCategory(null,"기타",e))},"기타")])],512)):(0,s.Q3)("",!0),L],512),(0,s.Lk)("div",v,[b,(0,s.bo)((0,s.Lk)("textarea",{id:"content","onUpdate:modelValue":t[4]||(t[4]=e=>E.form.content=e),placeholder:"내용을 입력해주세요"},null,512),[[i.Jo,E.form.content]])]),(0,s.Lk)("div",_,[F,(0,s.Lk)("div",K,[(0,s.Lk)("div",null,[(0,s.Lk)("input",{type:"file",onChange:t[5]||(t[5]=(...e)=>A.handleFileUpload&&A.handleFileUpload(...e)),class:"md",style:{width:"100%","text-align":"right","padding-right":"70px"}},null,32)])])]),$],32)])])}o(4114);var A=o(7682),B=o(6278),U={name:"NoticeWriteAdminView",data(){return{form:{title:"",mile_no:"",kind:"",file:null,content:"",category:"",selectedKind:""},mileages:[],showCategory:!1,showKind:!1,uploadedFileName:null}},computed:{...(0,B.L8)("login",["getLoginInfo"])},mounted(){this.fetchMileages(),this.setUserInfo(),document.addEventListener("click",this.handleClickOutside)},beforeUnmount(){document.removeEventListener("click",this.handleClickOutside)},methods:{async handleFileUpload(e){const t=e.target.files[0];if(!t)return;const o=new FormData;o.append("files",t);try{const e=await A.A.post("/mtip/upload",o,{headers:{"Content-Type":"multipart/form-data"}}),[t,s]=e.data.split(",");console.log("Saved file name with UUID:",t),console.log("Original file name:",s),this.uploadedFileName=t+","+s,console.log("글쓰기 fileInfo:",this.uploadedFileName),this.displayFileName=s,this.form.file=this.uploadedFileName}catch(s){console.error("파일 업로드 중 오류 발생:",s),this.showAlert("파일 업로드 중 오류가 발생했습니다.","error")}},getDisplayFileName(e){const t=37;return!e||e.length<=t?e:"_"===e.charAt(t-1)?e.substring(t):e},async submitForm(){const e=new FormData;e.append("title",this.form.title),e.append("mile_no",null!==this.form.mile_no?this.form.mile_no:"기타"),e.append("content",this.form.content),e.append("user_no",this.form.user_no),e.append("user_name",this.form.user_name),this.form.file&&(e.append("file",this.form.file),console.log("Form fileInfo:",this.form.file)),this.uploadedFileName&&e.append("file",this.uploadedFileName);try{const t=await A.A.post("/mtip/write",e,{headers:{"Content-Type":"multipart/form-data"}});200===t.status?(this.showAlert("공지사항이 등록되었습니다.","success"),this.$router.push("/M_TipListView")):this.showAlert("공지사항 등록 중 오류가 발생했습니다.","error")}catch(t){console.error("Error submitting form:",t),this.showAlert("공지사항 등록 중 오류가 발생했습니다.","error")}},goBack(){this.$router.go(-1)},toggleCategory(){this.showCategory=!this.showCategory,this.showKind=!1},toggleKind(){this.showKind=!this.showKind,this.showCategory=!1},selectCategory(e,t,o){o&&o.stopPropagation(),this.selectedCategory=null===e?"기타":t,this.form.mile_no=e,this.showCategory=!1},selectKind(e){this.form.kind=e,this.showKind=!1},handleClickOutside(e){this.$refs.dropdownMenu&&!this.$refs.dropdownMenu.contains(e.target)&&this.$refs.categoryButton&&!this.$refs.categoryButton.contains(e.target)&&(this.showCategory=!1),this.$refs.dropdownKindMenu&&!this.$refs.dropdownKindMenu.contains(e.target)&&this.$refs.kindButton&&!this.$refs.kindButton.contains(e.target)&&(this.showKind=!1)},setUserInfo(){const e=this.getLoginInfo;e&&(this.form.user_no=e.user_no,this.form.user_name=e.user_name)},async fetchMileages(){try{const e=await A.A.get("/notice/mileage");this.mileages=e.data}catch(e){console.error("Error fetching mileages:",e.response?e.response.data:e.message)}},showAlert(e,t){this.$swal({title:e,icon:t,confirmButtonText:"확인",confirmButtonColor:"#4b4a4a",allowOutsideClick:!1,allowEscapeKey:!1,allowEnterKey:!1,stopKeydownPropagation:!1,scrollbarPadding:!1,backdrop:!0,didOpen:()=>{document.body.classList.add("no-scroll"),document.documentElement.style.overflow="hidden"},willClose:()=>{document.body.classList.remove("no-scroll"),document.documentElement.style.overflow="",window.scrollTo(0,scrollY)}})},handleClick(e){this.handleClickOutside(e)}},watch:{selectedCategory(e){this.form.category=e}}},I=o(6262);const M=(0,I.A)(U,[["render",E],["__scopeId","data-v-69484e70"]]);var N=M}}]);
//# sourceMappingURL=4014.a241a698.js.map