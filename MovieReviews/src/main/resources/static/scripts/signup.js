document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupForm").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent normal form submission

        // Get user input values
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("user_password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        // Validate if the passwords match
        if (password !== confirmPassword) {
            showError("Passwords do not match.");
            return;
        }

        // Clear previous error messages (if any)
        clearError();

        // Create the data object to send in the request body
        const data = { email, username, password };

        try {
            // Send the POST request to the server
            const response = await fetch("/api/v1/addUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            // Parse the response from the server
            const result = await response.json();

            // Handle server responses based on the status code
            if (response.status === 201) {
                // Redirect to the login page if sign-up is successful
                window.location.href = "login.html"; // Redirect to login page after successful registration
            } else if (response.status === 302) {
                // Show error if username or email already exists
                showError("Username or Email already exists. Please try another.");
            } else if (response.status === 400) {
                // Show error if any field is empty (BAD_REQUEST)
                showError("All fields are required.");
            } else {
                // Show a generic error message if something else goes wrong
                showError(result.error || "Something went wrong, please try again.");
            }
        } catch (e) {
            // Handle any errors during the fetch request
            console.error("Error:", e);
            showError("An unexpected error occurred. Please try again later.");
        }
    });

    // Function to display the error message in red text
    function showError(message) {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = message;  // Set the error message text
        errorMessageElement.style.display = "block"; // Show the error message div
    }

    // Function to clear the error message
    function clearError() {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.style.display = "none"; // Hide the error message div
        errorMessageElement.textContent = '';  // Clear the text content
    }
});
