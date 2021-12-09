part of 'login_bloc.dart';

abstract class LoginEvent extends Equatable {
  const LoginEvent();
}

class LoginOnPressed extends LoginEvent {
  final Account account;

  LoginOnPressed(this.account);

  @override
  // TODO: implement props
  List<Object> get props => [account];
}
