export interface Message {
  id_: number;
  username:{
    id_: number;
    name: string;
    email: string;
  }
  text: string;
}
