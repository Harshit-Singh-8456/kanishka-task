import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as AngularDatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | Date | null | undefined, format: string = 'MMM dd, yyyy'): string {
    if (value == null) {
      return ''; // Return an empty string for null or undefined values
    }

    const parsedDate = new Date(value);
    const angularDatePipe = new AngularDatePipe('en-US');
    return angularDatePipe.transform(parsedDate, format) || ''; // Handle the case where angularDatePipe.transform returns null
  }
}
