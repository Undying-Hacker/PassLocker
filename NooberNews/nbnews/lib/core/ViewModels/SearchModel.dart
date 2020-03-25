import 'package:nbnews/core/Models/Article.dart';
import 'package:nbnews/core/Services/api.dart';
import 'package:nbnews/core/ViewModels/BaseModel.dart';
import 'package:nbnews/core/enums/ViewState.dart';
import 'package:nbnews/locator.dart';

class SearchModel extends BaseModel {
  Api _api = locator<Api>();
  bool _hasMoreResults = true;
  int _page = 1;
  List<Article> searchResults = [];
  Future search(String keyword) async {
    if (keyword.length > 0) {
      setState(ViewState.Busy);
      _hasMoreResults = true;
      searchResults = await _api.searchByKeyword(keyword, page: _page);
      setState(ViewState.Idle);
    }
  }

  Future loadMoreResults(String keyword) async {
    if (_hasMoreResults && _page <= 5) {
      var results = await _api.searchByKeyword(keyword, page: _page++);
      if (results.length > 0) {
        for (Article article in results) {
          searchResults.add(article);
        }
      } else {
        _hasMoreResults = false;
      }
      notifyListeners();
    }
  }
}
