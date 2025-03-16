
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 mt-auto">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground mb-4 md:mb-0">
          © {new Date().getFullYear()} Nepali Type Master
        </div>
        
        <div className="flex space-x-6">
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Privacy
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Terms
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
