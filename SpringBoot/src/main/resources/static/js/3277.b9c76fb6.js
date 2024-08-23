"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[3277],{53277:function(e,t,a){a.r(t),a.d(t,{default:function(){return H}});var s=a(20641),n=a(90033),l=a(53751);const r=e=>((0,s.Qi)("data-v-28cd654d"),e=e(),(0,s.jt)(),e),i={class:"cards page-back mx-auto"},o=r((()=>(0,s.Lk)("h2",{class:"bold-x-lg my-5",style:{"font-family":"KB_C3"}},"목표 관리",-1))),d={class:"menu-and-filters"},c={class:"tab-menu"},g={class:"search-filters"},u=r((()=>(0,s.Lk)("option",{value:""},"모든 상태",-1))),h=r((()=>(0,s.Lk)("option",{value:"ongoing"},"진행 중",-1))),p=r((()=>(0,s.Lk)("option",{value:"scheduled"},"예정",-1))),m=r((()=>(0,s.Lk)("option",{value:"completed"},"종료",-1))),f=[u,h,p,m],k={class:"d-flex justify-content-end mr-5"},L={key:0,class:"goals-list"},v=["onClick"],D={class:"goal-date"},_={class:"goal-mileage"},T={class:"goal-status"},b={class:"goal-rate"},C={class:"progress-container"},y={class:"goal-details"},w={style:{"margin-top":"40px"}},S={key:0},M={style:{"font-size":"16px","font-family":"'KB_C2', sans-serif"}},x={style:{"font-size":"16px","font-family":"'KB_C2', sans-serif"}},I={key:1},E=r((()=>(0,s.Lk)("p",null,"참가자가 없습니다.",-1))),A=[E],V={key:0,class:"modal-overlay"},O={class:"modal-content"},X={class:"modal-header"},F={class:"modal-title"},K={class:"modal-body"},U={class:"form-group"},$=r((()=>(0,s.Lk)("label",null,"목표 기간",-1))),R={class:"date-range"},P=r((()=>(0,s.Lk)("span",{class:"date-separator"},"~",-1))),B={class:"form-group"},J=r((()=>(0,s.Lk)("label",{for:"mileage-score"},"목표 마일리지 점수",-1))),Q={class:"modal-footer"};function j(e,t,a,r,u,h){const p=(0,s.g2)("Datepicker");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.Lk)("div",i,[o,(0,s.Lk)("div",d,[(0,s.Lk)("div",c,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=e=>u.currentTab="all"),class:(0,n.C4)({active:"all"===u.currentTab})},"전체",2),(0,s.Lk)("button",{onClick:t[1]||(t[1]=e=>u.currentTab="ongoing"),class:(0,n.C4)({active:"ongoing"===u.currentTab})},"진행 중",2),(0,s.Lk)("button",{onClick:t[2]||(t[2]=e=>u.currentTab="completed"),class:(0,n.C4)({active:"completed"===u.currentTab})},"종료",2)]),(0,s.Lk)("div",g,[(0,s.bo)((0,s.Lk)("input",{type:"date","onUpdate:modelValue":t[3]||(t[3]=e=>u.searchStartDate=e),onChange:t[4]||(t[4]=(...e)=>h.filterTargets&&h.filterTargets(...e)),placeholder:"시작 날짜"},null,544),[[l.Jo,u.searchStartDate]]),(0,s.bo)((0,s.Lk)("input",{type:"date","onUpdate:modelValue":t[5]||(t[5]=e=>u.searchEndDate=e),onChange:t[6]||(t[6]=(...e)=>h.filterTargets&&h.filterTargets(...e)),placeholder:"종료 날짜"},null,544),[[l.Jo,u.searchEndDate]]),(0,s.bo)((0,s.Lk)("select",{"onUpdate:modelValue":t[7]||(t[7]=e=>u.searchStatus=e),onChange:t[8]||(t[8]=(...e)=>h.filterTargets&&h.filterTargets(...e))},f,544),[[l.u1,u.searchStatus]])])]),(0,s.Lk)("div",k,[(0,s.Lk)("div",{class:"target",onClick:t[9]||(t[9]=(...e)=>h.openModal&&h.openModal(...e))},"+ 새로운 목표 📝")]),h.filteredTargets.length>0?((0,s.uX)(),(0,s.CE)("div",L,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(h.filteredTargets,((e,t)=>((0,s.uX)(),(0,s.CE)("div",{key:t,class:"goal-card"},[(0,s.Lk)("div",{class:"goal-info",onClick:e=>h.toggleExpand(t)},[(0,s.Lk)("span",D,"📅 "+(0,n.v_)(e.start_date)+" ~ "+(0,n.v_)(e.end_date),1),(0,s.Lk)("span",_,"🎯 "+(0,n.v_)(e.target_mileage)+" 마일리지 목표",1),(0,s.Lk)("span",T,(0,n.v_)(h.getStatusText(e)),1),(0,s.Lk)("span",b,"✨ "+(0,n.v_)(e.targetRate)+"% 달성",1),(0,s.Lk)("span",{class:(0,n.C4)(["dropdown",{expanded:u.expandedTargets.includes(e.target_no)}])},null,2)],8,v),(0,s.Lk)("div",C,[(0,s.Lk)("div",{class:"progress-bar",style:(0,n.Tr)({width:e.targetRate+"%"})},null,4)]),(0,s.bo)((0,s.Lk)("div",y,[(0,s.Lk)("div",w,[u.participants&&u.participants.length>0?((0,s.uX)(),(0,s.CE)("div",S,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(u.participants,((e,t)=>((0,s.uX)(),(0,s.CE)("div",{key:t,class:"participant-card"},[(0,s.Lk)("p",M," 직원 번호: "+(0,n.v_)(e.user_no),1),(0,s.Lk)("p",x," 현재 마일리지 : "+(0,n.v_)(e.current_mileage_score)+" 달성률: "+(0,n.v_)(e.achievementRate)+"% ",1)])))),128))])):(0,s.Q3)("",!0)])],512),[[l.aG,u.expandedTargets.includes(e.target_no)]])])))),128))])):((0,s.uX)(),(0,s.CE)("div",I,A))]),u.isModalOpen?((0,s.uX)(),(0,s.CE)("div",V,[(0,s.Lk)("div",O,[(0,s.Lk)("div",X,[(0,s.Lk)("h2",F,(0,n.v_)(u.mile_name)+" 목표 등록하기",1),(0,s.Lk)("button",{class:"close-button",onClick:t[10]||(t[10]=(...e)=>h.closeModal&&h.closeModal(...e))},"×")]),(0,s.Lk)("div",K,[(0,s.Lk)("div",U,[$,(0,s.Lk)("div",R,[(0,s.bF)(p,{modelValue:u.startDate,"onUpdate:modelValue":t[11]||(t[11]=e=>u.startDate=e),format:h.formatDate,placeholder:"시작일"},null,8,["modelValue","format"]),P,(0,s.bF)(p,{modelValue:u.endDate,"onUpdate:modelValue":t[12]||(t[12]=e=>u.endDate=e),format:h.formatDate,placeholder:"종료일"},null,8,["modelValue","format"])])]),(0,s.Lk)("div",B,[J,(0,s.bo)((0,s.Lk)("input",{type:"number",id:"mileage-score","onUpdate:modelValue":t[13]||(t[13]=e=>u.targetScore=e)},null,512),[[l.Jo,u.targetScore]])])]),(0,s.Lk)("div",Q,[(0,s.Lk)("button",{class:"submit-button",onClick:t[14]||(t[14]=(...e)=>h.addAction&&h.addAction(...e))},"등록")])])])):(0,s.Q3)("",!0)],64)}a(44114);var z=a(66278),N=a(66652),G={name:"TargetMileageAdminView",components:{Datepicker:N.A},data(){return{isModalOpen:!1,startDate:null,endDate:null,targetScore:0,mile_name:"",currentTab:"all",searchStartDate:"",searchEndDate:"",searchStatus:"",expandedTargets:[],participants:[]}},computed:{...(0,z.L8)("mile",["getMileInfo","getArrayMiles"]),...(0,z.L8)("login",["getLoginInfo"]),...(0,z.L8)("mileage",["getTargets"]),targets(){return this.getTargets||[]},loginInfo(){return this.getLoginInfo},mileInfo(){return this.getMileInfo},formattedTargets(){return this.targets?this.targets.map((e=>{const t=new Date(e.start_date),a=new Date(e.end_date);return{...e,targetRate:e.achievementRate,startDate:t,endDate:a,expanded:!1}})):[]},filteredTargets(){let e=this.formattedTargets;if("ongoing"===this.currentTab?e=e.filter((e=>this.isOngoing(e)||this.isScheduled(e))):"completed"===this.currentTab&&(e=e.filter((e=>this.isCompleted(e)))),this.searchStartDate&&this.searchEndDate){const t=new Date(this.searchStartDate),a=new Date(this.searchEndDate);e=e.filter((e=>{const s=new Date(e.start_date),n=new Date(e.end_date);return s>=t&&n<=a}))}return this.searchStatus&&(e=e.filter((e=>"ongoing"===this.searchStatus?this.isOngoing(e):"scheduled"===this.searchStatus?this.isScheduled(e):"completed"!==this.searchStatus||this.isCompleted(e)))),e.sort(((e,t)=>new Date(e.startDate)-new Date(t.startDate)))}},methods:{...(0,z.i0)("mile",["fetchMileInfo"]),...(0,z.i0)("mileage",["addTarget","fetchMileTarget","targetDelete"]),async addAction(){const e={mile_no:this.loginInfo.mile_no,user_no:this.loginInfo.user_no,start_date:this.formatDate(this.startDate),end_date:this.formatDate(this.endDate),target_mileage:this.targetScore},t=await this.addTarget(e);t&&t.data.success?this.showAlert("목표가 등록되었습니다","success","#"):this.showAlert("목표 등록에 실패했습니다","fail","#")},openModal(){this.isModalOpen=!0},closeModal(){this.isModalOpen=!1},showAlert(e,t,a){this.$swal({title:e,icon:t,scrollbarPadding:!1}).then((e=>{e.isConfirmed&&("#"==a?location.reload():this.$router.push(a))}))},async deleteTarget(e){const t=await this.targetDelete(e);t&&t.data.success?this.showAlert("목표가 삭제되었습니다","success","#"):this.showAlert("목표 삭제에 실패했습니다","fail","#")},formatDate(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`},isOngoing(e){const t=new Date;return e.startDate<=t&&t<=e.endDate},isScheduled(e){const t=new Date;return e.startDate>t},isCompleted(e){const t=new Date;return e.endDate<t},getStatusText(e){return this.isOngoing(e)?"진행 중":this.isScheduled(e)?"예정":this.isCompleted(e)?"종료":"알 수 없음"},filterTargets(){},toggleExpand(e){const t=this.filteredTargets[e].target_no,a=this.expandedTargets.indexOf(t);-1===a?(this.expandedTargets.push(t),this.loadParticipants(t)):this.expandedTargets.splice(a,1)},async loadParticipants(e){const t=this.loginInfo.mile_no;try{const a=await this.$store.dispatch("target/loadParticipants",{targetNo:e,mileNo:t});this.participants=a}catch(a){console.error("참가자 로드 실패:",a)}}},async created(){const e=this.loginInfo?this.loginInfo.user_no:null;if(e){await this.fetchMileInfo(e);const t=this.getMileInfo;t?this.mile_name=t.mile_no:console.error("마일리지 이름을 가져올 수 없습니다.")}else console.error("user_no이 유효하지 않습니다.");const t=this.loginInfo?this.loginInfo.mile_no:null;if(t)try{await this.fetchMileTarget(t)}catch(a){console.error("마일리지 목표 리스트를 가져오는 중 오류 발생:",a)}else console.error("mile_no가 유효하지 않습니다.")}},Y=a(66262);const q=(0,Y.A)(G,[["render",j],["__scopeId","data-v-28cd654d"]]);var H=q}}]);
//# sourceMappingURL=3277.b9c76fb6.js.map