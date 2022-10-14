import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function ToDoForm({ uid }) {
  const [title, setTitle] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { addDocument, response } = useFirestore("todo");

  const handleDate = (event) => {
    if (event.target.id === "tit") {
      setTitle(event.target.value);
    }
  };

  useEffect(() => {
    if (response.success) {
      setTitle("");
    }
  }, [response.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    addDocument({ uid, title, isClicked });
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
