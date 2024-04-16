import { Form, Col } from "react-bootstrap";
import { ITextInput } from "../../utilities/interfacesOrtype";

function TextInputWithLabel({
  name,
  onChange,
  placeholder,
  value,
  controlId,
  maxLength,
  disabled,
  type
}: ITextInput) {
  return (
    <Form.Group as={Col} md="12" controlId={controlId}>
      <Form.Label>{placeholder}</Form.Label>
      <Form.Control
        required
        type={type ? type: 'text'}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        onChange={onChange}
      />
    </Form.Group>
  );
}

export default TextInputWithLabel;
