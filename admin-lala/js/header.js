//加载index.html->自动执行header.js
$(()=>{
  function loadStatus() {
    var $loginList = $("#loginList");
    var $welcomList = $("#welcomList");
    ajax({
      type: "get",
      url: "data/routes/users/isLogin.php?"
    }).then(data => {
      if (data.ok == 1) {
        $loginList.hide();
        $welcomList.show();
        $("#uname").html(data.uname);
      } else {
        $loginList.show();
        $welcomList.hide();
      }
    });
  }

    ajax({
      type: "get",
      url: "header.html",
      dataType: "html"
    }).then(html => {
      $(".header").html(html);
      // 如果url中有kw参数，就读取kw参数到txtSearch文本框中
      if(location.search)
        $("#txtSearch").val(decodeURI(
          location.search.split("=")[1])
        );
      /*为search按钮添加单击事件，跳转到商品列表页*/
      //查找data-trigger属性为search的a绑定单击事件
        $("[data-trigger=search]").click(()=>{
          // console.log(1);
        //获得id为txtSearch的内容，去掉开头和结尾的空格保存在变量kw中
       var kw= $("#txtSearch").val().trim();
          // console.log(kw);
      //   //如果kw不为""
        if (kw !== "")
      //   //用location跳转到products.html?kw=kw
          location = "search.html?kw="+kw;
        });
    loadStatus();
    //注销
    $("#logout").click(()=>{
      ajax({
        type:"get",
        url:"data/routes/users/logout.php",
        dataType:"text"
      }).then(()=>location.reload())
    })
  })
});