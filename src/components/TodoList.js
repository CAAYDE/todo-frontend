import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo, toggleComplete }) { 

    return (
        <div className="todo-list">
            <h2>할 일 목록 ({todos.length}개)</h2>

            {/* todos가 비어 있다면 */}
            {todos.length === 0 ? (
                <p>그대들의 할 일을 추가하세요!</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            deleteTodo={deleteTodo}
                            toggleComplete={toggleComplete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoList;