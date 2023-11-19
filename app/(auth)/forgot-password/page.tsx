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
    return (
        <section className='flex min-h-[calc(100vh-80px)] items-center justify-center'>
            <Card className='max-w-sm'>
                <CardHeader>
                    <CardTitle>Recuperar contraseña</CardTitle>
                    <CardDescription>
                        Ingresa tu correo electrónico para enviarte un link de
                        recuperación de contraseña.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className='space-y-6'>
                        <div>
                            <Label htmlFor='email'>Correo electrónico</Label>
                            <div className='mt-2'>
                                <Input
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                />
                            </div>
                        </div>

                        <Button className='w-full'>Recuperar contraseña</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};
export default ForgotPassword;
