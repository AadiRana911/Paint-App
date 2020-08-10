<?php
    $con = mysqli_connect("localhost", "root", "");
    mysqli_select_db($con, "users");

    if(!$con){  
        echo 'not connect to the server';  
    }  
    if(!mysqli_select_db($con,'users')){  
        echo 'database not selected';  
    }
    $Name = $_POST['name'];  
    $Email = $_POST['email'];
    $pass = $_POST['password'];
    $cPass = $_POST['confirmPassword'];
    if($pass == $cPass){
        $hash = password_hash($pass, PASSWORD_BCRYPT, array('cost' => 11));
        $sql = "INSERT INTO users (emailId,name,password) VALUES ('$Email','$Name','$hash')";
        if(!mysqli_query($con,$sql)){
            echo $Name, "\n";
            echo $Email, "\n";
            echo $pass, "\n";
            echo 'Not inserted';  
        }  
        else{  
            echo 'Data Inserted';  
        }  
        header("refresh:3; url=../html/Signin.html");
    }else{
        echo "Passwords donot match";
    }
?>