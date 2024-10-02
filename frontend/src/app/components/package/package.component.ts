import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Package } from '../../models/package.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from '../map/map.component';
import {PackageStatus} from "../../common/enums";

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MapComponent],
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  package: Package = {
    description: '',
    from_name: '',
    to_name: '',
    status: PackageStatus.Created,
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

  isEditMode = false;
  packageId: string | null = null;
  packageStatusEnum = PackageStatus;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.packageId = this.route.snapshot.paramMap.get('id');
    if (this.packageId) {
      this.isEditMode = true;
      this.loadPackage();
    }
  }

  loadPackage(): void {
    this.apiService.getPackageById(this.packageId!).subscribe((data: Package) => {
      this.package = data;
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.apiService.updatePackage(this.packageId!, this.package)
        .subscribe(() => {
          this.router.navigate(['/admin']);
        });
    } else {
      this.apiService.createPackage(this.package)
        .subscribe(() => {
          this.router.navigate(['/admin']);
        });
    }
  }




  onLocationSelected(location: { lat: number; lng: number }, isFrom: boolean): void {
    if (isFrom) {
      this.package.from_location = location;
    } else {
      this.package.to_location = location;
    }
  }
}
