<?php
header('Content-Type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin:*');
header('Access-Controll-Allow-Credentials:true');
$conn=mysqli_connect(
	"127.0.0.1","root","","lala",3306);
mysqli_query($conn,"SET NAMES UTF8");