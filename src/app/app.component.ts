import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { Contact } from './contact.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactFormComponent, ContactListComponent],
  template: `
  <div class="container">
      <h1>Lista de E-mails</h1>
      <app-contact-form [contactToEdit]="contactToEdit" (cancelEdit)="onCancelEdit()"></app-contact-form>
      <app-contact-list (editContact)="onEditContact($event)"></app-contact-list>
    </div>
`
})
export class AppComponent {
  contactToEdit: Contact | null = null;

  onEditContact(contact: Contact) {
    this.contactToEdit = contact;
  }

  onCancelEdit() {
    this.contactToEdit = null;
  }
}
