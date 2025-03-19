import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


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
    this.selectedSection = 'customer';
    localStorage.setItem('selectedCustomerSection', 'customer');
  // Load section from localStorage
  this.selectedSection = localStorage.getItem('selectedCustomerSection') || 'customer';

  // Listen for changes (e.g., when clicking Customer Categories)
  window.addEventListener('storage', this.updateSectionFromStorage.bind(this));
    this.fetchMasterCategories();
    this.fetchCustomers();

    this.dataService.getOptions().subscribe(
      (response) => {
        this.optionMasterCategory = response.masterCategory

        console.log('Roles and Departments:', response);
        this.optioRoles = response.roles;
        this.optionDepartments = response.departments;
        this.optionUsers = response.users;  // Store user data
        this.optionPositionName = response.projectRole;  // Store position data
        this.optionDesignation = response.designation;  // Store designation data
        this.optionCustomers = response.customers;  // Store customer data
        this.distinctSectors = this.getDistinctValues('sector');
        this.distinctIndustries = this.getDistinctValues('industry');
      },
      (error) => {
        console.error('Error fetching roles and departments', error);
      }
    );
  }
    // Helper method to get distinct values for a specific field
    getDistinctValues(field: string): string[] {
      const values = this.optionMasterCategory.map((category) => category[field]);
      return [...new Set(values)]; // Use Set to remove duplicates
    }
    distinctSectors: string[] = [];
    distinctIndustries: string[] = [];
  optionMasterCategory : any[] = [];
  optionCustomers: any[] = [];
  optioRoles: any[] = [];
  optionUsers: any[] = [];
  optionDepartments: any[] = [];
  optionPositionName: any[] = [];
  optionDesignation: any[] = [];


  ngOnDestroy() {
    window.removeEventListener('storage', this.updateSectionFromStorage.bind(this));
  }

  updateSectionFromStorage() {
    this.selectedSection = localStorage.getItem('selectedCustomerSection') || 'customer';
  }

  changeSection(section: string) {
    this.selectedSection = section;
    localStorage.setItem('selectedCustomerSection', section);
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
  editCustomer = {
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
  editSelectedSector: string = '';
  editSelectedIndustry: string = '';
  editSelectedDomain: string = '';
  editCustomerId: number | null = null;
  isCustomerModalOpen = false;

  // Open Edit Modal
  editCustomerModule(customer: any): void {
    // Map all fields from the selected customer to the editCustomer object
    this.editCustomer = {
      customerName: customer.customer_name,
      companyWebsite: customer.customer_company_website,
      email: customer.customer_email,
      phone: customer.customer_phone,
      alternatePhone: customer.customer_alternate_phone,
      status: customer.is_active ? 'Active' : 'Inactive',
      sector: customer.sector,
      industry: customer.industry,
      domain: customer.domain,
      customerType: customer.is_new ? 'Potential' : 'Existing',
      city: customer.customer_city,
      state: customer.customer_state,
      pincode: customer.customer_pincode,
      country: customer.customer_country,
      description: customer.customer_description
    };
  
    // Set the selected sector, industry, and domain for dropdowns
    this.editSelectedSector = customer.sector;
    this.editSelectedIndustry = customer.industry;
    this.editSelectedDomain = customer.domain;
  
    // Trigger filtering for industries and domains
    this.filterEditIndustries();
    this.filterEditDomains();
  
    // Set the customer ID for the update operation
    this.editCustomerId = customer.customer_id;
  
    // Open the edit modal
    this.isCustomerModalOpen = true;
  }
  filterEditIndustries(): void {
    if (!this.editSelectedSector) {
      this.industries = []; // Clear industries if no sector is selected
      this.editSelectedIndustry = ''; // Reset selected industry
      this.domains = []; // Clear domains
      this.editSelectedDomain = ''; // Reset selected domain
      return;
    }

    // Filter industries based on the selected sector
    this.industries = [...new Set(
      this.allCategories
        .filter(item => item.sector === this.editSelectedSector)
        .map(item => item.industry)
    )];

    // Reset selected industry and domains
    this.editSelectedIndustry = '';
    this.domains = [];
    this.editSelectedDomain = '';
  }

  filterEditDomains(): void {
    if (!this.editSelectedIndustry) {
      this.domains = []; // Clear domains if no industry is selected
      this.editSelectedDomain = ''; // Reset selected domain
      return;
    }

    // Filter domains based on the selected industry
    this.domains = [...new Set(
      this.allCategories
        .filter(item => item.industry === this.editSelectedIndustry)
        .map(item => item.domain)
    )];

    // Reset selected domain
    this.editSelectedDomain = '';
  }

  // Close Edit Modal
  closeCustomerModule(): void {
    this.isCustomerModalOpen = false;
    this.editCustomer = {
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
    this.editSelectedSector = '';
    this.editSelectedIndustry = '';
    this.editSelectedDomain = '';
    this.editCustomerId = null;
  }

  // Update Customer
  updateCustomer(editCustomerForm: NgForm): void {
    if (editCustomerForm.invalid || !this.editCustomerId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all required fields correctly!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }

    const customerData = {
      customerName: this.editCustomer.customerName,
      companyWebsite: this.editCustomer.companyWebsite,
      email: this.editCustomer.email,
      phone: this.editCustomer.phone,
      alternatePhone: this.editCustomer.alternatePhone,
      status: this.editCustomer.status,
      domain: this.editSelectedDomain,
      customerType: this.editCustomer.customerType,
      city: this.editCustomer.city,
      state: this.editCustomer.state,
      pincode: this.editCustomer.pincode,
      country: this.editCustomer.country,
      description: this.editCustomer.description
    };

    this.dataService.updateCustomer(this.editCustomerId, customerData).subscribe({
      next: (response) => {
        console.log('Customer updated successfully', response);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Customer updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        this.fetchCustomers();
        this.closeCustomerModule();
      },
      error: (error) => console.error('Error updating customer:', error)
    });
  }

  submitCustomer(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all required fields correctly!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
      return; // Stop execution if form is invalid
    }
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
      next: (response) => {
        console.log('Customer added successfully', response);
        // Toast notification at the top-right
        Swal.fire({
          toast: true,
          position: 'top-end', // Change to 'bottom-end' if you want at bottom
          icon: 'success',
          title: 'Customer added successfully!',
          showConfirmButton: false,
          timer: 3000 // Disappears after 3 seconds
        });
        this.fetchCustomers(); // Refresh the customer list
        this.resetCustomerForm(); // Reset form fields after successful submission
        form.resetForm();

      },
      error: (error) => console.error('Error adding customer:', error)
    });
  }
  resetCustomerForm() {
    this.customer = {
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
  }

  fetchCustomers(): void {
    this.dataService.getCustomers().subscribe({
      next: (data) => {
        console.log('Fetched customers:', data);
        this.customers = data;
        this.applyFilters();

      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  deleteCustomer(customerId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This customer will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.softDeleteCustomer(customerId).subscribe({
          next: (response) => {
            console.log('Customer soft deleted:', response);

            // Show toast notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Customer deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });

            this.fetchCustomers();
          },
          error: (error) => {
            console.error('Error deleting customer:', error);
          }
        });
      }
    });
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
  
  // Function to reset form fields
  filteredCustomers: any[] = [];
  paginatedCustomers: any[] = [];

  // Filters
  customerNameFilter: string = '';
  companyWebsiteFilter: string = '';
  emailFilter: string = '';
  phoneFilter: string = '';
  alternatePhoneFilter: string = '';
  statusFilter: string = '';
  sectorFilter: string = '';
  industryFilter: string = '';
  domainFilter: string = '';
  customerTypeFilter: string = '';
  cityFilter: string = '';
  stateFilter: string = '';
  pincodeFilter: string = '';
  countryFilter: string = '';
  descriptionFilter: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5;

// Apply Filters
applyFilters(): void {
  this.filteredCustomers = this.customers.filter((customer) => {
    return (
      (this.customerNameFilter
        ? customer.customer_id.toString() === this.customerNameFilter
        : true) &&
      (this.companyWebsiteFilter
        ? customer.customer_company_website?.toLowerCase().includes(this.companyWebsiteFilter.toLowerCase())
        : true) &&
      (this.emailFilter
        ? customer.customer_email?.toLowerCase().includes(this.emailFilter.toLowerCase())
        : true) &&
      (this.phoneFilter
        ? customer.customer_phone?.includes(this.phoneFilter)
        : true) &&
      (this.alternatePhoneFilter
        ? customer.customer_alternate_phone?.includes(this.alternatePhoneFilter)
        : true) &&
        (this.statusFilter
          ? (customer.is_active ? 'Active' : 'Inactive') === this.statusFilter
          : true) &&
          (this.sectorFilter
            ? customer.sector === this.sectorFilter
            : true) &&
          (this.industryFilter
            ? customer.industry === this.industryFilter
            : true) &&
          (this.domainFilter
            ? customer.domain === this.domainFilter
            : true) &&
        (this.customerTypeFilter
          ? (customer.is_new ? 'Potential' : 'Existing') === this.customerTypeFilter
          : true) &&
      (this.cityFilter
        ? customer.customer_city?.toLowerCase().includes(this.cityFilter.toLowerCase())
        : true) &&
      (this.stateFilter
        ? customer.customer_state?.toLowerCase().includes(this.stateFilter.toLowerCase())
        : true) &&
      (this.pincodeFilter
        ? customer.customer_pincode?.includes(this.pincodeFilter)
        : true) &&
      (this.countryFilter
        ? customer.customer_country?.toLowerCase().includes(this.countryFilter.toLowerCase())
        : true) &&
      (this.descriptionFilter
        ? customer.customer_description?.toLowerCase().includes(this.descriptionFilter.toLowerCase())
        : true)
    );
  });
  this.currentPage = 1;
  this.updatePage();
}
// Clear Filters
clearFilters(): void {
  this.customerNameFilter = '';
  this.customerTypeFilter = '';
  this.applyFilters();
}

// Clear Individual Filter
clearFilter(filterName: string): void {
  switch (filterName) {
    case 'customerNameFilter':
      this.customerNameFilter = '';
      break;
    case 'companyWebsiteFilter':
      this.companyWebsiteFilter = '';
      break;
    case 'emailFilter':
      this.emailFilter = '';
      break;
    case 'phoneFilter':
      this.phoneFilter = '';
      break;
    case 'alternatePhoneFilter':
      this.alternatePhoneFilter = '';
      break;
    case 'statusFilter':
      this.statusFilter = '';
      break;
    case 'sectorFilter':
      this.sectorFilter = '';
      break;
    case 'industryFilter':
      this.industryFilter = '';
      break;
    case 'domainFilter':
      this.domainFilter = '';
      break;
    case 'customerTypeFilter':
      this.customerTypeFilter = '';
      break;
    case 'cityFilter':
      this.cityFilter = '';
      break;
    case 'stateFilter':
      this.stateFilter = '';
      break;
    case 'pincodeFilter':
      this.pincodeFilter = '';
      break;
    case 'countryFilter':
      this.countryFilter = '';
      break;
    case 'descriptionFilter':
      this.descriptionFilter = '';
      break;
  }
  this.applyFilters(); // Reapply filters after clearing
}

// Pagination
updatePage(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.paginatedCustomers = this.filteredCustomers.slice(startIndex, endIndex);
}

changePage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updatePage();
  }
}

get totalPages(): number {
  return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
}

getVisiblePageNumbers(): number[] {
  const totalPages = this.totalPages;
  const halfRange = Math.floor(this.maxPageButtons / 2);

  let startPage = Math.max(1, this.currentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + this.maxPageButtons - 1);

  if (endPage - startPage + 1 < this.maxPageButtons) {
    startPage = Math.max(1, endPage - this.maxPageButtons + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
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

    Swal.fire({
      title: 'Are you sure?',
      text: 'This category will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteCategory(categoryId).subscribe(
          () => {
            console.log('Category deleted successfully');

            // Toast notification after successful deletion
            Swal.fire({
              toast: true,
              position: 'top-end', // You can change to 'bottom-end'
              icon: 'success',
              title: 'Category deleted successfully!',
              showConfirmButton: false,
              timer: 3000 // Disappears after 3 seconds
            });

            this.fetchMasterCategories(); // Refresh list after deletion
            this.filterIndustries(); // Reset industry & domain list
          },
          (error) => {
            console.error('Error deleting category:', error);
          }
        );
      }
    });
  }

  saveCategory(form: NgForm): void {
    if (form.invalid) {
      Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Please fill all required fields!',
          showConfirmButton: false,
          timer: 3000
      });
      return;
  }
    const category = {
      sector: this.newSector ? this.newSector : this.selectedSector,
      industry: this.newIndustry ? this.newIndustry : this.selectedIndustry,
      domain: this.newDomain ? this.newDomain : this.selectedDomain
    };

    

    this.dataService.addCategory(category).subscribe(
      () => {
        console.log('Category added successfully');

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end', // Change to 'bottom-end' if needed
          icon: 'success',
          title: 'Category added successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.fetchMasterCategories(); // Refresh categories list
        this.resetCategoryForm();
        form.resetForm();
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
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

}
