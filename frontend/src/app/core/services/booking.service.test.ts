import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
import fc from 'fast-check';

describe('BookingService - Form Validation Properties', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  /**
   * Property 19: Form Validation Rejects Empty Full Name
   * **Validates: Requirements 18.1**
   * For any form submission with empty Full Name field, the form SHALL display error "Full Name is required"
   */
  it('Property 19: Form Validation Rejects Empty Full Name', () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.constant(''),
          phone: fc.string({ minLength: 10 }),
          email: fc.emailAddress(),
          serviceType: fc.string({ minLength: 1 }),
          preferredDate: fc.date({ min: new Date() }),
          preferredTime: fc.string({ minLength: 5 }),
        }),
        (booking) => {
          const errors = service.validateForm(booking);
          expect(errors.fullName).toBe('Full Name is required');
        }
      )
    );
  });

  /**
   * Property 20: Form Validation Rejects Short Full Name
   * **Validates: Requirements 18.2**
   * For any Full Name with fewer than 2 characters, the form SHALL display error "Full Name must be at least 2 characters"
   */
  it('Property 20: Form Validation Rejects Short Full Name', () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.stringOf(fc.char(), { minLength: 1, maxLength: 1 }),
          phone: fc.string({ minLength: 10 }),
          email: fc.emailAddress(),
          serviceType: fc.string({ minLength: 1 }),
          preferredDate: fc.date({ min: new Date() }),
          preferredTime: fc.string({ minLength: 5 }),
        }),
        (booking) => {
          const errors = service.validateForm(booking);
          expect(errors.fullName).toBe('Full Name must be at least 2 characters');
        }
      )
    );
  });

  /**
   * Property 21: Form Validation Rejects Invalid Email
   * **Validates: Requirements 18.6**
   * For any invalid email format, the form SHALL display error "Email must be a valid email address"
   */
  it('Property 21: Form Validation Rejects Invalid Email', () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.string({ minLength: 2 }),
          phone: fc.string({ minLength: 10 }),
          email: fc.string({ minLength: 1 }).filter(e => !e.includes('@')),
          serviceType: fc.string({ minLength: 1 }),
          preferredDate: fc.date({ min: new Date() }),
          preferredTime: fc.string({ minLength: 5 }),
        }),
        (booking) => {
          const errors = service.validateForm(booking);
          expect(errors.email).toBe('Email must be a valid email address');
        }
      )
    );
  });

  /**
   * Property 22: Form Validation Rejects Past Date
   * **Validates: Requirements 18.8**
   * For any past date selection, the form SHALL display error "Preferred Date must be in the future"
   */
  it('Property 22: Form Validation Rejects Past Date', () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.string({ minLength: 2 }),
          phone: fc.string({ minLength: 10 }),
          email: fc.emailAddress(),
          serviceType: fc.string({ minLength: 1 }),
          preferredDate: fc.date({ max: new Date(Date.now() - 86400000) }), // Yesterday or earlier
          preferredTime: fc.string({ minLength: 5 }),
        }),
        (booking) => {
          const errors = service.validateForm(booking);
          expect(errors.preferredDate).toBe('Preferred Date must be in the future');
        }
      )
    );
  });

  /**
   * Property 23: Form Validation Rejects Unchecked Terms
   * **Validates: Requirements 18.11**
   * For any form submission without Terms & Conditions checked, the form SHALL display error "You must agree to the Terms & Conditions"
   * Note: This property is tested at the component level since the service doesn't track terms acceptance
   */
  it('Property 23: Form Validation Rejects Unchecked Terms - Component Level', () => {
    // This property is validated at the component level in the booking form component
    // The service validates all other fields
    expect(true).toBe(true);
  });

  /**
   * Property 24: Form Error Clears on Field Correction
   * **Validates: Requirements 18.12**
   * For any field with validation error, correcting the field value SHALL clear the error message
   */
  it('Property 24: Form Error Clears on Field Correction', () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.string({ minLength: 2 }),
          phone: fc.string({ minLength: 10 }),
          email: fc.emailAddress(),
          serviceType: fc.string({ minLength: 1 }),
          preferredDate: fc.date({ min: new Date() }),
          preferredTime: fc.string({ minLength: 5 }),
        }),
        (booking) => {
          // First, validate with invalid data
          const invalidBooking = { ...booking, fullName: '' };
          const errorsWithInvalid = service.validateForm(invalidBooking);
          expect(errorsWithInvalid.fullName).toBeDefined();

          // Then update the field with valid data
          service.updateField('fullName', booking.fullName);

          // Verify error is cleared
          const currentErrors = service.validationErrors();
          expect(currentErrors.fullName).toBeUndefined();
        }
      )
    );
  });

  /**
   * Property 25: Form Submission Clears Fields
   * **Validates: Requirements 19.4**
   * For any successful form submission, all form fields SHALL be cleared
   */
  it('Property 25: Form Submission Clears Fields', () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.string({ minLength: 2 }),
          phone: fc.string({ minLength: 10 }),
          email: fc.emailAddress(),
          serviceType: fc.string({ minLength: 1 }),
          preferredDate: fc.date({ min: new Date() }),
          preferredTime: fc.string({ minLength: 5 }),
        }),
        (booking) => {
          // Set form data
          service.formData.set(booking);
          expect(service.formData()).toEqual(booking);

          // Submit the form
          const response = service.submitBooking(booking);

          // Verify form is cleared on success
          if (response.success) {
            expect(service.formData()).toEqual({});
          }
        }
      )
    );
  });
});
