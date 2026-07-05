const tubeVariation = document.getElementById('tubeVariation');
const curveGeometry = document.getElementById('curveGeometry');
const elevationFrame = document.getElementById('elevationFrame');
const combinationLabel = document.getElementById('combinationLabel');
const combinationText = document.getElementById('combinationText');

const curtainPosition = document.getElementById('curtainPosition');
const lightTemperature = document.getElementById('lightTemperature');
const userFrame = document.getElementById('userFrame');
const userLabel = document.getElementById('userLabel');
const userText = document.getElementById('userText');
const userKpis = document.getElementById('userKpis');
let lastUserControl = 'curtain';

/*
  HOW TO REPLACE THE 9 ARCHITECT PLACEHOLDERS WITH REAL IMAGES
  ------------------------------------------------------------
  1. Create a folder named "images" next to index.html.
  2. Save your 9 elevation images using this naming system:
     elevation_t-1_c1.png
     elevation_t-1_c2.png
     elevation_t-1_c3.png
     elevation_t0_c1.png
     elevation_t0_c2.png
     elevation_t0_c3.png
     elevation_t1_c1.png
     elevation_t1_c2.png
     elevation_t1_c3.png
  3. In updateElevation(), replace:
       elevationFrame.innerHTML = makePlaceholder(tube, curve);
     with:
       elevationFrame.innerHTML = `<img src="images/elevation_t${tube}_c${curve}.png" alt="Elevation configuration: tube variation ${tube}, curve geometry ${curve}">`;
*/

/*
  HOW TO REPLACE THE 6 USER PLACEHOLDERS WITH REAL IMAGES
  -------------------------------------------------------
  These sliders are independent (not combined), so you only need 6 images:

  Curtain images:
    user_curtain_1.png   -> high curtain
    user_curtain_2.png   -> medium curtain
    user_curtain_3.png   -> low curtain

  Light images:
    user_light_1.png     -> warm light
    user_light_2.png     -> medium light
    user_light_3.png     -> cold light

  Then in updateUserImage(), replace:
    userFrame.innerHTML = makeUserPlaceholder(activeType, activeValue);

  with:
    if (activeType === 'curtain') {
      userFrame.innerHTML = `<img src="images/user_curtain_${activeValue}.png" alt="User setting: ${curtainLabel(activeValue)}">`;
    } else {
      userFrame.innerHTML = `<img src="images/user_light_${activeValue}.png" alt="User setting: ${lightLabel(activeValue)}">`;
    }
*/

const descriptions = {
  '-1,1': 'One tube removed, with Curve Geometry 1.',
  '-1,2': 'One tube removed, with Curve Geometry 2.',
  '-1,3': 'One tube removed, with Curve Geometry 3.',
  '0,1': 'Tube layout unchanged, with Curve Geometry 1.',
  '0,2': 'Reference configuration: tube layout unchanged and Curve Geometry 2.',
  '0,3': 'Tube layout unchanged, with Curve Geometry 3.',
  '1,1': 'One tube added, with Curve Geometry 1.',
  '1,2': 'One tube added, with Curve Geometry 2.',
  '1,3': 'One tube added, with Curve Geometry 3.'
};

function tubeLabel(value) {
  if (Number(value) === -1) return '-1';
  if (Number(value) === 1) return '+1';
  return '0';
}

function curveLabel(value) {
  return `Geometry ${value}`;
}

function curtainLabel(value) {
  return ({ 1: 'High curtain', 2: 'Medium curtain', 3: 'Low curtain' })[Number(value)];
}

function lightLabel(value) {
  return ({ 1: 'Warm light', 2: 'Medium light', 3: 'Cold light' })[Number(value)];
}

