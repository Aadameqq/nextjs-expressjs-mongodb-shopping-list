import React from "react";

import styles from "../../styles/element.module.css";
import ListElementType from "../../types/ListElementType";

type Props = {
  onChangeIsMarked: () => void;
  element: ListElementType;
};

const ChangeIsMarkedButton = ({ element, onChangeIsMarked }: Props) => {
  return (
    <span onClick={onChangeIsMarked} className={styles.button}>
      {element.isMarked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={styles.svg}
          viewBox="0 0 16 16"
        >
          <circle cx="8" cy="8" r="8" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={styles.svg}
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        </svg>
      )}
    </span>
  );
};

export default ChangeIsMarkedButton;
