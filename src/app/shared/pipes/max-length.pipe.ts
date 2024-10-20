import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

    transform(text: string, maxLength: number, add: string = ''): unknown {
        return text.slice(0, Math.min(text.length, maxLength)) + (Math.min(text.length, maxLength) === maxLength ? add : '');
    }
}