function makePlaceholder(tube, curve) {
  const key = `${tube},${curve}`;
  const blue = '#173451';
  const tones = {
    '-1,1': '#edf4fb',
    '-1,2': '#e8f0f8',
    '-1,3': '#e2ecf6',
    '0,1': '#dde8f4',
    '0,2': '#ffffff',
    '0,3': '#d7e4f1',
    '1,1': '#d2dfec',
    '1,2': '#ccd9e7',
    '1,3': '#c6d4e3'
  }[key];

  const curvePathLeft = {
    1: 'M190 600 C240 420, 250 260, 210 110',
    2: 'M190 600 C310 450, 300 260, 210 110',
    3: 'M190 600 C380 470, 350 250, 210 110'
  }[curve];

  const curvePathRight = {
    1: 'M710 600 C660 420, 650 260, 690 110',
    2: 'M710 600 C590 450, 600 260, 690 110',
    3: 'M710 600 C520 470, 550 250, 690 110'
  }[curve];

  const baseTubes = [250, 330, 410, 490, 570, 650];
  const tubeX = Number(tube) === -1 ? baseTubes.slice(0, -1) : Number(tube) === 1 ? [...baseTubes, 730] : baseTubes;

  const tubeLines = tubeX.map((x, i) => `
    <line x1="${x}" y1="95" x2="${x}" y2="570" stroke="${blue}" stroke-width="8" stroke-linecap="round" opacity="${i === tubeX.length - 1 && Number(tube) === 1 ? '0.55' : '0.28'}" />
  `).join('');

  return `
    <svg viewBox="0 0 900 650" role="img" aria-label="Placeholder elevation for tube variation ${tubeLabel(tube)} and Curve Geometry ${curve}">
      <rect width="900" height="650" fill="${tones}" />
      <rect x="150" y="70" width="600" height="520" rx="8" fill="#ffffff" stroke="rgba(23,52,81,0.28)" stroke-width="2" />
      ${Array.from({ length: 10 }, (_, i) => `<line x1="150" y1="${120 + i * 46}" x2="750" y2="${120 + i * 46}" stroke="rgba(23,52,81,0.10)" stroke-width="2" />`).join('')}
      ${Array.from({ length: 9 }, (_, i) => `<line x1="${210 + i * 60}" y1="70" x2="${210 + i * 60}" y2="590" stroke="rgba(23,52,81,0.08)" stroke-width="2" />`).join('')}
      ${tubeLines}
      <path d="${curvePathLeft}" fill="none" stroke="${blue}" stroke-width="11" stroke-linecap="round" opacity="0.95" />
      <path d="${curvePathRight}" fill="none" stroke="${blue}" stroke-width="11" stroke-linecap="round" opacity="0.95" />
      <rect x="170" y="600" width="560" height="22" rx="11" fill="${blue}" opacity="0.9" />
      <text x="450" y="302" text-anchor="middle" font-size="34" font-weight="800" fill="${blue}">ELEVATION</text>
      <text x="450" y="344" text-anchor="middle" font-size="21" font-weight="700" fill="${blue}">TUBE ${tubeLabel(tube)} / CURVE G${curve}</text>
      <text x="450" y="378" text-anchor="middle" font-size="16" fill="rgba(16,42,67,0.65)">placeholder to replace with final image</text>
    </svg>`;
}

function makeUserPlaceholder(type, value) {
  const blue = '#173451';
  const toneMap = {
    curtain: { 1: '#eef4fb', 2: '#dde8f5', 3: '#cadcef' },
    light: { 1: '#f8eedc', 2: '#eef2f6', 3: '#dfeaf9' }
  };

  const bg = toneMap[type][Number(value)];
  const heading = type === 'curtain' ? curtainLabel(value).toUpperCase() : lightLabel(value).toUpperCase();
  const subtitle = type === 'curtain' ? 'user shading preference' : 'user lighting preference';

  const curtainY = { 1: 170, 2: 250, 3: 330 }[Number(value)];
  const glowOpacity = type === 'light' ? ({ 1: 0.65, 2: 0.35, 3: 0.18 })[Number(value)] : 0.10;
  const lightBeam = type === 'light' ? ({ 1: '#f1d48f', 2: '#e9edf2', 3: '#d8ebff' })[Number(value)] : '#ffffff';

  return `
    <svg viewBox="0 0 900 650" role="img" aria-label="Placeholder for ${heading}">
      <rect width="900" height="650" fill="${bg}" />
      <rect x="135" y="60" width="630" height="535" rx="8" fill="#ffffff" stroke="rgba(23,52,81,0.20)" stroke-width="2" />
      <rect x="195" y="115" width="510" height="390" rx="6" fill="#f7fafc" stroke="rgba(23,52,81,0.10)" stroke-width="2" />
      <rect x="215" y="135" width="470" height="350" fill="#eaf1f8" />

      <circle cx="450" cy="220" r="170" fill="${lightBeam}" opacity="${glowOpacity}" />
      <circle cx="450" cy="220" r="110" fill="${lightBeam}" opacity="${glowOpacity * 0.85}" />

      <rect x="240" y="110" width="420" height="18" rx="9" fill="${blue}" opacity="0.9" />
      <rect x="240" y="${curtainY}" width="420" height="18" rx="9" fill="${blue}" opacity="0.9" />
      <line x1="240" y1="128" x2="240" y2="${curtainY}" stroke="${blue}" stroke-width="5" opacity="0.5" />
      <line x1="660" y1="128" x2="660" y2="${curtainY}" stroke="${blue}" stroke-width="5" opacity="0.5" />

      <rect x="280" y="530" width="340" height="16" rx="8" fill="${blue}" opacity="0.18" />

      <text x="450" y="290" text-anchor="middle" font-size="34" font-weight="800" fill="${blue}">${heading}</text>
      <text x="450" y="332" text-anchor="middle" font-size="19" font-weight="700" fill="${blue}">${subtitle}</text>
      <text x="450" y="370" text-anchor="middle" font-size="16" fill="rgba(16,42,67,0.65)">placeholder to replace with final image</text>
    </svg>`;
}

