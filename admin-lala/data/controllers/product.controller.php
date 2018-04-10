<?php
  require_once("../../init.php");
	//商品查询
  function getProductsByKw(){
		global $conn;
		$output=[
			"count"=>0,//总个数
			"pageSize"=>12,//每页12个
			"pageCount"=>0,//总页数
			"pageNo"=>0,//现在第几页
			"data"=>[]//商品列表
		];
		//如果客户端有传页号过来就保存在$pno，如果没传过来就是pageNo	
		@$pno=(int)$_REQUEST["pno"];
		if($pno) $output["pageNo"]=$pno;
    @$kw=$_REQUEST["kw"];
		$sql="select lid,price,title,sold_count,(select md from lala_product_pic where laptop_id=lid limit 1) as md from lala_foods ";
		if($kw){
    //var_dump($kw);
		$kws=explode(" ",$kw);//等同于js中的split，切割字符串
		 //$kws:[mac,256g]
		 for($i=0;$i<count($kws);$i++){
			$kws[$i]=" title LIKE '%".$kws[$i]."%' ";
		 }
			/*类似于这种形式：$kws:[
					" title like '%mac%' ",
					" title like '%256g%' "
			]
			*/
			$sql.=" WHERE ".implode(" and ",$kws);//类似于js:$kws.join(" and"),js中用join拼接字符串
		}
		$result=mysqli_query($conn,$sql);		
		$products=mysqli_fetch_all($result,1);
		
		//声明一个变量保存商品总数
		$output["count"]=count($products);
		//var_dump($output["count"]);
		//商品总页数=向上取整(商品总个数/商品每页个数)
		$output["pageCount"]=ceil($output["count"]/$output["pageSize"]);
		$sql.=" limit ".($output["pageNo"]*$output["pageSize"]).",".$output["pageSize"];
		$result=mysqli_query($conn,$sql);
		$output["data"]=mysqli_fetch_all($result,1);
		//var_dump($output);
		echo json_encode($output);
		}
	//getProductsByKw();
?>