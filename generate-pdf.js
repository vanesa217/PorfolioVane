// Script to generate a clean, valid PDF file: public/cv.pdf (VT Solutions Dossier Corporativo)
import fs from 'fs';
import path from 'path';

function createSimplePDF() {
  const streamBody = `BT
/F1 22 Tf
50 790 Td
(VT Solutions - Vanesa Carolina Tarelli) Tj
0 -24 Td
/F1 13 Tf
(Desarrollo Frontend Moderno & Automatizacion Industrial) Tj
0 -18 Td
/F2 10 Tf
(Berisso, Buenos Aires | tarellivanesacarolina@gmail.com) Tj
0 -14 Td
(GitHub: github.com/vanesa217 | LinkedIn: linkedin.com/in/vanesa-tarelli-1b93aa261) Tj
0 -26 Td
/F1 12 Tf
(PROPUESTA DE VALOR & PERFIL PROFESIONAL) Tj
0 -16 Td
/F2 10 Tf
(Estudio y perfil profesional fundado por Vanesa Carolina Tarelli. Fusiono el rigor de la) Tj
0 -14 Td
(Automatizacion y Control con el desarrollo web moderno y la asistencia de IA generativa.) Tj
0 -14 Td
(Disponible para proyectos B2B de empresas y contratacion en equipos de software.) Tj
0 -24 Td
/F1 12 Tf
(SERVICIOS Y SOLUCIONES) Tj
0 -16 Td
/F1 10 Tf
(- Desarrollo Web & Frontend: ) Tj
/F2 10 Tf
(Interfaces corporativas, paneles interactivos, diseno responsivo y liviano.) Tj
0 -16 Td
/F1 10 Tf
(- Automatizacion & Control Industrial: ) Tj
/F2 10 Tf
(Diagramas Ladder, electroneumatica, tableros de potencia y control.) Tj
0 -16 Td
/F1 10 Tf
(- Consultoria & Asistencia con IA: ) Tj
/F2 10 Tf
(Refactorizacion modular, prompt engineering y aceleracion de software.) Tj
0 -24 Td
/F1 12 Tf
(PROYECTOS DESTACADOS) Tj
0 -16 Td
/F1 10 Tf
(- Portafolio Web Interactivo: ) Tj
/F2 10 Tf
(Sitio web desarrollado sin frameworks, diseno responsivo y liviano.) Tj
0 -16 Td
/F1 10 Tf
(- Refactorizacion de Codigo JavaScript: ) Tj
/F2 10 Tf
(Modularizacion en componentes legibles con asistencia IA.) Tj
0 -16 Td
/F1 10 Tf
(- Asistencia IA en VS Code: ) Tj
/F2 10 Tf
(Flujo de desarrollo optimizado con GitHub Copilot, Claude y ChatGPT.) Tj
0 -24 Td
/F1 12 Tf
(CAPACIDADES TECNICAS) Tj
0 -16 Td
/F2 10 Tf
(Frontend: HTML5, CSS3, JavaScript ES6+, Diseno Responsive, Git, Terminal Bash.) Tj
0 -14 Td
(Herramientas e IA: VS Code, GitHub Copilot, Claude, ChatGPT, Prompt Engineering.) Tj
0 -14 Td
(Automatizacion y Control: Diagrama Ladder, CADe SIMU, EPLAN, PSeInt, Electroneumatica.) Tj
0 -24 Td
/F1 12 Tf
(RESPALDO TECNICO Y FORMACION) Tj
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
