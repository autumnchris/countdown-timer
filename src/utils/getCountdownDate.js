import getLocalStorage from './getLocalStorage';
import setToLocalStorage from './setToLocalStorage';

export default function getCountdownDate(value) {
  if (value) setToLocalStorage('countdownDate', value);
  return getLocalStorage('countdownDate') || {
    eventNameValue: '',
    dateValue: '',
    timeValue: '',
    ampmValue: 'am'
  };
}