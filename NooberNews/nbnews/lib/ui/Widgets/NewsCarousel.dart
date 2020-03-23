import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/Article.dart';
import 'package:nbnews/ui/Widgets/NewsCard.dart';
import 'package:shimmer/shimmer.dart';

class NewsCarousel extends StatelessWidget {
  final List<Article> articles;
  const NewsCarousel({Key key, this.articles}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return articles != null
        ? CarouselSlider(
            height: (MediaQuery.of(context).size.width - 100) / 16 * 9 + 50,
            enlargeCenterPage: true,
            items: List<GestureDetector>.generate(20, (index) {
              var article = articles[index];
              var heroTag = article.imageUrl != null
                  ? "NC${article.imageUrl}"
                  : "NC${article.title}";
              return GestureDetector(
                onTap: () => Navigator.of(context).pushNamed('/article',
                    arguments: {"heroTag": heroTag, "article": article}),
                child: NewsCard(
                  src: article.imageUrl,
                  tag: heroTag,
                  title: article.title,
                ),
              );
            }),
          )
        : CarouselSlider(
            height: (MediaQuery.of(context).size.width - 100) / 16 * 9 + 50,
            items: List<Widget>.generate(3, (_) {
              return SizedBox(
                child: Shimmer.fromColors(
                  child: Container(
                    decoration: BoxDecoration(
                      color: Color(0xffbdc3c7),
                      borderRadius: BorderRadius.circular(25),
                    ),
                    width: MediaQuery.of(context).size.width - 100,
                    height: (MediaQuery.of(context).size.width - 100) / 16 * 9,
                  ),
                  baseColor: Color(0xffbdc3c7),
                  highlightColor: Color(0xffecf0f1),
                ),
              );
            }),
          );
  }
}
