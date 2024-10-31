import type { NextPage } from 'next';
import { notFound } from 'next/navigation';

import { Chat } from '~/components/client/chat/chat';
import { db } from '~/database/db';
import { currentUser } from '~/lib/auth/currentUser';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '~/shadcn/resizable';

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
		<ResizablePanelGroup direction='horizontal'>
			<ResizablePanel className='flex-1'>
				<iframe
					src={`https://docs.google.com/gview?url=${file.url}&embedded=true`}
					className='size-full'
				></iframe>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel>
				<Chat fileId={file.id} />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};
export default ChatPage;
