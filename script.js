const form = document.getElementById("form");
const library = document.getElementById("library");

//button to show up form
const newBookButton = document.getElementById("newBook").addEventListener("click", function(){
  openFormOverlay();
})

// Object constructor
function Book(title, author, numPages, readed) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.readed = readed;
}

// Display form
function openFormOverlay() {
  let formOverlay = document.getElementById("form-overlay");
  formOverlay.style.display = "flex";
}

// Array to store all the objects created
let listBooks = [];

// Store the values of the form and create a new object on submit
// Hide form on submit and cancel button
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  

  //get every input from the form
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const numPages = document.getElementById("pages").value;
  const readed = document.getElementById("read").checked;


  //create the new book using the variables where we stored the input
  let book = new Book(title, author, numPages, readed);


  //push every new object into the array that will be displayed
  listBooks.push(book);

  //call the function that displays the array
  displayBooks();

  //on submit or cancel, close the form
  let formOverlay = document.getElementById("form-overlay");
  formOverlay.style.display = "none";
});




// Display any new books created
function displayBooks() {

  //clean any previous books
  library.innerHTML = "";

  //second parameter of for each loop its to store the index
  listBooks.forEach((book, index) => {
    
    //create new cards as div and give it the id bookCard
    let bookCard = document.createElement("div");
    bookCard.setAttribute("id", "bookCard");


    for (let prop in book) {
      if (book.hasOwnProperty(prop)) {
        if (prop === "readed") {
          continue; // Skip the "readed" property it's shown on the button
        }


        //make every single letetr from each value a uppercase
        let capitalizedValue = book[prop].charAt(0).toUpperCase() + book[prop].slice(1);

        let propertyElement = document.createElement("p");

        if (prop === "numPages") {
          propertyElement.textContent = capitalizedValue + " pages";
        } else {
          propertyElement.textContent = capitalizedValue;
          
        }
        

        //append any new books to the parent container
        bookCard.appendChild(propertyElement);
        
      }
    }


    //creation of the buttons to every single card(inside the loop for each)
    let buttonReaded = document.createElement("button");
    buttonReaded.textContent = book.readed ? "Readed" : "Not Readed";
    buttonReaded.setAttribute("id", "buttonReaded");

    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete Book";
    buttonDelete.setAttribute("id", "buttonDelete");



    bookCard.appendChild(buttonReaded);
    bookCard.appendChild(buttonDelete);
    library.appendChild(bookCard);
    

    //give functionality to the buttons passing a function declared outside
    buttonReaded.addEventListener("click", function () {
      toggleReaded(book, buttonReaded);
    });

    buttonDelete.addEventListener("click", function () {
      deleteBook(index);
    });
    if (book.readed) {
      buttonReaded.style.backgroundColor = "green"; // Set button background color to green for readed books
    } else {
      buttonReaded.style.backgroundColor = "red"; // Set button background color to red for not readed books
    }
  });
 
}

// Toggle the "readed" property of a book
function toggleReaded(book, buttonReaded) {
  book.readed = !book.readed;
  buttonReaded.textContent = book.readed ? "Readed" : "Not Readed";
  //set again backcolor to update readed state
  if (book.readed) {
    buttonReaded.style.backgroundColor = "green"; 
  } else {
    buttonReaded.style.backgroundColor = "red"; 
  }
}



// Delete a book from the list
function deleteBook(index) {
  listBooks.splice(index, 1);
  displayBooks();
}


