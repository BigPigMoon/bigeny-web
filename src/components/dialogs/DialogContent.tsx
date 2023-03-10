import React from "react";
import useSWR from "swr";
import $api, { fetcher } from "../../http";
import ColumnContent from "../common/ColumnContent";
import SendInput from "../common/SendInput";
import { MessageData } from "../../types";
import ChatBubble from "./ChatButtle";
import parseJwt from "../../utils/parseJWT";
import { useToken } from "../../store";
import getDate from "../../helper/date";

type DialogContentProps = {
  dialogId: number;
};

const DialogContent = ({ dialogId }: DialogContentProps) => {
  const { data, mutate } = useSWR<MessageData[]>(
    "/messages/" + dialogId,
    fetcher,
    {
      refreshInterval: 200,
    }
  );

  const userSelfId: number = parseJwt(useToken.getState().access).sub;

  const send = (
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>
  ) => {
    $api
      .post("/messages/send", {
        content: content,
        dialogId: dialogId,
      })
      .then((res) => {
        if (data) {
          mutate([...data, res.data]);
        }
        setContent("");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <ColumnContent className="h-full">
          {data &&
            data.map((val) => (
              <ChatBubble
                name={val.name}
                avatar={val.avatar}
                createdAt={getDate(val.createdAt)}
                left={val.ownerId !== userSelfId}
                message={val.content}
                key={val.id}
              />
            ))}
        </ColumnContent>
        <SendInput send={send} />
      </div>
    </>
  );
};

export default DialogContent;
