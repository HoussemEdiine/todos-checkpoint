import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, settodos] = useState([]);
  const [text, settext] = useState("");
  const [textedit, settextedit] = useState("");

  console.log(text);
  const add = () => {
    if (text.trim() === "") {
      return alert("not valid");
    }
    settodos([
      ...todos,
      {
        id: Math.random(),
        text,
        edit: false
      }
    ]);
    settext("");
  };
  const deleteitem = (id) => {
    settodos(todos.filter((todo) => todo.id !== id));
  };
  const editelement = (id) => {
    settodos(
      todos.map((el) => {
        return el.id === id
          ? { ...el, edit: !el.edit }
          : { ...el, edit: false };
      })
    );
  };
  const confirmedit = (id) => {
    if (textedit === "") {
      return alert("invalid edit");
    }
    settodos(
      todos.map((el) => {
        return el.id === id
          ? { ...el, text: textedit, edit: false }
          : { ...el };
      })
    );
    settextedit("");
  };
  const canceledit = (id) => {
    settodos(
      todos.map((el) => {
        return { ...el, edit: false };
      })
    );
  };

  return (
    <div className="App">
      <h1>Todo list </h1>
      <input value={text} onChange={(e) => settext(e.target.value)} />
      <button onClick={add}>add </button>
      <div>
        {todos.map((el, index) =>
          el.edit ? (
            <div key={index}>
              <input
                defaultValue={el.text}
                onChange={(e) => settextedit(e.target.value)}
              />
              <button onClick={() => confirmedit(el.id)}>confirm</button>
              <button onClick={canceledit}>cancel</button>
            </div>
          ) : (
            <div key={index}>
              <span onClick={() => editelement(el.id)}>{el.text}</span>
              <button onClick={() => deleteitem(el.id)}>X</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
