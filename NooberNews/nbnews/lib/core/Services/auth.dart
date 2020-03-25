import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_facebook_login/flutter_facebook_login.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:nbnews/core/ViewModels/User.dart';

class Auth {
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  final FacebookLogin facebookLogin = FacebookLogin();
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final userController = StreamController<User>();
  Future getCurrentUser() async {
    final user = await _auth.currentUser();
    if (user != null) {
      userController.add(User(
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl));
    }
  }

  Future signInWithGoogle() async {
    final GoogleSignInAccount googleUser = await _googleSignIn.signIn();
    if (googleUser != null) {
      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      final AuthCredential credential = GoogleAuthProvider.getCredential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final FirebaseUser user =
          (await _auth.signInWithCredential(credential)).user;
      userController.add(User(
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl));
    }
  }

  Future loginWithFacebook() async {
    final _client = new http.Client();
    final result = await facebookLogin.logIn(["email"]);

    switch (result.status) {
      case FacebookLoginStatus.loggedIn:
        final token = result.accessToken.token;
        final graphResponse = await _client.get(
            'https://graph.facebook.com/v2.12/me?fields=name,first_name,last_name,email,picture.height(200)&access_token=$token');
        final profile = json.decode(graphResponse.body);
        userController.add(User(
            displayName: profile["name"],
            email: profile["email"],
            photoUrl: profile["picture"]["data"]["url"]));
        break;
      case FacebookLoginStatus.cancelledByUser:
        break;
      case FacebookLoginStatus.error:
        throw Error();
        break;
    }
  }

  Future signOut() async {
    await _auth.signOut();
    userController.add(null);
  }
}
