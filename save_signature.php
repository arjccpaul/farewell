<?php
// Connect to your MySQL database
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "farewell_messages";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST request to save signature
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['signature'])) {
        $signatureData = $_POST['signature'];

        // Insert signature into the database
        $sql = "INSERT INTO signatures (signature_data) VALUES (?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $signatureData);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to save signature.']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'No signature data received.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}

// Close connection
$conn->close();
?>
