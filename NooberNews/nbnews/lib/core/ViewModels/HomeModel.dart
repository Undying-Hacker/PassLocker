import 'package:flutter/foundation.dart';
import 'package:nbnews/core/Models/Article.dart';
import 'package:nbnews/core/Services/api.dart';
import 'package:nbnews/core/Services/settings.dart';
import 'package:nbnews/core/ViewModels/User.dart';
import '../../locator.dart';

class HomeModel extends ChangeNotifier {
  Api _api = locator<Api>();
  List<Article> headlines;
  List<Article> topicNews;
  int topicIndex;
  Future fetchTopHeadlines() async {
    headlines = await _api.fetchTopHeadlines();
    notifyListeners();
  }

  Future fetchUserTopic(String topic, int index) async {
    if (topicIndex != index) {
      topicIndex = index;
      notifyListeners();
      topicNews = await _api.fetchUserTopic(topic);
      notifyListeners();
    }
  }
}
