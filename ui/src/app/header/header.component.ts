import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header>
      <div
        class="w-full bg-gradient-to-r bg-emerald-950 to-emerald-800 p-4 pl-16 text-center"
      >
        <h1 class="text-3xl font-bold text-emerald-50">task tracker 📅</h1>
      </div>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent { }
