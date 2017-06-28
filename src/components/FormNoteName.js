import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if (!values.noteName) {
    errors.noteName = 'Required';
  } else if (values.noteName.length > 15) {
    errors.noteName = 'Must be 15 characters or less';
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
);

const FormNoteName = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="noteName" type="text" component={renderField} label="NameNote" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'FormNoteName',
  validate,
})(FormNoteName);
