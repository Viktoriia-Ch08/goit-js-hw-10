import { selectEl, loaderTextEl, errorTextEl, divEl } from './js/refs';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
// get Breeds (filled them into select and shown them for user)
getBreeds();

function getBreeds() {
  fetchBreeds()
    .then(breeds => {
      fillBreedsSelect(breeds);
      setSlimSelect();
      selectEl.classList.toggle('is-hidden');
    })
    .catch(() => fetchErr())
    .finally(() => changeLoaderHiddenClass());
}

function fillBreedsSelect(breeds) {
  selectEl.innerHTML = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join(' ');
}

// reaction on selected breed

selectEl.addEventListener('change', handleBreedSelect);

function handleBreedSelect(event) {
  divEl.innerHTML = '';
  changeLoaderHiddenClass();

  const breedId = event.target.value;

  // return info about chosen cat
  fetchCatByBreed(breedId)
    .then(data => {
      return createMarkupCatInfo(data);
    })
    .catch(() => fetchErr())
    .finally(() => changeLoaderHiddenClass());
}

function createMarkupCatInfo(catInfo) {
  const { url, breeds } = catInfo[0];
  const { name, description, temperament } = breeds[0];

  divEl.innerHTML = `<img src='${url}' alt='${name}' width=500 height=300><div class='cat-info-wrapper'><h2>${name}</h2>
      <p>${description}</p><p class='temperament-text'>${temperament}</p></div>`;
}

// change class for loader
function changeLoaderHiddenClass() {
  loaderTextEl.classList.toggle('is-hidden');
  loaderTextEl.classList.toggle('loader');
}

// error report
function fetchErr() {
  Report.failure('Error', `${errorTextEl.textContent}`, 'OK');
}

function setSlimSelect() {
  new SlimSelect({
    select: selectEl,
  });
}
