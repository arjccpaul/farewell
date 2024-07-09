<?php
// Database configuration
$host = 'localhost'; // Change as necessary
$dbname = 'root';
$username = 'root';
$password = 'farewell_messages';

// $servername = "localhost"; // Change this if your MySQL server is on a different host
// $username = "root"; // Your MySQL username
// $password = "root"; // Your MySQL password
// $dbname = "farewell_messages";

// Establish PDO database connection
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Enable exceptions
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Fetch associative arrays
    PDO::ATTR_EMULATE_PREPARES => false, // Disable prepared statement emulation
];
try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
?>
