import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.css'],
})
export class PrototypeComponent implements OnInit {
  control: FormControl;

  myControl = new FormControl();
  categoryControl = new FormControl();
  keyWord = new FormControl();
  utmSource = new FormControl();
  utmMedium = new FormControl();
  utmCampaign = new FormControl();
  httpReferer = new FormControl();

  utmSource2 = new FormControl();
  utmMedium2 = new FormControl();
  utmCampaign2 = new FormControl();
  httpReferer2 = new FormControl();

  options: any = [];
  filteredOptions: any;
  categories: any = this.getCategoryList();
  redirectionUrl: any;
  zipCodeSearch: any;

  private location: Location;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    console.log('app started', document.referrer, 'wat?');
    this.control = fb.control({value: 'my val', disabled: false});
    let ref = document.referrer || '';
    console.log('origin', window.location.origin);
    if (ref && ref.indexOf(window.location.hostname) === -1) {
      this.httpReferer2.setValue(ref);
    }
  }

  ngOnInit() {
    this.myControl.valueChanges.subscribe(this.getLocations);
    this.categoryControl.valueChanges.subscribe(this.filterCats);
  }

  private getLocations = (searchTerm) => {
    console.log(searchTerm);
    if(!searchTerm) {this.filteredOptions = []; return;}
    let url = 'https://tesg-dev.newburyapps.com/TESG-3.1.1' + '/custom/searchAddress?apiKey=36FA2D82-E3B4-30CD-ACA1480C3A0FB43F&searchTerm=' + searchTerm + '&isOSCP=true';
    this.zipCodeSearch = /^\d/.test(searchTerm);
    if (this.zipCodeSearch) {
      url += '&isZipSearch=true';
    } else {
      url += '&isZipSearch=false';
    }
    this.http.get(url).subscribe((response: any) => {
      this.filteredOptions = response;
      console.log(this.filteredOptions, 'the filtered options');
    });
  };


  formSearchLink(keyword, location, utmSource, utmMedium, httpReferer, utmCampaign, url, category) {
    this.redirectionUrl = url;
    if (keyword) {
      this.redirectionUrl += '&keyword=' + encodeURIComponent(keyword);
    }
    if (location) {
      this.redirectionUrl += '&location=' + encodeURIComponent(location);
    }

    if (utmSource) {
      this.redirectionUrl += '&utm_source=' + encodeURIComponent(utmSource);
    }

    if (utmMedium) {
      this.redirectionUrl += '&utm_medium=' + encodeURIComponent(utmMedium);
    }

    if (httpReferer) {
      this.redirectionUrl += '&http_referrer=' + encodeURIComponent(httpReferer);
    }

    if (category) {
      this.redirectionUrl += '&category=' + encodeURIComponent(category);

    }
    return this.redirectionUrl;
  }


  gotToTesg(keyword, location, utmSource, utmMedium, httpReferer, utmCampaign, site, category) {
    // this.location.href(this.formSearchLink(keyword, location));
    let url = 'https://tesg-oscp.newburyapps.com/jobs?';
    if (site === 'iframe') {
      url = 'https://mohamedmahmoud299.github.io/tesg-extensions?';
    }
    window.open(this.formSearchLink(keyword, location, utmSource, utmMedium, httpReferer, utmCampaign, url, category), '_blank');
  }


  getCategoryList() {
    return [{
      id: 'Accounting/Finance',
      image: 'accounting-header.jpg'
    }, {
      id: 'Creative & Digital',
      image: 'creative-header.jpg'
    }, {
      id: 'Engineering',
      image: 'engineering-header.jpg'
    }, {
      id: 'Financial Services',
      image: 'accounting-header.jpg'
    }, {
      id: 'Financial Services - Front Office',
      image: 'accounting-header.jpg'
    }, {
      id: 'Healthcare',
      image: 'healthcare-header.jpg'
    }, {
      id: 'Human Resources',
      image: 'search-results-header.jpg'
    }, {
      id: 'Legal Services',
      image: 'search-results-header.jpg'
    }, {
      id: 'Nonprofit',
      image: 'search-results-header.jpg'
    }, {
      id: 'Office Support',
      image: 'search-results-header.jpg'
    }, {
      id: 'Pharma',
      image: 'pharma-header.jpg'
    }, {
      id: 'Technology',
      image: 'technology-header.jpg'
    }];
  }

  filterCats = (searchTerm) =>{
    let cats = this.getCategoryList();
    this.categories = cats.filter((cat) => {
      return cat.id.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

}
