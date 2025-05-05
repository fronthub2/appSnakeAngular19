import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxScore',
})
export class MaxScorePipe implements PipeTransform {
  transform(score: number[]): number {
    if (score.length === 0) return 0;
    return score.reduce((max, val) => (val > max ? val : max), 0);
  }
}
