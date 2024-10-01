import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Package } from '../../models/package.model';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {
  packages: Package[] = [];
  showModal = false;
  packageToDelete: string | null = null;

  constructor(private ApiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadPackages();
  }

  loadPackages() {
    this.ApiService.getPackages()
      .subscribe((data) => {
        this.packages = data;
        this.router.navigate(['/packages'])
          .then(r => console.log(r));
    });
  }

  deletePackage(id: string) {
    this.ApiService.deletePackage(id)
      .subscribe(() => {
      this.loadPackages(); // Reload packages after deletion
    });
  }

  viewDetails(id: string) {
    this.router.navigate([`/packages/${id}/details`]);
  }

  editPackage(id: string) {
      this.router.navigate([`/packages/${id}/edit`]);
  }

  createPackage() {
      this.router.navigate([`/packages/new`]);
  }

  showDeleteModal(packageId: string) {
    this.packageToDelete = packageId;
    this.showModal = true;
  }

  proceedDelete() {
    if (this.packageToDelete) {
      this.ApiService.deletePackage(this.packageToDelete).subscribe(() => {
        this.packages = this.packages.filter(p => p._id !== this.packageToDelete);
        this.packageToDelete = null;
        this.showModal = false;
      }, error => {
        console.error('Error deleting package:', error);
        this.showModal = false;
      });
    }
  }

  cancelDelete() {
    this.packageToDelete = null;
    this.showModal = false;
  }
}
