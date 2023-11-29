const refs = {
  form: document.querySelector('.js-search'),
  formContainer: document.querySelector('.js-form-container'),
  addBtn: document.querySelector('.js-add'),
  list: document.querySelector('.js-list'),
};

refs.addBtn.addEventListener('click', handleAddField);
refs.form.addEventListener('submit', handleSubmitCountries);

function handleAddField() {
  refs.formContainer.insertAdjacentHTML(
    'beforeend',
    '<input type="text" name="country" />'
  );
}

async function handleSubmitCountries(event) {
  //выключение дефолтной перезагрузки страницы
  event.preventDefault();

  //получение данных из формы
  const formData = new FormData(event.currentTarget);
  //валидация данных
  const countries = formData
    .getAll('country')
    .map(value => value.trim())
    .filter(value => value);
  console.log(countries);

  try {
    //последовательные запросы столиц и погоды в этих столицах
    const capitals = await serviceCountries(countries);
    const weather = await serviceWeather(capitals);
    console.log(capitals);
    console.log(weather);
    refs.list.innerHTML = createMarcup(weather);
  } catch (err) {
    console.log(err);
  } finally {
    event.target.reset();
  }
}

//функция запроса столиц по названиям стран
async function serviceCountries(countries) {
  //перебирает массив стран и делает параллельный запрос по всем странам
  const response = countries.map(async country => {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`
    );
    return data;
  });
  //делает из массива промисов массив ответов в состоянии settled
  const results = await Promise.allSettled(response);
  console.log(results);
  //фильтрует массив и оставляет только элементы в состоянии fulfilled
  return (
    results
      .filter(({ status }) => status === 'fulfilled')
      //перебирает массив и выводит в новом массиве значения capital
      .map(({ value }) => value[0].capital[0])
  );
}

async function serviceWeather(capitals) {
  BASE_URL = 'http://api.weatherapi.com/v1';
  ENDPOINT = 'forecast.json';
  API_KEY = '66f9e81543404d02beb160521230808';
  //перебирает массив столиц и делает параллельный запрос по всем столицам
  const response = capitals.map(async capital => {
    const { data } = await axios.get(`
    ${BASE_URL}/${ENDPOINT}?key=${API_KEY}&q=${capital}&lang=uk
    `);
    return data;
  });
  //делает из массива промисов массив объектов в состоянии settled
  const results = await Promise.allSettled(response);
  console.log(results);
  //фильтрует массив и оставляет массив объектов в состоянии fulfilled
  return results
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value: { current, location } }) => {
      const {
        temp_c,
        condition: { text, icon },
      } = current;
      const { country, name } = location;
      return { temp_c, text, icon, country, name };
    });
}

function createMarcup(arr) {
  return arr
    .map(
      ({ temp_c, text, icon, country, name }) => `<li class="weather-card">
      <img src="${icon}" alt="${text}" class="weather-icon">
      <h2>${name}, ${country}</h2>
      <h3 class="weather-text">${text}</h3>
      <h3 class="temperature">${temp_c}</h3>
  </li>`
    )
    .join('');
}
