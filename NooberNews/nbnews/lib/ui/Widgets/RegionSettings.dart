import 'package:flutter/material.dart';
import 'package:nbnews/core/Models/Regions.dart';
import 'package:nbnews/core/Services/settings.dart';
import 'package:nbnews/locator.dart';

class RegionSetting extends StatefulWidget {
  RegionSetting({Key key}) : super(key: key);

  @override
  _RegionSettingState createState() => _RegionSettingState();
}

class _RegionSettingState extends State<RegionSetting> {
  int selectedIndex;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.of(context).pop(),
          icon: Icon(Icons.arrow_back_ios),
        ),
        centerTitle: true,
        title: Text("Region"),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          children: <Widget>[
            Text(
              "*Selecting regions may change the language of articles",
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.redAccent, fontSize: 18),
            ),
            SizedBox(
              height: 20,
            ),
            Expanded(
              child: ListView.builder(
                  physics: BouncingScrollPhysics(),
                  itemCount: Region.countries.length,
                  itemBuilder: _listItemTile),
            ),
          ],
        ),
      ),
    );
  }

  Widget _listItemTile(BuildContext context, int index) {
    final country = Region.countries[index];
    bool selected = country ==
        Region.getCountryfromCode(locator<AppSettings>().settings.region);
    return ListTile(
      onTap: () {
        locator<AppSettings>().setRegion(Region.getCountryCode(country));
        setState(() {});
      },
      contentPadding: EdgeInsets.zero,
      title: Text(country),
      selected: selected,
      trailing: selected
          ? Icon(
              Icons.check,
              color: Colors.green,
            )
          : SizedBox(),
    );
  }
}
