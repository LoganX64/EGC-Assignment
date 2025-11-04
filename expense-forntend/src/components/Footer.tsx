import { Copyright } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Copyright className="h-4 w-4" />
          <span>{currentYear} Finance Flow. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
