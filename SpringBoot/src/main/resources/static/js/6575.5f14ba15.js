"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[6575],{8956:function(t,e,i){i.r(e),i.d(e,{default:function(){return j}});var o=i(641),n=i(3751),s=i(33);const r=t=>((0,o.Qi)("data-v-df417dda"),t=t(),(0,o.jt)(),t),a={class:"app-container"},c={class:"button-container"},l=r((()=>(0,o.Lk)("span",{class:"arrow"},"❮",-1))),u=r((()=>(0,o.Lk)("div",null,[(0,o.Lk)("h2",null,"Best M-Tip")],-1))),d=r((()=>(0,o.Lk)("div",{class:"category-button list-wrapper"},"카테고리",-1))),h={key:0,class:"dropdown-menu",ref:"dropdownMenu"},f={class:"menu-items"},g=["onClick"],p={class:"notice-count-container"},m={class:"notice-count"},_={key:0},k=r((()=>(0,o.Lk)("i",{class:"bi bi-pencil",style:{"margin-right":"10px"}},null,-1))),v={class:"search-container"},y=r((()=>(0,o.Lk)("i",{class:"bi bi-search"},null,-1))),w=[y],b={class:"notice-list"},L={key:0},C=["onClick"],I={class:"notice-details"},B={key:0,class:"notice-new"},x={key:1,class:"notice-num"},D={class:"notice-mile"},N={class:"notice-title"},S={class:"notice-date"},E=r((()=>(0,o.Lk)("i",{class:"bi bi-eye"},null,-1))),P={class:"notice-views"},M=r((()=>(0,o.Lk)("i",{class:"fa fa-eye"},null,-1))),z={class:"notice-like"},A={key:1},X=r((()=>(0,o.Lk)("p",null,"게시글이 없습니다.",-1))),$=[X];function O(t,e,i,r,y,X){return(0,o.uX)(),(0,o.CE)("div",a,[(0,o.Lk)("div",{class:"content cards",onClick:e[7]||(e[7]=(...e)=>t.handleClick&&t.handleClick(...e))},[(0,o.Lk)("div",c,[(0,o.Lk)("button",{class:"back-button",onClick:e[0]||(e[0]=(...t)=>X.goBack&&X.goBack(...t))},[l,(0,o.eW)(" 이전 ")])]),u,(0,o.Lk)("div",{onClick:e[3]||(e[3]=(0,n.D$)(((...t)=>X.toggleCategory&&X.toggleCategory(...t)),["stop"])),class:"QnA",ref:"categoryButton"},[d,y.showCategory?((0,o.uX)(),(0,o.CE)("div",h,[(0,o.Lk)("div",f,[(0,o.Lk)("a",{class:"dropdown-item",onClick:e[1]||(e[1]=e=>t.filterByCategory(null))},"전체"),((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(y.mileages,(e=>((0,o.uX)(),(0,o.CE)("a",{class:"dropdown-item",key:e.mile_no,onClick:i=>t.filterByCategory(e.mile_name)},(0,s.v_)(e.mile_name)+"마일리지 ",9,g)))),128)),(0,o.Lk)("a",{class:"dropdown-item",onClick:e[2]||(e[2]=e=>t.filterByCategory("기타"))},"기타")])],512)):(0,o.Q3)("",!0)],512),(0,o.Lk)("div",p,[(0,o.Lk)("div",m,"총 "+(0,s.v_)(X.filteredNotices.length)+"건",1)]),(0,o.Lk)("div",null,[X.isLoggedIn&&X.loginInfo.user_is_admin&&!X.loginInfo.user_is_manager&&X.isChecked?((0,o.uX)(),(0,o.CE)("div",_,[(0,o.Lk)("button",{class:"write-button",onClick:e[4]||(e[4]=(...e)=>t.goToWritePage&&t.goToWritePage(...e))},[k,(0,o.eW)(" 글작성 ")])])):(0,o.Q3)("",!0)]),(0,o.Lk)("div",v,[(0,o.bo)((0,o.Lk)("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=t=>y.searchQuery=t),placeholder:"제목 및 내용을 검색하세요",class:"input-search"},null,512),[[n.Jo,y.searchQuery]]),(0,o.Lk)("button",{class:"search-button",onClick:e[6]||(e[6]=(...e)=>t.searchNotices&&t.searchNotices(...e))},w)]),(0,o.Lk)("div",b,[X.paginatedNotices.length?((0,o.uX)(),(0,o.CE)("div",L,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(X.paginatedNotices,(e=>((0,o.uX)(),(0,o.CE)("div",{class:"input-base list-wrapper",key:e.notice_board_no,onClick:t=>X.handleNoticeClick(e)},[(0,o.Lk)("div",I,[e.is_new?((0,o.uX)(),(0,o.CE)("div",B,(0,s.v_)(e.display_num),1)):((0,o.uX)(),(0,o.CE)("div",x,(0,s.v_)(e.display_num),1)),(0,o.Lk)("div",D,(0,s.v_)(e.mile_name&&"기타"!==e.mile_name?e.mile_name+" 마일리지":"기타"),1),(0,o.Lk)("div",N,(0,s.v_)(e.mtip_board_title.length>30?e.mtip_board_title.substring(0,30)+" ...":e.mtip_board_title),1),(0,o.Lk)("pre",S,(0,s.v_)(X.formatDate(e.mtip_board_date)),1),E,(0,o.Lk)("div",P,[(0,o.eW)((0,s.v_)(e.mtip_board_hit)+" ",1),M]),(0,o.Lk)("i",{class:(0,s.C4)(["bi",t.isPostLiked(X.loginInfo.user_no,e.mtip_board_no)?"bi-heart-fill":"bi-heart"]),style:(0,s.Tr)({color:t.isPostLiked(X.loginInfo.user_no,e.mtip_board_no)?"#dc3545":"inherit"})},null,6),(0,o.Lk)("div",z,(0,s.v_)(e.mtip_board_like),1)])],8,C)))),128))])):((0,o.uX)(),(0,o.CE)("div",A,$))])])])}i(4114),i(3375),i(9225),i(3972),i(9209),i(5714),i(7561),i(6197);var Q=i(6278),T=i(7682),V={data(){return{notices:[],mileages:[],showCategory:!1,currentPage:1,itemsPerPage:10,searchQuery:"",selectedCategory:null,isProcessing:!1,sortByLikes:!0,sortByViews:!1,sortByDateAsc:!1}},computed:{...(0,Q.L8)("login",["getLoginInfo","getIsChecked"]),...(0,Q.aH)("login",["loginInfo"]),...(0,Q.L8)("mtipBoard",["isPostLiked"],["getBestNotices"]),uniqueMileages(){return[...new Set(this.notices.filter((t=>t.mile_name)).map((t=>t.mile_name)))]},filteredNotices(){let t=this.notices;if(this.searchQuery){const e=this.searchQuery.toLowerCase();t=t.filter((t=>t.mtip_board_title&&t.mtip_board_title.toLowerCase().includes(e)||t.mtip_board_content&&t.mtip_board_content.toLowerCase().includes(e)))}null!==this.selectedCategory&&(t="기타"===this.selectedCategory?t.filter((t=>!t.mile_name)):t.filter((t=>t.mile_name===this.selectedCategory))),this.sortByLikes?t.sort(((t,e)=>e.mtip_board_like-t.mtip_board_like)):this.sortByViews?t.sort(((t,e)=>e.mtip_board_hit-t.mtip_board_hit)):this.sortByDateAsc?t.sort(((t,e)=>new Date(t.mtip_board_date)-new Date(e.mtip_board_date))):t.sort(((t,e)=>new Date(e.mtip_board_date)-new Date(t.mtip_board_date)));let e=1;return t.map((t=>({...t,is_new:this.isNew(t.mtip_board_date),display_num:this.isNew(t.mtip_board_date)?"NEW":e++})))},loginInfo(){return this.getLoginInfo},isChecked(){return this.getIsChecked},isLoggedIn(){return!!this.loginInfo},paginatedNotices(){const t=(this.currentPage-1)*this.itemsPerPage,e=t+this.itemsPerPage;return this.filteredNotices.slice(t,e)}},methods:{...(0,Q.i0)("mtipBoard",["fetchNotices","fetchLikedPosts"],["fetchBestNotices"]),...(0,Q.i0)("mileage",["fetchMileages"]),checkLoginInfo(){(!this.getLoginInfo||this.getLoginInfo&&1==this.getIsChecked)&&(window.location.href="/noAccess")},goBack(){this.$router.go(-1)},sortByLikesMethod(){this.sortByLikes=!0,this.sortByViews=!1,this.sortByDateAsc=!1,this.$forceUpdate()},isNew(t){const e=new Date,i=new Date(t),o=e.getTime()-i.getTime(),n=o/864e5;return n<=7},toggleCategory(){this.showCategory=!this.showCategory},closeDropdown(){this.showCategory=!1},handleClickOutside(t){this.$refs.dropdownMenu&&!this.$refs.dropdownMenu.contains(t.target)&&this.$refs.categoryButton&&!this.$refs.categoryButton.contains(t.target)&&this.closeDropdown()},async fetchNotices(){console.log("게시글 list 서버 메소드로 이동 ~ ");try{const t=await T.A.get("/mtip/PlusbestMtiplist");this.notices=t.data,console.log("list 서버에서 가지고 온 값 :",this.notices)}catch(t){console.error("Error fetching notices:",t.response?t.response.data:t.message)}},async fetchMileages(){try{const t=await T.A.get("/mtip/Mtipmileage");console.log("Fetched mileages:",t.data),this.mileages=t.data}catch(t){console.error("Error fetching mileages:",t.response?t.response.data:t.message)}},async handleNoticeClick(t){if(console.log("notice:",t),!this.isProcessing){this.isProcessing=!0;try{console.log("게시글 상세보기+조회수 메소드 도달",t),await T.A.get(`/mtip/MtipViews/${t.mtip_board_no}`);const e=await T.A.get(`/mtip/details/${t.mtip_board_no}`);console.log("게시글 상세보기 서버에서 가지고 온 데이터:",e);const i=e.data;console.log("Fetched notice details:",i),t.mtip_board_hit+=1;const o={...i,mile_no:i.mile_no,mile_name:i.mile_name,file:i.mtip_board_file||null,mtip_board_hit:t.mtip_board_hit};console.log("Navigating to noticeDetailView with notice:",{id:t.mtip_board_no,notice:o}),console.log("MtipListView에서 넘기는 notice:",t),this.$router.push({name:"m_TipDetailView",params:{mtip_board_no:t.mtip_board_no}})}catch(e){console.error("Error fetching notice details:",e.response?e.response.data:e.message)}finally{this.isProcessing=!1}}},formatDate(t){const e={year:"numeric",month:"2-digit",day:"2-digit"};return new Date(t).toLocaleDateString("ko-KR",e)},async fetchBestNotices(){console.log("Best Mtiplist DB 메소드로 이동 ~ ");try{const t=await T.A.get("/mtip/PlusbestMtiplist");this.bestNotices=t.data,console.log("Best Mtiplist 서버에서 가지고 온 값 :",this.bestNotices)}catch(t){console.error("Error fetching best notices:",t.response?t.response.data:t.message)}},async initializeData(){try{await this.fetchNotices(),await this.fetchMileages(),this.loginInfo&&await this.fetchLikedPosts(this.loginInfo.user_no)}catch(t){console.error("Error initializing data:",t)}}},mounted(){console.log("loginInfo:",this.loginInfo),console.log("isLoggedIn:",this.isLoggedIn),console.log("isChecked:",this.isChecked),document.addEventListener("click",this.handleClickOutside),this.fetchNotices().then((()=>{this.sortByLikesMethod()})),this.fetchMileages(),this.initializeData(),this.fetchBestNotices()},beforeUnmount(){document.removeEventListener("click",this.handleClickOutside)},created(){this.checkLoginInfo()}},F=i(6262);const W=(0,F.A)(V,[["render",O],["__scopeId","data-v-df417dda"]]);var j=W},7080:function(t,e,i){var o=i(4402).has;t.exports=function(t){return o(t),t}},6706:function(t,e,i){var o=i(9504),n=i(9306);t.exports=function(t,e,i){try{return o(n(Object.getOwnPropertyDescriptor(t,e)[i]))}catch(s){}}},1767:function(t){t.exports=function(t){return{iterator:t,next:t.next,done:!1}}},3789:function(t,e,i){var o=i(9306),n=i(8551),s=i(9565),r=i(1291),a=i(1767),c="Invalid size",l=RangeError,u=TypeError,d=Math.max,h=function(t,e){this.set=t,this.size=d(e,0),this.has=o(t.has),this.keys=o(t.keys)};h.prototype={getIterator:function(){return a(n(s(this.keys,this.set)))},includes:function(t){return s(this.has,this.set,t)}},t.exports=function(t){n(t);var e=+t.size;if(e!==e)throw new u(c);var i=r(e);if(i<0)throw new l(c);return new h(t,i)}},507:function(t,e,i){var o=i(9565);t.exports=function(t,e,i){var n,s,r=i?t:t.iterator,a=t.next;while(!(n=o(a,r)).done)if(s=e(n.value),void 0!==s)return s}},9539:function(t,e,i){var o=i(9565),n=i(8551),s=i(5966);t.exports=function(t,e,i){var r,a;n(t);try{if(r=s(t,"return"),!r){if("throw"===e)throw i;return i}r=o(r,t)}catch(c){a=!0,r=c}if("throw"===e)throw i;if(a)throw r;return n(r),i}},9286:function(t,e,i){var o=i(4402),n=i(8469),s=o.Set,r=o.add;t.exports=function(t){var e=new s;return n(t,(function(t){r(e,t)})),e}},3440:function(t,e,i){var o=i(7080),n=i(4402),s=i(9286),r=i(5170),a=i(3789),c=i(8469),l=i(507),u=n.has,d=n.remove;t.exports=function(t){var e=o(this),i=a(t),n=s(e);return r(e)<=i.size?c(e,(function(t){i.includes(t)&&d(n,t)})):l(i.getIterator(),(function(t){u(e,t)&&d(n,t)})),n}},4402:function(t,e,i){var o=i(9504),n=Set.prototype;t.exports={Set:Set,add:o(n.add),has:o(n.has),remove:o(n["delete"]),proto:n}},8750:function(t,e,i){var o=i(7080),n=i(4402),s=i(5170),r=i(3789),a=i(8469),c=i(507),l=n.Set,u=n.add,d=n.has;t.exports=function(t){var e=o(this),i=r(t),n=new l;return s(e)>i.size?c(i.getIterator(),(function(t){d(e,t)&&u(n,t)})):a(e,(function(t){i.includes(t)&&u(n,t)})),n}},4449:function(t,e,i){var o=i(7080),n=i(4402).has,s=i(5170),r=i(3789),a=i(8469),c=i(507),l=i(9539);t.exports=function(t){var e=o(this),i=r(t);if(s(e)<=i.size)return!1!==a(e,(function(t){if(i.includes(t))return!1}),!0);var u=i.getIterator();return!1!==c(u,(function(t){if(n(e,t))return l(u,"normal",!1)}))}},3838:function(t,e,i){var o=i(7080),n=i(5170),s=i(8469),r=i(3789);t.exports=function(t){var e=o(this),i=r(t);return!(n(e)>i.size)&&!1!==s(e,(function(t){if(!i.includes(t))return!1}),!0)}},8527:function(t,e,i){var o=i(7080),n=i(4402).has,s=i(5170),r=i(3789),a=i(507),c=i(9539);t.exports=function(t){var e=o(this),i=r(t);if(s(e)<i.size)return!1;var l=i.getIterator();return!1!==a(l,(function(t){if(!n(e,t))return c(l,"normal",!1)}))}},8469:function(t,e,i){var o=i(9504),n=i(507),s=i(4402),r=s.Set,a=s.proto,c=o(a.forEach),l=o(a.keys),u=l(new r).next;t.exports=function(t,e,i){return i?n({iterator:l(t),next:u},e):c(t,e)}},4916:function(t,e,i){var o=i(7751),n=function(t){return{size:t,has:function(){return!1},keys:function(){return{next:function(){return{done:!0}}}}}};t.exports=function(t){var e=o("Set");try{(new e)[t](n(0));try{return(new e)[t](n(-1)),!1}catch(i){return!0}}catch(s){return!1}}},5170:function(t,e,i){var o=i(6706),n=i(4402);t.exports=o(n.proto,"size","get")||function(t){return t.size}},3650:function(t,e,i){var o=i(7080),n=i(4402),s=i(9286),r=i(3789),a=i(507),c=n.add,l=n.has,u=n.remove;t.exports=function(t){var e=o(this),i=r(t).getIterator(),n=s(e);return a(i,(function(t){l(e,t)?u(n,t):c(n,t)})),n}},4204:function(t,e,i){var o=i(7080),n=i(4402).add,s=i(9286),r=i(3789),a=i(507);t.exports=function(t){var e=o(this),i=r(t).getIterator(),c=s(e);return a(i,(function(t){n(c,t)})),c}},7642:function(t,e,i){var o=i(6518),n=i(3440),s=i(4916);o({target:"Set",proto:!0,real:!0,forced:!s("difference")},{difference:n})},8004:function(t,e,i){var o=i(6518),n=i(9039),s=i(8750),r=i(4916),a=!r("intersection")||n((function(){return"3,2"!==String(Array.from(new Set([1,2,3]).intersection(new Set([3,2]))))}));o({target:"Set",proto:!0,real:!0,forced:a},{intersection:s})},3853:function(t,e,i){var o=i(6518),n=i(4449),s=i(4916);o({target:"Set",proto:!0,real:!0,forced:!s("isDisjointFrom")},{isDisjointFrom:n})},5876:function(t,e,i){var o=i(6518),n=i(3838),s=i(4916);o({target:"Set",proto:!0,real:!0,forced:!s("isSubsetOf")},{isSubsetOf:n})},4856:function(t,e,i){var o=i(6518),n=i(8527),s=i(4916);o({target:"Set",proto:!0,real:!0,forced:!s("isSupersetOf")},{isSupersetOf:n})},5024:function(t,e,i){var o=i(6518),n=i(3650),s=i(4916);o({target:"Set",proto:!0,real:!0,forced:!s("symmetricDifference")},{symmetricDifference:n})},1698:function(t,e,i){var o=i(6518),n=i(4204),s=i(4916);o({target:"Set",proto:!0,real:!0,forced:!s("union")},{union:n})},3375:function(t,e,i){i(7642)},9225:function(t,e,i){i(8004)},3972:function(t,e,i){i(3853)},9209:function(t,e,i){i(5876)},5714:function(t,e,i){i(4856)},7561:function(t,e,i){i(5024)},6197:function(t,e,i){i(1698)}}]);
//# sourceMappingURL=6575.5f14ba15.js.map