export const projects = [
  {
    title: 'MJF.ARCA.SDK',
    description: 'SDK .NET para facturación electrónica con ARCA (ex-AFIP). Implementa WSAA (firma PKCS#7 CMS) y WSFE, cumpliendo RG 5616/2024. Soporta .NET Framework 4.8, .NET Standard 2.0, .NET 8/9. Incluye companion app MJF.ARCA.Tester (WPF) con validación contra homologación real.',
    tech: ['C#', '.NET 8/9', '.NET Framework 4.8', 'WSAA', 'WSFE', 'NuGet', 'WPF', 'PKCS#7'],
    status: 'Publicado',
    github: '#',
    nuget: 'https://www.nuget.org/packages/MJF.ARCA.SDK'
  },
  {
    title: 'Gestor de Finanzas para Equipos Amateur',
    description: 'App web mobile-first para gestionar las finanzas de grupos deportivos amateur. Reemplaza Excel y WhatsApp con un sistema de cuenta corriente por jugador: cada gasto resta saldo, cada pago lo suma. El admin registra gastos, aprueba pagos e invita miembros; los jugadores ven su deuda desde el celular.',
    tech: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'PostgreSQL', 'Google OAuth', 'Vercel'],
    status: 'Completado',
    github: 'https://github.com/mjfernandez-dev/gestor-finanzas-equipos',
    demo: 'https://gestor-finanzas-equipos.vercel.app'
  },
  {
    title: 'Expense Tracker',
    description: 'PWA para registrar y gestionar gastos personales. API REST con FastAPI, base de datos SQLite y frontend React + TypeScript con soporte offline.',
    tech: ['FastAPI', 'React', 'TypeScript', 'SQLite', 'PWA'],
    status: 'Completado',
    github: 'https://github.com/mjfernandez-dev/expense-tracker',
    demo: 'https://finanzaap.duckdns.org/login'
  },
  {
    title: 'Proyecto Universitario 1',
    description: 'Sistema desarrollado con Python para análisis de datos académicos',
    tech: ['Python', 'Pandas', 'Matplotlib'],
    status: 'En desarrollo',
    github: '#'
  },
  {
    title: 'Proyecto Universitario 2',
    description: 'Aplicación web para gestión de tareas con C# y ASP.NET',
    tech: ['C#', 'ASP.NET', 'SQL Server'],
    status: 'En desarrollo',
    github: '#'
  },
  {
    title: 'Desarrollo Profesional',
    description: 'Herramienta interna desarrollada en JavaScript para optimización de procesos',
    tech: ['JavaScript', 'Node.js', 'Express'],
    status: 'Completado',
    github: '#'
  }
];
