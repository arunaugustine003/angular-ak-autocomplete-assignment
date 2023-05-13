import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutocompleteService } from '../autocomplete.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  searchQuery: string = '';
  filteredResults: any[] = [];
  results: any[] = [];
  pastSearches: any[] = [];
  allResults: any[] = [];
  showResults: boolean = false;
  searchControl: FormControl = new FormControl();

  constructor(private service:AutocompleteService) {
    this.searchControl.valueChanges.subscribe(value => {
      this.searchQuery = value;
      this.filterResults();
    });
  }
  ngOnInit() {
    this.fetchData();
  }
  
  fetchData() {
    this.service.getData().subscribe((res) => {
      this.allResults = res;
      console.log("this.allResults=",this.allResults);
      this.filteredResults = this.allResults.slice(0, 5);
    });

  }
  filterResults() {
    if (this.searchQuery.trim() === '') {
      this.filteredResults = this.pastSearches.slice(0, 5);
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredResults = this.allResults.filter(result =>
        result.name.toLowerCase().includes(query) ||
        result.email.toLowerCase().includes(query)
      ).slice(0, 5);
    }
  }

  selectResult(result: any) {
    this.pastSearches.unshift(result.name);
    this.results.push(result);
    this.showResults = true;
  }

  clearInput() {
    this.searchQuery = '';
    this.filteredResults = this.pastSearches.slice(0, 5);
    this.showResults = false;
  }

  highlightMatch(name: string): string {
    const query = this.searchQuery.toLowerCase();
    const highlightedName = name?.replace(new RegExp(query, 'gi'), match => `<strong>${match}</strong>`);
    return highlightedName;
  }
}
