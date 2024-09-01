import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'cnpj'
})
export class CnpjPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return '';
        }
        // Remove qualquer caractere que não seja dígito
        value = value.replace(/\D/g, '');

        // Formata o CNPJ
        if (value.length === 14) {
            return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
        }

        // Retorna o valor original se não for um CNPJ válido
        return value;
    }
}