import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:nbnews/core/Services/auth.dart';
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
  final authService = locator<Auth>();
  @override
  Widget build(BuildContext context) {
    User user = Provider.of<User>(context);
    return Container(
        decoration: BoxDecoration(
            color: user == null ? Colors.transparent : Colors.white,
            borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(25),
                bottomRight: Radius.circular(25))),
        child: user == null
            ? Login(
                facebookLogin: authService.loginWithFacebook,
                googleLogin: authService.signInWithGoogle,
              )
            : SafeArea(
                child: Padding(
                  padding: EdgeInsets.all(20),
                                  child: Column(
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          CircleAvatar(
                            radius: 40,
                            backgroundColor: Colors.transparent,
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(40),
                              child: FadeInImage.memoryNetwork(
                                  placeholder: kTransparentImage,
                                  image: user.photoUrl),
                            ),
                          ),
                          SizedBox(width: 20,),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                Text(
                                  user.displayName,
                                  softWrap: true,
                                  style: TextStyle(
                                      fontFamily: "Roboto",
                                      fontSize: 24,
                                      fontWeight: FontWeight.w600),
                                ),
                                Text(user.email, softWrap: true, style: TextStyle(fontFamily: "Roboto", color: Colors.grey),),
                              ],
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                ),
              ));
  }
}
