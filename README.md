## Introduction
This package is a work in process! We're tyring to make a great interface for controlling the TR1 over the browser!

## Installation
Install node.js
```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install web_video_server
```bash
cd ~/ros_ws/src
git clone https://github.com/GT-RAIL/async_web_server_cpp
git clone https://github.com/RobotWebTools/web_video_server
cd ..
catkin_make
source devel/setup.bash
```

Installing tr1_control_center
```bash
cd ~/ros_ws/src/
git clone https://github.com/slaterobotics/tr1_control_center
cd tr1_control_center/
npm i
cd ~/ros_ws/
catkin_make
source devel/setup.bash
```

## Execution (run each line in seperate windows/tabs)
```bash
roslaunch tr1_hardware_interface tr1_effort_controllers
roslaunch astra_launch astra.launch
rosrun web_video_server web_video_server _port:=8081
rosrun tr1_control_center tr1_control_center.js
```
