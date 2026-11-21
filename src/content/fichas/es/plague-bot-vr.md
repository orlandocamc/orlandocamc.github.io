---
# ES: revisar con Orlando
title: Plague-Bot VR
summary: Robot autónomo de invernadero para detectar plagas, con un enlace de teleoperación en realidad virtual.
lead: Robot autónomo de invernadero para detectar plagas, con un enlace de teleoperación en realidad virtual. Lo construyó JADA Robotics, un equipo de tres.
order: 1
featured: true
org: JADA Robotics
period: Dic 2025 – Jun 2026
role: Capitán y líder técnico del equipo
team:
  - name: Orlando Camacho
    orlando: true
    credit: Capitán y líder técnico. Navegación autónoma, pipeline de teleoperación, HUD de realidad virtual, chasis del robot, planeación de movimiento del brazo en simulación e integración del sistema.
  - name: Adán López
    credit: PROTÓN, el brazo de 6 GDL — electrónica, diseño y todo lo demás del brazo.
  - name: Eliot Calderón
    credit: Detección de plagas con IA y su dataset.
    stack: YOLOv8 · Raspberry Pi 5 + Hailo · ModelArts / MindSpore
  - name: Joel Arango
    advisor: true
    credit: Asesor.
teamNote: Los tres validamos el robot en el invernadero de Oaxaca, lo presentamos en la final de Shenzhen y somos coautores del artículo de COMRob 2026.
recognitions:
  - title: First Prize
    event: Huawei ICT Competition 2025–2026 · Final global (Shenzhen)
    note: Lo presentaron Orlando Camacho, Adán López y Eliot Calderón.
  - title: Global Award Winner
    event: Intel AI Global Impact Festival 2026
publication:
  title: Edge-AI and 6-DOF Robotic Manipulator for Greenhouse Crop Monitoring
  venue: COMRob 2026
  status: Aceptado
  number: "94"
  short: COMRob 2026, aceptado · coautor
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
    short: Validado en un invernadero comercial, Oaxaca
    context: Invernadero comercial en Oaxaca donde se validó el robot, en campo con Adán López y Eliot Calderón.
  - value: 40–60
    unit: ms
    short: Latencia de teleoperación, medida sobre 4G
    context: Latencia de teleoperación, medida sobre una conexión 4G.
  - value: "18"
    unit: FPS
    context: Video al visor sobre 4G, en campo en Oaxaca.
built:
  - title: Navegación autónoma
    data: ROS 2 · Nav2 · SLAM · Gazebo
  - title: Pipeline de teleoperación
    data: WebRTC sobre Tailscale
    detail: 40–60 ms de latencia y 18 FPS de video al visor, medidos sobre 4G.
  - title: HUD de realidad virtual
    data: Unity · Meta Quest 3
  - title: Chasis del robot
    detail: La base móvil.
  - title: Integración del sistema
    detail: Integré casi todos los subsistemas en el robot funcional.
  - title: Simulación y planeación de movimiento del brazo
    data: MoveIt 2 · RViz · Gazebo
    detail: El brazo físico PROTÓN es trabajo de Adán López.
stack:
  - { label: Middleware del robot, value: ROS 2 Jazzy }
  - { label: Navegación, value: Nav2 · SLAM }
  - { label: Simulación, value: Gazebo · MoveIt 2 }
  - { label: Transporte de teleoperación, value: WebRTC sobre Tailscale }
  - { label: Latencia medida, value: 40–60 ms · 4G }
  - { label: Video al visor, value: 18 FPS · 4G }
  - { label: Cliente de RV, value: Unity · Meta Quest 3 }
  - { label: Percepción (Eliot Calderón), value: YOLOv8 · Raspberry Pi 5 + Hailo · ModelArts / MindSpore }
  - { label: Manipulador (Adán López), value: PROTÓN · 6 GDL }
links:
  - { label: Repositorio público de presentación, url: "https://github.com/orlandocamc/plague-bot-vr-showcase" }
media:
  cover: { src: work-plaguebot-greenhouse.webp, width: 960, height: 540, alt: "" }
  chapters:
    - id: teleop
      after: head
      layout: full
      title: Toma el control desde cualquier lugar
      body: "La vista del operador: un HUD en Unity para Meta Quest 3, alimentado por un pipeline WebRTC sobre Tailscale. Medido sobre 4G: **40–60 ms** de latencia y **18 FPS** de video al visor."
      caption: HUD de teleoperación · grabación de pantalla del Meta Quest 3
      credit: Orlando Camacho
      video: { src: chapter-teleop-hud, width: 816, height: 464, label: "Vista del operador dentro del visor de RV: el HUD de teleoperación con la imagen de detección de plagas, la vista superior del LiDAR y el estado del nodo de borde." }
    - id: nav
      after: results
      layout: split-rev
      costmap: true
      title: Encuentra su camino
      body: Nav2 planea una ruta por los pasillos del invernadero sobre un mapa SLAM e infla un margen de seguridad alrededor de las plantas. El robot sigue la ruta por sí solo.
      caption: "Navegación autónoma — costmap de Nav2 en el mapa del invernadero, invertido y en esmeralda"
      credit: Orlando Camacho
      video: { src: chapter-nav-costmap, width: 630, height: 464, label: "Vista superior del costmap de Nav2 de los pasillos del invernadero: el robot sigue la ruta planeada a lo largo de un pasillo." }
    - id: proton
      after: built
      layout: split
      alt: true
      title: PROTÓN
      body: El brazo de 6 GDL de Plague-Bot VR, diseñado y construido por Adán López, electrónica incluida.
      caption: Brazo PROTÓN de 6 GDL — Adán López
      credit: Adán López
      video: { src: chapter-proton-arm, width: 480, height: 848, label: "El brazo PROTÓN en una mesa de laboratorio, flexionando y girando la muñeca." }
  figures:
    - section: built
      wide: true
      caption: Diseño del chasis del robot
      credit: Orlando Camacho
      images:
        - { src: fig-chassis-build.webp, width: 720, height: 540, alt: "El chasis de perfil de aluminio con cuatro ruedas y tres baterías, sobre un piso de madera." }
        - { src: fig-chassis-rviz.webp, width: 720, height: 540, alt: "El mismo chasis como modelo 3D en RViz, con sus marcos de referencia." }
    - section: built
      caption: Planeación de movimiento del brazo en simulación (MoveIt 2 · Gazebo)
      credit: Orlando Camacho
      video: { src: fig-arm-sim, width: 480, height: 630, label: "Un brazo de 6 ejes blanco y negro en Gazebo, moviéndose de un lado a otro con trayectorias planeadas." }
    - section: credits
      caption: Detección de plagas con IA
      credit: Eliot Calderón
      video: { src: fig-pest-detection, width: 640, height: 480, label: "Plantas de tomate en un invernadero con los recuadros etiquetados del detector alrededor de frutos maduros, verdes y enfermos." }
evidence:
  - report: plague-bot-vr
  - report: plague-bot-vr-hud
---

<!-- ES: revisar con Orlando -->

Plague-Bot VR recorre un invernadero por sí solo, detecta plagas con IA, lleva un brazo de 6 GDL y permite que un operador remoto tome el control con un visor de realidad virtual.

Fui capitán del equipo y dirigí el trabajo técnico: la navegación autónoma, el pipeline de teleoperación, el HUD de realidad virtual, el chasis del robot y la integración de los subsistemas en el robot funcional. También simulé el brazo y planeé su movimiento en MoveIt 2 y Gazebo. El brazo físico y la detección con IA los construyeron mis compañeros; la sección de créditos dice quién hizo qué.
