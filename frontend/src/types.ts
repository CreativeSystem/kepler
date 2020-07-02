
export interface Service{
  id:number,
  title: string,
  description: string,
  to_match: boolean,
  price: string,
  service_image: string[],
}

export interface Person{
  id : number,
  name: string,
  whatsapp?: string,
  telephone?: string
}

export interface ServiceInfo extends Service{
  facebook: string,
  instagram: string,
  twitter: string,
  person: Person
}


export interface HiredService{
  id: number,
  service: ServiceInfo
}
