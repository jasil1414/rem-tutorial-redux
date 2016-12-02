import React from 'react';
import SignUpForm from './SignUpForm';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions'
import { addFlashMessage } from '../../actions/flashMessages'
class SignUp extends React.Component {
  render(){
    console.log(this.props);
    const {userSignupRequest, addFlashMessage, isUserExists} =this.props;
    return (
      <div className='row'>
        <div className="col-md-4 col-md-offset-4">
          <SignUpForm
            userSignupRequest={userSignupRequest}
            addFlashMessage={addFlashMessage}
            isUserExists={isUserExists}
            />
      </div>
    </div>
    );
  }
}

SignUp.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}
export default connect(null, { userSignupRequest, addFlashMessage, isUserExists }) (SignUp);
