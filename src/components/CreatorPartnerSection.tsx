import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock,
  Handshake,
  Lightbulb,
  Loader2,
  Megaphone,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import heroVideo from "@/assets/video/jelous-sapsap.mp4";
import heroPoster from "@/assets/video/jelous-sapsap-poster.jpg";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const APPLICATION_ENDPOINT =
  (import.meta.env.VITE_INFLUENCER_APPLICATION_ENDPOINT as string | undefined) ??
  "/api/influencer-application";

type FormValues = {
  fullName: string;
  email: string;
  socialHandle: string;
  platform: "instagram" | "tiktok" | "youtube" | "other";
  niche: string;
  followerRange: "10k-50k" | "50k-100k" | "100k-500k" | "500k+";
  message: string;
};

const defaultValues: FormValues = {
  fullName: "",
  email: "",
  socialHandle: "",
  platform: "instagram",
  niche: "",
  followerRange: "10k-50k",
  message: "",
};

const testimonials = [
  {
    name: "Facu",
    handle: "@facuenviaje",
    quote:
      "Con SAPSAP transformé mis videos de TikTok de los glaciares patagónicos en una experiencia de aprendizaje completa. Mis seguidores ahora pueden practicar español mientras viven mi aventura en primera persona.",
    impact: "45% aumento en engagement y nueva audiencia internacional",
  },
  {
    name: "Ana Travels",
    handle: "@anatravels_arg",
    quote:
      "Mi contenido de Instagram sobre Buenos Aires se convirtió en historias interactivas. El formato inmersivo de SAPSAP hizo que mis followers extranjeros se conectaran más profundamente con la cultura argentina.",
    impact: "Triplicó mis colaboraciones con marcas internacionales",
  },
];

const sampleStories = [
  {
    title: "Glaciares de la Patagonia con @facuenviaje",
    description: "Aprende español explorando el Perito Moreno. Vocabulario de naturaleza y aventura con diálogos auténticos de Facu.",
  },
  {
    title: "Tango en San Telmo",
    description: "Practica español rioplatense mientras descubres la cultura porteña. Historia interactiva basada en content real de Buenos Aires.",
  },
  {
    title: "Ruta del Vino en Mendoza", 
    description: "Vocabulario gastronómico y cultural mientras recorres viñedos argentinos. Experiencia inmersiva con nativos locales.",
  },
];

const followerOptions: { value: FormValues["followerRange"]; label: string }[] = [
  { value: "10k-50k", label: "10K – 50K" },
  { value: "50k-100k", label: "50K – 100K" },
  { value: "100k-500k", label: "100K – 500K" },
  { value: "500k+", label: "500K+" },
];

const platformOptions: { value: FormValues["platform"]; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "other", label: "Otro" },
];

const timelineGradient = [
  "from-primary/20",
  "from-secondary/25",
  "from-orange-400/20",
];

const CreatorPartnerSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().min(2, { message: t("creator.partner.form.fullName.error") }),
        email: z.string().email({ message: t("creator.partner.form.email.error") }),
        socialHandle: z.string().min(2, { message: t("creator.partner.form.handle.error") }),
        platform: z.enum(["instagram", "tiktok", "youtube", "other"], {
          required_error: t("creator.partner.form.platform.error"),
        }),
        niche: z.string().min(2, { message: t("creator.partner.form.niche.error") }),
        followerRange: z.enum(["10k-50k", "50k-100k", "100k-500k", "500k+"], {
          required_error: t("creator.partner.form.followerRange.error"),
        }),
        message: z.string().min(10, { message: t("creator.partner.form.message.error") }).max(500, {
          message: t("creator.partner.form.message.max"),
        }),
      }),
    [t],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  const pushTrackingEvent = useCallback((eventName: string, payload?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    window.dataLayer.push({ event: eventName, ...payload });
  }, []);

  useEffect(() => {
    pushTrackingEvent("form_view", { form: "influencer_application" });
  }, [pushTrackingEvent]);

  const onSubmit = async (values: FormValues) => {
    if (!APPLICATION_ENDPOINT) {
      toast({
        title: "Configuración faltante",
        description: "El formulario no está configurado correctamente.",
        variant: "destructive",
      });
      return;
    }

    pushTrackingEvent("form_submit", { form: "influencer_application" });

    try {
      setIsSubmitting(true);

      const response = await fetch(APPLICATION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error((data as { message?: string })?.message ?? "No pudimos procesar tu aplicación. Inténtalo más tarde.");
      }

      form.reset(defaultValues);
      setSuccessOpen(true);
      pushTrackingEvent("form_success", { form: "influencer_application" });
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

  const scrollToForm = () => {
    const target = document.getElementById("creator-application");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToSamples = () => {
    const target = document.getElementById("creator-samples");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const valueProps = [
    {
      title: t("creator.partner.valueProps.0.title"),
      description: t("creator.partner.valueProps.0.description"),
      icon: Sparkles,
    },
    {
      title: t("creator.partner.valueProps.1.title"),
      description: t("creator.partner.valueProps.1.description"),
      icon: BadgeCheck,
    },
    {
      title: t("creator.partner.valueProps.2.title"),
      description: t("creator.partner.valueProps.2.description"),
      icon: Wallet,
    },
  ];

  const timeline = [
    {
      title: t("creator.partner.timeline.0.title"),
      description: t("creator.partner.timeline.0.description"),
      duration: t("creator.partner.timeline.0.duration"),
      icon: Handshake,
    },
    {
      title: t("creator.partner.timeline.1.title"),
      description: t("creator.partner.timeline.1.description"),
      duration: t("creator.partner.timeline.1.duration"),
      icon: Lightbulb,
    },
    {
      title: t("creator.partner.timeline.2.title"),
      description: t("creator.partner.timeline.2.description"),
      duration: t("creator.partner.timeline.2.duration"),
      icon: Megaphone,
    },
  ];

  const partnerProfile = [
    t("creator.partner.profile.0"),
    t("creator.partner.profile.1"),
    t("creator.partner.profile.2"),
    t("creator.partner.profile.3"),
    t("creator.partner.profile.4"),
  ];

  const easePoints = [
    t("creator.partner.ease.0"),
    t("creator.partner.ease.1"),
    t("creator.partner.ease.2"),
    t("creator.partner.ease.3"),
    t("creator.partner.ease.4"),
    t("creator.partner.ease.5"),
  ];

  return (
    <section
      id="creator-partners"
      className="relative min-h-screen overflow-hidden bg-white"
      aria-labelledby="creator-partners-heading"
    >
      <div className="container relative z-10 mx-auto space-y-20 px-4 py-16 sm:px-6 lg:py-24">
        {/* Hero Section Simplificado */}
        <div className="text-center space-y-8">
          <div className="inline-flex items-center rounded-full bg-purple-100 px-6 py-3">
            <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">
              {t("creator.partner.badge")}
            </span>
          </div>
          <h1 id="creator-partners-heading" className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            {t("creator.partner.headline")}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("creator.partner.subheadline")}
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={scrollToForm} 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
            >
              {t("creator.partner.primaryCta")}
            </Button>
          </div>
        </div>

        {/* App Mockups Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="relative">
            <img 
              src="/mockup/WhatsApp Image 2025-10-18 at 8.36.36 PM.jpeg" 
              alt="SAPSAP App Mockup 1" 
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
          <div className="relative">
            <img 
              src="/mockup/WhatsApp Image 2025-10-18 at 8.36.36 PM (1).jpeg" 
              alt="SAPSAP App Mockup 2" 
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
          <div className="relative">
            <img 
              src="/mockup/WhatsApp Image 2025-10-18 at 8.37.51 PM.jpeg" 
              alt="SAPSAP App Mockup 3" 
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Simple Benefits */}
        <div className="text-center space-y-12">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t("creator.partner.section.whatYouGet.title")}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {valueProps.map(({ title, description, icon: Icon }, index) => (
              <div key={title} className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Images Gallery */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
              Historias que cobran vida
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Transforma tus aventuras en experiencias de aprendizaje inmersivas
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="/Una casa x el mundo/C1 san humberto nono.jpg" 
                alt="Destino de viaje 1" 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Aventura Andina</h3>
                <p className="text-sm text-gray-200">Historia en español</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="/Una casa x el mundo/C4 itacare 2.jpg" 
                alt="Destino de viaje 2" 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Costa Brasileña</h3>
                <p className="text-sm text-gray-200">Historia en portugués</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="/Una casa x el mundo/C5 idilico.jpg" 
                alt="Destino de viaje 3" 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Paraíso Natural</h3>
                <p className="text-sm text-gray-200">Historia en inglés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Timeline */}
        <div className="bg-gray-50 rounded-3xl p-12">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {t("creator.partner.section.timeline.title")}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {timeline.map(({ title, description, duration, icon: Icon }, index) => (
                <div key={title} className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-purple-100">
                      <Icon className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                      Paso {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <p className="text-gray-700">{description}</p>
                    <div className="text-sm font-medium text-purple-600">{duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials simplificados */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.handle} className="bg-white p-6 rounded-2xl shadow-lg border">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                      {testimonial.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-purple-600">{testimonial.handle}</p>
                  </div>
                </div>
                <p className="text-gray-800 italic mb-3">"{testimonial.quote}"</p>
                <p className="text-sm font-medium text-green-600">{testimonial.impact}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Ejemplos de historias</h3>
            {sampleStories.map((story) => (
              <div key={story.title} className="bg-purple-50 p-6 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Camera className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{story.title}</h4>
                    <p className="text-gray-700">{story.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-green-50 p-6 rounded-2xl text-center">
              <p className="text-sm font-semibold text-green-700 mb-2">Ganancias promedio</p>
              <p className="text-3xl font-bold text-green-600">$1,850</p>
              <p className="text-sm text-green-600">por socio activo mensual</p>
            </div>
          </div>
        </div>


        {/* Simple Application Form */}
        <div id="creator-application" className="bg-gray-50 rounded-3xl p-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8 mb-12">
              <div className="inline-flex items-center rounded-full bg-purple-100 px-6 py-3">
                <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-900">
                  {t("creator.partner.section.form.badge")}
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
                {t("creator.partner.section.form.title")}
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {t("creator.partner.section.form.subtitle")}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-gray-800 font-semibold">{t("creator.partner.form.fullName.label")}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Alex Rivera" 
                              {...field} 
                              className="h-12 rounded-xl border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200" 
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-gray-800 font-semibold">{t("creator.partner.form.email.label")}</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="alex@sapsap.com" 
                              {...field} 
                              className="h-12 rounded-xl border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200" 
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="socialHandle"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-gray-800 font-semibold">{t("creator.partner.form.handle.label")}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="@yourhandle" 
                              {...field} 
                              className="h-12 rounded-xl border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200" 
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-gray-800 font-semibold">{t("creator.partner.form.platform.label")}</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-200">
                                <SelectValue 
                                  placeholder={t("creator.partner.form.platform.placeholder")} 
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border bg-white">
                              {platformOptions.map((option) => (
                                <SelectItem 
                                  key={option.value} 
                                  value={option.value}
                                  className="hover:bg-purple-50 focus:bg-purple-50"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="niche"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-gray-800 font-semibold">{t("creator.partner.form.niche.label")}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Eco travel, foodie trips…" 
                              {...field} 
                              className="h-12 rounded-xl border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200" 
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="followerRange"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-gray-800 font-semibold">{t("creator.partner.form.followerRange.label")}</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-200">
                                <SelectValue 
                                  placeholder={t("creator.partner.form.followerRange.placeholder")} 
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border bg-white">
                              {followerOptions.map((option) => (
                                <SelectItem 
                                  key={option.value} 
                                  value={option.value}
                                  className="hover:bg-purple-50 focus:bg-purple-50"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-800 font-semibold">{t("creator.partner.form.message.label")}</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder={t("creator.partner.form.message.placeholder")}
                            {...field}
                            className="resize-none rounded-xl border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="h-14 px-12 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                          {t("creator.partner.form.submitting")}
                        </>
                      ) : (
                        <>
                          <ArrowRight className="mr-3 h-5 w-5" />
                          {t("creator.partner.form.submit")}
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-600 leading-relaxed">
                    {t("creator.partner.section.form.disclaimer")}
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>¡Aplicación enviada!</DialogTitle>
            <DialogDescription>Gracias por aplicar al Programa de Creadores SAPSAP.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Nuestro equipo de partnerships revisará tu aplicación y te contactará por email dentro de 3 días hábiles. 
              También hemos enviado una confirmación a tu correo.
            </p>
            <Button onClick={() => setSuccessOpen(false)} className="w-full">
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CreatorPartnerSection;
