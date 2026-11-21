---
title: Odometry + EKF
summary: Odometry and an extended Kalman filter (EKF), in simulation. A solo project for the PMED course at IBERO.
lead: Odometry and an extended Kalman filter (EKF), in simulation. A solo project for the course Programming of Differential-Equation Models (PMED) at IBERO.
order: 5
org: PMED · IBERO
period: Fall 2025
role: Solo project
team:
  - name: Orlando Camacho
    orlando: true
    credit: Solo project, in simulation.
built:
  - title: Odometry and EKF, in simulation
stack:
  - { label: Course, value: Programming of Differential-Equation Models (PMED), IBERO }
  - { label: Environment, value: Simulation }
media:
  figures:
    - section: built
      wide: true
      caption: "Euler vs RK4 trajectory on a constant arc, and noisy odometry on a 4 × 4 m square. Simulation · generated from the report’s equations"
      credit: Orlando Camacho
      images:
        - { src: fig-trajectory-euler-rk4.webp, width: 759, height: 757, alt: "Plot of a circular trajectory of 1 m radius: the analytic circle, the RK4 path on top of it and the Euler path drifting slightly outwards." }
        - { src: fig-odometry-noisy-square.webp, width: 784, height: 788, alt: "Plot of a 4 by 4 metre square ground-truth path and five noisy odometry paths that drift away from it." }
---

A solo project for the course Programming of Differential-Equation Models (PMED) at IBERO, done entirely in simulation.
