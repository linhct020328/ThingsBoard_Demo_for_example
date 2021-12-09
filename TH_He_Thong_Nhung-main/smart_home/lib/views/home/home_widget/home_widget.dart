import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:loading/indicator/ball_pulse_indicator.dart';
import 'package:loading/loading.dart';
import 'package:smarthome/bloc/update_data_bloc/bloc.dart';
import 'package:smarthome/bloc/vosk_bloc/vosk_bloc.dart';
import 'package:smarthome/get_it.dart';
import 'package:smarthome/views/home/bloc/control_device_bloc.dart';
import 'package:smarthome/views/home/widgets/button_group_widget.dart';
import 'package:smarthome/views/home/widgets/settings_dialog.dart';
import 'package:smarthome/views/home/widgets/voice_state_widget.dart';
import 'package:smarthome/views/widgets/widgets/exit_dialog.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class HomeWidget extends StatelessWidget {
  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () => showDialog<bool>(
        context: context,
        builder: (c) => ExitAlertDialog(),
      ),
      child: Scaffold(key: scaffoldKey, body: _bodyWidget(context)),
    );
  }

  Widget _bodyWidget(BuildContext context) {
    final sc = MediaQuery.of(context).size;

    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          stops: [0.1, 0.3, 0.5, 0.8],
          colors: <Color>[
            Color(0xFF560027),
            Color(0xFF880e4f),
            Color(0xFF534bae),
            Color(0xFF000051),
          ],
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Stack(
            children: [
              Align(
                  alignment: Alignment.topRight,
                  child: IconButton(
                    icon: Icon(
                      Icons.exit_to_app,
                      size: 36,
                      color: Colors.white,
                    ),
                    onPressed: () {
                      showDialog(
                          context: context, builder: (c) => ExitAlertDialog());
                    },
                  )),
              Align(
                alignment: Alignment.topLeft,
                child: IconButton(
                  icon: Icon(
                    Icons.settings,
                    size: 36,
                    color: Colors.white,
                  ),
                  onPressed: () => _settings(context),
                ),
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  SizedBox(
                      height: sc.height / 2, child: MyPhoneListenerWidget()),
                  SizedBox(
                      height: 250.h,
                      child: ButtonGroupWidget()),
                  SizedBox(
                    height: 52.h,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _settings(
    BuildContext context,
  ) {
    showDialog(
        context: context,
        builder: (context) =>
            BlocBuilder<VoskBloc, VoskState>(builder: (context, state) {
              if (state is VoskInited) {
                return SettingsDialog(true);
              } else if (state is VoskStopped) {
                return SettingsDialog(false);
              } else if (state is VoskError) {
                return SettingsDialog(null);
              }

              return Loading(
                  indicator: BallPulseIndicator(),
                  size: ScreenUtil().setWidth(50),
                  color: Colors.blue);
            }));
  }
}
