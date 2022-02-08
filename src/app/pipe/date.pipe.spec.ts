import { DatePipes } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipes();
    expect(pipe).toBeTruthy();
  });
});
