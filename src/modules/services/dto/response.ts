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
}

export class GetServiceTypesResponseDTO {
  @ApiProperty({
    isArray: true,
    type: ServiceTypeResponse,
  })
  services: ServiceTypeResponse[];
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
  service: ServiceResponse;
}

export class UpdateServiceResponseDTO {
  @ApiProperty()
  service: ServiceTypeResponse;
}