function updateElevation() {
  const tube = tubeVariation.value;
  const curve = curveGeometry.value;
  const key = `${tube},${curve}`;

  combinationLabel.textContent = `Tube variation: ${tubeLabel(tube)} · Curve geometry: ${curve}`;
  if (combinationText) combinationText.textContent = '';
  elevationFrame.innerHTML = `<img src="images/elevation_t${tube}_c${curve}.png" alt="Elevation configuration: tube variation ${tube}, curve geometry ${curve}">`;
}


const curtainKpis = {
  1: {
    position: 'High curtain',
    glare: '6.4%',
    underlit: '21.2%'
  },
  2: {
    position: 'Medium curtain',
    glare: '0%',
    underlit: '21.2%'
  },
  3: {
    position: 'Low curtain',
    glare: '0%',
    underlit: '24.3%'
  }
};

const lightKpis = {
  1: {
    temperature: '4000 K',
    hourlyEnergy: '0.04 kWh/h'
  },
  2: {
    temperature: '5000 K',
    hourlyEnergy: '0.04 kWh/h'
  },
  3: {
    temperature: '6500 K',
    hourlyEnergy: '0.04 kWh/h'
  }
};

function makeKpiCard(label, value, note = '') {
  return `
    <div class="kpi-card">
      <span>${label}</span>
      <strong>${value}</strong>
      ${note ? `<small>${note}</small>` : ''}
    </div>
  `;
}

function updateUserKpis(activeType, activeValue) {
  if (activeType === 'curtain') {
    const data = curtainKpis[Number(activeValue)];
    userKpis.innerHTML = [
      makeKpiCard('Glare risk area', data.glare, 'surface area'),
      makeKpiCard('Underlit area', data.underlit, 'surface area')
    ].join('');
  } else {
    const data = lightKpis[Number(activeValue)];
    userKpis.innerHTML = [
      makeKpiCard('Light temperature', data.temperature),
      makeKpiCard('Hourly energy', data.hourlyEnergy, 'per LED office luminaire')
    ].join('');
  }
}


function updateUserImage(activeType = lastUserControl) {
  lastUserControl = activeType;

  const curtain = curtainPosition.value;
  const light = lightTemperature.value;
  const activeValue = activeType === 'curtain' ? curtain : light;

  userLabel.textContent = activeType === 'curtain'
    ? `Curtain: ${curtainLabel(curtain).replace('Curtain', 'curtain')}`
    : `Light: ${lightLabel(light).replace('light', 'light')}`;

  if (userText) userText.textContent = '';

     if (activeType === 'curtain') {
      userFrame.innerHTML = `<img src="images/user_curtain_${activeValue}.png" alt="User setting: ${curtainLabel(activeValue)}">`;
    } else {
      userFrame.innerHTML = `<img src="images/user_light_${activeValue}.png" alt="User setting: ${lightLabel(activeValue)}">`;
    }
  updateUserKpis(activeType, activeValue);
}

tubeVariation.addEventListener('input', updateElevation);
curveGeometry.addEventListener('input', updateElevation);
curtainPosition.addEventListener('input', () => updateUserImage('curtain'));
lightTemperature.addEventListener('input', () => updateUserImage('light'));

updateElevation();
updateUserImage('curtain');


const managerScenario = document.getElementById('managerScenario');
const managerScenarioTitle = document.getElementById('managerScenarioTitle');
const managerLcc = document.getElementById('managerLcc');
const managerLabel = document.getElementById('managerLabel');
const managerText = document.getElementById('managerText');
const barChart = document.getElementById('barChart');
const openInterventions = document.getElementById('openInterventions');
const closeInterventions = document.getElementById('closeInterventions');
const interventionModal = document.getElementById('interventionModal');
const interventionList = document.getElementById('interventionList');
const modalTitle = document.getElementById('modalTitle');

