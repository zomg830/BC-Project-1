const indeed = require('./index');

const queryOptions = {
  query: 'Software',
  city: 'Seattle, WA',
  radius: '25',
  level: 'entry_level',
  jobType: 'fulltime',
  maxAge: '7',
  sort: 'date',
  limit: '100'
};

indeed.query(queryOptions).then(res => {
	console.log(res.filter(e => e.salary !== '')); // An array of Job objects
});