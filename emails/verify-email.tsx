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
import { Section } from '@react-email/section';

interface VerifyEmailProps {
	link: string;
}

export default function VerifyEmailTemplate({ link }: VerifyEmailProps) {
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
			<Body style={styles.main}>
				<Container style={styles.container}>
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
					<Heading as='h2' style={styles.heading}>
						Verificación de correo electrónico
					</Heading>
					<Hr />
					<Text style={styles.subHeading}>Estimado usuario</Text>
					<Text style={styles.text}>
						Para poder utilizar tu cuenta, debes verificar tu correo
						haciendo click en el siguiente botón.
					</Text>

					<Link href={link} style={styles.button}>
						Click aquí
					</Link>

					<Text style={styles.text}>Atentamente,</Text>
					<Text style={styles.text}>El equipo de PDFizado.</Text>
					<Section
						style={{
							display: 'flex',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '0.5rem',
							color: '#e21d48',
							fontSize: '12px',
							margin: '1.6rem 0',
						}}
					>
						<Link
							href='https://www.pdfizado.com/dashboard'
							style={{
								color: '#e21d48',
								fontWeight: 'semibold',
								textDecoration: 'none',
							}}
						>
							Dashboard
						</Link>{' '}
						•{' '}
						<Link
							href='https://www.pdfizado.com/terms-of-service'
							style={{
								color: '#e21d48',
								fontWeight: 'semibold',
								textDecoration: 'none',
							}}
						>
							Términos y condiciones
						</Link>
					</Section>
					<Text style={styles.footerCopyright}>
						Copyright &copy; {new Date().getFullYear()} PDFizado
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

const styles = {
	main: {
		fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
		backgroundColor: '#ffffff',
		border: '1px solid #b3b3b3',
		borderRadius: '8px',
		maxWidth: '600px',
		margin: '0 auto',
	},

	container: {
		margin: '0 auto',
		padding: '32px 16px',
		width: '600px',
	},

	button: {
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
		textAlign: 'center' as const,
		margin: '1rem auto',
	},

	heading: {
		fontSize: '24px',
		fontWeight: '700',
		letterSpacing: '-0.025em',
		lineHeight: '32px',
		color: '#1c1917',
	},

	subHeading: {
		fontSize: '18px',
		fontWeight: '700',
		letterSpacing: '-0.025em',
		lineHeight: '32px',
		color: '#1c1917',
	},

	text: {
		fontSize: '16px',
		fontWeight: '400',
		letterSpacing: '0.01em',
		lineHeight: '24px',
		color: '#1c1917',
	},

	footerCopyright: {
		margin: '8px 0 0 0',
		textAlign: 'center' as const,
		fontSize: '12px',
		color: 'rgb(102,102,102)',
	},
};
