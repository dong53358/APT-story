import { BoardItem } from "./BoardItem";

export default function BoardList({ diaries, imgClick }) {
  return (
    <>
      {diaries.map((item) => {
        return <BoardItem key={item.id} item={item} imgClick={imgClick} />;
      })}
    </>
  );
}
