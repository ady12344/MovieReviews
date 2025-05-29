document.getElementById('profileBtn').addEventListener('click', () => {
    fetch('/api/v1/getCurrentUsername')
        .then(response => {
            if (!response.ok) throw new Error("Not logged in");
            return response.text();
        })
        .then(username => {
            fetch(`/api/v1/getUserByUsername?username=${encodeURIComponent(username)}`)
                .then(res => res.json())
                .then(data => {
                    // Load profile.html and initialize after it’s loaded
                    loadPage('profile.html', () => {
                        // Set username and email
                        document.getElementById('greeting').innerText = `Hello, ${data.username}`;
                        document.getElementById('email').innerText = `Email: ${data.email}`;

                        // Handle password change form
                        const passwordForm = document.getElementById('passwordForm');
                        const messageDiv = document.getElementById('passwordMessage');

                        passwordForm.addEventListener('submit', (e) => {
                            e.preventDefault();

                            const oldPassword = document.getElementById('oldPassword').value;
                            const newPassword = document.getElementById('newPassword').value;

                            fetch('/api/v1/changePassword', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    oldPassword,
                                    newPassword
                                })
                            })
                                .then(res => {
                                    if (res.ok) {
                                        messageDiv.textContent = 'Password changed successfully.';
                                        messageDiv.className = 'text-success mt-3';
                                        passwordForm.reset();
                                    } else {
                                        res.text().then(msg => {
                                            messageDiv.textContent = msg;
                                            messageDiv.className = 'text-danger mt-3';
                                        });
                                    }
                                })
                                .catch(error => {
                                    console.error('Password change error:', error);
                                    messageDiv.textContent = 'An error occurred. Please try again.';
                                    messageDiv.className = 'text-danger mt-3';
                                });
                        });

                        // Handle logout button
                        const logoutButton = document.getElementById('logoutBtn');
                        logoutButton.addEventListener('click', logout);
                    });
                });
        })
        .catch(error => {
            console.error('User fetch error:', error);
            alert('You must be logged in to view the profile.');
            window.location.href = 'login.html';
        });
});
