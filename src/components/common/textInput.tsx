import { Form, Col } from "react-bootstrap";
import { ITextInput } from "../../utilities/interfacesOrtype";

function TextInput({ name, onChange, placeholder, value, controlId, maxLength, disabled, className, label }: ITextInput) {
  return (
    <Form.Group
      className={`${className} flex flex-col mt-4`}
      controlId={controlId}
    >
      <Form.Label>{label}</Form.Label>
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
