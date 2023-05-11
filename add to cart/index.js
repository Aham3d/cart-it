const addButton = document.getElementById('add-button');
const inputField = document.getElementById('input-field');

addButton.addEventListener('click', function() {
  let inputvalue = inputField.value; 
  console.log(inputvalue);
});