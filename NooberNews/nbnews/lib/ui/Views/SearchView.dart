import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/Article.dart';
import 'package:nbnews/core/ViewModels/SearchModel.dart';
import 'package:nbnews/core/enums/ViewState.dart';
import 'package:nbnews/ui/Views/BaseView.dart';
import 'package:nbnews/ui/Widgets/HeadlineCard.dart';

class SearchView extends StatefulWidget {
  SearchView({Key key}) : super(key: key);

  @override
  _SearchViewState createState() => _SearchViewState();
}

class _SearchViewState extends State<SearchView> {
  final _controller = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return BaseView<SearchModel>(
      builder: (context, model, child) {
        return Scaffold(
          body: SafeArea(
            child: Container(
              width: MediaQuery.of(context).size.width,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Container(
                    height: 50,
                    padding: EdgeInsets.symmetric(horizontal: 10),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(5),
                      color: Color(0xffECEFF1),
                    ),
                    width: MediaQuery.of(context).size.width - 100,
                    child: Row(
                      children: <Widget>[
                        Icon(Icons.search, size: 32, color: Colors.black45),
                        Expanded(
                          child: TextField(
                            autofocus: true,
                            controller: _controller,
                            decoration:
                                InputDecoration(border: InputBorder.none),
                          ),
                        )
                      ],
                    ),
                  ),
                  RaisedButton(
                    child: Text("Seach"),
                    onPressed: () => model.search(_controller.text),
                  ),
                  Expanded(
                    child: model.state == ViewState.Idle
                        ? ListView.builder(
                          itemCount: model.searchResults.length,
                          itemBuilder: (context, index) {
                            Article article = model.searchResults[index];
                            return HeadlineCard(article: article);
                          })
                        : Center(
                            child: CircularProgressIndicator(),
                          ),
                  )
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
