"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[3235],{3235:function(e,t,i){i.r(t),i.d(t,{default:function(){return Ne}});var a=i(641),s=i(33);const n=e=>((0,a.Qi)("data-v-9b0448f8"),e=e(),(0,a.jt)(),e),o={class:"cards page-back mx-auto",style:{color:"#4b4a4a"}},l={class:"d-flex"},c={class:"back-container"},r=n((()=>(0,a.Lk)("span",{class:"arrow"},"❮",-1))),u={class:"input-base input-search d-flex justify-content-center mx-auto my-3",style:{width:"600px",background:"#ebebeb"}};function d(e,t,i,n,d,m){return(0,a.uX)(),(0,a.CE)("div",o,[(0,a.Lk)("div",l,[(0,a.Lk)("div",c,[(0,a.Lk)("button",{class:"back-button",onClick:t[0]||(t[0]=(...e)=>m.goBack&&m.goBack(...e))},[r,(0,a.eW)(" 이전 ")])])]),(0,a.Lk)("h2",{class:"bold-x-lg mb-5 ml-5 help-icon",ref:"helpIcon",style:{"font-family":"KB_C3"}},(0,s.v_)(d.mile_name)+" 마일리지 ",513),(0,a.Lk)("div",u,[(0,a.Lk)("button",{class:(0,s.C4)(["tab-container lg3 fw-bold",{active:"status"===d.activeTab}]),onClick:t[1]||(t[1]=e=>m.setActiveTab("status"))}," 취득현황 ",2),(0,a.Lk)("button",{class:(0,s.C4)(["tab-container lg3 fw-bold",{active:"intro"===d.activeTab}]),onClick:t[2]||(t[2]=e=>m.setActiveTab("intro"))}," 마일리지 소개 ",2),(0,a.Lk)("button",{class:(0,s.C4)(["tab-container lg3 fw-bold",{active:"documents"===d.activeTab}]),onClick:t[3]||(t[3]=e=>m.setActiveTab("documents"))}," 마일리지 문서 ",2)]),((0,a.uX)(),(0,a.Wv)((0,a.$y)(m.currentComponent),{mile_no:i.mile_no,onDataLoaded:m.handleDataLoaded,class:"my-5"},null,40,["mile_no","onDataLoaded"]))])}var m=i(6278),h=i(3751);const g=e=>((0,a.Qi)("data-v-096c5643"),e=e(),(0,a.jt)(),e),p={class:"page-back mx-auto"},f={class:"d-flex justify-content-between align-items-center"},b={class:"lg2 document-count"},k={class:"input-search input-base search-mobile"},v={class:"d-flex justify-content-between align-items-center search-wrapper"},y=g((()=>(0,a.Lk)("button",null,[(0,a.Lk)("i",{class:"bi bi-search mr-2"})],-1))),_={key:0,class:"pr-5 pl-5 pb-5 pt-4 document-container"},L={class:"d-flex align-items-center justify-content-between list-container"},w={class:"left-wrapper"},C={class:"d-flex align-items-center justify-content-start"},D={key:0,style:{width:"5%","padding-left":"3%"}},P=g((()=>(0,a.Lk)("span",{class:"",style:{color:"#edbb00","font-family":"'KB_C2'","font-size":"11pt"}},"NEW",-1))),M=[P],x={class:"d-flex align-items-center justify-content-between",style:{width:"100%"}},S={class:"lg2 document-title"},E={class:"md mr-5 document-date"},I=["onClick"],X={key:0},T=g((()=>(0,a.Lk)("span",{class:"md download-font",style:{"text-align":"right"}},"파일 다운로드 〉",-1))),A=[T],Q={key:1},j=g((()=>(0,a.Lk)("span",{class:"md download-font",style:{"text-align":"right"}},[(0,a.Lk)("i",{class:"bi bi-download"})],-1))),F=[j],$={key:1,style:{"padding-top":"10vh"}},z=g((()=>(0,a.Lk)("p",{class:"lg2",style:{"text-align":"center",color:"#aeaeb2","font-family":"KB_C2"}},"검색 결과가 없습니다.",-1))),B=[z],K={class:"pagination-container"},W={class:"pagination"},H=["disabled"],N=["onClick"],U=["disabled"];function Y(e,t,i,n,o,l){return(0,a.uX)(),(0,a.CE)("div",p,[(0,a.Lk)("div",f,[(0,a.Lk)("div",b,"총 "+(0,s.v_)(l.documentSum)+"건",1),(0,a.Lk)("div",k,[(0,a.Lk)("div",v,[(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>o.searchQuery=e),onInput:t[1]||(t[1]=(...e)=>l.onSearch&&l.onSearch(...e)),placeholder:"검색어를 입력하세요",class:"w-100 h-100 d-inline-block",style:{"text-align":"left"}},null,544),[[h.Jo,o.searchQuery]]),y])])]),l.filteredDocuments.length>0?((0,a.uX)(),(0,a.CE)("div",_,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(l.paginatedDocuments,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.document_mile_no,class:"mx-auto mb-4 border-bottom p-4 input-base input-white list-wrapper"},[(0,a.Lk)("div",L,[(0,a.Lk)("button",w,[(0,a.Lk)("div",C,[l.isNew(e.document_date)&&!o.isMobile?((0,a.uX)(),(0,a.CE)("div",D,M)):(0,a.Q3)("",!0),(0,a.Lk)("div",x,[(0,a.Lk)("span",S,(0,s.v_)(e.document_file),1),(0,a.Lk)("span",E,(0,s.v_)(l.formatDate(e.document_date)),1)])])]),(0,a.Lk)("button",{onClick:(0,h.D$)((t=>l.downloadDocu(e.document_file)),["stop"])},[o.isMobile?((0,a.uX)(),(0,a.CE)("div",Q,F)):((0,a.uX)(),(0,a.CE)("div",X,A))],8,I)])])))),128))])):((0,a.uX)(),(0,a.CE)("div",$,B)),(0,a.Lk)("div",K,[(0,a.Lk)("div",W,[(0,a.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>l.prevPage&&l.prevPage(...e)),disabled:1===o.currentPage},"〈",8,H),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(o.searchPages,(e=>((0,a.uX)(),(0,a.CE)("button",{key:e,onClick:t=>l.goToPage(e),class:(0,s.C4)({active:o.currentPage===e})},(0,s.v_)(e),11,N)))),128)),(0,a.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>l.nextPage&&l.nextPage(...e)),disabled:o.currentPage===o.searchPages}," 〉 ",8,U)])])])}var V=i(5093),q=i.n(V),J=i(1179),G=i.n(J),O={name:"AttendanceCom",props:["mile_no"],data(){return{file:null,baseHeight:500,increment:90,buttonHeight:150,searchQuery:"",currentPage:1,itemsPerPage:7,allDocuments:[],countList:0,lastInputTime:0,isMobile:!1,totalPages:0,searchPages:0,lastSearchQuery:""}},computed:{...(0,m.L8)("login",["getLoginInfo"]),...(0,m.L8)("mileExcel",["getDocumentSum"]),computedHeight(){if(this.isMobile)return"1100px";{let e=this.baseHeight+this.paginatedDocuments.length*this.increment;return this.paginatedDocuments.length%this.itemsPerPage===0&&this.paginatedDocuments.length,e+=this.buttonHeight/2,`${e}px`}},documentSum(){return this.getDocumentSum},filteredDocuments(){let e=this.allDocuments;const t=this.searchQuery.toLowerCase();return e.filter((e=>e.document_file.toLowerCase().includes(t)))},paginatedDocuments(){return this.filteredDocuments.slice((this.currentPage-1)*this.itemsPerPage,this.currentPage*this.itemsPerPage)},totalFilteredPages(){return Math.ceil(this.filteredDocuments.length/this.itemsPerPage)}},watch:{searchQuery(){this.lastInputTime=Date.now(),this.onSearch()},filteredDocuments(){this.updateSearchPages()}},methods:{...(0,m.i0)("mileExcel",["mileDocumentsTotal","getMileDocumentSum","downloadDocument"]),downloadDocu(e){this.downloadDocument({document_file:e})},formatDate(e){return q()(e).format("YYYY-MM-DD")},isNew(e){const t=q()(e),i=q()(),a=q()().subtract(7,"days");return t.isBetween(a,i,null,"[]")},async loadDocuments(){const e=await this.mileDocumentsTotal(this.mile_no);this.allDocuments=e.data,0!=this.allDocuments.length&&null!=this.allDocuments||console.error("불러올 문서가 존재하지 않습니다."),this.getMileDocumentSum(this.mile_no),this.totalPages=Math.ceil(this.documentSum/this.itemsPerPage),this.updateSearchPages()},updateSearchPages(){this.searchPages=Math.ceil(this.filteredDocuments.length/this.itemsPerPage)},onSearch(){const e=Date.now(),t=e-this.lastInputTime;t>500&&(this.lastInputTime=e,this.searchQuery!==this.lastSearchQuery&&(this.currentPage=1,this.lastSearchQuery=this.searchQuery),this.updateSearchPages())},prevPage(){this.currentPage>1&&(this.currentPage--,this.loadDocuments())},nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadDocuments())},goToPage(e){this.currentPage=e,this.loadDocuments()}},created(){this.mile_no?this.loadDocuments():console.error("mile_no이 유효하지 않습니다.")},mounted(){const e=new(G())(window.navigator.userAgent);this.isMobile=null!==e.mobile()}},R=i(6262);const Z=(0,R.A)(O,[["render",Y],["__scopeId","data-v-096c5643"]]);var ee=Z;const te=e=>((0,a.Qi)("data-v-9928a768"),e=e(),(0,a.jt)(),e),ie={class:"mile-card-content"},ae={class:"mile-title"},se={class:"mile-content-container"},ne={class:"mile-content"},oe={class:"mile-content-text"},le={class:"mile-detail-button"},ce=["onClick"],re=te((()=>(0,a.Lk)("p",null,"상세보기 〉",-1))),ue=[re];function de(e,t,i,n,o,l){return(0,a.uX)(),(0,a.CE)("div",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(l.arrayMiles,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.mile_introduce_no,class:"mile-card"},[(0,a.Lk)("div",ie,[(0,a.Lk)("h3",ae,(0,s.v_)(e.mile_title)+" 마일리지",1),(0,a.Lk)("div",se,[(0,a.Lk)("div",ne,[(0,a.Lk)("pre",oe,(0,s.v_)(e.mile_content),1)]),(0,a.Lk)("div",le,[e.mile_route?((0,a.uX)(),(0,a.CE)("button",{key:0,onClick:t=>l.download(e.mile_route),class:"detail-button text-brown"},ue,8,ce)):(0,a.Q3)("",!0)])])])])))),128))])}i(4114);var me={name:"MileDocument",props:["mile_no"],data(){return{}},methods:{...(0,m.i0)("mile",["getMileDetail","downloadFile"]),showAlert(e,t,i){this.$swal({title:e,icon:t,scrollbarPadding:!1}).then((e=>{e.isConfirmed&&("#"==i?location.reload():this.$router.push(i))}))},download(e){this.downloadFile({mile_route:e})}},async created(){this.mile_no?(this.arrayMiles=await this.getMileDetail(this.mile_no),console.log("이건 가져온 마일리지 소개글",this.arrayMiles),0==this.arrayMiles.length&&this.showAlert("등록된 마일리지 소개 글이 없습니다","warning","/myMileageView")):console.error("mile_no이 유효하지 않습니다.")},mounted(){console.log("Mile No:",this.mile_no)},computed:{...(0,m.L8)("login",["getLoginInfo"]),...(0,m.L8)("mile",["getArrayMiles"]),arrayMiles(){return this.getArrayMiles}},watch:{}};const he=(0,R.A)(me,[["render",de],["__scopeId","data-v-9928a768"]]);var ge=he;const pe=e=>((0,a.Qi)("data-v-0a8daa00"),e=e(),(0,a.jt)(),e),fe={class:"mx-auto",style:{color:"#4b4a4a"}},be={key:0,class:"row",style:{"margin-left":"7%","margin-right":"7%","margin-top":"7%"}},ke={class:"cards fade-up-item mx-3",style:{"background-color":"#f9f9f9",height:"200px",position:"relative"}},ve={class:"flex-between"},ye={class:"flex mb-2"},_e={class:"text-start KB_C3 fw-bolder",style:{"font-size":"16pt",margin:"0"}},Le={class:"justify-content-between align-items-center mt-3"},we={class:"w-100"},Ce={key:0,class:"mb-5"},De=pe((()=>(0,a.Lk)("i",{class:"bi bi-caret-up-fill",style:{color:"#ff5c5c","font-size":"25pt"}},null,-1))),Pe=[De],Me={key:1},xe=pe((()=>(0,a.Lk)("span",{class:"fw-bold",style:{color:"#ffa15c","font-size":"25pt"}}," - ",-1))),Se=[xe],Ee={key:2},Ie=pe((()=>(0,a.Lk)("i",{class:"bi bi-caret-down-fill",style:{color:"#4d7eff","font-size":"25pt"}},null,-1))),Xe=[Ie],Te={class:"KB_C2",style:{"font-size":"32pt"}},Ae={class:"",style:{color:"gray"}},Qe={key:0,class:"text-star",style:{"font-size":"10pt",color:"gray","margin-top":"35px"}},je={key:1,class:"text-star",style:{"font-size":"9pt",color:"gray","margin-top":"20px"}},Fe=pe((()=>(0,a.Lk)("br",null,null,-1)));function $e(e,t,i,n,o,l){return(0,a.uX)(),(0,a.CE)("div",null,[(0,a.Lk)("div",fe,[o.dataLoaded&&l.filteredMileStatus.length>0?((0,a.uX)(),(0,a.CE)("div",be,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(l.filteredMileStatus,((e,t)=>((0,a.uX)(),(0,a.CE)("div",{key:t,class:"col-6 mb-3"},[(0,a.Lk)("div",ke,[(0,a.Lk)("div",ve,[(0,a.Lk)("div",ye,[(0,a.Lk)("div",_e,(0,s.v_)(e.score_name),1)])]),(0,a.Lk)("div",Le,[(0,a.Lk)("div",we,[e.user_point-e.prev_point>0?((0,a.uX)(),(0,a.CE)("span",Ce,Pe)):e.user_point-e.prev_point==0?((0,a.uX)(),(0,a.CE)("span",Me,Se)):e.user_point-e.prev_point<0?((0,a.uX)(),(0,a.CE)("span",Ee,Xe)):(0,a.Q3)("",!0),(0,a.Lk)("span",Te,(0,s.v_)(e.user_point)+"pt",1),(0,a.eW)("   "),(0,a.Lk)("span",Ae,"("+(0,s.v_)(e.user_point-e.prev_point)+"pt 증가)",1)])]),l.isMobile?((0,a.uX)(),(0,a.CE)("div",je,[(0,a.eW)(" 과거 업데이트 : "+(0,s.v_)(e.prev_date)+" ",1),Fe,(0,a.eW)(" 최신 업데이트 : "+(0,s.v_)(e.mile_date),1)])):((0,a.uX)(),(0,a.CE)("div",Qe," ( 과거 업데이트 일자 : "+(0,s.v_)(e.prev_date)+" / 최신 업데이트 일자 : "+(0,s.v_)(e.mile_date)+" ) ",1))])])))),128))])):(0,a.Q3)("",!0)])])}var ze={name:"AttendanceCom",props:["mile_no"],data(){return{dataLoaded:!1}},methods:{...(0,m.i0)("mileScore",["getMyMileStatus"]),setTransitionDelay(e,t){e.style.setProperty("--index",t)},applyFadeUpEffect(){console.log("Applying fade-up effect");const e=this.$el.querySelectorAll(".fade-up-item");console.log(`Found ${e.length} items to animate`),e.forEach(((t,i)=>{t.style.setProperty("--index",i),t.style.setProperty("z-index",e.length-i);const a=50,s=a+50*i;setTimeout((()=>{t.classList.add("fade-up-active")}),s)}))},async loadData(){try{const e=this.getLoginInfo;e&&e.user_no&&(await this.getMyMileStatus({user_no:e.user_no,mile_no:this.mile_no}),console.log("상속:",this.getMileStatus[0].mile_name),this.$emit("data-loaded",this.getMileStatus[0].mile_name),this.dataLoaded=!0,this.$nextTick((()=>{this.applyFadeUpEffect()})))}catch(e){console.error("Error loading data:",e)}}},mounted(){this.loadData().then((()=>{this.$nextTick((()=>{this.applyFadeUpEffect()}))}))},computed:{...(0,m.L8)("login",["getLoginInfo"]),...(0,m.L8)("mileScore",["getMileStatus"]),isMobile(){return window.innerWidth<=768},filteredMileStatus(){const e=this.getLoginInfo?this.getLoginInfo.job_no:null;return e?this.getMileStatus.filter((t=>"개인"===e?"공통"===t.job_name||"개인"===t.job_name:"기업"!==e||("공통"===t.job_name||"기업"===t.job_name))):[]}}};const Be=(0,R.A)(ze,[["render",$e],["__scopeId","data-v-0a8daa00"]]);var Ke=Be,We={name:"MileageDetailView",components:{MileDocument:ee,MileIntro:ge,MileStatusCom:Ke},props:["mile_no"],data(){return{activeTab:"status",mile_name:null}},methods:{...(0,m.i0)("hitMile",["hit_mile"]),checkLoginInfo(){(!this.getLoginInfo||this.getLoginInfo&&1==this.getIsChecked)&&(window.location.href="/noAccess")},setActiveTab(e){this.activeTab=e},goBack(){this.$router.go(-1)},handleDataLoaded(e){this.mile_name=e,console.log("Loaded data from child:",e)}},mounted(){console.log("Mile No:",this.mile_no)},computed:{...(0,m.L8)("login",["getLoginInfo","getIsChecked"]),currentComponent(){switch(this.activeTab){case"status":return"MileStatusCom";case"intro":return"MileIntro";case"documents":return"MileDocument";default:return"MileStatusCom"}},watch:{}},created(){this.checkLoginInfo(),this.hit_mile(this.mile_no)}};const He=(0,R.A)(We,[["render",d],["__scopeId","data-v-9b0448f8"]]);var Ne=He}}]);
//# sourceMappingURL=3235.1c45eb67.js.map