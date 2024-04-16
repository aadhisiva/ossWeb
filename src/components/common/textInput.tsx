import { Form, Col } from "react-bootstrap";
import { ITextInput } from "../../utilities/interfacesOrtype";

function TextInput({ name, onChange, placeholder, value, controlId, maxLength, disabled, className }: ITextInput) {
  return (
    <Form.Group
      className={`${className} flex flex-row mt-4`}
      as={Col}
      md="12"
      controlId={controlId}
    >
      <Form.Control
        required
        type="text"
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

export default TextInput;
