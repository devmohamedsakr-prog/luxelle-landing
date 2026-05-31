import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

export interface CreatePaymentIntentRequest {
  bookingId: number;
  serviceId: number;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
}

export interface PaymentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;
  private cardElementReady = false;

  constructor(private http: HttpClient) {
    this.initializeStripe();
  }

  private async initializeStripe(): Promise<void> {
    try {
      this.stripe = await loadStripe(environment.stripePublishableKey);
      console.log('Stripe loaded successfully');
    } catch (error) {
      console.error('Failed to load Stripe:', error);
      throw error;
    }
  }

  async initializeCardElement(): Promise<void> {
    try {
      console.log('Starting card element initialization...');
      
      // Ensure Stripe is loaded
      if (!this.stripe) {
        console.log('Stripe not loaded, initializing...');
        await this.initializeStripe();
      }

      // Create elements instance if not exists
      if (!this.elements) {
        console.log('Creating Stripe elements instance...');
        this.elements = this.stripe!.elements();
      }

      // Create card element if not exists
      if (!this.cardElement) {
        console.log('Creating card element...');
        
        // Verify container exists
        const cardElementDiv = document.getElementById('card-element');
        if (!cardElementDiv) {
          throw new Error('Card element container #card-element not found in DOM');
        }
        console.log('Card element container found in DOM');
        console.log('Container styles:', {
          display: window.getComputedStyle(cardElementDiv).display,
          visibility: window.getComputedStyle(cardElementDiv).visibility,
          pointerEvents: window.getComputedStyle(cardElementDiv).pointerEvents,
          width: window.getComputedStyle(cardElementDiv).width,
          height: window.getComputedStyle(cardElementDiv).height
        });

        // Create card element — use the app's light text colour (#f5f0eb) so it
        // is always visible against the solid dark container (#1c1c20).
        this.cardElement = this.elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#f5f0eb',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: '500',
              lineHeight: '24px',
              '::placeholder': {
                color: '#7a736c'
              },
              iconColor: '#e8b4bc'
            },
            invalid: {
              color: '#fca5a5',
              iconColor: '#f87171'
            },
            complete: {
              color: '#f5f0eb',
              iconColor: '#e8b4bc'
            }
          },
          hidePostalCode: true
        });

        // Mount the element
        console.log('Mounting card element to DOM...');
        this.cardElement.mount(cardElementDiv);

        // Wait for ready event
        await this.waitForCardElementReady();
        
        console.log('Card element initialized and ready successfully');
      } else if (!this.cardElementReady) {
        // Element exists but might not be ready yet
        await this.waitForCardElementReady();
      }
    } catch (error) {
      console.error('Failed to initialize card element:', error);
      this.cardElement = null;
      this.cardElementReady = false;
      throw error;
    }
  }

  private waitForCardElementReady(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.cardElement) {
        reject(new Error('Card element not created'));
        return;
      }

      // Set a timeout to prevent infinite waiting
      const timeout = setTimeout(() => {
        reject(new Error('Card element ready event timeout after 5 seconds'));
      }, 5000);

      // Listen for ready event
      this.cardElement!.on('ready', () => {
        clearTimeout(timeout);
        this.cardElementReady = true;
        console.log('Card element ready event received');
        resolve();
      });

      // Listen for change events to show errors
      // Only show error if user has started typing (complete is false and empty is false)
      this.cardElement!.on('change', (event: any) => {
        const displayError = document.getElementById('card-error-text');
        const errorIcon = document.getElementById('card-error-icon');
        if (displayError && errorIcon) {
          // Only show error if:
          // 1. There's an actual error, AND
          // 2. The field is not empty (user has started typing)
          if (event.error && !event.empty) {
            displayError.textContent = event.error.message;
            errorIcon.classList.remove('hidden');
            console.error('Card element error:', event.error.message);
          } else {
            displayError.textContent = '';
            errorIcon.classList.add('hidden');
          }
        }
      });
    });
  }

  async createPaymentIntent(request: CreatePaymentIntentRequest): Promise<PaymentResponse> {
    try {
      const response = await this.http.post<PaymentResponse>(
        `${environment.apiUrl}/payments/create-payment-intent`,
        request
      ).toPromise();
      return response!;
    } catch (error: any) {
      console.error('Payment intent creation error:', error);
      throw new Error(error?.error?.error || error?.message || 'Failed to create payment intent');
    }
  }

  async confirmPayment(clientSecret: string): Promise<any> {
    console.log('confirmPayment called with clientSecret:', clientSecret);
    
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    if (!this.cardElement) {
      throw new Error('Card element not created');
    }

    if (!this.cardElementReady) {
      throw new Error('Card element not ready - please wait for the payment form to load');
    }

    console.log('Card element is ready, confirming payment...');
    
    try {
      const result = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.cardElement,
          billing_details: {
            name: 'Customer'
          }
        }
      });
      
      console.log('Payment confirmation result:', result);
      return result;
    } catch (error) {
      console.error('Error during payment confirmation:', error);
      throw error;
    }
  }

  async confirmPaymentStatus(paymentIntentId: string): Promise<{ success: boolean; paymentIntentId: string }> {
    try {
      const response = await this.http.get<{ success: boolean; paymentIntentId: string }>(
        `${environment.apiUrl}/payments/confirm-payment/${paymentIntentId}`
      ).toPromise();
      return response!;
    } catch (error: any) {
      console.error('Payment status confirmation error:', error);
      throw new Error(error?.error?.error || error?.message || 'Failed to confirm payment status');
    }
  }

  getPublishableKey(): Promise<{ publishableKey: string }> {
    return this.http.get<{ publishableKey: string }>(
      `${environment.apiUrl}/payments/publishable-key`
    ).toPromise() as Promise<{ publishableKey: string }>;
  }

  destroyCardElement(): void {
    if (this.cardElement) {
      this.cardElement.destroy();
      this.cardElement = null;
      this.cardElementReady = false;
    }
  }

  isCardElementReady(): boolean {
    return this.cardElementReady && this.cardElement !== null;
  }
}
