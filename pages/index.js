import Top from "../components/Top";

// link library
import React, { Component } from "react";
import firebase from "../src/firebase/index.js";
import MainLayout from "../layouts/Main";

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
            //ログイン後のページ
            <MainLayout>
              <Top />
            </MainLayout>
          ) : (
            <>
              <MainLayout>
                <Top />
              </MainLayout>
            </>
          )}
        </div>
      );
    }
  }
}

export default Index;
