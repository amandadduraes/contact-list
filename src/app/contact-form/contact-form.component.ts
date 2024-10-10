import { Component, Input  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, Contact } from '../contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  contactForm: FormGroup;
  isEditing = false;
  @Input() contactToEdit: Contact | null = null;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnChanges() {
    if (this.contactToEdit) {
      this.contactForm.patchValue(this.contactToEdit);
      this.isEditing = true;
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contact: Contact = { id: this.contactToEdit ? this.contactToEdit.id : Date.now(), ...this.contactForm.value };
      if (this.isEditing) {
        this.contactService.editContact(contact);
        this.isEditing = false;
      } else {
        this.contactService.addContact(contact);
      }
      this.contactForm.reset();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.contactToEdit = null;
    this.contactForm.reset();
  }
}
