
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-border/20">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="font-bold text-xl text-transparent bg-clip-text gamer-gradient">fcRivals</span>
            <p className="text-sm text-muted-foreground mt-2">© {currentYear} fcRivals. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <nav>
              <p className="font-medium mb-2">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://fcrivals.com/privacy-policy.html" className="hover:text-foreground">Privacy</a></li>
                <li><a href="https://fcrivals.com/terms.pdf" className="hover:text-foreground">Terms</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
