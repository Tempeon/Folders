import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconSave from 'material-ui/svg-icons/content/save';
import IconCancel from 'material-ui/svg-icons/content/reply';

const style = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};
const styleTextField = {
  width: '100px',
};

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
    <TextField
      style={styleTextField}
      hintText={label}
      {...input}
      type={type}
      errorText={touched && ((error && <span>{error}</span>))}
    />
);

const FormNoteName = (props) => {
  const { handleSubmit, cancel } = props;
  return (
    <form onSubmit={handleSubmit} style={{...style}}>
      <Field name="noteName" type="text" component={renderField} label="NameNote" />
      <div>
        <IconButton
          type="submit"
          tooltip="Save"
        >
          <IconSave />
        </IconButton>
        <IconButton
          onClick={() => cancel()}
          tooltip="Cancel"
        >
          <IconCancel />
        </IconButton>
      </div>
    </form>
  );
};

export default (props) => {
  const Form = reduxForm({
    form: `FormNoteName${props.initialValues.noteName}`,
    validate,
  })(FormNoteName);
  return <Form {...props} />;
};
