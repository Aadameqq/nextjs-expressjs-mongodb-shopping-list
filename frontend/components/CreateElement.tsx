import React, { useRef } from "react";

import styles from "../styles/createElement.module.css";

type Props = {
  handleCreate: (content: string) => any;
};

const CreateElement: React.FC<Props> = ({ handleCreate }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    handleCreate(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" ref={inputRef} />
      <input
        className={styles.button}
        type="button"
        value="Add"
        onClick={onSubmit}
      />
    </div>
  );
};

export default CreateElement;
