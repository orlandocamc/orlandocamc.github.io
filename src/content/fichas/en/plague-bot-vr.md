---
title: Plague-Bot VR
summary: Autonomous greenhouse robot for pest detection, with a VR teleoperation link.
lead: Autonomous greenhouse robot for pest detection, with a VR teleoperation link. Built by JADA Robotics, a team of three.
order: 1
featured: true
org: JADA Robotics
period: Dec 2025 – Jun 2026
role: Team captain & technical lead
team:
  - name: Orlando Camacho
    orlando: true
    credit: Captain and technical lead. Autonomous navigation, teleoperation pipeline, VR HUD, robot chassis, arm motion planning in simulation, system integration.
  - name: Adán López
    credit: PROTÓN, the 6-DOF arm — electronics, design and the rest of the arm.
  - name: Eliot Calderón
    credit: AI pest detection and its dataset.
    stack: YOLOv8 · Raspberry Pi 5 + Hailo · ModelArts / MindSpore
  - name: Joel Arango
    advisor: true
    credit: Advisor.
teamNote: Together, the three of us validated the robot in the Oaxaca greenhouse, presented it at the Shenzhen final, and co-authored the COMRob 2026 paper.
recognitions:
  - title: First Prize
    event: Huawei ICT Competition 2025–2026 · Global Final (Shenzhen)
    note: Presented by Orlando Camacho, Adán López and Eliot Calderón.
  - title: Global Award Winner
    event: Intel AI Global Impact Festival 2026
    note: "[announcement — link to confirm]"
publication:
  title: Edge-AI and 6-DOF Robotic Manipulator for Greenhouse Crop Monitoring
  venue: COMRob 2026
  status: Accepted
  number: "94"
  short: COMRob 2026, accepted · co-author
  authors:
    - Adán López
    - Eliot Calderón
    - Orlando Camacho
    - Huber Girón Nieto
    - Guillermo Gómez Abascal
    - Antonio Carlos Cardeña Matamoros
    - Joel Arango Ramírez
results:
  - value: "20"
    unit: ha
    short: Validated in a commercial greenhouse, Oaxaca
    context: Commercial greenhouse in Oaxaca where the robot was validated, in the field with Adán López and Eliot Calderón.
  - value: 40–60
    unit: ms
    short: Teleoperation latency, measured over 4G
    context: Teleoperation latency, measured over a 4G connection.
  - value: "18"
    unit: FPS
    context: Video to the headset over 4G, in the field in Oaxaca.
built:
  - title: Autonomous navigation
    data: ROS 2 · Nav2 · SLAM · Gazebo
  - title: Teleoperation pipeline
    data: WebRTC over Tailscale
    detail: 40–60 ms latency and 18 FPS video to the headset, measured over 4G.
  - title: VR HUD
    data: Unity · Meta Quest 3
  - title: Robot chassis
    detail: "The mobile base. [details — to confirm]"
  - title: System integration
    detail: Brought nearly all subsystems together into the working robot.
  - title: Arm simulation and motion planning
    data: MoveIt 2 · RViz · Gazebo
    detail: The physical PROTÓN arm is Adán López’s work.
stack:
  - { label: Robot middleware, value: ROS 2 Jazzy }
  - { label: Navigation, value: Nav2 · SLAM }
  - { label: Simulation, value: Gazebo · MoveIt 2 }
  - { label: Teleoperation transport, value: WebRTC over Tailscale }
  - { label: Measured latency, value: 40–60 ms · 4G }
  - { label: Video to the headset, value: 18 FPS · 4G }
  - { label: VR client, value: Unity · Meta Quest 3 }
  - { label: Perception (Eliot Calderón), value: YOLOv8 · Raspberry Pi 5 + Hailo · ModelArts / MindSpore }
  - { label: Manipulator (Adán López), value: PROTÓN · 6 DOF }
links:
  - { label: Public showcase repository, url: "https://github.com/orlandocamc/plague-bot-vr-showcase" }
media:
  cover: { src: work-plaguebot-greenhouse.webp, width: 960, height: 540, alt: "" }
  chapters:
    - id: teleop
      after: head
      layout: full
      title: Step in from anywhere
      body: "The operator’s view: a Unity HUD on Meta Quest 3, fed by a WebRTC pipeline over Tailscale. Measured over 4G: **40–60 ms** of latency and **18 FPS** of video to the headset."
      caption: Teleoperation HUD · Meta Quest 3 screen recording
      credit: Orlando Camacho
      video: { src: chapter-teleop-hud, width: 816, height: 464, label: "Operator view inside the VR headset: the teleoperation HUD with the pest-detection feed, LiDAR top view and edge-node status." }
    - id: nav
      after: results
      layout: split-rev
      costmap: true
      title: It finds its own way
      body: Nav2 plans a path along the greenhouse rows on a SLAM map and inflates a safety margin around the plants. The robot follows the path on its own.
      caption: "Autonomous navigation — Nav2 costmap in the greenhouse map, shown inverted, in emerald [simulation recording — date to confirm]"
      credit: Orlando Camacho
      video: { src: chapter-nav-costmap, width: 630, height: 464, label: "Top view of the Nav2 costmap of the greenhouse rows: the robot follows its planned path along a row." }
    - id: proton
      after: built
      layout: split
      alt: true
      title: PROTÓN
      body: The 6-DOF arm on Plague-Bot VR, designed and built by Adán López, electronics included.
      caption: PROTÓN 6-DOF arm — Adán López
      credit: Adán López
      video: { src: chapter-proton-arm, width: 480, height: 848, label: "The PROTÓN arm on a lab bench, bending and turning its wrist." }
  figures:
    - section: built
      wide: true
      caption: Robot chassis design
      credit: Orlando Camacho
      images:
        - { src: fig-chassis-build.webp, width: 720, height: 540, alt: "The aluminium-profile chassis with four wheels and three batteries, on a wooden floor." }
        - { src: fig-chassis-rviz.webp, width: 720, height: 540, alt: "The same chassis as a 3D model in RViz, with its link frames." }
    - section: built
      caption: Arm motion planning in simulation (MoveIt 2 · Gazebo)
      credit: Orlando Camacho
      video: { src: fig-arm-sim, width: 480, height: 630, label: "A white and black 6-axis arm in Gazebo sweeping left and right under planned trajectories." }
    - section: credits
      caption: AI pest detection
      credit: Eliot Calderón
      video: { src: fig-pest-detection, width: 640, height: 480, label: "Tomato plants in a greenhouse with the detector’s labelled boxes around ripe, unripe and diseased fruit." }
evidence:
  - report: plague-bot-vr
---

Plague-Bot VR navigates a greenhouse on its own, detects pests with AI, carries a 6-DOF arm, and lets a remote operator take over through a VR headset.

I captained the team and led the technical work: autonomous navigation, the teleoperation pipeline, the VR HUD, the robot chassis, and the integration of the subsystems into the working robot. I also simulated the arm and planned its motion in MoveIt 2 and Gazebo. The physical arm and the AI detection were built by my teammates; the credit section below says who did what.
