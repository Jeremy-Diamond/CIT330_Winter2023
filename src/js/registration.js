// Define the customer registration form
const customerForm = document.querySelector('#customer-form');

// Define the customer database
const customers = [];

// Function to add customer to the database
function addCustomer(customer) {
  customers.push(customer);
}

// Function to display an alert message
function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#customer-form');
  container.insertBefore(div, form);
  // Remove alert after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Event listener for customer registration form submission
customerForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  const password = document.querySelector("#password").value;

  // Validate form input
  if (name === "" || email === "" || phone === ""  || password === "") {
    showAlert('Please fill in all fields', 'error');
  } else {
    // Create customer object
    const customer = {
      name: name,
      email: email,
      phone: phone,
      password: password
    };
    
    // Add customer to database
    addCustomer(customer);
    
    // Show success message
    showAlert('Customer added', 'success');
    
    // Clear form
    customerForm.reset();
  }
});