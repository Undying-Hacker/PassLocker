import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ShiningDot extends AnimatedWidget {
  final double size;
  final Color color;
  ShiningDot(
      {Key key, @required this.size, @required this.color, @required Animation<double> animation})
      : super(key: key, listenable: animation);
  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Container(
      height: size,
      width: size,
      decoration: BoxDecoration(
          gradient: RadialGradient(
              colors: [color, Colors.transparent],
              stops: [animation.value, 1]),
          borderRadius: BorderRadius.circular(size / 2)),
    );
  }
}
