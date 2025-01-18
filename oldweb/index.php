<?php
session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <title>FitCheck</title>
</head>
<body>
    <div class="login-box">
        <h2>~ Welcome ~</h2>
       
        <h2>Welcome to FitCheck</h2>
    </div>
    <?php
    // Database connection
    $servername = "mysql_db";
    $username = "user";
    $password = "password";
    $dbname = "fitcheckdatabase";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Query to select data from users table
    $sql = "SELECT uid, username, role, email, brandname, website FROM users";
    $result = $conn->query($sql);

    // Check if the table has rows and display it
    if ($result->num_rows > 0) {
        echo "<table border='1'>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Brand Name</th>
                    <th>Website</th>
                </tr>";
        
        // Output data of each row
        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>" . $row["uid"] . "</td>
                    <td>" . $row["username"] . "</td>
                    <td>" . $row["role"] . "</td>
                    <td>" . $row["email"] . "</td>
                    <td>" . $row["brandname"] . "</td>
                    <td>" . $row["website"] . "</td>
                </tr>";
        }
        echo "</table>";
    } else {
        echo "No users found.";
    }

    // Close the database connection
    $conn->close();
    ?>
</body>
</html>