export class StringHelper {
  private constructor() {}

  public static capitalize(text: string): string {
    const capitalizedWords = text
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase());

    return capitalizedWords.join(' ');
  }
}
