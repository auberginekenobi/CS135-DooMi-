"use strict";!function(){function e(e,t,n){return e in n&&""!==n[e]&&(t+="&"+e+"="+n[e]),t}function t(t){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};arguments[2];firebase.auth().currentUser.getToken(!0).then(function(i){console.log(t),console.log(n);for(var a=["du_id","du_name","du_has_date","du_has_deadline","du_has_duration","du_time_start","du_time_end","du_priority","du_enforce_priority","du_note","du_status"],d="idToken="+i+"&uid="+firebase.auth().currentUser.uid+"&function_name="+t,o=0;o<a.length;o++){d=e(a[o],d,n)}console.log(d),$.ajax({cache:!1,type:"GET",url:"auth.php",data:d,success:function(e){$(".responseContainer").html(e)},error:function(e){console.log(e)}})})["catch"](function(e){console.log(e)})}var n={apiKey:"AIzaSyCdqoYOd1r8QE1-UGMOxCEIr7nJQymCXN8",authDomain:"duit-ba651.firebaseapp.com",databaseURL:"https://duit-ba651.firebaseio.com",projectId:"duit-ba651",storageBucket:"duit-ba651.appspot.com",messagingSenderId:"948811797559"};firebase.initializeApp(n);var i=document.getElementById("txtEmail"),a=document.getElementById("txtPassword"),d=document.getElementById("btnDisplay"),o=document.getElementById("btnAdd"),s=document.getElementById("btnLogin"),u=document.getElementById("btnSignUp"),c=document.getElementById("btnLogout");s&&s.addEventListener("click",function(){var e=i.value,t=a.value;firebase.auth().signInWithEmailAndPassword(e,t)["catch"](function(e){return console.log(e.message)})}),d&&d.addEventListener("click",function(){t("displayAsTable")}),$(".deleteDu")&&$(document).on("click",".deleteDu",function(e){t("deleteDu",{du_id:$(e.currentTarget).attr("class").slice(12)})}),o&&o.addEventListener("click",function(){var e=$("#du_name").val(),n=$("#du_time_start").val(),i=$("#du_time_end").val(),a=$("#du_time_deadline").val(),d=$("#du_note").val(),o=$("#du_status").val(),s=$("#du_priority").val(),u={du_name:e,du_time_start:n,du_time_end:i,du_note:d,du_status:o};""!=a&&(u.du_has_duration=1),"none"!=s&&(u.du_enforce_priority=1,u.du_priority=s),""!=a&&(u.du_has_deadline=1,u.du_time_start=a),console.log(u),t("add",u)}),u&&u.addEventListener("click",function(){var e=i.value,t=a.value,n=firebase.auth();n.createUserWithEmailAndPassword(e,t).then(function(){firebase.database().ref("users/"+n.currentUser.uid).set({uid:n.currentUser.uid})},function(e){console.log(e)})}),c&&c.addEventListener("click",function(){firebase.auth().signOut()}),firebase.auth().onAuthStateChanged(function(e){e?(console.log(e),c&&c.classList.remove("hide")):(console.log("not logged in"),c&&c.classList.add("hide"))})}(),$(document).ready(function(){function e(){i=-$("#settings").outerWidth()-150,$("#settings").css("left",i)}function t(e){var t=e?a-1:-a,n=e?1:0;$("#fade-overlay").animate({opacity:n},600),e?$("#fade-overlay").css("z-index",t):setTimeout(function(){$("#fade-overlay").css("z-index",t)},600)}var n=!1,i=0,a=5;e(),$(window).bind("resize",function(){n||setTimeout(function(){e()},200)}),$(document).on("click","body",function(e){setTimeout(function(){n&&!$(e.target).is("#settings, #settings *")?(n=!1,$("#settings").animate({left:i},700),t(0)):!n&&$(e.target).is("#settings-btn, #settings-btn *")&&(n=!0,$("#settings").animate({left:0},700),t(1))},10)}),$("#btnHideDisplay")&&$(document).on("click","#btnHideDisplay",function(){$(".responseContainer").html("")})});