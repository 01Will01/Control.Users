import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { CustomMaterialModule } from "../shared/material.module";
import { ApiEExemplosComponent } from "./api-e-exemplos.component";

@NgModule({
    declarations: [
        ApiEExemplosComponent
    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        AppRoutingModule,
    ],
    exports: [
        ApiEExemplosComponent
    ]
})
export class ApiEExemplosModule {}
