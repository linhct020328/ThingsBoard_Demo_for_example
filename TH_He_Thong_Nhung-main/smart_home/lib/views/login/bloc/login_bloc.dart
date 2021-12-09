import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:smarthome/model/acccount.dart';
import 'package:smarthome/provider/local/local_provider.dart';
import 'package:smarthome/repositories/authentication_repo.dart';

part 'login_event.dart';

part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  LoginBloc(this.authenticationRepo, this.localProvider);

  final AuthenticationRepo authenticationRepo;
  final LocalProvider localProvider;

  @override
  Stream<LoginState> mapEventToState(
    LoginEvent event,
  ) async* {
    if (event is LoginOnPressed) {
      yield* _mapLoginEventToState(event);
    }
  }

  @override
  // TODO: implement initialState
  LoginState get initialState => LoginInitial();

  Stream<LoginState> _mapLoginEventToState(LoginOnPressed event) async* {
    yield LoadingState();
    try {
      final token = await authenticationRepo.login(event.account);
      if (token != null) {
        final saveToken =
            await localProvider.saveData(LocalKeys.accessToken, token.token);
        final saveRToken = await localProvider.saveData(
            LocalKeys.refreshToken, token.refreshToken);
        yield LoginSuccessState(token.token);
      } else {
        yield LoginFailureState();
      }
    } catch (e) {
      debugPrint(e.toString());
      yield LoginFailureState();
    }
  }
}
