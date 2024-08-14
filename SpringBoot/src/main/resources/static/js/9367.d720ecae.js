"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[9367],{9367:function(e,t,s){s.r(t),s.d(t,{default:function(){return O}});var l=s(641),i=s(33);const a=e=>((0,l.Qi)("data-v-00f2852a"),e=e(),(0,l.jt)(),e),o={class:"cards page-back mx-auto",style:{color:"#4b4a4a"}},r={class:"help-container"},n={class:"bold-x-lg my-5 ml-5",style:{"font-family":"KB_C3"}},c={key:0,class:"help-popover",ref:"helpPopover"},d=a((()=>(0,l.Lk)("div",{style:{"font-size":"12pt"}},[(0,l.Lk)("span",null,[(0,l.eW)(" 이것은 마일리지 카드입니다. 여기에서 귀하의 마일리지 포인트와 최대 마일리지, "),(0,l.Lk)("br"),(0,l.eW)(" 그리고 다른 사용자들과 비교한 귀하의 위치를 확인할 수 있습니다. ")])],-1))),p=[d],h={key:0,class:"row mx-2",style:{"margin-top":"60px"}},v={class:"cards fade-up-item mx-2 my-2",style:{"background-color":"#f9f9f9"}},g={class:"card-header"},u={class:"text-start KB_C3 fw-bolder mile-name"},m={class:"shortcut-link-container"},f=a((()=>(0,l.Lk)("strong",null,"바로가기 >",-1))),k={class:"card-content"},L={class:"score-container"},y={class:"score-wrapper"},_={class:"KB_C2"},b={class:"KB_C2 highlight"},P={class:"progress-container"},w={class:"progress-bar-wrapper"},M={class:"progress-bar"},C=(0,l.Fv)('<div class="markers" data-v-00f2852a><div class="marker top" data-v-00f2852a><i class="bi bi-caret-right-fill" data-v-00f2852a></i> 상위 20% </div><div class="marker middle" data-v-00f2852a><i class="bi bi-caret-right-fill" data-v-00f2852a></i> 상위 60% </div><div class="marker bottom" data-v-00f2852a><i class="bi bi-caret-right-fill" data-v-00f2852a></i> 상위 100% </div></div>',1),x={class:"bottom-info"},H={class:"recent-update"},E=a((()=>(0,l.Lk)("div",{class:"below-text"},"< 총 평균 대비 상위 그래프 >",-1)));function I(e,t,s,a,d,I){const F=(0,l.g2)("router-link");return(0,l.uX)(),(0,l.CE)("div",o,[(0,l.Lk)("div",r,[(0,l.Lk)("h2",n,[(0,l.eW)(" 나의 마일리지 "),(0,l.Lk)("i",{class:"bi bi-question-circle help-icon",onClick:t[0]||(t[0]=(...e)=>I.toggleHelpPopover&&I.toggleHelpPopover(...e)),style:{"font-size":"20pt"},ref:"helpIcon"},null,512)]),d.showHelpPopover?((0,l.uX)(),(0,l.CE)("div",c,p,512)):(0,l.Q3)("",!0)]),d.dataLoaded?((0,l.uX)(),(0,l.CE)("div",h,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(I.filteredMyMile,((e,t)=>((0,l.uX)(),(0,l.CE)("div",{key:t,class:"col-6"},[(0,l.Lk)("div",v,[(0,l.Lk)("div",g,[(0,l.Lk)("div",u,(0,i.v_)(e.mile_name),1),(0,l.Lk)("div",m,[(0,l.bF)(F,{to:{name:"mileageDetail",params:{mile_no:e.mile_no}},class:"KB_C3 brown shortcut-link"},{default:(0,l.k6)((()=>[f])),_:2},1032,["to"])])]),(0,l.Lk)("div",k,[(0,l.Lk)("div",L,[(0,l.Lk)("div",y,[(0,l.Lk)("span",_,[(0,l.Lk)("span",b,(0,i.v_)(e.user_point),1),(0,l.eW)(" / "+(0,i.v_)(0!=e.mile_max?e.mile_max:"-"),1)])])]),(0,l.Lk)("div",P,[(0,l.Lk)("div",w,[(0,l.Lk)("div",M,[(0,l.Lk)("div",{class:"progress",style:(0,i.Tr)({height:I.calculateProgressHeight(e.all_point)+"%"})},null,4)]),C])])]),(0,l.Lk)("div",x,[(0,l.Lk)("div",H," ( 최근 업데이트 : "+(0,i.v_)(e.mile_date)+" ) ",1),E])])])))),128))])):(0,l.Q3)("",!0)])}var F=s(6278),K={name:"MyMileageView",data(){return{showHelpPopover:!1,dataLoaded:!1}},methods:{...(0,F.i0)("mileScore",["getMyMiles"]),calculateProgressHeight(e){return 0===e?.1:Math.max(0,Math.min(100,100-e))},setTransitionDelay(e,t){e.style.setProperty("--index",t)},applyFadeUpEffect(){console.log("Applying fade-up effect");const e=this.$el.querySelectorAll(".fade-up-item");console.log(`Found ${e.length} items to animate`),e.forEach(((t,s)=>{t.style.setProperty("--index",s),t.style.setProperty("z-index",e.length-s);const l=50,i=l+50*s;setTimeout((()=>{t.classList.add("fade-up-active")}),i)}))},toggleHelpPopover(e){e.stopPropagation(),console.log("toggleHelpPopover 클릭"),this.showHelpPopover=!this.showHelpPopover,console.log("showHelpPopover:",this.showHelpPopover),this.showHelpPopover?document.addEventListener("click",this.handleClickOutside):document.removeEventListener("click",this.handleClickOutside)},handleClickOutside(e){console.log("handleClickOutside 실행"),!this.$refs.helpPopover||this.$refs.helpPopover.contains(e.target)||this.$refs.helpIcon.contains(e.target)||(console.log("팝오버 닫기"),this.showHelpPopover=!1,document.removeEventListener("click",this.handleClickOutside))}},mounted(){},computed:{...(0,F.L8)("login",["getLoginInfo"]),...(0,F.L8)("mileScore",["getMyMile"]),filteredMyMile(){const e=this.getLoginInfo?this.getLoginInfo.job_no:null;if(!e)return[];let t="기획"===e?this.getMyMile.filter((e=>!1===e.mile_is_branch)):this.getMyMile;const s=Array.from(new Map(t.map((e=>[e.mile_no,e]))).values());return s}},watch:{getLoginInfo:{immediate:!0,handler(e){e&&e.user_no?this.getMyMiles(e.user_no).then((()=>{this.dataLoaded=!0,this.$nextTick((()=>{this.applyFadeUpEffect()}))})):this.dataLoaded=!1}}}},$=s(6262);const B=(0,$.A)(K,[["render",I],["__scopeId","data-v-00f2852a"]]);var O=B}}]);
//# sourceMappingURL=9367.d720ecae.js.map