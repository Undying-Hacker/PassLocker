import 'package:flutter/material.dart';

class NotificationView extends StatelessWidget {
  const NotificationView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: SingleChildScrollView(child: Text("Lorem ipsum is one of the most important widget of the year and it surprises every body but i believe in order to achieve mortality one must follow the path of the wicked and accept to give his soul to the devil because it is the only way to become a true saint.\nBut in contrast, the bibble advised him against doing such foolishness and tried to revert his anonymity using a tool called google chrome." * 10)),
    );
  }
}