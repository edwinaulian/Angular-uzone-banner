import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

const PADDING = '000000';

@Pipe({
  name: 'customnumber'
})
export class CustomnumberPipe implements PipeTransform {
  private DECIMAL_SEPARATOR_INPUT: string;
  private DECIMAL_SEPARATOR_OUTPUT: string;
  private THOUSANDS_SEPARATOR: string;

  constructor() {
    // TODO comes from configuration settings
    this.DECIMAL_SEPARATOR_INPUT = '.';
    this.DECIMAL_SEPARATOR_OUTPUT = ',';
    this.THOUSANDS_SEPARATOR = '.';
  }

  public transform(rawValue: any | string, fractionSize: number = 0): string {
    let value;
    if (!_.isNull(rawValue)) {
      value = rawValue;
    } else {
      value = rawValue;
    }

    // if(!_.isNumber(value) && !_.isNull(value)) return "Invalid value";
    // else if(_.isNull(value)) return null;

    if (_.isNull(value)) {
      return null;
    }
    let [integer, fraction = ''] = (value === 0 || value ? value : '')
      .toString()
      .split(this.DECIMAL_SEPARATOR_OUTPUT);

    fraction =
      fractionSize > 0
        ? this.DECIMAL_SEPARATOR_OUTPUT +
          (fraction + PADDING).substring(0, fractionSize)
        : '';

    integer = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      this.THOUSANDS_SEPARATOR
    );

    return integer + fraction || '0';
  }

  public parse(value: string, fractionSize: number = 2): string {
    let [integer, fraction = ''] = (value || '').split(
      this.DECIMAL_SEPARATOR_OUTPUT
    );

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');

    fraction =
      parseInt(fraction, 10) > 0 && fractionSize > 0
        ? this.DECIMAL_SEPARATOR_OUTPUT +
          (fraction + PADDING).substring(0, fractionSize)
        : '';

    return integer + fraction;
  }
}
