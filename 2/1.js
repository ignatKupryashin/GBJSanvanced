"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {

    constructor(inputBooks) {
        this._booklist = new Set;
        console.log(inputBooks);
        for (const inputBooksKey of inputBooks) {
            this.addBook(inputBooksKey)
        }
    }

    addBook(title) {
        if (!this.hasBook(title)) {
            this._booklist.add(title);
        }
        else throw "Такая книга уже есть"
    }


    removeBook(title) {
        if (this.hasBook(title)) {
            this._booklist.delete(title);
        }
        else throw "Такой книги нет в списке"
    }

    hasBook(title) {
        return this._booklist.has(title)
    }


    get allBooks() {
        return Array(...this._booklist);
    }
}

const myLib = new Library(["Война и Мир", "Гарри Поттер"]);
myLib.addBook("Властелин колец");
console.log(myLib.allBooks)
// myLib.addBook("Властелин колец");
myLib.removeBook("Война и Мир");
console.log(myLib.allBooks);

