import 'package:flutter/material.dart';
import 'package:nbnews/core/Services/settings.dart';
import 'package:nbnews/locator.dart';
import 'package:nbnews/ui/RoutesHandler.dart';
import 'package:nbnews/ui/Widgets/BottomNavController.dart';
import 'package:provider/provider.dart';

import 'core/Services/auth.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await setUpLocator();
  runApp(MyApp());
  locator<Auth>().getCurrentUser();
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        StreamProvider(
          create: (_) => locator<Auth>().userController.stream,
        ),
        ChangeNotifierProvider(
          create: (_) => locator<AppSettings>(),
        ),
      ],
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
