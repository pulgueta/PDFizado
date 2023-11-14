import { File } from '@prisma/client';
import { SendIcon } from 'lucide-react';
import { Session, getServerSession } from 'next-auth';

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
                <div className='relative w-max rounded bg-primary px-4 py-2'>
                    <p className='text-sm text-white'>
                        Soy ChatGPT de OpenAI, estoy para ayudarte
                    </p>
                    <div className='absolute -bottom-1 left-1 -z-10 h-4 w-4 rotate-45 rounded bg-primary' />
                </div>
                <div className='relative ml-auto max-w-xl rounded bg-muted-foreground px-4 py-2 dark:bg-neutral-800'>
                    <p className='text-sm text-white'>
                        Te voy a hacer preguntas con respecto al PDF que tienes
                        actualmente abierto
                    </p>
                    <div className='absolute -bottom-1 right-1 -z-10 h-4 w-4 rotate-45 rounded bg-muted-foreground dark:bg-neutral-800' />
                </div>

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
