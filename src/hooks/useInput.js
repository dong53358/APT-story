import { useState } from "react";

export function useInput(initialValue) {
  const [inputValue, setEditInput] = useState(initialValue);
  const handleChange = (event) => {
    setEditInput(event.target.value);
  };
  return { inputValue, handleChange };
}
