import React, { useEffect, useState } from "react";

const ToDos = () => {

    const [input, setInput] = useState("");
    const [tareas, setToDos] = useState([])


    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/JesusAlos13', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

    };

    const createToDo = (tarea) => {
        fetch('https://playground.4geeks.com/todo/users/JesusAlos13', {
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
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        createUser();
    }, []);


    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            if (tareas.includes(input.trim())) {
                alert("Ya esta en la lista.");
            } else {

                setToDos([...tareas, input.trim()])
                setInput("");

                createToDo(input.trim());
            }
        }
    }

    const handleDelete = (delTarea) => {
        setToDos(tareas.filter((item) => item != delTarea));
    };

    return (
        <div className="container">
            <input className="form-control p-3 my-3 text-center" type="text" onChange={(e) => setInput(e.target.value)} placeholder="Anota tu tarea aquí." value={input} onKeyDown={e => handleKeyDown(e)} style={{ borderRadius: '25px', border: '2px solid #d1d1d1', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', fontSize: '16px', }} />
            <div className="list-group mt-3">
                {tareas.length === 0 ? (
                    <h1 className="text-center text-3xl font-semibold text-blue-600 mt-8 mb-4 p-4 bg-blue-100 rounded-xl shadow-lg">No hay tareas, añadir tareas.</h1>)
                    : (
                        tareas.map((tarea, index) => <div className="d-flex align-items-center mb-2" key={index}>
                            <a href="#" className="list-group-item list-group-item-action list-group-item-light rounded-3 shadow-sm d-flex justify-content-between align-items-center w-100">
                                <span>{tarea}</span>
                            </a>
                            <button type="button" className="btn btn-outline-dark btn-sm m-1" style={{ borderRadius: '50%', padding: '10px 15px', fontSize: '15px', transition: 'all 0.3s ease-in-out', }} onClick={() => handleDelete(tarea)} onMouseOver={(e) => e.target.style.backgroundColor = '#ff4d4d'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>🗑️</button>
                        </div>)

                    )}

            </div>
        </div>

    );
};

export default ToDos;