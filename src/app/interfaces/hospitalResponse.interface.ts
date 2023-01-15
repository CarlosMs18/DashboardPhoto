import { usuarioGetI } from "./usuarioGet.interface";

export interface hospitalGetI{
   _id : string,
   nombre : string,
   usuario : usuarioGetI,
   img? : string
}
