import { DiaryItem } from "./DiaryItem";

export default function DiaryList({ diaries }) {
  return (
    <>
      {diaries.map((item) => {
        return <DiaryItem key={item.id} item={item} />;
      })}
    </>
  );
}
