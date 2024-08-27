export class Note {
  id!: number;
  text!: string;
  created_at!: string;

  toString() {
    return `${this.text} (${this.created_at})`;
  }

  toFormatString() {
    return `\x1b[32m${this.created_at}:\x1b[0m ${this.text}`;
  }
}
