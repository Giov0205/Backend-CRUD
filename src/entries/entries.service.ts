import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
  ) {}

  async findAll(): Promise<Entry[]> {
    console.log('📦 Buscando todas las entries en DB');
    return this.entriesRepository.find();
  }

  async create(dto: CreateEntryDto): Promise<Entry> {
    console.log('🛠 Creando nueva entry con:', dto);

    const entry = this.entriesRepository.create(dto);
    const saved = await this.entriesRepository.save(entry);

    console.log('✅ Entry guardada en DB:', saved);

    return saved;
  }

  async update(id: string, dto: CreateEntryDto): Promise<Entry> {
    console.log('🛠 Actualizando entry ID:', id);

    const entry = await this.entriesRepository.findOneBy({ id });

    if (!entry) {
      console.log('❌ Entry no encontrada');
      throw new NotFoundException('Entry no encontrada');
    }

    entry.content = dto.content;

    const updated = await this.entriesRepository.save(entry);

    console.log('✅ Entry actualizada:', updated);

    return updated;
  }

  async remove(id: string): Promise<void> {
    console.log('🗑 Eliminando entry ID:', id);

    const result = await this.entriesRepository.delete(id);

    if (result.affected === 0) {
      console.log('❌ No se encontró entry para eliminar');
      throw new NotFoundException('Entry no encontrada');
    }

    console.log('✅ Entry eliminada correctamente');
  }
}