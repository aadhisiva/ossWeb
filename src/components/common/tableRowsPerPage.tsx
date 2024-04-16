import Form from 'react-bootstrap/Form';
import { ITableRowsPerPageDropDown } from '../../utilities/interfacesOrtype';

function TableRowsPerPageDropDown( {
  itemsPerPage,
  setItemsPerPage}: ITableRowsPerPageDropDown) {
  return (
    <Form.Select className='border' value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)} aria-label="Default select example">
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </Form.Select>
  );
}

export default TableRowsPerPageDropDown;