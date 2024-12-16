import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsComponent } from './questions.component';
import * as quizData from '../../../assets/data/data.json'; // Importing the JSON data
import { Quiz } from '../../interfaces/quiz';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let compiled: HTMLElement;

  // Use the imported JSON data as the mock quiz data
  const mockQuizzes: Quiz[] = quizData.quizzes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.quizzes = mockQuizzes;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive quizzes as input', () => {
    component.quizzes = mockQuizzes;
    fixture.detectChanges();
    expect(component.quizzes).toEqual(mockQuizzes);
  });

  it('should emit quizFinished when the quiz is complete', () => {

    component.quizzes = mockQuizzes;
    component.quizIndex = 0; 

    jest.spyOn(component.quizFinished, 'emit');

    component.correctAnswersCount = 3; 
    component.quizFinished.emit(component.correctAnswersCount);
    fixture.detectChanges();

 
    expect(component.quizFinished.emit).toHaveBeenCalledWith(3);
  });

  it('should display the first question', () => {
    expect(component).toBeTruthy();

    const questionText = compiled.querySelector('.question-title')?.textContent;
    expect(questionText).toContain(mockQuizzes[0].questions[0].question);
  });

  it('should return correct letter for getLetter method', () => {
    const testCases = [
      { index: 0, expected: 'A' },
      { index: 1, expected: 'B' },
      { index: 2, expected: 'C' },
      { index: 3, expected: 'D' },
    ];

    testCases.forEach((testCase) => {
      const result = component.getLetter(testCase.index);
      expect(result).toBe(testCase.expected);
    });
  });
});
