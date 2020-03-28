import 'dart:async';
import 'dart:convert';
import 'package:nbnews/core/Models/Settings.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  static SharedPreferences _preferences;
  static LocalStorage _instance;

  //Static keys
  static const String settingsKey = 'settings';

  static Future<LocalStorage> getInstance() async {
    if (_instance == null) {
      _instance = LocalStorage();
    }
    if (_preferences == null) {
      _preferences = await SharedPreferences.getInstance();
    }
    return _instance;
  }

  //Settings configuration
  Setting get settings {
    String data = _getFromDisk(settingsKey);
    if (data != null) {
      final decodedData = json.decode(_getFromDisk(settingsKey));
      return Setting.fromJson(decodedData);
    }
    else {
      return Setting.getDefaultConfig();
    }
  }

  set settings(Setting settings) {
    final String encodedData = json.encode(settings.toJson());
    _saveToDisk(settingsKey, encodedData);
  }

  dynamic _getFromDisk(String key) {
    var data = _preferences.get(key);
    return data;
  }

  //User total reads
  int get totalReads {
    return _getFromDisk('reads')?? 0;
  }
  
  set totalReads(int total) {
    _saveToDisk('reads', total);
  }

  void _saveToDisk<T>(String key, T content) {
    if (content is String) {
      _preferences.setString(key, content);
    } else if (content is bool) {
      _preferences.setBool(key, content);
    } else if (content is int) {
      _preferences.setInt(key, content);
    } else if (content is double) {
      _preferences.setDouble(key, content);
    } else if (content is List<String>) {
      _preferences.setStringList(key, content);
    }
  }
}
