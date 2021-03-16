import SignInScreen from "../components/SignInScreen";

// link library
import React, { Component } from "react";
import firebase from "firebase";

class Index extends Component {
  state = {
    currentUser: null,
    isLoading: true,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        currentUser: user,
        isLoading: false,
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          {this.state.currentUser ? (
            <>
              <h1>ログイン</h1>
            </>
          ) : (
            <SignInScreen />
          )}
        </div>
      );
    }
  }
}

export default Index;
