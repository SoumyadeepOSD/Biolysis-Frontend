import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  message
}) => (
  <div>
    <h1>I&apos;m {firstName}{lastName}!</h1>
    <h2>My subject is as follows</h2>
    <p>{message}</p>
    <p>{email}{phoneNumber}</p>
  </div>
);

export default EmailTemplate;