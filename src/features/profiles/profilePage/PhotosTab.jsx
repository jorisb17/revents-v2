import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Grid, Header, Button, Tab, Card, Image } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseSerivce';
import { deletePhotoFromCollection, getUserPhotos, setMainPhoto } from '../../../app/firestore/firestoreService';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'
import { listenToUserPhotos } from '../profileActions';

export default function PhotosTab({ profile, isCurrentUser }) {
	const [editMode, setEditMode] = useState(false);
	const dispatch = useDispatch();
	const {loading} = useSelector(state => state.async);
	const {photos} = useSelector(state => state.profile);
	const [updating, setUpdating] = useState({isUpdating: false, target:null});
	const [deleting, setDeleting] = useState({isDeleting: false, target:null});

	useFirestoreCollection({
		query: () => getUserPhotos(profile.id),
		data: photos => dispatch(listenToUserPhotos(photos)),
		deps: [profile.id, dispatch]
	})

	async function handleSetMainPhoto(photo, target){
		setUpdating({isUpdating: true, target});
		try {
			await setMainPhoto(photo);
		} catch (error) {
			toast.error(error.message);
		}finally {
			setUpdating({isUpdating: false, targer:null});
		}
	} 

	async function handleDeletePhoto(photo, target) {
		setDeleting({isDeleting: true, target});
		try {
			await deleteFromFirebaseStorage(photo.name);
			await deletePhotoFromCollection(photo.id);
		} catch (error) {
			toast.error(error.message);
		}finally {
			setDeleting({isDeleting: false, targer:null});
		}
	}

	return (
		<Tab.Pane loading={loading}>
			<Grid>
				<Grid.Column width={16}>
					<Header
						floated='left'
						icon='photo'
						content={`Photos`}
					/>
					{isCurrentUser && (
						<Button
							onClick={() => setEditMode(!editMode)}
							floated='right'
							content={editMode ? 'Cancel' : 'Add Photo'}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{editMode ? (
						<PhotoUploadWidget setEditMode={setEditMode} />
					) : (
						<Card.Group itemsPerRow={5}>
							{photos.map(photo => (
								<Card key={photo.id}>
                                	<Image src={photo.url} />
                                	<Button.Group fluid widths={2}>
                                   	 	<Button name={photo.id} disabled={photo.url === profile.photoURL}  loading={updating.isUpdating && updating.target === photo.id} onClick={(e) => handleSetMainPhoto(photo, e.target.name)} basic color='green' content='Main' />
                                   	 	<Button name={photo.id} disabled={photo.url === profile.photoURL} loading={deleting.isDeleting && deleting.target === photo.id} onClick={(e) => handleDeletePhoto(photo, e.target.name)} basic color='red' icon='trash' />
                               	 	</Button.Group>
                            	</Card>
							))}
                        </Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
}
