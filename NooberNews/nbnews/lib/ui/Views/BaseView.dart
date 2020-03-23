import 'package:flutter/material.dart';
import 'package:nbnews/core/ViewModels/BaseModel.dart';
import 'package:nbnews/locator.dart';
import 'package:provider/provider.dart';

class BaseView<T extends BaseModel> extends StatefulWidget {
  final Widget Function(BuildContext context, T model, Widget child) builder;
  final Function(T) onModelReady;
  BaseView({Key key, this.builder, this.onModelReady}) : super(key: key);

  @override
  _BaseViewState<T> createState() => _BaseViewState<T>();
}

class _BaseViewState<T extends BaseModel> extends State<BaseView<T>> {
  T model;
  @override
  void initState() {
    super.initState();
    model = locator<T>();
    if (widget.onModelReady != null) widget.onModelReady(model);
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<T>(
      create: (_) => model,
      child: Consumer<T>(
        builder: widget.builder,
      ),
    );
  }
}
