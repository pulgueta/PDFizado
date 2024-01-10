import { Button } from '~/shadcn/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/shadcn/dialog';

export const DeleteAccount = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive' className='w-full md:w-max'>
					Eliminar mi cuenta
				</Button>
			</DialogTrigger>
			<DialogContent className='w-11/12 rounded-xl md:max-w-md'>
				<DialogHeader>
					<DialogTitle>
						¿Estás seguro que deseas eliminar tu cuenta?
					</DialogTitle>
					<DialogDescription>
						Este proceso no podrá revertirse luego
					</DialogDescription>
				</DialogHeader>
				<div className='grid grid-rows-1 gap-2 md:grid-cols-2'>
					<Button variant='destructive'>Sí</Button>
					<DialogClose asChild>
						<Button variant='secondary'>No</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
};
