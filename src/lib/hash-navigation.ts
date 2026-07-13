let pendingHash: string | null = null;

export function setPendingHash(hash: string): void {
  pendingHash = hash;
}

export function consumePendingHash(): string | null {
  const hash = pendingHash;
  pendingHash = null;
  return hash;
}
