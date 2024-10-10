import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Contact {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsSubject = new BehaviorSubject<Contact[]>(this.loadContacts());
  contacts$ = this.contactsSubject.asObservable();

  private saveContacts(contacts: Contact[]) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  private loadContacts(): Contact[] {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('contacts') || '[]');
    }
    return []; // Retorna um array vazio se localStorage não estiver disponível
  }

  addContact(contact: Contact) {
    const contacts = this.contactsSubject.getValue();
    contacts.push(contact);
    this.saveContacts(contacts);
    this.contactsSubject.next(contacts);
  }

  editContact(updatedContact: Contact) {
    const contacts = this.contactsSubject.getValue().map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    this.saveContacts(contacts);
    this.contactsSubject.next(contacts);
  }

  deleteContact(contactId: number) {
    const contacts = this.contactsSubject.getValue().filter(contact => contact.id !== contactId);
    this.saveContacts(contacts);
    this.contactsSubject.next(contacts);
  }

  filterContacts(searchTerm: string) {
    const allContacts = this.loadContacts();
    const filteredContacts = allContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.contactsSubject.next(filteredContacts);
  }


}
