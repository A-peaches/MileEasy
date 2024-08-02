"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[1711],{1711:function(e,t,i){i.r(t),i.d(t,{default:function(){return F}});var s=i(641),l=i(33);const o=e=>((0,s.Qi)("data-v-794dc6a6"),e=e(),(0,s.jt)(),e),a={class:"cards page-back mx-auto",style:{color:"#4b4a4a"}},n={class:"bold-x-lg my-5 ml-5 help-icon",ref:"helpIcon",style:{"font-family":"KB_C3"}},r={key:0,class:"help-popover",ref:"helpPopover"},d=o((()=>(0,s.Lk)("div",{style:{"font-size":"12pt"}},[(0,s.Lk)("span",null,[(0,s.eW)("이것은 마일리지 카드입니다. 여기에서 귀하의 마일리지 포인트와 최대 마일리지, "),(0,s.Lk)("br"),(0,s.eW)(" 그리고 다른 사용자들과 비교한 귀하의 위치를 확인할 수 있습니다.")])],-1))),c=[d],p={key:1,class:"row mx-2",style:{"margin-top":"100px"}},h={class:"cards mx-3 fade-up-item",style:{"background-color":"#f9f9f9",height:"280px",position:"relative"}},v={class:"flex-between"},g={class:"flex mb-2"},m={class:"text-start KB_C3 fw-bolder",style:{"font-size":"18pt",margin:"0"}},u={class:"text-end",style:{top:"-12px",position:"relative"}},f=o((()=>(0,s.Lk)("strong",null,"바로가기 >",-1))),k={class:"flex justify-content-between align-items-center",style:{"padding-bottom":"60px"}},y={style:{width:"55%","font-size":"32pt",position:"relative"}},L={class:"KB_C2"},b={class:"KB_C2 highlight"},_={class:"text-start recent-update"},x={class:"flex progress-container",style:{width:"43%",height:"105%",position:"relative","padding-right":"5%"}},w={class:"progress-bar mb-4"},P=(0,s.Fv)('<div class="marker top" data-v-794dc6a6><i class="bi bi-caret-right-fill" data-v-794dc6a6></i> 상위 20% </div><div class="marker middle" data-v-794dc6a6><i class="bi bi-caret-right-fill" data-v-794dc6a6></i> 상위 60% </div><div class="marker bottom" data-v-794dc6a6><i class="bi bi-caret-right-fill" data-v-794dc6a6></i> 상위 100% </div>',3),C=o((()=>(0,s.Lk)("div",{class:"below-text mb-2 ml-"}," < 총 평균 대비 상위 그래프 > ",-1))),M=o((()=>(0,s.Lk)("div",{class:"my-5"},null,-1)));function H(e,t,i,o,d,H){const E=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",a,[(0,s.Lk)("h2",n,[(0,s.eW)(" 나의 마일리지 "),(0,s.Lk)("i",{class:"bi bi-question-circle",onClick:t[0]||(t[0]=(...e)=>H.toggleHelpPopover&&H.toggleHelpPopover(...e)),style:{"font-size":"20pt"}})],512),d.showHelpPopover?((0,s.uX)(),(0,s.CE)("div",r,c,512)):(0,s.Q3)("",!0),d.dataLoaded?((0,s.uX)(),(0,s.CE)("div",p,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(H.filteredMyMile,((e,t)=>((0,s.uX)(),(0,s.CE)("div",{key:t,class:"col-6 mb-3"},[(0,s.Lk)("div",h,[(0,s.Lk)("div",v,[(0,s.Lk)("div",g,[(0,s.Lk)("div",m,(0,l.v_)(e.mile_name),1),(0,s.Lk)("div",u,[(0,s.bF)(E,{to:{name:"mileageDetail",params:{mile_no:e.mile_no}},class:"KB_C3 brown",style:{"text-decoration":"none","font-size":"12pt"}},{default:(0,s.k6)((()=>[f])),_:2},1032,["to"])])])]),(0,s.Lk)("div",k,[(0,s.Lk)("div",y,[(0,s.Lk)("span",L,[(0,s.Lk)("span",b,(0,l.v_)(e.user_point),1),(0,s.eW)(" / "+(0,l.v_)(0!=e.mile_max?e.mile_max:"-"),1)]),(0,s.Lk)("div",_," ( 최근 업데이트 : "+(0,l.v_)(e.mile_date)+" ) ",1)]),(0,s.Lk)("div",x,[(0,s.Lk)("div",w,[(0,s.Lk)("div",{class:"progress",style:(0,l.Tr)({height:H.getProgressHeight(e.user_point,e.all_point)})},null,4),P]),C])])])])))),128))])):(0,s.Q3)("",!0),M])}var E=i(6278),I={name:"MyMileageView",data(){return{showHelpPopover:!1,dataLoaded:!1}},methods:{...(0,E.i0)("mileScore",["getMyMiles"]),getProgressHeight(e,t){"-"===t&&(t=1);const i=e/t*100;return`${i}%`},setTransitionDelay(e,t){e.style.setProperty("--index",t)},applyFadeUpEffect(){console.log("Applying fade-up effect");const e=this.$el.querySelectorAll(".fade-up-item");console.log(`Found ${e.length} items to animate`),e.forEach(((t,i)=>{t.style.setProperty("--index",i),t.style.setProperty("z-index",e.length-i);const s=50,l=s+50*i;setTimeout((()=>{t.classList.add("fade-up-active")}),l)}))},toggleHelpPopover(e){e.stopPropagation(),console.log("toggleHelpPopover 클릭"),this.showHelpPopover=!this.showHelpPopover,console.log("showHelpPopover:",this.showHelpPopover),this.showHelpPopover?document.addEventListener("click",this.handleClickOutside):document.removeEventListener("click",this.handleClickOutside)},handleClickOutside(e){console.log("handleClickOutside 실행"),!this.$refs.helpPopover||this.$refs.helpPopover.contains(e.target)||this.$refs.helpIcon.contains(e.target)||(console.log("팝오버 닫기"),this.showHelpPopover=!1,document.removeEventListener("click",this.handleClickOutside))}},mounted(){},computed:{...(0,E.L8)("login",["getLoginInfo"]),...(0,E.L8)("mileScore",["getMyMile"]),filteredMyMile(){const e=this.getLoginInfo?this.getLoginInfo.job_no:null;if(!e)return[];let t="기획"===e?this.getMyMile.filter((e=>!1===e.mile_is_branch)):this.getMyMile;const i=Array.from(new Map(t.map((e=>[e.mile_no,e]))).values());return i}},watch:{getLoginInfo:{immediate:!0,handler(e){e&&e.user_no?this.getMyMiles(e.user_no).then((()=>{this.dataLoaded=!0,this.$nextTick((()=>{this.applyFadeUpEffect()}))})):this.dataLoaded=!1}}}},$=i(6262);const z=(0,$.A)(I,[["render",H],["__scopeId","data-v-794dc6a6"]]);var F=z}}]);
//# sourceMappingURL=1711.29cdd7a2.js.map