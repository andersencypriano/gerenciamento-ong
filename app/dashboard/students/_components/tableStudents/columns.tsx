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
  createdAt: string | Date
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
  {
    accessorKey: "createdAt",
    header: "Data de Cadastro",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | Date
      const date = new Date(createdAt)
      return date.toLocaleDateString("pt-BR")
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true
      const rawDate = row.getValue(columnId) as string | Date
      const date = new Date(rawDate)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const formattedDate = `${year}-${month}-${day}`
      return formattedDate === filterValue
    },
  },
]