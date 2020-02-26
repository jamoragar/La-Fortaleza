import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebase/firebase';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Login extends Component {
    render() {
      const { user, signOut, signInWithGoogle } = this.props;
        return (
            <div>
                {
                user
                    ? <p>Hola, {user.displayName}</p>
                    : <p>Por favor Ingresa tus credenciales</p>
                }
                {
                user
                    ? <button onClick={signOut}>Sign out</button>
                    : <button onClick={signInWithGoogle}>Ingresar con Google</button>
                }
            </div>
      );
    }
  }

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);

