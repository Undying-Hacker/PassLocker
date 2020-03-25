import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:nbnews/core/Models/Article.dart';

class Api {
  static const endpoint = "newsapi.org";
  static const apiKey = "754519a4bbdd4945ad6c46e259fa5f38";
  final _client = new http.Client();
  Future<List<Article>> fetchTopHeadlines() async {
    var articles = List<Article>();
    var response = await _client.get(Uri.http(
        endpoint, "v2/top-headlines", {"country": "us", "apiKey": apiKey}));
    var parsedRes = json.decode(response.body)["articles"] as List<dynamic>;
    for (var article in parsedRes) {
      articles.add(Article.fromJson(article));
    }
    return articles;
  }

  Future<List<Article>> fetchUserTopic(String topic) async {
    var articles = List<Article>();
    var response = await _client.get(Uri.http(endpoint, "v2/top-headlines",
        {"country": "us", "category": topic, "apiKey": apiKey}));
    var parsedRes = json.decode(response.body)["articles"] as List<dynamic>;
    for (var article in parsedRes) {
      articles.add(Article.fromJson(article));
    }
    return articles;
  }

  Future<List<Article>> searchByKeyword(String keyword, {int page}) async {
    var articles = List<Article>();
    var response = await _client.get(
        Uri.http(endpoint, "v2/everything", {"q": keyword, "apiKey": apiKey, "page": page.toString()}));
    var parsedRes = json.decode(response.body)["articles"] as List<dynamic>;
    for (var article in parsedRes) {
      articles.add(Article.fromJson(article));
    }
    return articles;
  }
}
