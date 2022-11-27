import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { BackendService } from "@app/services/backend.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: ` <p>dashboard works!</p> `,
  styleUrls: ["./dashboard.component.scss"],
  providers: [BackendService],
})
export class DashboardComponent {
  constructor(private readonly backendService: BackendService) {}
}
