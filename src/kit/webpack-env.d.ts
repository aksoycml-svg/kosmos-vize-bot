// Remotion paketleyicisi webpack: bolum*.json dosyaları require.context ile bundle'a girer.
declare namespace NodeJS {
  interface Require {
    context(dizin: string, altKlasor: boolean, desen: RegExp): { keys(): string[]; (id: string): unknown };
  }
}
