import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryIconComponent } from './category-icon.component';

describe('CategoryIconComponent', () => {
  let component: CategoryIconComponent;
  let fixture: ComponentFixture<CategoryIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept the input value for selectedCategory', () => {
    component.selectedCategory = 'JavaScript';
    fixture.detectChanges();
    expect(component.selectedCategory).toStrictEqual(
      expect.stringMatching(/^(HTML|CSS|JavaScript|Accessibility)$/)
    );
  });

  it('should default to an empty string if no input is provided', () => {
    expect(component.selectedCategory).toBe('');
  });

  // Helper function to check the rendering of the category
  function checkCategoryRendering(category: string, expectedImageSrc: string) {
    component.selectedCategory = category;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const imgElement = compiled.querySelector('img');
    const titleElement = compiled.querySelector('h3');

    expect(imgElement.src).toContain(expectedImageSrc);
    expect(titleElement.textContent).toBe(category);
  }

  it('should display the correct HTML template for various categories', () => {
    checkCategoryRendering('HTML', '/assets/images/icon-html.svg');
    checkCategoryRendering('CSS', '/assets/images/icon-css.svg');
    checkCategoryRendering('JavaScript', '/assets/images/icon-js.svg');
    checkCategoryRendering(
      'Accessibility',
      '/assets/images/icon-accessibility.svg'
    );
  });
});
