import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from "./section/header/main-header/main-header.component";
import { FooterComponent } from "./section/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainHeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'house-rent-frontend';
}
