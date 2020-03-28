class Source {
  final String name;
  final String description;
  final String url;
  final String category;
  final String language;
  Source({this.name, this.description, this.url, this.category, this.language});
  factory Source.fromJson(Map<String, dynamic> json) {
    return Source(
        name: json["name"],
        description: json["description"],
        url: json["url"],
        category: json["category"],
        language: json["language"]);
  }
}
