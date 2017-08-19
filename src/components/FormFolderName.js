import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconSave from 'material-ui/svg-icons/content/save';
import IconCancel from 'material-ui/svg-icons/navigation/cancel';

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'center',
  alignItems: 'center',
};
const styleTextField = {
  width: '220px',
};
const validate = (values) => {
  const errors = {};
  if (!values.folderName) {
    errors.folderName = 'Required';
  } else if (values.folderName.length > 15) {
    errors.folderName = 'Must be 15 characters or less';
  }
  /* if (!/^[A-Z0-9._%+-]/.test(values.folderName)) {
    errors.folderName = 'Invalid name';
  }*/
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <TextField
      style={{ ...styleTextField }}
      floatingLabelText={label}
      {...input}
      type={type}
      errorText={touched && ((error && <span>{error}</span>)
                         || (warning && <span>{warning}</span>))}
    />
  </div>
);

const FormFolderName = (props) => {
  const { handleSubmit, cancel } = props;
  return (
    <form onSubmit={handleSubmit} style={{ ...style }}>
      <Field
        name="folderName"
        type="text"
        component={renderField}
        label="Folder Name"
      />
      <IconButton
        type="submit"
        tooltip="Save"
      >
        <IconSave />
      </IconButton>
      <IconButton
        label="Cancel"
        type="button"
        tooltip="Cancel"
        onClick={() => cancel()}
      >
        <IconCancel />
      </IconButton>
    </form>
  );
};
FormFolderName.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  rename: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default (props) => {
  const Form = reduxForm({
    form: `FormFolderName${props.initialValues.nameForm}`,
    validate,
  })(FormFolderName);
  return <Form {...props} />;
};