const managerScenarios = [
  {
    id: 'A',
    title: 'Scenario A',
    headline: 'Glazing replacement now, 6 tubes added in 2080',
    description: 'Highest early investment, but the upgraded envelope is active for the longest period.',
    lcc: 64.7,
    values: [
      { year: '2026', investment: 160.4, saving: 0 },
      { year: '2050', investment: 26.6, saving: 78.2 },
      { year: '2080', investment: 34.7, saving: 52.1 },
      { year: '2100', investment: 0, saving: 27.0 }
    ],
    interventions: {
      '2026': ['Glazing disassembly', 'Low-e glazing installation', 'Shading substructure assembly', 'Pipe assembly'],
      '2050': ['Shading substructure disassembly', 'Gasket replacement', 'Shading substructure assembly'],
      '2080': ['Shading substructure disassembly', 'Glazing disassembly', 'Low-e glazing installation', 'Shading substructure assembly', 'Additional pipe assembly'],
    }
  },
  {
    id: 'B',
    title: 'Scenario B',
    headline: 'Glazing replacement in 2050, 6 tubes added in 2080',
    description: 'Balanced roadmap: no immediate major envelope replacement, upgrade before harsher future climates.',
    lcc: 92.6,
    values: [
      { year: '2026', investment: 91.4, saving: 0 },
      { year: '2050', investment: 58.4, saving: 0 },
      { year: '2080', investment: 21.7, saving: 52.1 },
      { year: '2100', investment: 0, saving: 27.0 }
    ],
    interventions: {
      '2026': ['Shading substructure assembly', 'Pipe assembly'],
      '2050': ['Shading substructure disassembly', 'Glazing disassembly', 'Low-e glazing installation', 'Shading substructure assembly'],
      '2080': ['Shading substructure disassembly', 'Gasket replacement', 'Shading substructure assembly', 'Additional pipe assembly'],
    }
  },
  {
    id: 'C',
    title: 'Scenario C',
    headline: 'Glazing replacement in 2080, 6 tubes added in 2080',
    description: 'Lowest short-term burden, but limited time to benefit from the improved envelope before 2100.',
    lcc: 126.0,
    values: [
      { year: '2026', investment: 91.4, saving: 0 },
      { year: '2050', investment: 26.6, saving: 0 },
      { year: '2080', investment: 34.7, saving: 0 },
      { year: '2100', investment: 0, saving: 27.0 }
    ],
    interventions: {
      '2026': ['Shading substructure assembly', 'Pipe assembly'],
      '2050': ['Shading substructure disassembly', 'Gasket replacement', 'Shading substructure assembly'],
      '2080': ['Shading substructure disassembly', 'Glazing disassembly', 'Low-e glazing installation', 'Shading substructure assembly', 'Additional pipe assembly'],
    }
  }
];

function makeBar(value, maxValue, type) {
  const height = value === 0 ? 2 : Math.max(8, (value / maxValue) * 170);
  const mobileHeight = value === 0 ? 2 : Math.max(8, (value / maxValue) * 76);
  return `
    <div class="bar-wrap" style="--bar-height: ${height}px; --bar-height-mobile: ${mobileHeight}px">
      <span class="bar-value">${value === 0 ? '0' : value.toFixed(1)}</span>
      <div class="bar ${type}" style="height: ${height}px"></div>
    </div>
  `;
}

