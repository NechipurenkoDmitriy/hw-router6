import React from 'react';
import {Link, Redirect, Route, Switch, useParams} from 'react-router-dom';

const usersIds = [1, 2, 3, 5, 20];

function App() {
	return (
		<div>
			<Switch>
				<Route path="/" exact component={HomePage} />

				<Route path="/users" exact component={UsersListPage} />
				<Route path="/users/:userId?" component={UserPage} />
				<Route
					path="/users/:userId/edit"
					exact
					component={UserEditPage}
				/>
				{/* <Redirect to={'/users'} /> */}

				<Redirect from="*" to={'/'} />
			</Switch>
		</div>
	);
}

export default App;

const HomePage = () => {
	return (
		<>
			<h1>Home Page</h1>
			<Link to={'/users'}>Users List</Link>
		</>
	);
};

const UsersListPage = () => {
	return (
		<>
			<h1>UsersList Page</h1>

			<Link to={'/'}>Home</Link>
			<hr />
			{usersIds.map((id) => {
				return (
					<ul key={'ul' + id}>
						<Link key={id} to={`/users/${id}`}>
							User Page {id}
						</Link>
					</ul>
				);
			})}
		</>
	);
};

const UserPage = () => {
	const {userId} = useParams();
	return (
		<>
			<h1>User Page</h1>
			<Link to={`/users/${userId}/edit`}>Edit user {userId}</Link>{' '}
			<Link to={`/users`}>Users list</Link>
		</>
	);
};

const UserEditPage = () => {
	const {userId} = useParams();
	const filteredUsersIds = usersIds.filter((id) => String(id) !== userId);

	return (
		<>
			<h1>User Info Page</h1>
			<Link to={`/users/${userId}`}>Back to user {userId}</Link>{' '}
			<Link to={`/users`}>Users list</Link>
			<hr />
			{filteredUsersIds.map((id) => {
				return (
					<ul key={'ul' + id}>
						<Link key={id} to={`/users/${id}`}>
							User Page {id}
						</Link>
					</ul>
				);
			})}
		</>
	);
};
