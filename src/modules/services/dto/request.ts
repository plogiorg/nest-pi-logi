import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateServiceRequestDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;


  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateStatusRequestDTO {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
