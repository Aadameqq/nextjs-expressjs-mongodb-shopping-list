import { GetServerSideProps } from "next";

import ListElement from "../server/model";
import ListElementType from "../frontend/types/ListElementType";

type Props = {
  initialElements: ListElementType[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const elements = await ListElement.find({});

  return {
    props: {
      initialElements: elements
        ? elements.map((element) => ({
            id: element._id.toString(),
            content: element.content,
            isMarked: element.isMarked,
          }))
        : [],
    },
  };
};
