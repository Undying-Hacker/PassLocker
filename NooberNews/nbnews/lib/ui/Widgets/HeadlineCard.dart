import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/Article.dart';
import 'package:shimmer/shimmer.dart';
import 'package:transparent_image/transparent_image.dart';

class HeadlineCard extends StatelessWidget {
  final Article article;
  const HeadlineCard({Key key, this.article}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final String heroTag = article != null
        ? article.imageUrl != null
            ? "HC${article.imageUrl}"
            : "HC${article.title}"
        : null;
    return article != null
        ? GestureDetector(
            onTap: () => Navigator.of(context).pushNamed('/article',
                arguments: {"heroTag": heroTag, "article": article}),
            child: Container(
              margin: EdgeInsets.only(
                bottom: 20,
              ),
              width: MediaQuery.of(context).size.width - 100,
              height: 100,
              child: Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Hero(
                    tag: heroTag,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(25),
                      child: article.imageUrl != null
                          ? FadeInImage.memoryNetwork(
                              height: 100,
                              width: 100,
                              fit: BoxFit.cover,
                              placeholder: kTransparentImage,
                              image: article.imageUrl)
                          : Image.asset(
                              "images/article_placeholder_image.png",
                              height: 100,
                              width: 100,
                              fit: BoxFit.cover,
                            ),
                    ),
                  ),
                  SizedBox(
                    width: 20,
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          article.title.length > 60
                              ? "${article.title.substring(0, 60)}..."
                              : article.title,
                          style: TextStyle(
                              fontFamily: "Roboto",
                              fontSize: 16,
                              fontWeight: FontWeight.bold),
                        ),
                        Text(
                          DateTime.now()
                              .difference(DateTime.parse(article.published))
                              .toString(),
                          style: TextStyle(
                            fontFamily: "Roboto",
                            fontSize: 12,
                            color: Theme.of(context).accentColor,
                          ),
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
          )
        : Container(
            margin: EdgeInsets.only(
              bottom: 20,
            ),
            width: MediaQuery.of(context).size.width - 100,
            height: 100,
            child: Row(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Shimmer.fromColors(
                  child: Container(
                    height: 100,
                    width: 100,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(25),
                      color: Color(0xffbdc3c7),
                    ),
                  ),
                  baseColor: Color(0xffbdc3c7),
                  highlightColor: Color(0xffecf0f1),
                ),
                SizedBox(
                  width: 20,
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Shimmer.fromColors(
                        child: Container(
                          height: 16,
                          color: Color(0xffbdc3c7),
                        ),
                        baseColor: Color(0xffbdc3c7),
                        highlightColor: Color(0xffecf0f1),
                      ),
                      Shimmer.fromColors(
                        child: Container(
                          height: 12,
                          color: Color(0xffbdc3c7),
                        ),
                        baseColor: Color(0xffbdc3c7),
                        highlightColor: Color(0xffecf0f1),
                      ),
                    ],
                  ),
                )
              ],
            ),
          );
  }
}
