/*1.对用户名进行验证*/
//为uname绑定失去焦点事件
$(()=>{
  uname.onblur=function () {
    if(this.validity.valueMissing){
      this.nextElementSibling.innerHTML="用户名不能为空";
      this.nextElementSibling.className="msg-error";
    }else if(this.validity.tooShort){
      this.nextElementSibling.innerHTML="用户名长度不能少于4位";
      this.nextElementSibling.className="msg-error";
    }else{
      var that=this;
      if(!that.value){
        // console.log(1);
        return;
      }
      $.ajax({
        type: "post",
        url: 'data/routes/users/checkName.php',
        data: {uname: that.value},
        success: function (result) {
          if(result.code === -1){
            that.nextElementSibling.innerHTML="用户名格式错误";
            that.nextElementSibling.className="msg-error";
          }else
          if (result.code === 201) {
            console.log(result);
            that.nextElementSibling.innerHTML = '用户名已被占用';
            that.nextElementSibling.className = 'msg-error';
          } else if (result.code === 200) {
            console.log(result);
            that.nextElementSibling.innerHTML = '用户名可以使用';
            that.nextElementSibling.className = 'msg-success';
            upwd.focus();
          }else{
            callback();
          }
        }
      })
    }
  };

//为uname绑定获得焦点事件
uname.onfocus=function () {
  this.nextElementSibling.innerHTML;
  this.nextElementSibling.className="msg-default";
};
/*******验证密码********/
//为upwd绑定失去焦点事件
upwd.onblur=function () {
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML="密码不能为空";
    this.nextElementSibling.className="msg-error";
  } else
  if(this.validity.tooShort){
    this.nextElementSibling.innerHTML="密码不能少于6位";
    this.nextElementSibling.className="msg-error";
  }else {
    var that=this;
    //判断用户没有输入任何内容的时候
    if(!that.value){
      return;
    }
    $.ajax({
      type:"post",
      url:"data/routes/users/checkUpwd.php",
      data:{upwd:that.value},
      success:function (result) {
        if(result.code === -2){
          that.nextElementSibling.innerHTML="密码格式错误";
          that.nextElementSibling.className="msg-error";
        }else if(result.code === 200){
          that.nextElementSibling.innerHTML="密码可用";
          that.nextElementSibling.className="msg-success";
        }
      },
      error:function () {
        alert("网络故障请检查");
      }
    });
  }
};
//为upwd绑定获得焦点事件
upwd.onfocus=function () {
  this.nextElementSibling.innerHTML;
  this.nextElementSibling.className="msg-default";
};

/*2.对确认密码进行验证*/
upwdconfirm.onblur=function () {
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML="密码不能为空";
    this.nextElementSibling.className="msg-error";
  }else if(this.validity.tooShort){
    this.nextElementSibling.innerHTML="密码不能少于6位";
    this.nextElementSibling.className="msg-error";
  }else if(this.value != upwd.value){
    this.nextElementSibling.innerHTML="两次密码输入不一致";
    this.nextElementSibling.className="msg-error";
  }else{
    this.nextElementSibling.innerHTML="密码确认通过";
    this.nextElementSibling.className="msg-success";
  }
}
upwdconfirm.onfocus=function () {
  this.nextElementSibling.innerHTML;
  this.nextElementSibling.className="msg-default";
}


/*3.对邮箱地址进行验证*/
email.onblur=function () {
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML="邮箱输入不能为空";
    this.nextElementSibling.className="msg-error";
  }else {
    var that=this;
    //如果用户没有输入任何内容的时候retrun
    if(!that){return;}
    $.ajax({
      type:"post",
      url:"data/routes/users/checkEmail.php",
      data:{email:that.value},
      success:function (result) {
        if(result.code === 200){
          that.nextElementSibling.innerHTML="邮箱可用";
          that.nextElementSibling.className="msg-success";
        }else if(result.code === 201){
          that.nextElementSibling.innerHTML="邮箱已被注册";
          that.nextElementSibling.className="msg-error";
        }else if(result.code === -3){
          that.nextElementSibling.innerHTML="邮箱格式不正确";
          that.nextElementSibling.className="msg-error";
        }
      },
      error:function () {
        alert("网络故障请检查!");
      }
    })
  }
};
email.onfocus=function () {
  this.nextElementSibling.innerHTML;
  this.nextElementSibling.className="msg-default";
};


/*4.对手机号进行验证*/
phone.onblur=function () {
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML="手机号不能为空";
    this.nextElementSibling.className="msg-error";
  }else {
    var that=this;
    if(!that){
      return;
    }
    $.ajax({
      type:"post",
      url:"data/routes/users/checkPhone.php",
      data:{phone:that.value},
      success:function (result) {
        if(result.code === 200){
          that.nextElementSibling.innerHTML="手机号码可用";
          that.nextElementSibling.className="msg-success";
        }else
        if(result.code === 201){
          that.nextElementSibling.innerHTML="手机号码已被注册";
          that.nextElementSibling.className="msg-error";
        }else
          if(result.code === -4){
          that.nextElementSibling.innerHTML="手机号码格式不对";
          that.nextElementSibling.className="msg-error";
          }
      },
      error:function () {
        alert("网络故障请检查!");
      }
    })
  }
};
phone.onfocus=function () {
  this.nextElementSibling.innerHTML;
  this.nextElementSibling.className="msg-default";
};

  /**注册按钮监听函数**/
  $('#bt-register').click(function () {
    console.log(1);
    //创建一个变量来保存遍历的个数
    var count = 0;
    //遍历查找class为form-group下匹配的元素，对 jQuery 对象进行迭代，为每个匹配元素执行函数。
    $('.form-group').each(function () {
      console.log(2);
      //判断在form-group下查找所有span元素的className都为success成功通过的时候执行以下请求
      if ($(this).find('span').hasClass('msg-success')) {
        //每执行成功一次就保存一次
        count++;
        console.log(3);
      }
    });
    //当遍历结束，以上验证都通过的时候，发送ajax请求
    if (count == 5) {
      $.ajax({
            type: 'POST',
            url: 'data/routes/users/register.php',
        //.serialize() 方法可以操作已选取个别表单元素的 jQuery 对象，比如 <input>, <textarea> 以及 <select>。不过，选择 <form> 标签本身进行序列化一般更容易些
        //查找class为box-list下输出标准的查询字符串
            data: $('.box-list').serialize(),
            success: function(result){
              if(result.code===200){
                alert('注册成功！')
                  location.href= 'login.html';
              }else {
                alert('注册失败');
              }
            }
          })
        }
      })
});









