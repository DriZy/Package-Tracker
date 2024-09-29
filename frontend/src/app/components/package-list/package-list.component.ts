import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package.service';
import { Package } from '../../models/package.model';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {
  packages: Package[] = [];

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.packageService.getPackages().subscribe((data) => {
      this.packages = data;
    });
  }
}
