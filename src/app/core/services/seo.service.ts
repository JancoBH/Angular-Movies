import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

interface SeoTagsConfig {
  title: string;
  description: string;
  image: string;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private meta = inject(Meta);

  generateTags(config: Partial<SeoTagsConfig> = {}) {
    const tags: SeoTagsConfig = {
      title: 'Angular Movies and Series',
      description: 'My SEO friendly Angular Component',
      image: 'https://angular-movies-c91ba.firebaseapp.com/images/logo.png',
      slug: '',
      ...config
    };

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'AngularMovie' });
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({ property: 'og:description', content: tags.description });
    this.meta.updateTag({ property: 'og:image', content: tags.image });
    this.meta.updateTag({ property: 'og:url', content: `https://angular-movies-c91ba.firebaseapp.com/${tags.slug}` });
  }
}
