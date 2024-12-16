import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreComponent } from './score.component';
import { CategoryIconComponent } from '../category-icon/category-icon.component';
import { Quiz } from '../../interfaces/quiz';
import * as quizData from '../../../assets/data/data.json';
import { By } from '@angular/platform-browser';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  const mockQuizzes: Quiz[] = quizData.quizzes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScoreComponent, CategoryIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    component.selectedCategory = 'HTML';
    component.quizzes = mockQuizzes;
    component.correctAnswersCount = 2;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct category and score', () => {
    const categoryIcon = fixture.debugElement.query(
      By.css('app-category-icon')
    );
    component.correctAnswersCount = 2;
    fixture.detectChanges();

    const score = fixture.debugElement.query(
      By.css('.correct-score')
    ).nativeElement;

    expect(categoryIcon).toBeTruthy();
    expect(score.textContent).toBe(`${component.correctAnswersCount}`);
    expect(Number(score.textContent)).toBeLessThanOrEqual(10);
  });

  it('should emit quizReset event when play again button is clicked', () => {
    jest.spyOn(component.quizReset, 'emit');

    const resetButton = fixture.debugElement.query(By.css('.submit-btn'));
    resetButton.triggerEventHandler('click', null);

    expect(component.quizReset.emit).toHaveBeenCalled();
  });

  it('should display 0 as the score when no correct answers are selected', () => {
    component.correctAnswersCount = 0;
    fixture.detectChanges();

    const score = fixture.debugElement.query(
      By.css('.correct-score')
    ).nativeElement;
    const quizLength = fixture.debugElement.query(
      By.css('.quiz-length')
    ).nativeElement;

    expect(score.textContent).toBe('0');
    expect(quizLength.textContent).toContain(
      mockQuizzes[0].questions.length.toString()
    );
  });
});
