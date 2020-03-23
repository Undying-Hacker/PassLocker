import 'package:flutter/material.dart';
import 'package:nbnews/core/ViewModels/User.dart';
import 'package:nbnews/locator.dart';
import 'package:nbnews/ui/RoutesHandler.dart';
import 'package:nbnews/ui/Widgets/BottomNavController.dart';
import 'package:provider/provider.dart';

import 'core/Services/auth.dart';

void main() {
  setUpLocator();
  runApp(MyApp());
  locator<Auth>().getCurrentUser();
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamProvider<User>(
      create: (_) => locator<Auth>().userController.stream,
      child: MaterialApp(
        title: "NooberNews",
        home: BottomNavController(),
        theme: ThemeData(
          primaryColor: Color(0xffD33061),
          accentColor: Colors.black26,
        ),
        onGenerateRoute: Router.generateRoute,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
