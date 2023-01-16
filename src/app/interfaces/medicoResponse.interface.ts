interface UsuarioI{
  _id : string,
  nombre : string
}

interface HospitalI{
  _id : string,
  nombre : string
}


export interface medicoInterface{
  _id : string,
  nombre : string,
  usuario : UsuarioI,
  hospital : HospitalI,
  img? : string

}

/* export interface medicoInterface{
   _id : string,
   nombre : string
} */
