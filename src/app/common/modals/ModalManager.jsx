import React from 'react';
import { useSelector } from 'react-redux';
import TestModal from '../../../features/sandbox/TestModal';
import LoginForm from '../../../features/auth/LoginForm';

export default function ModalManager() {
	const modalLookup = {
		TestModal,
		LoginForm,
	};
	const currentModal = useSelector((state) => state.modals);
	let renderdModal;
	if (currentModal) {
		const { modalType, modalProps } = currentModal;
		const ModalComponent = modalLookup[modalType];
		renderdModal = <ModalComponent {...modalProps} />;
	}

	return <span>{renderdModal}</span>;
}
