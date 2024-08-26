export class ChatMessage {
  role = $state("");
  content = $state("");

  constructor(role: string, content: string) {
    this.role = role;
    this.content = content;
  }
}