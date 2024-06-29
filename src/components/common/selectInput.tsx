import { Form, Col } from "react-bootstrap";
import { ISelectInput } from "../../utilities/interfacesOrtype";

function SelectInput({
  options,
  defaultSelect,
  onChange,
  value,
  isValueAdded,
  isRoleSelect,
  name
}: ISelectInput) {
  return (
    <Form.Group
      className="flex flex-row"
      as={Col}
      md="12"
      controlId="validationCustom02"
    >
      <Form.Select
        name={name}
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
            (options || []).map((obj: string, i: string) => (
              <option value={obj} key={obj+i}>
                {obj}
              </option> ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectInput;
