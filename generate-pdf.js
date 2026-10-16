// Script to generate a clean, valid PDF file: public/cv.pdf (VT Solutions Dossier Corporativo)
import fs from 'fs';
import path from 'path';

function createSimplePDF() {
  const streamBody = `BT
/F1 22 Tf
50 790 Td
(Vanesa Carolina Tarelli) Tj
0 -24 Td
/F1 13 Tf
(Desarrolladora Frontend & Tecnica en Automatizacion y Control) Tj
0 -18 Td
/F2 10 Tf
(Berisso, Buenos Aires | tarellivanesacarolina@gmail.com) Tj
0 -14 Td
(GitHub: github.com/vanesa217 | LinkedIn: linkedin.com/in/vanesa-tarelli-1b93aa261) Tj
0 -26 Td
/F1 12 Tf
(PERFIL PROFESIONAL) Tj
0 -16 Td
/F2 10 Tf
(Tecnica en Automatizacion y Control y Desarrolladora Frontend. Combino el pensamiento) Tj
0 -14 Td
(analitico de la ingenieria de control con el desarrollo web moderno y la IA agentica.) Tj
0 -14 Td
(Construyo interfaces web modulares y accesibles con HTML5, CSS3 y JavaScript moderno.) Tj
0 -14 Td
(Disponible para incorporacion inmediata a equipos de desarrollo (Remoto / Hibrido).) Tj
0 -24 Td
/F1 12 Tf
(COMPETENCIAS TECNICAS) Tj
0 -16 Td
/F1 10 Tf
(- Frontend & Web: ) Tj
/F2 10 Tf
(HTML5 semantico, CSS3, JavaScript ES6+, diseno responsive, Git, Terminal.) Tj
0 -16 Td
/F1 10 Tf
(- Herramientas & IA Agentica: ) Tj
/F2 10 Tf
(Google Antigravity, Google Gemini, GitHub Copilot, Claude, ChatGPT, VS Code.) Tj
0 -16 Td
/F1 10 Tf
(- Automatizacion & Control: ) Tj
/F2 10 Tf
(Diagramas Ladder, electroneumatica, tableros electricos, CADe SIMU, EPLAN.) Tj
0 -24 Td
/F1 12 Tf
(PROYECTOS DESTACADOS) Tj
0 -16 Td
/F1 10 Tf
(- Portafolio Web Interactivo: ) Tj
/F2 10 Tf
(Desarrollado en tiempo real con Google Antigravity, Gemini e IA agentica.) Tj
0 -16 Td
/F1 10 Tf
(- Refactorizacion Modular de JavaScript: ) Tj
/F2 10 Tf
(Modularizacion en componentes legibles con asistencia iterativa de IA.) Tj
0 -16 Td
/F1 10 Tf
(- Flujos Agenticos con Antigravity & Copilot: ) Tj
/F2 10 Tf
(Desarrollo acelerado integrando Google Antigravity, Gemini, Claude y ChatGPT.) Tj
0 -24 Td
/F1 12 Tf
(FORMACION TECNICA) Tj
0 -16 Td
/F1 10 Tf
(2020 - 2022 | Tecnicatura Superior en Automatizacion y Control) Tj
0 -14 Td
/F2 10 Tf
(ISFT N 193 "Astillero Rio Santiago") Tj
0 -16 Td
/F1 10 Tf
(2020 - 2021 | Electricista Industrial) Tj
0 -14 Td
/F2 10 Tf
(ISFT N 193 "Astillero Rio Santiago") Tj
0 -16 Td
/F1 10 Tf
(2020 - 2021 | Tecnologia de la Representacion) Tj
0 -14 Td
/F2 10 Tf
(ISFT N 193 "Astillero Rio Santiago") Tj
ET`;

  const streamLength = Buffer.byteLength(streamBody, 'utf8');

  const objects = [
    null,
    `1 0 obj\n<<\n  /Type /Catalog\n  /Pages 2 0 R\n>>\nendobj\n`,
    `2 0 obj\n<<\n  /Type /Pages\n  /Kids [3 0 R]\n  /Count 1\n>>\nendobj\n`,
    `3 0 obj\n<<\n  /Type /Page\n  /Parent 2 0 R\n  /MediaBox [0 0 595.28 841.89]\n  /Contents 4 0 R\n  /Resources <<\n    /Font <<\n      /F1 5 0 R\n      /F2 6 0 R\n    >>\n  >>\n>>\nendobj\n`,
    `4 0 obj\n<<\n  /Length ${streamLength}\n>>\nstream\n${streamBody}\nendstream\nendobj\n`,
    `5 0 obj\n<<\n  /Type /Font\n  /Subtype /Type1\n  /BaseFont /Helvetica-Bold\n>>\nendobj\n`,
    `6 0 obj\n<<\n  /Type /Font\n  /Subtype /Type1\n  /BaseFont /Helvetica\n>>\nendobj\n`
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  for (let i = 1; i <= 6; i++) {
    offsets[i] = Buffer.byteLength(pdf, 'utf8');
    pdf += objects[i];
  }

  const startXref = Buffer.byteLength(pdf, 'utf8');
  let xref = `xref\n0 7\n0000000000 65535 f \n`;
  for (let i = 1; i <= 6; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }

  const trailer = `trailer\n<<\n  /Size 7\n  /Root 1 0 R\n>>\nstartxref\n${startXref}\n%%EOF\n`;

  pdf += xref + trailer;

  const dest = path.resolve('public', 'cv.pdf');
  fs.writeFileSync(dest, pdf);
  console.log('CV PDF written to:', dest);
}

createSimplePDF();
