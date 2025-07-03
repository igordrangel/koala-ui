import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppContainer } from '@koalarx/ui/core/components/app-root/app-container';

@Component({
  selector: 'kl-root',
  templateUrl: './app.html',
  imports: [AppContainer, RouterOutlet],
})
export class App {
  protected title = 'doc';
}
