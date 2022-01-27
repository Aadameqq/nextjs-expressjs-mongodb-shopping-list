import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../frontend/components/Header";
import List from "../frontend/components/List";
import ListElementType from "../frontend/types/ListElementType";

import { useState } from "react";
import CreateElement from "../frontend/components/CreateElement";
import styles from "../frontend/styles/index.module.css";
import { getServerSideProps } from "../pre-rendering-functions/index";
import Link from "next/link";

type Props = {
  initialElements: ListElementType[];
};

const Home: NextPage<Props> = ({ initialElements }) => {
  const [elements, setElements] = useState<ListElementType[]>(initialElements);

  const handleCreate = async (content: string) => {
    const body = JSON.stringify({
      content,
    });

    const response = await fetch("/api/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();

    const createdElement = {
      id: data._id,
      ...data,
    };

    setElements((prev) => [...prev, createdElement]);
  };

  const handleChangeIsMarked = async (id: string) => {
    const element = elements.find((el) => el.id === id);

    if (!element) return;

    const body = JSON.stringify({
      ...element,
      isMarked: !element.isMarked,
    });

    await fetch(`/api/list/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, isMarked: !el.isMarked } : el))
    );
  };

  const handleUpdate = async (id: string, content: string) => {
    const body = JSON.stringify({
      content,
    });

    const response = await fetch(`/api/list/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const updatedElement = await response.json();

    setElements((prev) =>
      prev.map((element) =>
        element.id === id
          ? { ...element, content: updatedElement.content }
          : element
      )
    );
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/list/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  return (
    <div className={styles.container}>
      <Header></Header>
      <CreateElement handleCreate={handleCreate} />
      <List
        elements={elements}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleChangeIsMarked={handleChangeIsMarked}
      />
    </div>
  );
};

export { getServerSideProps };

export default Home;
