import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if (!values.folderName) {
    errors.folderName = 'Required';
  } else if (values.folderName.length > 15) {
    errors.folderName = 'Must be 15 characters or less';
  }
  if (!/^[A-Z0-9._%+-]/.test(values.folderName)) {
    errors.folderName = 'Invalid name';
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const FormFolderName = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="folderName" type="text" component={renderField} label="folderName" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'FormFolderName',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
})(FormFolderName);
