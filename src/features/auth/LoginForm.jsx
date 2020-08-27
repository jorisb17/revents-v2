import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalsReducer';
import { signInWithEmail } from '../../app/firestore/firebaseSerivce';

export default function LoginForm() {
	const dispatch = useDispatch();

	return (
		<ModalWrapper size='mini' header='Sign in to Re-vents'>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={Yup.object({
					email: Yup.string().required().email(),
					password: Yup.string().required(),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						await signInWithEmail(values);
						setSubmitting(false);
						dispatch(closeModal());
					} catch (error) {
						console.log(error);
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, isValid, dirty }) => (
					<Form className='ui form'>
						<MyTextInput name='email' placeholder='Email Adress' />
						<MyTextInput
							name='password'
							placeholder='Password'
							type='password'
						/>
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							fluid
							size='large'
							color='teal'
							content='Login'
						/>
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
}
