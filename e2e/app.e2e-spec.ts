import { HCM2Page } from './app.po';

describe('hcm2 App', () => {
  let page: HCM2Page;

  beforeEach(() => {
    page = new HCM2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
