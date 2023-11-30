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
      return `₹ ${numericValue.toFixed(2)}`;
    } else if (numericValue < 100000) {
      // Format in thousands
      const formattedValue = (numericValue / 1000).toFixed(2);
      return `₹ ${formattedValue.endsWith('.00') ? formattedValue.slice(0, -3) : formattedValue} Thousand`;
    } else if (numericValue < 10000000) {
      // Format in lakhs
      const formattedValue = (numericValue / 100000).toFixed(2);
      return `₹ ${formattedValue.endsWith('.00') ? formattedValue.slice(0, -3) : formattedValue} Lakh`;
    } else {
      // Format in crores
      const formattedValue = (numericValue / 10000000).toFixed(2);
      return `₹ ${formattedValue.endsWith('.00') ? formattedValue.slice(0, -3) : formattedValue} Crore`;
    }
  }
}
