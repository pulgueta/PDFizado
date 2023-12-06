import { Message as VercelMessage } from 'ai';

export interface Message extends VercelMessage {
	id: string;
	text: string;
	isUserMessage: boolean;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	fileId: string;
}
