import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/fa_icon.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:nbnews/core/Services/auth.dart';
import 'package:nbnews/core/Services/settings.dart';
import 'package:nbnews/ui/Views/Login.dart';
import 'package:nbnews/core/ViewModels/User.dart';
import 'package:nbnews/locator.dart';
import 'package:provider/provider.dart';
import 'package:transparent_image/transparent_image.dart';

class UserView extends StatefulWidget {
  const UserView({Key key}) : super(key: key);

  @override
  _UserViewState createState() => _UserViewState();
}

class _UserViewState extends State<UserView>
    with SingleTickerProviderStateMixin {
  static const labels = ["Small", "Medium", "Large"];
  static const fontRate = [0.75, 1, 1.25];
  void showAuthError(error) {
    Scaffold.of(context).showSnackBar(SnackBar(
      content: Text("Sign in failed, please check your network connection"),
    ));
  }

  final authService = locator<Auth>();
  @override
  Widget build(BuildContext context) {
    AppSettings system = Provider.of<AppSettings>(context);
    User user = Provider.of<User>(context);
    return Container(
      decoration: BoxDecoration(
          color: Colors.grey[100],
          borderRadius: BorderRadius.only(
              bottomLeft: Radius.circular(25),
              bottomRight: Radius.circular(25))),
      child: SafeArea(
        child: Column(
          children: <Widget>[
            Container(
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 30),
              decoration: BoxDecoration(
                  gradient:
                      LinearGradient(colors: [Colors.black87, Colors.black54])),
              child: Row(
                children: <Widget>[
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: Colors.transparent,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(40),
                      child: user != null
                          ? FadeInImage.memoryNetwork(
                              placeholder: kTransparentImage,
                              image: user.photoUrl)
                          : Image.asset("images/default_avatar.png"),
                    ),
                  ),
                  SizedBox(
                    width: 20,
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          user != null
                              ? user.displayName
                              : "Logged in as guess",
                          softWrap: true,
                          style: TextStyle(
                              fontFamily: "Roboto",
                              fontSize: 24,
                              color: Colors.white,
                              fontWeight: FontWeight.w600),
                        ),
                        Text(
                          user != null
                              ? user.email
                              : "Log in to customize your reading experience",
                          softWrap: true,
                          style: TextStyle(
                              fontFamily: "Roboto", color: Colors.grey),
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
            Expanded(
              child: Padding(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: <Widget>[
                    Text(
                      "Settings",
                      style: TextStyle(
                          fontFamily: "Roboto",
                          fontSize: 24,
                          color: Colors.black,
                          fontWeight: FontWeight.w500),
                    ),
                    Expanded(
                      child: ListView(
                        physics: BouncingScrollPhysics(),
                        children: <Widget>[
                          ListTile(
                            onTap: () => Navigator.of(context).pushNamed(
                              '/settings/font',
                            ),
                            trailing: Icon(Icons.arrow_forward_ios),
                            contentPadding: EdgeInsets.symmetric(vertical: 20),
                            leading: CircleAvatar(
                                radius: 30,
                                backgroundColor: Colors.white,
                                child: Icon(
                                  Icons.font_download,
                                  color: Colors.redAccent,
                                )),
                            title: Text(
                              "Font Size",
                              style: TextStyle(fontWeight: FontWeight.w500),
                            ),
                            subtitle: Text(
                                "Change how big the text in articles should be"),
                          ),
                          ListTile(
                            onTap: () => Navigator.of(context)
                                .pushNamed('/settings/region'),
                            trailing: Icon(Icons.arrow_forward_ios),
                            contentPadding: EdgeInsets.symmetric(vertical: 20),
                            leading: CircleAvatar(
                                radius: 30,
                                backgroundColor: Colors.white,
                                child: FaIcon(
                                  FontAwesomeIcons.globe,
                                  color: Colors.green,
                                )),
                            title: Text(
                              "Region",
                              style: TextStyle(fontWeight: FontWeight.w500),
                            ),
                            subtitle: Text(
                                "Select your preffered region to get news from"),
                          ),
                          ListTile(
                            onTap: () => Navigator.of(context)
                                .pushNamed('/settings/sources'),
                            trailing: Icon(Icons.arrow_forward_ios),
                            contentPadding: EdgeInsets.symmetric(vertical: 20),
                            leading: CircleAvatar(
                                radius: 30,
                                backgroundColor: Colors.white,
                                child: FaIcon(
                                  FontAwesomeIcons.newspaper,
                                  color: Colors.indigoAccent,
                                )),
                            title: Text(
                              "News Sources",
                              style: TextStyle(fontWeight: FontWeight.w500),
                            ),
                            subtitle: Text(
                                "Browse News sources where we get news from"),
                          ),
                          user != null
                              ? ListTile(
                                  onTap: () => authService.signOut(),
                                  trailing: Icon(Icons.arrow_forward_ios),
                                  contentPadding:
                                      EdgeInsets.symmetric(vertical: 20),
                                  leading: CircleAvatar(
                                      radius: 30,
                                      backgroundColor: Colors.white,
                                      child: FaIcon(
                                        FontAwesomeIcons.signOutAlt,
                                        color: Colors.brown,
                                      )),
                                  title: Text(
                                    "Log out",
                                    style:
                                        TextStyle(fontWeight: FontWeight.w500),
                                  ),
                                )
                              : Column(
                                  children: <Widget>[
                                    GestureDetector(
                                      onTap: () => authService
                                          .loginWithFacebook()
                                          .catchError(showAuthError),
                                      child: Container(
                                        height: 60,
                                        decoration: BoxDecoration(
                                          color: Color(0xff3b5998),
                                          borderRadius:
                                              BorderRadius.circular(25),
                                        ),
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
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
                                    SizedBox(
                                      height: 20,
                                    ),
                                    GestureDetector(
                                      onTap: () => authService
                                          .signInWithGoogle()
                                          .catchError(showAuthError),
                                      child: Container(
                                        height: 60,
                                        decoration: BoxDecoration(
                                          color: Colors.redAccent,
                                          borderRadius:
                                              BorderRadius.circular(25),
                                        ),
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
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
                                )
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
            AnimatedContainer(
              duration: Duration(milliseconds: 250),
              height: system.settings.isVip ? 0 : 161,
              child: ClipRRect(
                borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(25),
                    bottomRight: Radius.circular(25)),
                child: MaterialBanner(
                  backgroundColor: Colors.black87,
                  padding: EdgeInsets.all(20),
                  contentTextStyle: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w300,
                      color: Colors.white),
                  content: Text(
                      "You are using free membership, upgrade to pro today to save up to 50% and get many extra features!"),
                  actions: <Widget>[
                    FlatButton(
                      splashColor: Colors.transparent,
                      child: Text(
                        "Dismiss",
                        style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: Colors.red),
                      ),
                      onPressed: () {
                        system.setVip(false);
                      },
                    ),
                    FlatButton(
                      splashColor: Colors.transparent,
                      child: Text(
                        "Read more",
                        style: TextStyle(
                            fontSize: 16, fontWeight: FontWeight.w600),
                      ),
                      onPressed: () {
                        system.setVip(true);
                      },
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
