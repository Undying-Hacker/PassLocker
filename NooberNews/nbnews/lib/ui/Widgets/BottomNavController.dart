import 'package:flutter/material.dart';
import 'package:nbnews/ui/Views/BookmarkView.dart';
import 'package:nbnews/ui/Views/HomeView.dart';
import 'package:nbnews/ui/Views/NotificationView.dart';
import 'package:nbnews/ui/Views/UserView.dart';

class BottomNavController extends StatefulWidget {
  @override
  _BottomNavControllerState createState() => _BottomNavControllerState();
}

class _BottomNavControllerState extends State<BottomNavController> {
  List<Widget> pages;
  final PageController _pageController = PageController();
  int _tabIndex = 0;
  void _onItemTapped(int index) {
    _pageController.jumpToPage(index);
  }

  void _onPageChanged(int index) {
    setState(() {
      _tabIndex = index;
    });
  }

  @override
  void initState() {
    super.initState();
    pages = [
      HomeView(),
      NotificationView(),
      BookmarkView(),
      UserView(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: PageView(
        children: pages,
        onPageChanged: _onPageChanged,
        controller: _pageController,
        physics: NeverScrollableScrollPhysics(),
      ),
      bottomNavigationBar: Theme(
        data: Theme.of(context).copyWith(canvasColor: Colors.black),
        child: BottomNavigationBar(
          backgroundColor: Colors.blueAccent,
          currentIndex: _tabIndex,
          unselectedItemColor: Color(0xff8C8C8C),
          selectedItemColor: Theme.of(context).primaryColor,
          onTap: _onItemTapped,
          items: <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              title: Text("Home"),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.notifications),
              title: Text("Notifications"),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.bookmark),
              title: Text("Bookmarks"),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              title: Text("User"),
            ),
          ],
        ),
      ),
    );
  }
}
