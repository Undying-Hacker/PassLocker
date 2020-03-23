class Article {
  String author;
  String title;
  String content;
  String imageUrl;
  String published;
  Article.fromJson(Map<String, dynamic> json) {
    author = json["author"];
    title = json["title"];
    content = json["description"];
    imageUrl = json["urlToImage"];
    published = json["publishedAt"];
  }
}
