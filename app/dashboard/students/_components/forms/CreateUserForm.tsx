"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createStudentSchema } from "@/schemas/students/createStudentSchema"
import { z } from "zod"
import { createStudentAction } from "@/actions/students"
import { toast } from "sonner"

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CreateUserForm() {
	const form = useForm({
		resolver: zodResolver(createStudentSchema),
		defaultValues: {
			name: "",
			cpf: "",
			phone: "",
			emergencyPhone: "",
			workshops: [] as string[],
		}
	})

	const onSubmit = async (data: z.infer<typeof createStudentSchema>) => {
		const result = await createStudentAction(data);
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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 bg-card rounded-xl border shadow-sm">
				<div className="space-y-2">
					<h2 className="text-2xl font-bold tracking-tight">Cadastrar Novo Aluno</h2>
					<p className="text-muted-foreground">Preencha os dados abaixo para registrar o estudante.</p>
				</div>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome Completo</FormLabel>
							<FormControl>
								<Input placeholder="João Silva" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Telefone</FormLabel>
								<FormControl>
									<Input placeholder="(00) 00000-0000" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="emergencyPhone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contato de Emergência (Opcional)</FormLabel>
							<FormControl>
								<Input placeholder="(00) 00000-0000" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? "Cadastrando..." : "Cadastrar"}
				</Button>
			</form>
		</Form>
	)
}