function updateManager() {
  const scenario = managerScenarios[Number(managerScenario.value)];
  const maxValue = Math.max(...scenario.values.flatMap(item => [item.investment, item.saving]));

  managerScenarioTitle.textContent = scenario.title;
  managerLcc.textContent = `${scenario.lcc.toFixed(1)} €/m²`;
  managerLabel.textContent = scenario.headline;
  managerText.textContent = scenario.description;

  barChart.innerHTML = scenario.values.map(item => `
    <div class="year-group">
      <div class="bars">
        ${makeBar(item.investment, maxValue, 'investment')}
        ${makeBar(item.saving, maxValue, 'saving')}
      </div>
      <strong>${item.year}</strong>
    </div>
  `).join('');

  modalTitle.textContent = `${scenario.title} intervention plan`;
  interventionList.innerHTML = Object.entries(scenario.interventions).map(([year, items]) => `
    <div class="intervention-year">
      <h4>${year}</h4>
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

function openModal() {
  updateManager();
  interventionModal.classList.add('is-open');
  interventionModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  interventionModal.classList.remove('is-open');
  interventionModal.setAttribute('aria-hidden', 'true');
}

if (managerScenario) {
  managerScenario.addEventListener('input', updateManager);
  openInterventions.addEventListener('click', openModal);
  closeInterventions.addEventListener('click', closeModal);
  interventionModal.addEventListener('click', (event) => {
    if (event.target === interventionModal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  updateManager();
}


function initArchitectCurveMapper() {
  const mapper = document.getElementById('mapper');
  const mapperGrid = document.getElementById('mapperGrid');
  const mapperCurve = document.getElementById('mapperCurve');
  const mapperSteps = document.getElementById('mapperSteps');
  const point1 = document.getElementById('point1');
  const point2 = document.getElementById('point2');
  const handleLine1 = document.getElementById('handleLine1');
  const handleLine2 = document.getElementById('handleLine2');
  const facadeGrid = document.getElementById('facadeGrid');
  const facadeRects = document.getElementById('facadeRects');
  const facadeCurve = document.getElementById('facadeCurve');
  const gapSlider = document.getElementById('gapSlider');
  const resetButton = document.getElementById('resetButton');

  if (!mapper || !mapperGrid || !mapperCurve || !mapperSteps || !point1 || !point2 || !facadeGrid || !facadeRects || !facadeCurve || !gapSlider || !resetButton) return;

  const xSteps = 30;
  const ySteps = 20;

  const bounds = {
    minX: 54,
    maxX: 366,
    minY: 38,
    maxY: 222,
    startX: 54,
    startY: 130,
    endX: 366,
    endY: 130
  };

  const defaultState = {
    p1: { x: 140, y: 80 },
    p2: { x: 280, y: 178 }
  };

  let mapperState = structuredClone(defaultState);
  let activeMapperPoint = null;

  function mapperClamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function mapperCubicBezier(p0, p1, p2, p3, t) {
    const mt = 1 - t;
    return mt ** 3 * p0 + 3 * mt ** 2 * t * p1 + 3 * mt * t ** 2 * p2 + t ** 3 * p3;
  }

  function mapperPath() {
    return `M ${bounds.startX} ${bounds.startY} C ${mapperState.p1.x} ${mapperState.p1.y}, ${mapperState.p2.x} ${mapperState.p2.y}, ${bounds.endX} ${bounds.endY}`;
  }

  function makeMapperGrid() {
    const lines = [];

    for (let i = 0; i <= xSteps; i++) {
      const x = bounds.minX + (i / xSteps) * (bounds.maxX - bounds.minX);
      lines.push(`<line x1="${x}" y1="${bounds.minY}" x2="${x}" y2="${bounds.maxY}" />`);
    }

    for (let i = 0; i <= ySteps; i++) {
      const y = bounds.minY + (i / ySteps) * (bounds.maxY - bounds.minY);
      lines.push(`<line x1="${bounds.minX}" y1="${y}" x2="${bounds.maxX}" y2="${y}" />`);
    }

    mapperGrid.innerHTML = lines.join('');
  }

  function sampleCurveSteps(reverse = false) {
    const values = [];

    for (let i = 0; i < xSteps; i++) {
      const t = (i + 0.5) / xSteps;
      const sampledT = reverse ? 1 - t : t;
      const y = mapperCubicBezier(bounds.startY, mapperState.p1.y, mapperState.p2.y, bounds.endY, sampledT);
      const normalized = (y - bounds.minY) / (bounds.maxY - bounds.minY);
      const step = mapperClamp(Math.round(normalized * (ySteps - 1)), 0, ySteps - 1);
      values.push(step);
    }

    return values;
  }

  function makeStepPath(values) {
    const cellW = (bounds.maxX - bounds.minX) / xSteps;
    const cellH = (bounds.maxY - bounds.minY) / (ySteps - 1);
    let d = '';

    values.forEach((step, i) => {
      const x0 = bounds.minX + i * cellW;
      const x1 = x0 + cellW;
      const y = bounds.minY + step * cellH;
      d += i === 0 ? `M ${x0} ${y} L ${x1} ${y}` : ` L ${x0} ${y} L ${x1} ${y}`;
    });

    return d;
  }

  function makeFacadeBackgroundGrid(floors) {
    const width = 1400;
    const height = 720;
    const marginX = 56;
    const usableW = width - marginX * 2;
    const floorH = height / floors;
    const colW = usableW / xSteps;
    const lines = [];

    for (let i = 0; i <= xSteps; i++) {
      const x = marginX + i * colW;
      lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="rgba(23,52,81,0.045)" stroke-width="0.45" />`);
    }

    for (let f = 1; f < floors; f++) {
      const y = f * floorH;
      lines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="rgba(23,52,81,0.08)" stroke-width="0.55" />`);
    }

    facadeGrid.innerHTML = lines.join('');
  }

  function updateFacadeMapper() {
    const floors = 4;
    const gap = Number(gapSlider.value);
    const width = 1400;
    const height = 720;
    const marginX = 56;
    const usableW = width - marginX * 2;
    const floorH = height / floors;
    const colW = usableW / xSteps;
    const rectW = colW * 0.44;
    const pieces = [];
    const curves = [];

    makeFacadeBackgroundGrid(floors);

    for (let floor = 0; floor < floors; floor++) {
      const reverse = floor % 2 === 1;
      const values = sampleCurveSteps(reverse);
      const floorTop = floor * floorH;
      const floorBottom = floorTop + floorH;
      const stepH = floorH / ySteps;

      values.forEach((step, i) => {
        const x = marginX + i * colW + (colW - rectW) / 2;
        const gapCenter = floorTop + (step + 0.5) * stepH;
        const topH = Math.max(0, gapCenter - gap / 2 - floorTop - 10);
        const bottomY = gapCenter + gap / 2;
        const bottomH = Math.max(0, floorBottom - bottomY - 10);

        pieces.push(`
          <rect x="${x}" y="${floorTop + 10}" width="${rectW}" height="${topH}" rx="1.2" fill="rgba(23,52,81,0.055)" stroke="rgba(23,52,81,0.42)" stroke-width="0.55" />
          <rect x="${x}" y="${bottomY}" width="${rectW}" height="${bottomH}" rx="1.2" fill="rgba(23,52,81,0.055)" stroke="rgba(23,52,81,0.42)" stroke-width="0.55" />
        `);

        const centerX = marginX + i * colW + colW / 2;
        const centerY = gapCenter;
        curves.push(`<rect x="${centerX - colW * 0.42}" y="${centerY - 1.4}" width="${colW * 0.84}" height="2.8" fill="rgba(127,150,179,0.92)" opacity="0.95" />`);
      });
    }

    facadeRects.innerHTML = pieces.join('');
    facadeCurve.innerHTML = curves.join('');
  }

  function updateMapper() {
    mapperCurve.setAttribute('d', mapperPath());

    point1.setAttribute('cx', mapperState.p1.x);
    point1.setAttribute('cy', mapperState.p1.y);
    point2.setAttribute('cx', mapperState.p2.x);
    point2.setAttribute('cy', mapperState.p2.y);

    handleLine1.setAttribute('x2', mapperState.p1.x);
    handleLine1.setAttribute('y2', mapperState.p1.y);
    handleLine2.setAttribute('x1', mapperState.p2.x);
    handleLine2.setAttribute('y1', mapperState.p2.y);

    mapperSteps.setAttribute('d', makeStepPath(sampleCurveSteps(false)));

    updateFacadeMapper();
  }

  function svgPointFromMapperEvent(event) {
    const pt = mapper.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    return pt.matrixTransform(mapper.getScreenCTM().inverse());
  }

  function startMapperDrag(event, pointName) {
    activeMapperPoint = pointName;
    event.preventDefault();
  }

  function dragMapper(event) {
    if (!activeMapperPoint) return;

    const pt = svgPointFromMapperEvent(event);

    mapperState[activeMapperPoint].x = mapperClamp(pt.x, bounds.minX, bounds.maxX);
    mapperState[activeMapperPoint].y = mapperClamp(pt.y, bounds.minY, bounds.maxY);

    updateMapper();
  }

  function stopMapperDrag() {
    activeMapperPoint = null;
  }

  point1.addEventListener('pointerdown', event => startMapperDrag(event, 'p1'));
  point2.addEventListener('pointerdown', event => startMapperDrag(event, 'p2'));

  window.addEventListener('pointermove', dragMapper);
  window.addEventListener('pointerup', stopMapperDrag);
  window.addEventListener('pointercancel', stopMapperDrag);

  gapSlider.addEventListener('input', updateFacadeMapper);

  resetButton.addEventListener('click', () => {
    mapperState = structuredClone(defaultState);
    gapSlider.value = 26;
    updateMapper();
  });

  makeMapperGrid();
  updateMapper();
}

initArchitectCurveMapper();
