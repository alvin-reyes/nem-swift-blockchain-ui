import { NemSwiftbcAppPage } from './app.po';

describe('nem-swiftbc-app App', () => {
  let page: NemSwiftbcAppPage;

  beforeEach(() => {
    page = new NemSwiftbcAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
