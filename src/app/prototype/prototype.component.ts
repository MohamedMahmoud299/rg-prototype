import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class PrototypeComponent implements OnInit {
  control: FormControl;

  myControl = new FormControl();
  keyWord = new FormControl();
  utmSource = new FormControl();
  utmMedium = new FormControl();
  httpReferer = new FormControl();
  options: any = [];
  filteredOptions: any;

  private location: Location;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.control = fb.control({value: 'my val', disabled: false});


  }

  ngOnInit() {
    this.myControl.valueChanges.subscribe(this.getLocations);
  }

  private getLocations = (searchTerm) => {
    console.log(searchTerm);
    let url = 'https://tesg-dev.newburyapps.com/TESG-3.1.1' + '/custom/searchAddress?apiKey=36FA2D82-E3B4-30CD-ACA1480C3A0FB43F&searchTerm=' + searchTerm;
    let isZipSearch = /^\d/.test(searchTerm);
    if (isZipSearch) {
      url += '&isZipSearch=true';
    } else {
      url += '&isZipSearch=false';
    }
    this.http.get(url).subscribe((response: any) => {
      this.filteredOptions = response;
      console.log(this.filteredOptions, 'the filtered options');
    });
  };


  formSearchLink(keyword, location, utmSource, utmMedium, httpReferer) {
    let url = 'https://tesg-oscp.newburyapps.com/jobs?';
    if (keyword) {
      url += '&keyword=' + keyword;
    }
    if (location) {
      url += '&location=' + location;
    }

    if (utmSource) {
      url += '&utm_source=' + utmSource;
    }

    if (utmMedium) {
      url += '&utm_medium=' + utmMedium;
    }

    if (httpReferer) {
      url += '&http_referer=' + httpReferer;
    }
    return url;
  }


  gotToTesg(keyword, location, utmSource, utmMedium, httpReferer) {
    // this.location.href(this.formSearchLink(keyword, location));
    window.location.href = this.formSearchLink(keyword, location, utmSource, utmMedium, httpReferer);
  }

}
