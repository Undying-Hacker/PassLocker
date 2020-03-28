import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/Source.dart';

class SourceCard extends StatelessWidget {
  final double width;
  final double height;
  final Source source;
  const SourceCard({Key key, this.width, this.height, this.source})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero),
        elevation: 3,
        color: Colors.white,
        child: ListTile(
          contentPadding: EdgeInsets.all(20),
          title: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text(
                source.name,
                style: TextStyle(fontWeight: FontWeight.w600),
              ),
              MaterialButton(
                  color: Colors.blue,
                  onPressed: () {},
                  child: Text(
                    "Follow",
                    style: TextStyle(color: Colors.white),
                  )),
            ],
          ),
          subtitle: Text(source.description),
        ),
      ),
    );
  }
}
