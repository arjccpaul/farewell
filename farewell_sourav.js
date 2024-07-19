// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener for the "Generate Message" button
    const generateBtn = document.getElementById('message-form');
    generateBtn.addEventListener('submit', generateFarewellMessage);

    // Event listener for "Sign Here" link
    const signHereLink = document.getElementById('signHereLink');
    signHereLink.addEventListener('click', captureSignature);

    // Check for existing signatures
    checkForSignatures();

    // Reload button functionality
    const reloadBtn = document.getElementById('reload-btn');
    reloadBtn.addEventListener('click', function () {
        location.reload();
    });

});

// Function to generate parts of the farewell message
function getEmotionPart(name) {
    return `<span class="emotion">Words cannot capture the depth of our feelings as we say goodbye to you, <strong>${name}</strong>. It is one of the hardest things I've had to do. There will be no one to share secrets and jokes like you.</span>`;
}

function getSupportPart() {
    return `<span class="support">The office will not be the same without your infectious laughter, your wise counsel, your unwavering support, and your cheerful spirit. Your support, wisdom, and kindness have been a constant source of strength for us.</span>`;
}

function getMissingPart() {
    return `<span class="missing">The thought of coming to work without you by our side is hard to bear. We will miss you immensely, and no one can ever replace you.</span>`;
}

function getCongratulationPart(newTeam, newPosition) {
    return `<span class="congratulation">Your <strong>${newTeam}</strong>, is incredibly lucky to have you, but they will never know the depth of your friendship as we do. However, I believe it’s not goodbye; it’s see you later. Congratulations on your <strong>${newPosition}</strong>, and wishing you all the success in your new endeavors.</span>`;
}

function getHeartsPart() {
    return `<div id="farewell-message"><span class="hearts">You will always have a place in our hearts.</span><span class="hearts">❤️❤️❤️</span></div>`;
}

// Function to generate and display the farewell message
function generateFarewellMessage(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('colleague-name').value.trim();
    const newTeam = 'new team'; //document.getElementById('new-team').value.trim();
    const newPosition = 'new position';//document.getElementById('new-position').value.trim();
    const from = document.getElementById('from-who').value.trim();
    const footerSignature = document.getElementById('footer-signature');


    if (name && newTeam && newPosition && from) {
        const messageContainer = document.getElementById('message-container');
        const farewellMessageElem = document.getElementById('farewell-message');

        // Hide input form and show message container with transition
        document.getElementById('prompt-container').style.display = 'none';
        messageContainer.style.display = 'block';
        setTimeout(() => {
            messageContainer.classList.add('show');
        }, 100);

        // Generate parts of the farewell message with animation
        setTimeout(() => {
            farewellMessageElem.innerHTML += getEmotionPart(name);
        }, 500);

        setTimeout(() => {
            farewellMessageElem.innerHTML += '<br>';
            farewellMessageElem.innerHTML += getSupportPart();
        }, 1000);

        setTimeout(() => {
            farewellMessageElem.innerHTML += '<br>';
            farewellMessageElem.innerHTML += getMissingPart();
        }, 1500);

        setTimeout(() => {
            farewellMessageElem.innerHTML += '<br>';
            farewellMessageElem.innerHTML += getCongratulationPart(newTeam, newPosition);
        }, 2000);

        setTimeout(() => {
            farewellMessageElem.innerHTML += '<br>';
            farewellMessageElem.innerHTML += getHeartsPart();

            // Show "Sign Here" link after generating message
            document.getElementById('signHereLink').style.display = 'inline';
        }, 2500);

        setTimeout(() => {
            footerSignature.style.display = 'block';
        }, 3000); // Adjust delay as necessary
    } else {
        alert('Please provide valid inputs for name, from.');
    }
}

// Function to capture signature link click
function captureSignature() {
    window.open('/signature', '_blank');
}

// Function to check for existing signatures
function checkForSignatures() {
    fetch('get_signatures.php')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.getElementById('viewSignaturesLink').style.display = 'inline';
            }
        })
        .catch(error => {
            console.error('Error fetching signatures:', error);
        });
}
