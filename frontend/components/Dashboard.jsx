import React, { Fragment, Component } from 'react';
import SideBar from './SideBar';
import Main from './Main';
import Footer from './Footer';
import ModalProfile from './ModalProfile';
import {configureSocket} from '../configureSocket';

import Peer from 'simple-peer';

// Actions
import { logoutUser, getUser }  from '../actions/sessionActions';
import { fetchRoomMemberships } from '../actions/roomMembershipActions'
import { fetchRooms }           from '../actions/roomActions';
import { fetchAllFriends }      from '../actions/friendActions';
import { 
  fetchAllMessages, 
  fetchRoomMessages }           from '../actions/messageActions';
import { showContactsList }     from '../actions/uiActions';
import { connect }              from 'react-redux';
import titleService             from '../services/titleService';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchRooms } = this.props;
    fetchRooms();
  }

  render() {
    const { dispatch, modalView } = this.props;
    return (
      <Fragment>
        <div className="dashboard">
          { modalView && <ModalProfile /> }
          <SideBar />
          <Main />
          <Footer />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalView: state.ui.profileModalView,
    state
  }
};

const mapDispatchToProps = dispatch => {
  return { 
    fetchRooms: () => { dispatch(fetchRooms()) },
    dispatch 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);