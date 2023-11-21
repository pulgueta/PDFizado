/* eslint-disable @next/next/no-img-element */
type ResetPasswordEmailProps = {
	user_name?: string;
	resetPasswordLink?: string;
};

const styles = {
	container: {
		margin: '0 auto',
		maxWidth: '576px',
		borderRadius: '12px',
		padding: '32px',
		border: '1px solid #b3b3b3',
		color: '#1C1917',
	},
	title: {
		fontSize: '1.875rem',
		lineHeight: '2rem',
		fontWeight: '800',
		letterSpacing: '-0.025em',
	},
	text_loose: {
		fontSize: '1.125rem',
		lineHeight: '2rem',
	},
	text_leading: {
		fontSize: '1.125rem',
		lineHeight: '2rem',
	},
	image: {
		margin: '0 auto',
		width: '96px',
		height: '96px',
		border: '1px solid #b3b3b3',
		borderRadius: '8px',
	},
	button: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '8px',
		backgroundColor: '#e21d48',
		color: '#fff',
		fontSize: '1rem',
		fontWeight: '400',
		padding: '8px 16px',
		textDecoration: 'none',
	},
	buttonContainer: {
		margin: '16px 0',
		width: '100%',
	},
};

export const ResetPasswordEmail = ({
	user_name,
	resetPasswordLink,
}: ResetPasswordEmailProps) => (
	<div style={styles.container}>
		<img
			src='https://pdfizado.s3.us-east-2.amazonaws.com/assets/icon-192x192.png'
			width={96}
			height={96}
			alt='PDFizado - Logo'
			style={styles.image}
		/>
		<section>
			<h1 style={styles.title}>Hola {user_name},</h1>
			<p style={styles.text_loose}>
				Se ha solicitado un cambio de contraseña para tu cuenta.
			</p>
			<p style={styles.text_leading}>
				Haciendo click en el siguiente botón podrás cambiar tu
				contraseña, el link expira en 24 horas.
			</p>
			<div style={styles.buttonContainer}>
				<a
					href={resetPasswordLink}
					target='_blank'
					style={styles.button}
				>
					Cambiar contraseña
				</a>
			</div>
			<p style={styles.text_leading}>
				Si no has solicitado un cambio de contraseña, puedes ignorar
				este correo.
			</p>
		</section>
	</div>
);
