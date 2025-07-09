import { Component, resource } from '@angular/core';
import { Button } from '@koalarx/ui/shared/directives';

@Component({
  selector: 'app-github-stars',
  templateUrl: './github-stars.html',
  imports: [Button],
})
export class GithubStars {
  qtyStars = resource({
    defaultValue: 0,
    loader: () =>
      fetch('https://api.github.com/repos/igordrangel/koala-ui')
        .then((response) => response.json())
        .then((data) => data.stargazers_count),
  });
}
