export const getTodosFromLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem("todos")) ?? [];
    } catch {
        return [];
    }
};

export const setTodosToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};