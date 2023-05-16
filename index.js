import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://playground-a64cc-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings); 
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList"); 

const addButton = document.getElementById('add-button');
const inputField = document.getElementById('input-field');
const shoppingList = document.getElementById('shopping-list');


addButton.addEventListener('click', function() {
  let inputvalue = inputField.value; 

  push(shoppingListInDB, inputvalue);

  clearInputField();

});

onValue(shoppingListInDB, function(snapshot) {

  if(snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    // console.log(snapshot.val());
  
    clearShoppingList();
  
    for(let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0]; 
      let currenItemsValue = currentItem[1];
  
      appenditem(currentItem);
    }
  } else {
    shoppingList.innerHTML = "no items here... yet"
  }



})


function clearShoppingList() {
  shoppingList.innerHTML = "";
}

function clearInputField() {
  inputField.value = "";
}

function appenditem(item) { 

  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement('li'); 

  newEl.textContent = itemValue;

  newEl.addEventListener('click', function() {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  })

  shoppingList.append(newEl);
}


