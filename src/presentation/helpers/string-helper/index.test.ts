import { StringHelper } from '.';

describe('StringHelper', () => {
  test('Should capitalize a phrase correctly', () => {
    const input = 'i am safe and sound';
    const output = StringHelper.capitalize(input);
    expect(output).toBe('I Am Safe And Sound');
  });

  test('Should capitalize a word correctly', () => {
    const input = 'contest';
    const output = StringHelper.capitalize(input);
    expect(output).toBe('Contest');
  });

  test('Should change nothing when the phrase is already capitalized', () => {
    const input = 'This Phrase Is Capitalized';
    const output = StringHelper.capitalize(input);
    expect(output).toBe(input);
  });
});
