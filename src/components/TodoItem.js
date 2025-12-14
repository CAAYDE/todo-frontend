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
        // 아이템 컨테이너: 상태에 따라 배경색과 텍스트 스타일 변경
        <div className={`flex justify-between items-center p-3 my-2 rounded-lg transition duration-300 
            ${todo.is_completed ? 'bg-green-100 text-gray-500 line-through' : 'bg-gray-100 hover:bg-gray-200'}`
        }>
            
            {/* 제목과 토글 영역 */}
            <div className='flex items-center gap-3'>
                <input
                    type='checkbox'
                    checked={todo.is_completed}
                    onChange={handleToggleClick}
                    // 체크박스 스타일: 남색 포인트 컬러
                    className='form-checkbox h-5 w-5 text-indigo-600 rounded cursor-pointer'
                />
                <span className={`text-lg ${todo.is_completed ? 'text-gray-500' : 'text-gray-800'}`}>
                    {todo.title}
                </span>
            </div>
            
            {/* 삭제 버튼 */}
            <button
                onClick={handleDeleteClick}
                // 삭제 버튼 스타일: 빨간색, 호버 효과, 패딩
                className='text-red-500 hover:text-red-700 transition duration-150 p-1'
                title="삭제"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}

export default TodoItem;