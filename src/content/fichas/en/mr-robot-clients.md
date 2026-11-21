---
title: Mixed-reality robot clients
summary: Meta Quest apps that show a ROS 2 robot’s LiDAR, SLAM map and RGB-D point cloud in mixed reality.
lead: Meta Quest apps that show a ROS 2 robot’s LiDAR, SLAM map and RGB-D point cloud in mixed reality. A solo project.
order: 3
period: Jan – May 2026
role: Solo project
team:
  - name: Orlando Camacho
    orlando: true
    credit: Solo project. Built for Plague-Bot VR and for future teleoperation work.
built:
  - title: Mixed-reality clients for Meta Quest
    data: Unity · ROS-TCP-Connector · Meta XR SDK
    detail: The robot’s LiDAR, its SLAM map and the RGB-D point cloud of its depth camera, shown in the headset.
  - title: Delta protocol for the LiDAR map
    data: custom binary protocol over UDP
    detail: A receiver for a binary protocol of my own. Only the wall cells of the LiDAR map that changed travel, not the whole map.
stack:
  - { label: Engine, value: Unity }
  - { label: Headset, value: Meta Quest · Meta XR SDK }
  - { label: Robot link, value: ROS-TCP-Connector · custom binary protocol over UDP }
  - { label: Robot middleware, value: ROS 2 }
evidence:
  - report: rosmaster-lidar-vr
    note: The dates in this history are the day the repository was created, not when the work was done (January–May 2026).
  - report: rosmaster-camara3d-vr
    note: The dates in this history are the day the repository was created, not when the work was done (January–May 2026).
---

I built these clients for Plague-Bot VR and for future teleoperation work: they put what the robot senses around the operator, inside the headset.

No measured figures are published for these clients.
