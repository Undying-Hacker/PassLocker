import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/Source.dart';
import 'package:nbnews/core/Services/api.dart';
import 'package:nbnews/locator.dart';
import 'package:nbnews/ui/Widgets/SourceCard.dart';

class SourcesSetting extends StatelessWidget {
  const SourcesSetting({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.of(context).pop(),
          icon: Icon(Icons.arrow_back_ios),
        ),
        centerTitle: true,
        title: Text("News Sources"),
        backgroundColor: Colors.black,
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: FutureBuilder(
              future: locator<Api>().getSources(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  if (snapshot.data != null) {
                    return ListView.builder(
                      physics: BouncingScrollPhysics(),
                      padding: EdgeInsets.all(20),
                      itemCount: snapshot.data.length,
                      itemBuilder: (context, index) {
                      Source src = snapshot.data[index];
                      return SourceCard(
                        width: 200,
                        height: 250,
                        source: src,
                      );
                    });
                  }
                }
                return Center(child: CircularProgressIndicator());
              },
            ),
          )
        ],
      ),
    );
  }
}
