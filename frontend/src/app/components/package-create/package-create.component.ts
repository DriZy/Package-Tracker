import { Component } from '@angular/core';
import { PackageService } from '../../services/package.service';
import { Router } from '@angular/router';
import { Package } from '../../models/package.model';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MapComponent} from "../map/map.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-package-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.scss']
})
export class PackageCreateComponent {
  package: Package = {
    active_delivery_id: '',
    package_id: '',
    description: '',
    from_name: '',
    to_name: '',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    from_address: '',
    to_address: '',
    from_location: { lat: 0, lng: 0 },
    to_location: { lat: 0, lng: 0 }
  };

  constructor(private packageService: PackageService, private router: Router) {}

  onSubmit() {
    this.packageService.createPackage(this.package)
      .subscribe(() => {
        this.router.navigate(['/packages'])
          .then(r => console.log(r));
    });
  }

  onLocationSelected(location: { lat: number; lng: number }, isFrom: boolean) {
    if (isFrom) {
      this.package.from_location = location;
    } else {
      this.package.to_location = location;
    }
  }
}
