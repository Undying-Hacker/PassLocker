import 'package:flutter/material.dart';
import 'package:nbnews/core/Services/settings.dart';
import 'package:nbnews/locator.dart';

class FontSetting extends StatefulWidget {
  const FontSetting({Key key}) : super(key: key);

  @override
  _FontSettingState createState() => _FontSettingState();
}

class _FontSettingState extends State<FontSetting> {
  double fontRate = locator<AppSettings>().settings.fontRate;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.of(context).pop(),
          icon: Icon(Icons.arrow_back_ios),
        ),
        centerTitle: true,
        title: Text("Font Size"),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: EdgeInsets.all((20)),
        child: Column(
          children: <Widget>[
            Text(
              "Choose Your Preferred Font Size",
              style: TextStyle(
                fontSize: 18,
                color: Colors.redAccent,
              ),
            ),
            Slider(
              value: locator<AppSettings>().settings.fontRate,
              min: 0,
              max: 2,
              label: [
                "Small",
                "Medium",
                "Large"
              ][locator<AppSettings>().settings.fontRate.toInt()],
              divisions: 2,
              activeColor: Colors.black87,
              inactiveColor: Colors.black26,
              onChanged: (newValue) {
                locator<AppSettings>().setFontRate(newValue);
                setState(() {
                  fontRate = newValue;
                });
              },
            ),
            Text("<---- Article Preview ---->", style: TextStyle(fontSize: 18),),
            Expanded(
              child: Container(
                padding: EdgeInsets.all(20),
                child: SingleChildScrollView(
                  physics: BouncingScrollPhysics(),
                  child: Column(
                    children: <Widget>[
                      Column(
                        children: <Widget>[
                          Text(
                            "NooberNews becomes the number one news distributor online - NB News",
                            style: TextStyle(
                                fontFamily: "PTSerif",
                                fontSize: 24 *
                                    locator<AppSettings>()
                                        .getActualFontRate(fontRate),
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
                                  "Anonymous",
                                  style: TextStyle(
                                    fontFamily: "Roboto",
                                    fontSize: 14 *
                                        locator<AppSettings>()
                                            .getActualFontRate(fontRate),
                                    color: Theme.of(context).accentColor,
                                  ),
                                ),
                                Text(
                                  "now",
                                  style: TextStyle(
                                    fontFamily: "Roboto",
                                    fontSize: 14 *
                                        locator<AppSettings>()
                                            .getActualFontRate(fontRate),
                                    color: Theme.of(context).accentColor,
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
                        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
                        style: TextStyle(
                          fontFamily: "PTSerif",
                          fontSize: 20 *
                              locator<AppSettings>()
                                  .getActualFontRate(fontRate),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
