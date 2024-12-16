import { TestBed } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import * as quizData from '../../assets/data/data.json';
import { Quiz } from '../interfaces/quiz';

describe('QuizService', () => {
  let service: QuizService;
  const mockQuizData: Quiz[] = quizData.quizzes;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return quizzes data from the JSON file', () => {
    const quizzes = service.getQuizzes();
    expect(quizzes).not.toBeNull();
    expect(quizzes.length).toBe(mockQuizData.length);
    expect(quizzes).toEqual(mockQuizData);
  });
});
