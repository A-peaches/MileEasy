"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[5397],{7778:function(e,t,i){i.r(t),i.d(t,{default:function(){return ye}});var o=i(641);const s={class:"mtip-container"},n={class:"row banner-profile-row"},a={class:"col-md-9 col-12"},c={class:"col-md-3 col-12"},l={class:"mtip-container"},r={class:"mtip-container"},d={class:"row"},p={class:"col-md-6 col-12"},m={class:"col-md-6 col-12"};function h(e,t,i,h,f,u){const v=(0,o.g2)("Banner"),b=(0,o.g2)("Profile"),g=(0,o.g2)("Guide"),_=(0,o.g2)("MTip"),w=(0,o.g2)("BestMTip");return(0,o.uX)(),(0,o.CE)(o.FK,null,[(0,o.Lk)("div",s,[(0,o.Lk)("div",n,[(0,o.Lk)("div",a,[(0,o.bF)(v)]),(0,o.Lk)("div",c,[(0,o.bF)(b)])])]),(0,o.Lk)("div",l,[(0,o.bF)(g)]),(0,o.Lk)("div",r,[(0,o.Lk)("div",d,[(0,o.Lk)("div",p,[(0,o.bF)(_)]),(0,o.Lk)("div",m,[(0,o.bF)(w)])])])],64)}var f=i(33);const u={key:"profile",class:"cards profile-card"},v={class:"profile-content"},b={class:"profile-remark"},g={class:"text-start brown mt-2 md"},_=(0,o.Fv)('<div class="button-container" data-v-613bffd2><a class="btn-mtip" href="/m_TipWriteView" data-v-613bffd2><i class="bi bi-pencil mr-2" data-v-613bffd2></i><span class="btn-text" data-v-613bffd2>글작성</span><span class="right-arrow" data-v-613bffd2>&gt;</span></a><a class="btn-mtip" href="/myM_TipView" data-v-613bffd2><i class="bi bi-file-earmark-text mr-2" data-v-613bffd2></i><span class="btn-text" data-v-613bffd2>나의 M-Tip</span><span class="right-arrow" data-v-613bffd2>&gt;</span></a><a class="btn-mtip" href="/MyM_TipBestView" data-v-613bffd2><i class="bi bi-heart mr-2" data-v-613bffd2></i><span class="btn-text" data-v-613bffd2>내가 좋아요한 M-Tip</span><span class="right-arrow" data-v-613bffd2>&gt;</span></a></div>',1);function w(e,t,i,s,n,a){return(0,o.uX)(),(0,o.CE)("div",u,[(0,o.Lk)("div",v,[(0,o.Lk)("div",b,(0,f.v_)(a.loginInfo?a.loginInfo.user_name:"")+"님, 오늘도 좋은하루 되세요! ",1),(0,o.Lk)("div",g,"나의 M-Tip 작성 건수 : "+(0,f.v_)(e.userTotalNotices)+" 건",1),_])])}var k=i(6278),L={name:"ProfileCom",data(){return{remark:[""]}},computed:{...(0,k.L8)("login",["getLoginInfo"]),...(0,k.L8)("mtipBoard",["notices","userTotalNotices"]),loginInfo(){const e=this.getLoginInfo;return e?{...e,position_no:e.position_no||"",level_no:e.level_no||"",job_no:e.job_no||"",dp_no:e.dp_no||""}:null}},methods:{...(0,k.i0)("mtipBoard",["fetchNotices","fetchUserTotalNotices"]),setDefaultImage(e){e.target.src=i(6468)},goToMyMileageView(){window.location.href="/myMileageView"}},async mounted(){await this.fetchNotices(),this.loginInfo&&await this.fetchUserTotalNotices(this.loginInfo.user_no)}},M=i(6262);const y=(0,M.A)(L,[["render",w],["__scopeId","data-v-613bffd2"]]);var C=y;const T={class:"cards banner-back"},E={autoplay:"",muted:"",loop:"",playsInline:"","webkit-playsinline":"",class:"video-background"},N=["src"];function B(e,t,i,s,n,a){return(0,o.uX)(),(0,o.CE)("div",T,[(0,o.Lk)("video",E,[(0,o.Lk)("source",{src:a.currentVideoSrc,type:"video/mp4"},null,8,N),(0,o.eW)(" Your browser does not support the video tag. ")]),(0,o.Lk)("div",{class:"video-overlay",onClick:t[0]||(t[0]=(...e)=>a.navigate&&a.navigate(...e))})])}var I={name:"BannerCom",data(){return{desktopVideo:i(2667),mobileVideo:i(4178),windowWidth:window.innerWidth}},methods:{navigate(){window.location.href="/m_TipWriteView"},handleResize(){this.windowWidth=window.innerWidth}},computed:{currentVideoSrc(){return this.windowWidth<=768?this.mobileVideo:this.desktopVideo}},mounted(){window.addEventListener("resize",this.handleResize)},beforeUnmount(){window.removeEventListener("resize",this.handleResize)}};const D=(0,M.A)(I,[["render",B],["__scopeId","data-v-6616deba"]]);var F=D,V=i(3751);const X=e=>((0,o.Qi)("data-v-12f47c30"),e=e(),(0,o.jt)(),e),A={key:"profile",class:"cards guide-card"},W={class:"guide-container"},U={class:"guide-header"},j=X((()=>(0,o.Lk)("div",{class:"guide-title"},"M-Tip 가이드",-1))),x={key:0,class:"file-download-wrapper-mobile"},z={key:0,class:"no-notices"},R={class:"notice-details"},S={class:"notice-content-wrapper"},P={class:"notice-content"},$={key:0,class:"file-download-wrapper-desktop"},G=["onClick"];function Q(e,t,i,s,n,a){return(0,o.uX)(),(0,o.CE)("div",A,[(0,o.Lk)("div",W,[(0,o.Lk)("div",U,[j,n.notices.length>0?((0,o.uX)(),(0,o.CE)("div",x,[(0,o.Lk)("a",{onClick:t[0]||(t[0]=(0,V.D$)((e=>a.downloadFile(n.notices[0])),["prevent"])),href:"#",class:"file-download-link"}," 상세보기 ")])):(0,o.Q3)("",!0)]),0===n.notices.length?((0,o.uX)(),(0,o.CE)("div",z," 등재된 게시글이 없습니다. ")):((0,o.uX)(!0),(0,o.CE)(o.FK,{key:1},(0,o.pI)(n.notices,(e=>((0,o.uX)(),(0,o.CE)("div",{class:"notice-item",key:e?.mtip_guide_no},[(0,o.Lk)("div",R,[(0,o.Lk)("div",S,[(0,o.Lk)("div",P,(0,f.v_)(e?.mtip_guide_content),1),e.mtip_guide_file?((0,o.uX)(),(0,o.CE)("div",$,[(0,o.Lk)("a",{onClick:(0,V.D$)((t=>a.downloadFile(e)),["prevent"]),href:"#",class:"file-download-link"}," 상세보기 ",8,G)])):(0,o.Q3)("",!0)])])])))),128))])])}i(4603),i(7566),i(8721);var K=i(7682),H={name:"GuideCom",data(){return{notices:[]}},computed:{...(0,k.L8)("login",["getLoginInfo"]),loginInfo(){const e=this.getLoginInfo;return e?{...e,position_no:e.position_no||"",level_no:e.level_no||"",job_no:e.job_no||"",dp_no:e.dp_no||""}:null}},methods:{handleMouseDown(e){e.target.style.color="#f4ada4"},handleMouseUp(e){e.target.style.color="#f4ada4"},async fetchNotices(){try{console.log("m-tip 게시글 db 접근");const e=await K.A.get("/mtip/list");console.log("m-tip 게시글 db에서 가지고 온 데이터:",e.data),this.notices=e.data.filter((e=>e&&e.mtip_guide_no)),console.log("Filtered notices:",this.notices)}catch(e){console.error("Error fetching notices:",e)}},async downloadFile(e){console.log("downloadFile 함수가 호출되었습니다.");try{console.log("다운로드 요청 URL:",`/notice/downloadGuide/${e.mtip_guide_file}`);const t=await K.A.get(`/notice/downloadGuide/${e.mtip_guide_file}`,{responseType:"blob"});console.log("서버 응답:",t);const i=new Blob([t.data],{type:t.headers["content-type"]}),o=URL.createObjectURL(i),s=document.createElement("a");s.href=o,s.download=this.getDisplayFileName(e.mtip_guide_file),s.click(),URL.revokeObjectURL(o)}catch(t){console.error("파일 다운로드 중 오류가 발생했습니다.",t.response?t.response.data:t.message),t.response&&(console.error("서버 응답 상태 코드:",t.response.status),console.error("서버 응답 데이터:",t.response.data))}},getDisplayFileName(e){return e.split("/").pop()}},created(){this.fetchNotices()}};const O=(0,M.A)(H,[["render",Q],["__scopeId","data-v-12f47c30"]]);var Y=O;const q=e=>((0,o.Qi)("data-v-b4dd4222"),e=e(),(0,o.jt)(),e),J={class:"cards m-tip-container"},Z=q((()=>(0,o.Lk)("div",{class:"m-tip-header"},[(0,o.Lk)("h2",{class:"m-tip-title fw-bold"},"M-Tip"),(0,o.Lk)("a",{href:"/M_TipListView",class:"view-all"},"전체보기")],-1))),ee={class:"notice-mile"},te={key:0,class:"notice-content"},ie={class:"notice-title"},oe=q((()=>(0,o.Lk)("span",{class:"title-icon"},"new",-1))),se={class:"notice-date"},ne={key:1,class:"no-notice"};function ae(e,t,i,s,n,a){return(0,o.uX)(),(0,o.CE)("div",J,[Z,(0,o.Lk)("div",{class:(0,f.C4)(["notice-list",{"mobile-scroll":n.isMobile}])},[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(n.mileageCategories,(e=>((0,o.uX)(),(0,o.CE)("div",{key:e,class:"notice-item"},[(0,o.Lk)("span",ee,(0,f.v_)(e),1),a.latestNotices[e]?((0,o.uX)(),(0,o.CE)("div",te,[(0,o.Lk)("span",ie,[(0,o.eW)((0,f.v_)(a.truncateTitle(a.latestNotices[e].mtip_board_title))+" ",1),oe]),(0,o.Lk)("span",se,(0,f.v_)(a.formatDate(a.latestNotices[e].mtip_board_date)),1)])):((0,o.uX)(),(0,o.CE)("span",ne,"게시글이 없습니다."))])))),128))],2)])}i(4114);var ce={name:"M-TipCom",data(){return{notices:[],paginatedNotices:[],mileageCategories:["HRD","Monthly Best","Monthly Base","HotTip","BEST PG","BEST Branch","소비자 지원","리그 테이블","기타"],isMobile:!1}},computed:{latestNotices(){const e={};return this.mileageCategories.forEach((t=>{const i=this.paginatedNotices.find((e=>e.mile_name===t||"기타"===t&&(null===e.mile_name||"기타"===e.mile_name)));i&&(e[t]=i)})),e},displayedCategories(){return this.isMobile?this.mileageCategories.slice(0,3):this.mileageCategories},mobileScrollStyle(){return this.isMobile?{maxHeight:"300px",overflowY:"auto"}:{}}},methods:{truncateTitle(e){return e.length>25?e.slice(0,25)+"....":e},formatDate(e){const t=new Date(e);return t.toLocaleDateString()},checkMobile(){this.isMobile=window.innerWidth<=480,console.log("Is Mobile:",this.isMobile)},async fetchNotices(){console.log("Mtiplist DB 메소드로 이동 ~ ");try{const e=await K.A.get("/mtip/Mtiplist");this.notices=e.data,this.paginatedNotices=this.notices,console.log("Mtiplist 서버에서 가지고 온 값 :",this.notices)}catch(e){console.error("Error fetching notices:",e.response?e.response.data:e.message)}},async handleNoticeClick(e){if(console.log("notice:",e),!this.isProcessing){this.isProcessing=!0;try{console.log("게시글 상세보기+조회수 메소드 도달",e),await K.A.post(`/notice/increment-views/${e.notice_board_no}`);const t=await K.A.get(`/notice/details/${e.notice_board_no}`);console.log("게시글 상세보기 서버에서 가지고 온 데이터:",t);const i=t.data;console.log("Fetched notice details:",i),e.notice_board_hit+=1;const o={...i,mile_no:i.mile_no,mile_name:i.mile_name,file:i.file||null,notice_board_hit:e.notice_board_hit};console.log("Navigating to noticeDetailView with notice:",{id:e.notice_board_no,notice:o}),this.$router.push({name:"noticeDetailView",params:{id:e.notice_board_no,notice:o}})}catch(t){console.error("Error fetching notice details:",t.response?t.response.data:t.message)}finally{this.isProcessing=!1}}}},mounted(){this.fetchNotices(),this.checkMobile(),window.addEventListener("resize",this.checkMobile)},beforeUnmount(){window.removeEventListener("resize",this.checkMobile)}};const le=(0,M.A)(ce,[["render",ae],["__scopeId","data-v-b4dd4222"]]);var re=le;const de=e=>((0,o.Qi)("data-v-05b90d00"),e=e(),(0,o.jt)(),e),pe={class:"cards m-tip-container"},me=de((()=>(0,o.Lk)("div",{class:"m-tip-header"},[(0,o.Lk)("h2",{class:"m-tip-title fw-bold"},"Best M-Tip"),(0,o.Lk)("a",{href:"/M_TipBestView",class:"view-all"},"전체보기")],-1))),he={class:"notice-mile"},fe={class:"notice-content"},ue={class:"notice-title"},ve=de((()=>(0,o.Lk)("i",{class:"bi bi-heart-fill title-icon"},null,-1))),be={class:"notice-date"};function ge(e,t,i,s,n,a){return(0,o.uX)(),(0,o.CE)("div",pe,[me,(0,o.Lk)("div",{class:(0,f.C4)(["notice-list",{"mobile-scroll":n.isMobile}])},[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(n.bestNotices,(e=>((0,o.uX)(),(0,o.CE)("div",{key:e.mtip_board_no,class:"notice-item"},[(0,o.Lk)("span",he,(0,f.v_)(e.mile_name||"기타"),1),(0,o.Lk)("div",fe,[(0,o.Lk)("span",ue,[(0,o.eW)((0,f.v_)(a.truncateTitle(e.mtip_board_title))+" ",1),ve]),(0,o.Lk)("span",be,(0,f.v_)(a.formatDate(e.mtip_board_date)),1)])])))),128))],2)])}var _e={name:"BestM-TipCom",data(){return{bestNotices:[],isMobile:!1}},methods:{truncateTitle(e){return e.length>25?e.slice(0,25)+"....":e},formatDate(e){const t=new Date(e);return t.toLocaleDateString()},async fetchBestNotices(){console.log("Best Mtiplist DB 메소드로 이동 ~ ");try{const e=await K.A.get("/mtip/bestMtiplist");this.bestNotices=e.data.slice(0,9),console.log("Best Mtiplist 서버에서 가지고 온 값 :",this.bestNotices)}catch(e){console.error("Error fetching best notices:",e.response?e.response.data:e.message)}},checkMobile(){this.isMobile=window.innerWidth<=480,console.log("Is Mobile:",this.isMobile)}},mounted(){this.fetchBestNotices(),this.checkMobile(),window.addEventListener("resize",this.checkMobile)},beforeUnmount(){window.removeEventListener("resize",this.checkMobile)}};const we=(0,M.A)(_e,[["render",ge],["__scopeId","data-v-05b90d00"]]);var ke=we,Le={name:"M_TipMainView",components:{Profile:C,Banner:F,Guide:Y,MTip:re,BestMTip:ke}};const Me=(0,M.A)(Le,[["render",h],["__scopeId","data-v-253f7706"]]);var ye=Me},2667:function(e,t,i){e.exports=i.p+"media/M-Tip.a7626c21.mp4"},4178:function(e,t,i){e.exports=i.p+"media/M-Tip_mobile.29c1fac7.mp4"}}]);
//# sourceMappingURL=5397.2e1cb400.js.map