import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Sparkles, Wallet } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import heroPoster from "@/assets/video/jelous-sapsap-poster.jpg";

const CreatorPromo = () => {
  const { t } = useLanguage();

  const valueProps = [
    { icon: Sparkles, title: t("creator.partner.valueProps.0.title"), description: t("creator.partner.valueProps.0.description") },
    { icon: BadgeCheck, title: t("creator.partner.valueProps.1.title"), description: t("creator.partner.valueProps.1.description") },
    { icon: Wallet, title: t("creator.partner.valueProps.2.title"), description: t("creator.partner.valueProps.2.description") },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0">
        <img
          src={heroPoster}
          alt="Influencer creando historias para SAPSAP"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      </div>

      <div className="container relative z-10 grid gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6 text-white">
          <Badge className="bg-secondary/20 text-secondary backdrop-blur">
            {t("creator.partner.badge")}
          </Badge>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {t("creator.partner.headline")}
            </h2>
            <p className="text-xl text-white/80 md:text-2xl">
              {t("creator.partner.subheadline")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              {t("creator.partner.valueChain.0")}
            </span>
            <ArrowRight className="h-4 w-4" />
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              {t("creator.partner.valueChain.1")}
            </span>
            <ArrowRight className="h-4 w-4" />
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              {t("creator.partner.valueChain.2")}
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-secondary text-background hover:bg-secondary/90">
              <Link to="/creators">{t("creator.partner.primaryCta")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <Link to="/creators">{t("creator.partner.secondaryCta")}</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-5">
          {valueProps.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-white/20 bg-white/10 text-white backdrop-blur-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
                  <Icon className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white/70">{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorPromo;
