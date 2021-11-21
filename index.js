
const config = {
  url: "https://pixabay.com/api/",
  key: "20710972-75b99232bccd614faaca28eeb",
};

let arrPictures = []

render();

// получение картинок
async function getPictures() {
  try {
    const fetchData = await fetch(
      `${config.url}?image_type=photo&orientation=horizontal&q=dog&page=1&per_page=10&key=${config.key}`
    );

    const res = await fetchData.json();

    return res.hits;
  } catch (error) {
    console.log(error);
  }
}

// рендер списка картинок

async function render() {
  const renderForm = document.querySelector(".picture-carusel").content;


  const renderPlace = document.querySelector("#my-picture-list");

  const data = await getPictures().then();

  const pictureFragment = document.createDocumentFragment();

  for (let i of data) {
    const clonedPictureTemplate = renderForm.cloneNode(true);

    clonedPictureTemplate.querySelector(".picture").src = i.webformatURL;
    pictureFragment.appendChild(clonedPictureTemplate);
  }

  renderPlace.appendChild(pictureFragment);

  arrPictures = document.querySelectorAll(".gallery-card");

  const caruselPictureRes = caruselPicture(arrPictures);

  setInterval(() => {
    caruselPictureRes.next();
  }, 2000);
}

// карусель

function caruselPicture(arr) {
  var i = 0;

  arr[i].classList.add("picture-center");
  arr[i].classList.remove("picture-start");

  return {
    next: async function () {

      let el
      i < arr.length-1 ? el = i+1 : el = 0 

      arr[i].classList.add("movi-right");
      arr[el].classList.add("movi-right");
 

      setTimeout(() => {
        arr[i].classList.toggle("picture-center");
        arr[i].classList.toggle("picture-start");
    
    
        arr[el].classList.toggle("picture-start");
        arr[el].classList.toggle("picture-center");
    
        arr[i].classList.toggle("movi-right");
        arr[el].classList.toggle("movi-right");
        i < arr.length - 1 ? ++i : (i = 0);
      }, 1500)

    },
  };
}
