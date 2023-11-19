import { Button } from '~/shadcn/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/shadcn/card';
import { Input } from '~/shadcn/input';
import { Label } from '~/shadcn/label';

const ForgotPassword = () => {
    const action = async (e: FormData) => {
        'use server';
        const email = e.get('email');

        console.log(email);
    };
    return (
        <section className='flex min-h-[calc(100vh-80px)] items-center justify-center'>
            <Card className='max-w-md'>
                <CardHeader>
                    <CardTitle>Recuperar contraseña</CardTitle>
                    <CardDescription>
                        Ingresa tu correo electrónico para enviarte un link de
                        recuperación de contraseña.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={action}
                        className='flex flex-col items-center gap-y-4'
                    >
                        <div className='w-full space-y-2'>
                            <Label htmlFor='email'>Correo electrónico</Label>
                            <Input
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                            />
                        </div>

                        <Button className='w-full'>Recuperar contraseña</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};
export default ForgotPassword;
