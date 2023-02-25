// Define the login form
const loginForm = document.querySelector('#login-form');

// Define the user database
const users = [
  {
    username: 'john',
    password: 'password123'
  },
  {
    username: 'jane',
    password: 'password456'
  }
];

// Function to check if user exists in the database
function checkUser(username, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      return true;
    }
  }
  return false;
}

// Function to display an alert message
function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#login-form');
  container.insertBefore(div, form);
  // Remove alert after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Event listener for login form submission
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // Check if user exists
  if (checkUser(username, password)) {
    // Show success message
    showAlert('Login successful', 'success');
    // Redirect to dashboard page or do other actions
  } else {
    // Show error message
    showAlert('Invalid username or password', 'error');
  }
});
