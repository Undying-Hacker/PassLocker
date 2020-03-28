import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/Article.dart';
import 'package:nbnews/core/Services/settings.dart';
import 'package:nbnews/locator.dart';
import 'package:nbnews/ui/Widgets/FontSetting.dart';
import 'package:transparent_image/transparent_image.dart';

class ArticleView extends StatefulWidget {
  final Article article;
  final String heroTag;
  const ArticleView({Key key, this.article, this.heroTag}) : super(key: key);

  @override
  _ArticleViewState createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView>
    with SingleTickerProviderStateMixin {
  AppSettings config;
  AnimationController _controller;
  Animation<double> animation;
  @override
  void initState() {
    super.initState();
    config = locator<AppSettings>();
    _controller =
        AnimationController(duration: Duration(milliseconds: 500), vsync: this);
    animation = CurvedAnimation(parent: _controller, curve: Curves.easeInOut);
    _controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: widget.heroTag,
      child: Material(
        child: Container(
          child: Stack(
            children: <Widget>[
              Container(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.width * 9 / 16,
                child: Stack(
                  fit: StackFit.expand,
                  children: <Widget>[
                    widget.article.imageUrl != null
                        ? FadeInImage.memoryNetwork(
                            fadeInDuration: Duration(milliseconds: 250),
                            fadeInCurve: Curves.easeIn,
                            image: widget.article.imageUrl,
                            placeholder: kTransparentImage,
                            fit: BoxFit.cover,
                          )
                        : Image.asset(
                            "images/article_placeholder_image.png",
                            fit: BoxFit.cover,
                          ),
                    Container(
                      color: Colors.black26,
                    ),
                    Positioned(
                      top: 50,
                      left: 50,
                      right: 50,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          GestureDetector(
                              onTap: () => Navigator.of(context).pop(),
                              child: Icon(Icons.arrow_back,
                                  size: 32, color: Colors.white)),
                          GestureDetector(
                              onTap: () => _controller.forward(),
                              child: Icon(Icons.bookmark,
                                  size: 32, color: Colors.white)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                child: DraggableScrollableSheet(
                  minChildSize: (MediaQuery.of(context).size.height -
                          9 / 16 * MediaQuery.of(context).size.width +
                          25) /
                      MediaQuery.of(context).size.height,
                  initialChildSize: (MediaQuery.of(context).size.height -
                          9 / 16 * MediaQuery.of(context).size.width +
                          25) /
                      MediaQuery.of(context).size.height,
                  builder: (context, scrollController) {
                    return Container(
                      padding: EdgeInsets.only(top: 50),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(25),
                          topRight: Radius.circular(25),
                        ),
                      ),
                      child: SingleChildScrollView(
                        padding: EdgeInsets.symmetric(horizontal: 50),
                        physics: BouncingScrollPhysics(),
                        controller: scrollController,
                        child: FadeTransition(
                          opacity: animation,
                          child: Column(
                            children: <Widget>[
                              Column(
                                children: <Widget>[
                                  Text(
                                    widget.article.title,
                                    style: TextStyle(
                                        fontFamily: "PTSerif",
                                        fontSize: 24 * config.getActualFontRate(config.settings.fontRate),
                                        fontWeight: FontWeight.bold),
                                  ),
                                  SizedBox(
                                    height: 20,
                                  ),
                                  SizedBox(
                                    width: MediaQuery.of(context).size.width,
                                    child: Wrap(
                                      alignment: WrapAlignment.spaceBetween,
                                      runSpacing: 10,
                                      children: <Widget>[
                                        Text(
                                          widget.article.author ?? "Anonymous",
                                          style: TextStyle(
                                            fontFamily: "Roboto",
                                            fontSize: 14 * config.getActualFontRate(config.settings.fontRate),
                                            color:
                                                Theme.of(context).accentColor,
                                          ),
                                        ),
                                        Text(
                                          DateTime.parse(
                                                  widget.article.published)
                                              .toIso8601String()
                                              .substring(0, 10),
                                          style: TextStyle(
                                            fontFamily: "Roboto",
                                            fontSize: 14 * config.getActualFontRate(config.settings.fontRate),
                                            color:
                                                Theme.of(context).accentColor,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              SizedBox(
                                height: 20,
                              ),
                              Text(
                                widget.article.content != null
                                    ? widget.article.content * 20
                                    : 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
                                style: TextStyle(
                                  fontFamily: "PTSerif",
                                  fontSize: 20 * config.getActualFontRate(config.settings.fontRate),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
