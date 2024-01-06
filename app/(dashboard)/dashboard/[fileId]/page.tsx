import { NextPage } from 'next';
import { notFound } from 'next/navigation';

import { Chat } from '~/components/client/chat/chat';
import { db } from '~/database/db';
import { currentUser } from '~/lib/auth/currentUser';

type ChatParams = {
	params: {
		fileId: string;
	};
};

const ChatPage: NextPage<ChatParams> = async ({ params }) => {
	const user = await currentUser();

	const file = await db.file.findUnique({
		where: {
			userId: user?.id,
			id: params.fileId,
		},
	});

	if (!file) notFound();

	return (
		<div className='flex h-[calc(100vh-80px)] flex-col md:flex-row'>
			<iframe
				src={`https://docs.google.com/gview?url=${file.url}&embedded=true`}
				className='flex-1'
			></iframe>

			<Chat fileId={file.id} />
		</div>
	);
};
export default ChatPage;
