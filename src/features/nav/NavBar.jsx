import React, { useState } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, useHistory } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

export default function NavBar({ setFormOpen }) {
	const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);
    
    function handleSignOut() {
        setAuthenticated(false);
        history.push('/');
    }

	return (
		<Menu inverted fixed='top'>
			<Container>
				<Menu.Item as={NavLink} to='/' exact header>
					<img
						src='/assets/logo.png'
						alt='logo'
						style={{ marginRight: '15px' }}
					/>
					Revents
				</Menu.Item>
				<Menu.Item as={NavLink} to='/events' name='events' />
				{authenticated && (
					<Menu.Item as={NavLink} to='/createEvent' header>
						<Button positive inverted content='Create Event' />
					</Menu.Item>
				)}
				{authenticated ? (
					<SignedInMenu signOut={handleSignOut} />
				) : (
					<SignedOutMenu setAuthenticated={setAuthenticated} />
				)}
			</Container>
		</Menu>
	);
}
