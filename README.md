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
sudo apt-get install ros-kinetic-web-video-server
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

## Execution
```bash
roslaunch tr1_control_center tr1_control_center.launch
```
