import { Body } from '@react-email/body';
import { Html } from '@react-email/html';
import { Container } from '@react-email/container';
import { Heading } from '@react-email/heading';
import { Head } from '@react-email/head';
import { Font } from '@react-email/font';
import { Img } from '@react-email/img';
import { Text } from '@react-email/text';
import { Link } from '@react-email/link';
import { Hr } from '@react-email/hr';

interface ResetEmailProps {
	resetLink: string;
	userName: string;
}

export const ResetPasswordEmail = ({
	resetLink,
	userName = 'Usuario',
}: ResetEmailProps) => {
	return (
		<Html lang='es'>
			<Head>
				<Font
					fontFamily='Inter'
					fallbackFontFamily='Verdana'
					webFont={{
						format: 'woff2',
						url: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
					}}
				/>
			</Head>
			<Body style={main}>
				<Container style={container}>
					<Img
						src='https://pdfizado.s3.us-east-2.amazonaws.com/assets/icon-192x192.png'
						width='100'
						height='100'
						alt='PDFizado - Logo'
						style={{
							borderRadius: '8px',
							margin: '0 auto',
						}}
					/>
					<Heading as='h2' style={heading}>
						Recuperación de contraseña
					</Heading>
					<Hr />
					<Text style={subHeading}>Hola, {userName}</Text>
					<Text style={text}>
						Se ha solicitado un cambio de contraseña para tu cuenta.
					</Text>

					<Text style={text}>
						Haciendo click en el siguiente botón podrás cambiar tu
						contraseña, el link expira en 24 horas.
					</Text>

					<Link href={resetLink} style={button}>
						Click aquí
					</Link>

					<Text style={text}>
						Si no has sido tú, puedes ignorar este correo.
					</Text>
					<Text style={footerCopyright}>
						Copyright &copy; {new Date().getFullYear()} PDFizado
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

const main = {
	fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
	backgroundColor: '#ffffff',
	border: '1px solid #b3b3b3',
	borderRadius: '8px',
	maxWidth: '600px',
	margin: '0 auto',
};

const container = {
	margin: '0 auto',
	padding: '24px 12px',
	width: '600px',
};

const button = {
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '8px',
	backgroundColor: '#e21d48',
	color: '#fff',
	fontSize: '1rem',
	fontWeight: '600',
	padding: '8px 24px',
	textDecoration: 'none',
	cursor: 'pointer',
};

const heading = {
	fontSize: '24px',
	fontWeight: '700',
	letterSpacing: '-0.025em',
	lineHeight: '32px',
	color: '#1c1917',
};

const subHeading = {
	fontSize: '18px',
	fontWeight: '700',
	letterSpacing: '-0.025em',
	lineHeight: '32px',
	color: '#1c1917',
};

const text = {
	fontSize: '16px',
	fontWeight: '400',
	letterSpacing: '0.01em',
	lineHeight: '24px',
	color: '#1c1917',
};

const footerCopyright = {
	margin: '8px 0 0 0',
	textAlign: 'center' as const,
	fontSize: '12px',
	color: 'rgb(102,102,102)',
};
