import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Package } from '../../models/package.model';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  selector: 'app-package-update',
  templateUrl: './package-update.component.html',
  styleUrls: ['./package-update.component.scss']
})

export class PackageUpdateComponent implements OnInit {
  package: Package = {
    _id: '',
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

  constructor(private packageService: PackageService, private router: Router, private route: ActivatedRoute ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPackageDetails(id);
    }
  }

  fetchPackageDetails(id: string) {
    this.packageService.getPackageById(id).subscribe(
      (data: Package) => {
        this.package = data;
      },
      (error) => {
        console.error('Error fetching package details:', error);
      }
    );
  }


  onSubmit() {
    this.packageService.updatePackage(this.package._id!, this.package)
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
