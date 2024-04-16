import { Form, Col } from "react-bootstrap";
import { ISelectInput } from "../../utilities/interfacesOrtype";

function SelectInputWithLabel({
  options,
  defaultSelect,
  onChange,
  value,
  name,
  isValueAdded,
  required
}: ISelectInput) {
  return (
    <Form.Group
      as={Col}
      md="12"
      controlId="validationCustom08"
    >
      <Form.Label>{defaultSelect}</Form.Label>
      <Form.Select
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        aria-label="Default select example"
      >
        <option value={""}>{defaultSelect}</option>
        {isValueAdded ? 
        ((options).map((obj: any) => (
              <option value={obj?.value} key={obj?.role}>
                {obj.role}
              </option>
            ))
        ): (options || []).map((obj: string) => (
            <option value={obj} key={obj}>
              {obj}
            </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectInputWithLabel;
