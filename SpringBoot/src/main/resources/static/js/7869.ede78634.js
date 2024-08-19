"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[7869],{7869:function(e,t,i){i.r(t),i.d(t,{default:function(){return V}});var l=i(641),o=i(3751),n=i(33);const s={class:"cards page-back mx-auto"},a={class:"d-flex p-4"},c=(0,l.Lk)("p",{class:"lg2"},[(0,l.Lk)("i",{class:"bi bi-chevron-left lg2 border border-secondary p-2 rounded-2"}),(0,l.eW)("  이전 ")],-1),d=[c],r={class:"p-4 mt-5"},u={class:"d-flex justify-content-between"},m=(0,l.Lk)("h3",{class:"lg p-3",style:{"text-align":"left","font-family":"KB_C2"}},"마일리지 항목",-1),h={class:"d-flex justify-content-end align-items-center"},f=(0,l.Lk)("label",{class:"btn custom-radio-btn",for:"공통",style:{width:"5vw","font-size":"15pt","font-family":"'KB_C3'"}},"공통",-1),p=(0,l.Lk)("label",{class:"btn custom-radio-btn",for:"개인",style:{width:"5vw","font-size":"15pt","font-family":"'KB_C3'"}},"개인",-1),_=(0,l.Lk)("label",{class:"btn custom-radio-btn",for:"기업",style:{width:"5vw","font-size":"15pt","font-family":"'KB_C3'"}},"기업",-1),g={class:"p-4"},b={class:"input-gray p-4"},k={class:"p-4"},y=(0,l.Lk)("h3",{class:"lg p-3",style:{"text-align":"left","font-family":"KB_C2"}},"상세 내용",-1),L={class:"p-4"},w={class:"input-gray p-4"},v={class:"p-4"},C=(0,l.Lk)("h3",{class:"lg p-3",style:{"text-align":"left","font-family":"KB_C2"}},"첨부 파일",-1),x={class:"p-4"},I={class:"d-flex input-gray p-4"},M={key:0,class:"md",style:{"text-align":"left"}},J={class:"my-5"};function A(e,t,i,c,A,B){return(0,l.uX)(),(0,l.CE)("div",s,[(0,l.Lk)("div",a,[(0,l.Lk)("button",{type:"button",onClick:t[0]||(t[0]=(...e)=>B.goBack&&B.goBack(...e))},d)]),(0,l.Lk)("div",r,[(0,l.Lk)("div",u,[m,(0,l.Lk)("div",h,[(0,l.bo)((0,l.Lk)("input",{type:"radio",class:"btn-check",name:"job_name",id:"공통",value:"공통","onUpdate:modelValue":t[1]||(t[1]=e=>A.selectedJob=e),autocomplete:"off",checked:""},null,512),[[o.XL,A.selectedJob]]),f,(0,l.bo)((0,l.Lk)("input",{type:"radio",class:"btn-check",name:"job_name",id:"개인",value:"개인","onUpdate:modelValue":t[2]||(t[2]=e=>A.selectedJob=e),autocomplete:"off"},null,512),[[o.XL,A.selectedJob]]),p,(0,l.bo)((0,l.Lk)("input",{type:"radio",class:"btn-check",name:"job_name",id:"기업",value:"기업","onUpdate:modelValue":t[3]||(t[3]=e=>A.selectedJob=e),autocomplete:"off"},null,512),[[o.XL,A.selectedJob]]),_])]),(0,l.Lk)("div",g,[(0,l.Lk)("div",b,[(0,l.bo)((0,l.Lk)("input",{type:"text",class:"lg2","onUpdate:modelValue":t[4]||(t[4]=e=>A.mile_title=e),style:{width:"100%","text-align":"left"}},null,512),[[o.Jo,A.mile_title]])])])]),(0,l.Lk)("div",k,[y,(0,l.Lk)("div",L,[(0,l.Lk)("div",w,[(0,l.bo)((0,l.Lk)("textarea",{"onUpdate:modelValue":t[5]||(t[5]=e=>A.mile_content=e),class:"lg2",style:{"text-align":"left",width:"100%",height:"30vh"}},null,512),[[o.Jo,A.mile_content]])])])]),(0,l.Lk)("div",v,[C,(0,l.Lk)("div",x,[(0,l.Lk)("div",I,[(0,l.Lk)("input",{type:"file",onChange:t[6]||(t[6]=(...e)=>B.handlerFileUpload&&B.handlerFileUpload(...e)),class:"md",style:{width:"80%","text-align":"right"}},null,32),A.before_mile_route?((0,l.uX)(),(0,l.CE)("span",M,"기존 파일: "+(0,n.v_)(A.before_mile_route),1)):(0,l.Q3)("",!0)])])]),(0,l.Lk)("div",J,[(0,l.Lk)("button",{onClick:t[7]||(t[7]=(...e)=>B.updateAction&&B.updateAction(...e)),class:"btn-green",style:{width:"8vw",height:"3vw","font-size":"1.2vw","font-family":"KB_C2"}},"수정")])])}i(4114);var B=i(6278),U={name:"IntroduceMileageModifyAdminView",data(){return{mile_title:"",mile_content:"",file:null,before_mile_route:"",mile_introduce_no:null,mile_no:"",selectedJob:""}},computed:{...(0,B.L8)("mile",["getMileDetail"]),...(0,B.L8)("login",["getLoginInfo","getIsChecked"]),mileDetail(){return this.getMileDetail},loginInfo(){return this.getLoginInfo},isChecked(){return this.getIsChecked}},methods:{...(0,B.i0)("mile",["getMileModify","updateMile"]),goBack(){this.$router.go(-1)},handlerFileUpload(e){this.file=e.target.files[0],this.mile_route=this.file?this.file.name:""},async updateAction(){const e=new FormData;if(e.append("mile_introduce_no",this.mile_introduce_no),e.append("mile_title",this.mile_title),e.append("job_name",this.selectedJob),e.append("mile_content",this.mile_content),this.file)e.append("file",this.file);else{const t=await fetch(this.before_mile_route),i=await t.blob(),l=this.before_mile_route.split("/").pop(),o=new File([i],l,{type:i.type});e.append("file",o)}const t=await this.updateMile(e);t&&t.data.success?this.showAlert("마일리지가 수정되었습니다","success","/IntroduceMileageAdminView"):this.showAlert("마일리지 수정에 실패했습니다","error","#")},showAlert(e,t,i){this.$swal({title:e,icon:t,scrollbarPadding:!1}).then((e=>{e.isConfirmed&&"#"!==i&&this.$router.push(i)}))},checkLoginInfo(){(!this.getLoginInfo||1==this.getLoginInfo.user_is_manager&&0==this.getIsChecked)&&(window.location.href="/noAccess")}},async created(){if(this.checkLoginInfo(),this.mile_no=this.loginInfo?this.loginInfo.mile_no:null,this.mile_introduce_no=this.$route.query.mile_introduce_no,this.mile_introduce_no&&this.mile_no){await this.getMileModify({mile_introduce_no:this.mile_introduce_no,mile_no:this.mile_no});const e=this.getMileDetail;e?(this.mile_title=e.mile_title,this.selectedJob=e.job_name,this.mile_content=e.mile_content,this.before_mile_route=e.mile_route):console.error("해당 마일리지 정보를 가져올 수 없습니다.")}else console.error("mile_introduce_no이 유효하지 않습니다.")}},j=i(6262);const K=(0,j.A)(U,[["render",A]]);var V=K}}]);
//# sourceMappingURL=7869.ede78634.js.map