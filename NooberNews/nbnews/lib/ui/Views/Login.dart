import 'package:flutter/material.dart';
import 'package:nbnews/ui/Widgets/ShiningDot.dart';
import 'package:font_awesome_flutter/fa_icon.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class Login extends StatefulWidget {
  final Function googleLogin;
  final Function facebookLogin;
  Login({Key key, @required this.googleLogin, @required this.facebookLogin})
      : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> with SingleTickerProviderStateMixin{
  AnimationController _controller;
  Animation<double> _shiningAnimation;
  login(Function loginWithProvider, BuildContext context) async {
    try {
      await loginWithProvider();
    }
    catch (err) {
      showDialog(context: context, builder: (context) => AlertDialog(title: Text("Authentication Error"), content: Text("Login failed, please check your internet connection!")));
    }
  }
  @override
  void initState() { 
    super.initState();
    _controller = AnimationController(vsync: this, duration: Duration(seconds: 1))..repeat(reverse: true);
    _shiningAnimation = Tween<double>(begin: 0.0, end: 0.2).animate(_controller);
  }
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned(
            top: 50,
            left: 50,
            child: ShiningDot(
              size: 100,
              color: Colors.blueAccent.withOpacity(0.5),
              animation: _shiningAnimation,
            )),
        Positioned(
            top: 150,
            left: 200,
            child: ShiningDot(
              size: 200,
              color: Colors.redAccent.withOpacity(0.5),
              animation: _shiningAnimation,
            )),
        Positioned(
            top: 500,
            left: -50,
            child: ShiningDot(
              size: 150,
              color: Colors.greenAccent.withOpacity(0.5),
              animation: _shiningAnimation,
            )),
        Positioned(
            bottom: 0,
            right: 5,
            child: ShiningDot(
              size: 300,
              color: Colors.yellowAccent.withOpacity(0.5),
              animation: _shiningAnimation,
            )),
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
                    Text(
                      "Share, care & connect",
                      style: TextStyle(
                          color: Colors.white,
                          fontStyle: FontStyle.italic,
                          fontSize: 18,
                          fontFamily: "PTSerif"),
                    )
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    GestureDetector(
                      onTap: () => login(widget.facebookLogin, context),
                      child: Container(
                        height: 60,
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(color: Color(0xff3b5998), blurRadius: 20)
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
                      onTap: () => login(widget.googleLogin, context),
                      child: Container(
                        height: 60,
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(color: Colors.redAccent, blurRadius: 20)
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
    );
  }
  @override
  void dispose() { 
    _controller.dispose();
    super.dispose();
  }
}
