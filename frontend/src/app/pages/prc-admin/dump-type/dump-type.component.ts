import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DumpService } from 'src/app/services/dump.service';


@Component({
  selector: 'app-dump-type',
  templateUrl: './dump-type.component.html',
  styleUrls: ['./dump-type.component.scss']
})


export class DumpTypeComponent implements OnInit {
  typeList: dumpType[] = [];
  displayedColumns: string[] = ['dumpType', 'price', 'removeVehicle'];
  dataSource = new MatTableDataSource<dumpType>(this.typeList);
  dumpTypeFormGroup: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private dumpService: DumpService,
    private fb: FormBuilder
  ) {
    this.dumpTypeFormGroup = this.fb.group({
      dumpName: ['', Validators.required],
      price: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async ngOnInit() {
    await this.getDumpList();
  }

  getDumpList() {
    this.typeList=[];
    this.dumpService.getDumpTypeList().subscribe((dumps: any) => {
      console.log(dumps);

      dumps['allDumps'].forEach((obj: any) => {
        this.typeList.push({ dumpType: obj.DumpName, price: obj.Price, removeVehicle: '-' });
      });

      this.dataSource = new MatTableDataSource<dumpType>(this.typeList);
    });

  }

  onSubmit(): void {
    if (this.dumpTypeFormGroup.valid) {
      const formData = {
        dumpName: this.dumpTypeFormGroup.value.dumpName,
        price: this.dumpTypeFormGroup.value.price
      }
      const jsonData = JSON.stringify(formData);

      this.dumpService.dumpCreate(jsonData).subscribe(() => {
        this.onClear();
        this.getDumpList();
      });
    }

  }


  onClear(): void {
    this.dumpTypeFormGroup.reset();
  }
}
export interface dumpType {
  dumpType: string;
  price: number;
  removeVehicle: string;
}
