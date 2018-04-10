$(()=>{
  /*用户名和密码的非空验证*/
  $("#uname").blur(function(){
    if(!this.value){
      // console.log(this);
      $(".showResult").text("用户名不能为空").addClass("msg-error");
      return false;
    }
  });
  $("#upwd").blur(function () {
    if(!this.value){
      $(".showResult").text("密码不能为空").addClass("msg-error");
      return false;
    }
  });
  /**验证码验证**/
$(".yzm-text").on("click",function (e) {
  e.preventDefault();
  console.log(11);
  this.previousElementSibling.src="data/controllers/03_code_gg.php";
  console.log(this.previousElementSibling);
});
  $("#yzm").blur(function() {
    if (!this.value) {
      $(".showResult").text("验证码不能为空").addClass("msg-error");
      console.log(this);
    }
  })
  /**登录单击按钮事件监听**/
  $("#btn-login").on("click",function () {
    /*******/
    // $("#yzm").blur(function(){
    //   if(!this.value) {
    //     $(".showResult").text("验证码不能为空").addClass("msg-error");
    //     console.log(this);
    //   }else{
    //     var that=this;
    //     console.log(that);
    //     if(!that){
    //       return;
    //     }
    //     $.ajax({
    //       type:"post",
    //       url:"data/routes/users/checkYzm.php",
    //       data:{yzm:that.value},
    //       success:function (result) {
    //         if(result.code === -5){
    //           $(".showResult").text(result.msg).addClass("msg-error");
    //         }else if(result.code === -6){
    //           $(".showResult").text(result.msg).addClass("msg-error");
    //         }
    //       }
    //     })
    //   }
    // });
    /*******/
    var data = $(".login-box").serialize();
    console.log(data);
    $.ajax({
      type: "POST",
      url: "data/routes/users/login.php",
      data: data,
      success: function (result) {
        if (result.code === 200) {
          var pageToJump = result.pageToJump ? result.pageToJump : "index.html";
          location.href = pageToJump;
        } else if (result.code === 201) {
          $(".showResult").text("登录失败," + result.msg).addClass("msg-error");
        }
        // else
        //   if(result.code === -5){
        //             $(".showResult").text(result.msg).addClass("msg-error");
        //           }else if(result.code === -6){
        //             $(".showResult").text(result.msg).addClass("msg-error");
        //           }
      }
    })
  });
  /***7天之内不再登录***/
  //在登录加载后激活cookie函数
  $(document).ready(function () {
    //判断attr() 方法设置或返回被选元素的属性值。
    if($.cookie("rmbUser") == "true"){
      $("#ck_rmbUser").attr("checked",true);
      $("#username").val($.cookie("username"));
      $("#password").val($.cookie("password"));
    }
  });
  //记住用户名和密码
  function save() {
    if($("#ck_rmbUser").attr("checked")){
      var str_username=$("#username").val();
      console.log(str_username);
      var str_password=$("#password").val();
      //存储一个带7天期限的cookie
      $.cookie("rmbUser","true",{expires:7});
      $.cookie("username",str_username,{expires:7});
      $.cookie("password",str_password,{expires:7});
    }else{
      $.cookie("rmbUser", "false", {expire: -1});
      $.cookie("username", "", {expires: -1});
      $.cookie("password", "", {expires: -1});
    }
  }
  save();
});