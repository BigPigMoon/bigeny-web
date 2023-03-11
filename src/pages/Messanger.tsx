import React, { useState } from "react";
import { Link } from "react-router-dom";
import ColumnContent from "../components/ColumnContent";
import WallContent from "../components/WallContent";
import useSWR from "swr";
import { fetcher } from "../http";
import { DialogData } from "../types";
import MiniDialog from "../components/MiniDialog";
import Loading from "../components/Loading";
import CreateDialogModal from "../components/CreateDialogModal";
import DialogContent from "../components/DialogContent";

const Messanger = () => {
  const [dialogId, setDialogId] = useState<number | null>(null);
  const { data, isLoading, mutate } = useSWR<DialogData[]>(
    "/messages/dialogs",
    fetcher
  );

  return (
    <>
      <CreateDialogModal data={data} mutate={mutate} />
      <WallContent bottomButton={true}>
        <ColumnContent className={dialogId ? "w-2/3" : ""}>
          {data &&
            data.map((val: DialogData) => (
              <MiniDialog
                onClick={(e) => {
                  setDialogId(val.id);
                }}
                key={val.id}
                avatar={val.avatar}
                name={val.name}
                lastPost={null}
              />
            ))}
          {isLoading && <Loading />}
        </ColumnContent>
        {dialogId && <DialogContent dialogId={dialogId} />}
      </WallContent>
    </>
  );
};

export default Messanger;
