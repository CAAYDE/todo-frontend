import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/todos";

    const clearError = useCallback(() => {
    setError(null);
}, []);

    const fetchTodos = useCallback(async () => {
    try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
        clearError();
    } catch (error) {
        setError('서버 연결 오류로 인해 목록 확인이 되지 않아요!');
    }
}, [API_URL, clearError]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const deleteTodo = useCallback(async (id) => {
        try {
            // id를 url 경로에 포함하여 전송함
            await axios.delete(`${API_URL}/${id}`);
            console.log(`Todo ${id} 삭제 성공`);
            // filter로 id가 일치하지 않는 항목들만 남긴다.
            setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
            setError(null); // 성공 시 에러 초기화
        } catch (error) {
            console.error("Error deleting todo: ", error);
            setError("서버 연결 오류로 인해 삭제가 되지 않아요!");
            clearError();
        }
    }, [API_URL, clearError]);

    // 특정 항목의 완료 상태를 토글
    const toggleComplete = useCallback( async (id, currentTitle, currentStatus) => {
        const newStatus = !currentStatus;
        const updateData = {
            title: currentTitle,
            is_completed: newStatus,
        };

        try {
            // axios put, id를 url 경로에 포함하고, 수정 데이터 요청 본문으로 전송
            // 로컬 상태에서 해당 항목만 업데이트
            // id가 일치하는 항목을 찾으면, 백엔드 응답 데이터로 대체 or 수동으로 갱신
            const response = await axios.put(`${API_URL}/${id}`, updateData);
            const updatedTodo = response.data;

            setTodos((currentTodos) =>
                currentTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
            );
            setError(null); // 성공 시 에러 초기화
        } catch (error) {
            console.error("toggling todo status 에러남: ", error);
            setError("서버 연결 오류로 인해 변경이 되지 않아요!");
            clearError();
        }
    }, [API_URL, clearError]);

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center p-4'>
            <div className='w-full max-w-xl bg-white shadow-2xl rounded-xl p-6'>

                    <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
                        간단 Todo List
                    </h1>
                    {error && (
                        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
                            {error}
                        </div>
                    )}
                    <TodoInput fetchTodos={fetchTodos} setError={setError} clearError={clearError} />
                    <TodoList
                        todos={todos}
                        deleteTodo={deleteTodo}
                        toggleComplete={toggleComplete}
                    />
            </div>
        </div>
    );
}

export default App;
