import React from 'react';
import Timezones from '../../data/timezones.js';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup_valid';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';
class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      username:'',
      email:'',
      password:'',
      passwordVerification:'',
      timezone:'',
      errors: {},
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  checkUserExists(e){
    const field = e.target.name;
    const val = e.target.value;
    if( val !== ""){
      this.props.isUserExists(val,field).then(res =>{
        let errors = this.state.errors;
        if(res.data.errors){
          errors[field] = `${field} already exists`;
        }
        else if(res.data.success){
          errors[field] = '';
        }
        this.setState({ errors })
      });
    }
  }
  isValid(){
    const {errors, isValid} = validateInput(this.state);

    if(!isValid){
      this.setState({ errors });
    }
    return isValid;
  }
  onSubmit(e){
    e.preventDefault();
    this.setState({errors: {}, isLoading:false});
    if(this.isValid()){
      this.props.userSignupRequest(this.state).then(
        () =>{
          this.props.addFlashMessage({
            type:'success',
            text:'You signed up successfully. Welcome'
          })
          browserHistory.push('/');
        },
        (err) => this.setState({errors: err.response.data})
      );
    }

  }
  render(){
    let options=[];
    const { errors } = this.state;
    console.log(errors);
    Object.keys(Timezones).forEach((key)=>{
      let optionValue = `${key} ${Timezones[key]}`;
      options.push(<option key={key} value={optionValue}>{key} {Timezones[key]}</option>)
    });
    return(
      <form onSubmit = {this.onSubmit}>
        <h2>Sign Up</h2>
          <TextFieldGroup
            error={errors.username}
            label="Username:"
            onChange={this.onChange}
            checkUserExists ={this.checkUserExists}
            value={this.state.username}
            type= 'text'
            field='username'
            />

            <TextFieldGroup
              error={errors.email}
              label="Email:"
              onChange={this.onChange}
              checkUserExists={this.checkUserExists}
              value={this.state.email}
              type='email'
              field='email'
              />
              <TextFieldGroup
                error={errors.password}
                label="Password"
                onChange={this.onChange}
                value={this.state.password}
                type='password'
                field='password'
                />

              <TextFieldGroup
                error={errors.passwordVerification}
                label="Re-Enter Password"
                onChange={this.onChange}
                value={this.state.passwordVerification}
                type='password'
                field='passwordVerification'
                />
        <div className = {classnames("form-group", {'has-error':errors.timezone})}>
          <label className="control-label">Select Timezone:</label>
          <select
            value={this.state.timezone}
            onChange= {this.onChange}
            type="text"
            name="timezone"
            className="form-control">
            <option value="" disabled>Choose Your Timezone</option>
            {options}
            </select>
            {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>


        <div className = "form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-md">
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}
export default SignUpForm;
