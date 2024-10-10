import { Component, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, Contact } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  contacts$ = this.contactService.contacts$;
  searchTerm = '';

  @Output() editContact = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) {}

  onEdit(contact: Contact) {
    this.editContact.emit(contact);
  }

  onDelete(contactId: number) {
    if (confirm('Realmente deseja excluir este contato?')) {
      this.contactService.deleteContact(contactId);
    }
  }

  onSearch() {
    this.contactService.filterContacts(this.searchTerm);
  }
}
