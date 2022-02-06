const Methods = {
  init() {
    Methods.fillChampionList();
    Methods.events();
  },

  events() {
    const formEl = document.querySelector('.champions--search');
    const closeBtnEl = document.querySelector('.close');
    const infoEl = document.querySelector('.info');

    formEl.addEventListener('submit', (event) => {
      const searchValue = event.target[0].value;
      event.preventDefault();
      Methods.fillChampionList(searchValue);
    });
    document.addEventListener('click', function (e) {
      if (
        e.target &&
        e.target.parentElement.className == 'champions--list__item'
      ) {
        const lastClicked = document.querySelector(
          '.champions--list__item span.is__active',
        );
        if (lastClicked) lastClicked.classList.remove('is__active');
        e.target.classList.add('is__active');
        Methods.fillInfo(e.target.parentElement.id);
      }
    });
    closeBtnEl.addEventListener('click', () => {
      infoEl.classList.remove('is__active');
    });
  },

  async fillChampionList(search) {
    // Pega os dados do JSON
    const champions = await (await fetch('../data/championFull.json')).json();
    // Seleciona os elementos pertinentes
    const championListEL = document.querySelector('.champions--list ul');

    //Percorre a lista de campeões e cria os elementos na tela
    championListEL.innerHTML = '';
    Methods.filter(search, Object.keys(champions.data)).map((item) => {
      const champ = champions.data[item];
      championListEL.innerHTML += `
      <li id="${champ.id}" class="champions--list__item"><span style="background-image: url('./img/champion/tiles/${champ.id}_0.jpg');"></span></li>
      `;
    });
  },

  async fillInfo(id) {
    const chanpionsEl = document.querySelector('.champions');
    const infoEl = document.querySelector('.info');
    chanpionsEl.classList.remove('is__contracted');
    const champions = await (await fetch('../data/championFull.json')).json();

    setTimeout(() => {
      // Pega os dados do JSON
      const champInfo = champions.data[id];
      console.log(champInfo);
      // Seleciona os elementos pertinentes
      const banner = document.querySelector('.info--banner');
      const name = document.querySelector('.info--name');
      const title = document.querySelector('.info--title');
      const lore = document.querySelector('.info--lore');

      banner.style.backgroundImage = `url(./img/champion/splash/${champInfo.id}_0.jpg)`;
      name.innerText = champInfo.name;
      title.innerText = champInfo.title;
      lore.innerText = champInfo.lore;
      infoEl.classList.add('is__active');
      chanpionsEl.classList.add('is__contracted');
    }, 400);
  },

  filter(term = '', arr) {
    const newArr = [];
    if (term === '') return arr;
    arr.map((item, index) => {
      if (
        item.toLowerCase().split(term.toLowerCase().replace(' ', '')).length > 1
      ) {
        newArr.push(item);
      }
    });
    return newArr;
  },
};
Methods.init();
