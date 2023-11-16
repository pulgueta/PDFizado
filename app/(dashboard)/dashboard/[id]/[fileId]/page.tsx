import { File } from '@prisma/client';
import { SendIcon } from 'lucide-react';
import { Session, getServerSession } from 'next-auth';
import { AIMessage, UserMessage } from '~/components/server/message-bubble';

import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { db } from '~/database/db';
import { authOptions } from '~/lib/auth';

const ChatPage = async ({ params }: { params: { fileId: string } }) => {
    const session = (await getServerSession(authOptions)) as Session | null;

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
            <div className='relative flex flex-1 flex-col gap-8 p-4'>
                <AIMessage text='I am OpenAI' />
                <UserMessage text='I am the User' />

                <footer className='absolute bottom-4 flex w-11/12 items-center gap-4 md:w-[94%] lg:w-[95%] xl:w-[97%]'>
                    <Textarea className='bottom-0 w-full' />
                    <Button size='icon'>
                        <SendIcon />
                    </Button>
                </footer>
            </div>
        </div>
    );
};
export default ChatPage;
