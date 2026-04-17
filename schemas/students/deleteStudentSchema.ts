import * as z from "zod";

export const deleteStudentSchema = z.object({
  cpf: z.string().min(11, "CPF inválido").max(11, "CPF inválido"),
});