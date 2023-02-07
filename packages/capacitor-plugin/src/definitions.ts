export interface SSLPinningPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
