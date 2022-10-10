import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function ToDoForm({ uid }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { addDocument, response } = useFirestore("todo");

  const handleDate = (event) => {
    if (event.target.id === "tit") {
      setTitle(event.target.value);
    } else if (event.target.id === "txt") {
      setText(event.target.value);
    }
  };

  useEffect(() => {
    if (response.success) {
      setTitle("");
      setText("");
    }
  }, [response.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, text);
    addDocument({ uid, title, text });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>To Do list</legend>
          <input
            value={title}
            id="tit"
            type="text"
            required
            onChange={handleDate}
          />
          <button type="submit">Add</button>
        </fieldset>
      </form>
    </>
  );
}
