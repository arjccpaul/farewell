document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseleave', endDrawing);

    document.getElementById('clearBtn').addEventListener('click', clearCanvas);
    document.getElementById('saveBtn').addEventListener('click', saveSignature);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#333';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function endDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveSignature() {
        // Check if the canvas is empty
        if (canvasIsEmpty(canvas)) {
            Toastify({
                text: "Please provide a signature before saving.",
                duration: 3000,
                close: true,
                gravity: "top",
                backgroundColor: "#FF6347",
            }).showToast();
            return;
        }

        const signatureData = canvas.toDataURL();  // Convert canvas to base64 data URL

        const formData = new FormData();
        formData.append('signature', signatureData);

        fetch('save_signature.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message using Toastify
                    Toastify({
                        text: 'Signature saved successfully!',
                        duration: 3000, // Duration in milliseconds
                        close: true,
                        gravity: 'top', // Position: 'top', 'bottom', 'center'
                        backgroundColor: '#4CAF50', // Background color
                    }).showToast();

                    // Clear the canvas after successful save
                    clearCanvas();
                } else {
                    console.error('Failed to save signature:', data.error);
                    // Show error message using Toastify
                    Toastify({
                        text: 'Failed to save signature. Error: ' + data.error,
                        duration: 3000, // Duration in milliseconds
                        close: true,
                        gravity: 'top', // Position: 'top', 'bottom', 'center'
                        backgroundColor: '#FF6347', // Background color
                    }).showToast();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Show error message using Toastify
                Toastify({
                    text: 'An error occurred while saving the signature.',
                    duration: 3000, // Duration in milliseconds
                    close: true,
                    gravity: 'top', // Position: 'top', 'bottom', 'center'
                    backgroundColor: '#FF6347', // Background color
                }).showToast();
            });
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function canvasIsEmpty(canvas) {
        const blank = document.createElement('canvas');
        blank.width = canvas.width;
        blank.height = canvas.height;
        return canvas.toDataURL() === blank.toDataURL();
    }
});
