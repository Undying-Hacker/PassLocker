import 'package:get_it/get_it.dart';
import 'package:nbnews/core/Services/api.dart';
import 'package:nbnews/core/Services/auth.dart';
import 'package:nbnews/core/ViewModels/HomeModel.dart';
import 'package:nbnews/core/ViewModels/SearchModel.dart';

GetIt locator = GetIt.I;

void setUpLocator() {
  locator.registerLazySingleton(() => Api());
  locator.registerLazySingleton(() => Auth());
  locator.registerFactory(() => HomeModel());
  locator.registerFactory(() => SearchModel());
}