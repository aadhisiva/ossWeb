import React from "react";
import { Alert } from "react-bootstrap";

export default function AlertMessage({ variant,message }: {variant: string, message: string}) {
  return (
    <div>
      <Alert key={variant} variant={variant}>
        {message}
      </Alert>
    </div>
  );
}
