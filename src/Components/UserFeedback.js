import React from 'react'

class UserFeedback extends React.Component {


  render() {

    const { feedBack } = this.props

    const messagestyle = {
      height: 40, width: '100%', background: '#f7f7f7', marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'
    }

    let feedBackMessage = null

    if (feedBack && feedBack.error) {
      feedBackMessage = (<p style={{fontWeight: 600, color: 'red'}}>{feedBack.message}</p>)
    }

    if (feedBack && feedBack.success) {
      feedBackMessage = (<p style={{fontWeight: 600, color: '#03996e'}}>{feedBack.message || ''}</p>)
    }

    return (
      <div style={messagestyle}>
        { feedBackMessage }
      </div>
    )

  }
}

export default UserFeedback

