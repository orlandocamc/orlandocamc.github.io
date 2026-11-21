---
# ES: revisar con Orlando
title: Clientes de realidad mixta para robots
summary: Apps para Meta Quest que muestran en realidad mixta el LiDAR, el mapa SLAM y la nube de puntos RGB-D de un robot con ROS 2.
lead: Apps para Meta Quest que muestran en realidad mixta el LiDAR, el mapa SLAM y la nube de puntos RGB-D de un robot con ROS 2. Proyecto individual.
order: 3
period: Ene – May 2026
role: Proyecto individual
team:
  - name: Orlando Camacho
    orlando: true
    credit: Proyecto individual. Hecho para Plague-Bot VR y para futuros desarrollos de teleoperación.
built:
  - title: Clientes de realidad mixta para Meta Quest
    data: Unity · ROS-TCP-Connector · Meta XR SDK
    detail: El LiDAR del robot, su mapa SLAM y la nube de puntos RGB-D de su cámara de profundidad, dentro del visor.
  - title: Protocolo delta para el mapa LiDAR
    data: protocolo binario propio sobre UDP
    detail: Un receptor para un protocolo binario propio. Solo viajan las celdas de pared del mapa LiDAR que cambiaron, no el mapa completo.
stack:
  - { label: Motor, value: Unity }
  - { label: Visor, value: Meta Quest · Meta XR SDK }
  - { label: Enlace con el robot, value: ROS-TCP-Connector · protocolo binario propio sobre UDP }
  - { label: Middleware del robot, value: ROS 2 }
evidence:
  - report: rosmaster-lidar-vr
    note: Las fechas de este historial son el día en que se creó el repositorio, no cuándo se hizo el trabajo (enero–mayo de 2026).
  - report: rosmaster-camara3d-vr
    note: Las fechas de este historial son el día en que se creó el repositorio, no cuándo se hizo el trabajo (enero–mayo de 2026).
---

<!-- ES: revisar con Orlando -->

Construí estos clientes para Plague-Bot VR y para futuros desarrollos de teleoperación: ponen alrededor del operador, dentro del visor, lo que el robot percibe.

No se publican cifras medidas de estos clientes.
