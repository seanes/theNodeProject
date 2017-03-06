import React from 'react';
import { browserHistory } from 'react-router';
import MdArrowBack from 'material-ui/svg-icons/navigation/arrow-back'


const Footer = props => (
  <div className="footer">
    <MdArrowBack color="#fff" onClick={() => browserHistory.goBack() } />
    <div className="copyright">(c) 2017</div>
  </div>
)

export default Footer;