export const getUserQuery = `
query getUser($email: String) {
    user(by: {email : $email}) {
      name
      email
      avatarUrl
      description
      githubUrl
      linkedInUrl
      id
    }
  }
`;

export const createUserMutation = `
mutation UserCreate($input : UserCreateInput!) { 
    userCreate(input: $input) {
      user {
        name
        email
        avatarUrl
        description
        githubUrl
        linkedInUrl
        id
      }
    }
  }
`;
