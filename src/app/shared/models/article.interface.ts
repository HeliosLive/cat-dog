interface User {
  picture: string;
  name: string;
}

export interface Article {
  user: User;
  image: string;
  description: string;
  date: Date;
}
