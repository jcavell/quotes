interface AuthConfiguration {
    clientID: string;
    domain: string;
  callbackURL: string;
}

export const myConfig: AuthConfiguration = {
    clientID: 'O7eU021Nw42_Cu7Et-BrRM44IPdbrknu',
    domain: 'jcavell.eu.auth0.com',
  // You may need to change this!
  callbackURL: 'http://localhost:4200/'
};
