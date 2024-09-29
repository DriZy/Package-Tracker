import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule  // <-- Import HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
