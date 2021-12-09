part of 'login_bloc.dart';

abstract class LoginState extends Equatable {
  const LoginState();
}

class LoginInitial extends LoginState {
  @override
  List<Object> get props => [];
}

class LoadingState extends LoginState {
  @override
  // TODO: implement props
  List<Object> get props => throw UnimplementedError();
}

class LoginSuccessState extends LoginState {
  final String token;

  LoginSuccessState(this.token);

  @override
  // TODO: implement props
  List<Object> get props => throw UnimplementedError();
}

class LoginFailureState extends LoginState {
  final String error;

  LoginFailureState({this.error});

  @override
  List<Object> get props => [error];

  @override
  String toString() => 'MQTT Failure { error: $error }';
}
