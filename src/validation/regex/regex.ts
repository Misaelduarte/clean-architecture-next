export const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const PHONE_REGEX = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;

export const NUMBER_REGEX = /\d/;

export const NON_NUMBER_REGEX = /\D/g;

export const ONLY_NUMBER_REGEX = /^[0-9]*$/;

export const UPPERCASE_REGEX = /[A-Z]/;

export const URL_REGEX = /^https?:\/\//;
