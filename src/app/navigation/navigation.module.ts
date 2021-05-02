import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { CustomMaterialModule } from "../shared/material.module";
import { NavigationComponent } from "./navigation.component";

@NgModule({
    declarations: [
        NavigationComponent
    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        AppRoutingModule,
    ],
    exports: [
        NavigationComponent
    ]
})
export class NavigationModule {}
