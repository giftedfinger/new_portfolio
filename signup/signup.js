document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Retrieve existing users from localStorage or initialize an empty array
  var existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Check if the username is already taken
  var isUsernameTaken = existingUsers.some(function(user) {
    return user.username === username;
  });

  if (isUsernameTaken) {
    alert('Username already taken. Please choose a different username.');
    return;
  }

  // Create a new user object
  var newUser = {
    username: username,
    password: password
  };

  // Add the new user to the existing users array
  existingUsers.push(newUser);

  // Store the updated users array in localStorage
  localStorage.setItem('users', JSON.stringify(existingUsers));

  // Reset the form
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';

  alert('Sign up successful!');

  // Redirect to login page or perform any other action
  // window.location.href = 'login.html';
});
