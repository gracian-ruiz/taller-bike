import{r as i,j as e,S as n}from"./app-xu_Yvl-t.js";import{A as o}from"./AuthenticatedLayout-CjZiLqIZ.js";import c from"./CreateClient-DXBXb5s0.js";import"./ApplicationLogo-BkQ7NsdY.js";import"./transition-CseQRgL8.js";function b({auth:t,users:d}){const l=t.roles||[],[r,a]=i.useState(!1);return e.jsxs(o,{user:t.user,roles:l,children:[e.jsx(n,{title:"Clientes"}),e.jsxs("div",{className:"p-6 bg-white shadow-md rounded-md",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Gestión de Clientes"}),l.includes("admin")&&e.jsx("button",{onClick:()=>a(!r),className:"bg-blue-500 text-white px-4 py-2 rounded",children:r?"Ver Lista":"Añadir Cliente"})]}),r?e.jsx(c,{onClose:()=>a(!1)}):e.jsxs("table",{className:"min-w-full bg-white border border-gray-200",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100",children:[e.jsx("th",{className:"py-2 px-4 border",children:"ID"}),e.jsx("th",{className:"py-2 px-4 border",children:"Nombre"}),e.jsx("th",{className:"py-2 px-4 border",children:"Email"})]})}),e.jsx("tbody",{children:d.map(s=>e.jsxs("tr",{className:"text-center",children:[e.jsx("td",{className:"py-2 px-4 border",children:s.id}),e.jsx("td",{className:"py-2 px-4 border",children:s.name}),e.jsx("td",{className:"py-2 px-4 border",children:s.email})]},s.id))})]})]})]})}export{b as default};
