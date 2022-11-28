import React from 'react';
import {Link, NavLink, Redirect, Route, Switch, useParams, useRouteMatch} from 'react-router-dom';

const usersIds = [1, 2, 3, 5, 20];

function App() {
	return (
		<div>
			<Switch>
				<Route path="/users" component={UsersLayout} />
				<Route path="/" component={HomePage} />
				<Redirect to={'/'} />				
			</Switch>
		</div>
	);
}

export default App;

const UsersLayout = () => { 
	const { path } = useRouteMatch();
	return(
		<div>
			
       <Switch>
            <Route path={path + "/:userId/profile"} component={UserInfoPage} />
            <Route path={path + "/:userId/edit"} component={UserEditPage} />
            <Route path={path} exact component={UsersListPage} />
            <Redirect from={path + "/:userId"} to={path + "/:userId/profile"} />
        </Switch>       
    </div>
	)
 }

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

			<NavLink to={'/'}>Home</NavLink>
			<hr />
			{usersIds.map((id) => {
				return (
					<ul key={'ul' + id}>
						<NavLink key={id} to={`/users/${id}/profile`}>
							User Page {id}
						</NavLink>
					</ul>
				);
			})}
		</>
	);
};


const UserInfoPage = () => { 
	const {userId} = useParams();
	return (
		<>
			<h1>User Page</h1>
			<NavLink to={`/users/${userId}/edit`}>Edit user {userId}</NavLink>{' '}
			<NavLink to={`/users`}>Users list</NavLink>
		</>
	);
 }

const UserEditPage = () => {
	const {userId} = useParams();
	const filteredUsersIds = usersIds.filter((id) => String(id) !== userId);

	return (
		<>
			<h1>User Edit Page</h1>
			<NavLink to={`/users/${userId}/profile`}>Back to user {userId}</NavLink>{' '}
			<NavLink to={`/users`}>Users list</NavLink>
			<hr />
			{filteredUsersIds.map((id) => {
				return (
					<ul key={'ul' + id}>
						<NavLink key={id} to={`/users/${id}/profile`}>
							User Page {id}
						</NavLink>
					</ul>
				);
			})}
		</>
	);
};
