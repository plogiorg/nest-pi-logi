import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class ServiceResponse {
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

export class GetServicesResponseDTO {
  @ApiProperty({
    isArray: true,
    type: ServiceResponse,
  })
  services: ServiceResponse[];
}

export class CreateServiceResponseDTO {
  @ApiProperty()
  service: ServiceResponse;
}

export class UpdateServiceResponseDTO {
  @ApiProperty()
  service: ServiceResponse;
}
