import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should define categories array', () => {
    expect(component.categories.length).toBe(4);
    expect(component.categories[0].title).toBe('HTML');
  });


 it('should emit category title when onCategorySelect is called', () => {
   const emitSpy = jest.spyOn(component.categorySelected, 'emit');
   const category = 'JavaScript';
   component.onCategorySelect(category);

   expect(emitSpy).toHaveBeenCalledWith(
     expect.stringMatching(/^(HTML|CSS|JavaScript|Accessibility)$/)
   );
 });



  it('should render categories in the template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('img').length).toBe(4);
    expect(compiled.textContent).toContain('HTML');
    expect(compiled.textContent).toContain('CSS');
    expect(compiled.textContent).toContain('JavaScript');
    expect(compiled.textContent).toContain('Accessibility');
  });
});
