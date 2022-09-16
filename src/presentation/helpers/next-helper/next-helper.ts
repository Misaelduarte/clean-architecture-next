export class NextHelper {
  private constructor() {}

  public static isOnClientSide(): boolean {
    return typeof window !== 'undefined';
  }
}
