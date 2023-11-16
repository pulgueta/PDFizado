import { Button } from '~/shadcn/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/shadcn/dialog';
import Dropzone from './dropzone';

const UploadPDF = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Subir PDF</Button>
            </DialogTrigger>
            <DialogContent className='max-w-xs rounded-xl md:max-w-md lg:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>Subir PDF</DialogTitle>
                </DialogHeader>
                <Dropzone />
            </DialogContent>
        </Dialog>
    );
};

export default UploadPDF;