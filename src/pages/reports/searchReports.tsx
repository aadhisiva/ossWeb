import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { roleArrangeMent } from "../../utilities/roles";
import { AvatarDropdown } from "../../components/common/menuDropDown";
import Titlebar from "../../components/common/titlebar";
import { IsAuthenticated } from "../../Authentication/useAuth";
import SelectInput from "../../components/common/selectInput";
import { IMasterData, ISelectItemsListProps } from "../../utilities/interfacesOrtype";
import ResuableHeaders from "../../components/common/resuableHeaders";

export default function SearchReports() {
    const [originalData, setOriginalData] = useState<IMasterData[]>([]);
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

  const [{ accessOfMasters, userRole, userCodes }] = IsAuthenticated();
  const [{HTaluk, HGp, HVillage}] = ResuableHeaders();

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
      setGpDropDown(gpSelect);
    }
  };

  
  const handleGpSelect = (value: string) => {
    if (panchayat !== value) {
      setSelectItems((prev) => ({
        ...prev,
        panchayat: value,
        village: "",
      }));
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
  };

  const handleVillageSelect = (value: string) => {
    if(village !== value){
        setSelectItems((prev) => ({
            ...prev,
            village: value,
          }));
    }
  }

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

  const handleClickAdd = (values: any) => {

  };

  const {district, panchayat, taluk, type,village} = selectedItems;
  return (
    <React.Fragment>
      <Titlebar
        title={"Search Reports"}
        Component={
          <AvatarDropdown {...roleArrangeMent(accessOfMasters, userRole)} />
        }
      />
      <div className="m-16 mt-2">
        <Row className="flex ml-12 mb-0">
          <Col
            md={2}
            style={{ borderRadius: "10px 10px 0 0" }}
            className="border border-solid border-b-0 border-black bg-black text-white"
          >
            Summary
          </Col>
        </Row>
        <Row className="flex flex-row border border-solid border-gray-800 gap-y-4 rounded-b-lg rounded-r-lg mt-0 p-3 mb-3">
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select Rural/Urban"
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
              defaultSelect={`Select ${HTaluk}`}
              options={talukDropDown}
              onChange={(e) => handleTalukSelect(e.target.value)}
              value={taluk}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect={`Select ${HGp}`}
              options={gpDropDown}
              onChange={(e) => handleGpSelect(e.target.value)}
              value={panchayat}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect={`Select ${HVillage}`}
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
            Search Result
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
      </div>
    </React.Fragment>
  );
}
