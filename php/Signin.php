<?php
    if(!empty($_POST['email']) && !empty($_POST['password'])){
        $email = $_POST['email'];
        $password = $_POST['password'];
        $con = mysqli_connect("localhost", "root", "");
        mysqli_select_db($con, "users");
        if(!$con){  
            echo 'not connect to the server';  
        }  
        if(!mysqli_select_db($con,'users')){  
            echo 'database not selected';  
        }
        $query = mysqli_query($con, "SELECT * FROM users WHERE emailId='$email'");
        $numrows=mysqli_num_rows($query);
        echo $numrows;
        if($numrows != 0){
            while($row=mysqli_fetch_assoc($query)){
                $dbEmailId=$row['emailId'];  
                $dbPassword=$row['password']; 
                echo $dbEmailId, "<br>";
                echo $dbPassword, "<br>";
                echo password_verify($password, $dbPassword);

            }
            if($email == $dbEmailId && password_verify($password, $dbPassword)){
                echo "done";
                session_start();  
                $_SESSION['sess_user']=$user;  
  
                /* Redirect browser */  
                header("Location: ../html/Canvas.html");
            }
        }else{
            echo "Invalid Username or Password";
        }
    }else{
        echo "All fields are mandatory";
    }
?>
<html>
    <body>
        <input type="text" value = "<?php echo 'hello'?>">
    </body>
</html>