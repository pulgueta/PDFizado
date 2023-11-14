export const maxSizeAllowed = (plan: string) => {
    switch (plan) {
        case 'FREE':
            return 8388608; //! 8 * 1024 * 1024 * 8
        case 'STANDARD':
            return 16777216; //! 8 * 1024 * 1024 * 16
        case 'PROFESSIONAL':
            return 33554432; //! 8 * 1024 * 1024 * 32
        default:
            return 8388608;
    }
};

export const plan = (plan: string) => {
    switch (plan) {
        case 'FREE':
            return 'gpt-3.5-turbo-1106';
        case 'STANDARD':
            return 'gpt-4-32k';
        default:
            return 'gpt-3.5-turbo-1106';
    }
};
