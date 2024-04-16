import React from "react";
import { useNavigate } from "react-router-dom";
import Reviewsbar from "../../components/common/Reviewbars";
import Indicator from "../../components/common/Indicator/Indicator";
import TablewithPagination from "../../components/common/Tables";

export default function StudentsCompleted() {
  return (
    <>
      <Indicator title={"StudentsCompleted"} view={undefined} />
      <div className="reviewBorder">
        <Reviewsbar title={"HouseHold Unassigned"} onClick={undefined} />
        <Reviewsbar title={"HouseHold scheduled"} onClick={undefined} />
        <Reviewsbar title={"HouseHold completed"} onClick={undefined} />
        <Reviewsbar title={"StudentsCompleted"} onClick={undefined} />
      </div>
      <div>
        <TablewithPagination
          onClick={undefined}
          title={undefined}
          headers={undefined}
          tableBody={undefined}
        />
      </div>
    </>
  );
}
