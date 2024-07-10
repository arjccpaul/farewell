<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "root";
$database = "farewell_messages";

// Database configuration Server

// $servername = "sql112.infinityfree.com";
// $username = "if0_36869391";
// $password = "wdDpAcxy2fAvO";
// $database = "if0_36869391_farewell";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
