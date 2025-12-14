import React, {useState} from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/todos';

function TodoInput({ fetchTodos, setError, clearError }) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = async (e) => {

        e.preventDefault();

        if (inputValue.trim() === '') {
            setError('할 일을 입력해주세요!');
            return;
        }
        
        const newTodoData = {
            title: inputValue,
            is_completed: false,
        };

        try {
            await axios.post(API_URL, newTodoData);
            console.log('Todo 생성 성공: ', inputValue);

            await fetchTodos();

            setInputValue('');
            setError(null);

        } catch (error) {
            console.error('Todo 생성 중 오류 발생: ', error);
            setError("서버 연결 오류 발생으로 추가되지 않았어요!");
        }
    }

    return (
        <form onSubmit={handleAddTodo} className="todo-input">
            <input 
                type="text" 
                placeholder="새로운 일 추가" 
                value={inputValue}
                onChange={handleChange}
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
                type="submit"
                className='bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-150'
                >
                    추가
            </button>
        </form>
    );
}

export default TodoInput;