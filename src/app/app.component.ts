import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  quoteResponse: any;
  quote: string = '';
  author: string = '';

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getData().subscribe((response) => {
      this.quoteResponse = response[0];
      console.log(this.quoteResponse);
      this.quote = this.quoteResponse.content;
      this.author = this.whoSaidIt(this.quoteResponse.author);

      console.log(this.quote);
      console.log(this.author);
    });
  }

  whoSaidIt(name: string): string {
    return `by ${name}.`;
  }
}
