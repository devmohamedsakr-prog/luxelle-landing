import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NAVIGATION_LINKS } from '../../core/constants/app.constants';
import { LucideAngularModule } from 'lucide-angular';
import { LegalModalComponent, LegalSection } from '../../shared/components/ui/modal/legal-modal.component';
import { ApiDataService } from '../../core/services/api-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, LegalModalComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @ViewChild('legalModal') legalModal!: LegalModalComponent;

  private apiData = inject(ApiDataService);

  navigationLinks = NAVIGATION_LINKS;
  currentYear     = new Date().getFullYear();
  services        = this.apiData.services;

  openLegal(page: LegalSection) {
    this.legalModal.open(page);
  }
}
