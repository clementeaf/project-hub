export interface Usuario {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "developer" | "client";
}

export const usuarios: Usuario[] = [
  {
    id: "usr-001",
    name: "Clemente Falcone",
    email: "clemente@projecthub.dev",
    avatar: "CF",
    role: "admin",
  },
  {
    id: "usr-002",
    name: "Lucía Méndez",
    email: "lucia.mendez@projecthub.dev",
    avatar: "LM",
    role: "developer",
  },
  {
    id: "usr-003",
    name: "Tomás Herrera",
    email: "tomas.herrera@projecthub.dev",
    avatar: "TH",
    role: "developer",
  },
  {
    id: "usr-004",
    name: "Andrea Ruiz",
    email: "andrea.ruiz@projecthub.dev",
    avatar: "AR",
    role: "developer",
  },
  {
    id: "usr-005",
    name: "Martín Delgado",
    email: "martin.delgado@correo.com",
    avatar: "MD",
    role: "client",
  },
  {
    id: "usr-006",
    name: "Sofía Castillo",
    email: "sofia.castillo@empresa.com",
    avatar: "SC",
    role: "client",
  },
];
