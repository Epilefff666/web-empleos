import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule}  from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [],
  exports:[
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
    
  ]
})
export class MaterialModule { }
