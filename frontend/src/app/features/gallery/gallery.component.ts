import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { GALLERY_IMAGES } from '../../core/constants/app.constants';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-gallery',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollRevealDirective, LucideAngularModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  galleryImages = GALLERY_IMAGES;
  selectedImage = signal<(typeof GALLERY_IMAGES)[0] | null>(null);
  loadedImages  = signal<Set<string>>(new Set());

  trackById(_: number, item: (typeof GALLERY_IMAGES)[0]): string {
    return item.id;
  }

  isImageLoaded(id: string): boolean {
    return this.loadedImages().has(id);
  }

  onImageLoad(id: string): void {
    this.loadedImages.update(s => new Set([...s, id]));
  }

  isFeatured(index: number): boolean {
    return index === 0 || index === 5 || index === 6 || index === 7;
  }

  openLightbox(image: (typeof GALLERY_IMAGES)[0]): void {
    this.selectedImage.set(image);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImage.set(null);
    document.body.style.overflow = '';
  }
}
