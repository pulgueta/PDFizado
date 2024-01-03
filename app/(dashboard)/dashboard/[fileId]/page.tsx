import { File } from '@prisma/client';

import { Chat } from '~/components/client/chat/chat';
import { db } from '~/database/db';
import { currentUser } from '~/lib/auth/currentUser';

const ChatPage = async ({ params }: { params: { fileId: string } }) => {
	const user = await currentUser();

	const file = (await db.file.findUnique({
		where: {
			userId: user?.id,
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
