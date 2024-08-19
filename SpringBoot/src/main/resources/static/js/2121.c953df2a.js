"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[2121],{2121:function(e,t,o){o.r(t),o.d(t,{default:function(){return $}});var n=o(641),a=o(33);const s=e=>((0,n.Qi)("data-v-a50987b4"),e=e(),(0,n.jt)(),e),i={class:"cards page-back mx-auto"},l={class:"bold-x-lg mt-5",style:{"font-family":"KB_C3","margin-bottom":"80px",position:"relative"}},r={class:"popover-content"},h={class:"popover-title"},c={class:"popover-table"},p=s((()=>(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",null,"마일리지명"),(0,n.Lk)("th",null,"가중치")])],-1))),g={class:"date-download-container"},u={class:"table-responsive"},d=s((()=>(0,n.Lk)("div",{class:"text-start text-gray mx-auto mt-3 custom-caption",style:{width:"90%"}},[(0,n.eW)(" * 본 데이터는 지역영업그룹별 가중치가 적용된 점수입니다. "),(0,n.Lk)("br"),(0,n.eW)(" * 마일리지는 기준일자의 마일리지 점수로 책정됩니다. 마일리지별 업데이트 날짜가 상이할 수 있습니다. ")],-1))),k={class:"table table-hover custom-table mx-auto",style:{width:"90%"}},m=s((()=>(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",null,"마일리지 순위"),(0,n.Lk)("th",null,"직원번호"),(0,n.Lk)("th",null,"직원명"),(0,n.Lk)("th",null,"마일리지 합계")])],-1))),L={class:"rank-badge"},v={key:0},P={class:"pagination-container"},f={class:"pagination"},_=["disabled"],b=["onClick"],w=["disabled"];function y(e,t,o,s,y,C){const D=(0,n.g2)("Datepicker");return(0,n.uX)(),(0,n.CE)("div",i,[(0,n.Lk)("h2",l,[(0,n.eW)((0,a.v_)(e.getLoginInfo?.group_name)+" 마일리지 관리 ",1),(0,n.Lk)("i",{class:"bi bi-question-circle help-icon",onClick:t[0]||(t[0]=(...e)=>C.toggleHelpPopover&&C.toggleHelpPopover(...e)),style:{"font-size":"22pt"},ref:"helpIcon"},null,512),y.showHelpPopover?((0,n.uX)(),(0,n.CE)("div",{key:0,class:"help-popover",ref:"helpPopover",style:(0,a.Tr)(y.popoverStyle)},[(0,n.Lk)("div",r,[(0,n.Lk)("h5",h,(0,a.v_)(e.getLoginInfo?.group_name)+" 현재 가중치",1),(0,n.Lk)("table",c,[p,(0,n.Lk)("tbody",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(y.groupWeight,(e=>((0,n.uX)(),(0,n.CE)("tr",{key:e.group_name},[(0,n.Lk)("td",null,(0,a.v_)(e?.mile_name),1),(0,n.Lk)("td",null,(0,a.v_)(e?.weight),1)])))),128))])])])],4)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",g,[(0,n.bF)(D,{modelValue:y.selectedDate,"onUpdate:modelValue":t[1]||(t[1]=e=>y.selectedDate=e),format:C.formatDate,class:"custom-datepicker"},null,8,["modelValue","format"]),(0,n.Lk)("i",{class:"bi bi-download download-icon",onClick:t[2]||(t[2]=(...e)=>C.downloadExcel&&C.downloadExcel(...e))})]),(0,n.Lk)("div",u,[d,(0,n.Lk)("table",k,[m,(0,n.Lk)("tbody",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(C.paginatedGroupList,(e=>((0,n.uX)(),(0,n.CE)("tr",{key:e.user_no,class:(0,a.C4)({"top-three":e?.user_rank<=3})},[(0,n.Lk)("td",null,[(0,n.Lk)("span",L,(0,a.v_)(e?.user_rank)+"위",1)]),(0,n.Lk)("td",null,(0,a.v_)(e?.user_no),1),(0,n.Lk)("td",null,[e.user_rank<=3?((0,n.uX)(),(0,n.CE)("span",v,"👑")):(0,n.Q3)("",!0),(0,n.eW)(" "+(0,a.v_)(e?.user_name),1)]),(0,n.Lk)("td",null,[(0,n.Lk)("strong",null,(0,a.v_)(e?.total_sum)+"점",1)])],2)))),128))])])]),(0,n.Lk)("div",P,[(0,n.Lk)("div",f,[(0,n.Lk)("button",{onClick:t[3]||(t[3]=e=>C.changePage(y.currentPage-1)),disabled:1===y.currentPage,class:"arrow-button"},"<",8,_),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(C.displayedPages,(e=>((0,n.uX)(),(0,n.CE)("button",{key:e,onClick:t=>C.changePage(e),class:(0,a.C4)({active:y.currentPage===e})},(0,a.v_)(e),11,b)))),128)),(0,n.Lk)("button",{onClick:t[4]||(t[4]=e=>C.changePage(y.currentPage+1)),disabled:y.currentPage===C.totalPages,class:"arrow-button"},">",8,w)])])])}var C=o(6652),D=o(6278),I=o(7682),E=o(3959),x={name:"GroupManagement",components:{Datepicker:C.A},data(){return{selectedDate:new Date((new Date).setDate((new Date).getDate()-1)),groupList:[],currentPage:1,itemsPerPage:15,showHelpPopover:!1,groupWeight:[],popoverStyle:{}}},created(){this.checkLoginInfo()},computed:{...(0,D.L8)("login",["getLoginInfo","getIsChecked"]),loginInfo(){return this.getLoginInfo},paginatedGroupList(){const e=(this.currentPage-1)*this.itemsPerPage,t=e+this.itemsPerPage;return this.groupList.slice(e,t)},totalPages(){return Math.ceil(this.groupList.length/this.itemsPerPage)},displayedPages(){const e=2;let t=Math.max(1,this.currentPage-e),o=Math.min(this.totalPages,this.currentPage+e);return o-t+1<2*e+1&&(1===t?o=Math.min(t+2*e,this.totalPages):t=Math.max(o-2*e,1)),Array.from({length:o-t+1},((e,o)=>t+o))}},methods:{checkLoginInfo(){(!this.getLoginInfo||this.getLoginInfo&&1==this.getIsChecked||0==this.getLoginInfo.is_hr)&&(window.location.href="/noAccess")},formatDate(e){const t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${n}`},async fetchData(){try{const e=await I.A.get("/group/getUsersRank",{params:{date:this.formatDate(this.selectedDate),group_no:this.getLoginInfo.group_no}});console.log(e.data,"그룹데이터"),this.groupList=e.data}catch(e){console.error("데이터 불러오기 실패:",e)}},changePage(e){e>=1&&e<=this.totalPages&&(this.currentPage=e)},downloadExcel(){const e=this.groupList.map((e=>({"마일리지 순위":e.user_rank,"직원번호":e.user_no,"직원명":e.user_name,"마일리지 합계":e.total_sum,HotTip:e.HotTip,"BEST Branch":e["BEST Branch"],"BEST PG":e["BEST PG"],"Monthly Base":e["Monthly Base"],"Monthly Best":e["Monthly Best"],"리그 테이블":e["리그 테이블"],HRD:e.HRD,"소비자 지원":e["소비자 지원"]}))),t=E.Wp.json_to_sheet(e),o=E.Wp.book_new();E.Wp.book_append_sheet(o,t,"그룹 마일리지 현황"),E._h(o,`${this.getLoginInfo.group_name}_마일리지_현황_${this.formatDate(this.selectedDate)}.xlsx`)},toggleHelpPopover(e){e.stopPropagation(),this.showHelpPopover=!this.showHelpPopover,this.showHelpPopover?this.$nextTick((()=>{this.positionPopover(),document.addEventListener("click",this.handleClickOutside)})):document.removeEventListener("click",this.handleClickOutside)},handleClickOutside(e){!this.$refs.helpPopover||this.$refs.helpPopover.contains(e.target)||this.$refs.helpIcon.contains(e.target)||(this.showHelpPopover=!1,document.removeEventListener("click",this.handleClickOutside))},async getWeight(){try{const e=await I.A.get("/group/getWeight",{params:{group_no:this.getLoginInfo.group_no}});this.groupWeight=e.data}catch(e){console.error("데이터 불러오기 실패:",e)}},positionPopover(){const e=this.$refs.helpIcon,t=this.$refs.helpPopover;if(e&&t){const t=e.getBoundingClientRect(),o=window.innerWidth<=768;this.popoverStyle=o?{position:"absolute",top:`${t.height+10}px`,left:"50%",transform:"translateX(-50%)",width:"90%",maxWidth:"300px"}:{position:"absolute",top:`${t.height+10}px`,right:"25%",width:"300px"}}}},watch:{selectedDate:{handler(){this.fetchData()},immediate:!0}},mounted(){this.fetchData(),this.getWeight(),window.addEventListener("resize",this.positionPopover)},beforeUnmount(){window.removeEventListener("resize",this.positionPopover)}},W=o(6262);const H=(0,W.A)(x,[["render",y],["__scopeId","data-v-a50987b4"]]);var $=H}}]);
//# sourceMappingURL=2121.c953df2a.js.map