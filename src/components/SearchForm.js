import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

const validate = (values) => {
  const errors = {};
  if (!values.SearchFile) {
    errors.SearchFile = 'Required';
  } else if (values.SearchFile.length > 15) {
    errors.SearchFile = 'Must be 15 characters or less';
  }
  return errors;
};

const searchText = ({ input, label, type, meta: { touched, error, warning } }) => (
  <TextField
    floatingLabelText={label}
    {...input}
    type={type}
    errorText={touched && ((error && <span>{error}</span>))}
  />
);
const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />

)

const SearchForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="SearchFile" type="label" label="SearchName" component={searchText} />
      <Field name="TypeSearch" defaultSelected="Name" component={renderRadioGroup} label="TypeSearch">
        <RadioButton value="Name" label="Name" />
        <RadioButton value="Tag" label="Tag" />
        <RadioButton value="All" label="All" />
      </Field>
      <br />
      <RaisedButton
        type="submit"
        label="Find"
        primary
      />
    </form>
  );
};
SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'SearchForm',
  validate,
})(SearchForm);
