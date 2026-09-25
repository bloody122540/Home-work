import { todoKeys } from "./constants.js";
import { createTodo, completeTodoById, deleteTodoById } from "./servise.js";
import { setTodosToLocalStorage } from "./storage.js";

const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const todosElement = document.querySelector(".todos");

export const createTodoElement = (todo) => {
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

export const renderTodos = (todos) => {
    todosElement.innerHTML = "";
    todos.forEach((todo) => {
        const todoElement = createTodoElement(todo);
        todosElement.appendChild(todoElement);
    });
};

const handleCreateTodo = (todos, text) => {
    const newTodo = createTodo(todos, text);
    const todoElement = createTodoElement(newTodo);
    setTodosToLocalStorage(todos);
    todosElement.appendChild(todoElement);
    return newTodo;
};

export const initTodoHandlers = (todos) => {
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
            setTodosToLocalStorage(todos);
            todoElement.classList.toggle("completed", todo[todoKeys.isCompleted]);
        }

        if (target.closest(".button-delete")) {
            deleteTodoById(todos, todoId);
            setTodosToLocalStorage(todos);
            todoElement.remove();
        }
    });
};