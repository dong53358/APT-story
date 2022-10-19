import ToDoItem from "./ToDoItem";

export default function ToDoList({ diaries }) {
  return (
    <>
      {diaries.map((item) => {
        return <ToDoItem key={item.id} item={item} />;
      })}
    </>
  );
}
