import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/Article.dart';
import 'package:shimmer/shimmer.dart';
import 'package:transparent_image/transparent_image.dart';

class HeadlineCard extends StatelessWidget {
  final Article article;
  const HeadlineCard({Key key, this.article}) : super(key: key);
  String fromNow(String time) {
    DateTime parsedTime = DateTime.parse(time);
    Duration difference = DateTime.now().difference(parsedTime);
    if (difference.inDays > 0) {
      int days = difference.inDays;
      if (days > 365) {
        int year = days ~/ 365;
        return "$year year${year > 1 ? "s" : ""} ago";
      } else if (days >= 30) {
        int month = days ~/ 30;
        return "$month month${month > 1 ? "s" : ""} ago";
      } else if (days >= 7) {
        int week = days ~/ 7;
        return "$week week${week > 1 ? "s" : ""} ago";
      }
      return "${difference.inDays} day${difference.inDays > 1 ? "s" : ""} ago";
    } else if (difference.inHours > 0) {
      return "${difference.inHours} hour${difference.inHours > 1 ? "s" : ""} ago";
    } else if (difference.inMinutes > 0) {
      return "${difference.inMinutes} minute${difference.inMinutes > 1 ? "s" : ""} ago";
    } else {
      return "${difference.inSeconds} second${difference.inSeconds > 1 ? "s" : ""} ago";
    }
  }

  @override
  Widget build(BuildContext context) {
    final String heroTag = article != null
        ? article.imageUrl != null
            ? "HC${article.imageUrl}"
            : "HC${article.content}"
        : null;
    return article != null
        ? GestureDetector(
          behavior: HitTestBehavior.translucent,
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
                          article.title,
                          maxLines: 3,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                              fontFamily: "Roboto",
                              fontSize: 16,
                              fontWeight: FontWeight.bold),
                        ),
                        Text(
                          fromNow(article.published),
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
