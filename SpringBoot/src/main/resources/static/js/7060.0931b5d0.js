"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[7060],{7060:function(s,r,t){t.r(r),t.d(r,{default:function(){return y}});var o=t(641),a=t(3751);const e=s=>((0,o.Qi)("data-v-6d84995b"),s=s(),(0,o.jt)(),s),i={class:"cards page-back mx-auto",style:{color:"#4b4a4a"}},n={class:"button-container"},l=e((()=>(0,o.Lk)("span",{class:"arrow"},"❮",-1))),c=e((()=>(0,o.Lk)("h2",null,"비밀번호 변경",-1))),d={class:"password-reset"},g={class:"form-group mb-3"},u=e((()=>(0,o.Lk)("label",{for:"password",class:"input-label"},"비밀번호 변경",-1))),h={class:"form-group"},p=e((()=>(0,o.Lk)("label",{for:"confirm_password",class:"input-label"},"비밀번호 재입력",-1))),w=e((()=>(0,o.Lk)("div",{class:"my-2"},[(0,o.Lk)("i",{class:"bi bi-info-circle"}),(0,o.eW)(" 유의사항 : 길이 : 8자리 이상 / 구성 : 영문자, 숫자, 특수문자를 최소 1자리 이상 혼합 구성 / 사용금지 : 연속, 반복문자(4자리), 대표단어(kbstar, kbfng, kbfg, kbcard) ")],-1))),m=e((()=>(0,o.Lk)("div",{class:"button-container d-flex mx-auto justify-content-center my-5"},[(0,o.Lk)("button",{type:"submit",class:"btn-green my-4",style:{"margin-right":"30px"}}," 변경 ")],-1)));function b(s,r,t,e,b,f){return(0,o.uX)(),(0,o.CE)("div",i,[(0,o.Lk)("div",n,[(0,o.Lk)("button",{class:"back-button",onClick:r[0]||(r[0]=(...s)=>f.goBack&&f.goBack(...s))},[l,(0,o.eW)(" 이전 ")])]),c,(0,o.Lk)("form",{onSubmit:r[3]||(r[3]=(0,a.D$)(((...s)=>f.changePassword&&f.changePassword(...s)),["prevent"])),class:"reset-form"},[(0,o.Lk)("div",d,[(0,o.Lk)("div",g,[u,(0,o.bo)((0,o.Lk)("input",{type:"password",id:"password","onUpdate:modelValue":r[1]||(r[1]=s=>b.password=s),placeholder:"비밀번호를 입력하세요"},null,512),[[a.Jo,b.password]])]),(0,o.Lk)("div",h,[p,(0,o.bo)((0,o.Lk)("input",{type:"password",id:"confirm_password","onUpdate:modelValue":r[2]||(r[2]=s=>b.confirm_password=s),placeholder:"비밀번호를 재입력하세요"},null,512),[[a.Jo,b.confirm_password]])])]),w,m],32)])}var f=t(6278),k=t(7682),L={name:"PasswordReissueView",data(){return{password:"",confirm_password:"",msg:""}},computed:{...(0,f.L8)("login",["getLoginInfo"]),loginInfo(){return this.getLoginInfo}},methods:{async changePassword(){const s={password:this.password,user_no:this.loginInfo.user_no};if(console.log(s),!this.password||!this.confirm_password)return this.msg="비밀번호를 모두 입력해주세요.",void this.warningAlert();if(this.password!==this.confirm_password)return this.msg="비밀번호가 일치하지 않습니다.",void this.errorAlert();if(this.password.length<8)return this.msg="비밀번호 유의사항을 확인해주세요.",void this.warningAlert();const r=/[a-zA-Z]/.test(this.password),t=/\d/.test(this.password),o=/[~`!@#$%^&*(),.?":{}|<>]/.test(this.password);if(!r||!t||!o)return this.msg="비밀번호 유의사항을 확인해주세요.",this.warningAlert(),void console.log("password pattern Error!");if(/(\w)\1\1\1/.test(this.password))return this.msg="비밀번호 유의사항을 확인해주세요.",this.warningAlert(),console.log("password continuous Error!"),!1;const a=["kbstar","kbfng","kbfg","kbcard"];if(a.some((s=>this.password.toLowerCase().includes(s))))return this.msg="비밀번호 유의사항을 확인해주세요.",this.warningAlert(),void console.log("password words contain Error!");try{const r=await k.A.post("/user/changePassword",s);console.log("비밀번호 변경완료",r.data),r.data.success?(this.msg=r.data.message,this.successAlert()):(this.msg=r.data.message,this.errorAlert())}catch(e){console.error("Error:",e),this.msg="서버 오류가 발생했습니다.",this.errorAlert()}},goBack(){this.$router.back(-1)},warningAlert(){this.$swal({title:"경고",text:this.msg,icon:"warning",scrollbarPadding:!1})},errorAlert(){this.$swal({title:"에러",text:this.msg,icon:"error",scrollbarPadding:!1})},successAlert(){this.$swal({title:"성공",text:this.msg,icon:"success",scrollbarPadding:!1})}}},v=t(6262);const A=(0,v.A)(L,[["render",b],["__scopeId","data-v-6d84995b"]]);var y=A}}]);
//# sourceMappingURL=7060.0931b5d0.js.map