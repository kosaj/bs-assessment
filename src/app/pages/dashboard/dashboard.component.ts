import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: ` <p>dashboard works!</p> `,
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {}
