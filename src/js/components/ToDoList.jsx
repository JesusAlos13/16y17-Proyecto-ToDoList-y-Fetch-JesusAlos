import React, { useEffect, useState } from "react";

const Todos = () => {
    const [input, setInput] = useState("");
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        createUser();
        getTodos();
    }, []);

    const deleteTodo = (todoId) => {

        setTareas(prev => prev.filter(t => t.id !== todoId));

        fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al eliminar tarea");
                return res.json();
            })
            .then(() => {
                console.log("Tarea eliminada correctamente");
            })
            .catch(err => {
                console.error(err);

            });
    };


    const getTodos = () => {
        fetch('https://playground.4geeks.com/todo/users/JesusAlos13', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Error en la solicitud: ' + response.status);
                return response.json();
            })
            .then(data => {
                setTareas(data.todos); 
            })
            .catch(error => {
                console.error('Error al obtener tareas:', error);
            });
    };

    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/JesusAlos13', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    const createTodo = (tarea) => {
        fetch('https://playground.4geeks.com/todo/todos/JesusAlos13', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                label: tarea,
                is_done: false
            }),
        })
            .then(response => response.json())
            .then(data => {
                getTodos(); 
            })
            .catch(error => console.error('Error:', error));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            if (tareas.some(t => t.label === input.trim())) {
                alert("Ya está en la lista.");
            } else {
                createTodo(input.trim());
                setInput("");
            }
        }
    };

    const handleDelete = (todoId) => {
        deleteTodo(todoId);
    };

    return (
        <div className="container">
            <input
                className="form-control p-3 my-3 text-center"
                type="text"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Anota tu tarea aquí."
                value={input}
                onKeyDown={handleKeyDown}
                style={{
                    borderRadius: '25px',
                    border: '2px solid #d1d1d1',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                }}
            />
            <div className="list-group mt-3">
                {tareas.length === 0 ? (
                    <h1 className="text-center text-3xl font-semibold text-blue-600 mt-8 mb-4 p-4 bg-blue-100 rounded-xl shadow-lg">
                        No hay tareas, añadir tareas.
                    </h1>
                ) : (
                    tareas.map((tarea) => (
                        <div className="d-flex align-items-center mb-2" key={tarea.id}>
                            <a
                                href="#"
                                className="list-group-item list-group-item-action list-group-item-light rounded-3 shadow-sm d-flex justify-content-between align-items-center w-100"
                            >
                                <span>{tarea.label}</span>
                            </a>
                            <button
                                type="button"
                                className="btn btn-outline-dark btn-sm m-1"
                                style={{
                                    borderRadius: '50%',
                                    padding: '10px 15px',
                                    fontSize: '15px',
                                    transition: 'all 0.3s ease-in-out'
                                }}
                                onClick={() => handleDelete(tarea.id)}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#ff4d4d'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                🗑️
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Todos;
