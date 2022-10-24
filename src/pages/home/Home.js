import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import DiaryList from "./DiaryList";
import DiaryForm from "./DirayFrom";
import styles from "./Home.module.css";
import { Image } from "./Image";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("diary", ["uid", "==", user.uid]);

  return (
    <main className={styles.cont}>
      <aside className={styles.side_menu}>
        <DiaryForm uid={user.uid}></DiaryForm>
      </aside>
      <ul className={styles.content_list}>
        {error && <strong>{error}</strong>}
        {documents && <DiaryList diaries={documents} />}
      </ul>
      <ul>
        <Image />
      </ul>
    </main>
  );
}
