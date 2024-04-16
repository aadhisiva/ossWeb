import React from 'react';
import { useNavigate } from 'react-router-dom'
import Reviewsbar from '../../components/common/Reviewbars';
import Indicator from '../../components/common/Indicator/Indicator';
import TablewithPagination from '../../components/common/Tables';

export default function Completed() {

  return (
    <>
     
   
      <Indicator title={"Completed"} />
      <div className="reviewBorder">
        <Reviewsbar title={"HouseHold Unassigned"} />
        <Reviewsbar  title={"HouseHold scheduled"}/>
        <Reviewsbar title={"HouseHold Completed"}/>
        <Reviewsbar title={"StudentsComppletd"}/>

      </div>
      <div>
        <TablewithPagination/>
      </div>
    </>
  );
}

