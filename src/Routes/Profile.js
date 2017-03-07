import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import NoUser from 'file!../static/images/no_user.png';
import RaisedButton from 'material-ui/RaisedButton';
import { imageToBase64 } from '../utils/imageUtils';
import { UserActions } from '../Actions/';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_img: null,
      name: null,
      description: null
    }
  }

  componentWillMount() {
    const { isUserLoggedIn } = this.props;

    if (isUserLoggedIn) {
      this.props.dispatch(UserActions.getProfile());
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.profile) {
      this.setState({
        profile_img: nextProps.profile.profile_img,
        name: nextProps.profile.name,
        description: nextProps.profile.description
      });
    }
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  handleUpdateProfile() {
    this.props.dispatch(UserActions.updateProfile(this.state))
  }

  handleChangeProfileImg(event) {
    const file = event.target.files[0];

    imageToBase64(file, response => {
      this.setState({
        profile_img: response
      })
    });
  }

  render() {

    const { profile } = this.props;

    if (!profile) return null;

    const { profile_img, name, description } = this.state

    return (
      <div>
        <h3>Your profile</h3>
        <div className="paper-wrapper">
          <Paper zDepth={1}  style={{display: 'inline-block'}}>
            <div className="form">
              <img style={{width: '40vw'}} className="profile" src={ profile_img || NoUser }/>
              <RaisedButton
                label="Choose an Image"
                labelPosition="before"
                containerElement="label"
              >
                <input type="file" style={{display: 'none'}} onChange={(e) => this.handleChangeProfileImg(e)}/>
              </RaisedButton>
            </div>
          </Paper>
          <Paper zDepth={1} style={{display: 'block', marginTop: 20}}>
            <div className="form">
              <TextField
                value={ name || ''}
                floatingLabelText="Name"
                fullWidth={true}
                className="name"
                onChange={this.handleChangeName.bind(this)}
              />
              <TextField
                value={ description || ''}
                floatingLabelText="Description"
                rows={3}
                className="description"
                fullWidth={true}
                onChange={this.handleChangeDescription.bind(this)}
              />
            </div>
          </Paper>
          <RaisedButton className="submit" label="Update profile" onClick={this.handleUpdateProfile.bind(this)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    isUserLoggedIn: state.user.isUserLoggedIn
  }
}
export default connect(mapStateToProps)(Profile);