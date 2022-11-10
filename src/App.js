import React from 'react';
import {Navigate, NavLink, Route, Routes, useParams} from 'react-router-dom';

const usersIds = [1, 2, 3, 5, 20];

function App() {
	return (
		<div>
			<Routes>
				<Route index element={<HomePage />} />

				<Route path="users">
					<Route index element={<UsersListPage />} />

					<Route path=":userId" >
						<Route index element={<UserPage />} />
						<Route path="edit" element={<UserEditPage />} />
						<Route path="*"	element={<Navigate to={''} />} />
					</Route>
				</Route>

				<Route path="*" element={<Navigate to={'/'} />} />
			</Routes>
		</div>
	);
}

export default App;

const HomePage = () => {
	return (
		<>
			<h1>Home Page</h1>
			<NavLink to={'/users'}>Users List</NavLink>
		</>
	);
};

const UsersListPage = () => {
	return (
		<>
			<h1>UsersList Page</h1>

			<NavLink to={'/'}>Home</NavLink>
			<hr />
			{usersIds.map((id) => {
				return (
					<ul key={'ul'+id}>
						<NavLink key={id} to={`/users/${id}`}>
							User Page {id}
						</NavLink>
					</ul>
				);
			})}
		</>
	);
};

const UserPage = () => {
	const {userId} = useParams()
	return (
		<>
			<h1>User Page</h1>
			<NavLink to={`/users/${userId}/edit`}>Edit user {userId}</NavLink>
			{' '}
			<NavLink to={`/users`}>Users list</NavLink>
		</>
	);
};

const UserEditPage = () => {
	const {userId} = useParams()
	const filteredUsersIds = usersIds.filter((id)=>String(id) !== userId)
	
	return (
		<>
			<h1>User Info Page</h1>
			<NavLink to={`/users/${userId}`}>Back to user {userId}</NavLink>
			{' '}
			<NavLink to={`/users`}>Users list</NavLink>
			<hr/>
			{filteredUsersIds.map((id) => {
				return (
					<ul key={'ul'+id}>
						<NavLink key={id} to={`/users/${id}`}>
							User Page {id}
						</NavLink>
					</ul>
				);
			})}

		</>
	);
};

