/**
 * Challenge 1
 *
 * You start with a string consisting of uppercase and lowercase letters (example: dabAcCaCBAcCcaDA.)
 * We want you to write a function that takes a string and removes all characters that are followed by the same character of the
 * opposite case. The rules are:
 *
 * For input: "aA", a and A are of the opposite case, returning an empty string.
 * For input: "abBA", bB are of the opposite case, leaving aA. As above, this is also removed, returning an empty string as well.
 * For input: "abAB", no two adjacent characters are of the same type, so the same string is returned.
 * For input: "aabAAB", even though aa and AA are the same character, their cases match, and so nothing happens.
 * Now, consider a larger example, dabAcCaCBAcCcaDA:
 *
 *   - dabAcCaCBAcCcaDA  The first 'cC' is removed.
 *   - dabAaCBAcCcaDA    This creates 'Aa', which is removed.
 *   - dabCBAcCcaDA      Either 'cC' or 'Cc' are removed (the result is the same).
 *   - dabCBAcaDA        No further actions can be taken.
 *
 * What is the solution for: "VvbBfpPFrRyRrNpYyPDlLdVvNnMmnOCcosOoSoOfkKKkFJjyYjJWwHhnSstuBbdsSDqQUqQkKVvILlVvGgjJiVcCvvfBbvVoOGgFn"?
 *
 * Bonus points if you can find the solution for the string found in challenge-1-input.ts
 */

export const removeOppositeChars = (input: string): string => {
    return input;
};
