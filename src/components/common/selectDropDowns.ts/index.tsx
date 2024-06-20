import React, { FC, Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import "../assignment.css";
import {
  IMasterData,
  ISelectItemsListProps,
} from "../../../utilities/interfacesOrtype";
import SelectInput from "../selectInput";

interface IResuableDropDownListProps {
  originalData?: IMasterData[];
  handleClickAdd?: any;
  setCopyOriginalData?: any;
  listType?: number;
}
export const SelectReUsableDropDown: FC<IResuableDropDownListProps> = ({
  originalData = [],
  listType,
  handleClickAdd,
  setCopyOriginalData,
}) => {
  const [selectedItems, setSelectItems] = useState<ISelectItemsListProps>({
    district: "",
    panchayat: "",
    taluk: "",
    village: "",
    type: "",
  });

  const [districtDropDown, setDistrictDropDown] = useState([]);
  const [talukDropDown, setTalukDropDown] = useState([]);
  const [gpDropDown, setGpDropDown] = useState([]);
  const [villageDropDown, setVillageDropDown] = useState([]);

  const { district, panchayat, type, taluk, village } = selectedItems;

  useEffect(() => {
    let filterData = originalData;
    // filter rural/urban
    if (type) {
      filterData = filterData.filter((obj) => obj.Type === type);
    }

    if (type && district) {
      filterData = filterData.filter(
        (obj) => obj.Type === type && obj.DistrictName === district
      );
    }

    // filter rural/urban and district
    if (type && district && taluk) {
      filterData = filterData.filter(
        (obj) =>
          obj.Type === type &&
          obj.DistrictName === district &&
          obj?.TalukName === taluk
      );
    }
    // filter rural/urban and district and taluka
    if (type && district && taluk && panchayat) {
      filterData = panchayat !== "All" ?  
      filterData.filter(
        (obj) =>
          obj.Type === type &&
          obj.DistrictName === district &&
          obj?.TalukName === taluk && 
          obj?.GramPanchayatName === panchayat
      ) : 
      filterData.filter(
        (obj) =>
          obj.Type === type &&
          obj.DistrictName === district &&
          obj?.TalukName === taluk
      ) 
    }
    // filter rural/urban and district and taluka
    if (type && district && taluk && panchayat && village) {
      filterData = filterData.filter(
        (obj) =>
          obj.Type === type &&
          obj.DistrictName === district &&
          obj?.TalukName === taluk &&
          panchayat !== "All" ? obj?.GramPanchayatName === panchayat : true &&
          obj?.VillageName === village
      );
    }
    setCopyOriginalData(filterData);
  }, [type, district, taluk, panchayat, village]);

  const handleTypeSelect = (value: string) => {
    if (type !== value) {
      setSelectItems((prev) => ({
        ...prev,
        type: value,
        district: "",
        taluk: "",
        panchayat: "",
        village: "",
      }));
      let rural_urban: any = Array.from(
        new Set(
          originalData
            .filter((obj) => obj.Type === value)
            .map((obj) => obj.DistrictName)
        )
      );
      setDistrictDropDown(rural_urban);
    }
  };
  const handleDistrictSelect = (value: string) => {
    if (district !== value) {
      setSelectItems((prev) => ({
        ...prev,
        district: value,
        taluk: "",
        panchayat: "",
        village: "",
      }));
      let talukSelect: any = Array.from(
        new Set(
          originalData
            .filter((obj) => obj.Type === type && obj.DistrictName === value)
            .map((obj) => obj.TalukName)
        )
      );
      setTalukDropDown(talukSelect);
    }
  };

  const handleTalukSelect = (value: string) => {
    if (taluk !== value) {
      setSelectItems((prev) => ({
        ...prev,
        taluk: value,
        panchayat: "",
        village: "",
      }));
      setGpDropDown([]);
      let gpSelect: any = Array.from(
        new Set(
          originalData
            .filter(
              (obj) =>
                obj.Type === type &&
                obj.DistrictName === district &&
                obj.TalukName === value
            )
            .map((obj) => obj.GramPanchayatName)
        )
      );
      var filtered = gpSelect.filter(function (el: string) {
        return el != null;
      });
      filtered.push("All");
      setGpDropDown(filtered)
    }
  };

  const handleGpSelect = (value: string) => {
    if (panchayat !== value) {
      setSelectItems((prev) => ({
        ...prev,
        panchayat: value,
        village: "",
      }));
      if(value == "All"){
          let villagesData: any = Array.from(
            new Set(
              originalData
                .filter(
                  (obj) =>
                    obj.Type === type &&
                    obj.DistrictName === district &&
                    obj.TalukName === taluk 
                )
                .map((obj) => obj.VillageName)
            )
          );
          setVillageDropDown(villagesData);
        } else {
          let villagesData: any = Array.from(
            new Set(
              originalData
                .filter(
                  (obj) =>
                    obj.Type === type &&
                    obj.DistrictName === district &&
                    obj.TalukName === taluk &&
                    obj.GramPanchayatName === value
                )
                .map((obj) => obj.VillageName)
            )
          );
          setVillageDropDown(villagesData);
      }
    }
  };

  const handleVillageSelect = (value: string) => {
    if (village !== value) {
      setSelectItems((prev) => ({
        ...prev,
        village: value,
      }));
    }
  };

  const handleClearFilters = () => {
    setSelectItems((prev) => ({
      ...prev,
      district: "",
      panchayat: "",
      type: "",
      taluk: "",
      village: "",
    }));
  };
  return (
    <React.Fragment>
      <Row className="boxTitle">
        <Col md={2} className="boxText">
          Filters
        </Col>
      </Row>
      <Row className="box">
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Type"
            options={Array.from(new Set(originalData.map((obj) => obj.Type)))}
            onChange={(e) => handleTypeSelect(e.target.value)}
            value={type}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select District"
            options={districtDropDown}
            onChange={(e) => handleDistrictSelect(e.target.value)}
            value={district}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select ULB"
            options={talukDropDown}
            onChange={(e) => handleTalukSelect(e.target.value)}
            value={taluk}
          />
        </Col>

        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select ULB Ward"
            options={gpDropDown}
            onChange={(e) => handleGpSelect(e.target.value)}
            value={panchayat}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Ward"
            options={villageDropDown}
            onChange={(e) => handleVillageSelect(e.target.value)}
            value={village}
          />
        </Col>
        <Col md={3} sm={6}>
          <Button
            style={{ backgroundColor: "#13678C" }}
            onClick={() => handleClickAdd(selectedItems)}
          >
            Add User
          </Button>
        </Col>
        <Col md={3} sm={6}>
          <Button
            style={{ backgroundColor: "#13678C" }}
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};
