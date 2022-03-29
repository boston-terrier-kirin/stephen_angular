import { MatchValidator } from './match-validator';

describe('MatchPassword', () => {
  it('should create an instance', () => {
    expect(new MatchValidator()).toBeTruthy();
  });
});
