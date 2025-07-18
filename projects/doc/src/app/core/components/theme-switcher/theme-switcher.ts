import { Component, effect, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dropdown } from '@koalarx/ui/shared/components/dropdown';
import { Tooltip } from '@koalarx/ui/shared/directives';
import { THEME_STORAGE_NAME } from '../../config/constants';

type ThemeName =
  | 'light'
  | 'dark'
  | 'cupcake'
  | 'bumblebee'
  | 'emerald'
  | 'corporate'
  | 'synthwave'
  | 'retro'
  | 'cyberpunk'
  | 'valentine'
  | 'halloween'
  | 'garden'
  | 'forest'
  | 'aqua'
  | 'lofi'
  | 'pastel'
  | 'fantasy'
  | 'wireframe'
  | 'black'
  | 'luxury'
  | 'dracula'
  | 'cmyk'
  | 'autumn'
  | 'business'
  | 'acid'
  | 'lemonade'
  | 'night'
  | 'coffee'
  | 'winter'
  | 'dim'
  | 'nord'
  | 'sunset'
  | 'caramellatte'
  | 'abyss'
  | 'silk';

interface ThemeOption {
  isDark: boolean;
  name: ThemeName;
  active: boolean;
}

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.html',
  imports: [FormsModule, Dropdown, Tooltip],
})
export class ThemeSwitcher implements OnInit {
  lightTheme: ThemeName = 'light';
  darkTheme: ThemeName = 'dark';
  themes = signal<ThemeOption[]>([
    { isDark: false, name: 'light', active: false },
    { isDark: true, name: 'dark', active: false },
    { isDark: false, name: 'cupcake', active: false },
    { isDark: false, name: 'bumblebee', active: false },
    { isDark: false, name: 'emerald', active: false },
    { isDark: false, name: 'corporate', active: false },
    { isDark: true, name: 'synthwave', active: false },
    { isDark: false, name: 'retro', active: false },
    { isDark: false, name: 'cyberpunk', active: false },
    { isDark: false, name: 'valentine', active: false },
    { isDark: true, name: 'halloween', active: false },
    { isDark: false, name: 'garden', active: false },
    { isDark: true, name: 'forest', active: false },
    { isDark: true, name: 'aqua', active: false },
    { isDark: false, name: 'lofi', active: false },
    { isDark: false, name: 'pastel', active: false },
    { isDark: false, name: 'fantasy', active: false },
    { isDark: false, name: 'wireframe', active: false },
    { isDark: true, name: 'black', active: false },
    { isDark: true, name: 'luxury', active: false },
    { isDark: true, name: 'dracula', active: false },
    { isDark: false, name: 'cmyk', active: false },
    { isDark: false, name: 'autumn', active: false },
    { isDark: true, name: 'business', active: false },
    { isDark: false, name: 'acid', active: false },
    { isDark: false, name: 'lemonade', active: false },
    { isDark: true, name: 'night', active: false },
    { isDark: true, name: 'coffee', active: false },
    { isDark: false, name: 'winter', active: false },
    { isDark: true, name: 'dim', active: false },
    { isDark: false, name: 'nord', active: false },
    { isDark: true, name: 'sunset', active: false },
    { isDark: false, name: 'caramellatte', active: false },
    { isDark: true, name: 'abyss', active: false },
    { isDark: false, name: 'silk', active: false },
  ]);
  activeTheme = model<string>();
  activeDarkTheme = model<boolean>();

  constructor() {
    effect(() => {
      const theme = this.activeTheme();

      if (theme !== undefined) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_STORAGE_NAME, theme);
        this.toggleDarkMode();
      }
    });
  }

  private toggleDarkMode() {
    if (this.activeDarkTheme()) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme: ThemeOption) {
    this.activeTheme.set(theme.name);
    this.activeDarkTheme.set(theme.isDark);

    this.themes.update((themes) => {
      return themes.map((t) => {
        if (t.name === theme.name) {
          t.active = true;
        } else {
          t.active = false;
        }
        return t;
      });
    });
  }

  toggleDefaultTheme() {
    let themeName = this.lightTheme;

    if (this.activeDarkTheme()) {
      themeName = this.darkTheme;
    }

    const theme = this.themes().find((t) => t.name === themeName);
    if (theme) {
      this.setTheme(theme);
    }
  }

  ngOnInit(): void {
    const storedTheme = localStorage.getItem(THEME_STORAGE_NAME);
    const currentTheme = this.themes().find((t) => t.name === storedTheme);
    if (currentTheme) {
      this.setTheme(currentTheme);
    } else {
      const darkTheme = this.themes().find((t) => t.name === this.darkTheme);
      if (darkTheme) {
        this.setTheme(darkTheme);
      }
    }
  }
}
