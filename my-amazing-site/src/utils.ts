import { format, addDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import _ from 'lodash';

export function getTodayFormatted() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getFutureDate(days: number) {
  return format(addDays(new Date(), days), 'yyyy-MM-dd');
}

export function makeUUID() {
  return uuidv4();
}

export function isEmailValid(email: string) {
  return validator.isEmail(email);
}

export function capitalizeWords(str: string) {
  return _.startCase(_.toLower(str));
}

export function sumNumbers(arr: number[]) {
  return _.sum(arr);
} 