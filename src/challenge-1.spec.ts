import { removeOppositeChars } from './challenge-1';

describe('removeOppositeChars', () => {
    // Add tests...

    // Test for question: What is the output for: VvbBfpPFrRyRrNpYyPDlLdVvNnMmnOCcosOoSoOfkKKkFJjyYjJWwHhnSstuBbdsSDqQUqQkKVvILlVvGgjJiVcCvvfBbvVoOGgFn ?
    test('solution', () => {
        const result = removeOppositeChars(
            'VvbBfpPFrRyRrNpYyPDlLdVvNnMmnOCcosOoSoOfkKKkFJjyYjJWwHhnSstuBbdsSDqQUqQkKVvILlVvGgjJiVcCvvfBbvVoOGgFn',
        );
        expect(result).toBe('???');
    });
});
