<?php

include 'connection.php';

// Fetch signatures
$sql = "SELECT signature_data FROM signatures";
$result = $conn->query($sql);

$signatures = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $signatures[] = $row;
    }
}

echo json_encode($signatures);

$conn->close();
?>
