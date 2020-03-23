import 'package:flutter/widgets.dart';
import 'package:nbnews/core/enums/ViewState.dart';

class BaseModel extends ChangeNotifier {
  ViewState _state = ViewState.Idle;
  ViewState get state => _state;
  void setState (ViewState state) {
    _state = state;
    notifyListeners();
  }
}