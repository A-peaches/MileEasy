"use strict";(self["webpackChunkmile"]=self["webpackChunkmile"]||[]).push([[606],{606:function(t,e,o){o.r(e),o.d(e,{default:function(){return bt}});var i=o(641),n=o(33),s=o(3751);const a=t=>((0,i.Qi)("data-v-7163df9a"),t=t(),(0,i.jt)(),t),r={class:"app-container"},l={key:0,class:"content cards"},c={class:"header"},m={class:"button-container"},d=a((()=>(0,i.Lk)("span",{class:"arrow"},"❮",-1))),p={class:"actions"},u={key:0},h={key:1},_={class:"content"},g={key:0,class:"new-label"},f={class:"title"},k={class:"meta"},C={class:"author"},y={class:"date"},b={class:"main-content"},L={class:"body"},v={class:"file cards"},w={style:{display:"flex","align-items":"center"}},B=a((()=>(0,i.Lk)("h2",{style:{"margin-right":"10px"}},"첨부파일",-1))),x={key:0,style:{color:"#4b4a4a","font-family":"'KB_C2', sans-serif","margin-left":"2%","white-space":"nowrap"}},E={key:0,style:{"margin-top":"10px"}},I={class:"stats-container"},N={class:"icon-container"},$=a((()=>(0,i.Lk)("div",{class:"views-icon"},[(0,i.Lk)("i",{class:"bi bi-eye"})],-1))),T={class:"views-text"},D={class:"heart-icon"},X={class:"views-text"},R={class:"content-container"},K={class:"actions"},A=a((()=>(0,i.Lk)("span",{class:"alert-icon"},"🚨",-1))),M=a((()=>(0,i.Lk)("hr",{class:"divider"},null,-1))),U={key:1},z={key:0},P={key:1};function Q(t,e,o,a,Q,V){const S=(0,i.g2)("UserComment");return(0,i.uX)(),(0,i.CE)("div",r,[V.notice?((0,i.uX)(),(0,i.CE)("div",l,[(0,i.Lk)("div",c,[(0,i.Lk)("div",m,[(0,i.Lk)("button",{class:"back-button",onClick:e[0]||(e[0]=(...t)=>V.goBack&&V.goBack(...t))},[d,(0,i.eW)(" 이전 ")])]),(0,i.Lk)("div",p,[V.isLoggedIn&&V.notice.user_no===V.loginInfo.user_no?((0,i.uX)(),(0,i.CE)("div",u,[(0,i.Lk)("button",{class:"edit-button",onClick:e[1]||(e[1]=(...t)=>V.goToModifyView&&V.goToModifyView(...t))},"수정"),(0,i.Lk)("button",{class:"delete-button",onClick:e[2]||(e[2]=(...t)=>V.deleteNotice&&V.deleteNotice(...t))},"삭제")])):(0,i.Q3)("",!0),V.isLoggedIn&&V.loginInfo.user_is_admin&&!V.loginInfo.user_is_manager&&V.isChecked?((0,i.uX)(),(0,i.CE)("div",h,[(0,i.Lk)("button",{class:"revoke-button",onClick:e[3]||(e[3]=(...t)=>V.mtip_complainBack&&V.mtip_complainBack(...t))}," 신고취하 "),(0,i.Lk)("button",{class:"delete-button",onClick:e[4]||(e[4]=(...t)=>V.deleteNotice&&V.deleteNotice(...t))},"삭제")])):(0,i.Q3)("",!0)])]),(0,i.Lk)("div",_,[V.isNew(V.notice.mtip_board_date)?((0,i.uX)(),(0,i.CE)("span",g,"NEW")):(0,i.Q3)("",!0),(0,i.Lk)("h1",f,(0,n.v_)(V.notice.mtip_board_title),1),(0,i.Lk)("div",k,[(0,i.Lk)("span",C,(0,n.v_)(V.notice.user_name),1),(0,i.Lk)("span",y,(0,n.v_)(V.formatDate(V.notice?.mtip_board_date)),1)]),(0,i.Lk)("div",b,[(0,i.Lk)("div",L,[(0,i.Lk)("pre",null,[(0,i.Lk)("p",null,(0,n.v_)(V.notice.mtip_board_content),1)])]),(0,i.Lk)("div",v,[(0,i.Lk)("div",w,[B,V.notice.mtip_board_file?(0,i.Q3)("",!0):((0,i.uX)(),(0,i.CE)("span",x,"파일이 존재하지 않습니다."))]),V.notice.mtip_board_file?((0,i.uX)(),(0,i.CE)("div",E,[(0,i.Lk)("a",{onClick:e[5]||(e[5]=(0,s.D$)(((...t)=>V.downloadFile&&V.downloadFile(...t)),["prevent"])),href:"#",class:"file-download-link"},(0,n.v_)(V.getDisplayFileName(V.notice.mtip_board_file)),1)])):(0,i.Q3)("",!0)])]),(0,i.Lk)("div",I,[(0,i.Lk)("div",N,[$,(0,i.Lk)("div",T,(0,n.v_)(V.notice.mtip_board_hit),1)]),(0,i.Lk)("div",{class:"icon-container",onClick:e[6]||(e[6]=(...t)=>V.toggleLike&&V.toggleLike(...t))},[(0,i.Lk)("div",D,[(0,i.Lk)("i",{class:(0,n.C4)(["bi",V.isLiked?"bi-heart-fill":"bi-heart"]),style:(0,n.Tr)({color:V.isLiked?"#dc3545":"inherit"})},null,6)]),(0,i.Lk)("div",X,(0,n.v_)(V.notice.mtip_board_like),1)])])]),(0,i.Lk)("div",R,[(0,i.Lk)("div",K,[A,(0,i.Lk)("button",{class:"report-button",onClick:e[7]||(e[7]=(...t)=>V.mtip_complain&&V.mtip_complain(...t))},"신고하기")]),M,Q.isNoticeLoaded?((0,i.uX)(),(0,i.Wv)(S,{key:0,"login-info":V.loginInfo,mtip_board_no:V.notice.mtip_board_no},null,8,["login-info","mtip_board_no"])):(0,i.Q3)("",!0)])])):((0,i.uX)(),(0,i.CE)("div",U,[Q.isLoading?((0,i.uX)(),(0,i.CE)("p",z,"Loading...")):((0,i.uX)(),(0,i.CE)("p",P,"No data available"))]))])}o(4114),o(4603),o(7566),o(8721);var V=o(7682),S=o(6278),j=o(8465),F=o.n(j);const O=t=>((0,i.Qi)("data-v-5e537892"),t=t(),(0,i.jt)(),t),W={class:"comments-section"},J={class:"comments-header"},q=O((()=>(0,i.Lk)("i",{class:"bi bi-chat-right-text",style:{"font-size":"20px","margin-right":"10px"}},null,-1))),G={style:{"font-size":"17px","font-family":"'KB_C2', sans-serif","text-align":"left",margin:"0"}},H={class:"comment-input",style:{width:"100%"}},Y={key:0},Z=["src"],tt={class:"comment-content"},et={class:"comment-meta"},ot={class:"comment-user",style:{"font-family":"'KB_C2', sans-serif","font-size":"18px","margin-right":"15px"}},it={class:"comment-date",style:{"font-family":"'KB_C2', sans-serif","font-size":"14px"}},nt={class:"comment-actions",style:{"margin-left":"50px"}},st={key:0},at=["onClick"],rt=["onClick"],lt=["onClick"],ct={key:0},mt=["onUpdate:modelValue"],dt={key:1,class:"comment-text",style:{"font-family":"'KB_C2', sans-serif","font-size":"18px","margin-right":"50%","text-align":"left"}},pt={key:1,style:{"font-family":"'KB_C2', sans-serif","font-size":"15px","margin-top":"100px"}};function ut(t,e,o,a,r,l){return(0,i.uX)(),(0,i.CE)("div",W,[(0,i.Lk)("div",J,[q,(0,i.Lk)("h3",G,"댓글 ("+(0,n.v_)(l.comments.length)+")",1)]),(0,i.Lk)("div",H,[(0,i.bo)((0,i.Lk)("textarea",{class:"input-base",placeholder:"댓글을 입력해주세요","onUpdate:modelValue":e[0]||(e[0]=t=>r.newComment=t),onKeydown:e[1]||(e[1]=(0,s.jR)((0,s.D$)(((...t)=>l.addComment&&l.addComment(...t)),["prevent"]),["enter"])),style:{"font-family":"'KB_C2', sans-serif","font-size":"18px",width:"100%",height:"80px",resize:"none",padding:"10px","text-align":"left"}},null,544),[[s.Jo,r.newComment]]),(0,i.Lk)("button",{class:"btn-yellow btn-yellow:hover",onClick:e[2]||(e[2]=(...t)=>l.addComment&&l.addComment(...t)),onKeydown:e[3]||(e[3]=(0,s.jR)((0,s.D$)(((...t)=>l.addComment&&l.addComment(...t)),["prevent"]),["enter"])),style:{"font-family":"'KB_C2', sans-serif","font-size":"18px",width:"100px",height:"80px",color:"#4b4a4a"}},"등록",32)]),l.comments&&l.comments.length?((0,i.uX)(),(0,i.CE)("div",Y,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(l.comments,(t=>((0,i.uX)(),(0,i.CE)("div",{class:"comment",key:t.mtip_reply_no},[t&&t.user_no?((0,i.uX)(),(0,i.CE)("img",{key:0,src:l.profileImageUrl(t.user_no),class:"profile-small my-3",alt:"Profile Picture",onError:e[4]||(e[4]=(...t)=>l.setDefaultImage&&l.setDefaultImage(...t))},null,40,Z)):(0,i.Q3)("",!0),(0,i.Lk)("div",tt,[(0,i.Lk)("div",et,[(0,i.Lk)("span",ot,(0,n.v_)(t.user_name),1),(0,i.Lk)("span",it,(0,n.v_)(l.formatDate(t.mtip_reply_date)),1),(0,i.Lk)("div",nt,[t.user_no===o.loginInfo.user_no?((0,i.uX)(),(0,i.CE)("div",st,[t.isEditing?(0,i.Q3)("",!0):((0,i.uX)(),(0,i.CE)("button",{key:0,class:"edit-button",onClick:e=>l.startEditing(t),style:{color:"#714319"}},"수정",8,at)),t.isEditing?((0,i.uX)(),(0,i.CE)("button",{key:1,class:"edit-button",onClick:e=>l.finishEditing(t),style:{color:"#714319"}},"수정완료",8,rt)):(0,i.Q3)("",!0),(0,i.eW)("   "),(0,i.Lk)("button",{class:"delete-button",onClick:e=>l.deleteComment(t.mtip_reply_no),style:{color:"red"}},"삭제",8,lt)])):(0,i.Q3)("",!0)])]),t.isEditing?((0,i.uX)(),(0,i.CE)("div",ct,[(0,i.bo)((0,i.Lk)("textarea",{"onUpdate:modelValue":e=>t.editingContent=e,class:"input-base",style:{"font-family":"'KB_C2', sans-serif","min-height":"30px",height:"auto","font-size":"18px",width:"100%",resize:"none","overflow-y":"hidden","line-height":"2","text-align":"left","box-sizing":"border-box"}},null,8,mt),[[s.Jo,t.editingContent]])])):((0,i.uX)(),(0,i.CE)("div",dt,(0,n.v_)(t.mtip_reply_content),1))])])))),128))])):((0,i.uX)(),(0,i.CE)("div",pt," 해당 게시글의 댓글이 없습니다. "))])}var ht={name:"UserComment",props:{loginInfo:{type:Object,required:!0},mtip_board_no:{type:Number,required:!0}},data(){return{newComment:""}},created(){console.log("UserComment component created 확인해보기"),console.log("mtip_board_no 확인 중:",this.mtip_board_no),console.log("loginInfo 확인 중:",this.loginInfo),console.log("API URL 확인 중:","http://210.114.18.177:80,http://digicampus01.cafe24.com:80"),console.log("mtip_board_no:",this.mtip_board_no),this.fetchComments(this.mtip_board_no)},computed:{...(0,S.L8)("mtipReply",["getComments"]),comments(){return console.log("Computed comments:",this.getComments),this.getComments}},methods:{...(0,S.i0)("mtipReply",["fetchComments","addComment","updateComment","deleteComment"]),profileImageUrl(t){return null!=t?`/profile/${t}.jpg`:""},getInitials(t){return t?t.charAt(0).toUpperCase():"?"},startEditing(t){t.isEditing=!0,t.editingContent=t.mtip_reply_content},async fetchComments(t){await this.$store.dispatch("mtipReply/fetchComments",t)},async addComment(){if(!this.newComment.trim())return;const t={user_no:this.loginInfo.user_no,user_name:this.loginInfo.user_name,mtip_board_no:this.mtip_board_no,mtip_reply_content:this.newComment.trim()};console.log("Comment data to be sent:",t);try{const e=await this.$store.dispatch("mtipReply/addComment",t);console.log("댓글 등록 응답:",e),this.newComment="",await this.fetchComments(this.mtip_board_no)}catch(e){console.error("댓글 등록 중 오류가 발생했습니다:",e)}},setDefaultImage(t){t.target.src=o(6468)},formatDate(t){const e={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1};return new Date(t).toLocaleString("ko-KR",e)},goToModifyView(t){this.newComment=t.mtip_reply_content,this.editingCommentId=t.mtip_reply_no},async finishEditing(t){if(!t.editingContent.trim())return;const e={mtip_reply_no:t.mtip_reply_no,mtip_reply_content:t.editingContent.trim()};try{await this.$store.dispatch("mtipReply/updateComment",e),t.mtip_reply_content=t.editingContent.trim(),t.isEditing=!1}catch(o){console.error("댓글 수정 중 오류가 발생했습니다:",o)}},async deleteComment(t){try{await this.$store.dispatch("mtipReply/deleteComment",t)}catch(e){console.error("댓글 삭제 중 오류가 발생했습니다:",e)}}}},_t=o(6262);const gt=(0,_t.A)(ht,[["render",ut],["__scopeId","data-v-5e537892"]]);var ft=gt,kt=o(4034),Ct={name:"M_TipDetailView",props:["mtip_board_no"],modules:{mtipReply:kt.A},data(){return{isLoading:!0,isNoticeLoaded:!1,comments:[]}},watch:{"$route.params.mtip_board_no":{immediate:!0,handler(t,e){t&&t!==e&&(this.fetchNoticeDetail(t),this.$store.commit("mtipReply/CLEAR_COMMENTS"),this.$store.dispatch("mtipReply/fetchComments",t))}}},components:{UserComment:ft},methods:{...(0,S.i0)("mtipBoard",["fetchNoticeDetail","likePost","unlikePost","checkLikeStatus"]),async toggleLike(){if(this.loginInfo)if(this.notice)try{const t=this.isLiked?"unlikePost":"likePost",e=await this.$store.dispatch(`mtipBoard/${t}`,{mtip_board_no:this.notice.mtip_board_no,user_no:this.loginInfo.user_no});console.log("서버에서 받은 좋아요 상태:",e),await this.$store.dispatch("mtipBoard/checkLikeStatus",{mtip_board_no:this.notice.mtip_board_no,user_no:this.loginInfo.user_no}),-1!==e&&(this.notice.mtip_board_like=e.isLiked)}catch(t){console.error("Error toggling like:",t)}else console.error("Notice data is not available");else alert("로그인이 필요합니다.")},async deleteNotice(){F().fire({title:"경고",text:"정말로 삭제하시겠습니까?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#4b4a4a",cancelButtonColor:"#bd2c3a",confirmButtonText:"확인",cancelButtonText:"취소",reverseButtons:!1}).then((async t=>{if(t.isConfirmed)try{await V.A.delete(`/mtip/delete/${this.notice.mtip_board_no}`),F().fire("게시글 삭제 완료","게시글이 삭제 되었습니다.","success").then((()=>{this.$router.push("/M_TipListView")}))}catch(e){console.error("게시글 삭제 중 오류가 발생했습니다.",e),F().fire("게시글 삭제 중 오류가 발생했습니다.","","error")}}))},mtip_complain(){1!==this.notice.mtip_complain&&!0!==this.notice.mtip_complain?F().fire({title:"신고",text:"정말로 이 게시글을 신고하시겠습니까?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#4b4a4a",cancelButtonColor:"#bd2c3a",confirmButtonText:"확인",cancelButtonText:"취소",reverseButtons:!1}).then((async t=>{if(t.isConfirmed)try{await V.A.post(`/mtip/complain/${this.notice.mtip_board_no}`),F().fire("신고완료","정상적으로 게시글 신고가 완료되었습니다.","success").then((()=>{this.$router.push("/M_TipListView")}))}catch(e){console.error("신고하기 중 오류가 발생했습니다.",e),F().fire("신고하기 중 오류가 발생했습니다.","","error")}})):F().fire({title:"경고",text:"이미 신고된 게시글 입니다.",icon:"error",showCancelButton:!0,confirmButtonColor:"#4b4a4a",cancelButtonColor:"#bd2c3a",confirmButtonText:"확인",cancelButtonText:"취소",reverseButtons:!1})},mtip_complainBack(){F().fire({title:"신고취하",text:"정말로 이 게시글의 신고취하 하시겠습니까?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#4b4a4a",cancelButtonColor:"#bd2c3a",confirmButtonText:"확인",cancelButtonText:"취소",reverseButtons:!1}).then((async t=>{if(t.isConfirmed)try{await V.A.post(`/mtip/complainBack/${this.notice.mtip_board_no}`),F().fire("성공","정상적으로 게시글 신고취하가 완료되었습니다.","success").then((()=>{this.$router.push("/M_TipListView")}))}catch(e){console.error("신고취하 중 오류가 발생했습니다.",e),F().fire("신고취하 중 오류가 발생했습니다.","","error")}}))},showAlert(t,e){this.$swal({title:t,icon:e,confirmButtonText:"확인",confirmButtonColor:"#4b4a4a",allowOutsideClick:!1,allowEscapeKey:!1,allowEnterKey:!1,stopKeydownPropagation:!1,scrollbarPadding:!1,backdrop:!0,didOpen:()=>{document.body.classList.add("no-scroll"),document.documentElement.style.overflow="hidden"},willClose:()=>{document.body.classList.remove("no-scroll"),document.documentElement.style.overflow=""}})},getDisplayFileName(t){const e=37;return!t||t.length<=e?t:"_"===t.charAt(e-1)?t.substring(e):t},goBack(){this.$router.go(-1)},goToModifyView(){console.log("modify 화면으로 넘긴 정보:",this.notice.mtip_board_no),this.$router.push({name:"m_TipModifyView",params:{mtip_board_no:this.notice.mtip_board_no}})},isNew(t){const e=new Date,o=new Date(t),i=Math.abs(e-o),n=Math.ceil(i/864e5);return n<=7},formatDate(t){if(console.log("Formatting date:",t),!t)return"Date not available";const e=new Date(t);if(isNaN(e.getTime()))return console.error("Invalid date string:",t)," ↺ 댓글 등록 중";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1};return e.toLocaleString("ko-KR",o)},async downloadFile(){try{console.log("글쓰기 상세보기 fileName :",this.notice.mtip_board_file);const t=encodeURIComponent(this.notice.mtip_board_file),e=await(0,V.A)({url:`/mtip/downloadGuide/${t}`,method:"GET",responseType:"blob"}),o=window.URL.createObjectURL(new Blob([e.data])),i=document.createElement("a");i.href=o,i.setAttribute("download",this.notice.mtip_board_file),document.body.appendChild(i),i.click(),document.body.removeChild(i)}catch(t){console.error("파일 다운로드 중 오류 발생:",t),this.showAlert("파일 다운로드 중 오류가 발생했습니다.","error")}},async fetchNoticeDetail(t){this.isLoading=!0,this.isNoticeLoaded=!1,await this.$store.dispatch("mtipBoard/fetchNoticeDetail",t);const e=JSON.parse(localStorage.getItem("likedPosts"))||{};this.isLiked=e[this.notice.mtip_board_no]||!1,this.isLoading=!1,this.isNoticeLoaded=!0}},computed:{...(0,S.L8)("login",["getLoginInfo","getIsChecked"]),...(0,S.L8)("mtipBoard",["getNotice"]),...(0,S.aH)("login",["loginInfo"]),...(0,S.aH)("mtipBoard",["likedPosts"]),notice(){return console.log("여기여기",this.getNotice),this.getNotice||null},loginInfo(){return this.getLoginInfo},isChecked(){return this.getIsChecked},isLoggedIn(){return!!this.loginInfo},mileNo(){return this.$route.params.notice.mtip_board_no},isLiked(){return this.$store.getters["mtipBoard/isPostLiked"](this.loginInfo.user_no,this.notice.mtip_board_no)}},mounted(){const t=this.$route.params.mtip_board_no;t&&(this.fetchNoticeDetail(t),this.$store.commit("mtipReply/CLEAR_COMMENTS"),this.$store.dispatch("mtipReply/fetchComments",t))}};const yt=(0,_t.A)(Ct,[["render",Q],["__scopeId","data-v-7163df9a"]]);var bt=yt}}]);
//# sourceMappingURL=606.c0fb1b63.js.map