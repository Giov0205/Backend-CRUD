import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)

  @Transform(({ value }) =>
    sanitizeHtml(value, {
      allowedTags: [], // No permite HTML
      allowedAttributes: {},
    }).trim()
  )

  content: string;
}