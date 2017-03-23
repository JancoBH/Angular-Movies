import { AngularMoviesPage } from './app.po';

describe('angular-movies App', () => {
  let page: AngularMoviesPage;

  beforeEach(() => {
    page = new AngularMoviesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
