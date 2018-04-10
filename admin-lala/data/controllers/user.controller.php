<?php
//data/controllers/user.controller.php
//data/init.php
require_once("../../init.php");
function register(){
  global $conn;//引入全局变量
  //从request中获得uname和upwd
  @$uname = $_REQUEST['uname'] or die('{"code":401,"msg":"uname required"}');
  @$upwd = $_REQUEST['upwd'] or die('{"code":402,"msg":"upwd required"}');
  @$email = $_REQUEST['email'] or die('{"code":403,"msg":"email required"}');
  @$phone = $_REQUEST['phone'] or die('{"code":404,"msg":"phone required"}');
  //定义SQL语句insert into ..
  $sql=" INSERT INTO lala_user (uid,uname,upwd,email,phone) VALUES (null,'$uname',md5('$upwd'),'$email','$phone')";
  //执行SQL语句获得执行结果
  $result=mysqli_query($conn,$sql);
 //如果SQL语句错误则抛出错误
  if(!$result){
    echo ('{"code":500, "msg":"db execute err"}');
    if(mysqli_error($conn)){echo mysqli_error($conn);}
  }else {
    $uid = mysqli_insert_id($conn);
    echo ('{"code":200, "msg":"register succ", "uid":'.$uid.'}');
  }
}
//var_dump(register());
function login(){
//session_start();
    global $conn;

//     @$yzm=$_REQUEST['yzm'] or die('{"code":403,"msg":"yzm":"reqired"}');

//    session_start();
    @$uname=$_REQUEST['uname'] or die('{"code":401,"msg":"uname required"}');
    @$upwd=$_REQUEST['upwd'] or die('{"code":402,"msg":"upwd":"reqired"}');
//    $yPattern = '/^[a-zA-Z]{4}$/';
//           if(!preg_match($yPattern,$yzm)){
//              echo '{"code":-5,"msg":"验证码格式不正确"}';
//              exit;
//            }
//
//             $code = $_SESSION["code"];
//              if($code!=$yzm){
//                echo '{"code":-6,"msg":"验证码不正确"}';
//                exit;
//              }else{

    //如果同时输入uname,upwd才执行以下内容
    if($uname&&$upwd){
      $sql=" SELECT uid FROM lala_user WHERE uname='$uname' and binary upwd=md5('$upwd')";
      $result=mysqli_query($conn,$sql);
      //如果SQL语句执行失败
      if(!$result){
	      echo ('{"code":201,"msg":"db execute err"}');
	      //抛出sql语句错误
	      if(mysqli_error($conn)){echo mysqli_error($conn);}
      }else{
        $row=mysqli_fetch_all($result,1);
        //如果用户账户或密码输入错误
        if(count($row)!=0){       
		    session_start();//打开session
			$_SESSION["uid"]=$row[0]["uid"];
			echo ('{"code":200,"msg":"login succ"}');
        }else{
			echo ('{"code":202,"msg":"用户名或密码错误"}');
			
		 }
	  }
	}
}
//var_dump(login());
function checkName(){
	global $conn;
  @$uname=$_REQUEST['uname'] or die('{"code":401,"msg":"uname"}');
  $uPattern='/^[a-zA-Z0-9_-]{4,20}$/i';
  $pPattern='/^[a-zA-Z0-9]{6,20}$/i';
  if(!preg_match($uPattern,$uname)){
        echo ('{"code":-1,"msg":"the input name err"}');
        exit;
      }
  if($uname){
	  $sql=" SELECT uid FROM lala_user WHERE uname='$uname' LIMIT 1";
	  $result=mysqli_query($conn,$sql);
	  //如果SQL语句执行失败
	  if(!$result){
	  echo ('{"code":500,"msg":"db execute err"}');
	  if(mysqli_error($conn)){echo mysqli_error($conn);}
	  }else{
	    $user=mysqli_fetch_assoc($result);
		  if(!$user){
		    echo ('{"code":200,"msg":"name non-exists"}');
		  }else{
		    echo ('{"code":201,"msg":"name exists"}');
		  }
		 }
	 }
 }
 function checkUpwd(){
	global $conn;
  @$upwd = $_REQUEST['upwd'] or die('{"code":402,"msg":"upwd required"}');

  $pPattern='/^[a-zA-Z0-9]{6,20}$/i';
  if(!preg_match($pPattern,$upwd)){
        echo ('{"code":-2,"msg":"the input pwd err"}');
        exit;
      }else{
        echo ('{"code":200,"msg":"upwd is suc"}');
      }
  if($upwd){
	  $sql=" SELECT uid FROM lala_user WHERE upwd='$upwd' LIMIT 1";
	  $result=mysqli_query($conn,$sql);
	  //如果SQL语句执行失败
	  if(!$result){
	  echo ('{"code":500,"msg":"db execute err"}');
	  if(mysqli_error($conn)){echo mysqli_error($conn);}
	  }else{
	    $user=mysqli_fetch_assoc($result);
		 }
	 }
 }
 //var_dump(checkName());
 function checkYzm(){
  global $conn;
  session_start();
//  @$yzm=$_REQUEST['yzm'] or die('{"code":403,"msg":"yzm":"reqired"}');
//   $yPattern = '/^[a-zA-Z]{4}$/';
//   if(!preg_match($yPattern,$yzm)){
//      echo '{"code":-5,"msg":"验证码格式不正确"}';
//      exit;
//    }
//   if($yzm){
//     $code = $_SESSION["code"];
//      if($code!=$yzm){
//        echo '{"code":-6,"msg":"验证码不正确"}';
//        exit;
//      }
//   }
 }
