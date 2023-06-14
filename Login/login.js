document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Add your login logic here
  console.log('Username:', username);
  console.log('Password:', password);

  // Reset the form
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
});
