import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import IconSave from 'material-ui/svg-icons/content/save';
import IconCancel from 'material-ui/svg-icons/navigation/cancel';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }
  return errors;
};
const styleTag = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignContent: 'center',
};
const styleTextField = {
  display: 'flex',
  paddingLeft: '10px',
};
const tag = ({ input, addTag, cancel, meta: { touched, error, warning } }) => {
  let x = '';
  return (
    <div style={{ ...styleTag }}>
      {input.value.map(value => (
        <Chip
          key={value}
          onRequestDelete={() => input.onChange(input.value.filter(val => val !== value))}
        >
          {value}
        </Chip>
      ))}
      {addTag && (
        <div style={{ styleTextField }}>
          <TextField
            floatingLabelText="NameTag"
            name="NameTag"
            type="text"
            onChange={event => x = event.target.value}
          />
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
          <IconButton
            tooltip="Add tag"
            type="button"
            onClick={() => { input.onChange(input.value.concat(x)); cancel(); }}
          >
            <IconSave />
          </IconButton>
          <IconButton
            onClick={cancel}
            tooltip="Cancel"
          >
            <IconCancel />
          </IconButton>

        </div>
      )}
    </div>
  );
};

class FormContentNote extends Component {
  constructor(props) {
    super(props);
    const { property } = this.props;
    this.state = { name: property.text, addTag: false, nameTag: '', contents: property.content };
    this.fileName = this.fileName.bind(this);
    this.content = this.content.bind(this);
  }

  fileName = ({ input, val, type, meta: { touched, error, warning } }) => (
    <TextField
      {...input}
      value={val}
      onChange={event => this.setState({ name: event.target.value })}
      type={type}
      floatingLabelText="Name Note"
      errorText={touched && ((error && <span>{error}</span>)
                         || (warning && <span>{warning}</span>))}
    />
  );

  content = ({ input, val, label, type }) => (
    <div>
      <TextField
        {...input}
        value={val}
        type={type}
        placeholder={label}
        multiLine
        rows={5}
        rowsMax={15}
        fullWidth
        onChange={event => this.setState({ contents: event.target.value })}
      />
    </div>
  );
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="name" val={this.state.name} type="label" component={this.fileName} label="NameNote" /><br />
        <label htmlFor="Tags">Tags: </label>
        <div style={styleTag}>
          <Field addTag={this.state.addTag} cancel={() => this.setState({ addTag: !this.state.addTag })} name="Tags" label="Tag: " component={tag} />
          {!this.state.addTag &&
          <FloatingActionButton
            label="+"
            mini
            type="button"
            onClick={() => this.setState({ addTag: !this.state.addTag })}
          >
            <ContentAdd />
          </FloatingActionButton>
          }
        </div>
        <Field name="content" type="label" val={this.state.contents} component={this.content} label="Content" />
        <div style={{ textAlign: 'center' }}>
          <RaisedButton
            label="Save"
            type="submit"
            primary
          />
        </div>
      </form>
    );
  }
}
FormContentNote.propTypes = {
  property: PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default (props) => {
  const Form = reduxForm({
    form: `FormContentNote${props.initialValues.name}`,
    validate,
  })(FormContentNote);
  return <Form {...props} />;
};
/* <button onClick={() => input.onChange(input.value.filter(val => val !== value))}>
  X
</button>*/
