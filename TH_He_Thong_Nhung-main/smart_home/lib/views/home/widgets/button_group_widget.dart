import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/svg.dart';
import 'package:smarthome/model/remote_model.dart';
import 'package:smarthome/views/home/bloc/control_device_bloc.dart';
import 'package:smarthome/views/widgets/dialogs/alert_dialog.dart';

class ButtonGroupWidget extends StatefulWidget {
  @override
  _ButtonGroupWidgetState createState() => _ButtonGroupWidgetState();
}

class _ButtonGroupWidgetState extends State<ButtonGroupWidget> {
  bool _isOn = true;

  @override
  Widget build(BuildContext context) {
    final sc = MediaQuery.of(context).size;

    return BlocListener<ControlDeviceBloc, ControlDeviceState>(
      listener: (context, state) {
        if (state is SendFailure) {
          AppAlertDialog.showAlert(context, 'Notification',
              'Error! An error occurred. Please try again later');
        }
        if (state is SendSuccess) {
          setState(() {
            _isOn = !_isOn;
          });
        }
      },
      child: Center(
        child: GestureDetector(
          onTap: () {
            BlocProvider.of<ControlDeviceBloc>(context)
                .add(RemoteDeviceEvent(RemoteModel("Light", !_isOn)));
          },
          child: CircleAvatar(
            backgroundColor: _isOn ? Colors.yellow : Colors.grey,
            radius: 40,
            child: Icon(
              Icons.lightbulb_outline,
              size: 32,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buttonWidget(BuildContext context, String icon, Function callBack) {
    return IconButton(
        icon: SvgPicture.asset(
          icon,
//          color: Colors.blue,
        ),
        onPressed: callBack);
  }

  void _remoteRobot(BuildContext context, String message) {
//    BlocProvider.of<UpdateDataBloc>(context)
//        .add(RemoteDevice(message: Message(mess: message)));
  }
}
