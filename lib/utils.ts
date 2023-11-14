import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const ascii = (inputString: string) =>
    inputString.replace(/[^\x00-\x7F]+/g, '');
