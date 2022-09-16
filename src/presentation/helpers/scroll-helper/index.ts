export class ScrollHelper {
  private constructor() {}

  public static disableScroll(): void {
    document.body.classList.add('no-scroll');
  }

  public static enableScroll(): void {
    document.body.classList.remove('no-scroll');
  }

  public static scrollToTop(smooth = true): void {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }

  public static scrollToBottom(smooth = true): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  }
}
