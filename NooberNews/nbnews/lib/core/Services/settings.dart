import 'package:flutter/cupertino.dart';
import 'package:nbnews/core/Models/Settings.dart';
import 'package:nbnews/core/Services/storage.dart';
import 'package:nbnews/locator.dart';

class AppSettings extends ChangeNotifier {
  Setting settings = locator<LocalStorage>().settings;
    double getActualFontRate(double rate) {
    return [0.75, 1.0, 1.25][rate.toInt()];
  }
  void setFontRate(double fontRate) {
    settings.fontRate = fontRate;
    notifyListeners();
    locator<LocalStorage>().settings = Setting(fontRate, settings.region, settings.isVip);
  }

  void setRegion(String region) {
    settings.region = region;
    notifyListeners();
    locator<LocalStorage>().settings = Setting(settings.fontRate, region, settings.isVip);
  }

  void setVip(bool value) {
    settings.isVip = value;
    notifyListeners();
    locator<LocalStorage>().settings = Setting(settings.fontRate, settings.region, value);
  }
}
