import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaConsultaComponent } from './nueva-consulta/nueva-consulta.component';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { ComponentsModule } from 'src/app/shared/Components/components.module';

@NgModule({
  declarations: [
    NuevaConsultaComponent,
    ListarConsultasComponent
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgxSpinnerModule,
    ComponentsModule
  ],
  exports:[ListarConsultasComponent, NuevaConsultaComponent]
})
export class ConsultasModule { }
