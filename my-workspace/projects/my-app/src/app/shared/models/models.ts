export interface User{
    id: number,
    surname: string,
    name: string,
    role: string,
    dateBirth: Date
}
 
export interface Projects{
    id: number,
    name: string,
    description: string,
    dateStart: Date,
    dateFinish: Date
}
 
export interface Union {
  id: number;
  idUser: number;
  idProject: number;
  hours: number;
}