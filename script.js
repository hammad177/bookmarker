/** @format */

const myForm = document.getElementById('my-form');
myForm.addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  e.preventDefault();
  // Get Values
  let name = document.getElementById('site-name').value;
  let url = document.getElementById('site-url').value;

  if (!validateForm(name, url)) {
    return false;
  }

  // Create node of bookmarke
  const bookmark = {
    siteName: name,
    siteURL: url
  };

  // Test if bookmark is null
  if (localStorage.getItem('bookmarks') === null) {
    // Initialize bookmark
    let bookmarks = [];
    // Add to bookmark
    bookmarks.push(bookmark);
    // Set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get List Items
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Update List
    bookmarks.push(bookmark);
    // Set Update List Items
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  myForm.submit();
  myForm.reset();
}

// Delete Bookmarke
function deleteBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const findIndex = bookmarks.findIndex((x) => x.siteURL === url);

  bookmarks.splice(findIndex, 1);
  console.log(bookmarks);

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks() {
  // Get List Items
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  let list = document.getElementById('list');
  let output = '';

  // Render Bookmarke
  bookmarks.map((val) => {
    return (output += `<li class="list-group-item mb-3 lead fw-normal rounded">
    ${val.siteName}
    <a href="${val.siteURL}" target='blank' class="btn btn-primary mx-3">Visit</a>
    <button onclick="deleteBookmark(\'${val.siteURL}\')" class="btn btn-danger">Delete</button>
    </li>`);
  });

  list.innerHTML = output;
}

// Validation

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
