import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconSave from 'material-ui/svg-icons/content/save';
import IconCancel from 'material-ui/svg-icons/navigation/cancel';

/*<TextField
  floatingLabelText={label}
  {...input}
  type={type}
  errorText={touched && ((error && <span>{error}</span>)
    || (warning && <span>{warning}</span>))}
/>*/




const test = (props) => {
  const { handleSubmit, cancel } = props;
  return(
  <form onSubmit={handleSubmit}>
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
  )
}

export default (props) => {
  const Form = reduxForm({
    form: `FormFolderName`,
  })(test);
  return <Form {...props} />;
};