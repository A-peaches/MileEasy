"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[278],{278:function(e,t,s){s.r(t),s.d(t,{default:function(){return Z}});var i=s(641),a=s(33),n=s(3751);const o=e=>((0,i.Qi)("data-v-41edf48d"),e=e(),(0,i.jt)(),e),l=o((()=>(0,i.Lk)("h2",{class:"bold-x-lg mt-5 mb-4",style:{"font-family":"KB_C3"}},[(0,i.eW)(" 문서모아 "),(0,i.Lk)("hr",{class:"mx-auto title-line"})],-1))),c={class:"category-button list-wrapper-category"},r={key:0,class:"dropdown-menu",ref:"dropdownMenu"},u={class:"menu-items"},d=["onClick"],h={class:"d-flex justify-content-between align-items-center document-menu"},g={class:"lg2 document-count"},m={class:"input-search input-base search-mobile"},p={class:"d-flex justify-content-between align-items-center search-wrapper"},y=o((()=>(0,i.Lk)("button",null,[(0,i.Lk)("i",{class:"bi bi-search mr-2"})],-1))),f={key:0,class:"pr-5 pl-5 pb-5 pt-2 document-container"},k={class:"d-flex align-items-center justify-content-between list-container"},C={style:{width:"90%","text-align":"left"}},w={class:"d-flex align-items-center justify-content-start"},b={key:0,style:{width:"5%","padding-left":"3%"}},P=o((()=>(0,i.Lk)("span",{class:"",style:{color:"#edbb00","font-family":"'KB_C2'","font-size":"11pt"}},"NEW",-1))),D=[P],L={class:"d-flex align-items-center justify-content-between",style:{width:"100%"}},v={class:"pl-1 document-category"},_={class:"lg2 document-title"},M={key:0},x={class:"md mr-5 document-date"},E=["onClick"],Q={key:0},I=o((()=>(0,i.Lk)("span",{class:"md download-font",style:{"text-align":"right"}},"파일 다운로드 〉",-1))),S=[I],X={key:1},B=o((()=>(0,i.Lk)("span",{class:"md download-font",style:{"text-align":"right"}},[(0,i.Lk)("i",{class:"bi bi-download"})],-1))),$=[B],A={key:1,style:{"padding-top":"10vh"}},T=o((()=>(0,i.Lk)("p",{class:"lg2",style:{"text-align":"center",color:"#aeaeb2","font-family":"KB_C2"}}," 검색 결과가 없습니다. ",-1))),j=[T],H={class:"pagination"},K=["disabled"],F=["onClick"],Y=["disabled"];function N(e,t,s,o,P,I){return(0,i.uX)(),(0,i.CE)("div",{class:"cards page-back mx-auto",style:(0,a.Tr)({height:I.computedHeight})},[l,(0,i.Lk)("div",{onClick:t[1]||(t[1]=(0,n.D$)(((...e)=>I.toggleCategory&&I.toggleCategory(...e)),["stop"])),class:"QnA",ref:"categoryButton"},[(0,i.Lk)("div",c,(0,a.v_)(P.selectedCategory?P.selectedCategory:"카테고리"),1),P.showCategory?((0,i.uX)(),(0,i.CE)("div",r,[(0,i.Lk)("div",u,[(0,i.Lk)("a",{class:"dropdown-item",onClick:t[0]||(t[0]=e=>I.filterByCategory(null))},"전체"),((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(P.mileages,(e=>((0,i.uX)(),(0,i.CE)("a",{class:"dropdown-item",key:e.mile_no,onClick:t=>I.filterByCategory(e.mile_name)},(0,a.v_)(e.mile_name)+" 마일리지 ",9,d)))),128))])],512)):(0,i.Q3)("",!0)],512),(0,i.Lk)("div",h,[(0,i.Lk)("div",g,"총 "+(0,a.v_)(P.countList)+"건",1),(0,i.Lk)("div",m,[(0,i.Lk)("div",p,[(0,i.bo)((0,i.Lk)("input",{type:"text","onUpdate:modelValue":t[2]||(t[2]=e=>P.searchQuery=e),onInput:t[3]||(t[3]=(...e)=>I.onSearch&&I.onSearch(...e)),placeholder:"검색어를 입력하세요",class:"w-100 h-100 d-inline-block",style:{"text-align":"left"}},null,544),[[n.Jo,P.searchQuery]]),y])])]),I.filteredDocuments.length>0?((0,i.uX)(),(0,i.CE)("div",f,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(I.paginatedDocuments,(e=>((0,i.uX)(),(0,i.CE)("div",{key:e.documnet_mile_no,class:"mx-auto mb-4 border-bottom p-4 input-base input-white list-wrapper"},[(0,i.Lk)("div",k,[(0,i.Lk)("button",C,[(0,i.Lk)("div",w,[I.isNew(e.document_date)&&!P.isMobile?((0,i.uX)(),(0,i.CE)("div",b,D)):(0,i.Q3)("",!0),(0,i.Lk)("div",L,[(0,i.Lk)("span",v,(0,a.v_)(e.mile_name),1),(0,i.Lk)("span",_,(0,a.v_)(e.document_file),1),P.isMobile?(0,i.Q3)("",!0):((0,i.uX)(),(0,i.CE)("div",M,[(0,i.Lk)("span",x,(0,a.v_)(I.formatDate(e.document_date)),1)]))])])]),(0,i.Lk)("button",{onClick:(0,n.D$)((t=>I.downloadDocu(e.document_file)),["stop"])},[P.isMobile?((0,i.uX)(),(0,i.CE)("div",X,$)):((0,i.uX)(),(0,i.CE)("div",Q,S))],8,E)])])))),128))])):((0,i.uX)(),(0,i.CE)("div",A,j)),(0,i.Lk)("div",H,[(0,i.Lk)("button",{onClick:t[4]||(t[4]=(...e)=>I.prevPage&&I.prevPage(...e)),disabled:1===P.currentPage},"〈",8,K),((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(P.searchPages,(e=>((0,i.uX)(),(0,i.CE)("button",{key:e,onClick:t=>I.goToPage(e),class:(0,a.C4)({active:P.currentPage===e})},(0,a.v_)(e),11,F)))),128)),(0,i.Lk)("button",{onClick:t[5]||(t[5]=(...e)=>I.nextPage&&I.nextPage(...e)),disabled:P.currentPage===P.searchPages}," 〉 ",8,Y)])],4)}s(4114);var V=s(6278),W=s(7682),z=s(5093),J=s.n(z),O=s(1179),U=s.n(O),q={name:"DocumentsView",data(){return{mileages:[],baseHeight:90,increment:10,buttonHeight:10,searchQuery:"",currentPage:1,itemsPerPage:7,allDocuments:[],countList:0,lastInputTime:0,selectedCategory:"",showCategory:!1,totalPages:0,isMobile:!1,searchPages:0,lastSearchQuery:""}},computed:{...(0,V.L8)("login",["getLoginInfo"]),...(0,V.L8)("mileExcel",["getArrayMileDocument","getDocumentSum"]),computedHeight(){if(this.isMobile)return"110vh";{let e=this.baseHeight+this.paginatedDocuments.length*this.increment;return this.paginatedDocuments.length%this.itemsPerPage===0&&this.paginatedDocuments.length,e+=this.buttonHeight/2,`${e}vh`}},documentSum(){return this.getDocumentSum},filteredDocuments(){let e=this.allDocuments;this.selectedCategory&&"null"!==this.selectedCategory&&(e=e.filter((e=>e.mile_name===this.selectedCategory)));const t=this.searchQuery.toLowerCase();return e.filter((e=>e.document_file.toLowerCase().includes(t)))},paginatedDocuments(){return this.filteredDocuments.slice((this.currentPage-1)*this.itemsPerPage,this.currentPage*this.itemsPerPage)},totalFilteredPages(){return Math.ceil(this.filteredDocuments.length/this.itemsPerPage)}},methods:{...(0,V.i0)("mile",["fetchMileInfo","getMileDetail"]),...(0,V.i0)("mileExcel",["downloadDocument"]),...(0,V.i0)("mileDocument",["fetchMileDocument"]),formatDate(e){return J()(e).format("YYYY-MM-DD")},isNew(e){const t=J()(e),s=J()(),i=J()().subtract(7,"days");return t.isBetween(i,s,null,"[]")},showAlert(e,t,s){this.$swal({title:e,icon:t,scrollbarPadding:!1}).then((e=>{e.isConfirmed&&("#"==s?location.reload():this.$router.push(s))}))},downloadDocu(e){this.downloadDocument({document_file:e})},async loadDocuments(){const e=await this.fetchMileDocument();this.allDocuments=e.data;const t=await W.A.get("/myMile/countListDocuments");this.countList=t.data,this.totalPages=Math.ceil(this.countList/this.itemsPerPage),this.updateSearchPages()},updateSearchPages(){this.searchPages=Math.ceil(this.filteredDocuments.length/this.itemsPerPage)},onSearch(){const e=Date.now(),t=e-this.lastInputTime;t>500&&(this.lastInputTime=e,this.searchQuery!==this.lastSearchQuery&&(this.currentPage=1,this.lastSearchQuery=this.searchQuery),this.updateSearchPages())},async fetchMileages(){try{const e=await W.A.get("/notice/mileage");console.log("Fetched mileages:",e.data),this.mileages=e.data}catch(e){console.error("Error fetching mileages:",e.response?e.response.data:e.message)}},toggleCategory(){this.showCategory=!this.showCategory},closeDropdown(){this.showCategory=!1},handleClickOutside(e){this.$refs.dropdownMenu&&!this.$refs.dropdownMenu.contains(e.target)&&this.$refs.categoryButton&&!this.$refs.categoryButton.contains(e.target)&&this.closeDropdown()},filterByCategory(e){this.selectedCategory=null!==e?e:"",this.currentPage=1,this.loadDocuments()},prevPage(){this.currentPage>1&&(this.currentPage--,this.loadDocuments())},nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadDocuments())},goToPage(e){this.currentPage=e,this.loadDocuments()}},created(){const e=this.getLoginInfo?this.getLoginInfo.user_no:null;e?this.fetchMileInfo(e):console.error("user_no이 유효하지 않습니다."),this.loadDocuments(),this.fetchMileages()},mounted(){const e=new(U())(window.navigator.userAgent);this.isMobile=null!==e.mobile()},watch:{searchQuery(){this.lastInputTime=Date.now(),this.onSearch()},filteredDocuments(){this.updateSearchPages()}}},G=s(6262);const R=(0,G.A)(q,[["render",N],["__scopeId","data-v-41edf48d"]]);var Z=R}}]);
//# sourceMappingURL=278.22032440.js.map