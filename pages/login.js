// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../src/firebase/index";

import Index from "../pages";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

class SignInScreen extends React.Component {
  state = {
    isSignedIn: false, // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }));
    firebase.auth().onAuthStateChanged(async (user) => {
      // 未ログイン時
      if (!user) {
        // 匿名ログインする
        firebase.auth().signInAnonymously();
      }
      // ログイン時
      else {
        // ログイン済みのユーザー情報があるかをチェック
        var userDoc = await firebase.firestore().collection('user').doc(user.uid).get();
        if (!userDoc.exists) {
          // Firestore にユーザー用のドキュメントが作られていなければ作る
          await userDoc.ref.set({
            screen_name: user.uid,
            display_name: user.displayName,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            email: user.email,
          });
        }
      }
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div style={{ textAlign: "center" }}>
          <h1>Kc3hack-b</h1>
          <p>サインインしてください</p>
          <p>登録されていないメールアドレスを使用すると新規登録になります</p>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
    return <Index />;
  }
}
export default SignInScreen;
