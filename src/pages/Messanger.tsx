import React from "react";
import { Link } from "react-router-dom";
import ColumnContent from "../components/ColumnContent";
import WallContent from "../components/WallContent";

const Messanger = () => {
  return (
    <>
      <div className="flex justify-center">
        <Link
          to="/createDialog"
          className="btn btn-accent fixed w-3/6 bottom-0 my-4"
        >
          Create dialog
        </Link>
      </div>
      <WallContent bottomButton={true}>
        <ColumnContent></ColumnContent>
      </WallContent>
    </>
  );
};

export default Messanger;
