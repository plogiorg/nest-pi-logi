import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class ServiceTypeResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  isActive: boolean;
}

export class ServiceResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  // @ApiProperty()
  // lan: number;
  //
  // @ApiProperty()
  // lat: number;

  @ApiProperty()
  country: string;

  // @ApiProperty()
  // address: string;
}

export class ServiceDetailResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  lan: number;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  city: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  userInfo: any;

}
export class GetServiceTypesResponseDTO {
  @ApiProperty({
    isArray: true,
    type: ServiceTypeResponse,
  })
  types: ServiceTypeResponse[];
}

export class CreateServiceTypeResponseDTO {
  @ApiProperty()
  service: ServiceTypeResponse;
}

export class UpdateServiceTypeResponseDTO {
  @ApiProperty()
  service: ServiceTypeResponse;
}

export class GetServicesResponseDTO {
  @ApiProperty({
    isArray: true,
    type: ServiceResponse,
  })
  services: ServiceResponse[];
}

export class GetServiceResponseDTO {
  @ApiProperty()
  service: ServiceDetailResponse;
}

export class GetServiceRsesponseDTO {
  @ApiProperty()
  services: ServiceResponse[];
}

export class UpdateServiceResponseDTO {
  @ApiProperty()
  service: ServiceTypeResponse;
}
