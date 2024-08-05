"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[6510],{6510:function(t,e,a){a.r(e),a.d(e,{default:function(){return wt}});var i=a(641),s=a(33);const n={ref:"mainContainer"},o={class:"flex",style:{"margin-left":"10%","margin-right":"10%"}},l={class:"cards fade-up-item",style:{width:"24%",height:"400px"}},r=["src"],c={class:"lg KB_S5 my-3"},d={class:"md",style:{"margin-bottom":"0px"}},h={class:"md",style:{"margin-bottom":"10px"}},g={class:"flex",style:{"margin-left":"10%","margin-right":"10%"}},p=(0,i.Fv)('<div class="cards fade-up-item" style="width:24%;height:400px;padding:3% 3% 4% 3%;margin-top:3%;" data-v-bc318dc2><div style="padding:3% 0%;" data-v-bc318dc2><a href="/introduceMileageAdminView" class="mileage-link" data-v-bc318dc2><p class="lg2 link-text" style="text-align:left;" data-v-bc318dc2> 마일리지 소개 <i class="bi bi-chevron-compact-right icon-right" style="margin-left:auto;" data-v-bc318dc2></i></p></a><a href="/commentMieageeAdminView" class="mileage-link" data-v-bc318dc2><p class="lg2 link-text" style="text-align:left;" data-v-bc318dc2> 마일리지 멘트 <i class="bi bi-chevron-compact-right icon-right" style="margin-left:auto;" data-v-bc318dc2></i></p></a><a href="/documentsMileageAdminView" class="mileage-link" data-v-bc318dc2><p class="lg2 link-text" style="text-align:left;" data-v-bc318dc2> 마일리지 문서 <i class="bi bi-chevron-compact-right icon-right" style="margin-left:auto;" data-v-bc318dc2></i></p></a><a href="/scoreMileageAdminView" class="mileage-link" data-v-bc318dc2><p class="lg2 link-text" style="text-align:left;" data-v-bc318dc2> 마일리지 점수 <i class="bi bi-chevron-compact-right icon-right" style="margin-left:auto;" data-v-bc318dc2></i></p></a><a href="/qnaListView" class="mileage-link" data-v-bc318dc2><p class="lg2 link-text" style="text-align:left;" data-v-bc318dc2> QnA <i class="bi bi-chevron-compact-right icon-right" style="margin-left:auto;" data-v-bc318dc2></i></p></a><a href="/mileEasyContactView" class="mileage-link" data-v-bc318dc2><p class="lg2 link-text" style="text-align:left;" data-v-bc318dc2> 업무별 연락처 <i class="bi bi-chevron-compact-right icon-right" style="margin-left:auto;" data-v-bc318dc2></i></p></a></div></div>',1);function u(t,e,a,u,m,f){const v=(0,i.g2)("CardComponent"),y=(0,i.g2)("CompareChart");return(0,i.uX)(),(0,i.CE)("div",n,[(0,i.Lk)("div",o,[(0,i.Lk)("div",l,[f.loginInfo&&f.loginInfo.user_no?((0,i.uX)(),(0,i.CE)("img",{key:0,src:f.profileImageUrl,class:"profile-large my-3",alt:"Profile Picture",onError:e[0]||(e[0]=(...t)=>f.setDefaultImage&&f.setDefaultImage(...t))},null,40,r)):(0,i.Q3)("",!0),(0,i.Lk)("h2",c,(0,s.v_)(f.loginInfo?f.loginInfo.user_name:""),1),(0,i.Lk)("p",d,(0,s.v_)(f.loginInfo?`${f.loginInfo.level_no} ${f.loginInfo.position_no} | ${f.loginInfo.job_no} 직무`:""),1),(0,i.Lk)("p",h,(0,s.v_)(f.loginInfo?f.loginInfo.dp_no:""),1),(0,i.Lk)("button",{onClick:e[1]||(e[1]=(...t)=>f.goToMileageIntroView&&f.goToMileageIntroView(...t)),class:"btn-yellow KB_C2"},(0,s.v_)(m.mile_name),1)]),(0,i.bF)(v,{title:"기간별 페이지 방문자 수",class:"fade-up-item",style:{width:"70%","margin-left":"6%"}})]),(0,i.Lk)("div",g,[p,(0,i.bF)(y,{title:"전년도 비교",class:"fade-up-item",style:{width:"70%","margin-left":"6%","margin-top":"3%"}})])],512)}a(4114);var m=a(3751),f=a(5584),v=a(3543);const y=t=>((0,i.Qi)("data-v-57c5d6b4"),t=t(),(0,i.jt)(),t),b={class:"cards",style:{"background-color":"#f9f9f9",height:"400px",padding:"20px"}},C={class:"text-left lg2 KB_C2"},D={key:0,class:"help-popover",ref:"helpPopover"},k=y((()=>(0,i.Lk)("div",{style:{"font-size":"12pt"}},[(0,i.Lk)("span",null,[(0,i.eW)("직원들이 조회한 기간 동안 해당 마일리지 페이지에 방문한 횟수를 보여줍니다."),(0,i.Lk)("br"),(0,i.eW)(" 마일리지에 대한 직원들의 관심도를 알 수 있습니다.")])],-1))),L=[k],w={class:"chart-container",style:{"padding-top":"20px"}},x={class:"chart-wrapper"},_=["id"],I={class:"date-selector",style:{width:"35%"}},Y=y((()=>(0,i.Lk)("div",{class:"d-flex justify-content-between align-items-center",style:{width:"80%"}},[(0,i.Lk)("span",{class:"md highlight fw-bold"},"시작일자"),(0,i.Lk)("span",{class:"md highlight fw-bold"},"종료일자")],-1))),M={class:"date-inputs",style:{width:"100%","margin-top":"5%"}},T=y((()=>(0,i.Lk)("span",{class:"date-separator"},"-",-1))),B=y((()=>(0,i.Lk)("br",null,null,-1))),E={class:"total-visitors mt-4",style:{"text-align":"center","font-family":"'KB_S5'","font-size":"14pt"}},$=y((()=>(0,i.Lk)("div",{class:"mt-2"},null,-1))),S={class:"date-text"},z=y((()=>(0,i.Lk)("sup",null,[(0,i.Lk)("img",{src:f,class:"quote",style:{width:"6%"}})],-1))),A=y((()=>(0,i.Lk)("sup",null,[(0,i.Lk)("img",{src:v,class:"quote",style:{width:"6%"}})],-1))),K=y((()=>(0,i.Lk)("div",{class:"text-end w-100 mt-5"},[(0,i.Lk)("span",{style:{position:"absolute",top:"90%",right:"-60px",transform:"translateX(-50%)","z-index":"0","font-size":"10pt",color:"gray"}},"( 최대 조회 가능일 : 전영업일 )")],-1)));function P(t,e,a,n,o,l){return(0,i.uX)(),(0,i.CE)("div",b,[(0,i.Lk)("p",C,[(0,i.eW)((0,s.v_)(a.title)+" ",1),(0,i.Lk)("i",{class:"bi bi-question-circle",onClick:e[0]||(e[0]=(...t)=>l.toggleHelpPopover&&l.toggleHelpPopover(...t)),style:{"font-size":"15pt"}})]),o.showHelpPopover?((0,i.uX)(),(0,i.CE)("div",D,L,512)):(0,i.Q3)("",!0),(0,i.Lk)("div",w,[(0,i.Lk)("div",x,[(0,i.Lk)("canvas",{id:o.chartIds[0]},null,8,_)]),(0,i.Lk)("div",I,[Y,(0,i.Lk)("div",M,[(0,i.bo)((0,i.Lk)("input",{type:"date",class:"date",id:"startDate","onUpdate:modelValue":e[1]||(e[1]=t=>o.startDate=t),onChange:e[2]||(e[2]=(...t)=>l.updateCharts&&l.updateCharts(...t))},null,544),[[m.Jo,o.startDate]]),T,(0,i.bo)((0,i.Lk)("input",{type:"date",class:"date",id:"endDate","onUpdate:modelValue":e[3]||(e[3]=t=>o.endDate=t),onChange:e[4]||(e[4]=(...t)=>l.updateCharts&&l.updateCharts(...t))},null,544),[[m.Jo,o.endDate]])]),B,(0,i.Lk)("div",E,[(0,i.eW)(" 조회 기간 중 직원들이 가장 많이 방문한 날짜는 "),$,(0,i.Lk)("span",S,[z,(0,i.eW)(" "+(0,s.v_)(o.maxcountDate)+" ",1),A]),(0,i.eW)(" 입니다. ")]),K])])])}var O=a(6278),F=a(2022),H=a(8465),V=a.n(H),W=a(7682);F.t1.register(...F.$L);var X={name:"CardComponent",props:{title:{type:String,required:!0}},data(){return{startDate:"",endDate:"",managerChart1:{},chartIds:["managerChart1"],mile_no:null,total:0,maxcountDate:"",mincountDate:"",maxcount:0,mincount:0,dates:[],showHelpPopover:!1}},mounted(){this.setDefaultDates(),this.updateCharts()},computed:{...(0,O.L8)("login",["getLoginInfo"]),...(0,O.i0)("loginHistory",["loginHistoryCountArray"]),loginInfo(){return this.getLoginInfo}},methods:{setDefaultDates(){const t=new Date,e=new Date(t);e.setDate(t.getDate()-1);const a=e.toISOString().split("T")[0];t.setDate(t.getDate()-7);const i=t.toISOString().split("T")[0];this.startDate=i,this.endDate=a;const s=document.getElementById("endDate");s.setAttribute("max",a)},toggleHelpPopover(t){t.stopPropagation(),console.log("toggleHelpPopover 클릭"),this.showHelpPopover=!this.showHelpPopover,console.log("showHelpPopover:",this.showHelpPopover),this.showHelpPopover?document.addEventListener("click",this.handleClickOutside):document.removeEventListener("click",this.handleClickOutside)},handleClickOutside(t){console.log("handleClickOutside 실행"),!this.$refs.helpPopover||this.$refs.helpPopover.contains(t.target)||this.$refs.helpIcon.contains(t.target)||(console.log("팝오버 닫기"),this.showHelpPopover=!1,document.removeEventListener("click",this.handleClickOutside))},async updateCharts(){if(new Date(this.startDate)>new Date(this.endDate))V().fire({icon:"error",title:"Error",text:"시작 날짜는 종료 날짜보다 이전이어야 합니다."});else try{const{counts:t,dates:e}=await this.chartDataCount();this.dates=e,this.total=t.reduce(((t,e)=>t+e),0),this.maxcount=Math.max(...t),this.mincount=Math.min(...t);const a=t.indexOf(this.maxcount),i=t.indexOf(this.mincount);this.maxcountDate=this.formatted(new Date(e[a])),this.mincountDate=this.formatted(new Date(e[i])),this.renderCharts(t)}catch(t){console.error("오잉:",t)}},formatted(t){const e=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}월 ${a}일`},async chartDataCount(){const t=this.startDate.trim(),e=this.endDate.trim(),a=this.getLoginInfo.mile_no;console.log("마일넘",a);try{const i=await W.A.post("/mana/mileCount",null,{params:{startDate:t,endDate:e,mile_no:a}});console.log("Response data:",i.data);const s=i.data.map((t=>t.hit_count)),n=i.data.map((t=>t.hit_date));return console.log("결과:",s),{counts:s,dates:n}}catch(i){return console.error("Error fetching login history:",i),{counts:[],dates:[]}}},renderCharts(t){this.chartIds.forEach((e=>{const a=document.getElementById(e)?.getContext("2d");if(!a)return void console.error(`Canvas element with id '${e}' not found.`);this.managerChart1[e]&&this.managerChart1[e].destroy();const i=a.createLinearGradient(0,0,0,400);i.addColorStop(0,"rgba(255, 231, 143, 1)"),i.addColorStop(1,"rgba(255, 231, 143, 1)"),this.managerChart1[e]=new F.t1(a,{type:"bar",data:{labels:this.weekDays(),datasets:[{label:"방문자 수",backgroundColor:i,data:t,maxBarThickness:30}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"top",labels:{font:{family:"KB_C2",size:14}}},tooltip:{backgroundColor:"rgba(0, 0, 0, 0.7)",titleFont:{family:"KB_C2",size:14},bodyFont:{family:"KB_C2",size:12},padding:10,displayColors:!1}},scales:{y:{beginAtZero:!0,ticks:{font:{family:"KB_C2",size:10}},grid:{color:"rgba(0, 0, 0, 0.1)",drawBorder:!1}},x:{grid:{display:!1},ticks:{font:{family:"KB_C2",size:12}}}},animation:{duration:1500,easing:"easeOutQuart"}}})}))},weekDays(){const t=[],e=new Date(this.startDate),a=new Date(this.endDate);for(let i=new Date(e);i<=a;i.setDate(i.getDate()+1)){const e=i.getMonth()+1,a=i.getDate();t.push(`${e}.${a}`)}return t}}},q=a(6262);const Q=(0,q.A)(X,[["render",P],["__scopeId","data-v-57c5d6b4"]]);var j=Q;const U=t=>((0,i.Qi)("data-v-7f8662b4"),t=t(),(0,i.jt)(),t),R={class:"cards",style:{"background-color":"#f9f9f9",height:"400px",padding:"20px"}},J={class:"d-flex justify-content-between align-items-center"},Z={class:"text-left lg2 KB_C2"},G={class:"tabs text-end lg2 mr-3"},N={key:0,class:"loading-indicator"},tt={key:1,class:"chart-wrapper d-flex justify-content-evenly"},et={key:0,class:"chart-container",style:{"margin-right":"3%"}},at=U((()=>(0,i.Lk)("canvas",{id:"mileageChart"},null,-1))),it=[at],st={key:1,class:"chart-container",style:{"margin-right":"3%"}},nt=U((()=>(0,i.Lk)("canvas",{id:"visitsChart"},null,-1))),ot=[nt],lt={class:"",style:{width:"35%",height:"80%"}},rt={class:"stats-container",style:{height:"100%"}},ct={style:{border:"1px solid #EBEBEB","background-color":"#fff",width:"100%",height:"100%"}},dt={class:"md",style:{border:"1px solid #EBEBEB"}},ht=U((()=>(0,i.Lk)("th",null,"기준",-1))),gt=U((()=>(0,i.Lk)("td",{class:"md",style:{"font-size":"15pt"}},"전년도 대비",-1))),pt={class:"lg2",style:{"font-family":"'KB_S4'"}},ut=U((()=>(0,i.Lk)("td",{class:"md",style:{"font-size":"15pt"}},"전월 대비",-1))),mt={class:"lg2",style:{"font-family":"'KB_S4'"}},ft={class:"text-end w-100 mt-5"},vt={style:{position:"absolute",top:"90%",right:"-40px",transform:"translateX(-50%)","z-index":"0","font-size":"10pt",color:"gray"}};function yt(t,e,a,n,o,l){return(0,i.uX)(),(0,i.CE)("div",R,[(0,i.Lk)("div",J,[(0,i.Lk)("p",Z,(0,s.v_)(a.title),1),(0,i.Lk)("div",G,[(0,i.Lk)("span",{onClick:e[0]||(e[0]=t=>o.selectedTab="mileage"),class:(0,s.C4)([{active:"mileage"===o.selectedTab,chartTab:!0},"chartTab"])},"마일리지 총점",2),(0,i.eW)(" |  "),(0,i.Lk)("span",{onClick:e[1]||(e[1]=t=>o.selectedTab="visitor"),class:(0,s.C4)([{active:"visitor"===o.selectedTab,chartTab:!0},"chartTab"])},"방문자 수",2)])]),o.isLoading?((0,i.uX)(),(0,i.CE)("div",N,"데이터 로딩 중...")):((0,i.uX)(),(0,i.CE)("div",tt,["mileage"===o.selectedTab?((0,i.uX)(),(0,i.CE)("div",et,it)):(0,i.Q3)("",!0),"visitor"===o.selectedTab?((0,i.uX)(),(0,i.CE)("div",st,ot)):(0,i.Q3)("",!0),(0,i.Lk)("div",lt,[(0,i.Lk)("div",rt,[(0,i.Lk)("table",ct,[(0,i.Lk)("tr",dt,[ht,(0,i.Lk)("th",null,(0,s.v_)("mileage"===o.selectedTab?"마일리지 총점":"방문자 수"),1)]),(0,i.Lk)("tr",null,[gt,(0,i.Lk)("td",pt,[(0,i.Lk)("i",{class:(0,s.C4)(l.yearOverYearChange>=0?"bi bi-caret-up-fill":"bi bi-caret-down-fill"),style:(0,s.Tr)({color:l.yearOverYearChange>=0?"#F28080":"#808BF2",fontSize:"20pt"})},null,6),(0,i.eW)(" "+(0,s.v_)(Math.abs(l.yearOverYearChange))+"% ",1)])]),(0,i.Lk)("tr",null,[ut,(0,i.Lk)("td",mt,[(0,i.Lk)("i",{class:(0,s.C4)(l.monthOverMonthChange>=0?"bi bi-caret-up-fill":"bi bi-caret-down-fill"),style:(0,s.Tr)({color:l.monthOverMonthChange>=0?"#F28080":"#808BF2",fontSize:"20pt"})},null,6),(0,i.eW)(" "+(0,s.v_)(Math.abs(l.monthOverMonthChange))+"% ",1)])])])]),(0,i.Lk)("div",ft,[(0,i.Lk)("span",vt,"( 기준일자 : "+(0,s.v_)(o.startDate)+" )",1)])])]))])}F.t1.register(...F.$L);var bt={name:"CardComponent",props:{title:{type:String,required:!0}},data(){return{startDate:"",managerChart2:{},chartIds:["mileageChart","visitsChart"],thisYearData:[],lastYearData:[],selectedTab:"mileage",isLoading:!0,mileageCountData:null,visitCountData:null}},created(){this.setDefaultDates(),this.loadData()},mounted(){this.setDefaultDates(),this.updateCharts()},computed:{...(0,O.L8)("login",["getLoginInfo"]),loginInfo(){return this.getLoginInfo},lastMonthIndex(){const t=(new Date).getMonth();return 0===t?11:t-1},currentYearTotal(){const t="mileage"===this.selectedTab?"total_points":"visits";return this.thisYearData.reduce(((e,a)=>e+(a[t]||0)),0)},previousYearTotal(){const t="mileage"===this.selectedTab?"total_points":"visits";return this.lastYearData.reduce(((e,a)=>e+(a[t]||0)),0)},yearOverYearChange(){return 0===this.previousYearTotal?0:((this.currentYearTotal-this.previousYearTotal)/this.previousYearTotal*100).toFixed(2)},monthOverMonthChange(){const t="mileage"===this.selectedTab?"total_points":"visits",e=this.thisYearData[this.lastMonthIndex]?.[t]||0,a=this.thisYearData[this.lastMonthIndex-1]?.[t]||0;return 0===a?0:((e-a)/a*100).toFixed(2)}},watch:{selectedTab(){this.updateTotals(),this.$nextTick((()=>{this.renderCharts()}))}},methods:{async updateCharts(){try{const t=await this.mileageCount(),e=await this.visitCount();this.processData(t,e),this.renderCharts()}catch(t){console.error("updateCharts error:",t)}},async mileageCount(){const t=this.loginInfo.mile_no;try{const e=await W.A.post("/mana/mileageCount",null,{params:{mile_no:t}});return console.log("마일리지",e.data),{thisYear:e.data.thisYear.length>0?e.data.thisYear:this.getDefaultMonthlyData(),lastYear:e.data.lastYear.length>0?e.data.lastYear:this.getDefaultMonthlyData()}}catch(e){return console.error("Error fetching mileage count:",e),{thisYear:this.getDefaultMonthlyData(),lastYear:this.getDefaultMonthlyData()}}},async visitCount(){const t=this.loginInfo.mile_no;try{const e=await W.A.post("/mana/visitCount",null,{params:{mile_no:t}});return console.log("방문자수",e.data),{thisYear:e.data.thisYear.length>0?e.data.thisYear:this.getDefaultMonthlyData(),lastYear:e.data.lastYear.length>0?e.data.lastYear:this.getDefaultMonthlyData()}}catch(e){return console.error("Error fetching visit count:",e),{thisYear:this.getDefaultMonthlyData(),lastYear:this.getDefaultMonthlyData()}}},getDefaultMonthlyData(){return Array.from({length:12},((t,e)=>({month:`${e+1}`,points:0,visits:0})))},processData(t,e){const a=this.getDefaultMonthlyData(),i=t?.thisYear||a,s=t?.lastYear||a,n=e?.thisYear||a,o=e?.lastYear||a;this.thisYearData=i.map(((t,e)=>({month:t.month,total_points:t.total_points||0,visits:n[e]?.visits||0}))),this.lastYearData=s.map(((t,e)=>({month:t.month,total_points:t.total_points||0,visits:o[e]?.visits||0}))),this.updateTotals()},updateTotals(){const t="mileage"===this.selectedTab?"total_points":"visits";this.thisYearTotal=this.thisYearData.reduce(((e,a)=>e+(a[t]||0)),0),this.lastYearTotal=this.lastYearData.reduce(((e,a)=>e+(a[t]||0)),0)},async loadData(){this.isLoading=!0;try{this.mileageCountData=await this.mileageCount(),this.visitCountData=await this.visitCount(),this.processData(this.mileageCountData,this.visitCountData),this.renderCharts()}catch(t){console.error("loadData error:",t)}finally{this.isLoading=!1}},renderCharts(){const t=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],e=[{id:"mileageChart",title:"마일리지",dataKey:"total_points",yAxisLabel:"마일리지",colors:["rgba(255, 170, 231, 1)","rgba(192, 192, 192, 1)"]},{id:"visitsChart",title:"방문자 수",dataKey:"visits",yAxisLabel:"방문자 수",colors:["rgba(170, 204, 255, 1)","rgba(192, 192, 192, 1)"]}];e.forEach((e=>{const a=document.getElementById(e.id)?.getContext("2d");a?(this.managerChart2[e.id]&&this.managerChart2[e.id].destroy(),this.managerChart2[e.id]=new F.t1(a,{type:"line",data:{labels:t,datasets:[{label:`올해 ${e.title}`,data:this.thisYearData.map((t=>t[e.dataKey])),borderColor:e.colors[0],backgroundColor:e.colors[0].replace("1)","0.2)"),borderWidth:2,fill:!1,tension:.4},{label:`작년 ${e.title}`,data:this.lastYearData.map((t=>t[e.dataKey])),borderColor:e.colors[1],backgroundColor:e.colors[1].replace("1)","0.2)"),borderWidth:2,fill:!1,tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"top",labels:{font:{family:"KB_C2",size:14}}},tooltip:{mode:"index",intersect:!1,backgroundColor:"rgba(0,0,0,0.7)",titleFont:{family:"KB_C2",size:14},bodyFont:{family:"KB_C2",size:12}}},scales:{y:{beginAtZero:!0,title:{},ticks:{font:{family:"KB_C2",size:12}},grid:{color:"rgba(0, 0, 0, 0.1)"}},x:{grid:{display:!1},ticks:{font:{family:"KB_C2",size:12}}}},animation:{duration:1e3,easing:"easeInOutQuart"}}})):console.error(`Canvas element with id '${e.id}' not found.`)}))},setDefaultDates(){const t=new Date,e=new Date(t);e.setDate(t.getDate()-1);while(0===e.getDay()||6===e.getDay())e.setDate(e.getDate()-1);const a=e.getFullYear(),i=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");this.startDate=`${a}-${i}-${s}`}}};const Ct=(0,q.A)(bt,[["render",yt],["__scopeId","data-v-7f8662b4"]]);var Dt=Ct,kt={name:"ManagerMainView",components:{CardComponent:j,CompareChart:Dt},data(){return{mile_name:""}},methods:{...(0,O.i0)("mile",["fetchMileInfo"]),setDefaultImage(t){t.target.src=a(6468)},goToMileageIntroView(){this.$router.push("/introduceMileageAdminView")}},computed:{...(0,O.L8)("login",["getLoginInfo"]),...(0,O.L8)("mile",["getMileInfo"]),profileImageUrl(){return this.loginInfo&&this.loginInfo.user_no?`/profile/${this.loginInfo.user_no}.jpg`:""},loginInfo(){return this.getLoginInfo},mileInfo(){return this.getMileInfo}},async created(){const t=this.loginInfo?this.loginInfo.user_no:null;if(t){await this.fetchMileInfo(t);const e=this.getMileInfo;e?this.mile_name=e.mile_no:console.error("마일리지 이름을 가져올 수 없습니다.")}else console.error("user_no이 유효하지 않습니다.")},mounted(){this.$nextTick((()=>{if(this.$refs.mainContainer){const t=this.$refs.mainContainer.querySelectorAll(".fade-up-item");t.forEach(((t,e)=>{t.style.setProperty("--index",e),t.style.setProperty("z-index",10-e),setTimeout((()=>{t.classList.add("fade-up-active")}),100*e)}))}}))}};const Lt=(0,q.A)(kt,[["render",u],["__scopeId","data-v-bc318dc2"]]);var wt=Lt},5584:function(t,e,a){t.exports=a.p+"img/left-quote.79fcccda.png"},3543:function(t,e,a){t.exports=a.p+"img/right-quote.0262f354.png"}}]);
//# sourceMappingURL=6510.3197d787.js.map