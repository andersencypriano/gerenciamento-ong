"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createStudentSchema } from "@/schemas/students/createStudentSchema"
import { z } from "zod"
import { createStudentAction } from "@/actions/students/createStudentAction"
import { getAllWorkshops } from "@/actions/workshop/workshops"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { Workshop } from "@prisma/client"

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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


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

	const [workshops, setWorkshops] = useState<Workshop[]>([])

	useEffect(() => {
		const fetchWorkshops = async () => {
			const data = await getAllWorkshops();
			setWorkshops(data);
		}
		fetchWorkshops()
	}, [])
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

				<FormField
					control={form.control}
					name="workshops"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Oficinas</FormLabel>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border rounded-lg bg-muted/30 max-h-[200px] overflow-y-auto">
								{workshops.map((workshop) => (
									<div key={workshop.id} className="flex items-center space-x-2">
										<Checkbox
											id={workshop.id}
											checked={field.value?.includes(workshop.name) || false}
											onCheckedChange={(checked) => {
												const currentValue = field.value || []
												const newValue = checked
													? [...currentValue, workshop.name]
													: currentValue.filter((v: string) => v !== workshop.name)
												field.onChange(newValue)
											}}
										/>
										<Label
											htmlFor={workshop.id}
											className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{workshop.name}
										</Label>
									</div>
								))}
							</div>
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