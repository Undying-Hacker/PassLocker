import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/fa_icon.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:nbnews/core/Services/auth.dart';
import 'package:nbnews/core/ViewModels/User.dart';
import 'package:nbnews/locator.dart';
import 'package:provider/provider.dart';

class UserView extends StatelessWidget {
  const UserView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    User user = Provider.of<User>(context);
    final authService = locator<Auth>();
    return Container(
      child: user == null
          ? Stack(
              children: <Widget>[
                Container(
                  height: MediaQuery.of(context).size.height,
                  child: ClipRRect(
                      borderRadius: BorderRadius.only(
                          bottomLeft: Radius.circular(25),
                          bottomRight: Radius.circular(25)),
                      child: Image.asset("images/login_bg1.jpeg",
                          fit: BoxFit.cover)),
                ),
                Positioned(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        Column(
                          children: <Widget>[
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Text(
                                  "No",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      color: Color(0xffD74C4C),
                                      fontFamily: "PTSerif",
                                      fontSize: 48,
                                      fontWeight: FontWeight.w100),
                                ),
                                Transform.translate(
                                    offset: Offset(0, 7),
                                    child: FaIcon(
                                      FontAwesomeIcons.newspaper,
                                      color: Color(0xffD74C4C),
                                      size: 32,
                                    )),
                                Text(
                                  "ber",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      color: Color(0xffD74C4C),
                                      fontFamily: "PTSerif",
                                      fontSize: 48,
                                      fontWeight: FontWeight.w100),
                                ),
                                Text(
                                  "News",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      color: Color(0xffD7B84C),
                                      fontFamily: "PTSerif",
                                      fontSize: 48,
                                      fontWeight: FontWeight.w100),
                                ),
                              ],
                            ),
                            Text("Share, care & connect", style: TextStyle(color: Colors.white, fontStyle: FontStyle.italic, fontSize: 18, fontFamily: "PTSerif"),)
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: <Widget>[
                            GestureDetector(
                              onTap: authService.loginWithFacebook,
                              child: Container(
                                height: 60,
                                decoration: BoxDecoration(
                                  boxShadow: [
                                    BoxShadow(
                                        color: Color(0xff3b5998),
                                        blurRadius: 20)
                                  ],
                                  color: Color(0xff3b5998),
                                  borderRadius: BorderRadius.circular(25),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    FaIcon(
                                      FontAwesomeIcons.facebook,
                                      color: Colors.white,
                                    ),
                                    Text(
                                      "   Sign in with Facebook",
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontFamily: "Roboto",
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Padding(
                                padding: EdgeInsets.symmetric(vertical: 20),
                                child: Text(
                                  "Or",
                                  style: TextStyle(
                                      fontFamily: "PTSerif",
                                      color: Colors.white,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold),
                                )),
                            GestureDetector(
                              onTap: () {
                                authService
                                    .signInWithGoogle()
                                    .then((user) => print("User: $user"))
                                    .catchError((err) => print(err));
                              },
                              child: Container(
                                height: 60,
                                decoration: BoxDecoration(
                                  boxShadow: [
                                    BoxShadow(
                                        color: Colors.redAccent, blurRadius: 20)
                                  ],
                                  color: Colors.redAccent,
                                  borderRadius: BorderRadius.circular(25),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    FaIcon(FontAwesomeIcons.google,
                                        color: Colors.white),
                                    Text(
                                      "   Sign in with Google",
                                      style: TextStyle(
                                          fontFamily: "Roboto",
                                          fontSize: 16,
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                        Text(
                          "Copyright 2020 by NooberCong",
                          style: TextStyle(color: Colors.white),
                        )
                      ],
                    ),
                    top: 100,
                    bottom: 100,
                    left: 50,
                    right: 50),
              ],
            )
          : Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    "Hello there ${user.displayName}",
                    style: TextStyle(color: Colors.white, fontSize: 32),
                  ),
                  MaterialButton(
                    color: Colors.blueAccent,
                    onPressed: authService.signOut,
                    child: Text(
                      "Sign Out",
                      style: TextStyle(color: Colors.white, fontSize: 18),
                    ),
                  )
                ],
              ),
            ),
    );
  }
}
