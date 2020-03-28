import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/Article.dart';
import 'package:nbnews/core/ViewModels/SearchModel.dart';
import 'package:nbnews/ui/Views/BaseView.dart';
import 'package:nbnews/ui/Widgets/HeadlineCard.dart';

class SearchView extends StatefulWidget {
  SearchView({Key key}) : super(key: key);

  @override
  _SearchViewState createState() => _SearchViewState();
}

class _SearchViewState extends State<SearchView> {
  final _controller = TextEditingController();
  final _lvController = ScrollController();
  final _focusNode = FocusNode();
  @override
  Widget build(BuildContext context) {
    return BaseView<SearchModel>(
      onModelReady: (model) {
        _lvController.addListener(() {
          if (_lvController.offset >=
                  _lvController.position.maxScrollExtent - 50 &&
              model.searchResults.length > 0) {
            model.loadMoreResults(_controller.text);
          }
        });
      },
      builder: (context, model, child) {
        return Scaffold(
          resizeToAvoidBottomPadding: false,
          body: SafeArea(
            child: Container(
              padding: EdgeInsets.only(left: 20, right: 20, top: 20),
              width: MediaQuery.of(context).size.width,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Container(
                        height: 50,
                        padding: EdgeInsets.symmetric(horizontal: 10),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(5),
                          color: Color(0xffECEFF1),
                        ),
                        width: MediaQuery.of(context).size.width - 140,
                        child: Row(
                          children: <Widget>[
                            Icon(Icons.search, size: 32, color: Colors.black45),
                            Expanded(
                              child: TextField(
                                focusNode: _focusNode,
                                onSubmitted: (text) => model.search(text),
                                autofocus: true,
                                controller: _controller,
                                decoration:
                                    InputDecoration(border: InputBorder.none),
                              ),
                            ),
                            IconButton(
                              icon: Icon(Icons.cancel),
                              iconSize: 18,
                              highlightColor: Colors.transparent,
                              focusColor: Colors.transparent,
                              splashColor: Colors.transparent,
                              color: Colors.black45,
                              onPressed: () => _controller.clear(),
                            ),
                          ],
                        ),
                      ),
                      FlatButton(
                        splashColor: Colors.lightBlue[50],
                        child: Container(
                            height: 50,
                            alignment: Alignment.center,
                            child: Text(
                              "Search",
                              style: TextStyle(
                                  color: Colors.blueAccent, fontSize: 16),
                            )),
                        onPressed: () {
                          model.search(_controller.text);
                          _focusNode.unfocus();
                        },
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Expanded(
                      child: model.state == SearchState.InitialLoading
                          ? Center(
                              child: CircularProgressIndicator(),
                            )
                          : model.state == SearchState.Initial
                              ? Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    Image.asset("images/search_bg.png"),
                                    Text(
                                      "Type in something to search",
                                      style: TextStyle(
                                          fontFamily: "Roboto",
                                          color: Colors.grey),
                                    )
                                  ],
                                )
                              : model.state == SearchState.NoResult
                                  ? Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: <Widget>[
                                        Image.asset("images/no_result.png"),
                                        Text(
                                          "Sorry, we found nothing",
                                          style: TextStyle(
                                              fontFamily: "Roboto",
                                              color: Colors.grey),
                                        )
                                      ],
                                    )
                                  : ListView.builder(
                                      controller: _lvController,
                                      physics: BouncingScrollPhysics(),
                                      itemCount: model.searchResults.length,
                                      itemBuilder: (context, index) {
                                        Article article =
                                            model.searchResults[index];
                                        return HeadlineCard(article: article);
                                      })),
                  model.state == SearchState.LoadingMoreResult
                      ? Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[CircularProgressIndicator()],
                        )
                      : SizedBox(
                          height: 0,
                        ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }
}
