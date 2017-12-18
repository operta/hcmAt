import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RegionModel} from "../_models/region.model";
import {Subscription} from "rxjs/Subscription";
import {RegionsService} from "../_services/regions.service";
import {NgForm} from "@angular/forms";
import {RegionTypesService} from "../_services/regionTypes.service";
import {RegionTypeModel} from "../_models/regionType.model";
import {PaginationService} from "../_services/pagination.service";

@Component({
  selector: 'app-rg-regions',
  templateUrl: './rg-regions.component.html',
  styleUrls: ['./rg-regions.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RgRegionsComponent implements OnInit, OnDestroy {
  @ViewChild('cancelAdd') closeBtnAdd: ElementRef;
  @ViewChild('cancelEdit') closeBtnEdit: ElementRef;
  regions: RegionModel[];
  regionTypes: RegionTypeModel[];
  selectedRegionType: RegionTypeModel;
  selectedRegion: RegionModel;
  selectedParent: RegionModel;
  subscription: Subscription;
  loading: boolean = false;

  start: number;
  end: number;


  constructor(private paginationService: PaginationService, private regionsService: RegionsService, private regionTypesService: RegionTypesService) { }

  ngOnInit() {
    this.loading = true;
    this.regionTypesService.getRegionTypes().subscribe(
      (data: RegionTypeModel[]) => this.regionTypes = data
    );

    this.subscription = this.regionsService.getRegions().subscribe(
      (data: RegionModel[]) => {
        this.regions = data;
        this.loading = false;

        this.paginationService.setPages(this.regions.length);
        this.start = this.paginationService.start();
        this.paginationService.startObserver.subscribe(
          start => this.start = start
        )
        this.end = this.paginationService.end();
        this.paginationService.endObserver.subscribe(
          end => this.end = end
        );
      }
    );
  }
  onSubmit(form: NgForm){
    this.selectedRegion.code = form.value.code;
    this.selectedRegion.name = form.value.name;
    this.selectedRegion.description = form.value.description;
    this.selectedRegion.id_parent = this.selectedParent;
    this.selectedRegion.idType = this.selectedRegionType;
    this.regionsService.updateRegion(this.selectedRegion);
    this.closeEditModal();
  }

  onSubmitAdd(form: NgForm) {
    const newRegion = new RegionModel(
      null,
      form.value.code,
      form.value.name,
      form.value.description,
      this.selectedRegionType,
      this.selectedParent,
      null,
      new Date,
      null,
      new Date
    );
    console.log(newRegion);
    this.regionsService.addRegion(newRegion);
    this.closeAddModal();
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.paginationService.setPages(0);

  }

  removeRegion(region: RegionModel){
    this.regionsService.removeRegion(region);
  }

  private closeAddModal(): void {
    this.closeBtnAdd.nativeElement.click();
  }
  private closeEditModal(): void {
    this.closeBtnEdit.nativeElement.click();
  }

  onRegionTypeSelected(value: string){
    this.selectedRegionType = this.regionTypes.find(item => item.name === value);
  }

  onParentSelected(value: string){
    this.selectedParent = this.regions.find(item => item.name === value);
  }

}
