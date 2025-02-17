import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  sectors: string[] = [];
  industries: string[] = [];
  domains: string[] = [];
  selectedSector: string = '';
  selectedIndustry: string = '';
  selectedDomain: string = '';
  allCategories: any[] = [];  // To store all categories fetched from the backend.
  customers: any[] = [];

  constructor(private dataService: DataService,private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMasterCategories();
    this.loadCustomers();

  }

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

  // Filter industries based on selected sector
  filterIndustries(): void {
    if (!this.selectedSector) {
      this.industries = [];  // Reset industries if no sector is selected
      return;
    }
    // Filter industries based on selected sector
    this.industries = this.allCategories
      .filter(item => item.sector === this.selectedSector)
      .map(item => item.industry);
  }

  // Filter domains based on selected industry
  filterDomains(): void {
    if (!this.selectedIndustry) {
      this.domains = [];  // Reset domains if no industry is selected
      return;
    }
    // Filter domains based on selected industry
    this.domains = this.allCategories
      .filter(item => item.industry === this.selectedIndustry)
      .map(item => item.domain);
  }


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
  submitForm() {
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

loadCustomers(): void {
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





















  showModal: boolean = false;
  
  showDomainModal: boolean = false;

  toggleDomainModal() {
    this.showDomainModal = !this.showDomainModal;
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  selectedSection: string = 'customer';
  showCustomerForm: boolean = false;
  showDomainForm: boolean = false;




  customerDomains = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'Finance' }
  ];

  deleteCustomer(customerId: number): void {
    this.dataService.softDeleteCustomer(customerId).subscribe({
      next: (response) => {
        console.log('Customer soft deleted:', response);
        // After soft delete, you may update the UI by filtering the deleted customer or simply removing it from the customers list.
        this.customers = this.customers.filter(customer => customer.customer_id !== customerId);
      },
      error: (error) => {
        console.error('Error deleting customer:', error);
      }
    });
  }
  deleteDomain(id: number) {
  }












  

  selectedCustomerOption: string = '';
  // Dummy Data for Table
  dummyCustomers = [
    { name: 'ABC Corp', website: 'www.abccorp.com', email: 'abc@corp.com', state: 'California', country: 'USA', status: 'Active', domain: 'IT', phone: '1234567890', type: 'Corporate', city: 'Los Angeles', pincode: '90001' },
    { name: 'XYZ Ltd', website: 'www.xyzltd.com', email: 'xyz@ltd.com', state: 'New York', country: 'USA', status: 'Inactive', domain: 'Finance', phone: '9876543210', type: 'Enterprise', city: 'New York City', pincode: '10001' }
  ];
}
