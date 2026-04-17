"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteStudentSchema } from "@/schemas/students/deleteStudentSchema";
import { deleteStudentAction } from "@/actions/students/deleteStudent";
import { toast } from "sonner";
import { z } from "zod";
import { IconTrash } from "@tabler/icons-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function DeleteStudentForm() {

  const form = useForm({
    resolver: zodResolver(deleteStudentSchema),
    defaultValues: {
      cpf: "",
    }
  })

  const onSubmit = async (data: z.infer<typeof deleteStudentSchema>) => {
    const result = await deleteStudentAction(data);
    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        duration: 5000,
        style: {
          backgroundColor: "#22c55e",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 24px",
        }
      });
      form.reset();
    } else {
      toast.error(result.message, {
        position: "top-right",
        duration: 5000,
        style: {
          backgroundColor: "#ef4444",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 24px",
        }
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="000.000.000-00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4 bg-red-500 hover:bg-red-600 cursor-pointer" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <><IconTrash /> Excluindo...</> : <><IconTrash /> Excluir</>}
          </Button>
        </form>
      </Form>
    </>
  )
}