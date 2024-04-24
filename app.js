const darkModeBtn = document.getElementById("darkModeBtn");
const darkModeImg = document.getElementById("darkModeImg");
const loader = document.getElementById('loader');
const errorElement = document.getElementById('error'); 
const photosList = document.getElementById('photosList');
const searchForm = document.getElementById('searchForm'); 
const  clearAllBtn = document.querySelector('.clearAllBtn');




function clearProductList() {
    photosList.innerHTML = "";
}

//submit
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let query = document.getElementById('input').value;
    fetchImages(query);
  });

//default 
fetchImages(searchForm.querySelector('#input').placeholder);

function fetchImages(query) {
  loader.classList.remove('hidden');
  errorElement.classList.add('hidden');
  fetch(`https://api.unsplash.com/search/photos?client_id=UYnLqUjFYXOfn8_Syucmsn164Do84HG_xtyHnrcjE2U&query=${query}&per_page=10`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        createUI(data.results);
        loader.classList.add('hidden');
      })
    .catch((error) => {
      console.error('Fetch error:', error);
      loader.classList.add('hidden');
      errorElement.classList.remove('hidden');
    });
}


// Ui
function createUI(data) {
  photosList.innerHTML = ''; 
  data.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerHTML = `<img src=${item.urls.small} class="images">`;
    photosList.appendChild(li)
  });
}





//Dark Mode 
if (localStorage.getItem('DarkMode') === "dark") {
    document.body.classList.add("dark-theme");
    darkModeBtn.lastChild.textContent = "Light Mode";
    darkModeImg.setAttribute('src', 'images/day-mode.png');
} else {
    document.body.classList.remove('dark-theme');
    darkModeBtn.lastChild.textContent = "Dark Mode";
    darkModeImg.setAttribute('src', 'images/night-mode.png');
}


darkModeBtn.addEventListener('click',()=>{

    if(document.body.classList.contains("dark-theme")){
        document.body.classList.remove("dark-theme");
        darkModeBtn.lastChild.textContent ="";
        darkModeImg.setAttribute('src','images/night-mode.png');
        localStorage.setItem('DarkMode',"light");
    }  else {
        document.body.classList.add('dark-theme');
        darkModeBtn.lastChild.textContent = "";
        darkModeImg.setAttribute('src', 'images/day-mode.png');
        localStorage.setItem('DarkMode', "dark");
    }
});


//clear All

// "Clear All"
 clearAllBtn.addEventListener('click', () => {
    const confirmBtn = confirm("O'chirib yuborilsinmi?");
    if (confirmBtn) {
        clearProductList();
        loader.classList.add('hidden');
        error.classList.add('hidden');
    } else {
        alert("Malumotlar joyida!");
    }
});