function checkEmail(){
  global $conn;
  @$email=$_REQUEST['email'] or die('{code:401,"msg":"email required"}');
  $ePattern='/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/';

    if(!preg_match($ePattern,$email)){
      echo ('{"code":-3,"msg":"the input email err"}');
      exit;
    }

  if($email){
  $sql=" SELECT uid FROM lala_user WHERE email='$email' LIMIT 1";
  $result=mysqli_query($conn,$sql);
  //var_dump($result);
  //如果SQL语句执行失败
  if(!$result){
       echo ('{"code":500,"msg":"db execute err"}');
      if(mysqli_error($conn)){echo mysqli_error($conn);}
  }else {
    $row=mysqli_fetch_assoc($result);
    //var_dump($row);
    //判断邮箱存不存在
    if(!$row){        //邮箱不存在
        echo('{"code":200, "msg":"email non-exists"}');
      }else {           //邮箱已经存在
        echo('{"code":201, "msg":"email exists"}');
      }
    }
  }
}
//var_dump(checkEmail());
function checkPhone(){
  global $conn;
  @$phone = $_REQUEST['phone'] or die('{"code":401,"msg":"email required"}');
  $hPattern='/^1[34578]\d{9}$/';
  if(!preg_match($hPattern,$phone)){
        echo ('{"code":-4,"msg":"the input phone err"}');
        exit;
      }
	if($phone){
  $sql = "SELECT uid FROM lala_user WHERE phone='$phone' LIMIT 1";
  $result = mysqli_query($conn,$sql);
  if(!$result){       //SQL语句执行失败
    echo('{"code":500, "msg":"db execute err"}');
    if(mysqli_error($conn)){echo mysqli_error($conn);}
  }else {
    $row = mysqli_fetch_assoc($result);
    if(!$row){        //判断电话是否存在
      echo('{"code":200, "msg":"phone non-exists"}');
    }else {           //已经存在
      echo('{"code":201, "msg":"phone exists"}');
      }
    }
  }
}
//var_dump(checkPhone());
function isLogin(){
  global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql=
			"select uname from lala_user where uid=$uid";
		$result=mysqli_query($conn,$sql);
		$user=mysqli_fetch_all($result,1);
		return ["ok"=>1,"uname"=>$user[0]["uname"]];
	}else
		return ["ok"=>0];
}

//var_dump(isLogin());
function logout(){
  session_start();
	$_SESSION["uid"]=null;
  echo '{"code":200, "msg":"logout succ"}';
}
//var_dump(logout());
function getBasic(){
	global $conn;
	session_start();
  @$uid = $_SESSION['loginUid'];
  if(!$uid){
    die('{"code":401, "msg":"login required"}');
  }
  $sql = "SELECT email,phone,user_name,gender FROM lala_user WHERE uid=$uid";
  $result = mysqli_query($conn,$sql);

  if(!$result){       //SQL语句执行失败
    echo('{"code":500, "msg":"db execute err"}');
    if(mysqli_error($conn)){echo mysqli_error($conn);}
  }else {
    $row = mysqli_fetch_assoc($result);
    if(!$row){        //用户编号不存在
      echo('{"code":501, "msg":"uid not exists"}');
    }else {           //查询成功
      $row['code'] = 200;
      echo json_encode($row);
    }
  }
}
//var_dump(getBasic());