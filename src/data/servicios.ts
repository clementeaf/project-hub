export interface Servicio {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const servicios: Servicio[] = [
  {
    id: "srv-001",
    title: "Desarrollo Web a Medida",
    description:
      "Creamos aplicaciones web personalizadas con las últimas tecnologías, adaptadas a las necesidades específicas de tu negocio. Desde landing pages hasta plataformas SaaS complejas.",
    icon: "Code",
  },
  {
    id: "srv-002",
    title: "Consultoría Técnica",
    description:
      "Analizamos tu infraestructura actual y proponemos mejoras de arquitectura, rendimiento y escalabilidad. Te acompañamos en la toma de decisiones tecnológicas clave.",
    icon: "Search",
  },
  {
    id: "srv-003",
    title: "Diseño UI/UX",
    description:
      "Diseñamos interfaces intuitivas y atractivas centradas en el usuario. Prototipado, testing de usabilidad y sistemas de diseño para garantizar la mejor experiencia.",
    icon: "Palette",
  },
  {
    id: "srv-004",
    title: "Soporte y Mantenimiento",
    description:
      "Mantenemos tus aplicaciones actualizadas, seguras y funcionando sin interrupciones. Monitoreo proactivo, corrección de errores y actualizaciones periódicas.",
    icon: "Wrench",
  },
  {
    id: "srv-005",
    title: "Integración de Sistemas",
    description:
      "Conectamos tus herramientas y plataformas existentes mediante APIs, webhooks y middleware. Automatizamos flujos de trabajo entre sistemas para maximizar la eficiencia.",
    icon: "Link",
  },
  {
    id: "srv-006",
    title: "Auditoría de Código",
    description:
      "Revisamos tu código fuente en busca de vulnerabilidades, malas prácticas y oportunidades de optimización. Entregamos un informe detallado con recomendaciones accionables.",
    icon: "Shield",
  },
];
