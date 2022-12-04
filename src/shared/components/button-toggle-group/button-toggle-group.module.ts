import { NgModule } from "@angular/core";
import { VButtonToggleGroup } from "./button-toggle-group.component";
import { VButtonToggle } from "./button-toggle.directive";

@NgModule({
  imports: [VButtonToggleGroup, VButtonToggle],
  exports: [VButtonToggleGroup, VButtonToggle],
})
export class VButtonToggleGroupModule {}
