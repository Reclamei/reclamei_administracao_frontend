import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(textoBase: string, tamanhoMaximo: number, adicional: string = ''): unknown {
    return textoBase.slice(0, Math.min(textoBase.length, tamanhoMaximo)) + (Math.min(textoBase.length, tamanhoMaximo) == tamanhoMaximo ? adicional : '');
  }

}
