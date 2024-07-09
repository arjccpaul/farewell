<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = 'localhost';
$username = 'root';
$password = 'root';
$dbname = 'farewell_messages';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Fetch signatures
$sql = "SELECT signature_data FROM signatures";
$result = $conn->query($sql);

$signatures = [];



if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $signatures[] = $row;
    }
}
// print_r($signatures);

echo json_encode($signatures);

$conn->close();
?>
