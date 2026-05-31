import { Injectable, signal, computed } from '@angular/core';
import { GALLERY_IMAGES } from '../constants/app.constants';

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  src?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private images = GALLERY_IMAGES;
  selectedImage = signal<GalleryImage | null>(null);
  lightboxOpen = computed(() => this.selectedImage() !== null);
  currentImageIndex = signal(0);

  constructor() {}

  getImages(): GalleryImage[] {
    return this.images;
  }

  openLightbox(image: GalleryImage): void {
    this.selectedImage.set(image);
    const index = this.images.findIndex(img => img.id === image.id);
    this.currentImageIndex.set(index);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto';
  }

  nextImage(): void {
    const currentIndex = this.currentImageIndex();
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.currentImageIndex.set(nextIndex);
    this.selectedImage.set(this.images[nextIndex]);
  }

  previousImage(): void {
    const currentIndex = this.currentImageIndex();
    const previousIndex = (currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImageIndex.set(previousIndex);
    this.selectedImage.set(this.images[previousIndex]);
  }

  getImageByIndex(index: number): GalleryImage | undefined {
    return this.images[index];
  }
}
