// Purpose: Database mock data
let comments = [
  {
    id: "1",
    comment: 'This is a comment',
    user_id: "1",
  },
  {
    id: "2",
    comment: 'This is another comment',
    user_id: "2",
  },
  {
    id: "3",
    comment: 'Oh hey, look, another comment',
    user_id: "1",
  },
];

let users = [
  {
    id: "1",
    name: 'John Doe',
    email: 'john@john.com',
    password: 'password',
    role: 'Doctor'
  },
  {
    id: "2",
    name: 'Jane Doe',
    email: 'jane@jane.com',
    password: 'password',
    role: 'Patient'
  }
]

export default { comments, users };