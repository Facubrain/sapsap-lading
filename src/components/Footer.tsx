import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "@/components/Logo";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-background border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo width={140} height={48} />
            </div>
            <p className="text-muted-foreground mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-primary transition-colors hover-glow-red"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors hover-glow-cyan"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-primary transition-colors hover-glow-red"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors hover-glow-cyan"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.stories')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.languages')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.pricing')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.apps')}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-secondary transition-colors">{t('footer.about')}</a></li>
              <li>
                <Link to="/creators" className="hover:text-secondary transition-colors">
                  {t('footer.creators')}
                </Link>
              </li>
              <li><a href="#" className="hover:text-secondary transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">{t('footer.press')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.help')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.community')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.blog')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 <Logo className="inline-block mx-1" width={60} height={20} />. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t('footer.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
