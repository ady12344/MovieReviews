function logout() {
    fetch('/api/v1/logout')
        .then(() => {
            window.location.href = 'login.html'; // Hard redirect to login
        })
        .catch(err => {
            console.error('Logout failed', err);
        });
}
