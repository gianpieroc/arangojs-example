import 'babel-polyfill';
import Koa from 'koa';
// import database driver and query language
import arangojs, { Database, aql } from 'arangojs';

var app = new Koa();

try {
	let db = arangojs({
		url: `http://root:root@localhost:8529`,
		databaseName: 'example'
	});

	let getDatabasesList = db.listDatabases()
		.then(names => {
			console.log(names);
	});

	let getDatabase = db.get().then(info => {
		console.log(info);
	});

	let getCollection = db.collection('User');
	console.log( getCollection );
	
	let addToQuery = db.query(aql`
	INSERT { username: 'gianpiero Costanza', email:'gianpiero.costanza@gmail.com'} IN User
	`).then( cursor => console.log(cursor._result));

	let simpleQuery = db.query(aql`
		FOR u IN User
		RETURN u
		`).then( cursor => console.log(cursor._result));

} catch (err) {
	console.error(err);

}

app.use(async (ctx) => {
	ctx.body = 'Hello world';
});

app.listen(3000);
