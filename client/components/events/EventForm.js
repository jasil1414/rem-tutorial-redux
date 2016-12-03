import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/eventActions.js';

class EventForm extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      title:'',
      errors:{},
      isLoading:false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createEvent(this.state);
  }

  render(){
    const { title, errors, isLoading } = this.state;
    return(
      <form onSubmit={this.onSubmit}>
      <h1>Create New Event</h1>
      <TextFieldGroup
        field='title'
        label="Event Title"
        value={title}
        onChange={this.onChange}
        errors ={errors.title}
        type='text'
      />
      <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

EventForm.propTypes ={
  createEvent: React.PropTypes.func.isRequired
}
export default connect(null, {createEvent})(EventForm);
