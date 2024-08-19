"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[735],{735:function(e,t,s){s.r(t),s.d(t,{default:function(){return B}});var i=s(641),o=s(33);const l=e=>((0,i.Qi)("data-v-06ac5082"),e=e(),(0,i.jt)(),e),a={class:"cards page-back mx-auto",style:{color:"#4b4a4a"}},r={class:"help-container"},n={class:"bold-x-lg my-5 ml-5",style:{"font-family":"KB_C3"}},c={key:0,class:"help-popover",ref:"helpPopover"},d=l((()=>(0,i.Lk)("div",{style:{"font-size":"12pt"}},[(0,i.Lk)("span",null,[(0,i.eW)(" 이것은 마일리지 카드입니다. 여기에서 귀하의 마일리지 포인트와 최대 마일리지, "),(0,i.Lk)("br"),(0,i.eW)(" 그리고 다른 사용자들과 비교한 귀하의 위치를 확인할 수 있습니다. ")])],-1))),p=[d],h={key:0,class:"row mx-2",style:{"margin-top":"60px"}},v={class:"cards fade-up-item mx-2 my-2",style:{"background-color":"#f9f9f9"}},g={class:"card-header"},u={class:"text-start KB_C3 fw-bolder mile-name"},m={class:"shortcut-link-container"},k=l((()=>(0,i.Lk)("strong",null,"바로가기 >",-1))),f={class:"card-content"},L={class:"score-container"},y={class:"score-wrapper"},_={class:"KB_C2"},b={class:"KB_C2 highlight"},w={class:"progress-container"},P={class:"progress-bar-wrapper"},C={class:"progress-bar"},M=(0,i.Fv)('<div class="markers" data-v-06ac5082><div class="marker top" data-v-06ac5082><i class="bi bi-caret-right-fill" data-v-06ac5082></i> 상위 20% </div><div class="marker middle" data-v-06ac5082><i class="bi bi-caret-right-fill" data-v-06ac5082></i> 상위 60% </div><div class="marker bottom" data-v-06ac5082><i class="bi bi-caret-right-fill" data-v-06ac5082></i> 상위 100% </div></div>',1),x={class:"bottom-info"},H={class:"recent-update"},I=l((()=>(0,i.Lk)("div",{class:"below-text"},"< 총 평균 대비 상위 그래프 >",-1)));function E(e,t,s,l,d,E){const F=(0,i.g2)("router-link");return(0,i.uX)(),(0,i.CE)("div",a,[(0,i.Lk)("div",r,[(0,i.Lk)("h2",n,[(0,i.eW)(" 나의 마일리지 "),(0,i.Lk)("i",{class:"bi bi-question-circle help-icon",onClick:t[0]||(t[0]=(...e)=>E.toggleHelpPopover&&E.toggleHelpPopover(...e)),style:{"font-size":"20pt"},ref:"helpIcon"},null,512)]),d.showHelpPopover?((0,i.uX)(),(0,i.CE)("div",c,p,512)):(0,i.Q3)("",!0)]),d.dataLoaded?((0,i.uX)(),(0,i.CE)("div",h,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(E.filteredMyMile,((e,t)=>((0,i.uX)(),(0,i.CE)("div",{key:t,class:"col-6"},[(0,i.Lk)("div",v,[(0,i.Lk)("div",g,[(0,i.Lk)("div",u,(0,o.v_)(e.mile_name),1),(0,i.Lk)("div",m,[(0,i.bF)(F,{to:{name:"mileageDetail",params:{mile_no:e.mile_no}},class:"KB_C3 brown shortcut-link"},{default:(0,i.k6)((()=>[k])),_:2},1032,["to"])])]),(0,i.Lk)("div",f,[(0,i.Lk)("div",L,[(0,i.Lk)("div",y,[(0,i.Lk)("span",_,[(0,i.Lk)("span",b,(0,o.v_)(e.user_point),1),(0,i.eW)(" / "+(0,o.v_)(0!=e.mile_max?e.mile_max:"-"),1)])])]),(0,i.Lk)("div",w,[(0,i.Lk)("div",P,[(0,i.Lk)("div",C,[(0,i.Lk)("div",{class:"progress",style:(0,o.Tr)({height:E.calculateProgressHeight(e.all_point)+"%"})},null,4)]),M])])]),(0,i.Lk)("div",x,[(0,i.Lk)("div",H," ( 최근 업데이트 : "+(0,o.v_)(e.mile_date)+" ) ",1),I])])])))),128))])):(0,i.Q3)("",!0)])}var F=s(6278),K={name:"MyMileageView",data(){return{showHelpPopover:!1,dataLoaded:!1}},methods:{...(0,F.i0)("mileScore",["getMyMiles"]),calculateProgressHeight(e){return 0===e?.1:Math.max(0,Math.min(100,100-e))},setTransitionDelay(e,t){e.style.setProperty("--index",t)},applyFadeUpEffect(){console.log("Applying fade-up effect");const e=this.$el.querySelectorAll(".fade-up-item");console.log(`Found ${e.length} items to animate`),e.forEach(((t,s)=>{t.style.setProperty("--index",s),t.style.setProperty("z-index",e.length-s);const i=50,o=i+50*s;setTimeout((()=>{t.classList.add("fade-up-active")}),o)}))},toggleHelpPopover(e){e.stopPropagation(),console.log("toggleHelpPopover 클릭"),this.showHelpPopover=!this.showHelpPopover,console.log("showHelpPopover:",this.showHelpPopover),this.showHelpPopover?document.addEventListener("click",this.handleClickOutside):document.removeEventListener("click",this.handleClickOutside)},handleClickOutside(e){console.log("handleClickOutside 실행"),!this.$refs.helpPopover||this.$refs.helpPopover.contains(e.target)||this.$refs.helpIcon.contains(e.target)||(console.log("팝오버 닫기"),this.showHelpPopover=!1,document.removeEventListener("click",this.handleClickOutside))},checkLoginInfo(){(!this.getLoginInfo||this.getLoginInfo&&1==this.getIsChecked)&&(window.location.href="/noAccess")}},mounted(){},computed:{...(0,F.L8)("login",["getLoginInfo","getIsChecked"]),...(0,F.L8)("mileScore",["getMyMile"]),filteredMyMile(){const e=this.getLoginInfo?this.getLoginInfo.job_no:null;if(!e)return[];let t="기획"===e?this.getMyMile.filter((e=>!1===e.mile_is_branch)):this.getMyMile;const s=Array.from(new Map(t.map((e=>[e.mile_no,e]))).values());return s}},watch:{getLoginInfo:{immediate:!0,handler(e){e&&e.user_no?this.getMyMiles(e.user_no).then((()=>{this.dataLoaded=!0,this.$nextTick((()=>{this.applyFadeUpEffect()}))})):this.dataLoaded=!1}}},created(){this.checkLoginInfo()}},$=s(6262);const A=(0,$.A)(K,[["render",E],["__scopeId","data-v-06ac5082"]]);var B=A}}]);
//# sourceMappingURL=735.8ff0a654.js.map