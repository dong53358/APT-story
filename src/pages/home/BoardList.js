import { BoardItem } from "./BoardItem";

export default function BoardList({ boardCategory, diaries, imgClick }) {
  return (
    <>
      {diaries.map((item) => {
        return (
          <BoardItem
            key={item.id}
            boardCategory={boardCategory}
            item={item}
            imgClick={imgClick}
          />
        );
      })}
    </>
  );
}
