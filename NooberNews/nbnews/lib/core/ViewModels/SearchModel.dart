import 'package:nbnews/core/Models/Article.dart';
import 'package:nbnews/core/Services/api.dart';
import 'package:nbnews/core/ViewModels/BaseModel.dart';
import 'package:nbnews/core/enums/ViewState.dart';
import 'package:nbnews/locator.dart';

class SearchModel extends BaseModel {
  Api _api = locator<Api>();
  List<Article> searchResults = [];
  Future search(String keyword) async {
    setState(ViewState.Busy);
    searchResults = await _api.searchByKeyword(keyword);
    print(searchResults);
    setState(ViewState.Idle);
  }
}