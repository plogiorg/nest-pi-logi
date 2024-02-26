import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceTypeRequestDTO {
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

export class CreateServiceRequestDTO {

  @ApiProperty()
  @IsString()
  description:string;

  @ApiProperty()
  @IsNumber()
  price:number;

  @ApiProperty()
  @IsNumber()
  lan:number;

  @ApiProperty()
  @IsNumber()
  lat:number;

  @ApiProperty()
  @IsString()
  city:string;

  @ApiProperty()
  @IsString()
  address:string;

  @ApiProperty()
  @IsNumber()
  serviceTypeId:number;
}

export class UpdateServiceRequestDTO {
  @ApiProperty()
  serviceTypeId:number;

  @ApiProperty()
  serviceId:number;


  @ApiProperty()
  @IsString()
  userId:string;


  @ApiProperty()
  @IsString()
  description:string;

  @ApiProperty()
  @IsNumber()
  price:number;

  @ApiProperty()
  @IsNumber()
  lan:number;

  @ApiProperty()
  @IsNumber()
  lat:number;

  @ApiProperty()
  @IsString()
  city:string;

  @ApiProperty()
  @IsString()
  address:string;
}