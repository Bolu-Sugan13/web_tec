<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "employee_db";

// Connect to database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}

$message = "";

// When form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $department = $_POST["department"];
    $salary = $_POST["salary"];

    // Insert employee details
    $sql = "INSERT INTO employees (name, email, phone, department, salary)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if ($stmt) {

        $stmt->bind_param(
            "ssssd",
            $name,
            $email,
            $phone,
            $department,
            $salary
        );

        if ($stmt->execute()) {
            $message = "Employee Details Saved Successfully!";
        } else {
            $message = "Error while saving: " . $stmt->error;
        }

        $stmt->close();

    } else {
        $message = "SQL Error: " . $conn->error;
    }
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Employee Details</title>

   <style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', Arial, sans-serif;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 40px 20px;

    background:
        radial-gradient(circle at top left,
        rgba(124, 92, 255, 0.35),
        transparent 35%),

        radial-gradient(circle at bottom right,
        rgba(0, 212, 255, 0.25),
        transparent 35%),

        linear-gradient(135deg, #141e30, #243b55);

    color: white;
}

/* FORM CONTAINER */

.container {
    width: 450px;
    max-width: 100%;

    padding: 45px 40px;

    border-radius: 20px;

    background: rgba(255, 255, 255, 0.08);

    backdrop-filter: blur(18px);

    border: 1px solid rgba(255, 255, 255, 0.15);

    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.35);

    animation: slideUp 0.7s ease;
}

/* ANIMATION */

@keyframes slideUp {

    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}

/* HEADING */

h2 {
    text-align: center;

    font-size: 28px;

    margin-bottom: 30px;

    letter-spacing: 0.5px;

    color: #ffffff;
}

/* LABEL */

label {
    display: block;

    margin-top: 16px;
    margin-bottom: 7px;

    font-size: 14px;

    color: #d5d7e0;
}

/* INPUT */

input {
    width: 100%;

    padding: 13px 15px;

    border-radius: 8px;

    border:
        1px solid
        rgba(255, 255, 255, 0.15);

    background:
        rgba(255, 255, 255, 0.08);

    color: white;

    font-family: inherit;

    font-size: 14px;

    outline: none;

    transition: 0.3s;
}

/* INPUT FOCUS */

input:focus {

    border-color: #8f7cff;

    background:
        rgba(255, 255, 255, 0.12);

    box-shadow:
        0 0 0 3px
        rgba(124, 92, 255, 0.15);

}

/* BUTTON */

button {

    width: 100%;

    padding: 14px;

    margin-top: 28px;

    border: none;

    border-radius: 8px;

    background:
        linear-gradient(
            135deg,
            #7c5cff,
            #4b7bec
        );

    color: white;

    font-family: inherit;

    font-size: 15px;

    font-weight: 500;

    cursor: pointer;

    transition: 0.3s;

    box-shadow:
        0 10px 25px
        rgba(76, 91, 255, 0.3);
}

/* BUTTON HOVER */

button:hover {

    transform: translateY(-3px);

    box-shadow:
        0 15px 30px
        rgba(76, 91, 255, 0.5);

}

/* BUTTON CLICK */

button:active {

    transform: translateY(0);

}
/* SUCCESS / ERROR MESSAGE */
.message {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    padding: 12px;
    margin-bottom: 20px;
    border-radius: 8px;
    background:
        rgba(72, 199, 116, 0.15);
    color: #b7f7c5;
    border:
        1px solid
        rgba(72, 199, 116, 0.25);
}
/* RESPONSIVE */
@media (max-width: 500px) {
    .container {
        padding: 35px 25px;

    }
    h2 {
        font-size: 23px
    }
}
</style>
</head>

<body>

<div class="container">

    <h2>Employee Registration Form</h2>

    <?php
    if ($message != "") {
        echo "<p class='message'>$message</p>";
    }
    ?>

    <form method="POST" action="">

        <label>Employee Name</label>
        <input type="text" name="name" required>

        <label>Email</label>
        <input type="email" name="email" required>

        <label>Phone Number</label>
        <input type="text" name="phone" required>

        <label>Department</label>
        <input type="text" name="department" required>

        <label>Salary</label>
        <input type="number" name="salary" required>

        <button type="submit">Save Employee</button>

    </form>

</div>

</body>
</html>

<?php
$conn->close();
?>
