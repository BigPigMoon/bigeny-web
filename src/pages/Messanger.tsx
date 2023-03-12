import React, { useState } from "react";
import ColumnContent from "../components/common/ColumnContent";
import WallContent from "../components/common/WallContent";
import useSWR from "swr";
import { fetcher } from "../http";
import { DialogData } from "../types";
import MiniDialog from "../components/common/MiniDialog";
import Loading from "../components/common/Loading";
import CreateDialogModal from "../components/dialogs/CreateDialogModal";
import DialogContent from "../components/dialogs/DialogContent";

const Messanger = () => {
  const [dialogId, setDialogId] = useState<number | null>(null);
  const { data, isLoading, mutate } = useSWR<DialogData[]>(
    "/messages/dialogs",
    fetcher,
    { refreshInterval: 500 }
  );

  console.log(data);

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
                  // $api.post("/messages/read/" + val.id);
                }}
                key={val.id}
                avatar={val.avatar}
                name={val.name}
                lastPost={null}
                readed={!val.isReaded}
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
