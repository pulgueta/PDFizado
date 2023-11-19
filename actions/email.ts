'use server';

import { env } from '~/env';

export const sendEmail = async (e: FormData) => {
    const email = e.get('email');

    const res = await fetch(`${env.BASE_URL}/api/email`, {
        method: 'POST',
        body: JSON.stringify({ email }),
    });

    e.delete('email');

    console.log(res);
};
