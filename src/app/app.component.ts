import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true, // Indica que o componente é standalone
  imports: [RouterModule], // Importa o RouterModule diretamente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}