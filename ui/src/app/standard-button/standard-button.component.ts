import { Component } from '@angular/core';

@Component({
  selector: 'button[type="submit"]',
  imports: [],
  template: `
            <div
              class="border-white border-2 rounded-lg bg-cyan-500 text-white text-sm px-2 ml-2 font-semibold hover:bg-cyan-400"
            >
              <ng-content></ng-content>
            </div>
  `,
  styles: ``
})
export class StandardButtonComponent { }
