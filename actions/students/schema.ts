import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  emergencyPhone: z.string().optional().or(z.literal("")),
  workshops: z.array(z.string()).default([]),
});

export type StudentSchema = z.infer<typeof studentSchema>;
