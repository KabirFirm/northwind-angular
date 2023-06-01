//import {isNumber} from './type-check-util';

export function enumToKey(e1:object, e: string | number): string {
  return Object.keys(e1)[Object.values(e1).indexOf(e)];
}

export function toInteger(value: string) {
  return parseInt(value, 10);
}

export function numberToString(value: string): number {
  return Number(value.toString());
}

export function toString(value) {
  return (value !== undefined && value !== null) ? '' + value : '';
}

export function getValueInRange(value, max, min) {
  if (min === void 0) { min = 0; }
  return Math.max(Math.min(value, max), min);
}

export function padNumber(value): string {
  //if (isNumber(value)) {
  if (value) {
    return ('0' + value).slice(-2);
  }
  else {
    return '';
  }
}

export function regExpEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
