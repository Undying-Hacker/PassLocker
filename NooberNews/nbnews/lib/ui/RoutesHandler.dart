import 'package:flutter/material.dart';
import 'package:nbnews/ui/Views/ArticleView.dart';
import 'package:nbnews/ui/Views/SearchView.dart';

const String initialRoute = '/';

class Router {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/article':
        final Map<String, dynamic> args = settings.arguments;
        return MaterialPageRoute(
          builder: (_) => ArticleView(
            heroTag: args["heroTag"],
            article: args["article"],
          ),
        );
      case '/search':
        return MaterialPageRoute(builder: (_) => SearchView());
      default:
        return MaterialPageRoute(
          builder: (_) => Container(
            child: Center(
              child: Text("Error 404: Not Found"),
            ),
          ),
        );
    }
  }
}
