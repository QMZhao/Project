function loadProducts(pno=0) {
  //向data/routes/products/getProductsByKw.php发送get请求，携带location中的search中的=后的字符串作为参数
  $.ajax({
    type:"get",
    // url:"data/routes/products/getProductsByKw.php",
    url:"data/routes/products/getProductsByKw.php",
    data:location.search.slice(1)+"&pno"+pno,
    dataType:"json"
  }).then(output=>{
    var data=output.data;
    // console.log(data);
    var html="";
    for(var p of data){
      html+=
        `<li>
              <div class="box-container">
                <div class="box-pic">
                  <a href="product.html?lid=${p.lid}">
                    <img src="${p.md}" >
                  </a>
                </div>
                <div class="box-price">
                  <span class="lf">¥ ${p.price}</span>
                  <span class="rf">销量${p.sold_count}</span>
                </div>
                <div class="box-dec">
                  <a href="product.html?lid=${p.lid}">${p.title}</a>
                </div>
                <div class="operate">
                    <a href="#"><i></i><span>对比</span></a>
                    <a href="#">
                      <i></i><span>关注</span>
                    </a>
                    <a href="#">加入购物车</a>
                </div>
                <div></div>
              </div>
            </li>`
    }
    $(".content-boxes").html(html);
    // 分页查询
    var pageCount=output.pageCount,
      pageNo=parseInt(output.pageNo);
    // console.log(output.pageCount);
    console.log(output.pageNo);
    var html=`
      <a href="javascript:;" class="disabled">上一页</a>
    `;
    // console.log(html);
    for(var i=1;i<=pageCount;i++){
      // console.log(4);
      html+=`<a href="javascript:;">${i}</a>`;
      // console.log(html);
    }
    html+=`
      <a href="javascript:;" class="next">下一页</a>
    `;
    // console.log(html);
    var $divPages=$(".page-list");
    $divPages.html(html);
    $divPages.children(":eq("+(pageNo+1)+")").addClass("current");
    // 相应结果：遍历结果，动态拼接生成模板
    checkAStatus($divPages,pageCount,pageNo);
    // 为divPages绑定单击事件
    $divPages.off("click").click(e=> {
      var $tar=$(e.target);
      console.log("单击");
      //如果目标元素是a
      if($tar.is("a")){
      //如果a不是divPages的第一个子元素或最后一个子元素
        console.log(1);
        if(!$tar.is(":first-child,:last-child")){
          //如果当前a的class不是current
          console.log(2);
          if(!$tar.is(".current")){
            //获得当前a的内容-1
            var pno=$tar.html()-1;
            console.log(pno);
            //调用loadProducts()
            loadProducts(pno);
          }
        }
      //否则
        else{
          //如果class不以disabled结尾
          if(!$tar.is(".disabled")){
            console.log(3);
            //在divPages下查找class为current的a
            var $curr=$divPages.children(".current");
            //如果class以next开头
            if($tar.is(".next")){
              console.log(4);
              //重新加载商品列表传入current
              loadProducts($curr.html());
            }else{
              console.log(5);
              loadProducts($curr.html()-2);
            }
          }
        }
      }
    })
    $divPages.off("click").click(e=>{//为divPages绑定单击事件
      var $tar=$(e.target);
      console.log("单击");
      if($tar.is("a")){//如果目标元素是a
        //如果a不是divPages的第一个子元素和最后一个子元素
        if(!$tar.is(":first-child,:last-child")){
          //如果当前a的class不是current
          if(!$tar.is(".current")){
            //获得当前a的内容-1，保存在pno中
            var pno=$tar.html()-1;
            //调用loadProducts(pno)重新加载第pno页
            loadProducts(pno);
          }
        }else{
          //如果class不以disabled结尾
          if(!$tar.is(".disabled")){
            //在divPages下查找class为current的a
            var $curr=
              $divPages.children(".current");
            //如果class以next开头
            if($tar.is(".next")){
              //重新加载商品列表传入current的内容作为pno
              loadProducts($curr.html());
            }else{
              loadProducts($curr.html()-2);
            }
          }
        }
      }
    // })
    // $divPages.on("click",e=>{
    //   var $tar=$(e.target);
    //   console.log("click");
    //   if($tar.is("a")){
    //     console.log(1);
    //     if(!$tar.is(":first-child,:last-child")){
    //       if(!$tar.is(".current")){
    //         var pno=$tar.html()-1;
    //         loadProducts(pno);
    //       }
    //     }
    //   }
    // })
  })

});

$(()=>{
  loadProducts();
});