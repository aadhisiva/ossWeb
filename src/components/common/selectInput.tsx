import { Form, Col } from "react-bootstrap";
import { ISelectInput } from "../../utilities/interfacesOrtype";

function SelectInput({
  options,
  defaultSelect,
  onChange,
  value,
  isValueAdded,
  isRoleSelect
}: ISelectInput) {
  return (
    <Form.Group
      className="flex flex-row"
      as={Col}
      md="12"
      controlId="validationCustom02"
    >
      <Form.Select
        
        value={value}
        onChange={onChange}
        aria-label="Default select example"
      >
        <option value={""}>{defaultSelect}</option>
        {isValueAdded
          ? (options).map((obj: any) => (
              <option value={obj?.code} key={obj?.code}>
                {obj.name}
              </option>
            ))
          : isRoleSelect ?  (options || []).map((obj: any) => (
              <option value={obj.AssigningType} key={obj.AssigningType}>
                {obj.AssigningType}
              </option>
            )) : 
            (options || []).map((obj: string) => (
              <option value={obj} key={obj}>
                {obj}
              </option> ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectInput;
