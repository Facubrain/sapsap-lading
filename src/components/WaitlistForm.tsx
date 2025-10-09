import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const waitlistSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo válido" }),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

const API_ENDPOINT = (import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined) ?? "/api/waitlist";

const WaitlistForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: WaitlistFormValues) => {
    if (!API_ENDPOINT) {
      toast({
        title: "Configuración faltante",
        description: "Define VITE_WAITLIST_ENDPOINT para habilitar el formulario.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message ?? "No pudimos registrar tu correo. Inténtalo más tarde.");
      }

      form.reset();
      toast({
        title: data?.duplicate ? "Ya estabas en la lista" : "¡Reserva confirmada!",
        description: data?.duplicate
          ? "Usaremos tus datos existentes para mantenerte al día."
          : "Recibirás invitaciones prioritarias y las últimas novedades.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado";
      toast({
        title: "Algo salió mal",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="nombre@empresa.com"
                    className="pl-11 text-base"
                    autoComplete="email"
                    disabled={isSubmitting}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registrando...
            </>
          ) : (
            "Unirme a la lista"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default WaitlistForm;
