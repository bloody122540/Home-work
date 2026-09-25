"use strict";

const todoKeys = {
    id: "id",
    text: "text",
    isCompleted: "icCompleted",
};

let todos = [];

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

const getNewTodoId = (todos) =>
    todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
    const newTodo = {
        [todoKeys.id]: getNewTodoId(todos),
        [todoKeys.text]: text,
        [todoKeys.isCompleted]: false,
    };
    todos.push(newTodo);
    return newTodo;
};

const completeTodoById = (todos, todoId) => {
    const todo = todos.find((todo) => todo[todoKeys.id] === todoId);

    if (!todo) {
        console.error(errTodoNotFound(todoId));
        return null;
    }
    todo[todoKeys.isCompleted] = !todo[todoKeys.isCompleted];
    return todo;
};

const deleteTodoById = (todos, todoId) => {
    const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
    if (todoIndex === -1) {
        console.error(errTodoNotFound(todoId));
        return todos;
    }
    todos.splice(todoIndex, 1);
    return todos;
};

const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const todosElement = document.querySelector(".todos");

const createTodoElement = (todo) => {
    const id = todo[todoKeys.id];
    const text = todo[todoKeys.text];
    const isCompleted = todo[todoKeys.isCompleted];

    const todoElement = document.createElement("li");
    todoElement.className = "todo";
    todoElement.dataset.id = id;
    todoElement.classList.toggle("completed", isCompleted);
    todoElement.innerHTML = `
        <div class="todo-text">${text}</div>
        <div class="todo-actions">
            <button class="button-complete button">&#10004;</button>
            <button class="button-delete button">&#10006;</button>
        </div>
    `;
    return todoElement;
};

const handleCreateTodo = (todos, text) => {
    const newTodo = createTodo(todos, text);
    const todoElement = createTodoElement(newTodo);
    todosElement.appendChild(todoElement);
    return newTodo;
};

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = inputElement.value.trim();
    if (!text) return;

    handleCreateTodo(todos, text);
    inputElement.value = "";
});

todosElement.addEventListener("click", ({ target }) => {
    const todoElement = target.closest(".todo");
    if (!todoElement) return;

    const todoId = Number(todoElement.dataset.id);

    if (target.closest(".button-complete")) {
        const todo = completeTodoById(todos, todoId);
        todoElement.classList.toggle("completed", todo[todoKeys.isCompleted]);
    }

    if (target.closest(".button-delete")) {
        deleteTodoById(todos, todoId);
        todoElement.remove();
    }
});