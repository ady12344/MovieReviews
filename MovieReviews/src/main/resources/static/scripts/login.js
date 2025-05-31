try {
    const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);
    const result = await response.json();
    console.log("Response body:", result);

    if (response.status === 200) {
        console.log("Login successful");
        window.location.href = window.location.origin + "/index.html";
    } else {
        showError(result.error || "Invalid username or password.");
    }
} catch (e) {
    console.error("Error:", e);
    showError("An unexpected error occurred. Please try again later.");
}