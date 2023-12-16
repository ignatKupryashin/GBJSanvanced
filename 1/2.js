"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {

}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"), 
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel, 
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.










//Решение

const dishesAndCooks = new Map;
dishesAndCooks.set('Пицца "Маргарита"', 'повар: Виктор')
    .set('Пицца "Пепперони"', 'повар: Виктор')
    .set('Суши "Филадельфия"', 'повар: Ольга')
    .set('Суши "Калифорния"', 'повар: Ольга')
    .set('Десерт "Тирамису"', 'повар: Дмитрий')
    .set('Десерт "Чизкейк"', 'повар: Дмитрий');





///////////////////// Model /////////////////////

const restaurantModel = {
  listOfOrders: new Map(),
  allCooks: dishesAndCooks
}


///////////////////// View /////////////////////

const restaurantView = {

  pushOrderButton() {

    const makeOrderButton = document.querySelector(`[name="make-order"]`);
    makeOrderButton.addEventListener("click", (event) => {
      event.preventDefault();

      const clientName = document.querySelector(`[name="get-name"]`).value;
      const selectedDishes = document.querySelectorAll('input[type="checkbox"]:checked');

      const listOfSelectedDihes = [];
      selectedDishes.forEach(dish => {
        listOfSelectedDihes.push(dish.value);
      });

      if (clientName === '' || listOfSelectedDihes.length === 0) {
        const firstParagraph = document.querySelector('.your-order');
        firstParagraph.textContent = "Некорректное оформление заказа! Нажмите на кнопку 'Очистить форму' и заполните форму полностью!";
      } else {
        restaurantController.makeOrder(clientName, listOfSelectedDihes);
      }
      makeOrderButton.setAttribute('disabled', 'disabled');

    });
  },
  pushWatchCookButton(){
    const watchCookButton = document.querySelector(`[name="watch-cook"]`);
    watchCookButton.addEventListener("click", () => {
      const selectedDishes = document.querySelectorAll('input[type="checkbox"]:checked');
      const listOfSelectedDihes = [];
      selectedDishes.forEach(dish => {
        listOfSelectedDihes.push(dish.value);
      });

      if (listOfSelectedDihes.length === 0) {
        const ul = document.querySelector('.cook-name-list');
        const warningLi = document.createElement('li');
        warningLi.textContent = "Вы не можете просмотреть информацию о поварах, так как не оформили заказ!";
        ul.append(warningLi);
      } else {
        restaurantController.getCooksNames(listOfSelectedDihes);            }
      watchCookButton.setAttribute('disabled', 'disabled');
    });
  },

  pushFirstClearButton() {
    const firstClearButton = document.querySelector(`[name="clear-order"]`);
    firstClearButton.addEventListener('click', () => {
      const firstParagraph = document.querySelector('.your-order');
      firstParagraph.textContent = '';
      document.querySelector('.forma').reset();

      const makeOrderButton = document.querySelector(`[name="make-order"]`);
      makeOrderButton.removeAttribute('disabled', 'disabled');


      const showCooksUl = document.querySelector('.cook-name-list');
      const allLi = showCooksUl.querySelectorAll('li');
      allLi.forEach((child) => { child.remove() });

      const watchCookButton = document.querySelector(`[name="watch-cook"]`);
      watchCookButton.removeAttribute('disabled', 'disabled');

    });
  },

  showOrder() {
    const firstParagraph = document.querySelector('.your-order');
    for (const [key, value] of restaurantModel.listOfOrders) {
      firstParagraph.textContent = `Клиент ${key.name} заказал(а): ${value}`;
    }
  },

  showCooks(listOfCooks){
    const showCooksUl = document.querySelector('.cook-name-list');
    listOfCooks.forEach(cookInfo => {
      const li = document.createElement('li');
      li.textContent = cookInfo;
      showCooksUl.append(li);
    });

  },

  showSecondWarning(warning) {
    const secondParagraph = document.querySelector('.your-orders');
    if (warning) {
      const li = document.createElement('li');
      li.textContent = warning;
      secondParagraph.append(li);
    }
    const showOrdersButton = document.querySelector(`[name="show-all-orders"]`);
    showOrdersButton.setAttribute('disabled', 'disabled');
  },

  showAllOrders() {
    const showOrdersButton = document.querySelector(`[name="show-all-orders"]`);
    showOrdersButton.addEventListener("click", () => {

      let allOrdersList = [];
      allOrdersList = restaurantController.getAllOrders();

      const secondParagraph = document.querySelector('.your-orders');
      allOrdersList.forEach(order => {
        const li = document.createElement('li');
        li.textContent = `Клиент: ${order.client} заказал(а): ${order.orderedDishes}`;
        secondParagraph.append(li);
      });
      showOrdersButton.setAttribute('disabled', 'disabled');
    });
  },

  pushSecondClearButton() {
    const secondClearButton = document.querySelector(`[name="clear-all-orders"]`);
    secondClearButton.addEventListener('click', () => {
      const secondParagraph = document.querySelector('.your-orders');
      const allLi = secondParagraph.querySelectorAll("li");
      allLi.forEach((child) => { child.remove() });

      const showOrdersButton = document.querySelector(`[name="show-all-orders"]`);
      showOrdersButton.removeAttribute('disabled', 'disabled');
    });
  },


}
restaurantView.pushOrderButton();
restaurantView.pushWatchCookButton();
restaurantView.pushFirstClearButton();
restaurantView.pushSecondClearButton();
restaurantView.showOrder();
restaurantView.showAllOrders();


///////////////////// Controller /////////////////////

const restaurantController = {

  makeOrder(client, dishes) {

    const newClient = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      name: client
    }

    restaurantModel.listOfOrders.set(newClient, dishes);
    restaurantView.showOrder();
  },

  getCooksNames(list){
    const arrayOfChekedDishes = list;
    const cooksAndDishes = [];

    arrayOfChekedDishes.forEach(dish => {
      restaurantModel.allCooks.forEach(function(value, key) {
        if (dish === key) {
          const result = `Блюдо ${dish} приготовил(а) ${value}.`
          return cooksAndDishes.push(result);
        }
      })
    });
    restaurantView.showCooks(cooksAndDishes);
  },

  getAllOrders() {
    const orders = [];
    if (restaurantModel.listOfOrders.size === 0) {
      const warning = "В данный момент список заказов пуст!";
      restaurantView.showSecondWarning(warning);
    } else {
      let counter = 0;
      for (const [key, value] of restaurantModel.listOfOrders) {
        counter++;
        let order = { client: key.name, orderedDishes: value };
        orders.push(order);
      }
      return orders;
    }
  }
}