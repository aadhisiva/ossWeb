import React from 'react';
import { useNavigate } from 'react-router-dom'
import Reviewsbar from '../../components/common/Reviewbars';
import Indicator from '../../components/common/Indicator/Indicator';
import TablewithPagination from '../../components/common/Tables';

export default function scheduled() {

  return (
    <>
     
   
      <Indicator title={"scheduled"} view={undefined} />
      <div className="reviewBorder">
        <Reviewsbar title={"HouseHold Unassigned"} onClick={undefined} />
        <Reviewsbar title={"HouseHold Scheduled"} onClick={undefined}/>
        <Reviewsbar title={"Household Completed"} onClick={undefined}/>
        <Reviewsbar title={"StudentsCompleted"} onClick={undefined}/>

      </div>
      <div>
        <TablewithPagination onClick={undefined} title={undefined} headers={undefined} tableBody={undefined}/>
      </div>
    </>
  );
}

