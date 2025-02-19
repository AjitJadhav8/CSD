import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {



  constructor(private dataService: DataService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchMasterCategories();
    this.fetchCustomers();
  }

  // ------------------ Customer ------------------------
  
  customers: any[] = [];
  customer = {
    customerName: '',
    companyWebsite: '',
    email: '',
    phone: '',
    alternatePhone: '',
    status: '',
    sector: '',
    industry: '',
    domain: '',
    customerType: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    description: ''
  };
  submitCustomer() {
    const customerData = {
      customerName: this.customer.customerName,
      companyWebsite: this.customer.companyWebsite,
      email: this.customer.email,
      phone: this.customer.phone,
      alternatePhone: this.customer.alternatePhone,
      status: this.customer.status,
      domain: this.selectedDomain, // Ensure domain is sent correctly
      customerType: this.customer.customerType,
      city: this.customer.city,
      state: this.customer.state,
      pincode: this.customer.pincode,
      country: this.customer.country,
      description: this.customer.description
    };

    console.log('Sending customer data:', customerData);

    this.dataService.createCustomer(customerData).subscribe({
      next: (response) => console.log('Customer added successfully', response),
      error: (error) => console.error('Error adding customer:', error)
    });
  }

  fetchCustomers(): void {
    this.dataService.getCustomers().subscribe({
      next: (data) => {
        console.log('Fetched customers:', data);
        this.customers = data;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  deleteCustomer(customerId: number): void {
    this.dataService.softDeleteCustomer(customerId).subscribe({
      next: (response) => {
        console.log('Customer soft deleted:', response);
        this.fetchCustomers();
      },
      error: (error) => {
        console.error('Error deleting customer:', error);
      }
    });
  }

  // ------------------ Customer Category ------------------------

  sectors: string[] = [];
  industries: string[] = [];
  domains: string[] = [];
  selectedSector: string = '';
  selectedIndustry: string = '';
  selectedDomain: string = '';
  allCategories: any[] = []; 


  fetchMasterCategories(): void {
    this.dataService.getMasterCategories().subscribe(
      (data) => {
        console.log('Master categories fetched successfully:', data);
        this.allCategories = data.categories || [];
        this.sectors = [...new Set(this.allCategories.map(item => item.sector))];  // Extract unique sectors
      },
      (error) => {
        console.error('Error fetching master categories:', error);
      }
    );
  }

  deleteCategory(categoryId: number): void {
    console.log('Deleting category with ID:', categoryId); // Debugging

    if (confirm('Are you sure you want to delete this category?')) {
      this.dataService.deleteCategory(categoryId).subscribe(
        () => {
          console.log('category deleted successfully');
          this.fetchMasterCategories(); // Refresh list after deletion
          this.filterIndustries(); // Reset industry & domain list

        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }

  filterIndustries(): void {
    if (!this.selectedSector) {
      this.industries = [];
      this.selectedIndustry = ''; // Reset industry
      this.domains = [];
      this.selectedDomain = ''; // Reset domain
      return;
    }
  
    this.industries = [...new Set(
      this.allCategories
        .filter(item => item.sector === this.selectedSector)
        .map(item => item.industry)
    )];
  
    this.selectedIndustry = ''; // Reset selected industry
    this.domains = []; 
    this.selectedDomain = ''; // Reset domain
  }
  
  filterDomains(): void {
    if (!this.selectedIndustry) {
      this.domains = [];
      this.selectedDomain = ''; // Reset domain
      return;
    }
  
    this.domains = [...new Set(
      this.allCategories
        .filter(item => item.industry === this.selectedIndustry)
        .map(item => item.domain)
    )];
  
    this.selectedDomain = ''; // Reset domain
  }
  

  newSector: string = '';
newIndustry: string = '';
newDomain: string = '';

enableIndustryField(): void {
    if (this.newSector) {
        this.selectedSector = ''; // Reset dropdown selection if new sector is added
    }
}
enableDomainField(): void {
  if (this.newIndustry) {
      this.selectedIndustry = ''; // Reset dropdown selection if new industry is added
  }
}

saveCategory(): void {
  const category = {
      sector: this.newSector ? this.newSector : this.selectedSector,
      industry: this.newIndustry ? this.newIndustry : this.selectedIndustry,
      domain: this.newDomain ? this.newDomain : this.selectedDomain
  };

  if (!category.sector || !category.industry || !category.domain) {
      alert('Please fill all required fields.');
      return;
  }

  this.dataService.addCategory(category).subscribe(
      () => {
          console.log('Category added successfully');
          this.fetchMasterCategories(); // Refresh categories list
          this.resetCategoryForm();

      },
      (error) => {
          console.error('Error adding category:', error);
      }
  );
}
resetCategoryForm(): void {
  this.selectedSector = '';
  this.selectedIndustry = '';
  this.selectedDomain = '';
  this.newSector = '';
  this.newIndustry = '';
  this.newDomain = '';
}
updateSelection(type: 'sector' | 'industry' | 'domain', isDropdown: boolean) {
  const keyNew = `new${this.capitalize(type)}` as keyof this;
  const keySelected = `selected${this.capitalize(type)}` as keyof this;

  if (isDropdown) {
      (this as any)[keyNew] = ''; // Clear textbox when dropdown is selected
  } else {
      (this as any)[keySelected] = ''; // Clear dropdown when textbox is used
  }
}

capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}





  // ------------------ Other ------------------------

  selectedSection: string = 'customer';
  showModal: boolean = false;
  showCategoryModal: boolean = false;
  toggleCategoryModal() {
    this.showCategoryModal = !this.showCategoryModal;
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }


}
