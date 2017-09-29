import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormContentNote from './FormContentNote';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { contentText: '', formAddTag: false, name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.showFormAddTag = this.showFormAddTag.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }

  componentWillMount() {
    const { onGetTags, onGetNoteList, content, match } = this.props;
    console.log('Wilmount');
    onGetTags(match.params.idNote);
    if (content.list === []) { onGetNoteList(match.params.idNote); }
  }

  componentWillUpdate(nextProp) {
    const { onGetTags, match } = this.props;
    if (nextProp.match.params.idNote !== match.params.idNote) {
      onGetTags(nextProp.match.params.idNote);
    }
  }
  handleChange(event) {
    this.setState({ contentText: event.target.value });
  }
  showFormAddTag() {
    this.setState({ formAddTag: !this.state.formAddTag });
  }

  saveNote(value) {
    const { onEditNote } = this.props;
    onEditNote(value.id, value.name, value.Content);
  }
  render() {
    const { content, match, width, onAddTag, tags, removeTags } = this.props;
    const sod = content.list.find(v => v.id === parseInt(match.params.idNote, 10));
    console.log(tags.list, content.list, sod)
    if (tags.list !== [] && content.list !== []) {
      return (
        <div style={{ width: `${width}`, marginLeft: '20px', marginTop: '50px' }}>
          <FormContentNote
            onAddTag={onAddTag}
            removeTags={removeTags}
            tags={tags}
            property={sod}
            onSubmit={this.saveNote}
            initialValues={{ name: sod.Name, Content: sod.Content, id: sod.id, Tags: tags.list }}
          />
        </div>
      );
    }
    return (
      <h2> Not found</h2>
    )
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
  onEditNote: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onGetTags: PropTypes.func.isRequired,
  removeTags: PropTypes.func.isRequired,
  onGetNoteList: PropTypes.func.isRequired,
};

export default Content;
