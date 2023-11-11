import { User } from '@prisma/client';
import { Session, getServerSession } from 'next-auth';

import { Button } from '~/shadcn/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/shadcn/card';
import { db } from '~/database/db';
import { authOptions } from '~/lib/auth';

enum Plans {
    FREE = 'Gratis',
    STANDARD = 'Estándar',
    PROFESSIONAL = 'Profesional',
}

const Plan = async () => {
    const session = (await getServerSession(authOptions)) as Session | null;

    const { plan } = (await db.user.findUnique({
        where: {
            id: session?.user.id,
        },
    })) as User;

    const planType = Plans[plan] ?? 'Gratis';

    return (
        <section className='min-h-[calc(100vh-80px)] px-4 py-8'>
            <Card className='mx-auto w-80 md:w-auto md:max-w-md'>
                <CardHeader>
                    <CardTitle>Tu plan</CardTitle>
                    <CardDescription>
                        Aquí puedes ver el plan que tienes actualmente y
                        cambiarlo si lo deseas.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Tu plan actual es: {planType}</p>
                </CardContent>
                <CardFooter className='flex flex-col items-center justify-between gap-4 md:flex-row'>
                    <Button>Actualizar a Estándar</Button>
                    <Button>Actualizar a Profesional</Button>
                </CardFooter>
            </Card>
        </section>
    );
};
export default Plan;
