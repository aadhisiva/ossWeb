import React, { FC, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { IMasterData } from "../../utilities/interfacesOrtype";

interface ITableWithSorting {
  filteredData?: IMasterData[] | any;
  handleCLickModify?: any
}

export const TableWithSorting:FC<ITableWithSorting> = ({
filteredData,
handleCLickModify
}) =>  {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  const handleSort = (key: any) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key && sortConfig.direction === 'ascending') {
      return a[sortConfig.key].localeCompare(b[sortConfig.key]);
    }
    if (sortConfig.key && sortConfig.direction === 'descending') {
      return b[sortConfig.key].localeCompare(a[sortConfig.key]);
    }
    return 0;
  }); 


  return (
    <React.Fragment>
      <Table hover size="sm">
        <thead className="urbanThead">
        <th onClick={() => handleSort('name')}>
            Name{' '}
            {/* {sortConfig.key === 'name' && sortConfig.direction === 'ascending' ? (
              <BsArrowDown />
            ) : (
              <BsArrowUp />
            )} */}
            <i className="bi bi-arrow-bar-down"></i>
              <i className="bi bi-arrow-bar-up"></i>
          </th>
          <th className="urbanTh p-1">Mobile Number</th>
          <th className="urbanTh p-1">District</th>
          <th className="urbanTh p-1">Action</th>
        </thead>
        <tbody>
          <tr className="spacer"></tr>
          {(filteredData || []).map((obj) => (
            <tr>
              <td className="tableRowStart">{obj?.Name ?? "N/A"}</td>
              <td>{obj?.Mobile ?? "N/A"}</td>
              <td>{obj?.DistrictName ?? "N/A"}</td>
              <td className="tableRowEnd">
                <Button
                  className="mr-1"
                  style={{ backgroundColor: "#13678C" }}
                  onClick={() => handleCLickModify(obj, "Modify")}
                >
                  Modify
                </Button>
              </td>
            </tr>
          ))}
          <tr className="spacer"></tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
}
