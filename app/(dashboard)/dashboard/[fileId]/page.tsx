import { redirect } from 'next/navigation';

import { File } from '@prisma/client';

import { auth } from '~/lib/auth';
import { Chat } from '~/components/client/chat/chat';
import { db } from '~/database/db';

const ChatPage = async ({ params }: { params: { fileId: string } }) => {
	const session = await auth();

	if (!session) {
		redirect('/login');
	}

	const file = (await db.file.findUnique({
		where: {
			userId: session?.user.id,
			id: params.fileId,
		},
	})) as File;

	return (
		<div className='flex h-[calc(100vh-80px)] flex-col md:flex-row'>
			<iframe
				src={`https://docs.google.com/gview?url=${file.url}&embedded=true`}
				className='flex-1'
			></iframe>

			<Chat />
		</div>
	);
};
export default ChatPage;
