class Setting {
  double fontRate;
  String region;
  bool isVip;
  Setting(this.fontRate, this.region, this.isVip);
  Setting.fromJson(Map<String, dynamic> json) {
    fontRate = json["fontRate"];
    region = json["region"];
    isVip = json["vip"];
  }
  Map<String, dynamic> toJson() {
    final data = Map<String, dynamic>();
    data["fontRate"] = fontRate;
    data["region"] = region;
    data["vip"] = isVip;
    return data;
  }
  static Setting getDefaultConfig() {
    return Setting(1.0, 'us', false);
  } 
}
