import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:smarthome/model/acccount.dart';
import 'package:smarthome/views/router/route_name.dart';
import 'package:smarthome/views/widgets/dialogs/alert_dialog.dart';
import 'package:smarthome/views/widgets/dialogs/loading_dialog.dart';

import 'bloc/login_bloc.dart';

class LoginPage extends StatefulWidget {
  @override
  _InputIPPageState createState() => _InputIPPageState();
}

class _InputIPPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _userControl = TextEditingController();
  final _passwordControl = TextEditingController();

  @override
  void dispose() {
    _userControl.dispose();
    _passwordControl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: BlocListener<LoginBloc, LoginState>(
        listener: (context, state) {
          if (state is LoadingState) {
            LoadingDialog.show(
              context,
            );
          }
          if (state is LoginSuccessState) {
            Timer(Duration(milliseconds: 1500), () {
              Navigator.pushReplacementNamed(context, RouteName.home);
            });
          }
          if (state is LoginFailureState) {
            AppAlertDialog.showAlert(context, 'Notification',
                'Error! An error occurred. Please try again later');
          }
        },
        child: _buildBody(),
      )),
    );
  }

  Widget _buildBody() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Center(
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextFormField(
                controller: _userControl,
                keyboardType: TextInputType.text,
                validator: (value) {
//                  if (!value.contains(RegExp(
//                      r'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'))) {
//                    return 'Invalid';
//                  }
                  if (value == null) {
                    return 'Invalid';
                  }
                  return null;
                },
                decoration: InputDecoration(
                    prefixIcon: Icon(Icons.email),
                    hintText: 'Email',
                    hintStyle: TextStyle(color: Colors.grey)),
              ),
              TextFormField(
                controller: _passwordControl,
                keyboardType: TextInputType.text,
                obscureText: true,
                validator: (value) {
//                  if (!value.contains(RegExp(
//                      r'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'))) {
//                    return 'Invalid';
//                  }
                  if (value == null) {
                    return 'Invalid';
                  }
                  return null;
                },
                decoration: InputDecoration(
                    prefixIcon: Icon(Icons.lock),
                    hintText: 'Password',
                    hintStyle: TextStyle(color: Colors.grey)),
              ),
              SizedBox(
                height: 16,
              ),
              RaisedButton(
                color: Colors.blueAccent,
                onPressed: _buttonOnPressed,
                child: Text(
                  'Login',
                  style: TextStyle(color: Colors.white),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  void _buttonOnPressed() {
    if (_formKey.currentState.validate()) {
      BlocProvider.of<LoginBloc>(context).add(LoginOnPressed(
          Account(_userControl.text.trim(), _passwordControl.text.trim())));
    }
  }
}
