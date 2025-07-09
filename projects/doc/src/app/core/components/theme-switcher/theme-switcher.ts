import { Component, effect, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { THEME_STORAGE_NAME } from '../../config/constants';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.html',
  imports: [FormsModule],
})
export class ThemeSwitcher implements OnInit {
  lightTheme = 'light';
  darkTheme = 'black';
  activeDarkMode = model<boolean>();

  constructor() {
    effect(() => {
      const activeDarkMode = this.activeDarkMode();

      if (activeDarkMode !== undefined) {
        const theme = activeDarkMode ? this.darkTheme : this.lightTheme;
        document.documentElement.setAttribute('data-theme', theme);
        this.toggleDarkMode();
        localStorage.setItem(THEME_STORAGE_NAME, theme);
      }
    });
  }

  private toggleDarkMode() {
    if (this.activeDarkMode()) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }

  ngOnInit(): void {
    const storedTheme = localStorage.getItem(THEME_STORAGE_NAME);

    if (storedTheme) {
      this.activeDarkMode.set(storedTheme === this.darkTheme);
    } else {
      this.activeDarkMode.set(
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }

    this.toggleDarkMode();
  }
}
