import 'package:flutter/foundation.dart';
import 'package:nbnews/core/Models/Article.dart';
import 'package:nbnews/core/Services/api.dart';
import 'package:nbnews/locator.dart';

enum SearchState { Initial, Idle, InitialLoading, LoadingMoreResult, NoResult }

class SearchModel extends ChangeNotifier {
  Api _api = locator<Api>();
  bool _hasMoreResults = true;
  int _page = 1;
  SearchState _state = SearchState.Initial;
  SearchState get state => _state;
  List<Article> searchResults = [];
  void setState(SearchState state) {
    _state = state;
    notifyListeners();
  }

  Future search(String keyword) async {
    if (keyword.length > 0) {
      setState(SearchState.InitialLoading);
      _hasMoreResults = true;
      _page = 1;
      searchResults = await _api.searchByKeyword(keyword, page: _page);
      if (searchResults.length == 0) {
        setState(SearchState.NoResult);
      }
      else {
        setState(SearchState.Idle);
      }
    }
  }

  Future loadMoreResults(String keyword) async {
    if (_hasMoreResults &&
        _page <= 5 &&
        _state != SearchState.LoadingMoreResult) {
      setState(SearchState.LoadingMoreResult);
      var results = await _api.searchByKeyword(keyword, page: _page++);
      if (results.length > 0) {
        for (Article article in results) {
          searchResults.add(article);
        }
      } else {
        _hasMoreResults = false;
      }
      setState(SearchState.Idle);
    }
  }
}
