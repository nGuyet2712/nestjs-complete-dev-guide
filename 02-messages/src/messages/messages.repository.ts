import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessageRepository {
  async findOne(id: string) {
    const content = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(content);
    return messages[id];
  }
  async findAll() {
    const content = await readFile(`messages.json`, 'utf8');
    const messages = JSON.parse(content);
    return messages;
  }
  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    console.log(contents);
    const messages = JSON.parse(contents);
    console.log(messages);
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };
    console.log(messages);
    await writeFile('messages.json', JSON.stringify(messages));
  }
}
