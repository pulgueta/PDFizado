'use server';

import { db } from '~/database/db';
import SupportEmailTemplate from '~/emails/support-email';
import { currentUser } from '~/lib/auth/currentUser';
import { resend } from '~/lib/auth/resend.config';
import { supportSchema } from '~/schemas';

type Issue = { success: boolean; message: string };

export const action = async (
	_prev: {
		success: boolean;
		message: string;
	},
	data: FormData
): Promise<Issue> => {
	const user = await currentUser();

	if (!user) return { message: 'Unauthenticated', success: false };

	const body = supportSchema.safeParse(Object.fromEntries(data.entries()));

	if (!body.success) {
		return {
			success: false,
			message: body.error.flatten().fieldErrors.issue![0],
		};
	}

	const { issue } = body.data;

	const dbIssue = await db.issue.create({
		data: {
			from: user.email!,
			issue,
		},
	});

	const { error } = await resend.emails.send({
		from: 'PDFizado <no-reply@pdfizado.com>',
		to: [user.email!],
		subject: 'PDFizado - Soporte al usuario',
		react: SupportEmailTemplate({
			id: dbIssue.id,
		}),
	});

	if (error) return { success: false, message: error.message };

	return {
		success: true,
		message: 'Tu solicitud ha sido enviada, revisa tu correo electrónico',
	};
};
