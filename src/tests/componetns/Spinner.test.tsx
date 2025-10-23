import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { Spinner } from '../../shared/ui/Spinner';
import { describe, expect, it } from 'vitest';

describe('Spinner', () => {
    it('should render spinner loading element', () => {
        const { container } = render(<Spinner />);
        expect(container.querySelector('.spinner')).toBeTruthy();
    })
})