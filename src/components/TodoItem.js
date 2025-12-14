import React from "react";

function TodoItem({ todo, deleteTodo, toggleComplete }) {

    // 1. 삭제 버튼 클릭 핸들러
    const handleDeleteClick = () => {
        let confirmMessage;

        // 토글 상태에 따라 메시지 변경 
        if (todo.is_completed) {
            confirmMessage = `"${todo.title}" <- 이거 다 한거 맞죠?`;
        } else {
            confirmMessage = `"${todo.title}" <- 이거 아직 안끝난거 아니에요?`;
        }

        if (window.confirm(confirmMessage)) {
            deleteTodo(todo.id);
        }
    };
    
    // 2. 제목 클릭 (토글) 핸들러
    const handleToggleClick = () => {
        // ID, 제목, 현재 상태를 App.js로 전달하여 PUT 요청
        toggleComplete(todo.id, todo.title, todo.is_completed);
    };

    return (
        <li key={todo.id}>
            <span 
                onClick={handleToggleClick}
                style={{ 
                    // 완료 상태에 따른 취소선
                    textDecoration: todo.is_completed ? 'line-through' : 'none', 
                    cursor: 'pointer' 
                }}
            >
                [{todo.is_completed ? "완료" : "진행중"}] {todo.title}
            </span>
            
            <button 
                style={{ marginLeft: '10px', cursor: 'pointer' }}
                onClick={handleDeleteClick}
            >
                삭제
            </button>
        </li>
    );
}

export default TodoItem;