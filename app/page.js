"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todo, setTodo] = useState([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTodos = localStorage.getItem("todos");
      console.log("Stored Todos:", storedTodos); // Debugging
      if (storedTodos) {
        try {
          setTodo(JSON.parse(storedTodos));
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    console.log("Updating localStorage with todos:", todo); // Debugging
    if (todo.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todo));
    }
  }, [todo]);

  const deleteTask = (i) => {
    const updatedTodos = [...todo];
    updatedTodos.splice(i, 1);
    setTodo(updatedTodos);
  };

  const RenderTask =
    todo.length > 0 ? (
      todo.map((t, i) => (
        <li key={i} className="flex items-center justify-between  bg-white rounded-md  px-4 my-2">
          <div className="mb-4 px-4 py-2 flex flex-col justify-between w-2/3">
            <h2 className="text-1xl font-bold">{t.title}</h2>
            <p>{t.desc}</p>
          </div>

          <button onClick={() => deleteTask(i)}>❌</button>
        </li>
      ))
    ) : (
      <h2>NO TASK AVAILABLE</h2>
    );

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-6xl font-bold text-center mt-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">NEXT-JS_TO-DO_ LIST</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (title.trim() && desc.trim()) {
            setTodo([...todo, { title, desc }]);
            setTitle("");
            setDesc("");
          }
        }}
      >
        <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your to-do task"
          className="text-3xl border-red-600 border-2 m-8 px-4 py-2"
        />
        <input
          required
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter your description"
          className="text-3xl border-red-600 border-2 m-8 px-4 py-2"
        />
        <button type="submit"
          className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent text-center mt-5 border-2 border-white p-2 rounded-md"
        >Add Task</button>
      </form>
      <hr />
      <div className="p-2 bg-slate-400  rounded-md">
        <ul className="text-3xl">{RenderTask}</ul>

      </div>
    </div>
  );
};

export default Page;
