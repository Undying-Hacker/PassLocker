import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/NewsCategory.dart';
import 'package:nbnews/core/ViewModels/HomeModel.dart';
import 'package:nbnews/core/ViewModels/User.dart';
import 'package:nbnews/ui/Views/BaseView.dart';
import 'package:nbnews/ui/Widgets/HeadlineCard.dart';
import 'package:nbnews/ui/Widgets/NewsCarousel.dart';
import 'package:provider/provider.dart';

class HomeView extends StatefulWidget {
  HomeView({Key key}) : super(key: key);

  @override
  _HomeViewState createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  @override
  Widget build(BuildContext context) {
    User user = Provider.of<User>(context);
    return BaseView<HomeModel>(
      onModelReady: (model) {
        user = Provider.of<User>(context);
        if (model.headlines == null) {
          print("headlines empty");
          model.fetchTopHeadlines();
        }
        if (model.topicNews == null) {
          print("topic empty");
          model.fetchUserTopic(NewsCategory.categories[0], 0);
        }
      },
      builder: (context, model, child) {
        return Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.only(
              bottomLeft: Radius.circular(25),
              bottomRight: Radius.circular(25),
            ),
          ),
          child: Column(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.symmetric(vertical: 32, horizontal: 50),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    IconButton(
                      icon: Icon(Icons.search, size: 40),
                      onPressed: () {
                        Navigator.of(context).pushNamed('/search');
                      },
                    ),
                    CircleAvatar(
                      backgroundColor: Colors.transparent,
                      radius: 35,
                      child: ClipOval(
                        child: user != null
                            ? Image.network(user.photoUrl)
                            : Image.asset("images/default_avatar.png"),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                margin: EdgeInsets.only(bottom: 30, left: 50),
                width: MediaQuery.of(context).size.width - 50,
                height: 44,
                child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: NewsCategory.categories.length,
                    itemBuilder: (context, index) {
                      var category = NewsCategory.categories[index];
                      return AnimatedContainer(
                        duration: Duration(milliseconds: 250),
                        margin: EdgeInsets.only(right: 30),
                        height: 44,
                        alignment: Alignment.topLeft,
                        decoration: BoxDecoration(
                          border: Border(
                              bottom: model.topicIndex == index
                                  ? BorderSide(
                                      width: 2,
                                      color: Theme.of(context).primaryColor)
                                  : BorderSide(
                                      width: 0,
                                      color: Theme.of(context).primaryColor)),
                        ),
                        child: GestureDetector(
                          onTap: () => model.fetchUserTopic(category, index),
                          child: Text(
                            category,
                            style: TextStyle(
                              fontFamily: "Roboto",
                              fontWeight: FontWeight.bold,
                              fontSize: 24,
                              color: model.topicIndex == index
                                  ? Theme.of(context).primaryColor
                                  : Theme.of(context).accentColor,
                            ),
                          ),
                        ),
                      );
                    }),
              ),
              NewsCarousel(
                articles: model.topicNews,
              ),
              Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: EdgeInsets.only(
                    top: 30,
                    left: 50,
                    right: 50,
                  ),
                  child: Text(
                    "Headlines",
                    style: TextStyle(
                      fontFamily: "Roboto",
                      fontWeight: FontWeight.bold,
                      fontSize: 24,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Container(
                  padding: EdgeInsets.symmetric(
                    horizontal: 50,
                  ),
                  child: model.headlines != null
                      ? ListView.builder(
                          physics: BouncingScrollPhysics(),
                          itemCount: model.headlines.length,
                          addAutomaticKeepAlives: true,
                          itemBuilder: (context, index) {
                            var headline = model.headlines[index];
                            return HeadlineCard(article: headline);
                          })
                      : ListView.builder(
                          itemCount: 3,
                          physics: BouncingScrollPhysics(),
                          itemBuilder: (context, _) {
                            return HeadlineCard(article: null);
                          },
                        ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
