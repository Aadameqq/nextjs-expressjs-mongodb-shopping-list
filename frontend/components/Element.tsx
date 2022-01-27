import { useEffect, useRef, useState } from "react";

import ListElementType from "../types/ListElementType";
import styles from "../styles/element.module.css";
import UpdateButton from "./buttons/UpdateButton";
import DeleteButton from "./buttons/DeleteButton";
import ChangeIsMarkedButton from "./buttons/ChangeIsMarkedButton";

type Props = {
  element: ListElementType;
  handleUpdate: (id: string, content: string) => any;
  handleDelete: (id: string) => any;
  handleChangeIsMarked: (id: string) => any;
};

const Element: React.FC<Props> = ({
  element,
  handleDelete,
  handleUpdate,
  handleChangeIsMarked,
}) => {
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  const updateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isUpdateMode) updateInputRef.current.focus();
  }, [isUpdateMode]);

  const onChangeUpdateMode = () => {
    setIsUpdateMode((prev) => !prev);
  };

  const onDelete = () => {
    handleDelete(element.id);
  };

  const onChangeIsMarked = () => {
    handleChangeIsMarked(element.id);
  };

  const onUpdate = () => {
    setIsUpdateMode(false);
    handleUpdate(element.id, updateInputRef.current.value);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.content} ${
          element.isMarked && styles.contentMarked
        }`}
        onClick={onChangeUpdateMode}
      >
        {isUpdateMode ? (
          <>
            <input
              type="text"
              defaultValue={element.content}
              ref={updateInputRef}
              className={styles.editInput}
            />{" "}
          </>
        ) : (
          element.content
        )}{" "}
      </div>

      <div className={styles.buttons}>
        <UpdateButton onUpdate={onUpdate} isUpdateMode={isUpdateMode} />
        <DeleteButton onDelete={onDelete} />
        <ChangeIsMarkedButton
          onChangeIsMarked={onChangeIsMarked}
          element={element}
        />
      </div>
    </div>
  );
};

export default Element;
