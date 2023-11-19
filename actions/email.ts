'use server';

export const sendEmail = async (e: FormData) => {
    const email = e.get('email') as string;

    await fetch(`${process.env.BASE_URL}/api/email`, {
        method: 'POST',
        body: JSON.stringify({ email }),
    });

    // console.log(res);
};
