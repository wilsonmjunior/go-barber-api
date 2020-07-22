export default interface IHashProvider {
  generateHash(payload: string, rounds: number): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
