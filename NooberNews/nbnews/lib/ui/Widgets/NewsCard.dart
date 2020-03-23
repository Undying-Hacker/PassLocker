import 'package:flutter/material.dart';
import 'package:transparent_image/transparent_image.dart';

class NewsCard extends StatelessWidget {
  final String src;
  final String title;
  final String tag;
  const NewsCard({Key key, this.src, this.title, this.tag}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width - 100,
      height: (MediaQuery.of(context).size.width - 100) / 16 * 9,
      child: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          Hero(
            tag: tag,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(25),
              child: src != null
                  ? FadeInImage.memoryNetwork(
                      fit: BoxFit.cover,
                      fadeInDuration: Duration(milliseconds: 250),
                      fadeInCurve: Curves.easeIn,
                      placeholder: kTransparentImage,
                      image: src)
                  : Image.asset(
                      "images/article_placeholder_image.png",
                      fit: BoxFit.cover,
                    ),
            ),
          ),
          Container(
            decoration: BoxDecoration(
              color: Colors.black26,
              borderRadius: BorderRadius.circular(25),
            ),
          ),
          Positioned(
            width: MediaQuery.of(context).size.width - 100 - 40,
            bottom: 20,
            left: 20,
            child: Text(
              title,
              style: TextStyle(
                fontFamily: "PTSerif",
                fontSize: 18,
                color: Colors.white,
              ),
            ),
          )
        ],
      ),
    );
  }
}
