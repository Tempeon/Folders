import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { contentText: '', formAddTag: false, name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.showFormAddTag = this.showFormAddTag.bind(this);
  }
  handleChange(event) {
    this.setState({ contentText: event.target.value });
  }
  showFormAddTag() {
    this.setState({ formAddTag: !this.state.formAddTag });
  }
  tagName(event) {
    this.setState({ name: event.target.value });
  }
  addTag(onAddTag, id) {
    this.setState({ formAddTag: !this.state.formAddTag })
    onAddTag(id, this.state.name);
  }
  render() {
    const { content, match, onEditNote, onNewNameNoteContent, onAddTag } = this.props;
    const sod = content.find(v => v.id === parseInt(match.params.idNote, 10));
    return (
      <div>
        <hr />
        <span> Name </span><br />
        <input type="text" value={sod.text} onChange={value => onNewNameNoteContent(sod.id, value.target.value)} /><br />
        <span role="presentation" onClick={() => this.showFormAddTag()}>Add tag </span><br />
        {this.state.formAddTag &&
          <div>
            <input type="text" onChange={value => this.tagName(value)} />
            <button onClick={() => this.addTag(onAddTag, sod.id)} > Add </button>
          </div>
        }
        <span>Tegs:</span>
        {sod.tags.map(v => (
          <span key={v}>{v}/</span>
        ))}<br />
        <textarea
          value={sod.content}
          onChange={value => onEditNote(sod.id, value.target.value)}
        />
        <br />
      </div>
    );
  }
}

Content.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    folder: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      idFolder: PropTypes.string.isRequired,
      idNote: PropTypes.string.isRequired, // Edit string => Number
    }).isRequired,
  }).isRequired,
  onAddTag: PropTypes.func.isRequired,
  onEditNote: PropTypes.func.isRequired,
  onNewNameNoteContent: PropTypes.func.isRequired,
};

export default Content;
