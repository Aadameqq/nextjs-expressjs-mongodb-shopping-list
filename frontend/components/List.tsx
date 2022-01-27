import React, { useState } from "react";

import ListElementType from "../types/ListElementType";
import Element from "./Element";
import styles from "../styles/list.module.css";

type Props = {
  handleUpdate: (id: string, content: string) => any;
  handleDelete: (id: string) => any;
  handleChangeIsMarked: (id: string) => any;
  elements: ListElementType[];
};

const List: React.FC<Props> = ({
  elements,
  handleUpdate,
  handleDelete,
  handleChangeIsMarked,
}) => {
  return (
    <div className={styles.container}>
      {elements.map((element: ListElementType) => (
        <Element
          key={element.id}
          element={element}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleChangeIsMarked={handleChangeIsMarked}
        />
      ))}
    </div>
  );
};

export default List;
