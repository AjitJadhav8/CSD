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
        this.toggleModal(); // Close the modal after successful submission
        this.resetCustomerForm(); // Reset form fields after successful submission

      },
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
  // Function to reset form fields
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

  saveCategory(): void {
    const category = {
      sector: this.newSector ? this.newSector : this.selectedSector,
      industry: this.newIndustry ? this.newIndustry : this.selectedIndustry,
      domain: this.newDomain ? this.newDomain : this.selectedDomain
    };

    // Validation check
    if (!category.sector || !category.industry || !category.domain) {
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
        this.toggleModal(); // Close the modal after successful submission
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
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
