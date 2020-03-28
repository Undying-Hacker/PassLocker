import 'package:get_it/get_it.dart';
import 'package:nbnews/core/Services/api.dart';
import 'package:nbnews/core/Services/auth.dart';
import 'package:nbnews/core/Services/settings.dart';
import 'package:nbnews/core/Services/storage.dart';
import 'package:nbnews/core/ViewModels/HomeModel.dart';
import 'package:nbnews/core/ViewModels/SearchModel.dart';

GetIt locator = GetIt.I;

Future<void> setUpLocator() async {
  final LocalStorage storage = await LocalStorage.getInstance();
  locator.registerSingleton<LocalStorage>(storage);
  locator.registerLazySingleton(() => AppSettings());
  locator.registerLazySingleton(() => Api());
  locator.registerLazySingleton(() => Auth());
  locator.registerFactory(() => HomeModel());
  locator.registerFactory(() => SearchModel());
}
