 // References to elements
 const buttonContainer = document.getElementById('button-container');
 const loginForm = document.getElementById('login-form');
 const createForm = document.getElementById('create-form');
 const formContainer = document.getElementById('form-container');
 const backBtn = document.getElementById('back-btn');

 // Show login form and hide buttons
 document.getElementById('login-btn').addEventListener('click', () => {
   buttonContainer.style.display = 'none';
   formContainer.style.display = 'block'; // Make the form container visible
   loginForm.style.display = 'block'; // Show the login form
   backBtn.style.display = 'block'; // Show the back button
 });

 // Show create account form and hide buttons
 document.getElementById('create-account-btn').addEventListener('click', () => {
   buttonContainer.style.display = 'none';
   formContainer.style.display = 'block'; // Make the form container visible
   createForm.style.display = 'block'; // Show the create account form
   backBtn.style.display = 'block'; // Show the back button
 });

 // Back button logic
 backBtn.addEventListener('click', () => {
   buttonContainer.style.display = 'flex'; // Restore buttons
   formContainer.style.display = 'none'; // Hide the form container
   loginForm.style.display = 'none'; // Hide the login form
   createForm.style.display = 'none'; // Hide the create account form
   backBtn.style.display = 'none'; // Hide the back button
 });
