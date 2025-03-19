
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    // <header className={cn("w-full py-6 px-4 flex justify-between items-center animate-fade-in", className)}>
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-medium tracking-tight">नेपालीटाइप</span>
        <div className="hidden md:flex h-6 w-px bg-gray-200 dark:bg-gray-700 mx-4"></div>
        <span className="hidden md:block text-sm text-muted-foreground">Nepali Type Master</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-full"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
          Settings
        </button>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
          About
        </button>
      </div>
    </header>
  );
};

export default Header;
