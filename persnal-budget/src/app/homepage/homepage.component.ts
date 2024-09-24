import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary components

// Register the necessary Chart.js components
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
      {
        data: [] as number[],  // Ensure 'data' is an array of numbers
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
        ]
      }
    ],
    labels: [] as string[]    // Ensure 'labels' is an array of strings
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      const budgetData = res.myBudget;

      // Fill dataSource with values from the response
      this.dataSource.datasets[0].data = budgetData.map((item: any) => item.budget);
      this.dataSource.labels = budgetData.map((item: any) => item.title);

      // Create chart after the data is populated
      this.createChart();
    });
  }

  createChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement; // Type assertion for canvas
    if (canvas) {
      const ctx = canvas.getContext('2d');  // Ensure 'ctx' is properly typed
      if (ctx) {
        const myPieChart = new Chart(ctx, {
          type: 'pie',   // Define the type of chart
          data: this.dataSource,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                enabled: true
              }
            }
          }
        });
      } else {
        console.error("Could not get 2D context for chart.");
      }
    } else {
      console.error("Canvas element with id 'myChart' not found.");
    }
  }
}
