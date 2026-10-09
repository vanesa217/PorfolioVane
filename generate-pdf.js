// Script to generate a clean, valid PDF file: public/cv.pdf
import fs from 'fs';
import path from 'path';

function createSimplePDF() {
  const content = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595.28 841.89]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
    >>
  >>
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
4 0 obj
<<
  /Length 1950
>>
stream
BT
/F1 22 Tf
50 790 Td
(Vanesa Carolina Tarelli) Tj
0 -24 Td
/F1 13 Tf
(Desarrolladora Frontend - HTML, CSS y JavaScript) Tj
0 -18 Td
/F2 10 Tf
(Berisso, Buenos Aires | Celular: +54 9 221 561-5096 | tarellivanesacarolina@gmail.com) Tj
0 -14 Td
(LinkedIn: linkedin.com/in/vanesa-tarelli-1b93aa261) Tj
0 -26 Td
/F1 12 Tf
(PERFIL PROFESIONAL) Tj
0 -16 Td
/F2 10 Tf
(Tecnica Superior en Automatizacion y Control y Electricista Industrial.) Tj
0 -14 Td
(Traigo la logica de los sistemas industriales al desarrollo web: analisis de requerimientos,) Tj
0 -14 Td
(entradas, condiciones y salidas, y diagnostico con metodo al resolver incidencias.) Tj
0 -14 Td
(Desarrollo interfaces modernas, accesibles y responsivas con HTML5, CSS3 y JavaScript,) Tj
0 -14 Td
(incorporando herramientas de IA en el flujo de trabajo diario.) Tj
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
(HABILIDADES TECNICAS) Tj
0 -16 Td
/F2 10 Tf
(Frontend: HTML5, CSS3, JavaScript ES6+, Diseno Responsive, Git, Terminal Bash.) Tj
0 -14 Td
(Herramientas e IA: VS Code, GitHub Copilot, Claude, ChatGPT, Prompt Engineering.) Tj
0 -14 Td
(Automatizacion y Control: Diagrama Ladder, CADe SIMU, EPLAN, PSeInt, Electroneumatica.) Tj
0 -24 Td
/F1 12 Tf
(EDUCACION Y FORMACION) Tj
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
0 -24 Td
/F1 12 Tf
(EXPERIENCIA LABORAL) Tj
0 -16 Td
/F1 10 Tf
(2018 - 2019 | Cajera y Atencion al Publico - Supermercado Don Ciro, Berisso) Tj
0 -16 Td
/F1 10 Tf
(2014 - 2016 | Promotora de Ventas y Call Center - DirecTV, La Plata) Tj
0 -16 Td
/F1 10 Tf
(2010 - 2013 | Vendedora, Repositora y Cajera - Casa Basal, Berisso) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000300 00000 n 
0000000216 00000 n 
0000000280 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
2350
%%EOF`;

  const dest = path.resolve('public', 'cv.pdf');
  fs.writeFileSync(dest, content);
  console.log('CV PDF written to:', dest);
}

createSimplePDF();
