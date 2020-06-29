import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './services/data/data.service';

interface Calc {
  origin: number;
  destiny: number;
  pricePerMinute: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input() origins: Array<number> = [];
  @Input() destinations: Array<number> = [];

  @Input() originSelected: number = 11;
  @Input() destinySelected: number = 11;
  timeSelected: number = 1;

  comFaleMais: number = 0;
  semFaleMais: number = 0;
  plan: string = 'FaleMais 30';

  valid = {
    origin: true,
    destiny: true,
    time: true,
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.origins = this.dataService.getOrigins();
    this.destinations = this.dataService.getDestinations();
  }

  validate(type: string): void {
    const timePattern = /^[0-9]/;

    if (type === 'time') {
      this.valid.time = timePattern.test(String(this.timeSelected));
    }
  }

  onKey(e: any, type: string): void {
    if (type === 'time') {
      this.timeSelected = e.target.value;
    }
    this.validate(type);
  }

  onChange(type: string, e: any) {
    if (type === 'origin') {
      this.originSelected = e.target.value;
    } else if (type === 'destiny') {
      this.destinySelected = e.target.value;
    }
  }

  calc(): Calc {
    return this.dataService
      .getData()
      .find(
        (m) =>
          m.origin === Number(this.originSelected) &&
          m.destiny === Number(this.destinySelected)
      );
  }

  changePlan(e: any): void {
    this.plan = e.target.value;
  }

  getValueWithPlan(value: number): void {
    let resultadoComFaleMais =
      this.calc().pricePerMinute * (this.timeSelected - value) * 1.1;

    const resultadoSemFaleMais =
      this.calc().pricePerMinute * Number(this.timeSelected);

    if (resultadoComFaleMais > resultadoSemFaleMais) {
      resultadoComFaleMais =
        this.calc().pricePerMinute * (this.timeSelected - value * 1.1);
    }

    this.comFaleMais = Number(resultadoComFaleMais.toFixed(3));

    this.semFaleMais = Number(resultadoSemFaleMais.toFixed(3));

    if (this.comFaleMais < 0) {
      this.comFaleMais = 0;
    } else if (this.semFaleMais < 0) {
      this.semFaleMais = 0;
    }
  }

  onSubmit(e: any): void {
    e.preventDefault();
    if (this.valid.time && this.valid.origin && this.valid.destiny) {
      if (this.plan === 'FaleMais 30') {
        this.getValueWithPlan(30);
      } else if (this.plan === 'FaleMais 60') {
        this.getValueWithPlan(60);
      } else if (this.plan === 'FaleMais 120') {
        this.getValueWithPlan(120);
      }
    }
  }
}
