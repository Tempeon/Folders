import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormContentNote from './FormContentNote';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { contentText: '', formAddTag: false, name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.showFormAddTag = this.showFormAddTag.bind(this);
    this.test = this.test.bind(this);
  }
  handleChange(event) {
    this.setState({ contentText: event.target.value });
  }
  showFormAddTag() {
    this.setState({ formAddTag: !this.state.formAddTag });
  }

  test(value) {
    const { onSaveContent } = this.props;
    onSaveContent(value);
  }
  render() {
    const { content, match } = this.props;
    const sod = content.find(v => v.id === parseInt(match.params.idNote, 10));
    return (
      <div>
        <FormContentNote
          property={sod}
          onSubmit={this.test}
          initialValues={{ name: sod.text, Tags: sod.tags, content: sod.content, id: sod.id }}
        />
      </div>
    );
  }
}

Content.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    folder: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      idFolder: PropTypes.string.isRequired,
      idNote: PropTypes.string.isRequired, // Edit string => Number
    }).isRequired,
  }).isRequired,
  onSaveContent: PropTypes.func.isRequired,
};

export default Content;
