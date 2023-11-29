import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Convert the value to a number
    const numericValue = Number(value);

    // Define the formatting based on the value
    if (numericValue < 1000) {
      return `₹ ${numericValue}`;
    } else if (numericValue < 100000) {
      // Format in thousands
      return `₹ ${(numericValue / 1000).toFixed(2)} Thousand`;
    } else if (numericValue < 10000000) {
      // Format in lakhs
      return `₹ ${(numericValue / 100000).toFixed(2)} Lakh`;
    } else {
      // Format in crores
      return `₹ ${(numericValue / 10000000).toFixed(2)} Crore`;
    }
  }
}
