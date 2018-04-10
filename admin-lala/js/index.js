//轮播
$(()=>{
  var $ulImgs=$(".ck-slide-dir>.banner-img"),
      $ulInds=$(".ck-slide-dir>.indicators"),
      LIWIDTH=760,INTERVAL=500,WAIT=3000,
      moved=0,timer=null,canMove=true;
  $.get("data/routes/products/getCarousel.php")
      .then(data=> {
        // console.log(data)
        var html = "";
        for (var c of data) {
          html += `
			<li>
				<a href="${c.href}" title="${c.title}">
					<img src="${c.img}">
				</a>
			</li> 	
		`;
        }
        html += `
		<li>
			<a href="${data[0].href}" title="${data[0].title}">
				<img src="${data[0].img}">
			</a>
		</li> `;
        $ulImgs.html(html)
            .css("width", (data.length + 1) * LIWIDTH);
        $ulInds.html("<li></li>".repeat(data.length))
            .children().first().addClass("hover");

        function autoMove() {
          if (canMove){
          //先判断是否最后一张
            if (moved == data.length) {
              //将moved归0
              moved = 0;
              //将ul的left瞬间归0
              $ulImgs.css("left", 0);
            }
          //现等待WATI秒
          timer = setTimeout(() => {
            move(1,autoMove);
          }, WAIT);
        }
      }
        autoMove();
        $(".ck-slide-dir").hover(
            ()=>{//关闭轮播的开关变来那个
              canMove=false;
              clearTimeout(timer);//停止等待
              timer=null;
            },
            ()=>{//打开轮播开关，启动自动轮播
              canMove=true;
              autoMove();
            }
        );
        $ulInds.on("click","li",e=>{
          moved=$(e.target).index();
          $ulImgs.stop(true).animate({
            left: -LIWIDTH * moved
          }, INTERVAL);
          $ulInds.children(":eq(" + moved + ")")
              .addClass("hover")
              .siblings().removeClass("hover");
        });
        function move(dir,callback) {
          moved+=dir;
          // moved++;
          if (moved < data.length) {
            $ulInds.children(":eq(" + moved + ")")
                .addClass("hover")
                .siblings().removeClass("hover");
          } else {
            //如果moved已经是最后一张了，则将第一个li改为hover
            $ulInds.children(":eq(0)")
                .addClass("hover")
                .siblings()
                .removeClass("hover");
          }
          //先清除ulImgs上动画，让ulImgs移动到新的left位置
          $ulImgs.stop(true).animate({
            left: -LIWIDTH * moved
          }, INTERVAL,callback);
        }
      $(".ck-slide-dir [data-move=right]").click(()=>{
        if (moved == data.length){
        //将moved归0
        moved = 0;
        //将ul的left瞬间归0
        $ulImgs.css("left", 0);
      }
      move(1);
      });
      $(".ck-slide-dir [data-move=left]").click(()=>{
          if (moved == 0){//如果是第一张就跳到最后一张
            //将moved归0
            moved = data.length;
            //将ul的left瞬间归0
            $ulImgs.css("left",-LIWIDTH * moved);
          }
          move(-1);
        });
    })
});




var $divLift=$("#lift"),
    $floors=$(".floor");
// console.log($floors);
    // $floors=$(".floor");
//当所有楼层加载完成后
$(window).scroll(()=>{
  var scrollTop=$(window).scrollTop();
  /*********确定电梯按钮列表是否显示*********/
      //任意元素距body顶部的总距离
  var offsetTop=$("#f1").offset().top;
  if(offsetTop<scrollTop+innerHeight/2)
    $divLift.show();
  else
    $divLift.hide();
  /******具体显示哪个电梯按钮*************/
  // var $floors=$(".floor");console.log($floors);
  // for(var f of $floors){
  for (var f of Array.from($floors)){
    // console.log(f);
  // }
    var $f=$(f);
    var offsetTop=$f.offset().top;
    if(offsetTop<scrollTop+innerHeight/2){
      //找到该楼层对应的li按钮
      var i=$floors.index($f);
      var $li=
          $divLift.find(".lift_item:eq("+i+")");
      //为li添加lift_item_on class
      $li.addClass("lift_item_on")
      //为其兄弟去掉lift_item_on class
          .siblings()
          .removeClass("lift_item_on");
    }
  }
});
$divLift.on("click",".lift_item",function(){
  var $li=$(this);//this->li
  if(!$li.is(":last-child")){
    var i=$li.index();//找当前li对应的楼层
    var offsetTop=$floors.eq(i).offset().top;
    //$(window).scrollTop(offsetTop-70)
    //在HTML元素上调用animate
    //document.body.scrollTop||
    //document.documentElement.scrollTop
    $("html,body").stop(true).animate({
      scrollTop:
          $("#header-top").is(".fixed_nav")?
              offsetTop-80:offsetTop-80-80
    },500);
  }else
    $("html,body").stop(true).animate({
      scrollTop:0
    },500);
});