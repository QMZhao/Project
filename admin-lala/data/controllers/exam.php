<?php
header("Content-Type:text/html; charset=utf-8");
session_start();
if($_SESSION['yhm']!=""){
header("location:index.php");
}?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>旅途后台登陆</title>
<script language="javascript">
function fun(){
    if(document.form1.t1.value==""){
        alert("用户名不可为空,请填写用户名！");
        form1.t1.focus();
        return false;
    }
if(document.form1.t2.value==""){
        alert("密码不可为空,请填写密码！");
        form1.t1.focus();
        return false;
    }
document.getElementById('form1').submit();
}
</script>
<style type="text/css">
body {
    margin:0px;
}
#up{ background:#68C6E0; height:263px; width:100%;}
.logo{margin:0 auto; background:url(picture/houtbj.jpg) center bottom no-repeat; height:250px;}
#wbk{ border:#68C6E0 1px solid; height:24px; line-height:24px;}
#bottom{ margin-top:30px; }
</style>
</head>
<body>
<div id="up">
<div class="logo"></div>
</div>
<div id="bottom">
<form id="form1" name="form1" method="post" action="login_pd.php">
<?php if(!isset($_SESSION["retry_count"]))
{
$_SESSION["retry_count"] = 1;
}
else
{
$_SESSION["retry_count"]++;
}
?>
<table width="600" border="0" cellspacing="15" style=" margin:0 auto;">

  <tr>
    <td align="right">用户名：<input name="t1" type="text" id="wbk" size="28" /></td>
    <td align="right">密码：<input name="t2" type="password" id="wbk" size="28" /></td>
  </tr>
<?php if($_SESSION["retry_count"] > 3)
{
?>
  <tr>
    <td align="right">验证码：<input name="number" type="text" size="28" id="wbk"/>
</td>
    <td align="right">
    <img style="cursor:pointer" src="admin_yzm.php" onclick="this.src=this.src+'?' + Math.random();" />
 <?php }?>
    <input name="imageField"  type="button" value="提交"  onclick="return fun()"/></td>
  </tr>
</table>
</form>
</div>
</body>
</html>