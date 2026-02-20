import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  findAll() {
    console.log('📥 GET /entries llamado');
    return this.entriesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateEntryDto) {
    console.log('📥 POST /entries');
    console.log('Body recibido:', dto);
    return this.entriesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateEntryDto) {
    console.log(`📥 PATCH /entries/${id}`);
    console.log('Body recibido:', dto);
    return this.entriesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(`📥 DELETE /entries/${id}`);
    return this.entriesService.remove(id);
  }
}