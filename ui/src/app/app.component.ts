import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './header/header.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
        <app-header></app-header>
        <main
            id="main-content"
            class="h-full grid-cols-1 content-center justify-center bg-emerald-100 p-4 text-center"
        >
            <div
                class="inline-block w-9/12 rounded-lg border-2 border-black bg-emerald-50 p-4 text-left"
            >
                <router-outlet />
            </div>
        </main>
    `,
  // styles: './app.component.css',
})
export class AppComponent {
  title = 'task-ui'
}
