declare module 'monaco-themes' {
    export function defineTheme(themeName: string, themeData: any): Promise<void>;
  }