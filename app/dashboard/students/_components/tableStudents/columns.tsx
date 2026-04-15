"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
  id: string
  name: string
  cpf: string
  phone: string
  emergencyPhone?: string | null
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "emergencyPhone",
    header: "Telefone de Emergência",
    cell: ({ row }) => row.getValue("emergencyPhone") || "-",
  },
]