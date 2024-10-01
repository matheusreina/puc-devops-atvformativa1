import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataService', ['getData']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: DataService, useValue: spy }],
    }).compileComponents();

    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the "random-quotes-app" title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.quote).toBe('');
    expect(app.author).toBe('');
  });

  it('should call getData and set quote and author correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const mockQuoteResponse = [
      {
        content: 'Test quote content',
        author: 'Test author',
      },
    ];

    dataServiceSpy.getData.and.returnValue(of(mockQuoteResponse));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(app.quote).toBe('Test quote content');
    expect(app.author).toBe('by Test author.');
  });

  it('should format the author name correctly with whoSaidIt', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const authorName = 'John Doe';
    const result = app.whoSaidIt(authorName);
    expect(result).toBe('by John Doe.');
  });
});
