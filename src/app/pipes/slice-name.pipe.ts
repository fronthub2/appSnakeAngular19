import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceName',
})
export class SliceNamePipe implements PipeTransform {
  transform(name: string | null): string {
    if (!name) return 'Не определилось';

    return name.substring(0, 1);
  }
}
