document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("user_password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        if (password !== confirmPassword) {
            showError("Passwords do not match.");
            return;
        }

        clearError();

        const data = { email, username, password };

        try {
            const response = await fetch("/api/v1/addUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.status === 201) {
                window.location.href = "/login.html";
            } else if (response.status === 302) {
                showError("Username or Email already exists. Please try another.");
            } else if (response.status === 400) {
                showError("All fields are required.");
            } else {
                showError(result.error || "Something went wrong, please try again.");
            }
        } catch (e) {
            console.error("Error:", e);
            showError("An unexpected error occurred. Please try again later.");
        }
    });

    function showError(message) {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = "block";
    }

    function clearError() {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.style.display = "none";
        errorMessageElement.textContent = '';
    }
});
