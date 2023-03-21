import { BoardItem } from "../boardItem/BoardItem";

export default function BoardList({ boardCategory, boardData, imgClick }) {
  return (
    <>
      {boardData.map((item) => {
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
