import React from "react";
import ToDos from "./ToDoList";

const Home = () => {
  return (
    <div className="bg-secondary text-center p-5"style={{ background: 'linear-gradient(45deg, #6a11cb, #2575fc)', borderRadius: '10px', height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0', padding: '0',}}>
      <h1 className="text-light" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '150px', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)', marginBottom: '20px'}}>Lista de tareas</h1>
      <ToDos />
    </div>
  );
};

export default Home;