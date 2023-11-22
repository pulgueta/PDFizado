import { db } from '~/database/db';

type ResetToken = {
	searchParams: {
		token: string;
	};
};

const ResetPassword = async ({ searchParams }: ResetToken) => {
	const dbToken = await db.verificationToken.findUnique({
		where: {
			token: searchParams.token,
		},
	});

	const token = searchParams.token;

	const isTokenExpired =
		dbToken?.expires.toISOString()! < new Date().toISOString();

	return (
		<section className='flex min-h-[calc(100vh-205px)] flex-col items-center justify-center gap-y-4'>
			<pre>{JSON.stringify(dbToken, null, 2)}</pre>
			<h1>Token: {token}</h1>
			<h1>Token expiration date: {dbToken?.expires.toDateString()}</h1>
			<h1>Token is expired: {isTokenExpired ? 'Yes' : 'No'}</h1>
		</section>
	);
};
export default ResetPassword;
